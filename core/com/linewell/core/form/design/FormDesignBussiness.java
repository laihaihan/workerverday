package com.linewell.core.form.design;

import java.io.File;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCTool;
import com.linewell.core.db.TableNameTool;
import com.linewell.core.form.content.FormContent;
import com.linewell.core.html.HtmlBean;
import com.linewell.core.system.GlobalParameter;

public class FormDesignBussiness {
    private static final Logger logger = Logger.getLogger(FormDesignBussiness.class);
	
	/**
	 * 
	 * date: Feb 22, 2011
	 * @param map  字段存储信息
	 * @param tablename 对应于节点的自定义表单名
	 * @param file     自定义表单对应的html文件
	 * @param serviceid 审批事项id
	 * @param nodeunid 节点id
	 */
	public void htmlMapToColumns(Map map, File file,
			FormContent formContent) {
		map = filterColumn(map);
		map = filterColumnName(map);
		String tablename = formContent.getTablename();
		//boolean flag = true;
		String[] sqlChange = new String[0];
		String[] createTablResDetail = new String[0]; 
		FormDesignManager formDesignManager = new FormDesignManager();
		//表单是否已经存在
		if(TableNameTool.tableIsExist(tablename,GlobalParameter.APP_CORE)){//重构
			//对比找出不存在的字段
			Map mapNew = getNewColmuns(map, formContent.getUnid());
			sqlChange = getAlterTableSql(mapNew,tablename);
			
			//对表纵向表res_formdesign添加不存在的记录
			 formDesignManager.createTableAuto(mapNew, formContent.getUnid());
			
		}else{//全新生成
			sqlChange = getCreateTableSql(map,tablename);
			formDesignManager.createTableAuto(map, formContent.getUnid());
		}

		try { 
			JDBCTool.doBatchUpdate(GlobalParameter.APP_CORE,sqlChange);
		} catch (SQLException e) {
		    logger.error(e);
		}
		

	}
	
	/**
	 * 将map里面对应的key作为字段添加到指定的表中
	 * @param mapNew
	 * @param tablename
	 * @return
	 */
	private String[] getAlterTableSql(Map mapNew,String tablename){
		int i = 0;
		String[] sql = new String[mapNew.size()];
		
		//对固定表添加不存在的字段
		java.util.Iterator itNew = mapNew.entrySet().iterator();
		while (itNew.hasNext()) {
			java.util.Map.Entry entry = (java.util.Map.Entry) itNew.next();
			sql[i] = "alter table "+tablename+" add "+entry.getKey()+" VARCHAR2(2000)";
			i = i + 1;
		}
		return sql;
	}
	
	
	
	/**
	 * 组装创建html映射数据库横向表sql
	 * date: Mar 21, 2011
	 * @param map
	 * @param tablename
	 * @return
	 */
	private String[] getCreateTableSql(Map map,String tablename){
		String[] sqlChange = new String[2];
		sqlChange[0] = "create table "
			+ tablename
			+ "(punid varchar2(32),nodename varchar(100),nodeunid varchar2(32),formunid varchar2(32)";
		int i = 0;
		java.util.Iterator it = map.entrySet().iterator();

		String columnname = "";
		while (it.hasNext()) {
			java.util.Map.Entry entry = (java.util.Map.Entry) it.next();
			HtmlBean htmlBean = (HtmlBean)entry.getValue();
			columnname = entry.getKey().toString();
			
			//System.out.println("type"+htmlBean.getType());
			if ("file".equals(htmlBean.getType())) {
				sqlChange[0] = sqlChange[0] + "," + columnname+ " Blob";
			}else{
				sqlChange[0] = sqlChange[0] + "," + columnname+ " varchar2(2000)";
			}
			
			i = i + 1;
		}
		sqlChange[0] = sqlChange[0] + ",showcontent clob)";
		
		sqlChange[1] = "create table " +tablename + "_result (punid varchar2(32),content clob)";
		
		
		return sqlChange;
	}
	
