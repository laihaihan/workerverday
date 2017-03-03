package com.linewell.core.buildermodule;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import org.apache.log4j.Logger;

import com.linewell.core.buildermodule.detail.BuilderModuleDetail;
import com.linewell.core.buildermodule.detail.BuilderModuleDetailManager;
import com.linewell.core.buildermodule.infterfacts.BuilderModuleGenCode;
import com.linewell.core.db.JDBCTool;
import com.linewell.core.gencode.BeanBean;
import com.linewell.core.gencode.BeanImport;
import com.linewell.core.gencode.BeanProperty;
import com.linewell.core.util.OracleDbUtil;
import com.linewell.core.util.PinYinUtil;
import com.linewell.core.util.StrUtil;

public class GenCodeOracle implements BuilderModuleGenCode{
	private final Logger logger = Logger.getLogger(this.getClass());

	@Override
	public BeanBean parseTableForBean(String jndiName, BeanBean bean) {
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
		StringBuffer jspTableContent = getJspConent(jndiName,bean);
		for (int i = 1; i < result.length; i++) { 
			BeanProperty property = new BeanProperty();
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

	

	@Override
	public boolean genTable(String unid, String jndi, String title,
			String tableName) throws SQLException {
		//表存不存在则新增
		if(OracleDbUtil.tableIsExist(jndi, tableName.toUpperCase())){
			Map map = getNewColmuns(jndi,tableName,unid);
			reBuilderTable(jndi,map,tableName);
		}else{
			createTable(unid,jndi,title,tableName);//新建表
		}
		return true;
	}
	
	private StringBuffer getJspConent(String jndi, BeanBean bean){
		String[][] jspResult = null; // result[][0]=字段名称;result[][1]=字段类型;result[][2]=字段默认值;result[][3]=字段说明
		StringBuffer jspTableContent = new StringBuffer();
		try {
			jspResult = JDBCTool.doSQLQuery(jndi, getFieldSqlByTableNoUnid(bean.getTableName()));
			for (int i = 1; i < jspResult.length; i++) {
				BeanProperty property = new BeanProperty();
				String beanNameLowerCase = bean.getBeanCName().toLowerCase();

				//如果总输出行数为奇数，则最后一行只显示一列
				if((i == (jspResult.length-1)) && (jspResult.length-1)%2==1){ 
					jspTableContent.append("<tr>\r\n");
					jspTableContent.append("  <th width=100px align=right><font color='red'>*</font>"+jspResult[i][3]+"</th>\r\n");
					jspTableContent.append("   <td colspan='3'>\r\n");
					jspTableContent.append("   <input  style='width:100%' type='text' name='"+beanNameLowerCase+"[]"+jspResult[i][0].toLowerCase()+"' id='"+ jspResult[i][0].toLowerCase()+"' value='${"+bean.getBeanCName()+"."+jspResult[i][0].toLowerCase()+"}'/>\r\n");
					jspTableContent.append("   </td>\r\n");
					jspTableContent.append("</tr>\r\n");
				}else{
					//一行两列
					if(i%2==1){
						jspTableContent.append("<tr>\r\n");
						jspTableContent.append("  <th width=100px align=right><font color='red'>*</font>"+jspResult[i][3]+"</th>\r\n");
						jspTableContent.append("  <td>\r\n");
						jspTableContent.append("    <input  style='width:375px' type='text' name='"+beanNameLowerCase+"[]"+jspResult[i][0].toLowerCase()+"' id='"+jspResult[i][0].toLowerCase()+"' value='${"+bean.getBeanCName()+"."+jspResult[i][0].toLowerCase()+"}'/>\r\n");
						jspTableContent.append("  </td>\r\n");
					}else{
						jspTableContent.append("  <th width=100px align=right><font color='red'>*</font>"+jspResult[i][3]+"</th>\r\n");
						jspTableContent.append("  <td>\r\n");
						jspTableContent.append("    <input  style='width:375px'  type='text' name='"+beanNameLowerCase+"[]"+jspResult[i][0].toLowerCase()+"' id='"+jspResult[i][0].toLowerCase()+"' value='${"+bean.getBeanCName()+"."+jspResult[i][0].toLowerCase()+"}'/>\r\n");
						jspTableContent.append("  </td>\r\n");
						jspTableContent.append("</tr>\r\n");
					}
				}
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
		    logger.error(e.getMessage());
			e.printStackTrace();
		} 
		return jspTableContent;
	}
	
	/**
	 * 重构表
	 * @param detailList 过滤后的新增字段
	 * @param tableName 表名
	 * @return 操作是否成功
	 * @throws SQLException 
	 */
	private boolean reBuilderTable(String jndi,Map map,String tableName) throws SQLException{
		String[] columnSqls = new String[map.size()];
		String[] commentSqls = new String[map.size()];
		
		int i = 0 ; 
		Set set = map.entrySet();
		for (Iterator it = set.iterator(); it.hasNext();) {
			Entry entry = (Entry) it.next();
			BuilderModuleDetail builderModuleDetail = (BuilderModuleDetail)entry.getValue();
			columnSqls[i] =  "alter table "+tableName+" add "+entry.getKey()+" VARCHAR2("+builderModuleDetail.getLengthlimit()+")";
			commentSqls[i] = "comment on column "+tableName+"."+entry.getKey()+"  is '"+builderModuleDetail.getCaption()+"'";
			i++;
		}


		JDBCTool.doBatchUpdate(jndi, columnSqls);
		JDBCTool.doBatchUpdate(jndi, commentSqls);
		return true;
	}
	
	/**
	 * 对比找出不存在的字段
	 * @param jndi 数据连接标识
	 * @param tableName 表名
	 * @param unid 建模主表唯一标识
	 * @return 过滤后的 List<BuilderModuleDetail>
	 */
	private Map getNewColmuns(String jndi,String tableName,String unid){
		BuilderModuleDetailManager builderModuleDetailManager = new BuilderModuleDetailManager();
		Object[] objs = new Object[1];
		objs[0] = unid;
		List<BuilderModuleDetail> detailList = builderModuleDetailManager.doFindListByCondition(" punid=?", objs);
		Map map = new HashMap();
		for (BuilderModuleDetail builderModuleDetail:detailList) {
			map.put(builderModuleDetail.getEnname(), builderModuleDetail);
			
		}
		
		String[][] rs = OracleDbUtil.getCommentsByTablename(jndi, tableName);
		for(int j = 0 ; j < detailList.size() ; j ++){
			BuilderModuleDetail builderModuleDetail = detailList.get(j);
			for (int i = 1; i < rs.length; i++) {
				if(builderModuleDetail.getEnname().toUpperCase().equals(rs[i][0].toUpperCase())){
					map.remove(builderModuleDetail.getEnname());
				}
			}
		}
		
		Set set = map.entrySet();
		for (Iterator it = set.iterator(); it.hasNext();) {
			Entry entry = (Entry) it.next();
			BuilderModuleDetail builderModuleDetail = (BuilderModuleDetail)entry.getValue();
			System.out.println("新增的字段："+builderModuleDetail.getLengthlimit());
		}	
			
		return map;
	}
	
	private boolean createTable(String unid, String jndi, String title,
	String tableName) throws SQLException {
		
		BuilderModuleDetailManager builderModuleDetailManager = new BuilderModuleDetailManager();
		PinYinUtil pinYinUtil = new PinYinUtil();
		Object[] objs = new Object[1]; 
		objs[0] = unid;
		List detailList = builderModuleDetailManager.doFindListByCondition(" punid=?", objs);
		
		String columnname = "";
		int lengthlimit = 0;
		
		StringBuffer createTableSql = new StringBuffer();
		StringBuffer commentsSql = new StringBuffer();
		
		//创建表
		createTableSql.append("create table "+tableName +"(");
		createTableSql.append("unid varchar2(32),");
		for (int i = 0; i < detailList.size(); i++) {
			BuilderModuleDetail builderModuleDetail = (BuilderModuleDetail)detailList.get(i);
			//字段
			if(!StrUtil.isNull(builderModuleDetail.getEnname())){
				columnname = builderModuleDetail.getEnname();
			}else{
				columnname = pinYinUtil.HanyuToPinyin(builderModuleDetail.getCaption());
			}
			
			//长度限制
			if(builderModuleDetail.getLengthlimit()>0){
				lengthlimit = builderModuleDetail.getLengthlimit();
			}else{
				lengthlimit = 500;
			}
			createTableSql.append(columnname + " varchar2("+lengthlimit+")");
			
			//备注
			commentsSql.append("comment on column "+tableName+"." +columnname + " is '"+builderModuleDetail.getCaption()+"';");
			
			//如果不是最后一个则加个逗号
			if(i < detailList.size()-1){
				createTableSql.append(",");
			}
		}
		
		createTableSql.append(")");
		
		//创建主键
		commentsSql.append("alter table "+tableName+" add constraint pk_"+tableName+" primary key (UNID);");
		
		//创建表备注
		commentsSql.append("comment on table "+tableName+" is '"+title+"'");
		
		String[] sqls = commentsSql.toString().split(";");
		//TODO 事物需要重新考虑
		boolean flag = JDBCTool.doSQLUpdateAndCommit(jndi, createTableSql.toString(), new Object[0]);
		JDBCTool.doBatchUpdate(jndi, sqls);
		return flag;
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
	 * 根据表名组装表信息相应的SQL 第一列为字段名称, 第二列为字段类型, 第三列为字段默认值, 第四列为字段说明
	 * 
	 * @param tableName 表名
	 * @return
	 */
	public String getFieldSqlByTable(String tableName) {
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT ");
		sb.append("ATC.COLUMN_NAME,ATC.DATA_TYPE,ATC.DATA_DEFAULT,ucc.comments,atc.comments ");
		sb.append("FROM ");
		sb.append(" (select atC.TABLE_NAME,ATC.COLUMN_NAME,ATC.DATA_TYPE,ATC.DATA_DEFAULT,UTCOM.comments from USER_tab_columns ATC,USER_TAB_COMMENTS UTCOM");
		sb.append(" 	where UTCOM.table_name = atC.TABLE_NAME and atC.TABLE_NAME = '" + tableName.toUpperCase() + "') atc ");
		sb.append("left outer join user_col_comments ucc ");
		sb.append("on atc.table_name = ucc.table_name ");
		sb.append("and atc.column_name = ucc.column_name ");
		sb.append("left outer join user_tab_comments utc ");
		sb.append("on atc.table_name = utc.table_name");
		return sb.toString();
	}
	
	
	/**
	 * 根据表名组装表信息相应的SQL 第一列为字段名称, 第二列为字段类型, 第三列为字段默认值, 第四列为字段说明
	 * 
	 * @param tableName 表名
	 * @return
	 */
	public String getFieldSqlByTableNoUnid(String tableName) {
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT ");
		sb.append("ATC.COLUMN_NAME,ATC.DATA_TYPE,ATC.DATA_DEFAULT,ucc.comments,atc.comments ");
		sb.append("FROM ");
		sb.append(" (select atC.TABLE_NAME,ATC.COLUMN_NAME,ATC.DATA_TYPE,ATC.DATA_DEFAULT,UTCOM.comments from USER_tab_columns ATC,USER_TAB_COMMENTS UTCOM");
		sb.append(" 	where UTCOM.table_name = atC.TABLE_NAME and ATC.column_name<>'UNID' and atC.TABLE_NAME = '" + tableName.toUpperCase() + "') atc ");
		sb.append("left outer join user_col_comments ucc ");
		sb.append("on atc.table_name = ucc.table_name ");
		sb.append("and atc.column_name = ucc.column_name ");
		sb.append("left outer join user_tab_comments utc ");
		sb.append("on atc.table_name = utc.table_name");
		return sb.toString();
	}



	@Override
	public boolean genFileTable(String jndi) throws SQLException {
		//判断表是否存在，不存在则创建
		boolean flag = false;
		if(!OracleDbUtil.tableIsExist(jndi, "APP_FILE")){
			flag = JDBCTool.doSQLUpdateAndCommit(jndi, getAppFileCreateSql().toString(), new Object[0]);
			JDBCTool.doBatchUpdate(jndi, getAppFileCommentAndKeySql());
		}
		return flag;
	}
	
	
	private StringBuffer getAppFileCreateSql(){
		StringBuffer sb = new StringBuffer();
		sb.append(" create table APP_FILE(FILE_UNID CHAR(32) not null,");
		sb.append(" FILE_NAME VARCHAR2(255),");
		sb.append(" FILE_MD5 CHAR(32),");
		sb.append(" FILE_PATH VARCHAR2(1000),");
		sb.append(" FILE_EXT VARCHAR2(10),");
		sb.append(" FILE_CREATETIME VARCHAR2(20),");
		sb.append(" FILE_SIZE VARCHAR2(255),");
		sb.append(" FILE_DATA BLOB,");
		sb.append(" FILE_STATE VARCHAR2(2),");
		sb.append(" FILE_SAVE_TYPE  VARCHAR2(2),");
		sb.append(" FILE_BELONGTO   VARCHAR2(32))");
		return sb;
	}
	
	private String[] getAppFileCommentAndKeySql(){
		String[] sqls = new String[12];
		sqls[0] = "comment on column APP_FILE.FILE_UNID  is '主键'";
		sqls[1] = "comment on column APP_FILE.FILE_NAME  is '文件名称'";
		sqls[2] = "comment on column APP_FILE.FILE_MD5  is '文件MD5值'";
		sqls[3] = "comment on column APP_FILE.FILE_PATH is '文件存放路径'";
		sqls[4] = "comment on column APP_FILE.FILE_EXT is '文件扩展名'";
		sqls[5] = "comment on column APP_FILE.FILE_CREATETIME is '文件创建时间'";
		sqls[6] = "comment on column APP_FILE.FILE_SIZE is '文件大小'";
		sqls[7] = "comment on column APP_FILE.FILE_DATA  is '文件数据库存放值'";
		sqls[8] = "comment on column APP_FILE.FILE_STATE is '文件状态：Y.有效  N.无效'";
		sqls[9] = "comment on column APP_FILE.FILE_SAVE_TYPE is '文件保存类型：0.磁盘和数据库  1.磁盘  2.数据库'";
		sqls[10] = "comment on column APP_FILE.FILE_BELONGTO is '文件附属于'";
		sqls[11] = "alter table APP_FILE add constraint PK_APP_FILE primary key (FILE_UNID) using index";
		return sqls;		
	}
}
