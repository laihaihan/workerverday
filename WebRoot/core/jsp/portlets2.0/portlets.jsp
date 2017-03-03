<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>首页</title>
		<script type="text/javascript" src="jquery-1.9.0.min.js"></script>
		<script type="text/javascript" src="jquery-migrate-1.2.1.min.js"></script>
		<link href="inettuts.css" rel="stylesheet" type="text/css" />
		<style type="text/css">
			.widget-placeholder { border: 2px dashed #a3c0e8;}
			#column1 .widget-placeholder { margin: 6px; }
			#column2 .widget-placeholder { margin: 6px; }
			#column3 .widget-placeholder { margin: 6px; }
		</style>
		<script type="text/javascript">
			$(function(){
			
			});
		</script>
	</head>
	<body>
		<script type="text/javascript">
        $('<style type="text/css">.column{visibility:hidden;}</style>').appendTo('head');
    </script>
		
		<div id="columns">
			<ul id="column1" class="column">
				<li class="widget color-white" id="widget1">
					<div class="widget-head">
						爱我中国1
					</div>
					<div class="widget-content">
						<p>我是中国人，我爱我的祖国；</p>
						<p>我是中国人，我爱我的祖国；</p>
						<p>我是中国人，我爱我的祖国；</p>
						<p>我是中国人，我爱我的祖国；</p>
						<p>我是中国人，我爱我的祖国；</p>
						<p>我是中国人，我爱我的祖国；</p>
						<p>我是中国人，我爱我的祖国；</p>
					</div>
				</li>
				<li class="widget color-white" id="widget2">
					<div class="widget-head">
						爱我中国2
					</div>
					<div class="widget-content">
						<p>
							我是中国人，我爱我的祖国；我是中国人，我爱我的祖国；我是中国人，我爱我的祖国；我是中国人，我爱我的祖国；
						</p>
					</div>
				</li>

			</ul>
			<ul id="column2" class="column">
				<li class="widget color-white" id="widget62">
					<div class="widget-head">
						爱我中国62
					</div>
					<div class="widget-content">
						<p title="我是中国人，我爱我的祖国；">
							我是中国人，我爱我的祖国；
						</p>
						<p>
							我是中国人，我爱我的祖国；
						</p>
					</div>
				</li>
			</ul>
			<ul id="column3" class="column">
				<li class="widget color-white" id="widget63">
					<div class="widget-head">
						爱我中国63
					</div>
					<div class="widget-content">
						<p title="我是中国人，我爱我的祖国；">
							我是中国人，我爱我的祖国；
						</p>
						<p>
							我是中国人，我爱我的祖国；
						</p>
					</div>
				</li>
			</ul>

		</div>

		<script type="text/javascript" src="jquery-ui-1.10.2.custom.min.js"></script>
		<script type="text/javascript" src="jquery.cookie.js"></script>
		<script type="text/javascript" src="inettuts.js"></script>
	</body>
</html>