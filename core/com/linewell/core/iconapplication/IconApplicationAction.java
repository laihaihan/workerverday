package com.linewell.core.iconapplication;

import java.io.File;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.ListUtil;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.StrUtil;
import com.opensymphony.xwork2.ActionSupport;
/**
 * <p>图标</P>
 * @author lfunian@linewell.com
 * @date Sep 2, 2013
 * @version 1.00
 * <p>Copyright (c) 2011 www.linewell.com</p>
 */
public class IconApplicationAction extends ActionSupport {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private File file;
	private String fileFileName;
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();		
		HttpServletResponse response = ServletActionContext.getResponse();	

		JSONObject json = new JSONObject();
        String fn = request.getParameter("fn");
        boolean result = true;
        IconApplicationBusiness business = new IconApplicationBusiness();
		
        //1、新增
        if("add".equals(fn)){
        	IconApplication icon = new IconApplication();
        	BeanUtil.updateBean(request, icon);
        	//将样式写入css文件
        	result = business.doWriteToCss(icon);
        	if (result) {
        		result = business.doSave(icon);
			}
        }
        //2、修改
        else if("update".equals(fn)){
        	String unid = request.getParameter("icon_unid");
        	IconApplication icon = business.doFindBeanByKey(unid);
        	String iconPath = icon.getIcon_path();
        	String iconClass = icon.getIcon_class();
        	BeanUtil.updateBean(request, icon);   
        	//在图标发生改变时，修改css文件
        	if (!(StrUtil.formatNull(iconPath).equals(icon.getIcon_path())) || !(StrUtil.formatNull(iconClass).equals(icon.getIcon_class()))) {
        		result = business.doUpdateCssFile(icon, iconClass, iconPath);
			}
        	if (result) {
            	result = business.doUpdate(icon);
			}
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "icon_unid in ("+ids+")";
        	List list = business.doFindListByCondition(condition, null);
        	if (!ListUtil.isNull(list)) {
        		IconApplication iconApplication = null;
        		for (Object object : list) {
        			iconApplication = (IconApplication)object;
					if (iconApplication != null) {
						result = business.doDeleteImgByImgPath(iconApplication.getIcon_path());
						if (result) {
							result = business.doDeleteCssClass(iconApplication.getIcon_class());
						}
					}
				}
        	}
        	if (result) {
        		result = business.doDeleteByCondition(condition);
			}
        }
        //4、上传图片
        else if("uploadImg".equals(fn)){
        	result = business.doUploadImg(this.fileFileName, this.file);
    		json.put("imgPath", GlobalParameter.CORE_FILEPATH + "icon/" + this.fileFileName);
        } 
        //5、在上传新图片之后，删除已有的旧图片，防止无效图片存在
        else if("delOldImg".equals(fn)){
        	String imgPath = request.getParameter("imgPath");
        	result = business.doDeleteImgByImgPath(imgPath);
        }
        //6、判断样式名称是否重复
        else if("repeat".equals(fn)){
        	String iconClass = request.getParameter("iconClass");
        	result = business.doIsRepeat(iconClass);
        }
        //返回值
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		return null;
    }
	public File getFile() {
		return file;
	}
	public void setFile(File file) {
		this.file = file;
	}
	public String getFileFileName() {
		return fileFileName;
	}
	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}
}
