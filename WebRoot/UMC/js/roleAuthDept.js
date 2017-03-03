/**
 * 角色授权部门
 * @author yjianyou@linewell.com
 * @date   2011-04-28
 */

Ext.namespace('roleAuthDept'); 
/**
 * 角色授权部门
 */
var roleAuthDept = {
	
	tree:null,
	roleId:"",
	rootJson:null,
	selectId:"selectDepts",
  	/**
	 * 根据角色初始部门根节点，并创建相应的部门树
	 */
	initRoleDeptTree:function(renderTo,roleId){
		this.roleId = roleId;
	    var para={type:"dept",act:"getDeptTree",isCheck:"isCheck",unid:"",treeType:"umc",roleId:roleId}
	    //获取根节点对象	
 		var requestConfig = {
			url:UMCSession.UMCAction,
			params:para,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.decode(response.responseText);
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					if (response.responseText!="null" && response.responseText!=""){
						roleAuthDept.rootJson = Ext.util.JSON.decode(response.responseText);
					} else {
						roleAuthDept.rootJson = [];					
					}
					roleAuthDept.createRoleDeptTree(renderTo,roleId);
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 根据角色创建部门树
	 */
	createRoleDeptTree:function(renderTo,roleId){
		Ext.DomHelper.applyStyles(Ext.get(renderTo),'style="padding:3px 0px 0px 5px;"');
	 	if($(renderTo))$(renderTo).innerHTML="";
	 	var checkModel = "cascade";//选中节点时同时选中其上级 modify by zh 2010-6-1
	 	if (this.rootJson.length==0){
	 		//说明是从头新建部门
	 		this.rootJson ={id:"",text:"",checked:false};
	 	}
	 	
	 	var root=new Ext.tree.AsyncTreeNode({
	 		id:"_UMCDEPT",
			expanded: true,	
			text:"部门列表",
			children:this.rootJson
		});	
		
		var loader = new Ext.tree.TreeLoader({
	         url : UMCSession.UMCAction,
	         baseAttrs: {uiProvider: Ext.ux.TreeCheckNodeUI} 
	     });
		loader.on('beforeload', function(treeloader, node) {
				treeloader.baseParams ={type:"dept",act:"getDeptTree",unid:node.id,isCheck:"isCheck",treeType:"umc",roleId:roleAuthDept.roleId};
         }, this);
         
		var tree=new Ext.tree.TreePanel({
			renderTo:renderTo,
			root:root,
			animate:false,
			enableDD: false, //允许拖放
			autoScroll:true,
			//width:300,
			height:210,
			containerScroll: true,
			loader:loader,
			onlyLeafCheckable:false,
			checkModel:checkModel,                //是否为单选或级选择
			rootVisible:false
		});
		this.tree = tree;
		tree.on('checkchange', function(node, checked) {
			var resultList = Ext.getDom("selectDepts");
            if(checked){
            	roleAuthDept.addItem();
            }else{
				for (var i = 0; i < resultList.options.length; i++) {
					var tmpOpt = resultList.options[i];
					if (tmpOpt.value == node.id) {
						resultList.options.remove(i);
						break;
					}
				}
            }
         }, tree);
	},
	/**
	 * public 在UMCRole中有调用
	 * 根据角色ID，获取当前的角色列表，并设置列表的值
	 * @param {} roleUnid
	 */
	loadDeptByRoleId : function(roleUnid) {
			var params = {
			"type" : "dept",
			"act" : "getRoleDept",
			"roleId" : roleUnid,
			"random" : ucapCommonFun.getRandomString()
		};
		var requestConfig = {
			url : UMCSession.UMCAction,
			params : params,
			callback : function(options, success, response) {
				if (success) {
					var json = Ext.decode(response.responseText);
					var exResult = ucapCommonFun.dealException(json);
					if (!exResult)	return;
					var opt=document.getElementById(roleAuthDept.selectId);
					 opt.options.length=0;//清空
					
					if (response.responseText != "null"	&& response.responseText != "") {
							for(var i=0;i<json.length;i++){
								roleAuthDept.addOption(opt,json[i].id,json[i].text);
							}
					}
				} else {
					Ext.Msg.alert("提示", "取值不成功，请重试！");
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/*
	 * 角色可管理的部门权限设置
	 * public UMCRole.js中调用 permission.js中也有用到
	 * callBack 回调函数
	 */
	roleDeptConfirm:function(roleId,callBack){
		var deptIds = roleAuthDept.getSelectDepts();
		var json = "{roleId:'"+roleId+"',deptIds:'"+deptIds+"'}";
		json = Ext.decode(json);
		//实现保存
		var requestConfig = {
			url:UMCSession.UMCAction,
			params:{"type":"dept","act":"saveRoleDept"},
			jsonData:json,
			callback:function(options,success,response){
				if (success){
					var exjson = Ext.util.JSON.decode(response.responseText);	
					var exResult=ucapCommonFun.dealException(exjson);
					if(!exResult)return;
					if(typeof callBack=="function"){
						try{
							callBack.call(this);
						}catch(e){};
					}
					
					//Ext.Msg.alert("提示","角色可管理的部门权限配置保存成功！");
				} else {
					Ext.Msg.alert("提示","角色可管理的部门权限配置保存不成功，可能为网络断开连接！");
					ucapSession.commonWin.close();
				}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 把选中的节点添加到列表 public
	 */
	addItem:function(){
		var nodes = this.tree.getChecked();
		var depts = this.getSelectDepts();
		var oSel = document.getElementById(this.selectId);
		for(var i=0;i<nodes.length;i++){
			if (depts.indexOf(nodes[i].id)<0){
				this.addOption(oSel,nodes[i].id,nodes[i].text)
			}
		}		
	},
	//删除选中的值
	delItem:function(){
		var oSel = document.getElementById(this.selectId);
		if( oSel.selectedIndex != -1 ){
		var lastSelectedIndex = oSel.selectedIndex;
		oSel.options.remove( oSel.selectedIndex );
		if (oSel.length ==0) return;
		if( ( lastSelectedIndex + 1 ) <= oSel.length ){

			oSel.options[ lastSelectedIndex].selected = true;
		}  else {
			oSel.options[ oSel.length -1].selected = true;
		}
	}
	},
	/**
	 * 增加选项的值 private
	 * @param {} oSel
	 * @param {} value
	 * @param {} text
	 */
	addOption:function(oSel,value,text){
		var oOption = document.createElement( "OPTION" );
		oOption.value = value;
		oOption.text = text;
		oSel.add( oOption );
	},
	/**
	 * 获取选项中的所有，以,分开
	 * @return {String}
	 */
	getSelectDepts:function(){
		var optS=document.getElementById(this.selectId).options;
		if (typeof optS=="undefined") return "";
 		if (optS.length==0) return "";
		var depts = optS[0].value.trim()
	 	for(var i=1;i<optS.length;i++){
			depts+=","+optS[i].value.trim();
 	 	 }
 	 	 return depts;
	}
}



