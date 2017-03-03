package com.linewell.core.business;


public class CommonBusinessBeanBusiness {
	private String sss_dfdf = "";
	
	public String getSss_dfdf() {
		return sss_dfdf;
	}

	public void setSss_dfdf(String sss_dfdf) {
		this.sss_dfdf = sss_dfdf;
	}

	/**
	 * 动态创建BEAN
	 * @param jndi 链接标识
	 * @param tableName 表名
	 * @return 
	 */
	public void create_Bean(String jndi,String tableName){
		//String[][] rs = OracleDbUtil.getCommentsByTablename(jndi, tableName);
	}
}
