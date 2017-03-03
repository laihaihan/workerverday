package com.linewell.core.view.ext.param;

import java.io.File;
import java.sql.SQLException;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;

import com.linewell.core.db.JDBCTool;
import com.linewell.core.system.GlobalParameter;

public class AppDataUserService {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(AppDataUserService.class); 
	private static AppDataUserService appDataUserService;

	public static AppDataUserService newInstance() {
		if (appDataUserService == null) {
			appDataUserService = new AppDataUserService();
		}
		return appDataUserService;
	}

	public String setAppDataUserParam(String sql) {
		// 获取proxool系统账户
		try {
			String[][] appArray = JDBCTool.doSQLQuery(GlobalParameter.APP_UCAP,"select t.app_unid,t.app_name,t.app_name_en from ucap_app t");
			for (int i = 1; i < appArray.length; i++) {
				String appName = "#{DATA_" + appArray[i][2].toUpperCase() + "}";
				if (sql.indexOf(appName) > -1) {
					String proxoolUser = getProxoolUser(appArray[i][0]);
					if(proxoolUser!=null){
						sql = sql.replaceAll("\\#\\{DATA_"+appArray[i][2].toUpperCase()+"\\}", proxoolUser);
					}
				}
			}
		} catch (SQLException e) {
		    logger.error(e);
		}

		return sql;
	}

	public String getProxoolUser(String proxool) {
		String value = "";
		if("475C4D7E257F5EAF7CCDF46AE0FE35BD".equals(proxool)){
			proxool = "proxool";
		}
		
		String classPath = AppDataUserService.class.getResource("/").getPath(); 
		String proxoolPath = StringUtils.substringBefore(classPath, "classes")+ "proxool.xml";

		SAXReader reader = new SAXReader();
		try {
			Document document = reader.read(new File(proxoolPath));
			
			
			Node node = document
					.selectSingleNode("//something-else-entirely//proxool[alias='"
							+ proxool
							+ "']//driver-properties//property[@name='user']");
			if (node != null) {
				value = node.valueOf("@value");
			}
			
			//sqlserver 跨库查询添加 .dbo
			Node driverUrlNode =  document
			.selectSingleNode("//something-else-entirely//proxool[alias='"
					+ proxool
					+ "']//driver-url"); 
			if(null != driverUrlNode){
				if(driverUrlNode.getText().indexOf("sqlserver")>0){
					String durl = driverUrlNode.getText();
					
					value=durl.substring(durl.lastIndexOf("=")+1, durl.length())+".dbo";
				}
			}
		} catch (DocumentException e) {
		    logger.error(e);
		}
		return value;
	}

	public static void main(String[] args) {
		/*AppDataUserService.newInstance().getProxoolUser(
				"DC7DDA0F25A3AE3AC8CCA148FF48B64B");*/
		String ss = "jdbc:jtds:sqlserver://localhost:1433;DatabaseName=test";
		ss = ss.substring(ss.lastIndexOf("=")+1, ss.length());
		System.out.println(ss);
	}
}
