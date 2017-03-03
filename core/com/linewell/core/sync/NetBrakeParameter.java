

package com.linewell.core.sync;
/**
 *功能说明：网闸同步用到的参数封装类
 *<P></P>
 *@author chh
 *@since 2012
 *
 */
public class NetBrakeParameter {
	public String jndi;
	/**
	 * 用户名
	 */
	public String userName;
	/**
	 * 密码
	 */
	public String password;
	public String orcl;
	/**
	 * 需要同步的表
	 */
	public String [] tables;
	/**
	 * 保存路径
	 */
	public String path;
	/**
	 * 是否自动执行
	 */
	public boolean isRun;
	/**
	 * 表空间
	 */
	public String tableSpace;
	/**
	 * 是否双向同步
	 */
	public boolean isBothway;
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getOrcl() {
		return orcl;
	}
	public void setOrcl(String orcl) {
		this.orcl = orcl;
	}
	public String[] getTables() {
		return tables;
	}
	public void setTables(String[] tables) {
		this.tables = tables;
	}
	public String getJndi() {
		return jndi;
	}
	public void setJndi(String jndi) {
		this.jndi = jndi;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public boolean isRun() {
		return isRun;
	}
	public void setRun(boolean isRun) {
		this.isRun = isRun;
	}
	public boolean isBothway() {
		return isBothway;
	}
	public void setBothway(boolean isBothway) {
		this.isBothway = isBothway;
	}
	public String getTableSpace() {
		return tableSpace;
	}
	public void setTableSpace(String tableSpace) {
		this.tableSpace = tableSpace;
	}
}
