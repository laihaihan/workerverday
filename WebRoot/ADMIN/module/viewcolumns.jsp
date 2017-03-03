<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="../include/session.jsp"%>

<%
/**
 * 视图列选择
 * @author 
 * @since 2011-12-02
 */
String formUnid = request.getParameter("formUnid");//表单UNID
String isFlow = request.getParameter("isFlow");
String currentViewId = "";
%>
<html>
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>视图列选择</title>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8" />
    <script language="javascript" src="../js/pageStep.js"></script>
<%@include file="../include/platformresources.jsp"%>

<script type="text/javascript">
    Ext.onReady(function(){
        viewColumns.loadItemsConfig("vwItemList");
        viewColumns.loadViewItemsConfig("<%=formUnid%>","viewColumnList");
    });
    
    function getConfigJson(){
        
        var topWin = viewConfig.topWindow;
        if(null==topWin)topWin = window;
        var json = topWin.ucapCommonFun.getFormJSon("viDialogHtml");
        if(undefined!=json.itemUnid && json.itemUnid!=""){
            for(var i=0;i<topWin.viewConfigFun.viewCofigColumns.length;i++){
                var tmpJson = topWin.viewConfigFun.viewCofigColumns[i];
                if(tmpJson.itemUnid==json.itemUnid){
                    topWin.viewConfigFun.viewCofigColumns[i] = json;
                    break;
                }
            }
        }//end if(undefined!=json.s
        var bfield=["statistics","displayCn","display"];
        json = viewConfigFun.convertArray2Json(bfield,topWin.viewConfigFun.viewCofigColumns);
        
        json = "{formUnid:'<%=formUnid%>',items:"+Ext.encode(json.items)+"}";
        
        //json = Ext.decode(json);
        
        return json;
    }
    
    var viewColumns={
        loadItemsConfig:function(listName){
            viewConfigFun.itemConfigList = new Array();
            var url =ucapSession.baseAction;
            url+="?type=buildAction&act=getFormItemEnCn&isFlow=<%=isFlow%>&formUnid=<%=formUnid%>";
            url+="&tmp="+ucapCommonFun.getRandomString();
            var conn = Ext.lib.Ajax.getConnectionObject().conn;
            conn.open("GET", url, false);
            conn.send(null);
            var json = Ext.util.JSON.decode(conn.responseText);     
            var exResult=ucapCommonFun.dealException(json);
            if(!exResult)return;
            if(!json)return;
        
            var itemList = Ext.getDom(listName);
            var items = json;
            //alert(Ext.util.JSON.encode(json));
            if(undefined!=items){
                for(var i=0;i<items.length;i++){
                    if(undefined==items[i] || null==items[i])continue;
                    viewConfigFun.itemConfigList[i] = items[i];
                    ucapCommonFun.addOption(itemList,items[i].unid,items[i].nameCn);
                }
                //加入一个操作列，以方便应用系统进行配置
                if(listName=="vwItemList"){
                    ucapCommonFun.addOption(itemList,"~display~opr~","操作列");
                    //Ext自增长序号列add by jc 20100610
                    ucapCommonFun.addOption(itemList,"~display~seqnum~","序号列");
                }
            }
        },
        
        /**
	 	 * 加载视图列信息
	     * 
	     * @param {} formUnid 表单标识
	     * 
	     * @param {} listName 所在列标名称
	     */
	    loadViewItemsConfig:function(formUnid,listName){
	    	viewConfigFun.viewCofigColumns = new Array();
	        var url = ucapSession.baseAction;
			url+="?type=buildAction&act=getViewItemsCfg&formUnid="+formUnid;
           	url+="&tmp="+ucapCommonFun.getRandomString();
          	var conn = Ext.lib.Ajax.getConnectionObject().conn;
           	conn.open("GET", url, false);
           	conn.send(null);

			var json = Ext.util.JSON.decode(conn.responseText);			
			var exResult=ucapCommonFun.dealException(json);
			if(!exResult)return;
			if(!json)return;
			
			var itemList = Ext.getDom(listName);
			var viewItems = json.viewItems;
			if(undefined!=viewItems && viewItems){
				for(var i=0;i<viewItems.length;i++){
					if(undefined==viewItems[i] || null==viewItems[i])continue;
					viewConfigFun.viewCofigColumns[i] = viewItems[i];
					ucapCommonFun.addOption(itemList,viewItems[i].itemUnid,viewItems[i].displayName);
				}
			}				
		}
    };
    
    //定义上一步的链接
    pageStep.preUrl = "isFlowSelect.jsp";

    //定义下一步的链接
    pageStep.nextUrl = "subbutton.jsp";

    /**
     * 处理下一步的逻辑
     */
    pageStep.nextAction = function(){
        this.canGoNext = true;
    };

    /**
     * 处理上一步的逻辑
     */
    pageStep.preAction = function(){
        this.canGoPre = true;   
    };
</script>
</head>
<body>
<table border="0" align="center" cellpadding="0" cellspacing="0" class="tableSet" style="height:100%;">
   <font color="red">提示：若有选择下列视图字段（表单主键需在首位），则生成所选字段视图；若未选择视图字段，则系统默认选择除主键外的所有表单字段。</font>
  <tr>
    <td width="13%" align="center">
	<select name="vwItemList" size="20" style="width:100%;height:95%;"  id="vwItemList" onDblClick="viewConfigFun.addViewColumn(this,'<%=currentViewId%>')">
    </select>
    </td>
    <td width="6%" align="center">
