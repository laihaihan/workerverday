package com.linewell.core.log.method;
 
/**
 * <p>
 * 	实体
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2013-09-29 11:06:03
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class LogMethod {
			
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 类全路径名
	 */
	private String method  = "" ;
		
	/**
	 * 开始时间
	 */
	private String createtime  = "" ;
		
	/**
	 * 结束时间
	 */
	private String destorytime  = "" ;
		
	/**
	 * 耗时（ms）
	 */
	private double activetime ;
		
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
	 * 获取类全路径名
	 * @return String
	 */
	public String getMethod() {
		return method;
	}

	/**
	 * 设置类全路径名
	 * @param method
	 *               String 类全路径名
	 */
	public void setMethod(String method) {
		this.method = method;
	}
	
	/**
	 * 获取开始时间
	 * @return String
	 */
	public String getCreatetime() {
		return createtime;
	}

	/**
	 * 设置开始时间
	 * @param createtime
	 *               String 开始时间
	 */
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	
	/**
	 * 获取结束时间
	 * @return String
	 */
	public String getDestorytime() {
		return destorytime;
	}

	/**
	 * 设置结束时间
	 * @param destorytime
	 *               String 结束时间
	 */
	public void setDestorytime(String destorytime) {
		this.destorytime = destorytime;
	}
	
	/**
	 * 获取耗时（ms）
	 * @return double
	 */
	public double getActivetime() {
		return activetime;
	}

	/**
	 * 设置耗时（ms）
	 * @param activetime
	 *               double 耗时（ms）
	 */
	public void setActivetime(double activetime) {
		this.activetime = activetime;
	}
		
}
