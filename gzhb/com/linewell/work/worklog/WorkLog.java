package com.linewell.work.worklog;
 
/**
 * <p>
 * 	工作日志实体
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2014-03-20 17:50:09
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class WorkLog {
			
	/**
	 * 
	 */
	private String unid  = "" ;
		
	/**
	 * 汇报人
	 */
	private String huibaoren  = "" ;
		
	/**
	 * 审批人
	 */
	private String shenpiren  = "" ;
		
	/**
	 * 汇报内容
	 */
	private String huibaoneirong  = "" ;
	/**
	 * 今日总结
	 */
	private String jinrizongjie  = "" ;
		
	/**
	 * 汇报时间
	 */
	private String huibaoshijian  = "" ;
		
	/**
	 * 审批时间
	 */
	private String shenpishijian  = "" ;
		
	/**
	 * 审批意见
	 */
	private String shenpiyijian  = "" ;
		
	/**
	 * 状态
	 */
	private String zhuangtai  = "" ;
		
	/**
	 * 汇报人编号
	 */
	private String huibaoneirongid  = "" ;
		
	/**
	 * 审批人编号
	 */
	private String shenpirenid  = "" ;
		
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
	 * 获取汇报人
	 * @return String
	 */
	public String getHuibaoren() {
		return huibaoren;
	}

	/**
	 * 设置汇报人
	 * @param huibaoren
	 *               String 汇报人
	 */
	public void setHuibaoren(String huibaoren) {
		this.huibaoren = huibaoren;
	}
	
	/**
	 * 获取审批人
	 * @return String
	 */
	public String getShenpiren() {
		return shenpiren;
	}

	/**
	 * 设置审批人
	 * @param shenpiren
	 *               String 审批人
	 */
	public void setShenpiren(String shenpiren) {
		this.shenpiren = shenpiren;
	}
	
	/**
	 * 获取汇报内容
	 * @return String
	 */
	public String getHuibaoneirong() {
		return huibaoneirong;
	}

	/**
	 * 设置汇报内容
	 * @param huibaoneirong
	 *               String 汇报内容
	 */
	public void setHuibaoneirong(String huibaoneirong) {
		this.huibaoneirong = huibaoneirong;
	}
	
	/**
	 * 获取汇报时间
	 * @return String
	 */
	public String getHuibaoshijian() {
		return huibaoshijian;
	}

	/**
	 * 设置汇报时间
	 * @param huibaoshijian
	 *               String 汇报时间
	 */
	public void setHuibaoshijian(String huibaoshijian) {
		this.huibaoshijian = huibaoshijian;
	}
	
	/**
	 * 获取审批时间
	 * @return String
	 */
	public String getShenpishijian() {
		return shenpishijian;
	}

	/**
	 * 设置审批时间
	 * @param shenpishijian
	 *               String 审批时间
	 */
	public void setShenpishijian(String shenpishijian) {
		this.shenpishijian = shenpishijian;
	}
	
	/**
	 * 获取审批意见
	 * @return String
	 */
	public String getShenpiyijian() {
		return shenpiyijian;
	}

	/**
	 * 设置审批意见
	 * @param shenpiyijian
	 *               String 审批意见
	 */
	public void setShenpiyijian(String shenpiyijian) {
		this.shenpiyijian = shenpiyijian;
	}
	
	/**
	 * 获取状态
	 * @return String
	 */
	public String getZhuangtai() {
		return zhuangtai;
	}

	/**
	 * 设置状态
	 * @param zhuangtai
	 *               String 状态
	 */
	public void setZhuangtai(String zhuangtai) {
		this.zhuangtai = zhuangtai;
	}
	
	/**
	 * 获取汇报人编号
	 * @return String
	 */
	public String getHuibaoneirongid() {
		return huibaoneirongid;
	}

	/**
	 * 设置汇报人编号
	 * @param huibaoneirongid
	 *               String 汇报人编号
	 */
	public void setHuibaoneirongid(String huibaoneirongid) {
		this.huibaoneirongid = huibaoneirongid;
	}
	
	/**
	 * 获取审批人编号
	 * @return String
	 */
	public String getShenpirenid() {
		return shenpirenid;
	}

	/**
	 * 设置审批人编号
	 * @param shenpirenid
	 *               String 审批人编号
	 */
	public void setShenpirenid(String shenpirenid) {
		this.shenpirenid = shenpirenid;
	}

	public String getJinrizongjie() {
		return jinrizongjie;
	}

	public void setJinrizongjie(String jinrizongjie) {
		this.jinrizongjie = jinrizongjie;
	}
		
}
