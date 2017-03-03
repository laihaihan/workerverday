package com.linewell.core.flow.ucapconfigflow;

import java.util.List;

import com.linewell.core.flow.config.FlowConfig;
import com.linewell.core.flow.config.FlowConfigManager;
import com.linewell.core.util.StrUtil;

/**
 * 平台ucap 流程配置信息
 * @author JSC
 *
 */
public class UcapFlowConfigBusiness {
	private String nowAppUnid = "";
	UcapConfigFlowManager manager = new UcapConfigFlowManager(nowAppUnid);
	
	/**
	 * 构造函数，指定流程所属系统
	 * @param appUnid 系统id
	 */
	public UcapFlowConfigBusiness(String appUnid){
		nowAppUnid = appUnid;
		manager = new UcapConfigFlowManager(nowAppUnid);
	}
	
	/**
	 * 根据党务核心平台的流程信息管理到的流程id删除
	 * @param ids 核心平台流程配置信息以'',''的形式传入
	 * @param appUnid 应用id
	 * @return 操作是否成功
	 */
	public boolean delByCoreFlowConfigS(String ids,String appUnid){
		boolean flag = true;
		UcapConfigFlowManager ucapConfigFlowManager = new UcapConfigFlowManager(appUnid);
		FlowConfigManager flowConfigManager = new FlowConfigManager();
		String[] idArray = ids.split(",");
		for (int i = 0; i < idArray.length; i++) {
			FlowConfig flowConfig = flowConfigManager.doFindBeanByKey(idArray[i].replaceAll("'",""));
			flag = flag && ucapConfigFlowManager.doDeleteByKey(flowConfig.getFlowid());
		}
		return flag;
	}
	
	/**
	 * 根据流程所属应用系统，获取流程信息
	 * @param appUnid 应用系统unid
	 * @param flowUnid 已经选择的流程unid
	 * @return List 流程信息集合
	 **/
	public List doFindListByAppUnid(String appUnid, String flowUnid){
		String condition = "FLOW_BELONG_TO_APP = '" + appUnid + "' AND FLOW_UNID != '" + flowUnid + "'";
		if (StrUtil.isNull(flowUnid)) {
			condition = "FLOW_BELONG_TO_APP = '" + appUnid + "'";
		}
		return manager.doFindListByCondition(condition, null);
	}
	
	public String getNowAppUnid() {
		return nowAppUnid;
	}
	public void setNowAppUnid(String nowAppUnid) {
		this.nowAppUnid = nowAppUnid;
	}
}
