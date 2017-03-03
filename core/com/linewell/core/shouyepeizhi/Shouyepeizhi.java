package com.linewell.core.shouyepeizhi;

/**
 * <p>
 * 实体
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2013-05-08 11:39:43
 * @version 1.00
 *          <p>
 *          Copyright (c) 2012 www.linewell.com
 *          </p>
 */

public class Shouyepeizhi {

    /**
     * 主键
     */
    private String unid                = "";

    /**
     * 标题
     */
    private String title               = "";

    /**
     * 数据来源类型
     */
    private String source_type         = "";

    /**
     * 数据来源值
     */
    private String source              = "";

    /**
     * 关联角色
     */
    private String belong_to_roles     = "";
    /**
     * 关联角色名称
     */
    private String belong_to_rolesname = "";

    /**
     * 所属应用系统
     */
    private String belong_to_apps      = "";

    /**
     * 位置
     */
    private String position            = "";

    /**
     * 所有显示的视图列
     * 
     * @return
     */
    private String view_column         = "";
    
    /**
     * 高度
     * @return
     */
    private String height = "";
    
    /**
     * 记录数
     * @return
     */
    private String recordnum = "";
    
    

    public String getRecordnum() {
        return recordnum;
    }

    public void setRecordnum(String recordnum) {
        this.recordnum = recordnum;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getView_column() {
        return view_column;
    }

    public void setView_column(String view_column) {
        this.view_column = view_column;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    /**
     * 获取主键
     * 
     * @return String
     */
    public String getUnid() {
        return unid;
    }

    /**
     * 设置主键
     * 
     * @param unid
     *            String 主键
     */
    public void setUnid(String unid) {
        this.unid = unid;
    }

    /**
     * 获取标题
     * 
     * @return String
     */
    public String getTitle() {
        return title;
    }

    /**
     * 设置标题
     * 
     * @param title
     *            String 标题
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * 获取数据来源类型
     * 
     * @return String
     */
    public String getSource_type() {
        return source_type;
    }

    /**
     * 设置数据来源类型
     * 
     * @param source_type
     *            String 数据来源类型
     */
    public void setSource_type(String source_type) {
        this.source_type = source_type;
    }

    /**
     * 获取数据来源值
     * 
     * @return String
     */
    public String getSource() {
        return source;
    }

    /**
     * 设置数据来源值
     * 
     * @param source
     *            String 数据来源值
     */
    public void setSource(String source) {
        this.source = source;
    }

    /**
     * 获取关联角色
     * 
     * @return String
     */
    public String getBelong_to_roles() {
        return belong_to_roles;
    }

    /**
     * 设置关联角色
     * 
     * @param belong_to_roles
     *            String 关联角色
     */
    public void setBelong_to_roles(String belong_to_roles) {
        this.belong_to_roles = belong_to_roles;
    }

    /**
     * 获取所属应用系统
     * 
     * @return String
     */
    public String getBelong_to_apps() {
        return belong_to_apps;
    }

    /**
     * 设置所属应用系统
     * 
     * @param belong_to_apps
     *            String 所属应用系统
     */
    public void setBelong_to_apps(String belong_to_apps) {
        this.belong_to_apps = belong_to_apps;
    }

    public String getBelong_to_rolesname() {
        return belong_to_rolesname;
    }

    public void setBelong_to_rolesname(String belong_to_rolesname) {
        this.belong_to_rolesname = belong_to_rolesname;
    }

}
