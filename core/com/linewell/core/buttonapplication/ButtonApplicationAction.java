package com.linewell.core.buttonapplication;

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
import com.opensymphony.xwork2.ActionSupport;
/**
 * <p>应用按钮</P>
 * @author lfunian@linewell.com
 * @date July 30, 2013
 * @version 1.00
 * <p>Copyright (c) 2011 www.linewell.com</p>
 */
public class ButtonApplicationAction extends ActionSupport {
	private File file;
	private String fileFileName;
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();		
		HttpServletResponse response = ServletActionContext.getResponse();

        //返回值
        JSONObject json = new JSONObject();
		String imgPath = "";//图片路径
        String fn = request.getParameter("fn");
        boolean result = true;
        ButtonApplicationBusiness business = new ButtonApplicationBusiness();
		
        //1、新增
        if("add".equals(fn)){
        	ButtonApplication buttonApplication = new ButtonApplication();
        	BeanUtil.updateBean(request, buttonApplication);    
        	result = business.doSave(buttonApplication);
        }
        //2、修改
        else if("update".equals(fn)){
        	String unid = request.getParameter("button_unid");
        	ButtonApplication buttonApplication = business.doFindBeanByKey(unid);
        	BeanUtil.updateBean(request, buttonApplication);   
        	result = business.doUpdate(buttonApplication);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "button_unid in ("+ids+")";
        	List list = business.doFindListByCondition(condition, null);
        	if (!ListUtil.isNull(list)) {
        		ButtonApplication buttonApplication = null;
				for (Object object : list) {
					buttonApplication = (ButtonApplication)object;
					if (buttonApplication != null) {
						business.doDeleteImgByImgPath(buttonApplication.getButton_img_path(), buttonApplication.getButton_type());
					}
				}
			}
        	result = business.doDeleteByCondition(condition);
        }
        //4、上传图片
        else if("uploadImg".equals(fn)){
        	result = business.doUploadImg(this.fileFileName, this.file);
    		json.put("imgPath", GlobalParameter.CORE_FILEPATH + "navigation/" + this.fileFileName);
        } 
        //5、在上传新图片之后，删除已有的旧图片，防止无效图片存在
        else if("delOldImg".equals(fn)){
        	imgPath = request.getParameter("imgPath");
        	String type = request.getParameter("type");
        	result = business.doDeleteImgByImgPath(imgPath, type);
        }
        //6、获取按钮的下一个排序号
        else if("sort".equals(fn)){
        	String appUnid = request.getParameter("appUnid");
        	String type = request.getParameter("type");
        	String roleUnid = request.getParameter("roleUnid");
        	json.put("sort", business.doQuerySortByAppUnidAndType(appUnid, type, roleUnid));
        }
        //7、通过按钮unid获取按钮信息
        else if("buttonObject".equals(fn)){
        	String buttonUnid = request.getParameter("buttonUnid");
        	ButtonApplication buttonApplication = business.doFindBeanByKey(buttonUnid);
        	JSONObject jsonObject = JSONObject.fromObject(buttonApplication);
        	json.put("info", jsonObject.toString());
        }
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
