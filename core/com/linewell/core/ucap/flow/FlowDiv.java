package com.linewell.core.ucap.flow;

import java.util.List;

import com.linewell.core.util.StrUtil;
import com.linewell.ucap.workflow.bean.flow.Flow;
import com.linewell.ucap.workflow.bean.flow.FlowNode;
import com.linewell.ucap.workflow.bean.flow.Transition;

/**
 * <p>
 *    流程图展示（以div的形式展示流程图，即每个节点为一个div）
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Dec 13, 2012
 * @version 1.0  
 */
public class FlowDiv {
	
	private FlowManager flowManager = null;
	
	public FlowDiv(FlowParams flowParams){
		this.flowManager = new FlowManager(flowParams);
	}
	
	/**
	 * 递归调用拼装流程图
	 * 
	 * @param flowUnid 配置流程唯一标识
	 * @param docUnid 文档unid
	 * @param curFlowNode 当前节点
	 * @return
	 */
	public StringBuffer getFlowShow(String flowUnid,String docUnid,FlowNode curNode){
		String nextNodeIds = "";
		StringBuffer sb = new StringBuffer();
		if(curNode == null){
			curNode = flowManager.getBeginNode(flowUnid);//初始节点
			List nodeList = curNode.getTransitions();
			if(null == nodeList || nodeList.isEmpty()){
				return sb;
			}
			for(int i = 0 ; i < nodeList.size(); i ++){
				Transition nextTs = (Transition)nodeList.get(i);
				if( i == 0){
					nextNodeIds = nextTs.getId();
				}else{
					nextNodeIds = nextNodeIds + "," + nextTs.getId();
				}
			}
			String color = this.getNodeStateColor(docUnid,curNode.getId());
			sb.append("<div onmouseover=\"dochange();\" onmouseout=\"doRes('"+color+"');\" align=\"center\"  style=\"background:"+color+"\"  class='before' begin=-1 id='"+curNode.getId()+"' next='"+nextNodeIds+"'>"+curNode.getName()+"</div>");
			sb.append(this.getFlowShow(flowUnid,docUnid,curNode));//递归调用
		}else{
			List nodeList = curNode.getTransitions();//当前节点的出口节点集
			Flow flow = flowManager.getFlowById(flowUnid);
			if(null == nodeList || nodeList.isEmpty() || flowManager.isLastNode(curNode,flow)){
				return sb;
			}
			for(int i = 0 ; i < nodeList.size(); i ++){
				Transition transition = (Transition)nodeList.get(i);
				curNode = flow.getNodeById(transition.getId());//当前节点
				
				List nextNodeList = curNode.getTransitions();
				if(flowManager.isLastNode(curNode,flow)){
					nextNodeIds = "-1";
				}else{
					for(int j = 0 ; j < nextNodeList.size() ; j ++){
						Transition nextTs = (Transition)nextNodeList.get(j);
						if( j == 0 && null != nextTs){
							nextNodeIds = nextTs.getId();
						}else if( null != nextTs){
							nextNodeIds = nextNodeIds + "," + nextTs.getId();
						}
					}
				}
				String color = this.getNodeStateColor(docUnid,curNode.getId());
				sb.append("<div onmouseover=\"dochange();\" onmouseout=\"doRes('"+color+"');\" align=\"center\"  style=\"background:"+color+"\"  class='before' id='"+curNode.getId()+"' next='"+nextNodeIds+"' >"+curNode.getName()+"</div>");
				sb.append(this.getFlowShow(flowUnid,docUnid,curNode));//递归调用
			}
		}
		
		return sb;
	}

	/**
	 * 获取节点状态颜色
	 * 
	 * @param docUnid文档唯一标示
	 * @param nodeId 节点id
	 * @param ucWorkFlow 流程操作实例
	 * @return 当前节点颜色：已办理-#66CCFF，未办理-#d5d5d5，正在办理-#FF0000,鼠标变色-#F76E30
	 */
	public String getNodeStateColor(String docUnid,String nodeId){
		String stateColor = "#66CCFF";
		if(!StrUtil.isNull(docUnid)){
			if(flowManager.isFlowEnd(docUnid)){
				stateColor = "#66CCFF"; 
			}else{
				String allTranNodeUnids = flowManager.getNodeUnid(docUnid,4);//获取已办理节点id
				String curNodeUnid = flowManager.getNodeUnid(docUnid,3);//获取当前节点id
				if(null != curNodeUnid && curNodeUnid.equals(nodeId)){ //当前节点正在办理
					stateColor = "#FF0000"; 
				}else if(null != allTranNodeUnids && allTranNodeUnids.indexOf(nodeId) > -1){//当前节点已办理
					stateColor = "#66CCFF"; 
				}else{
					stateColor = "#d5d5d5";
				}
			}
		}
		return stateColor;
	}
}