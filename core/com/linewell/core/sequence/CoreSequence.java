package com.linewell.core.sequence;
 
/**
 * <p>
 * 	流水号模式实体
 * </P>
 * 
 * @author cbingcan@linewell.com
 * @date 2012-09-04 14:24:36
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class CoreSequence {
			
	/**
	 * 唯一编号
	 */
	private String unid  = "" ;
		
	/**
	 * 序号初始值
	 */
	private String initnumber  = "" ;
		
	/**
	 * 序号初始值
	 */
	private String numbercount  = "" ;
		
	/**
	 * 年度
	 */
	private String currentyear  = "" ;
		
	/**
	 * 是否可重复
	 */
	private String canrepeat  = "false" ;
		
	/**
	 * 自动调整编号
	 */
	private String autoadjust  = "false" ;
		
	/**
	 * 启用重新编号
	 */
	private String refreshsequence  = "false" ;
		
	/**
	 * 序号样式
	 */
	private String formatstring  = "" ;
		
	/**
	 * 获取唯一编号
	 * @return String
	 */
	public String getUnid() {
		return unid;
	}

	/**
	 * 设置唯一编号
	 * @param unid
	 *               String 唯一编号
	 */
	public void setUnid(String unid) {
		this.unid = unid;
	}
	
	/**
	 * 获取序号初始值
	 * @return String
	 */
	public String getInitnumber() {
		return initnumber;
	}

	/**
	 * 设置序号初始值
	 * @param initnumber
	 *               String 序号初始值
	 */
	public void setInitnumber(String initnumber) {
		this.initnumber = initnumber;
	}
	
	/**
	 * 获取序号初始值
	 * @return String
	 */
	public String getNumbercount() {
		return numbercount;
	}

	/**
	 * 设置序号初始值
	 * @param numbercount
	 *               String 序号初始值
	 */
	public void setNumbercount(String numbercount) {
		this.numbercount = numbercount;
	}
	
	/**
	 * 获取年度
	 * @return String
	 */
	public String getCurrentyear() {
		return currentyear;
	}

	/**
	 * 设置年度
	 * @param currentyear
	 *               String 年度
	 */
	public void setCurrentyear(String currentyear) {
		this.currentyear = currentyear;
	}
	
	/**
	 * 获取是否可重复
	 * @return String
	 */
	public String getCanrepeat() {
		return canrepeat;
	}

	/**
	 * 设置是否可重复
	 * @param canrepeat
	 *               String 是否可重复
	 */
	public void setCanrepeat(String canrepeat) {
		this.canrepeat = canrepeat;
	}
	
	/**
	 * 获取自动调整编号
	 * @return String
	 */
	public String getAutoadjust() {
		return autoadjust;
	}

	/**
	 * 设置自动调整编号
	 * @param autoadjust
	 *               String 自动调整编号
	 */
	public void setAutoadjust(String autoadjust) {
		this.autoadjust = autoadjust;
	}
	
	/**
	 * 获取启用重新编号
	 * @return String
	 */
	public String getRefreshsequence() {
		return refreshsequence;
	}

	/**
	 * 设置启用重新编号
	 * @param refreshsequence
	 *               String 启用重新编号
	 */
	public void setRefreshsequence(String refreshsequence) {
		this.refreshsequence = refreshsequence;
	}
	
	/**
	 * 获取序号样式
	 * @return String
	 */
	public String getFormatstring() {
		return formatstring;
	}

	/**
	 * 设置序号样式
	 * @param formatstring
	 *               String 序号样式
	 */
	public void setFormatstring(String formatstring) {
		this.formatstring = formatstring;
	}
		
}
