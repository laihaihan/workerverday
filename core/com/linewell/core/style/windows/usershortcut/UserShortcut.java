package com.linewell.core.style.windows.usershortcut;
 
/**
 * <p>
 * 	win7样式用户拥有快捷方式实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-12-13 09:47:46
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class UserShortcut {
			
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 用户id
	 */
	private String userid  = "" ;
		
	/**
	 * 快捷方式id
	 */
	private String shortcutid  = "" ;
	/**
	 * 快捷方式名称
	 */
	private String shortcutname  = "" ;
	
	/**
	 * 快捷方式坐标--离桌面右侧距离
	 */
	private long coordinate_left ;
		
	/**
	 * 快捷方式坐标--离桌面顶部距离
	 */
	private long coordinate_top ;
		
	/**
	 * 所属系统unid
	 */
	private String app_unid  = "" ;
		
	/**
	 * 获取主键
	 * @return String
	 */
	public String getUnid() {
		return unid;
	}

	/**
	 * 设置主键
	 * @param unid
	 *               String 主键
	 */
	public void setUnid(String unid) {
		this.unid = unid;
	}
	
	/**
	 * 获取用户id
	 * @return String
	 */
	public String getUserid() {
		return userid;
	}

	/**
	 * 设置用户id
	 * @param userid
	 *               String 用户id
	 */
	public void setUserid(String userid) {
		this.userid = userid;
	}
	
	/**
	 * 获取快捷方式id
	 * @return String
	 */
	public String getShortcutid() {
		return shortcutid;
	}

	/**
	 * 设置快捷方式id
	 * @param shortcutid
	 *               String 快捷方式id
	 */
	public void setShortcutid(String shortcutid) {
		this.shortcutid = shortcutid;
	}
	
	/**
	 * 获取快捷方式坐标--离桌面右侧距离
	 * @return long
	 */
	public long getCoordinate_left() {
		return coordinate_left;
	}

	/**
	 * 设置快捷方式坐标--离桌面右侧距离
	 * @param coordinate_left
	 *               long 快捷方式坐标--离桌面右侧距离
	 */
	public void setCoordinate_left(long coordinate_left) {
		this.coordinate_left = coordinate_left;
	}
	
	/**
	 * 获取快捷方式坐标--离桌面顶部距离
	 * @return long
	 */
	public long getCoordinate_top() {
		return coordinate_top;
	}

	/**
	 * 设置快捷方式坐标--离桌面顶部距离
	 * @param coordinate_top
	 *               long 快捷方式坐标--离桌面顶部距离
	 */
	public void setCoordinate_top(long coordinate_top) { 
		this.coordinate_top = coordinate_top;
	}
	
	/**
	 * 获取所属系统unid
	 * @return String
	 */
	public String getApp_unid() {
		return app_unid;
	}

	/**
	 * 设置所属系统unid
	 * @param app_unid
	 *               String 所属系统unid
	 */
	public void setApp_unid(String app_unid) {
		this.app_unid = app_unid;
	}

	public String getShortcutname() {
		return shortcutname;
	}

	public void setShortcutname(String shortcutname) {
		this.shortcutname = shortcutname;
	}
		
}
