package com.linewell.altest.xinzenghuibao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.linewell.altest.constant.Constant;
import com.linewell.core.flow.business.FlowWorkBusiness;
import com.linewell.core.flow.config.FlowConfig;
import com.linewell.core.flow.config.FlowConfigBusiness;
import com.linewell.core.log.LogBusiness;
import com.linewell.core.util.ListUtil;
import com.linewell.ucap.session.Session;


/**
 * <p>
 *  工作汇报业务操作
 * </p>
 * 
 * @author:admin email:admin@linewell.com
 * @version 1.0.0 2013-07-16 11:53:46
 *
 */
public class XinzenghuibaoBusiness {
	
	XinzenghuibaoManager manager = new XinzenghuibaoManager();
	
	/**
	 * 新增
	 */
	public boolean doSave(Xinzenghuibao xinzenghuibao){
		return manager.doSave(xinzenghuibao);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(Xinzenghuibao xinzenghuibao){
		return manager.doUpdate(xinzenghuibao);
		
	}

	/**
	 * 根据主键找单个对象
	 */
	public Xinzenghuibao doFindBeanByKey(String keyValue){
		return manager.doFindBeanByKey(keyValue);
	}
	
	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return manager.doFindListByCondition(condition,objs);
	}
	
		
	/**
	 * 根据主键删除对象
	 */
	public boolean doDeleteByCondition(String condition,Object[] objs){
		return manager.doDeleteByCondition(condition,objs);
	}
	
	/**
	 * 更新状态
	 * @param unid
	 * @return
	 */
	public boolean updateStatus(String unid,String status){
		Xinzenghuibao  xinzenghuibao = doFindBeanByKey(unid);
		xinzenghuibao.setStatus(status);//Constant
		return doUpdate(xinzenghuibao);
	}
	
	/**
	 * 
	 * @param request
	 * @return
	 */
	public boolean iniFlow(HttpServletRequest request){
		Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
    	String appUnid = ucapsession.getApp().getUnid();
    	String docUnid = request.getParameter("unid").trim();
    	String modId = request.getParameter("modId").trim();
    	
    	FlowConfigBusiness flowConfigBusiness= new FlowConfigBusiness();
    	List<FlowConfig> flowConfigList = flowConfigBusiness.getFLowListByModuleUnid(modId,ucapsession.getApp().getUnid());
    	
    	boolean flag = false;
    	if(!ListUtil.isNull(flowConfigList)){
    		FlowWorkBusiness flowWorkBusiness = new FlowWorkBusiness(request,appUnid);
    		String flowId = ((FlowConfig)flowConfigList.get(0)).getFlowid();
    		flag = flowWorkBusiness.doInit(docUnid, flowId, appUnid,ucapsession.getUser().getUnid());
    		updateStatus(docUnid,Constant.ZAIBAN);
    		LogBusiness  logBusiness = new LogBusiness();
    		logBusiness.doSave(docUnid, ucapsession.getUser().getDisplayName(), Constant.LIUCHENGCHUSHIHUA,"");
    	}
    	return flag;
	}
	
}