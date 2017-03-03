package com.linewell.core.gencode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * 代码生成器操作类生成工程
 * @author JSC
 *
 */
public class GenCodeManagerFactory {
	/**
	 * 根据jndi获取链接串，根据串内的字符是否包含相应数据库的关键字判断需要加载的实现类
	 * @param jndi proxool的链接唯一标识
	 * @return  代码生成器操作类 GenCodeManagerInterface
	 */
	public GenCodeManagerInterface build(String jndi) throws SQLException {
		Connection connection = DriverManager.getConnection("proxool." + jndi);	
		if(connection.toString().indexOf("gbase")>0){
			GenCodeManagerGBase genCodeManagerGBase = new GenCodeManagerGBase();
			return genCodeManagerGBase;
		}else if(connection.toString().indexOf("jtds")>0){
			GenCodeManagerSqlserver genCodeManagerSqlserver = new GenCodeManagerSqlserver();
			return genCodeManagerSqlserver;
		}else{	
			GenCodeManagerOracle genCodeManagerOracle = new GenCodeManagerOracle();
			return genCodeManagerOracle;
		}
	}
}
