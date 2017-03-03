package com.linewell.core.task.taskscheduling;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.StrUtil;

/**
 * <p>
 * 	任务调度配置中心 Action
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-05-29 09:14:58
 * @version 1.00
 * <p>
 * 	Copyright (c) 2012 www.linewell.com
 * </p>
 */
public class TaskSchedulingAction  extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		
		boolean result = true;
		String fn = request.getParameter("fn");
		TaskSchedulingManager manager = new TaskSchedulingManager();
		
        //1、新增
        if("add".equals(fn)){
        	TaskScheduling taskScheduling = new TaskScheduling();
        	BeanUtil.updateBean(request, taskScheduling);    
        	result = manager.doSave(taskScheduling);
        }
        //2、修改
        else if("update".equals(fn)){
			String UNID = request.getParameter("UNID".toLowerCase());
        	TaskScheduling taskScheduling = manager.doFindBeanByKey(UNID);
        	BeanUtil.updateBean(request, taskScheduling);
        	result = manager.doUpdate(taskScheduling);
        }
        //3、删除
        else if("del".equals(fn)){
        	String ids = request.getParameter("ids");
        	String condition = "UNID in ("+ids+")";
        	result = manager.doDeleteByCondition(condition);
        }
        //4、清除任务已经执行的次数
        else if("clearCount".equals(fn)){
        	String unids = request.getParameter("unids");
        	if (!StrUtil.isNull(unids)) {
				String[] unidArr = unids.split(",");
				TaskScheduling task = null;
				for (String unid : unidArr) {
					task = manager.doFindBeanByKey(unid);
					if (task != null) {
						task.setExecutedcount(0);
						result = manager.doUpdate(task);
					}
				}
			}
        }
		
        //返回值
		JSONObject json = new JSONObject();
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		
        return null;		
	}
}