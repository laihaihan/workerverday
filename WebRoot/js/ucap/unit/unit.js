Ext.namespace('ucapUnit'); 
ucapUnit = {
	AuditingPass:function(){
//		if($V("unit_audit_status")=="1"){
//			alert("此单位已经通过审核，无须再审核！");
//			return;
//		}
		Ext.Msg.confirm("系统信息提示","<p>您确定要进行审核通过操作？</p>单击是通过，单击否取消",function(yn){
			if(yn=="yes"){
				//将单位相关信息提交后台进行管理员的注册及部门的分配
				//auditingpass
				var unid = ucapCommonFun.getUrlParameter("unid");
				var jdata = {};
				var requestConfig ={
					url:ucapSession.baseAction,
					params:'type=auditingpass&unid='+unid,
					jsonData:jdata,
					callback:function(options,success,response){
							if (success){
								var flag = response.responseText;
								if((flag+"")!="false"){
									var json = Ext.decode(flag);
									if(json && json.userUnid && json.deptUnid){
										//$("unit_audit_status").value="1";//设置审核状态
										appAssign.initAssign(json.deptUnid,json.userUnid,json.deptName,unid);
									}
								}
							}
					}
				};
				//_UcapForm.tool.showLodingMsg();
				Ext.Ajax.request(requestConfig);
				//_UcapForm.tool.hideLodingMsg();
			}
		});
	},
	AuditingNoPass:function(){
		$("unit_audit_status").value = "0";
		_UcapForm.docSave("","",{isModifyMsg:1,isSaveMsg:1,saveMsg:"审核不通过操作成功!",modifyMsg:"审核不通过操作成功!"});
	}
}