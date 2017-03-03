var leftOverHeight = 0;
var rightOverHeight = 0;
var middleOverHeight = 0;
var exitMenu = 0;
var hexitMenu = 0;
var progressFlag = 0;
var oldBannerHeight = 0;
var oldFootHeight = 0;
var broswerFlag = "";
var maskDiv;
var positionType = "none";
var positionContent = "";
var codePageMenu;
$(function() {
	maskDiv = $('<div class="loadmask"></div>');
	$("#bs_right").append(maskDiv);
	if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
		var i = window.navigator.userAgent.substring(30, 33);
		if (i == "6.0") {
			broswerFlag = "IE6"
		} else {
			if (i == "7.0") {
				broswerFlag = "IE7"
			}
		}
	}
	var a = $("#theme").attr("ie6detect");
	if (a != null && a != "") {
		if (broswerFlag == "IE6") {
			top.Dialog.open({
				URL: a,
				Title: "提示",
				Width: 360,
				Height: 210,
				ShowCloseButton: false,
				CloseHideScroller: true
			})
		}
	}
	var d = $("#theme").attr("ie7detect");
	if (d != null && d != "") {
		if (broswerFlag == "IE7") {
			top.Dialog.open({
				URL: d,
				Title: "提示",
				Width: 360,
				Height: 210,
				ShowCloseButton: false,
				CloseHideScroller: true
			})
		}
	}
	oldBannerHeight = $("#bs_bannercenter").outerHeight();
	oldFootHeight = $("#fbox").outerHeight();
	leftOverHeight = $("#hbox").outerHeight() + $("#fbox").outerHeight() + $("#lbox_topcenter").outerHeight() + $("#lbox_bottomcenter").outerHeight();
	rightOverHeight = $("#hbox").outerHeight() + $("#fbox").outerHeight() + $("#rbox_topcenter").outerHeight() + $("#rbox_bottomcenter").outerHeight();
	middleOverHeight = $("#hbox").outerHeight() + $("#fbox").outerHeight() + $("#mbox_topcenter").outerHeight() + $("#mbox_bottomcenter").outerHeight();
	var f = null;
	autoReset();
	window.onresize = function() {
		if (f) {
			clearTimeout(f)
		}
		f = setTimeout("autoReset()", 100)
	};
	var c = document.getElementsByTagName("html")[0];
	c.style.overflow = "hidden";
	$(".spliter").each(function() {
		$(this).spliterRender()
	});
	var b = 12;
	try {
		var g = jQuery.jCookie("fontSize");
		if (g != false) {
			b = parseInt(g)
		}
	} catch(h) {}
	if (b == 12) {
		$(".fontChange").eq(2).find("a").addClass("fontChange_cur")
	} else {
		if (b == 14) {
			$(".fontChange").eq(1).find("a").addClass("fontChange_cur")
		} else {
			if (b == 16) {
				$(".fontChange").eq(0).find("a").addClass("fontChange_cur")
			}
		}
	}
	$(".fontChange a").each(function() {
		$(this).click(function() {
			$(".fontChange a").removeClass("fontChange_cur");
			$(this).addClass("fontChange_cur");
			var j = parseInt($(this).attr("setFont"));
			jQuery.jCookie("fontSize", j);
			try {
				document.getElementById("frmright").contentWindow.changeFont(j)
			} catch(k) {}
			try {
				document.getElementById("frmleft").contentWindow.changeFont(j)
			} catch(k) {}
		})
	});
	if ($("#vmenu").length > 0) {
		exitMenu = 1;
		$(".vbaseItem").height(30);
		$(".vbaseItem").css({
			overflow: "hidden"
		})
	}
	if ($("#menu").length > 0) {
		hexitMenu = 1
	}
	enableTooltips();
	if ($(".popupMenu").length > 0) {
		$(".popupMenu").popupMenuRender()
	}
	$("#fullSrceen").fullSrceenRender()
});
$.fn.popupMenuRender = function() {
	$(this).hover(function() {
		$(this).find(".popupMenu_con").show()
	},
	function() {
		$(this).find(".popupMenu_con").hide()
	})
};
jQuery.fn.extend({
	fullSrceenRender: function() {
		var b = $(this);
		var e = false;
		if (b.attr("hideNav") == "true" || $(this).attr("hideNav") == true) {
			e = true
		}
		var d = b.text();
		var f = "退出全屏";
		if (b.attr("afterClickText")) {
			f = b.attr("afterClickText")
		}
		var a = b.attr("class");
		var c = "icon_actualscreen hand";
		if (b.attr("afterClickStyle")) {
			c = b.attr("afterClickStyle")
		}
		b.toggle(function() {
			$("#bs_bannercenter").hide();
			$("#bs_bannercenter").height(0);
			if (broswerFlag != "IE6") {
				$("#fbox").hide();
				$("#fbox").height(0)
			} else {
				$(".fontChange").hide();
				$(".fontTitle").hide();
				$("#fbox").hide();
				$("#fbox").height(0)
			}
			if (e) {
				$(".spliter").spliterClose()
			}
			autoReset();
			$(this).text(f);
			$(this).removeClass(a);
			$(this).addClass(c)
		},
		function() {
			$("#bs_bannercenter").show();
			$("#fbox").show();
			$("#bs_bannercenter").height(oldBannerHeight);
			$("#fbox").height(oldFootHeight);
			if (e) {
				$(".spliter").spliterOpen()
			}
			autoReset();
			$(this).text(d);
			$(this).removeClass(c);
			$(this).addClass(a)
		})
	},
	buttonInputRender: function() {
		$(this).addClass("button");
		var a = _getStrLength($(this).val());
		if (a < 5) {
			$(this).width(60)
		}
		$(this).hover(function() {
			$(this).removeClass("button");
			$(this).addClass("button_hover")
		},
		function() {
			$(this).removeClass("button_hover");
			$(this).addClass("button")
		});
		$(this).focus(function() {
			$(this).removeClass("button");
			$(this).addClass("button_hover")
		});
		$(this).blur(function() {
			$(this).removeClass("button_hover");
			$(this).addClass("button")
		})
	},
	buttonRender: function() {
		$(this).addClass("button");
		var b = _getStrLength($(this).text());
		var a = 0;
		var c = 50;
		a = _getStrLength($(this).filter(":has(span)").find("span").text());
		if (a != 0) {
			c = 20 + 7 * a + 10
		}
		if (broswerFlag == "Firefox" || broswerFlag == "Opera" || broswerFlag == "Safari") {
			$(this).filter(":has(span)").css({
				paddingLeft: "5px",
				width: c + 8 + "px"
			})
		} else {
			$(this).filter(":has(span)").css({
				paddingLeft: "5px",
				width: c + "px"
			})
		}
		if (b < 5) {
			$(this).width(66)
		}
		$(this).filter(":has(span)").find("span").css({
			cursor: "default"
		});
		$(this).hover(function() {
			$(this).removeClass("button");
			$(this).addClass("button_hover")
		},
		function() {
			$(this).removeClass("button_hover");
			$(this).addClass("button")
		});
		$(this).focus(function() {
			$(this).removeClass("button");
			$(this).addClass("button_hover")
		});
		$(this).blur(function() {
			$(this).removeClass("button_hover");
			$(this).addClass("button")
		})
	}
});
function fullScrennHander(a, b) {
	if (a == true) {
		$("#bs_bannercenter").hide();
		$("#bs_bannercenter").height(0);
		if (broswerFlag != "IE6") {
			$("#fbox").hide();
			$("#fbox").height(0)
		} else {
			$(".fontChange").hide();
			$(".fontTitle").hide();
			$("#fbox").hide();
			$("#fbox").height(0)
		}
		if (b != null) {
			if (b == true) {
				$(".spliter").spliterClose()
			}
		}
	} else {
		if (a == false) {
			$("#bs_bannercenter").show();
			$("#fbox").show();
			$("#bs_bannercenter").height(oldBannerHeight);
			$("#fbox").height(oldFootHeight);
			if (b != null) {
				if (b == true) {
					$(".spliter").spliterOpen()
				}
			}
		}
	}
	autoReset()
}
function createPosition(a, c) {
	var b = $("#" + a);
	b.html(c)
}
function autoReset() {
	leftOverHeight = $("#hbox").outerHeight() + $("#fbox").outerHeight() + $("#lbox_topcenter").outerHeight() + $("#lbox_bottomcenter").outerHeight();
	rightOverHeight = $("#hbox").outerHeight() + $("#fbox").outerHeight() + $("#rbox_topcenter").outerHeight() + $("#rbox_bottomcenter").outerHeight();
	middleOverHeight = $("#hbox").outerHeight() + $("#fbox").outerHeight() + $("#mbox_topcenter").outerHeight() + $("#mbox_bottomcenter").outerHeight();
	try {
		document.getElementById("frmleft").contentWindow.scrollContent()
	} catch(f) {}
	try {
		document.getElementById("frmright").contentWindow.scrollContent()
	} catch(f) {}
	try {
		document.getElementById("frmmiddle").contentWindow.scrollContent()
	} catch(f) {}
	try {
		document.getElementById("frmmiddle2").contentWindow.scrollContent()
	} catch(f) {}
	var a = document.documentElement.clientHeight;
	try {
		var h = a - leftOverHeight - parseInt($("#lbox").css("paddingTop")) - parseInt($("#lbox").css("paddingBottom"));
		$("#bs_left").height(h)
	} catch(f) {}
	try {
		var j = a - rightOverHeight - parseInt($("#rbox").css("paddingTop")) - parseInt($("#rbox").css("paddingBottom"));
		$("#bs_right").height(j)
	} catch(f) {}
	try {
		var g = a - middleOverHeight - parseInt($("#mbox").css("paddingTop")) - parseInt($("#mbox").css("paddingBottom"));
		$("#bs_middle").height(g)
	} catch(f) {}
	if (exitMenu == 1) {
		try {
			$(".vbaseItem").show();
			var b = parseInt((h - 10) / 30) - 1;
			var d = parseInt($(".vbaseItem").length);
			for (var c = b; c < d; c++) {
				$(".vbaseItem").eq(c).hide()
			}
		} catch(f) {}
	}
	try {
		mainResizeHandler()
	} catch(f) {}
}
var tipDirection = "down";
function enableTooltips(e) {
	var b,
	a,
	c,
	d;
	if (!document.getElementById || !document.getElementsByTagName) {
		return
	}
	AddCss();
	d = document.createElement("span");
	d.id = "btc";
	d.setAttribute("id", "btc");
	d.style.position = "absolute";
	d.style.zIndex = 9999;
	$("body").append($(d));
	$("a[title],span[title],input[title],textarea[title],img[title],div[title]").each(function() {
		if ($(this).attr("keepDefaultStyle") == "true" || $(this).attr("keepDefaultStyle") == true || $(this).parents(".selectbox-tree").length > 0) {} else {
			Prepare($(this)[0])
		}
	})
}
function _getStrLength(c) {
	var b;
	var a;
	for (b = 0, a = 0; b < c.length; b++) {
		if (c.charCodeAt(b) < 128) {
			a++
		} else {
			a = a + 2
		}
	}
	return a
}
function Prepare(f) {
	var g,
	d,
	a,
	e,
	c;
	d = f.getAttribute("title");
	if (d == " ") {
		f.removeAttribute("title");
		f.onmouseover = null;
		f.onmouseout = null;
		f.onmousemove = null;
		return
	}
	if (d != null && d.length != 0) {
		f.removeAttribute("title");
		if (_getStrLength(d) > 37 || _getStrLength(d) == 37) {
			g = CreateEl("span", "tooltip")
		} else {
			if (_getStrLength(d) > 10 && _getStrLength(d) < 37) {
				g = CreateEl("span", "tooltip_mid")
			} else {
				g = CreateEl("span", "tooltip_min")
			}
		}
		e = CreateEl("span", "top");
		$(e).html(d);
		g.appendChild(e);
		a = CreateEl("b", "bottom");
		g.appendChild(a);
		setOpacity(g);
		f.tooltip = g;
		f.onmouseover = showTooltip;
		f.onmouseout = hideTooltip;
		f.onmousemove = Locate2
	}
}
function hideTip(a) {
	var b = document.getElementById("btc");
	if (b.childNodes.length > 0) {
		b.removeChild(b.firstChild)
	}
}
function showTooltip(a) {
	document.getElementById("btc").appendChild(this.tooltip);
	Locate(a)
}
function hideTooltip() {
	var a = document.getElementById("btc");
	if (a.childNodes.length > 0) {
		a.removeChild(a.firstChild)
	}
}
function setOpacity(a) {
	a.style.filter = "alpha(opacity:95)";
	a.style.KHTMLOpacity = "0.95";
	a.style.MozOpacity = "0.95";
	a.style.opacity = "0.95"
}
function CreateEl(b, d) {
	var a = document.createElement(b);
	a.className = d;
	a.style.display = "block";
	return (a)
}
function AddCss() {}
function Locate(g) {
	var a = 0,
	i = 0;
	if (g == null) {
		g = window.event
	}
	if (g.pageX || g.pageY) {
		a = g.pageX;
		i = g.pageY
	} else {
		if (g.clientX || g.clientY) {
			if (document.documentElement.scrollTop) {
				a = g.clientX + document.documentElement.scrollLeft;
				i = g.clientY + document.documentElement.scrollTop
			} else {
				a = g.clientX + document.body.scrollLeft;
				i = g.clientY + document.body.scrollTop
			}
		}
	}
	var h = window.document.documentElement.clientWidth;
	var c = window.document.documentElement.clientHeight;
	var b = $("#btc").width();
	var f = $("#btc").height();
	var d = $("#btc >span")[0].className;
	if (h - b < a - 20) {
		document.getElementById("btc").style.left = (h - b) + "px";
		if (d == "tooltip") {
			$("#btc >span")[0].className = "tooltip_s"
		} else {
			if (d == "tooltip_min") {
				$("#btc >span")[0].className = "tooltip_min_s"
			} else {
				if (d == "tooltip_mid") {
					$("#btc >span")[0].className = "tooltip_mid_s"
				}
			}
		}
	} else {
		document.getElementById("btc").style.left = (a - 20) + "px"
	}
	if ($(window).scrollTop() + c - f < i) {
		document.getElementById("btc").style.top = (i - f - 10) + "px";
		if (d == "tooltip") {
			$("#btc >span")[0].className = "tooltip_r"
		} else {
			if (d == "tooltip_min") {
				$("#btc >span")[0].className = "tooltip_min_r"
			} else {
				if (d == "tooltip_mid") {
					$("#btc >span")[0].className = "tooltip_mid_r"
				}
			}
		}
		tipDirection = "up"
	} else {
		document.getElementById("btc").style.top = (i + 10) + "px";
		if (d == "tooltip_r") {
			$("#btc >span")[0].className = "tooltip"
		} else {
			if (d == "tooltip_min_r") {
				$("#btc >span")[0].className = "tooltip_min"
			} else {
				if (d == "tooltip_mid_r") {
					$("#btc >span")[0].className = "tooltip_mid"
				}
			}
		}
		tipDirection = "down"
	}
}
function Locate2(f) {
	var a = 0,
	h = 0;
	if (f == null) {
		f = window.event
	}
	if (f.pageX || f.pageY) {
		a = f.pageX;
		h = f.pageY
	} else {
		if (f.clientX || f.clientY) {
			if (document.documentElement.scrollTop) {
				a = f.clientX + document.documentElement.scrollLeft;
				h = f.clientY + document.documentElement.scrollTop
			} else {
				a = f.clientX + document.body.scrollLeft;
				h = f.clientY + document.body.scrollTop
			}
		}
	}
	var g = window.document.documentElement.clientWidth;
	var c = window.document.documentElement.clientHeight;
	var b = $("#btc").width();
	var d = $("#btc").height();
	if (g - b < a - 20) {
		document.getElementById("btc").style.left = (g - b) + "px"
	} else {
		document.getElementById("btc").style.left = (a - 20) + "px"
	}
	if (tipDirection == "up") {
		document.getElementById("btc").style.top = (h - d - 10) + "px"
	} else {
		document.getElementById("btc").style.top = (h + 10) + "px"
	}
}
jQuery.jCookie = function(i, b, l, j) {
	if (!navigator.cookieEnabled) {
		return false
	}
	var j = j || {};
	if (typeof(arguments[0]) !== "string" && arguments.length === 1) {
		j = arguments[0];
		i = j.name;
		b = j.value;
		l = j.expires
	}
	i = encodeURI(i);
	if (b && (typeof(b) !== "number" && typeof(b) !== "string" && b !== null)) {
		return false
	}
	var e = j.path ? "; path=" + j.path: "";
	var f = j.domain ? "; domain=" + j.domain: "";
	var d = j.secure ? "; secure": "";
	var g = "";
	if (b || (b === null && arguments.length == 2)) {
		l = (l === null || (b === null && arguments.length == 2)) ? -1: l;
		if (typeof(l) === "number" && l != "session" && l !== undefined) {
			var k = new Date();
			k.setTime(k.getTime() + (l * 24 * 60 * 60 * 1000));
			g = ["; expires=", k.toGMTString()].join("")
		}
		document.cookie = [i, "=", encodeURI(b), g, f, e, d].join("");
		return true
	}
	if (!b && typeof(arguments[0]) === "string" && arguments.length == 1 && document.cookie && document.cookie.length) {
		var a = document.cookie.split(";");
		var h = a.length;
		while (h--) {
			var c = a[h].split("=");
			if (jQuery.trim(c[0]) === i) {
				return decodeURI(c[1])
			}
		}
	}
	return false
};
function showProgressBar(e, b) {
	var c = "正在加载中...";
	if (e) {
		c = e
	}
	var a = "simple";
	if (b) {
		if (b == "normal") {
			a = b
		}
	}
	if (a == "simple") {
		top.progressFlag = 2;
		top.showSimpleProgress(c, 0, true, "#ffffff")
	} else {
		top.progressFlag = 1;
		var d = new top.Dialog();
		d.Width = 360;
		d.Height = 70;
		d.Title = c;
		d.InvokeElementId = "progress";
		d.show()
	}
}
function showSimpleProgress(c, b, d, a) {
	$("#bs_right").mask(c, b, d, a)
}
function hideSimpleProgress() {
	$("#bs_right").unmask()
}
function iframeHeight(b) {
	var a = document.getElementById(b);
	a.style.height = a.contentWindow.document.body.scrollHeight + "px"
} (function(a) {
	a.fn.mask = function(d, c, e, b) {
		a(this).each(function() {
			if (e == null) {
				e = true
			}
			var f = "#cccccc";
			if (b) {
				f = b
			}
			if (c !== undefined && c > 0 && c != null) {
				var g = a(this);
				g.data("_mask_timeout", setTimeout(function() {
					a.maskElement(g, d, e, f)
				},
				c))
			} else {
				a.maskElement(a(this), d, e, f)
			}
		})
	};
	a.fn.unmask = function() {
		a(this).each(function() {
			a.unmaskElement(a(this))
		})
	};
	a.fn.isMasked = function() {
		return this.hasClass("masked")
	};
	a.maskElement = function(f, e, h, c) {
		maskDiv.show();
		var g = Math.round(f.height() / 2 - 30);
		var d = Math.round(f.width() / 2 - 100);
		if (f.data("_mask_timeout") !== undefined) {
			clearTimeout(f.data("_mask_timeout"));
			f.removeData("_mask_timeout")
		}
		if (f.isMasked()) {
			a.unmaskElement(f)
		}
		if (f.css("position") == "static") {
			f.addClass("masked-relative")
		}
		f.addClass("masked");
		maskDiv.css({
			backgroundColor: c
		});
		if (navigator.userAgent.toLowerCase().indexOf("msie") > -1) {
			maskDiv.height(f.height() + parseInt(f.css("padding-top")) + parseInt(f.css("padding-bottom")));
			maskDiv.width(f.width() + parseInt(f.css("padding-left")) + parseInt(f.css("padding-right")))
		}
		if (navigator.userAgent.toLowerCase().indexOf("msie 6") > -1) {
			f.find("select").addClass("masked-hidden")
		}
		if (e !== undefined && e != null) {
			var b = a('<div class="loadmask-msg" style="display:none;"></div>');
			if (h) {
				b.append('<div class="mask_lading">' + e + "</div>")
			} else {
				b.append('<div  class="normal">' + e + "</div>")
			}
			f.append(b);
			b[0].style.top = g + "px";
			b[0].style.left = d + "px";
			b[0].style.display = ""
		}
	};
	a.unmaskElement = function(b) {
		if (b.data("_mask_timeout") !== undefined) {
			clearTimeout(b.data("_mask_timeout"));
			b.removeData("_mask_timeout")
		}
		b.find(".loadmask-msg").remove();
		b.removeClass("masked");
		b.removeClass("masked-relative");
		b.find("select").removeClass("masked-hidden");
		maskDiv.hide()
	}
})(jQuery);