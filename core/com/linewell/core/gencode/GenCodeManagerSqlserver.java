package com.linewell.core.gencode;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCTool;
import com.linewell.core.subbutton.SubButton;
import com.linewell.core.subbutton.SubButtonManager;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.ucap.module.ModuleLeafManager;
import com.linewell.core.util.DateTime;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.core.view.View;
import com.linewell.core.view.ViewAction;
import com.linewell.core.view.ViewManager;
import com.linewell.core.view.column.ColumnManager;

public class GenCodeManagerSqlserver  implements GenCodeManagerInterface{
	private static final Logger logger = Logger.getLogger(ViewAction.class);
	
	/**
	 *  查询对应jndi下所有表，并将表名称和字段名称封装成map，再将map以list的方式存储返回
	 * @param jndi 数据库JNDI
	 * @return
	 */
	public List<Map<String, String>> selectAllTablesName(String jndi) {
		List<Map<String, String>> arList = new ArrayList<Map<String, String>>();
		String sql = "select  [name],'' from [sysobjects] where [type] = 'u' ";
		try {
			String[][] res = JDBCTool.doSQLQuery(jndi, sql);
			for (int i = 1; i < res.length; i++) {
				Map<String, String> map = new HashMap<String, String>();
				map.put("TABLENAME", res[i][0]);
				map.put("COMMENTS", res[i][1]);
				arList.add(map);
			}
		} catch (SQLException e) {
			logger.error(e.getMessage());
		}
		return arList;
	}
	
	/**
	 * 自动生成封装bean
	 * @param jndiName
	 * @param bean
	 * @return
	 */
	public List<BeanBean> getBeansByJndiAndBean(String jndiName,BeanBean bean) {
		List<BeanBean> beanList = new ArrayList<BeanBean>();
		bean=parseTableForBean(jndiName,bean);
		beanList.add(bean);
		return beanList;
	}
	
	/**
	 * 根据表名进行解析,生成Bean需要的相关信息
	 * @param jndiName
	 * @param bean 表对应Bean
	 * @return
	 */
	public BeanBean parseTableForBean(String jndiName,BeanBean bean) {
		String[][] result = null; // result[][0]=字段名称;result[][1]=字段类型;result[][2]=字段默认值;result[][3]=字段说明
		try {
			result=JDBCTool.doSQLQuery(jndiName, getFieldSqlByTable(bean.getTableName()));
			if (null == result || result.length < 2) return null;
		} catch (SQLException e) {
		    logger.error(e.getMessage());
		}
		
		bean.setTableComments(StrUtil.isNull(result[1][4]) ? "" : result[1][4]); //表注释
		List<BeanProperty> propertis = new ArrayList<BeanProperty>();
		List<BeanImport> importList = new ArrayList<BeanImport>();
		StringBuffer jspTableContent = new StringBuffer();
		for (int i = 1; i < result.length; i++) { 
			BeanProperty property = new BeanProperty();
			String beanNameLowerCase = bean.getBeanCName().toLowerCase();

			//如果总输出行数为奇数，则最后一行只显示一列
			if((i == (result.length-1)) && (result.length-1)%2==1){ 
				jspTableContent.append("<tr>\r\n");
				jspTableContent.append("  <th style='width:20%'><font color='red'>*</font>"+result[i][3]+"：</th>\r\n");
				jspTableContent.append("   <td style='width:80%' colspan='3'>\r\n");
				jspTableContent.append("   <input type='text' name='"+beanNameLowerCase+"[]"+result[i][0].toLowerCase()+"' id='"+beanNameLowerCase+"[]"+result[i][0].toLowerCase()+"' value='${"+bean.getBeanCName()+"."+result[i][0].toLowerCase()+"}'/>\r\n");
				jspTableContent.append("   </td>\r\n");
				jspTableContent.append("</tr>\r\n");
			}else{
				//一行两列
				if(i%2==1){
					jspTableContent.append("<tr>\r\n");
					jspTableContent.append("  <th style='width:20%'><font color='red'>*</font>"+result[i][3]+"：</th>\r\n");
					jspTableContent.append("  <td style='width:30%'>\r\n");
					jspTableContent.append("    <input type='text' name='"+beanNameLowerCase+"[]"+result[i][0].toLowerCase()+"' id='"+beanNameLowerCase+"[]"+result[i][0].toLowerCase()+"' value='${"+bean.getBeanCName()+"."+result[i][0].toLowerCase()+"}'/>\r\n");
					jspTableContent.append("  </td>\r\n");
				}else{
					jspTableContent.append("  <th style='width:20%'><font color='red'>*</font>"+result[i][3]+"：</th>\r\n");
					jspTableContent.append("  <td style='width:30%'>\r\n");
					jspTableContent.append("    <input type='text' name='"+beanNameLowerCase+"[]"+result[i][0].toLowerCase()+"' id='"+beanNameLowerCase+"[]"+result[i][0].toLowerCase()+"' value='${"+bean.getBeanCName()+"."+result[i][0].toLowerCase()+"}'/>\r\n");
					jspTableContent.append("  </td>\r\n");
					jspTableContent.append("</tr>\r\n");
				}
			}
			for (int j = 0; j < result[0].length; j++) {
				property.setName(result[i][0].toLowerCase());
				property.setFieldName(result[i][0].substring(0,1).toUpperCase()+result[i][0].substring(1,result[i][0].length()));
				
				if ("NUMBER".equals(result[i][1])) {
					property.setType("double");
				}else if ("CLOB".equals(result[i][1])){
					// 默认都是字符类型,包括Clob和Blob字段,如果要针对Clob和Blob做特殊处理,自己在做相应的修改即可
					property.setType("Clob");
					BeanImport beanImport = new BeanImport();
					beanImport.setImportContent("import java.sql.Clob;");
					importList.add(beanImport);
				}else if ("BLOB".equals(result[i][1])){
					property.setType("Blob");
					BeanImport beanImport = new BeanImport();
					beanImport.setImportContent("import java.sql.Blob;");
					importList.add(beanImport);
				}else if ("DATE".equals(result[i][1])){
					property.setType("Timestamp");
					BeanImport beanImport = new BeanImport();
					beanImport.setImportContent("import java.sql.Timestamp;");
					importList.add(beanImport);
				}else{
					property.setType("String");
				}
				property.setDefaultValue(result[i][2].replace("'", ""));
				property.setComment(result[i][3]);
				
			}
			propertis.add(property);
		}
		bean.setJspTableContent(jspTableContent.toString());
		bean.setImportList(filterList(importList));
		bean.setPropertis(propertis);
		return bean;
	}
	
