package com.linewell.core.buttonapplication;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import org.apache.struts2.ServletActionContext;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.FileUtil;
import com.linewell.core.util.ListUtil;
import com.linewell.core.util.StrUtil;

/**
 * <p>应用按钮</P>
 * @author lfunian@linewell.com
 * @date July 30, 2013
 * @version 1.00
 * <p>Copyright (c) 2011 www.linewell.com</p>
 */
public class ButtonApplicationBusiness {
	ButtonApplicationManager manager = new ButtonApplicationManager();
	/**
	 * 新增
	 */
	public boolean doSave(ButtonApplication buttonApplication){
		return manager.doSave(buttonApplication);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(ButtonApplication buttonApplication){
		return manager.doUpdate(buttonApplication);
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
	public ButtonApplication doFindBeanByKey(String keyValue){
		return (ButtonApplication)manager.doFindBeanByKey(keyValue);
	}

	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] params){
		return manager.doFindListByCondition(condition, params);
	}
	
	/**
	 * <p>根据应用系统主键获取按钮信息</P>
	 * @param appUnid 应用系统主键
	 * @param buttonType 按钮类型
	 * @param roleUnid 角色主键
	 * @return List 按钮信息对象集合
	 */
	public List doFindListByAppUnidAndButtonType(String appUnid, String buttonType, String roleUnid){
		List buttonList = new ArrayList();//记录剔除重复数据的按钮信息
		String condition = "APP_UNID = '" + appUnid + "' AND BUTTON_TYPE = '" + buttonType + "' and BUTTON_ROLE_UNID in ("+ StrUtil.toSqlIds(roleUnid, ",") +") order by BUTTON_SORT asc";
		List queryList = manager.doFindListByCondition(condition, null);
		if (!ListUtil.isNull(queryList)) {
			boolean flag = false;
			ButtonApplication buttonApplication = null;
			ButtonApplication buttonObject = null;
			//移除掉重复的按钮
			for (int i = 0; i < queryList.size(); i++) {
				flag = true;
				buttonApplication = (ButtonApplication)queryList.get(i);
				for (int j = i+1; j < queryList.size(); j++) {
					buttonObject = (ButtonApplication)queryList.get(j);
					if(buttonApplication.getButton_name().equals(buttonObject.getButton_name()) && buttonApplication.getButton_function().equals(buttonObject.getButton_function())){
						flag = false;
					}
				}
				if (flag) {
					buttonList.add(buttonApplication);
				}
			}
		}
		//若该角色下没有对应的按钮，则显示默认按钮
		if (ListUtil.isNull(buttonList)) {
			condition = "APP_UNID = '" + appUnid + "' AND BUTTON_TYPE = '" + buttonType + "' and BUTTON_KIND = '0' and BUTTON_ROLE_UNID = '" + appUnid + "' order by BUTTON_SORT asc";
			buttonList = manager.doFindListByCondition(condition, null);
		}
		return buttonList;
	}
	
	/**
	 * <p>根据应用系统主键获取按钮信息</P>
	 * @param fileName 文件名称
	 * @param file 文件对象
	 * @return boolean 操作是否成功
	 */
	public boolean doUploadImg(String fileName, File file){
		String appPath = ServletActionContext.getServletContext().getRealPath("/");
		String uploadPath = appPath + GlobalParameter.CORE_FILEPATH + "navigation/";
		FileUtil.mkdirs(uploadPath);
		//将导航栏图标上传至服务器
		File writeFile = new File(uploadPath + File.separator+  fileName);
    	return FileUtil.copyFile(file, writeFile);
	}
	
	/**
	 * <p>根据图片所在路径删除图片</P>
	 * @param imgPath 图标路径
	 * @param type	按钮类型
	 * @return boolean 操作是否成功
	 */
	public boolean doDeleteImgByImgPath(String imgPath, String type){
		String appPath = ServletActionContext.getServletContext().getRealPath("/");
		String destPath = appPath + imgPath;
		if(FileUtil.isFileExist(destPath)){
			//如果为easyui下的图标不进行删除
			if (imgPath.indexOf("/core/js/easyui/themes/icons") >=0) { 
				return true;
			}
			String condition = "BUTTON_IMG_PATH = '" + imgPath + "' and BUTTON_TYPE = '" + type + "'";
			List list = manager.doFindListByCondition(condition, null);
			if (!ListUtil.isNull(list) && list.size() == 1) {
				File destFile = new File(destPath);
				destFile.delete();
			}
			return true;
		}
		return true;
	}
	
	/**
	 * <p>根据应用系统标识与按钮类型，获取按钮的下一个排序号</P>
	 * @param appUnid 应用系统unid
	 * @param type 按钮类型
	 * @param roleUnid 角色主键
	 * @return int 按钮的下一个排序号
	 */
	public int doQuerySortByAppUnidAndType(String appUnid, String type, String roleUnid){
		String condition = "APP_UNID = '" + appUnid + "' AND BUTTON_TYPE = '" + type + "' and BUTTON_ROLE_UNID in ("+ StrUtil.toSqlIds(roleUnid, ",") +") order by BUTTON_SORT desc";
		List list = manager.doFindListByCondition(condition, null);
		if (!ListUtil.isNull(list)) {
			ButtonApplication buttonApplication = (ButtonApplication)list.get(0);
			return (buttonApplication.getButton_sort() + 1);
		} else {
			return 1;
		}
	}
	
	/**
	 * <p>根据应用系统主键获取按钮信息</P>
	 * @param buttonType 按钮类型
	 * @return List 按钮信息对象集合
	 */
	public List doFindListByAppUnid(String buttonType){
		List buttonList = new ArrayList();//记录剔除重复数据的按钮信息
		String condition = "APP_UNID = BUTTON_ROLE_UNID AND BUTTON_TYPE = '" + buttonType + "' order by BUTTON_SORT asc";
		List queryList = manager.doFindListByCondition(condition, null);
		if (!ListUtil.isNull(queryList)) {
			boolean flag = false;
			ButtonApplication buttonApplication = null;
			ButtonApplication buttonObject = null;
			//移除掉重复的按钮
			for (int i = 0; i < queryList.size(); i++) {
				flag = true;
				buttonApplication = (ButtonApplication)queryList.get(i);
				for (int j = i+1; j < queryList.size(); j++) {
					buttonObject = (ButtonApplication)queryList.get(j);
					if(buttonApplication.getButton_name().equals(buttonObject.getButton_name()) && buttonApplication.getButton_function().equals(buttonObject.getButton_function())){
						flag = false;
					}
				}
				if (flag) {
					buttonList.add(buttonApplication);
				}
			}
		}
		return buttonList;
	}
}
