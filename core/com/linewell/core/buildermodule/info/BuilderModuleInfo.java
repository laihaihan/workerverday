package com.linewell.core.buildermodule.info;
 
/**
 * <p>
 * 	快速建模-基本信息表实体
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2013-04-17 16:41:14
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class BuilderModuleInfo {
			
	/**
	 * 主键
	 */
	private String unid  = "" ;
		
	/**
	 * 标题
	 */
	private String titile  = "" ;
	/**
	 * 模块unid
	 */
	private String belongtomoduleunid  = "" ;
	/**
	 * 模块名称
	 */
	private String belongtomodulename  = "" ;
		
	/**
	 * 创建时间
	 */
	private String createtime  = "" ;
		
	/**
	 * 最后一次修改时间
	 */
	private String lastmodifytime  = "" ;
		

	/**
	 * 系统唯一标识
	 */
	private String appunid  = "" ;
	
	/**
	 * 是否有附件 0 没有，1 有
	 */
	private int ishavefile ;

	/**
	 * 自动生成的视图id
	 */
	private String viewunid="";

	/**
	 * 自动生成的模块unid
	 */
	private String moduleunid="";
	
	/**
	 * 表名
	 */
	private String tablename="";
	
	/**
	 * 类名
	 */
	private String classname="";
	
	

	private String packname="";
	
	/**
	 * 备注
	 */
	private String memo  = "" ;
		
	public int getIshavefile() {
		return ishavefile;
	}

	public void setIshavefile(int ishavefile) {
		this.ishavefile = ishavefile;
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
	 * 获取标题
	 * @return String
	 */
	public String getTitile() {
		return titile;
	}

	/**
	 * 设置标题
	 * @param titile
	 *               String 标题
	 */
	public void setTitile(String titile) {
		this.titile = titile;
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
	 * 获取最后一次修改时间
	 * @return String
	 */
	public String getLastmodifytime() {
		return lastmodifytime;
	}

	/**
	 * 设置最后一次修改时间
	 * @param lastmodifytime
	 *               String 最后一次修改时间
	 */
	public void setLastmodifytime(String lastmodifytime) {
		this.lastmodifytime = lastmodifytime;
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

	public String getBelongtomoduleunid() {
		return belongtomoduleunid;
	}

	public void setBelongtomoduleunid(String belongtomoduleunid) {
		this.belongtomoduleunid = belongtomoduleunid;
	}

	public String getBelongtomodulename() {
		return belongtomodulename;
	}

	public void setBelongtomodulename(String belongtomodulename) {
		this.belongtomodulename = belongtomodulename;
	}

	public String getViewunid() {
		return viewunid;
	}

	public void setViewunid(String viewunid) {
		this.viewunid = viewunid;
	}

	public String getModuleunid() {
		return moduleunid;
	}

	public void setModuleunid(String moduleunid) {
		this.moduleunid = moduleunid;
	}

	public String getAppunid() {
		return appunid;
	}

	public void setAppunid(String appunid) {
		this.appunid = appunid;
	}

	public String getTablename() {
		return tablename;
	}

	public void setTablename(String tablename) {
		this.tablename = tablename;
	}

	public String getClassname() {
		return classname;
	}

	public void setClassname(String classname) {
		this.classname = classname;
	}

	public String getPackname() {
		return packname;
	}

	public void setPackname(String packname) {
		this.packname = packname;
	}



		
}