	private List filterList(List list){
		int length = list.size();
		for (int i = 0; i < length - 1; i++) {
			BeanImport beanImport = (BeanImport)list.get(i);
			String temp = beanImport.getImportContent();
			for (int j = i + 1; j < length; j++) {
				BeanImport beanImportTmp = (BeanImport) list.get(j);
				String tmp2 = beanImportTmp.getImportContent();
				if (temp.equals(tmp2)) {
					list.remove(j);
					j--;
					length--;
				}
			}
		}
		return list;
	}
	
	/**
	 * 创建默认格式的视图bean对象
	 * @param jndiName  
	 * @param bean
	 * @param jspPath
	 * @return
	 */
	public View createView(String jndiName,BeanBean bean,String jspPath){
		View view = new View();
		view.setUnid(new UNIDGenerate().getUnid());
		view.setName(bean.getTableName());
		view.setAlias(bean.getTableName().toLowerCase());
		view.setJndi(jndiName);
		view.setType("0");
		view.setShowType("0");
		view.setSourceType("1");
		view.setSqlcontent("select * from "+bean.getTableName());
		view.setOpenType("1");
		view.setWidth(800);
		view.setHeight(1000);
		view.setRownumbers("1");
		view.setOpenContent(jspPath);
		view.setRownumbers("0");
		view.setAppid(jndiName);
		return view;
	}
	
	/**
	 * 自动创建新增和删除按钮
	 * @param viewUnid
	 * @return
	 */
	public boolean createDelAndAddButton(String viewUnid){
		boolean flag = false;
		SubButtonManager subButtonManager = new SubButtonManager();
		
		//删除按钮
		SubButton subButtondel = new SubButton();
		subButtondel.setButton_unid("E0C9D635C6B62EAAF4B48D62D960ECF2");
		subButtondel.setSub_belongto(viewUnid);
		subButtondel.setSub_img("icon-del");
		subButtondel.setSub_name("删除");
		subButtondel.setSub_unid(new UNIDGenerate().getUnid());
		flag = subButtonManager.doSave(subButtondel);
		
		//添加按钮
		SubButton subButtonadd = new SubButton();
		subButtonadd.setButton_unid("BBBA97C3A415865ABFD0D1371FFF9951");
		subButtonadd.setSub_belongto(viewUnid);
		subButtonadd.setSub_img("icon-add");
		subButtonadd.setSub_name("新增");
		subButtonadd.setSub_unid(new UNIDGenerate().getUnid());
		flag = flag && subButtonManager.doSave(subButtonadd);
		return flag;
	}
	
