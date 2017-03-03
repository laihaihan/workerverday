package com.linewell.core.weekset;
/**
 * <p>
 *    节假日设计
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Dec 24, 2012
 * @version 1.0  
 */
public class WeekSet {
	/**
	 * unid编号
	 */
	private String unid = "";

	/**
	 * 类型，H为节假日(holiday)，O为加班日(overtime)
	 */
	private String type = "";

	/**
	 * 开始时间
	 */
	private String startdate = "";

	/**
	 * 结束时间
	 */
	private String enddate = "";

	/**
	 * 备注
	 */
	private String memo = "";

	/**
	 * 状态(Y/N)
	 */
	private String state = "";

	/**
	 * 创建时间
	 */
	private String createtime = "";

	/**
	 * 获取unid编号
	 * @return String
	 */
	public String getUnid() {
		return unid;
	}

	/**
	 * 设置unid编号
	 * @param unid
	 *               String unid编号
	 */
	public void setUnid(String unid) {
		this.unid = unid;
	}

	/**
	 * 获取类型，H为节假日(holiday)，O为加班日(overtime)
	 * @return String
	 */
	public String getType() {
		return type;
	}

	/**
	 * 设置类型，H为节假日(holiday)，O为加班日(overtime)
	 * @param type
	 *               String 类型，H为节假日(holiday)，O为加班日(overtime)
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * 获取开始时间
	 * @return String
	 */
	public String getStartdate() {
		return startdate;
	}

	/**
	 * 设置开始时间
	 * @param startdate
	 *               String 开始时间
	 */
	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}

	/**
	 * 获取结束时间
	 * @return String
	 */
	public String getEnddate() {
		return enddate;
	}

	/**
	 * 设置结束时间
	 * @param enddate
	 *               String 结束时间
	 */
	public void setEnddate(String enddate) {
		this.enddate = enddate;
	}

	/**
	 * 获取备注
	 * @return String
	 */
	public String getMemo() {
		return memo;
	}

	/**
	 * 设置备注
	 * @param memo
	 *               String 备注
	 */
	public void setMemo(String memo) {
		this.memo = memo;
	}

	/**
	 * 获取状态(Y/N)
	 * @return String
	 */
	public String getState() {
		return state;
	}

	/**
	 * 设置状态(Y/N)
	 * @param state
	 *               String 状态(Y/N)
	 */
	public void setState(String state) {
		this.state = state;
	}

	/**
	 * 获取创建时间
	 * @return String
	 */
	public String getCreatetime() {
		return createtime;
	}

	/**
	 * 设置创建时间
	 * @param createtime
	 *               String 创建时间
	 */
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
}