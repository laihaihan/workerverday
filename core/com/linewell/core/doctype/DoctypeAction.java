package com.linewell.core.doctype;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;

import com.linewell.core.attr.cfg.UcapAttrConfig;
import com.linewell.core.attr.cfg.UcapAttrConfigManager;
import com.linewell.core.sequence.CoreCoreSequence;
import com.linewell.core.sequence.CoreCoreSequenceManager;
import com.linewell.core.sequence.CoreSequence;
import com.linewell.core.sequence.CoreSequenceManager;
import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.PrintUtil;
import com.opensymphony.xwork2.ActionSupport;

/**
 * <p>
 * 文件类型 Action
 * </P>
 * 
 * @author cbingcan@linewell.com
 * @date 2012-09-04 17:36:26
 * @version 1.00
 *          <p>
 *          Copyright (c) 2012 www.linewell.com
 *          </p>
 */
public class DoctypeAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();

		// 返回值
		JSONObject json = new JSONObject();
		boolean result = true;
		String fn = request.getParameter("fn");
		DoctypeManager manager = new DoctypeManager();
		String unids = null;
		// 1、新增
		if ("add".equals(fn)) {
			Doctype doctype = new Doctype();
			BeanUtil.updateBean(request, doctype);
			doctype.setModule(request.getParameter("moduleName"));
			doctype.setFlow(request.getParameter("flowName"));
			result = manager.doSave(doctype);
			result = result && addOrUpdateSequence(doctype, fn);
			String doctypeId = doctype.getUnid();
			json.put("unid", doctypeId);
			unids = doctypeId;
		}
		// 2、修改
		else if ("update".equals(fn)) {
			String doctypeId = request.getParameter("UNID".toLowerCase());
			Doctype doctype = manager.doFindBeanByKey(doctypeId);
			BeanUtil.updateBean(request, doctype);
			doctype.setModule(request.getParameter("moduleName"));
			doctype.setFlow(request.getParameter("flowName"));
			result = manager.doUpdate(doctype);
			result = result && addOrUpdateSequence(doctype, fn);
			json.put("unid", doctypeId);
			unids = doctypeId;
		}
		// 3、删除
		else if ("del".equals(fn)) {
			String ids = request.getParameter("ids");
			String condition = "UNID in (" + ids + ")";
			result = manager.doDeleteByCondition(condition);
			result = result && addOrUpdateSequence(new Doctype(), fn);
			unids = ids;
		}
		// 更新文件类型模板配置
		this.updateTemplate(request, unids);
		json.put("result", result);
		PrintUtil.print(response, json.toString());
		return null;
	}

	/**
	 * 更新索引
	 */
	private boolean addOrUpdateSequence(Doctype doctype, String fn) {

		boolean result = true;
		HttpServletRequest request = ServletActionContext.getRequest();	
		CoreSequenceManager sequenceManager = new CoreSequenceManager();
		CoreCoreSequenceManager coreSequenceManager = new CoreCoreSequenceManager();
		if("del".equals(fn)) {
			String ids = request.getParameter("ids");
        	String condition = "UNID in ("+ids+")";
        	result = sequenceManager.doDeleteByCondition(condition);
        	result = result && coreSequenceManager.doDeleteByCondition(condition);
        	return result;
		}
		String sequence = request.getParameter("sequence");
		String coreSequence = request.getParameter("dwSequence");
		JSONObject sequenceJs = JSONObject.fromObject(sequence);
		JSONObject dwSequenceJs = JSONObject.fromObject(coreSequence);
		CoreSequence sequenceBean = (CoreSequence)JSONObject.toBean(sequenceJs, CoreSequence.class);
		CoreCoreSequence dwSequenceBean = (CoreCoreSequence)JSONObject.toBean(dwSequenceJs,CoreCoreSequence.class);
		sequenceBean.setUnid(doctype.getUnid());
		dwSequenceBean.setUnid(doctype.getUnid());
		if("add".equals(fn)) {
			result = sequenceManager.doSave(sequenceBean);
			result = result && coreSequenceManager.doSave(dwSequenceBean);
		} 
		else if("update".equals(fn)) {
			result = sequenceManager.doUpdate(sequenceBean);
			result = result && coreSequenceManager.doUpdate(dwSequenceBean);
		}
		return result;
	
		
		
		/*boolean result = true;
		HttpServletRequest request = ServletActionContext.getRequest();
		ZhbgSequenceManager sequenceManager = new ZhbgSequenceManager();
		CoreSequenceManager dwSequenceManager = new CoreSequenceManager();
		if ("del".equals(fn)) {
			String ids = request.getParameter("ids");
			String condition = "UNID in (" + ids + ")";
			result = sequenceManager.doDeleteByCondition(condition);
			result = result && dwSequenceManager.doDeleteByCondition(condition);
			return result;
		}
		String sequence = request.getParameter("sequence");
		String dwSequence = request.getParameter("dwSequence");
		JSONObject sequenceJs = JSONObject.fromObject(sequence);
		JSONObject dwSequenceJs = JSONObject.fromObject(dwSequence);
		ZhbgSequence sequenceBean = (ZhbgSequence) JSONObject.toBean(sequenceJs, ZhbgSequence.class);
		CoreSequence dwSequenceBean = (CoreSequence) JSONObject.toBean(dwSequenceJs, CoreSequence.class);
		sequenceBean.setUnid(doctype.getUnid());
		dwSequenceBean.setUnid(doctype.getUnid());
		if ("add".equals(fn)) {
			result = sequenceManager.doSave(sequenceBean);
			result = result && dwSequenceManager.doSave(dwSequenceBean);
		} else if ("update".equals(fn)) {
			result = sequenceManager.doUpdate(sequenceBean);
			result = result && dwSequenceManager.doUpdate(dwSequenceBean);
		}
		return result;*/
	}

	// 保存模板信息配置
	private void updateTemplate(HttpServletRequest request, String punids) {
		// 判断操作类型
		String fn = StringUtils.defaultString(request.getParameter("fn"));
		UcapAttrConfigManager fileManager = new UcapAttrConfigManager();
		if (StringUtils.equals(fn, "add") || StringUtils.equals(fn, "update")) {
			String attrs = request.getParameter("attrs");
			JSONArray attrsJs = JSONArray.fromObject(attrs);
			UcapAttrConfig[] attrArray = (UcapAttrConfig[]) JSONArray.toArray(attrsJs, UcapAttrConfig.class);
			// 新增和修改时更新模板文件的名称和模板类型
			for (int i = 0; attrArray != null && i < attrArray.length; i++) {
				String attr_cfg_unid = attrArray[i].getAttr_cfg_unid();
				if(attr_cfg_unid==null||"".equals(attr_cfg_unid)){
					continue;
				}
				/*UcapAttrConfig attr = fileManager.doFindBeanByKey(attrArray[i].getAttr_cfg_unid());
				if (null != attr) {
					attr.setAttr_cfg_punid(punids);
					attr.setAttr_cfg_type(attrArray[i].getAttr_cfg_type());
					attr.setAttr_cfg_caption(attrArray[i].getAttr_cfg_caption());
					fileManager.doUpdate(attr);
				}*/
				String[] params = new String[]{punids,attrArray[i].getAttr_cfg_type(),
						attrArray[i].getAttr_cfg_caption(),attrArray[i].getAttr_cfg_unid()};
				fileManager.doUpdateExceptBlob(params);
			}
		} else if (StringUtils.equals(fn, "del")) {
			// 删除所有模板数据，如果模板数据是存储在硬盘上的话则同时要删除硬盘上的文件
			String ids = request.getParameter("ids");
			String condition = " ATTR_CFG_PUNID in (" + ids + ")";
			fileManager.doDeleteByCondition(condition);
		}
	}
}