	/**
	 * 过滤掉已经存在的域
	 * date: Mar 21, 2011
	 * @param map
	 * @param tablename
	 * @return
	 */
	public static Map getNewColmuns(Map map, String tablename){
		//取出表tablename 拥有的所有域存储到Map
		FormDesignManager formDesignManager = new FormDesignManager();
		Object[] obj = new Object[1];
		obj[0] = tablename;
		List list = formDesignManager.doFindListByCondition("punid=?", obj);
		for (int i = 0; i < list.size(); i++) {
			FormDesign formDesign = (FormDesign)list.get(i);
			map.remove(formDesign.getColumnname());
		}
		return map;
	}	
	
	
	/**
	 * 需要验证的字段列表
	 * @param punid
	 * @return
	 */
	public List getVerificationList(String punid){
		FormDesignManager formDesignManager = new FormDesignManager();
		Object[] obj = new Object[3];
		obj[0] = punid;
		obj[1] = "hidden";
		obj[2] = "button";
		List list = formDesignManager.doFindListByCondition(" punid=? and (columntype<>? and columntype<>? or columntype is null)",obj);
		return list;
	}
	
	
	/**
	 * 需要验证的字段列表
	 * @param punid
	 * @return
	 */
	public List getVerificationList(String punid,String verifymodule){
		FormDesignManager formDesignManager = new FormDesignManager();
		Object[] obj = new Object[4];
		obj[0] = punid;
		obj[1] = "hidden";
		obj[2] = "button";
		obj[3] = verifymodule;
		List list = formDesignManager.doFindListByCondition(" punid=? and (columntype<>? and columntype<>? or columntype is null) and verifymodule=?",obj);
		return list;
	}
	
	
	
	/**
	 * 过滤表单过来不需要的域
	 * @param type
	 * @return
	 */
	public Map filterColumn(Map map){
		Map filteredMap = new HashMap();
		java.util.Iterator it = map.entrySet().iterator();
		while (it.hasNext()) {
			java.util.Map.Entry entry = (java.util.Map.Entry) it.next();
			String columnname = entry.getKey().toString();
			HtmlBean htmlBean = (HtmlBean) entry.getValue();
			if(!"button".equals(htmlBean.getType())){
				filteredMap.put(columnname, htmlBean);
			}
		}
		
		return filteredMap;
	}
	
	

	/**
	 * 对数据库字段名进行过滤规范
	 * @param map
	 * @return
	 */
	public Map filterColumnName(Map map){

		Map filteredMap = new HashMap();
		java.util.Iterator it = map.entrySet().iterator();
		while (it.hasNext()) {
			java.util.Map.Entry entry = (java.util.Map.Entry) it.next();
			String columnname = entry.getKey().toString().replace("-", "").replace(" ", "");
			HtmlBean htmlBean = (HtmlBean) entry.getValue();
			filteredMap.put(columnname, htmlBean);
		}
		return filteredMap;
	}
	
	/**
	 * 生成客户端验证脚本
	 * @param punid 业务表单唯一标识
	 * @param formName 表单名称
	 * @return
	 */
	public StringBuffer getValidate(String punid,String formName){
		FormDesignManager formDesignManager = new FormDesignManager();
		List formDesignList = formDesignManager.doFindListByCondition(" punid='"+punid+"' and verifymodule<>'0'", new Object[0]);
		StringBuffer sb = new StringBuffer();
		sb.append("var validate = new Validation('"+formName+"', { ");
		sb.append("immediate: true,validators: {");
		for (int i = 0; i < formDesignList.size(); i++) {
			FormDesign formDesign = (FormDesign)formDesignList.get(i);
			sb.append(getValidateStr(formDesign.getColumnname(),formDesign.getVerifymodule()));
			if(i < formDesignList.size()-1){
				sb.append(",");
			}
		}   	
		sb.append("},messages:{");
		for (int i = 0; i < formDesignList.size(); i++) {
			FormDesign formDesign = (FormDesign)formDesignList.get(i);
			sb.append(getValidateMessage(formDesign.getColumnname(),formDesign.getVerifymodule()));
			if(i < formDesignList.size()-1){
				sb.append(",");
			}
		} 
		sb.append("}");
		
		sb.append(" });");   
		return sb;		
	}
	
	

	/**
	 * 验证标识字符串 提示信息
	 * @param module
	 * @return
	 */
	private String getValidateMessage(String columnname,String module){
		String retValue = "";
		if ("1".equals(module)) {  //非空验证
			retValue =  ":'不允许为空'";
		}
		if ("2".equals(module)) { //数字验证
			retValue = ":'请填写数字'";
		}
		if ("3".equals(module)) {//日期验证
			retValue = ":'请填写正确日期'";
		}
		if ("4".equals(module)) { //邮件验证
			retValue = ":'请填写正确的邮箱'";
		}
		retValue = columnname + retValue;
		return retValue;
	}
	
	
	/**
	 * 验证标识字符串
	 * @param module
	 * @return
	 */
	private String getValidateStr(String columnname,String module){
		String retValue = "";
		if ("1".equals(module)) {  //非空验证
			retValue =  ":'required'";
		}
		if ("2".equals(module)) { //数字验证
			retValue = ":'float'";
		}
		if ("3".equals(module)) {//日期验证
			retValue = ":'date'";
		}
		if ("4".equals(module)) { //邮件验证
			retValue = ":'email'";
		}
		retValue = columnname + retValue;
		return retValue;
	}
	
	
}
