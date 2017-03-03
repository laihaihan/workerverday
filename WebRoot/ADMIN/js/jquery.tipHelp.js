/**
 * 帮助提示
 * @author zzhan@linewell.com
 * @since 2011-12-07
 */
(function($) {
	/**
	 * 实现$.fn.tipHelp
	 */
	$.fn.tipHelp = function() {
		//提示信息内容
		var tipContext = this.html();
		//隐藏该节点
		this.hide();
		//帮助按钮
		$("body")
				.append(
						"<div class='helpBtn'><input type='button' value='帮助' name='helpButton' id='helpButton'></div>")
		//帮助提示对话框
		var helpDiv = $("<div class='helpTips'></div>").appendTo($("body"));
		//上层
		helpDiv
				.append("<div class='helpTipsTop'><input name='helpCloseBtn' type='button' id='helpCloseBtn'></div>");
		//中层
		helpDiv
				.append("<div class='helpTipsMid'><div class='helpTipsContent'>"+tipContext+"</div></div>");
		//下层
		helpDiv
				.append("<div class='helpTipsBot'><input id='tipCheckBox' name='tipCheckBox' type='checkbox' /><label for='tipCheckBox'>不再显示任何提示</label></div>");
		//初始化帮助信息的状态
		initTip();
		
		/**
		 * 隐藏提示信息
		 */
		function hideAll() {
			$(".helpTipsTop").hide();
			$(".helpTipsMid").hide();
			$(".helpTipsBot").hide();
		}

		/**
		 * 显示提示信息
		 */
		function showAll() {
			$(".helpTipsTop").show();
			$(".helpTipsMid").show();
			$(".helpTipsBot").show();
		}

		/**
		 * 初始化提示信息
		 */
		function initTip() {
			var isShowTip = $.cookie(linewell.ucap.admin.settings.cookies.IS_SHOW_TIP);
			//默认显示
			if(null === isShowTip
					|| "true" === isShowTip){
				showAll();
				$("#tipCheckBox").attr("checked", false);
			}else{
				hideAll();
				$("#tipCheckBox").attr("checked", true);
			}
		}

		/**
		 * 帮助按钮的事件
		 */
		$("#helpButton").click(showAll);

		/**
		 * 提示信息关闭按钮的事件
		 */
		$("#helpCloseBtn").click(hideAll);

		/**
		 * 不再显示提示内容的check事件
		 */
		$("#tipCheckBox").click(function() {
			var isNotTip = $("#tipCheckBox").attr("checked");
			if (!isNotTip) {
				//加入Cookie
				$.cookie(linewell.ucap.admin.settings.cookies.IS_SHOW_TIP, "true",{ expires: 7,path: '/'});
			} else {
				$.cookie(linewell.ucap.admin.settings.cookies.IS_SHOW_TIP, "false",{ expires: 7,path: '/'});
			}
		});
	};// 实现$.fn.tipHelp结束
})(jQuery)