/**
 * 系统弹出框
 * @author cyingquan@qq.com
 * @2011-01-14
 * @version 1.0
*/
var popup = {	
	open:function(link,title,width,height,iconCls){
		top.lwin.open(link,title,width,height,iconCls);
	},
		
	/**
	 * 弹出modal框
	 * @param link	iframe链接
	 * @param title 对话框标题
	 * @param width 宽度
	 * @param height 高度
	 * @param iconCls 图标样式
	*/
	showModalDialog:function(link,title,width,height,iconCls){
		top.lwin.showModalDialog(link,title,width,height,iconCls);
	},
	/**
	 * 弹出modal框
	 * @param link	iframe链接
	 * @param title 对话框标题
	 * @param width 宽度
	 * @param height 高度
	 * @param iconCls 图标样式
	*/
	showWin:function(link,title,width,height,iconCls){
		top.lwin.showWin(link,title,width,height,iconCls);
	},
	close:function(refresh,divNum){
		top.lwin.close(refresh,divNum);
	},
	alert:function(title,msg,icon,fadeOutMsgTime,refresh,close){
		top.lwin.alert(title,msg,icon,fadeOutMsgTime,refresh,close);
	},
	/*
	 * 服务器通信通用出错提示
	*/
	errorService:function(){
		top.lwin.errorService();
	},
	/**
	 * 调整最后一层DIV,高/宽(窗口居中)
	*/
	resizeLast:function(width,height){
		top.lwin.resizeLast(width,height);
	},
	closeTop2:function(){
		top.lwin.closeTop2();
	},
	parent:function(){
		return top.lwin.parent();
	},
	setTitle:function(title){
		top.lwin.setTitle(title);
	}
}