package com.linewell.core.iconapplication;

import java.io.File;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.FileUtil;
import com.linewell.core.util.ListUtil;
import com.linewell.core.util.StrUtil;

/**
 * <p>图标</P>
 * @author lfunian@linewell.com
 * @date Sep 2, 2013
 * @version 1.00
 * <p>Copyright (c) 2011 www.linewell.com</p>
 */
public class IconApplicationBusiness {
	IconApplicationManager manager = new IconApplicationManager();
	
	/**
	 * 新增
	 */
	public boolean doSave(IconApplication iconApplication){
		return manager.doSave(iconApplication);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(IconApplication iconApplication){
		return manager.doUpdate(iconApplication);
	}
		
	/**
	 * 根据主键删除
	 */
	public boolean doDeleteByKey(String keyValue){
		return manager.doDeleteByCondition("BUTTON_UNID='"+keyValue+"'");
	}
		
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return manager.doDeleteByCondition(condition);
	}
	
	/**
	 * 根据主键查找单个对象
	 */
	public IconApplication doFindBeanByKey(String keyValue){
		return (IconApplication)manager.doFindBeanByKey(keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] params){
		return manager.doFindListByCondition(condition, params);
	}
	
	/**
	 * <p>根据应用系统主键获取按钮信息</P>
	 * @param fileName 文件名称
	 * @param file 文件对象
	 * @return boolean 操作是否成功
	 */
	public boolean doUploadImg(String fileName, File file){
		String appPath = ServletActionContext.getServletContext().getRealPath("/");
		String uploadPath = appPath + GlobalParameter.CORE_FILEPATH + "icon/";
		FileUtil.mkdirs(uploadPath);
		//将导航栏图标上传至服务器
		File writeFile = new File(uploadPath + File.separator+  fileName);
    	return FileUtil.copyFile(file, writeFile);
	}
	
	/**
	 * <p>根据图片所在路径删除图片</P>
	 * @param imgPath 图标路径
	 * @return boolean 操作是否成功
	 */
	public boolean doDeleteImgByImgPath(String imgPath){
		String appPath = ServletActionContext.getServletContext().getRealPath("/");
		String destPath = appPath + imgPath;
		if(FileUtil.isFileExist(destPath)){
			String condition = "ICON_PATH = '" + imgPath + "'";
			List list = manager.doFindListByCondition(condition, null);
			if (!ListUtil.isNull(list) && (list.size() == 1 || list.size() == 0)) {
				File destFile = new File(destPath);
				destFile.delete();
			}
			return true;
		}
		return true;
	}
	
	/**
	 * <p>向css文件写入样式</p>
	 * @param iconApplication 样式记录对象
	 * @return boolean 操作是否成功
	 */
	public boolean doWriteToCss(IconApplication iconApplication){
		String appPath = ServletActionContext.getServletContext().getRealPath("/");
		StringBuffer sb = new StringBuffer();
        sb.append("\n");
        sb.append(".");
        sb.append(iconApplication.getIcon_class());
        sb.append("{");
        sb.append("\n	background: url('");
        sb.append(iconApplication.getIcon_path().replace("/core/", "../../../"));
        sb.append("') no-repeat;");
        sb.append("\n}");
        return FileUtil.appendStringToFile(appPath + "/core/js/easyui/themes/icon.css", sb.toString());
	}
	
	/**
	 * <p>修改css文件</p>
	 * @param iconApplication 样式记录对象
	 * @param oldIconClass 旧的样式名称
	 * @param oldIconPath 旧的样式图标路径
	 * @return boolean 操作是否成功
	 */
	public boolean doUpdateCssFile(IconApplication iconApplication, String oldIconClass, String oldIconPath){
		String appPath = ServletActionContext.getServletContext().getRealPath("/");
		String filePath = appPath + "/core/js/easyui/themes/icon.css";
		String fileStr = FileUtil.fileToString(filePath);
		boolean bool = true;
		if (!StrUtil.isNull(fileStr)) {
			Pattern pattern = Pattern.compile("[.#]{1}" + oldIconClass + "[\\s]*[\\n]*[\\r]*[{]{1}[\\s]*[\\n]*[\\r]*background[\\s]*[\\n]*[\\r]*:[\\s]*[\\n]*[\\r]*url[\\s]*[\\n]*[\\r]*\\('[\\s]*[\\n]*[\\r]*[\\w./-_]*[\\s]*[\\n]*[\\r]*'\\)[\\s]*[\\n]*[\\r]*no-repeat;[\\s]*[\\n]*[\\r]*[}]{1}");
        	Matcher matcher = pattern.matcher(fileStr);
        	if (matcher.find()) {
        		String imgPath = matcher.group(0);
        		if (!StrUtil.isNull(imgPath)) {
        			StringBuffer sb = new StringBuffer();
        	        sb.append("\n");
        	        sb.append(".");
        	        sb.append(iconApplication.getIcon_class());
        	        sb.append("{");
        	        sb.append("\n	background: url('");
        	        sb.append(iconApplication.getIcon_path().replace("/core/", "../../../"));
        	        sb.append("') no-repeat;");
        	        sb.append("\n}");
        			bool = FileUtil.replaceFileString(filePath, imgPath, sb.toString());
				}
        	}
		}
		return bool;
	}
	
	/**
	 * <p>删除css文件的class</p>
	 * @param iconClass 图标样式名称
	 * @return boolean 操作是否成功
	 */
	public boolean doDeleteCssClass(String iconClass){
		String appPath = ServletActionContext.getServletContext().getRealPath("/");
		String filePath = appPath + "/core/js/easyui/themes/icon.css";
		String fileStr = FileUtil.fileToString(filePath);
		boolean bool = true;
		if (!StrUtil.isNull(fileStr)) {
			Pattern pattern = Pattern.compile("[.#]{1}" + iconClass + "[\\s]*[\\n]*[\\r]*[{]{1}[\\s]*[\\n]*[\\r]*background[\\s]*[\\n]*[\\r]*:[\\s]*[\\n]*[\\r]*url[\\s]*[\\n]*[\\r]*\\('[\\s]*[\\n]*[\\r]*[\\w./-_]*[\\s]*[\\n]*[\\r]*'\\)[\\s]*[\\n]*[\\r]*no-repeat;[\\s]*[\\n]*[\\r]*[}]{1}");
        	Matcher matcher = pattern.matcher(fileStr);
        	if (matcher.find()) {
        		String imgPath = matcher.group(0);
        		if (!StrUtil.isNull(imgPath)) {
        			bool = FileUtil.replaceFileString(filePath, imgPath, "");
				}
        	}
		}
		return bool;
	}
	
	/**
	 * <p>判断是否样式名称重复</p>
	 * @param iconClass 图标样式名称
	 * @return boolean 操作是否成功
	 */
	public boolean doIsRepeat(String iconClass){
		String condition = "icon_class = '" + iconClass + "'";
		List iconList = manager.doFindListByCondition(condition, null);
		if (!ListUtil.isNull(iconList)) {
			return false;
		}
		return true;
	}
}
