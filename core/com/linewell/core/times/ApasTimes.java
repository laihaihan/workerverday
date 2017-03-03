package com.linewell.core.times;

/**
 * <p>
 * ApasTimes实体
 * </p>
 * 
 * @author:qcongyong email:yesqcy@163.com
 * @version 1.0.0 2011-11-23 17:35:58
 *
 */
public class ApasTimes {
	/**
	 * 主键
	 */
	private String unid = "";

	/**
	 * 办件unid
	 */
	private String punid = "";

	/**
	 * 特殊环节类型
	 */
	private String ftype = "";

	/**
	 * 特殊环节开始时间
	 */
	private String sdatetime = "";

	/**
	 * 特殊环节结束时间
	 */
	private String edatetime = "";

	/**
	 * 开始的处理人员
	 */
	private String suser = "";
	
	

	/**
	 * 结束的处理人员
	 */
	private String euser = "";

	/**
	 * 是否使用过,Y表示用过, N表示没有用过,此字段主要用在多次补件
	 */
	private String isused = "";

	/**
	 * 备注信息
	 */
	private String memo = "";
	
	/**
	 * 预估结束时间
	 */
	private String estimate_date = "";
	
	/**
	 * 申请人-暂保使用
	 */
	private String apply_name = "";
	
	/**
	 * 授权人-暂保使用
	 */
	private String auth_name = "";

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
	 * 获取办件unid
	 * @return String
	 */
	public String getPunid() {
		return punid;
	}

	/**
	 * 设置办件unid
	 * @param punid
	 *               String 办件unid
	 */
	public void setPunid(String punid) {
		this.punid = punid;
	}

	/**
	 * 获取特殊环节类型
	 * @return String
	 */
	public String getFtype() {
		return ftype;
	}

	/**
	 * 设置特殊环节类型
	 * @param ftype
	 *               String 特殊环节类型
	 */
	public void setFtype(String ftype) {
		this.ftype = ftype;
	}

	/**
	 * 获取特殊环节开始时间
	 * @return String
	 */
	public String getSdatetime() {
		return sdatetime;
	}

	/**
	 * 设置特殊环节开始时间
	 * @param sdatetime
	 *               String 特殊环节开始时间
	 */
	public void setSdatetime(String sdatetime) {
		this.sdatetime = sdatetime;
	}

	/**
	 * 获取特殊环节结束时间
	 * @return String
	 */
	public String getEdatetime() {
		return edatetime;
	}

	/**
	 * 设置特殊环节结束时间
	 * @param edatetime
	 *               String 特殊环节结束时间
	 */
	public void setEdatetime(String edatetime) {
		this.edatetime = edatetime;
	}

	/**
	 * 获取开始的处理人员
	 * @return String
	 */
	public String getSuser() {
		return suser;
	}

	/**
	 * 设置开始的处理人员
	 * @param suser
	 *               String 开始的处理人员
	 */
	public void setSuser(String suser) {
		this.suser = suser;
	}

	/**
	 * 获取结束的处理人员
	 * @return String
	 */
	public String getEuser() {
		return euser;
	}

	/**
	 * 设置结束的处理人员
	 * @param euser
	 *               String 结束的处理人员
	 */
	public void setEuser(String euser) {
		this.euser = euser;
	}

	/**
	 * 获取是否使用过,Y表示用过, N表示没有用过,此字段主要用在多次补件
	 * @return String
	 */
	public String getIsused() {
		return isused;
	}

	/**
	 * 设置是否使用过,Y表示用过, N表示没有用过,此字段主要用在多次补件
	 * @param isused
	 *               String 是否使用过,Y表示用过, N表示没有用过,此字段主要用在多次补件
	 */
	public void setIsused(String isused) {
		this.isused = isused;
	}

	/**
	 * 获取备注信息
	 * @return String
	 */
	public String getMemo() {
		return memo;
	}

	/**
	 * 设置备注信息
	 * @param memo
	 *               String 备注信息
	 */
	public void setMemo(String memo) {
		this.memo = memo;
	}

	/**
	 * 获取预估结束时间
	 * @return String
	 */
	public String getEstimate_date() {
		return estimate_date;
	}

	/**
	 * 设置预估结束时间
	 * @param estimate_date
	 *               String 预估结束时间
	 */
	public void setEstimate_date(String estimate_date) {
		this.estimate_date = estimate_date;
	}

	public String getApply_name() {
		return apply_name;
	}

	public void setApply_name(String applyName) {
		apply_name = applyName;
	}

	public String getAuth_name() {
		return auth_name;
	}

	public void setAuth_name(String authName) {
		auth_name = authName;
	}
	
}