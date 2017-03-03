package com.linewell.core.attr.cfg;
import java.sql.Blob;
 
/**
 * <p>
 * 	模板配置实体
 * </P>
 * 
 * @author cbingcan@linewell.com
 * @date 2012-10-16 16:32:44
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
 
public class UcapAttrConfig {
			
	/**
	 * 模板主键
	 */
	private String attr_cfg_unid  = "" ;
		
	/**
	 * 模板所属UNID
	 */
	private String attr_cfg_punid  = "" ;
		
	/**
	 * 模板类型
	 */
	private String attr_cfg_type  = "" ;
		
	/**
	 * 模板文件名
	 */
	private String attr_cfg_file_name  = "" ;
		
	/**
	 * 模板创建时间
	 */
	private String attr_cfg_created  = "" ;
		
	/**
	 * 模板标题
	 */
	private String attr_cfg_caption  = "" ;
		
	/**
	 * 模板文件大小
	 */
	private String attr_cfg_size  = "" ;
		
	/**
	 * 模板所属应用ID
	 */
	private String attr_cfg_belong_to_app  = "" ;
		
	/**
	 * 模板是否已经保存
	 */
	private String attr_cfg_isdocsave  = "" ;
		
	/**
	 * 模板关联资源编号
	 */
	private String attr_relsource_unid  = "" ;
		
	/**
	 * 模板内容
	 */
	private Blob attr_cfg_contents ;
		
	/**
	 * 获取
	 * @return String
	 */
	public String getAttr_cfg_unid() {
		return attr_cfg_unid;
	}

	/**
	 * 设置
	 * @param attr_cfg_unid
	 *               String 
	 */
	public void setAttr_cfg_unid(String attr_cfg_unid) {
		this.attr_cfg_unid = attr_cfg_unid;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getAttr_cfg_punid() {
		return attr_cfg_punid;
	}

	/**
	 * 设置
	 * @param attr_cfg_punid
	 *               String 
	 */
	public void setAttr_cfg_punid(String attr_cfg_punid) {
		this.attr_cfg_punid = attr_cfg_punid;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getAttr_cfg_type() {
		return attr_cfg_type;
	}

	/**
	 * 设置
	 * @param attr_cfg_type
	 *               String 
	 */
	public void setAttr_cfg_type(String attr_cfg_type) {
		this.attr_cfg_type = attr_cfg_type;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getAttr_cfg_file_name() {
		return attr_cfg_file_name;
	}

	/**
	 * 设置
	 * @param attr_cfg_file_name
	 *               String 
	 */
	public void setAttr_cfg_file_name(String attr_cfg_file_name) {
		this.attr_cfg_file_name = attr_cfg_file_name;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getAttr_cfg_created() {
		return attr_cfg_created;
	}

	/**
	 * 设置
	 * @param attr_cfg_created
	 *               String 
	 */
	public void setAttr_cfg_created(String attr_cfg_created) {
		this.attr_cfg_created = attr_cfg_created;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getAttr_cfg_caption() {
		return attr_cfg_caption;
	}

	/**
	 * 设置
	 * @param attr_cfg_caption
	 *               String 
	 */
	public void setAttr_cfg_caption(String attr_cfg_caption) {
		this.attr_cfg_caption = attr_cfg_caption;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getAttr_cfg_size() {
		return attr_cfg_size;
	}

	/**
	 * 设置
	 * @param attr_cfg_size
	 *               String 
	 */
	public void setAttr_cfg_size(String attr_cfg_size) {
		this.attr_cfg_size = attr_cfg_size;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getAttr_cfg_belong_to_app() {
		return attr_cfg_belong_to_app;
	}

	/**
	 * 设置
	 * @param attr_cfg_belong_to_app
	 *               String 
	 */
	public void setAttr_cfg_belong_to_app(String attr_cfg_belong_to_app) {
		this.attr_cfg_belong_to_app = attr_cfg_belong_to_app;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getAttr_cfg_isdocsave() {
		return attr_cfg_isdocsave;
	}

	/**
	 * 设置
	 * @param attr_cfg_isdocsave
	 *               String 
	 */
	public void setAttr_cfg_isdocsave(String attr_cfg_isdocsave) {
		this.attr_cfg_isdocsave = attr_cfg_isdocsave;
	}
	
	/**
	 * 获取
	 * @return String
	 */
	public String getAttr_relsource_unid() {
		return attr_relsource_unid;
	}

	/**
	 * 设置
	 * @param attr_relsource_unid
	 *               String 
	 */
	public void setAttr_relsource_unid(String attr_relsource_unid) {
		this.attr_relsource_unid = attr_relsource_unid;
	}
	
	/**
	 * 获取
	 * @return Blob
	 */
	public Blob getAttr_cfg_contents() {
		return attr_cfg_contents;
	}

	/**
	 * 设置
	 * @param attr_cfg_contents
	 *               Blob 
	 */
	public void setAttr_cfg_contents(Blob attr_cfg_contents) {
		this.attr_cfg_contents = attr_cfg_contents;
	}
		
}