	/**
	 * 封装表字段下拉框列表
	 * @param beanpropertis
	 * @return
	 */
	public String createFieldSelect(List<BeanProperty> beanpropertis){
		String fieldString=" <option value =\"\">--请选择字段--</option>";
		for (BeanProperty beanproperty : beanpropertis) {
			String comment=beanproperty.getFieldName();
			if(null!=beanproperty.getComment() && !beanproperty.getComment().equals("")){
				comment=beanproperty.getComment();
			}
			fieldString+=" <option value ="+beanproperty.getFieldName()+">"+comment+"</option>";
		}
		return fieldString;
	}
	
	
	/**
	 *  生成代码、jsp、模块、视图、按钮数据
	 * @param jndi
	 * @param request
	 * @return
	 */
	public boolean genCodeAll(String jndi,HttpServletRequest request){
		BeanBean bean=new BeanBean();
		
		bean.setAppid(jndi);
		String[] javaTemplate = request.getParameterValues("javaTemplate");
		String sourcename = request.getParameter("sourcename");
		String sp_table = request.getParameter("sp_table");
		String keyword = request.getParameter("keyword");
		String moduleName = request.getParameter("moduleName");
		String parentModuleID = request.getParameter("parentModuleID");
		String className = request.getParameter("className");
		String packageName = request.getParameter("jarPath");
		
		bean.setTableName(sp_table);
		bean.setPk_Name(keyword);
		bean.setBeanName(className);
		bean.setBeanCName(className.substring(0,1).toLowerCase()+className.substring(1, className.length()));
		bean.setAliasName(bean.getBeanCName().toLowerCase());
		bean.setClassName(className); // 生成的类名
		bean.setPackageName(packageName);
		
		String jspTemplate = request.getParameter("jspTemplate");
		String jspPath = request.getParameter("jspPath");
		String gendata = request.getParameter("gendata");
		String creater=request.getParameter("creater");
		bean.setCreater(creater);
		
		String createrEmail=request.getParameter("createrEmail");
		bean.setCreaterEmail(createrEmail);

		bean.setCreateTime(DateTime.getNowDateTime());
		
		VelocityMain.init();

		List<BeanBean> beans = getBeansByJndiAndBean(jndi,bean);
		try {
			CodeGenerater generater = new CodeGenerater();
			for (BeanBean beanBean : beans) {
				if(null != javaTemplate && javaTemplate.length>0){
					for (int i = 0; i < javaTemplate.length; i++) {
						generater.generatejava(beanBean,javaTemplate[i],sourcename);
					}
				}

				//生成jsp
				if(!StrUtil.isNull(jspTemplate)){
					generater.generatejsp(beanBean,jspTemplate,jspPath);
				}
				
				if(gendata.equalsIgnoreCase("Y")){
					//生成视图数据
					jspPath = jspPath + "/" + beanBean.getBeanName().toLowerCase() + "_" + 
						jspTemplate.replaceAll(".vm","").toLowerCase()+".jsp?"+beanBean.getPk_Name().toLowerCase()+"=";
					
					View view = createView(jndi,beanBean,jspPath);
					ViewManager viewManager = new ViewManager();
					viewManager.createBaseViewByView(view);
					String[][] result=JDBCTool.doSQLQuery(jndi, getFieldSqlByTable(bean.getTableName()));
					ColumnManager columnManager = new ColumnManager();
					columnManager.createBaseViewColumnByColumnList(result, view.getUnid());
					
					//生成模块数据
					ModuleLeafManager moduleLeafManager = new ModuleLeafManager();
					moduleLeafManager.createModule(moduleName,parentModuleID,view.getUnid());
					
					//生成新增和修改按钮
					createDelAndAddButton(view.getUnid());
				}
			}
		} catch (IOException e) {
			logger.error(e.getMessage());
		}catch (SQLException e) {
			logger.error(e.getMessage());
		}
		
		return true;
	}
	
	/**
	 * 根据表名组装表信息相应的SQL 第一列为字段名称, 第二列为字段类型, 第三列为字段默认值, 第四列为字段说明
	 * 
	 * @param tableName
	 * @return
	 */
	public String getFieldSqlByTable(String tableName) {
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT  a.name  , isnull(g.[value],'') AS 字段说明 FROM ");
		sb.append(" syscolumns a left join systypes b on a.xtype=b.xusertype inner join sysobjects d  ");
		sb.append(" on a.id=d.id  and  d.xtype='U' and d.name<>'dtproperties' left join syscomments e  ");
		sb.append(" on a.cdefault=e.id left join sys.extended_properties g on a.id=g.major_id AND ");
		sb.append(" a.colid = g.minor_id where d.name='"+tableName.toUpperCase()+"' order by a.id,a.colorder ");
		 
		return sb.toString();
	}
	
	public  Object[][] getUcapApp(){
		String sql = "select t.app_unid,t.app_name,t.app_name_en from ucap_app t where t.app_unid<>'475C4D7E257F5EAF7CCDF46AE0FE35BD'";
		Object[][] rs = new Object[0][0];
		try {
			rs = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP,sql,new Object[0]);
		} catch (SQLException e) {
		    logger.error(e.getMessage());
		}
		return rs;
	}
}
