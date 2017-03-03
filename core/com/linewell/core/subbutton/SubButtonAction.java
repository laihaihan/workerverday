package com.linewell.core.subbutton;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.util.PrintUtil;
import com.linewell.ucap.util.UNIDGenerate;

/**
 * <p>
 * 	SubButton Action
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @version 1.00 2012-02-09 16:56:56
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class SubButtonAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		String fn = request.getParameter("fn");
		JSONObject json = new JSONObject();
		boolean result = true;
		SubButtonManager manager = new SubButtonManager();
		SubButtonSetter setter  = new SubButtonSetter();
		
        //1、新增
        if("add".equals(fn)){
        	SubButton subButton = setter.getSubButton(request);
        	result = manager.doSave(subButton);
        }
        //2、修改
        else if("update".equals(fn)){
        	SubButton subButton = setter.getSubButton(request);
        	result = manager.doUpdate(subButton);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "unid in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        }
        //4、解析json串，并且转化为按钮对象，保持按钮视图按钮信息
		else if ("subButton".equals(fn)) {
			List<SubButton> subButtonList = new ArrayList<SubButton>();
			String subButtonJson = request.getParameter("sg");
			JSONArray jsonArray = JSONArray.fromObject(subButtonJson);
			JSONObject jsonObject = null;
			SubButton subButton = null;
			if (jsonArray != null && jsonArray.size() > 0) {
				for (int i = 0; i < jsonArray.size(); i++) {
					jsonObject = jsonArray.getJSONObject(i);
					if (jsonObject != null) {
						subButton = (SubButton)JSONObject.toBean(jsonObject, SubButton.class);
						if (subButton != null) {
							subButton.setSub_unid(new UNIDGenerate().getUnid());
							result = manager.doSave(subButton);
							if (result) {
								subButtonList.add(subButton);
							}
						}
					}
				}
			}
			json.put("buttons", subButtonList);
		}
		
        //返回值
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}