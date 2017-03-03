package com.linewell.core.treedict;
 
/**
 * <p>
 * 	树形数据字典实体
 * </P>
 * 
 * @author yq@linewell.com
 * @date 2012-08-31 14:52:27
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class ApasTreeDict {
			
	/**
	 * unid编号
	 */
	private String unid  = "" ;
		
	/**
	 * 字典类型
	 */
	private String dicttype  = "" ;
		
	/**
	 * 字典名称
	 */
	private String dictname  = "" ;
		
	/**
	 * 字典值
	 */
	private String dictvalue  = "" ;
		
	/**
	 * 父节点
	 */
	private String pcode  = "" ;
		
	/**
	 * 状态(Y表示启用,N表示禁用)
	 */
	private String state  = "" ;
		
	/**
	 * 字典数值说明
	 */
	private String memo  = "" ;
		
	/**
	 * 排序编号
	 */
	private long sortid ;
		
	/**
	 * 创建时间
	 */
	private String createtime  = "" ;
		
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
	 * 获取字典类型
	 * @return String
	 */
	public String getDicttype() {
		return dicttype;
	}

	/**
	 * 设置字典类型
	 * @param dicttype
	 *               String 字典类型
	 */
	public void setDicttype(String dicttype) {
		this.dicttype = dicttype;
	}
	
	/**
	 * 获取字典名称
	 * @return String
	 */
	public String getDictname() {
		return dictname;
	}

	/**
	 * 设置字典名称
	 * @param dictname
	 *               String 字典名称
	 */
	public void setDictname(String dictname) {
		this.dictname = dictname;
	}
	
	/**
	 * 获取字典值
	 * @return String
	 */
	public String getDictvalue() {
		return dictvalue;
	}

	/**
	 * 设置字典值
	 * @param dictvalue
	 *               String 字典值
	 */
	public void setDictvalue(String dictvalue) {
		this.dictvalue = dictvalue;
	}
	
	/**
	 * 获取父节点
	 * @return String
	 */
	public String getPcode() {
		return pcode;
	}

	/**
	 * 设置父节点
	 * @param pcode
	 *               String 父节点
	 */
	public void setPcode(String pcode) {
		this.pcode = pcode;
	}
	
	/**
	 * 获取状态(Y表示启用,N表示禁用)
	 * @return String
	 */
	public String getState() {
		return state;
	}

	/**
	 * 设置状态(Y表示启用,N表示禁用)
	 * @param state
	 *               String 状态(Y表示启用,N表示禁用)
	 */
	public void setState(String state) {
		this.state = state;
	}
	
	/**
	 * 获取字典数值说明
	 * @return String
	 */
	public String getMemo() {
		return memo;
	}

	/**
	 * 设置字典数值说明
	 * @param memo
	 *               String 字典数值说明
	 */
	public void setMemo(String memo) {
		this.memo = memo;
	}
	
	/**
	 * 获取排序编号
	 * @return long
	 */
	public long getSortid() {
		return sortid;
	}

	/**
	 * 设置排序编号
	 * @param sortid
	 *               long 排序编号
	 */
	public void setSortid(long sortid) {
		this.sortid = sortid;
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
