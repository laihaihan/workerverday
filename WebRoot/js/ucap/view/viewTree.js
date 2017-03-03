var viewTree={
	dataUrl:ucapSession.baseAction+"?type=getView&action=getCategory",
	viewId:"",
	index:0,
	rootJson:null,
	deptId:"",
	rootText:"视图分类",
	//cateId:"catetree",
	/**
	 * 
	 * @param {} viewId
	 * @param {} renderto
	 * @param {} index
	 * @param {} categoryItemType
	 */
	init:function(viewId,renderto,index,categoryItemType,rootText){
		//Ext.BLANK_IMAGE_URL = "../../uistyle/images/s.gif";
		if("undefined"!=typeof(rootText) && rootText!=""){
		    viewTree.rootText = rootText;
		}
		var url = viewTree.dataUrl+"&viewId="+viewId;
		/*add by jc 20090813 组合当前URL上的参数*/
		var ourl = Ext.urlDecode(view.purl);
		delete ourl["type"];
		url += "&"+Ext.urlEncode(ourl);
		
		viewTree.viewId = viewId;
		//设置根节点可见
		var rootVisible=true;
		if("undefined"!=typeof(categoryItemType) && (categoryItemType=="04" || categoryItemType=="05"||categoryItemType=="06")){
			//获取根节点对象
//			var rurl = appPath + "umcAction.action";    //映射到用户管理中心  by cgc 2011.5.25
//			//var rurl=ucapSession.baseAction;
//			rurl+="?action=getDeptTree&type=treeSelect&unid=&rand="+Math.random();
//			var conn = Ext.lib.Ajax.getConnectionObject().conn;
//			conn.open("GET", rurl, false);
//			conn.send(null);
//			var exjson = Ext.util.JSON.decode(conn.responseText);	
//			var exResult=ucapCommonFun.dealException(exjson);
//			if(!exResult)return;
//			alert(Ext.encode(exjson));
//			if("undefined"!=typeof(conn.responseText) && conn.responseText!=""){
//				viewTree.rootJson = Ext.util.JSON.decode(conn.responseText)[0];
//				deptId = this.rootJson.id;
//				url+="&deptUnid="+deptId;
//			}else{
//				viewTree.rootJson = {id:viewId,text:viewTree.rootText};	
//			}
			viewTree.rootJson = {id:viewId,text:viewTree.rootText};	
			//设置根节点为不可见
			rootVisible=false;
			//树形根节点加载完毕
		}else{
			viewTree.rootJson = {id:viewId,text:viewTree.rootText};
		}
        /************************** 创建表格面板**************************/
        var contacterTree = new Ext.tree.TreePanel({
            id:"treePanel_"+viewId,
            border:false,
            lines:true,            //为false去掉树的线
            rootVisible:rootVisible,              
            autoScroll:true,
            animate:true,    
            autoHeight : true,
            autoWidth : true,
			renderTo : renderto,//this.cateId         
            enableDD: false,         // 允许树可以拖拽
            containerScroll: true,
			
            //设置数据加载
            loader: new Ext.tree.TreeLoader({			
                dataUrl:url
            }),
            
            //设置树形的根节点
            root:new Ext.tree.AsyncTreeNode({
                id : viewTree.rootJson.id,
                text: viewTree.rootJson.text,
                draggable:false,     
                //checked:false,
                expanded: true   // 展开根节点下的节点
            }),
				 
            listeners:{
               	click : function(node){
               		var searchValue = "";
               		var pcateUrl = "";
               		while(node.id!=viewTree.viewId){
               			if("undefined"==typeof(node.attributes.name) || node.attributes.name==""){
               				break;
               			}
               			if(searchValue.indexOf(node.attributes.name)>=0){
               				node = node.parentNode;
               				continue;
               			}
               			if(searchValue==""){
               				searchValue=view.fieldDbType+node.attributes.name+view.fieldEndPrefix+view.sqlLikeKey
               				+view.fieldConstType+node.attributes.value+view.fieldEndPrefix;
               				pcateUrl = node.attributes.name+"="+node.attributes.value;
               			}else{
               				searchValue=view.fieldDbType+node.attributes.name+view.fieldEndPrefix+view.sqlLikeKey
               				+view.fieldConstType+node.attributes.value+view.fieldEndPrefix+view.sqlAnd+searchValue;
               				pcateUrl+="&"+node.attributes.name+"="+node.attributes.value;
               			}
               			node = node.parentNode;
               			if(null==node || "undefined"==typeof(node)){
               				break;
               			}
               		}
               		//重新加载视图中的数据
               		view.reloadByCon(index,searchValue,"00",pcateUrl);
                },
                beforeload:function(node){
                },
                load:function(node){
		        	if(null!=node)node.select();
		        }
            }//end listeners
      });

    /**
     * 树形加载前的事件
     */
    contacterTree.on('beforeload', 
        function(node){ 
			if(!node.isLeaf()){
			 	
				var url = viewTree.dataUrl+"&viewId="+viewTree.viewId+"&itemName="+node.attributes.name; 
				var conn = "";         //上级的条件
				while(node.id!=viewTree.viewId){
					if(conn.indexOf(node.attributes.name)>=0){
						node = node.parentNode;
						continue;
					}
					
               		if(conn==""){
               	    	conn=view.fieldDbType+node.attributes.name+view.fieldEndPrefix+view.sqlLikeKey
               	    	+view.fieldConstType+node.attributes.value+view.fieldEndPrefix;
               		}else{
               			conn=view.fieldDbType+node.attributes.name+view.fieldEndPrefix+view.sqlLikeKey
               			+view.fieldConstType+node.attributes.value+view.fieldEndPrefix+view.sqlAnd+conn;
               		}
               		node = node.parentNode;
               		if(null==node || "undefined"==typeof(node)){
               			break;
               		}
               	}//end while
               	 
				url+="&conn="+conn;
			    contacterTree.loader.dataUrl=url; 
			     
			}//end if
         }
     ); 
         
   }//end init
}