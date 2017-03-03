package com.linewell.core.portlet;

/**
 * <p>
 * Portlet实体
 * </P>
 * 
 * @author linewell@linewell.com
 * @version 1.00 2012-03-31 10:04:01
 *          <p>
 *          Copyright (c) 2012 www.linewell.com
 *          </p>
 */

public class Portlet {
	/**
	 * 
	 */
	private String portlet_unid = "";
	/**
	 * 标题名称
	 */
	private String portlet_name = "";
	/**
	 * 类型(0:列表;1:链接;2:FLASH)
	 */
	private String portlet_type = "";
	/**
	 * 宽度
	 */
	private String portlet_width = "";
	/**
	 * 高度
	 */
	private String portlet_height = "";
	/**
	 * 
	 */
	private String portlet_src = "";
	/**
	 * 数据来源类型(0:视图;1:URL)
	 */
	private String portlet_src_type = "";
	/**
	 * 视图字段
	 */
	private String portlet_view_column = "";
		
	/**
	 * 所属系统unid
	 */
	private String app_unid  = "" ;

	/**
	 * 获取
	 * 
	 * @return String
	 */
	public String getPortlet_unid() {
		return portlet_unid;
	}

	/**
	 * 设置
	 * 
	 * @param portlet_unid
	 *            String
	 */
	public void setPortlet_unid(String portlet_unid) {
		this.portlet_unid = portlet_unid;
	}

	/**
	 * 获取标题名称
	 * 
	 * @return String
	 */
	public String getPortlet_name() {
		return portlet_name;
	}

	/**
	 * 设置标题名称
	 * 
	 * @param portlet_name
	 *            String 标题名称
	 */
	public void setPortlet_name(String portlet_name) {
		this.portlet_name = portlet_name;
	}

	/**
	 * 获取类型(0:列表;1:链接;2:FLASH)
	 * 
	 * @return String
	 */
	public String getPortlet_type() {
		return portlet_type;
	}

	/**
	 * 设置类型(0:列表;1:链接;2:FLASH)
	 * 
	 * @param portlet_type
	 *            String 类型(0:列表;1:链接;2:FLASH)
	 */
	public void setPortlet_type(String portlet_type) {
		this.portlet_type = portlet_type;
	}

	/**
	 * 获取宽度
	 * 
	 * @return String
	 */
	public String getPortlet_width() {
		return portlet_width;
	}

	/**
	 * 设置宽度
	 * 
	 * @param portlet_width
	 *            String 宽度
	 */
	public void setPortlet_width(String portlet_width) {
		this.portlet_width = portlet_width;
	}

	/**
	 * 获取高度
	 * 
	 * @return String
	 */
	public String getPortlet_height() {
		return portlet_height;
	}

	/**
	 * 设置高度
	 * 
	 * @param portlet_height
	 *            String 高度
	 */
	public void setPortlet_height(String portlet_height) {
		this.portlet_height = portlet_height;
	}

	/**
	 * 获取
	 * 
	 * @return String
	 */
	public String getPortlet_src() {
		return portlet_src;
	}

	/**
	 * 设置
	 * 
	 * @param portlet_src
	 *            String
	 */
	public void setPortlet_src(String portlet_src) {
		this.portlet_src = portlet_src;
	}

	/**
	 * 获取数据来源类型(0:视图;1:URL)
	 * 
	 * @return String
	 */
	public String getPortlet_src_type() {
		return portlet_src_type;
	}

	/**
	 * 设置数据来源类型(0:视图;1:URL)
	 * 
	 * @param portlet_src_type
	 *            String 数据来源类型(0:视图;1:URL)
	 */
	public void setPortlet_src_type(String portlet_src_type) {
		this.portlet_src_type = portlet_src_type;
	}

	/**
	 * 获取视图字段
	 * 
	 * @return String
	 */
	public String getPortlet_view_column() {
		return portlet_view_column;
	}

	/**
	 * 设置视图字段
	 * 
	 * @param portlet_view_column
	 *            String 视图字段
	 */
	public void setPortlet_view_column(String portlet_view_column) {
		this.portlet_view_column = portlet_view_column;
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
}
