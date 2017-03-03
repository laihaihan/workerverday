<%@ page language="java" pageEncoding="UTF-8"%>
<script language="javascript">
	//提交
    function submit() {
    	top.popup.showModalDialog('/core/flow/document/submit_dialog.jsp?unid=<%=unid%>&instanceUnid=<%=instanceUnid%>','提交',550,550);
    }
    
    //办结
    function terminate() {
    	top.popup.showModalDialog('/core/flow/document/terminate_dialog.jsp?unid=<%=unid%>&instanceUnid=<%=instanceUnid%>','办结',550,350);
    }
    
    
    
    //退回
    function sendBack() {
    	top.popup.showModalDialog('/core/flow/document/sendBack_dialog.jsp?unid=<%=unid%>&instanceUnid=<%=instanceUnid%>','退回',550,400);
    }
    
     //退回上一环节
    function sendBacklaskone() {
    	top.popup.showModalDialog('/core/flow/document/sendBackLast_dialog.jsp?unid=<%=unid%>&instanceUnid=<%=instanceUnid%>','退回上一环节',550,230);
    }
    
    function qichaozhengwen() {
    	top.popup.showModalDialog('/core/officeedit/wordmodulelist.jsp?flowUnid=<%=flowUnid%>&unid=<%=unid%>','起草正文',500,200);
    	//top.popup.showModalDialog('editoffice.jsp?fileType=word&unid=<%=unid%>','起草正文',1200,600);
    }
    
    function piyuezhengwen() {
    	top.popup.showModalDialog('/core/officeedit/wordlist.jsp?unid=<%=unid%>','批阅正文',500,200);
    }
    
    function shengcheng() {
    	top.popup.showModalDialog('/core/officeedit/genwordlist.jsp?unid=<%=unid%>','生成正文',500,200);
    }
  
</script>