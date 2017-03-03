/**
 * 代码生成的主从表对应相关函数
 * llp@linewell.com
 */
 
var appPath = "/" + location.pathname.split("/")[(location.pathname.indexOf("/")>0?0:1)] + "/";
if (Ext){
	Ext.BLANK_IMAGE_URL = appPath + 'uistyle/images/s.gif';// 替换图片文件地址为本地
}
var formRelation={

    rootName:"表单关系列表",                     //树形根节点的名称
    baseAction:appPath+"BaseAction.action",
    rootId:"root_id",
    tree:null,                          //树形对象
    treeDivId:"formTree",        //树形映射标识
    oldIds:"",                        //已生成的表单id列表 
    newIds:"",                     //未生成的表单id列表
    allIds:"",                  //所有的表单id列表
    rootJson:null,                
    /**
     * 创建树型对象
     * 
     * @param {} moduleId 模块标识
     */
    init:function(moduleId){
    	this.oldIds = "";
		this.newIds = "";
		this.allIds = "";
    	var type = "generate";
        Ext.DomHelper.applyStyles(Ext.get(this.treeDivId),'style="padding:3px 0px 0px 5px;"');
	 	Ext.getDom(this.treeDivId).innerHTML="";
	 	var para = {type:type,action:"formRelation",moduleId:moduleId};
 		var requestConfig = {
			url:this.baseAction,
			params:para,
			callback:function(options,success,response){
				if (success){
					formRelation.rootJson = Ext.util.JSON.decode(response.responseText);
					formRelation.createTree();
				}
			}
 		};
 		Ext.Ajax.request(requestConfig);
    },
    createTree:function(){
		 //树型面板
		var tree=new Ext.tree.TreePanel({
			renderTo:this.treeDivId,
			animate:true,
			rootVisible:false,
			autoScroll:true,
			containerScroll: true,
			width:460,
			height:330,
			loader: new Ext.tree.TreeLoader(),
			root:new Ext.tree.AsyncTreeNode({//结点
				    id:this.rootId,
				    text:this.rootName,
				    expanded:true,//是否展开
				    leaf:false,
				    children:this.rootJson				    
				 })

		});		
		this.tree = tree;
		this.tree.expandAll();
		if(this.rootJson && this.rootJson.length>0){
			this.oldIds =this.rootJson[0].oldIds;
			this.newIds = this.rootJson[0].newIds;
			
			if (this.newIds !=""){
				this.allIds = this.newIds;
			}
			if (this.oldIds !=""){
				if (this.allIds ==""){
					this.allIds = this.oldIds;
				}  else {
					this.allIds +="," + this.oldIds;
				}
			}
		}
     },
    /**
   * 获取选中的节点
   * @return {Node} 返回节点对象
   */
	getSelectNode:function(){
		return formRelation.tree.getSelectionModel().getSelectedNode();	
	}
}
