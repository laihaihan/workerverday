package com.linewell.core.flow.flowtest;
 
/**
 * <p>
 * 	流程测试关联表实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2013-04-08 18:01:59
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class FlowTest {
			
	/**
	 * 
	 */
	private String unid  = "" ;
		
	/**
	 * 标题
	 */
	private String title  = "" ;
		
	/**
	 * 获取
	 * @return String
	 */
	public String getUnid() {
		return unid;
	}

	/**
	 * 设置
	 * @param unid
	 *               String 
	 */
	public void setUnid(String unid) {
		this.unid = unid;
	}
	
	/**
	 * 获取标题
	 * @return String
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * 设置标题
	 * @param title
	 *               String 标题
	 */
	public void setTitle(String title) {
		this.title = title;
	}
		
}
