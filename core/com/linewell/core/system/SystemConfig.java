package com.linewell.core.system;
 
/**
 * <p>
 * 	系统配置信息实体
 * </P>
 * 
 * @author qcongyong@linewell.com
 * @date 2012-11-22 11:43:20
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class SystemConfig {
			
	/**
	 * 主键（所属系统id）
	 */
	private String app_unid  = "" ;
		
	/**
	 * 首页logo图片地址
	 */
	private String logo_img  = "" ;
		
	/**
	 * 登陆页面
	 */
	private String login_page  = "" ;
		
	/**
	 * 首页
	 */
	private String index_page  = "" ;
		
	/**
	 * 首页左侧菜单样式：1.树形  2.抽屉
	 */
	private String left_menu_style  = "" ;
		
	/**
	 * 菜单图标样式：1.小图标  2.大图标
	 */
	private String menu_icon_style  = "" ;
		
	/**
	 * 获取主键（所属系统id）
	 * @return String
	 */
	public String getApp_unid() {
		return app_unid;
	}

	/**
	 * 设置主键（所属系统id）
	 * @param app_unid
	 *               String 主键（所属系统id）
	 */
	public void setApp_unid(String app_unid) {
		this.app_unid = app_unid;
	}
	
	/**
	 * 获取首页logo图片地址
	 * @return String
	 */
	public String getLogo_img() {
		return logo_img;
	}

	/**
	 * 设置首页logo图片地址
	 * @param logo_img
	 *               String 首页logo图片地址
	 */
	public void setLogo_img(String logo_img) {
		this.logo_img = logo_img;
	}
	
	/**
	 * 获取登陆页面
	 * @return String
	 */
	public String getLogin_page() {
		return login_page;
	}

	/**
	 * 设置登陆页面
	 * @param login_page
	 *               String 登陆页面
	 */
	public void setLogin_page(String login_page) {
		this.login_page = login_page;
	}
	
	/**
	 * 获取首页
	 * @return String
	 */
	public String getIndex_page() {
		return index_page;
	}

	/**
	 * 设置首页
	 * @param index_page
	 *               String 首页
	 */
	public void setIndex_page(String index_page) {
		this.index_page = index_page;
	}

	/**
	 * 获取首页左侧菜单样式
	 * @return String
	 */
	public String getLeft_menu_style() {
		return left_menu_style;
	}

	/**
	 * 设置首页左侧菜单样式
	 * @param left_menu_style
	 *               String 首页左侧菜单样式
	 */
	public void setLeft_menu_style(String left_menu_style) {
		this.left_menu_style = left_menu_style;
	}

	/**
	 * 获取菜单图标样式
	 * @return String
	 */
	public String getMenu_icon_style() {
		return menu_icon_style;
	}

	/**
	 * 设置菜单图标样式
	 * @param left_menu_style
	 *               String 首页左侧菜单样式
	 */
	public void setMenu_icon_style(String menu_icon_style) {
		this.menu_icon_style = menu_icon_style;
	}	
}