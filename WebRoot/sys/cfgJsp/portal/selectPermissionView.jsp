<%@page contentType="text/html;charset=UTF-8"%>
<%
	String sourceFormId = request.getParameter("formId");
	String sourceId=request.getParameter("unid");
	String inputValue = request.getParameter("inputValue");
	if(null == inputValue ||"".equals(inputValue))
		inputValue="";
%>
<body>
<script type="text/javascript">
	/**
		add by cjianyan@linewell.com 2011-03-29
		初始化加载树
	*/
	var selectPermissionView={	    
	    rootName:"权限设计",       //树形根节点的名称
    
	    sourceName:"",             //源对象名称
	
	    sourceTitle:"",            //源标题
	
	    sourceId:"",               //源标识
	
	    sourceFormId:"",           //源表单标识
	
	    tree:null,                 //树形对象
	    
	    treeDivId:"targetTree",    //树形映射标识
	    
	    rootJson:null,             //节点对象
	    
	   //开始进行初始化
	    init:function(){
	        this.sourceId = Ext.getDom("sourceId").value;
	        this.souceFormId =Ext.getDom("sourceFormId").value;
	        var sourceDisplayDiv = document.getElementById("sourceDisplay"); 
	        
	        var requestConfig = {
				url:ucapSession.baseAction,
				params:{type:"permission",action:"getSource",sourceId:this.sourceId,souceFormId:this.souceFormId,userflag:"1"},
				callback:function(options,success,response){
					if (success){					
					    var exjson = Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(exjson);
						if(!exResult)return;
						var displayStr = exjson.sourceTitle+"："+exjson.sourceName;
	    					sourceDisplayDiv.innerHTML = "<font color=red>"+displayStr+sourceDisplayDiv.innerHTML+"</font>";
	    				}
				    }
			    }
			    Ext.Ajax.request(requestConfig);			
			    selectPermissionView.createTree();
	    },
	    
	    createTree:function(){
	        Ext.DomHelper.applyStyles(Ext.get(this.treeDivId),'style="padding:3px 0px 0px 5px;"');
		 	Ext.getDom(this.treeDivId).innerHTML="";
		 	var onlyLeafCheckable = false;
		 	var checkModel = "single";  //允许级联选择childCascade
		 	var userId = document.getElementById("sourceId").value;
		 	var roleId =userId;
		 	if (null==this.rootJson){
		 		//说明是从头新建部门
		 		this.rootJson ={id:"root_id",text:this.rootName};
		 	}
		 	var root;	 	
		 	if (onlyLeafCheckable){
		 		root=new Ext.tree.AsyncTreeNode({
			 		id:this.rootJson.id,
					expanded: true,	
					text:this.rootJson.text			
				});	
		 	} else {
			 	 root=new Ext.tree.AsyncTreeNode({
			 		id:this.rootJson.id,
					expanded: true,	
				 	checked:false,
					text:this.rootJson.text			
				});	
		 	}		
			var loader = new Ext.tree.TreeLoader({
		         url : ucapSession.baseAction,
		         baseAttrs: {uiProvider: Ext.ux.TreeCheckNodeUI} 
		     });
		     
			loader.on('beforeload', function(treeloader, node) {
			    var nodeType = node.attributes.nodeType;
			    var unid = node.attributes.value;
			    if(typeof(nodeType)=="undefined")nodeType = "";
			    if(typeof(unid)=="undefined")unid = "";
				treeloader.baseParams ={type:"selectPermissionView",action:"getdatarole",roleId:roleId,selectShow:"false",userId:userId,unid:unid,nodeType:nodeType}
	         }, this);
	         
			var listeners = {
		         	dblclick : function(node){	         		
		         		addselectNode(node);
		         	}
		         };
			var tree=new Ext.tree.TreePanel({
				renderTo:this.treeDivId,
				root:root,
				animate:false,
				rootVisible:true,
				autoScroll:true,
				width:220,
				height:350,
				containerScroll: true,
				loader:loader,
				//扩展的属性
				onlyLeafCheckable:true,//onlyLeafCheckable,  //是否只允许选择叶子节点
				checkModel:checkModel,                //是否为单选或级选择
				rootVisible:false,
				listeners:listeners
			});		
		
			//root.select();
			this.tree = tree;
	    }
    }

	//添加方法
	function addselectNode(node){
		var url =ucapSession.baseAction + "?type=selectPermissionView&leaf_unid="+node.attributes.value+"&action=getLeafContent";
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);
		var exjson =Ext.decode(conn.responseText);
		var exResult=ucapCommonFun.dealException(exjson);
		if(!exResult){
			Ext.Msg.alert("保存提示","后台有问题!");
			return;
		}
		var len =exjson.length;
		if(0 !=len){
			if(exjson[0].leaf_type == "01"){
				var temUnid=exjson[0].leaf_contents;
				
				if(null != temUnid && temUnid.indexOf(",")>0){																
			        temUnid = temUnid.substring(0,temUnid.indexOf(","));						    	
				}
				
				var viewName =ucapCommonFun.getDisplayNames("218",temUnid,"");								
				AddSelect(viewName,temUnid);
				saveReturnValue(viewName,temUnid);
			}
		}
	}
    
    //按钮添加
	function treeAddSelect(){
		var tree = selectPermissionView.tree;
		var nodes = tree.getChecked();
		var selectList = Ext.getDom("resultList");		
		if ( nodes.length>0) {			
			addselectNode(nodes[0]);
		}else{
			return ;
		}			
	}

	//删除所选
	function delSelect(){
		var selectList = Ext.getDom("resultList");
		if (selectList && selectList.options.length > 0) {
			var olength = selectList.options.length;
			for (var i = 0; i < olength; i++) {
				selectList.options.remove(0);
			}
		}	
	}
	
	//添加选择
	function AddSelect(text,unid) {
	 	var selectList = Ext.getDom("resultList");
		if (selectList && selectList.options.length > 0) {
			var olength = selectList.options.length;
			for (var i = 0; i < olength; i++) {
				selectList.options.remove(0);
			}
		}	
		var tmpOpt = new Option(text,unid);
		selectList.options.add(tmpOpt);
	}
	//设置返回值
	function saveReturnValue(text,unid){
		Ext.getDom("resJson").value ="{\"k\":\""+unid+"\",\"v\":\""+text+"\"}";
	}
	
	Ext.onReady(function(){	
		selectPermissionView.init();
		var inputValue = "<%=inputValue%>";
		if(inputValue !=""){
			var inputValueName = ucapCommonFun.getDisplayNames("218",inputValue,"");
			AddSelect(inputValueName,inputValue);
		}
	});	 
	
	 
