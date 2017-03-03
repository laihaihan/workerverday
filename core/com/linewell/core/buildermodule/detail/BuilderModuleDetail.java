package com.linewell.core.buildermodule.detail;
 
/**
 * <p>
 * 	快速建模-字段详细信息实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2013-04-17 16:41:48
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class BuilderModuleDetail {
			
	/**
	 * 长度限制，没填默认500
	 */
	private int lengthlimit ;
		
	/**
	 * 主键
	 */
	private String unid  = "" ;
		

	/**
	 * 主键
	 */
	private String punid  = "" ;
	
	/**
	 * 中文名、标题
	 */
	private String caption  = "" ;
		
	/**
	 * 字段英文名：根据中文翻译自动生成
	 */
	private String enname  = "" ;
	
	/**
	 * 排序号
	 */
	private String sortcode  = "" ;

	private int isshowinview;
	
	
	
	public int getLengthlimit() {
		return lengthlimit;
	}

	public void setLengthlimit(int lengthlimit) {
		this.lengthlimit = lengthlimit;
	}

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
	 * 获取中文名、标题
	 * @return String
	 */
	public String getCaption() {
		return caption;
	}

	/**
	 * 设置中文名、标题
	 * @param caption
	 *               String 中文名、标题
	 */
	public void setCaption(String caption) {
		this.caption = caption;
	}
	
	/**
	 * 获取字段英文名：根据中文翻译自动生成
	 * @return String
	 */
	public String getEnname() {
		return enname;
	}

	/**
	 * 设置字段英文名：根据中文翻译自动生成
	 * @param enname
	 *               String 字段英文名：根据中文翻译自动生成
	 */
	public void setEnname(String enname) {
		this.enname = enname;
	}

	public String getSortcode() {
		return sortcode;
	}

	public void setSortcode(String sortcode) {
		this.sortcode = sortcode;
	}

	public String getPunid() {
		return punid;
	}

	public void setPunid(String punid) {
		this.punid = punid;
	}

	public int getIsshowinview() {
		return isshowinview;
	}

	public void setIsshowinview(int isshowinview) {
		this.isshowinview = isshowinview;
	}
		
}
