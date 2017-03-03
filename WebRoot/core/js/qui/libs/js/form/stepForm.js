$(function() {
	$("form[class=stepForm]").each(function() {
		if ($(this).attr("stepFormTitle") == "true") {
			var c = $("<div class='titleMain'><ul></ul><div class='clear'></div></div>");
			$(this).prepend(c);
			var d = $("form[class=stepForm] div[class=stepForm]");
			var f = $("<li class='stepFormTitle'><div class='left'></div><div class='center'></div><div class='right'></div><div class='clear'></div></li>");
			f.find(".center").text(d.eq(0).attr("stepFormTitle"));
			c.append(f);
			var j = d.length - 1;
			for (var e = 0; e < j; e++) {
				var h = $("<li class='stepFormTitle'><div class='left'></div><div class='center'></div><div class='right'></div><div class='clear'></div></li>");
				h.find(".center").text(d.eq(e + 1).attr("stepFormTitle"));
				c.append(h)
			}
			
			//如果当前表单是修改状态的话，则可通过点击导航条的标题，以查看该标题所对应的表单内容
			if($("#fn").length == 1 && $("#fn").val() == "update"){	
				$("div.center").css("cursor","hand");
				$("div.center").bind("click",function(){
					var title = $(this).text();
					$(this).css("cursor","hand");
					var id = $("div[stepFormTitle='"+title+"']").attr("id");
					if($("input:button[nextTarget='"+id+"']").length == 1){
						$("input:button[nextTarget='"+id+"']").click();
					}else if($("input:button[prevTarget='"+id+"']").length == 1){
						$("input:button[prevTarget='"+id+"']").click();
					}
				});
			}
			
			var g = $("<div class='clear'></div>");
			c.append(g);
			c.after($("<br/>"))
		}
	});
	
	var a = 0;
	if ($("form[class=stepForm]").eq(0).attr("currentStepNum") != null) {
		a = Number($("form[class=stepForm]").eq(0).attr("currentStepNum"));
	} 
	$("form[class=stepForm] div[class=stepForm]").not(":eq(" + a + ")").hide();
	$("form[class=stepForm] div[class=titleMain] li").eq(a)[0].className = "stepFormTitleCur";
	
	$("input:button").each(function() {
		var c = $(this).attr("selfTarget");
		if ($(this).attr("nextTarget") != null) {
			var d = $(this).attr("nextTarget");
			$(this).click(function() {
				var f = true;
				try {
					//使用qui自带的验证框架
					/*f = $("#" + c).validationEngine({
						returnIsValid: true
					});*/
					
					//使用validation-min.js验证框架
					f = new Validation(c).validate();
				} catch(g) {
					alert("请引入验证框架所需文件：[core/js/validation/style.css]和[core/js/validation/validation-min.js]");
					return;
				}
				if (f == true) {
					$("#" + d).fadeIn();
					$("#" + d).siblings("div.stepForm").hide();
					var index = $("div.stepForm").index($("#" + d));
					$("div.titleMain li").eq(index).attr("class","stepFormTitleCur");
					$("div.titleMain li").eq(index).siblings().attr("class","stepFormTitle");
				}
			})
		} else {
			if ($(this).attr("prevTarget") != null) {
				var e = $(this).attr("prevTarget");
				$(this).click(function() {
					$("#" + e).fadeIn();
					$("#" + e).siblings("div.stepForm").hide();
					var index = $("div.stepForm").index($("#" + e));
					$("div.titleMain li").eq(index).attr("class","stepFormTitleCur");
					$("div.titleMain li").eq(index).siblings().attr("class","stepFormTitle");
				})
			}
		}
	})
});