<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.linewell.core.shouyepeizhi.*" %>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@include file="/core/params.jsp" %>
<%@ taglib prefix="s" uri="/struts-tags"%> 
<%
	ShouyepeizhiBusiness business = new ShouyepeizhiBusiness();
	List pList = business.doFindListByCondition("",null);
	pList = (pList==null?new ArrayList():pList);
	
%>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>jQuery UI Portlet</title>
		<link rel="stylesheet" href="./lib/themes/1.10/start/jquery-ui-1.10.2.custom.min.css" />
		<link rel="stylesheet" href="./css/jquery.portlet.css?v=1.1.3" />
		<script src="./lib/jquery-1.8.3.min.js" type="text/javascript"></script>
		<script src="./lib/jquery-ui-1.10.2.custom.min.js" type="text/javascript"></script>
		<script src="./script/jquery.portlet.js?v=1.1.3"></script>
		<script>
		$(function(){
			$.ajax({
				url:'shouyepeizhi.action',
				dataType:'json',
				cache:false,
				async:false,
				data:{
					fn:'getPortlets'
				},
				error:function(){
					top.popup.errorService();
				},
				success:function(data){
					alert(data.portlets);
				}
			});
		});
    $(function() {
        $('#portlets').portlet({
            sortable: true,
            create: function() {
                //alert('created portlet.');
            },
            removeItem: function() {
                alert('after remove');
            },
            getSort: function(data){
            	alert(data);
            	//TODO:AJAX保存到数据库
            },
            columns: [{
            	id:'left',
                width: 250,
                portlets: [{
                    attrs: {
                        id: 'feeds'
                    },
                    title: function() {
                        var d = new Date();
                        return 'Feeds(' + (d.getMonth() + 1) + '-' + d.getDay() + '日)';
                    },
                    icon: 'ui-icon-signal-diag',
                    content: {
                        //设置区域内容属性
                        style: {
                            height: '200px'
                        },
                        type: 'text',
                        text: '<ul><li>Feed item 1</li><li>Feed item 2</li></ul>',
                        beforeShow: function(aa) {
                            //alert('before show, content is: ' + aa);
                        },
                        afterShow: function() {
                            //alert('after show');
                        }
                    },
                    scripts: ['demo/loaded-by-portlet.js']
                }, {
                    attrs: {
                        id: 'news'
                    },
                    title: 'News',
                    beforeRefresh: function() {
                        alert("before refresh");
                    },
                    afterRefresh: function(data) {
                        //alert("after refresh: " + data);
                    },
                    content: {
                        style: {
                            height: '200'
                        },
                        type: 'text',
                        text: function() {
                            return $('#newsTemplate').html();
                            //return $('#newsTemplate ul');
                        }
                    }
                }]
            }, {
            	id:'center',
                width: 200,
                portlets: [{
                   	attrs: {
                        id: 'shopping'
                    },
                    title: 'Shopping',
                    content: {
                        attrs: {
                            'class': 'highlight-content'
                        },
                        type: 'text',
                        text: 'Shopping contens<br/>Shopping contens<br/>Shopping contens<br/>Shopping contens<br/>'
                    }
                }]
            }, {
            	id:'right',
                width: 350,
                portlets: [{
                	attrs: {
                        id: 'Ajax'
                    },
                    title: 'Ajax',
                    content: {
                        type: 'ajax',
                        url: 'demo/ajax.html'
                    }
                }, {
                	attrs: {
                        id: 'Ajax 错误'
                    },
                    title: 'Ajax 错误',
                    content: {
                        type: 'ajax',
                        url: 'noexsit.html',
                        error: function() {
                            $(this).append('<br/><br/>捕获到ajax错误');
                            // alert('出错了');
                        }
                    }
                }, {
                	attrs: {
                        id: 'Ajax Json Datas'
                    },
                    title: 'Ajax Json Datas',
                    content: {
                        type: 'ajax',
                        dataType: 'json',
                        url: 'demo/ajax.json',
                        formatter: function(o, pio, data) {
                            var ct = "<ul>";
                            $.each(data, function() {
                                ct += "<li>" + this.text + "</li>";
                            });
                            return ct + "</ul>";
                        }
                    }
                }]
            }]
        });
    });
    </script>
	</head>
	<body>
		<!-- 模板 -->
	    <div id="newsTemplate" style="display:none">
	        <ul>
	            <li><a href='http://www.kafeitu.me/'>http://www.kafeitu.me</a></li>
	            <li><a href='https://github.com/henryyan'>https://github.com/henryyan</a></li>
	        </ul>
	    </div>
		<div id='portlets'></div>
	</body>
</html>