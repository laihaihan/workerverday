package com.linewell.core.view;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;


/**
 * 自定义视图数据
 * @author JSC
 *
 */
public class ViewCommonImp {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(ViewCommonImp.class);

	private static ViewCommonImp viewCommonImp;

	public static ViewCommonImp getInstance() {
		if (viewCommonImp == null) {
			viewCommonImp = new ViewCommonImp();
		}
		return viewCommonImp;
	}


	

	/**
	 * 获取树节点数据
	 * 
	 * @param treeNodeList
	 * @return ZtreeNodes数据
	 */
	public String getGridsNodes(List<ViewNode> viewNodeList) {
		HttpServletRequest request = ServletActionContext.getRequest();

/*		StringBuffer sb = new StringBuffer();
*/
		JSONArray jsonArray = new JSONArray();
		JSONObject json = new JSONObject();
		json.put("total", viewNodeList.size());

		for(ViewNode viewNode: viewNodeList){
			JSONObject jsonNode = new JSONObject();
			jsonNode.put("UNID", viewNode.getId());
			jsonNode.put("MODULENAME", viewNode.getName());
			jsonArray.add(jsonNode);
		}
		
		json.put("rows", jsonArray);
		System.out.println(json.toString());
/*		sb.append("{\"total\":28,\"rows\":[");
		sb.append("{\"productid\":\"FI-SW-01\",\"productname\":\"Koi\",\"unitcost\":10.00,\"status\":\"P\",\"listprice\":36.50,\"attr1\":\"Large\",\"itemid\":\"EST-1\"}");
		sb.append("]}");*/

		return json.toString();
	}
	
	
	public String getData(HttpServletRequest request,String clazz){		
		String viewData = "";
		try {
			ViewInterface viewInterface = (ViewInterface)Class.forName(clazz).newInstance();
			List<ViewNode> viewNodeList = viewInterface.getListViewNode(request);
			viewData += getGridsNodes(viewNodeList);
		} catch (InstantiationException e) {
			logger.error("不能实例化类:"+clazz);
		} catch (IllegalAccessException e) {
			logger.error("非法存取类:"+clazz);
		} catch (ClassNotFoundException e) {
			logger.error("找不到具体的类:"+clazz);
		}
		//viewData+="]";
		
		return viewData;
	}
}
