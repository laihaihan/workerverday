package com.linewell.core.print.printlog;
import java.sql.Blob;
 
/**
 * <p>
 * 	实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-06-04 15:41:20
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class PrintLog {
			
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 打印所属信息主表unid,例如apas_info.unid
	 */
	private String punid  = "" ;
		
	/**
	 * 打印结果实体
	 */
	private Blob filecontent ;
		
	/**
	 * 创建时间
	 */
	private String createtime  = "" ;
		
	/**
	 * 操作者id
	 */
	private String opuserid  = "" ;
		
	/**
	 * 操作者名字
	 */
	private String opusername  = "" ;
		
	/**
	 * 打印名称
	 */
	private String printname = "";
	
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
	 * 获取打印所属信息主表unid,例如apas_info.unid
	 * @return String
	 */
	public String getPunid() {
		return punid;
	}

	/**
	 * 设置打印所属信息主表unid,例如apas_info.unid
	 * @param punid
	 *               String 打印所属信息主表unid,例如apas_info.unid
	 */
	public void setPunid(String punid) {
		this.punid = punid;
	}
	
	/**
	 * 获取打印结果实体
	 * @return Blob
	 */
	public Blob getFilecontent() {
		return filecontent;
	}

	/**
	 * 设置打印结果实体
	 * @param filecontent
	 *               Blob 打印结果实体
	 */
	public void setFilecontent(Blob filecontent) {
		this.filecontent = filecontent;
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
	
	/**
	 * 获取操作者id
	 * @return String
	 */
	public String getOpuserid() {
		return opuserid;
	}

	/**
	 * 设置操作者id
	 * @param opuserid
	 *               String 操作者id
	 */
	public void setOpuserid(String opuserid) {
		this.opuserid = opuserid;
	}
	
	/**
	 * 获取操作者名字
	 * @return String
	 */
	public String getOpusername() {
		return opusername;
	}

	/**
	 * 设置操作者名字
	 * @param opusername
	 *               String 操作者名字
	 */
	public void setOpusername(String opusername) {
		this.opusername = opusername;
	}

	public String getPrintname() {
		return printname;
	}

	public void setPrintname(String printname) {
		this.printname = printname;
	}
		
}
