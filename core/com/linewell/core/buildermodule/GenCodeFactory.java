package com.linewell.core.buildermodule;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.linewell.core.buildermodule.infterfacts.BuilderModuleGenCode;


public class GenCodeFactory {
	/**
	 * 根据jndi获取链接串，根据串内的字符是否包含相应数据库的关键字判断需要加载的实现类
	 * @param jndi proxool的链接唯一标识
	 * @return  代码生成器操作类 GenCodeManagerInterface
	 */
	public BuilderModuleGenCode build(String jndi) throws SQLException {
		Connection connection = DriverManager.getConnection("proxool." + jndi);	
		if(connection.toString().indexOf("gbase")>0){
			//gbase实现类
			return null;
		}else if(connection.toString().indexOf("jtds")>0){
			GenCodeSqlServer genCodeSqlServer = new GenCodeSqlServer();
			return genCodeSqlServer;
		}else{	
			GenCodeOracle genCodeOracle = new GenCodeOracle();
			return genCodeOracle;
		}
	}
}
