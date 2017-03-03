//type 0 办理结束(多人并行、多人顺序或分流状态下办理结束) 1 表示上一节点收回 2－表示本节点收回 3－表示阅批结束 4－表示结束流程
//	 * 5－表示子流程收回 6－退回上一节点 7 表示是发送中发送到结束节点，8 子流程退回 9－－表示收回转办
function completeFlowConfirmFun(response, type ){
     if(type==6){
	alert("退回上一节点成功");
      }else{
	 ucapFlowFun.sendFlowPost(response, type );}
	
}

//type =1 发送对话框 ＝2分流发送 3子流程发送框 ＝4更改流程对话框 5退回 6 转办
function sendFlowDialogConfirmFun(response, type ){
	 ucapFlowFun.sendFlowPost(response, type );
}