</script>
  <div id="sourceobj" style="display:none"><input type="hidden" name="sourceId" id="sourceId" value="<%=sourceId%>"><input type="hidden" name="sourceFormId" id="sourceFormId" value="<%=sourceFormId%>"></div>
    <div id="sourceDisplay" style="display:none">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级联选择：<input type='checkbox' onclick="permission.checkChanged(this);"></div>
    <Table border="0" cellpadding="0" cellspacing="0" class="tableSet">
    <tr><Td  width=15%>选择类型:</Td><td width=85%><input type=radio name=sss checked >视图</td></tr>
    </Table>
    <table border="0" cellpadding="0" cellspacing="0" class="tableSet">
       	<tr>
    		<td>
    		 	<div id="targetTree" style="width:220px"></div>
    		</td>
    		<td>
    			<ul>
        	        <li>
        	          <input name="btnadd" type="button" class="btnChannel" id="button" value="添加" onClick="treeAddSelect();"/>
        	        </li>
			        <li>&nbsp;</li>
                    <li>
        	          <input name="btndel" type="button" class="btnChannel" id="button1" value="删除"  onClick="delSelect();"/>
        	        </li>
        	       </ul>
    		</td>
    		<td>
    			<select name="resultList" size="23" style="width:180px" id="resultList" onDblClick="listSelect.delSelect();">
                </select>
                <input type=hidden name=resJson id=resJson value="[]">
    		</td>
    	</tr>
    </table>
    
   
</body>