<ul>
        	<li>
        	  <input name="btnadd" type="button" class="btnChannel" id="button" value="添加" onClick="viewConfigFun.addViewColumn('vwItemList','<%=currentViewId%>')"/>
        	</li>
			<li>&nbsp;</li>
            <li>
        	  <input name="btndel" type="button" class="btnChannel" id="button" value="删除" onClick="viewConfigFun.delViewColumn('viewColumnList','<%=currentViewId%>')"/>
        	</li>
        </ul>
    </td>
  <td width="13%">
<select name="viewColumnList" size="20" style="width:100%;height:95%;" id="viewColumnList" onChange="viewConfigFun.changeViewColumn(this,'<%=currentViewId%>')" onDblClick="viewConfigFun.delViewColumn(this,'<%=currentViewId%>')">
    </select>
    </td>
  <td width="2%" align="center">
    	<a href="#" onClick="viewConfigFun.moveViewColumn('<%=currentViewId%>',-1)"><img src="../../uistyle/style_1/ucapimages/arrow_asc.gif" /></a><br/>
   	  <br /><a href="#" onClick="viewConfigFun.moveViewColumn('<%=currentViewId%>',1)"><img src="../../uistyle/style_1/ucapimages/arrow_desc.gif" /></a></td>
    <td width="58%">
    <div id="viDialogHtml">
    <table border="0" cellpadding="0" cellspacing="0" class="tableSet2">
      <tr>
        <th width="18%"><span class="red">*</span>字段显示名称</th>
        <td colspan="3"><input type="text" class="inputbox" size="40" name="displayName" id="displayName"/><input type="hidden" size="20" id="itemUnid" name="itemUnid"/></td>
      </tr>
      <!-- 添加字段来源名称by@cgc  2011-6-14   start -->
       <tr>
        <th><span class="red">*</span>字段来源名称</th>
        <td colspan="3"><input type="text" class="inputbox" size="40" name="resourceName"
         id="resourceName" readonly="readonly" disabled="disabled" /></td>
      </tr>
       <!-- 添加字段来源名称by@cgc  2011-6-14   end -->
      <tr>
        <th><span class="red">*</span>字段宽度</th>
        <td><input type="text" class="inputbox" size="15" name="width" id="width"/>
          <select name="widthType" id="widthType">
            <option value="01">像素</option>
            <option value="02">百分比</option>
          </select>          </td>
        <th>是否统计字段</th>
        <td>
          <input name="statistics" type="radio" id="statistics" value="1"/>
          是
          <input name="statistics" type="radio" id="statistics" value="0" checked/> 
          否</td>
      </tr>
      <tr>
      	<th>列转换扩展功能</th>
      	<td colspan="3">
      		<input name="converseInteraction_Cn_" id="converseInteraction_Cn_" type="text" class="inputbox" size="30"/><input name="converseInteraction" id="converseInteraction" type="hidden"/><input type="button" name="btnselect" value="选择" onclick="selectDataSD('227',1,'converseInteraction')"/>
      	</td>
      </tr>
      <!--tr>
        <th>是否显示成中文</th>
        <td colspan="3">
        	<input name="displayCn" type="radio" id="displayCn" value="1"/>是
        	<input name="displayCn" type="radio" id="displayCn" value="0" checked/> 否
        </td>
        </tr -->
      <tr>
        <th>列单击JS函数</th>
        <td><input type="text" class="inputbox" size="20" id="onclick" name="onclick"/><img src="../../uistyle/images/help.gif" onclick="searchHelp('view_rowOnclickJS')" title="帮助"></img>
        </td>
        <th>列转换JS函数</th>
        <td><input type="text" class="inputbox" size="20" id="conversion" name="conversion"/><img src="../../uistyle/images/help.gif" onclick="searchHelp('view_rowTurnJS')" title="帮助"></img></td>
      </tr>
      <tr style="display:none">
        <th>列得到焦点JS函数</th>
        <td><input type="text" class="inputbox" size="20" id="onfocus" name="onfocus"/>
        </td>
        <th>列失去焦点JS函数</th>
        <td><input type="text" class="inputbox" size="20" id="onfocusout" name="onfocusout"/></td>
      </tr>
      <tr>
        <th>是否显示</th>
        <td><input name="display" type="radio" id="display" value="1" checked/>
				是
				  <input name="display" type="radio" id="display" value="0" />
				否</td>
		 <th>列是否编辑JS函数</th>
        <td><input type="text" class="inputbox" size="20" id="iseditjs" name="iseditjs" /></td>
        </tr>
      <tr>
        <th>提示信息类型</th>
        <td ><input name="messageType" type="radio" id="messageType" value="01" checked/>
无
  <input name="messageType" type="radio" id="messageType" value="02" />
文本串
<input name="messageType" type="radio" id="messageType" value="03" />
XML</td>
<th>值发生改变时JS函数</th>
        <td><input type="text" class="inputbox" size="20" id="onchange" name="onchange"/><img src="../../uistyle/images/help.gif" onclick="searchHelp('view_changeValueJS')" title="帮助"></img></td>
        </tr>
      <tr>
        <th>提示信息内容</th>
        <td colspan="3"><input type="text" class="inputbox" id="message" name="message"/></td>
        </tr>
    </table>
    </div>
    </td>
  </tr>
</table>

</body>