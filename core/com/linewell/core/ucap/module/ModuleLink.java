package com.linewell.core.ucap.module;
import java.sql.SQLException;
import com.linewell.core.db.JDBCTool;
import com.linewell.core.system.GlobalParameter;

//构造链接对象，增加链接对象参数viewAlias=视图别名
public class ModuleLink {
//创建一个视图别名的后置参数的方法
	public  String getLink(String content){
		if(content.indexOf("viewId")>=0){
			String viewId=content.substring(content.lastIndexOf("=")+1);
			String sql="select view_alias from core_view where view_unid='"+viewId+"'";
			try {
			Object[][]	rs = JDBCTool.doSQLQuery(GlobalParameter.APP_CORE,sql,null);
			if(rs.length>1){
				content=content+"&viewAlias="+rs[1][0];
			}
			} catch (SQLException e) {
				e.printStackTrace();
			}
			
		}
		return content;
	}	
}
