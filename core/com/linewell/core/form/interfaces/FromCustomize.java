package com.linewell.core.form.interfaces;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCTool;
import com.linewell.core.form.content.FormContent;
import com.linewell.core.form.content.FormContentManager;
import com.linewell.core.form.design.FormDesign;
import com.linewell.core.form.design.FormDesignBussiness;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.ClobUtil;


public class FromCustomize {
	private static final Logger logger = Logger.getLogger(FromCustomize.class);
	
	/**
	 * 判断是否是新增
	 * @param unid
	 * @param formunid
	 * @param tablename
	 * @return
	 */
	public boolean isNew(String unid,String formunid,String tablename){
		boolean flag = true;
		String sql = "select count(*) from "+tablename+" where formunid='"+formunid+"' and punid = '"+unid+"'";
		try {
			String[][] rs = JDBCTool.doSQLQuery(GlobalParameter.APP_CORE, sql);
			if(null != rs && rs.length>1){
				//System.out.println(rs[1][0]);
				if(Integer.parseInt(rs[1][0])>0){
					flag = false;
				}
			}
		} catch (SQLException e) {
		    logger.error(e);
		}
		
		return flag;
	}
	

	public String getShowContent(String unid,String formunid,String tablename){
		String retValue = "";
		String sql = "select showcontent from "+tablename+" where formunid='"+formunid+"' and punid = '"+unid+"'";
		try {
			String[][] rs = JDBCTool.doSQLQuery(GlobalParameter.APP_CORE, sql);
			if(null != rs && rs.length > 1){
				retValue = rs[1][0];
			}
			
		} catch (SQLException e) {
			logger.debug(e.getMessage());
			logger.error(e);
		}
		
		return retValue;
	}
	
	
	/**
	 * 保存自定义表单横向表
	 * date: Feb 24, 2011
	 * @param request
	 * @param formContent com.linewell.res.formcontent.FormContent
	 * @param punid apasinfo.unid
	 */
	public boolean saveCustomizeForm(HttpServletRequest request,FormContent formContent,String punid,String autohtmlcontent){
		boolean ret = true;
        //String autohtmlcontent = request.getParameter("autohtmlcontent");
        String tablename =  formContent.getTablename();
        FormDesignBussiness formDesignBussiness = new FormDesignBussiness();
		List list = formDesignBussiness.getVerificationList(formContent.getUnid());
		String sql = "insert into "+tablename + "(";
		String value = "";
		//拼装填充字段值
		for (int i = 0; i < list.size(); i++) {
			FormDesign formDesign = (FormDesign)list.get(i);
				sql = sql + formDesign.getColumnname() + ",";
		}
		sql = sql + "SHOWCONTENT,punid,nodename,nodeunid,formunid)values(";

		int fileCount = 0;
		//拼装具体值
		for (int i = 0; i < list.size(); i++) {
			FormDesign formDesign = (FormDesign)list.get(i);
			value = request.getParameter(""+formDesign.getColumnname());
			//System.out.println("formDesign.getColumnname()"+formDesign.getColumnname());
			//System.out.println("value"+value);
			
			if("file".equals(formDesign.getColumntype())){
				sql = sql + "?" + ",";
				fileCount = fileCount + 1;
			}else{
				sql = sql + "'"+value+"'" + ",";
			}
			
		}
		sql = sql + "?,'"+punid+"','"+formContent.getNodename()+"','"+formContent.getNodeid()+"','"+formContent.getUnid()+"')";
			
		try {
			JDBCTool.doSQLUpdate(GlobalParameter.APP_CORE, "delete "+tablename+" where punid = '"+ punid + "' and formunid='"+formContent.getUnid()+"'", new Object[0]);
			
			Object[] obj = new Object[fileCount + 1];
			obj[fileCount] = ClobUtil.StrToClob(autohtmlcontent);
			/*
			MultiPartRequestWrapper req  = (MultiPartRequestWrapper ) request;
            Enumeration e = req.getFileParameterNames();
            File uplFile = null;
            int i = 0;
    	 	while(e.hasMoreElements()){
    	 		String key = (String)e.nextElement();
                uplFile = req.getFiles(key)[0];
                
                DataInputStream   dis   =   null; 
                try{
                	dis = new DataInputStream(new FileInputStream(uplFile)); 
                }catch(Exception ex1){
                    ex1.printStackTrace(); 
                }
                obj[i] = dis;
                i ++;
    	 	}*/
			JDBCTool.doSQLUpdate(GlobalParameter.APP_CORE, sql, obj);
		} catch (SQLException e) {
		    logger.error(e);
			logger.debug(e.getMessage());
		}
		return ret;
	}
	
	
	/**
	 * 结果表是否已经产生值
	 * @param tablename
	 * @param punid
	 * @return
	 */
	public boolean resultCount(String tablename,String punid){
		String sql =  "select count(*) from " + tablename + " where punid='"+punid+"'";
		boolean flag = false;
		try {
			 String[][] rs = JDBCTool.doSQLQuery(GlobalParameter.APP_CORE, sql);
			 
			 if(null != rs && rs.length > 1){
				 if(Integer.parseInt(rs[1][0])>0){
					 flag = true;
				 }
			 }
			 
		} catch (SQLException e) {
			logger.debug(e.getMessage());
			logger.error(e);
		}
		return flag;
	}
	
	
	/**
	 * 获取返回值xml
	 * @param tablename
	 * @param punid
	 * @return
	 */
	public String getXmlContent(String tablename,String punid){
		//String sql =  "select content from " + tablename + " where punid='"+punid+"'";
		String sql =  "select content from " + tablename + " where punid='111'";
		String retValue = "";
		try {
			 String[][] rs = JDBCTool.doSQLQuery(GlobalParameter.APP_CORE, sql);
			 
			 if(null != rs && rs.length > 1){
				 retValue = rs[1][0];
			 }
			 
		} catch (SQLException e) {
			logger.debug(e.getMessage());
			logger.error(e);
		}
		return retValue;
	}
	
	
	/**
	 * 表单展示内容
	 * @param beforeFormId 上个表单id
	 * @param unid  办件id
	 * @param formContent 表单对象
	 * @return
	 */
	public String getFormContent(String unid,FormContent formContent,HttpServletRequest request){
		String showContent = "";
		String resultTableName = "";
		boolean isNew = isNew(unid,formContent.getUnid(),formContent.getTablename());
		FormContentManager formContentManager = new FormContentManager();
		FormContent beforeFormContent = formContentManager.getBeforeFormByNowForm(formContent);
		if(null != beforeFormContent){
			resultTableName =beforeFormContent.getTablename()+ "_RESULT";
		}
		
		if(isNew){
			//if(null != beforeFormContent){
				//showContent = HtmlFilling.fillingByXml(ClobUtil.clobToStr(formContent.getBodycontent()),getXmlContent(resultTableName,unid),request);
			//}else{
				showContent = ClobUtil.clobToStr(formContent.getBodycontent());
			//}
		}else{
			showContent = getShowContent(unid,formContent.getUnid(),formContent.getTablename());
		}
		return showContent;
	}
	
	
	public static void main(String[] args) {
		String tmpStr = "<form id=\"jspForm\" name=\"jspForm\" method=\"post\" action=\"${path}/ApasRegister.action\" enctype =\"multipart/form-data\" >";
		tmpStr = tmpStr +"</ssssssssssssssdfsdfdsfsdfs>";
		tmpStr = tmpStr +"</form>";
		String formstr = tmpStr.substring(tmpStr.indexOf("<form"), tmpStr.indexOf(">")+1);
		
		System.out.println(tmpStr.replace(formstr, "").replace("</form>", ""));
	
	}
}
