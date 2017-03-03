<%@page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.linewell.ucap.setup.bean.ServerConfigInfo"%>
<%@ page import="com.linewell.ucap.setup.util.SetupConfigUtil"%>

<%
	SetupConfigUtil configApi = new SetupConfigUtil();
	ServerConfigInfo serverInfo = configApi.getServerConfigInfo();
	if (null == serverInfo) {
		out.println("获取服务器配置信息有错");
		return;
	}
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

	<head>
		<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
		<title>欢迎使用平台配置安装向导</title>
		<link href="../setup/css/style.css" rel="stylesheet" type="text/css" />
		<link href="../setup/css/setup.css" rel="stylesheet" type="text/css" />
		<script language="javascript" src="./js/jquery-1.5.min.js"></script>
		<script language="javascript" src="./js/setup.js"></script>
		<script language="javascript" src="./js/validate.js"></script>

		<script type="text/javascript">
		
		$(document).ready(function(){
			$("#previous").hide();		//上一步按钮隐藏
			$("#setupButton").hide();	//安装按钮隐藏
			$("#complete").hide();		//完成按钮隐藏
			ucapSetup.bindChangeEvent();
		  	ucapSetup.bindValidateEvent();
		  	
		});
		
		/**
		 *获取服务器信息
		 */
		var ucapServerInfo = {
			/**
			 *获取服务器信息
			 */
			getEncoding : function(){
				return "<%=serverInfo.getEncodingString() %>";
			}
		};
		
		</script>
	</head>

	<body class="setup_bg" style="background:url('./images/setup_bg.jpg') no-repeat;">

		<!-- 面板区域 begin-->
		<div class="setup_div">
			<!-- 面板表格（用于使面板居中） begin-->
			<table style="width: 100%; height: 100%">
				<tr>
					<td>
						&nbsp;
					</td>
					<td>
						&nbsp;
					</td>
					<td>
						&nbsp;
					</td>
				</tr>
				<tr>
					<td>
						&nbsp;
					</td>
					<td>
						<!-- 内部表格（用于左右布局） begin-->
						<table align="center" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td style="width: 159px">
									<!-- 面板左侧 begin-->
									<div class="setup_left">
										<div class="setup_left_logo">
										</div>
										<div id="setup_title_1" class="setup_left_title current">
											简介
										</div>
										<div id="setup_title_2" class="setup_left_title">
											检查配置
										</div>
										<div id="setup_title_3" class="setup_left_title">
											配置数据库
										</div>
										<div id="setup_title_4" class="setup_left_title">
											配置缓存
										</div>
										<div id="setup_title_5" class="setup_left_title">
											配置日志
										</div>
										<div id="setup_title_6" class="setup_left_title">
											配置流程
										</div>
										<div id="setup_title_7" class="setup_left_title">
											数据库导入
										</div>
										<div id="setup_title_8" class="setup_left_title">
											安装中...
										</div>
										<div id="setup_title_9" class="setup_left_title">
											安装完成
										</div>
									</div>
									<!-- 面板左侧 end-->
								</td>

								<td style="width: 556x">
									<!-- 面板右侧 begin-->
									<div class="setup_right">
										<!-- 标题 begin-->
										<div id="setup_content_title" class="setup_right_title">
											简介
										</div>
										<!-- 标题 end-->

										<!-- 分隔线 begin-->
										<div class="setup_right_separator">
										</div>
										<!-- 分隔线 end-->

										<!-- 内容 begin-->
										<div>
											<div id="setup_content_1" class="setup_right_content">
												&#160;&#160;&#160;&#160;使用本设置向导的功能，能即使您对平台的缺乏了解，也能够够很快对平台的整个配置环境进行搭建，
												开如果您是发人员可，可以通过搭建的运行环境进行开发；如果您是部署人员，通过搭建的运行环境可以
												容易在运行环境的基础上进行应用的部署。要继续请单击“下一步”对系统进行设置。
											</div>
											<div id="setup_content_2" class="setup_right_content" style="display: none;">
												<table width="100%" border="0"  bordercolor="#cccccc" align="center" cellpadding="0" cellspacing="0">
													<tr>
														<td style="width:20%;">
															服务器IP地址：
														</td>
														<td><%=serverInfo.getServerIP()%></td>
														<td>
															服务器名称：
														</td>
														<td><%=serverInfo.getServerName()%></td>
													</tr>
													<tr>
														<td>
															硬件架构：
														</td>
														<td><%=serverInfo.getHardwareFrame()%></td>
														<td>
															服务器CPU：
														</td>
														<td><%=serverInfo.getServerCPUCount()%>个
														</td>
													</tr>
													<tr>
														<td>
															操作系统：
														</td>
														<td><%=serverInfo.getSystemName()%>
														</td>
														<td>
															操作系统版本号：
														</td>
														<td><%=serverInfo.getSystemVersion()%></td>
													</tr>
													<tr>
														<td>
															系统语言：
														</td>
														<td><%=serverInfo.getSystemLanguage()%></td>
														<td>
															编码字符集：
														</td>
														<td><%=serverInfo.getEncodingString()%></td>
													</tr>
													<tr>
														<td>
															JDK版本：
														</td>
														<td><%=serverInfo.getJDKVersion()%></td>
														<td>
															JVM版本号：
														</td>
														<td><%=serverInfo.getJVMVersion()%></td>
													</tr>
													<tr>
														<td>
															JVM名称：
														</td>
														<td><%=serverInfo.getJVMName()%>
														</td>
														<td>
															JVM厂商：
														</td>
														<td><%=serverInfo.getJVMManufacturer()%></td>
													</tr>
													<tr>
														<td>
															平台版本号：
														</td>
														<td>
															v2.0
														</td>
														<td>
															&nbsp;
														</td>
														<td>
															&nbsp;
														</td>
													</tr>
													<tr>
														<td>
															检测结果
														</td>
														<%
															if ("UTF-8".equalsIgnoreCase(serverInfo.getEncodingString())) {
														%>
														<td colspan="3" class="red">
															<label id="message">
																恭喜您，您的应用服务器编码检查成功，请单击“下一步”进行其他配置！
															</label>
														</td>
														<%
															} else {
														%>
														<td colspan="3" class="red">
															tomcat下server.xml Connector URIEncoding="<%=serverInfo.getEncodingString()%>",应该改成UTF-8
														</td>
														<%
															}
														%>
													</tr>
												</table>
											</div>
											<div id="setup_content_3" class="setup_right_content"
												style="display: none;">
												<table width="100%" align="center" cellpadding="0"
													cellspacing="1">
													<tr>
														<th align="right" style="width:25%;">
															数据库连接名称：
														</th>
														<td class="input_box">
															<input message="数据库连接名不能为空" id="dbConnName"
																value="proxool" name="dbConnName" type="text" size="20" />
															<span class="hint">数据库的别名，用于数据库基本配置的分辨</span>
														</td>
													</tr>
													<tr>
														<th align="right" style="width:25%;">
															数据库类型：
														</th>
														<td class="input_box">
															<select id="dbType" name="dbType">
																<option value="0">
																	--请选择数据库类型--
																</option>
																<option value="1" selected>
																	Oracle
																</option>
																<option value="2">
																	SqlServer
																</option>
																<option value="3">
																	MySql
																</option>
																<option value="4">
																	人大金仓
																</option>
																<option value="5">
																	SysBase
																</option>
															</select>
															<span class="hint">支持多种数据库类型</span>
														</td>
													</tr>
													<tr>
														<th align="right" style="width:25%;">
															数据库IP地址：
														</th>
														<td class="input_box">
															<input id="ipAddr" checkType="2" message="Ip地址不正确"
																value="127.0.0.1" onblur="checkDirPath(this.value)"
																name="ipAddr" type="text" size="20" />
															<span class="hint">如：192.168.1.1</span>
														</td>
													</tr>
													<tr>
														<th align="right" style="width:25%;">
															端口号：
														</th>
														<td class="input_box">
															<input id="port" checkType="3" message="端口不正确"
																value="1521" name="port" type="text" size="15" />
															<span id="showPort" class="hint">如：1433</span>
														</td>
													</tr>
													<tr>
														<th id="tbNameText" align="right" style="width:25%;">
															数据库名称：
														</th>
														<td class="input_box">
															<input id="dbName" message="数据库名称不能为空" value="orcl"
																name="dbName" type="text" size="20" />
															<span class="hint">连接数据库的用户名</span>
														</td>
													</tr>
													<tr id="trOracle">
														<th align="right" style="width:25%;">
															数据库别名：
														</th>
														<td>
															<input type="text" name="netName" id="netName" />
															<span class="hint">如果oracle
																实现服务与数据库分离的话，需要输入数据库别名，方便数据导入</span>
														</td>
													</tr>
													<tr>
														<th align="right" style="width:25%;">
															数据库用户名：
														</th>
														<td class="input_box">
															<input id="userName" message="数据库用户名不能为空" value="ucap"
																name="userName" type="text" size="20" />
															<span class="hint">连接数据库的用户名</span>
														</td>
													</tr>
													<tr>
														<th align="right" style="width:25%;">
															数据库密码：
														</th>
														<td class="input_box">
															<input id="pwd" name="pwd" message="密码不能为空" value="ucap"
																type="password" size="20" />
															<span class="hint">连接数据库的密码 </span>
													
															<input class="connCheck" type="submit" name="Submit23"
																onclick="checkDBConn();" value="测试连接" />
																
														</td>
													</tr>
												</table>
											</div>
											<div id="setup_content_4" class="setup_right_content"
												style="display: none;">
												<table width="100%" align="center" cellpadding="0"
													cellspacing="1">
													<tr>
														<th align="right" style="width:25%;">
															缓存类型：
														</th>
														<td class="input_box" style="width:70%;">
															<select name="cacheType" id="cacheType" style="width:120px;">
																<option value="0" selected="selected">
																	--请选择缓存类型--
																</option>
																<option value="OSCache">
																	OSCache
																</option>
																<option value="MemCached">
																	MemCached
																</option>
															</select>
															<span class="hint">缓存服务器的类型选择</span>
															<input name="cacheImpl" id="cacheImpl" type="hidden" />
														</td>
													</tr>
													<tr style="display: none;" class="ForOSCache">
														<th align="right">
															是否使用内存缓存：
														</th>
														<td class="input_box">
															<input type="checkbox" name="OSCacheCheckbox" checked
																value="checkbox" id="OSCacheCheckbox" />
															<label for="checkbox">
																是
																<span class="hint">标记是否应用内存或者硬盘存储</span>
															</label>
														</td>
													</tr>
													<tr style="display: none;" class="ForOSCache">
														<th align="right">
															硬盘保存位置：
														</th>
														<td class="input_box">
															<input id="OSCachesaveDiskAddr" message="硬盘保存位置路径不正确"
																value="c:/app/cache" name="OSCachesaveDiskAddr"
																type="text" size="20" />
															<input type="hidden" id="dirchecked" />
															<span class="hint">设置缓存在硬盘中的保存位置</span>
														</td>
													</tr>
													<tr style="display: none;" class="ForMemcached">
														<th align="right">
															服务器地址和端口号：
														</th>
														<td class="input_box">
															<input id="MemcachedIPAndPort" checkType="1"
																message="服务器地址和端口号填写错误" name="MemcachedIPAndPort"
																value="127.0.0.1:11211" type="text" style="width:70px;"/>
															<span class="hint">各个IP地址间用,隔开，如：192.168.70.66:11211</span>
														</td>
													</tr>
													<tr style="display: none;" class="ForMemcached">
														<th align="right">
															各个服务器的权重：
														</th>
														<td class="input_box">
															<input id="MemcachedWeight" checkType="4"
																message="各个服务器的权重必须为整数" name="MemcachedWeight"
																type="text" value="1" style="width:40px;" />
															<span class="hint">与上面服务器的配置相对应，值越大越优先，用,分隔</span>
														</td>
													</tr>
													<tr style="display: none;" class="ForMemcached">
														<th align="right">
															初始化的连接数：
														</th>
														<td class="input_box">
															<input id="MemcachedConnCount" checkType="3"
																message="初始化的连接数必须为整数" name="MemcachedConnCount"
																type="text" value="5" style="width:70px;" />
															<span class="hint">服务器初始化的默认连接数</span>
														</td>
													</tr>
													<tr style="display: none;" class="ForMemcached">
														<th align="right">
															最小连接数：
														</th>
														<td class="input_box">
															<input id="MemcachedConnMinCount" checkType="3"
																message="最小连接数必须为整数" name="MemcachedConnMinCount"
																type="text" value="5" style="width:70px;" />
															<span class="hint">服务器允许的最小连接数</span>
														</td>
													</tr>
													<tr style="display: none;" class="ForMemcached">
														<th align="right">
															最大连接数：
														</th>
														<td class="input_box">
															<input id="MemcachedConnMaxCount" checkType="3"
																message="最大连接数必须为整数" name="MemcachedConnMaxCount"
																type="text" value="250" style="width:70px;" />
															<span class="hint">服务器允许的最大连接数</span>
														</td>
													</tr>
													<tr style="display: none;" class="ForMemcached">
														<th align="right">
															最大处理时间：
														</th>
														<td class="input_box">
															<input id="MemcachedMaxExcTime" checkType="3"
																message="最大处理时间必须为整数" name="MemcachedMaxExcTime"
																type="text" value="51600000" style="width:70px;" />
															<span class="hint">设置服务器请求的最大处理时间（1000*60*60*6）单位：毫秒（ms）</span>
														</td>
													</tr>
													<tr style="display: none;" class="ForMemcached">
														<th align="right">
															主线程的睡眠时间：
														</th>
														<td class="input_box">
															<input id="MemcachedSleepTime" checkType="3"
																message="主线程的睡眠时间必须为整数" name="MemcachedSleepTime"
																type="text" value="30" style="width:40px;" />
															<span class="hint">设置服务器请求处理的时间间隔，单位：毫秒（ms）</span>
														</td>
													</tr>
													<tr style="display: none;" class="ForMemcached">
														<th align="right">
															是否关闭nagle算法：
														</th>
														<td class="input_box">
															<input type="radio" name="nagle" checked value="1" />
															是
															<input type="radio" name="nagle" value="0" />
															否
															<span class="hint">*默认为关闭nagle算法</span>
														</td>
													</tr>
													<tr style="display: none;" class="ForMemcached">
														<th align="right">
															设置读取超时时间：
														</th>
														<td class="input_box">
															<input id="MemcachedOverTime" checkType="3"
																message="设置读取超时时间必须为整数" name="MemcachedOverTime"
																type="text" value="3000" style="width:70px;" />
															<span class="hint">*设置服务器请求的处理的超时时间，默认为3秒单位：毫秒（ms）</span>

														</td>
													</tr>
												</table>
											</div>
											<div id="setup_content_5" class="setup_right_content"
												style="display: none;">
												<table width="100%" align="center" cellpadding="0"
													cellspacing="1">
													<tr>
														<th align="right" style="width:25%;">
															log4j保存路径:
														</th>
														<td class="input_box">
															<input id="logSaveAddress" message="og4j保存路径错误"
																name="logSaveAddress" type="text" value="d:\log4j\"
																style="width:200px;" />
															<span class="hint">为系统的物理路径，如:c:\log4j\</span>
														</td>
													</tr>
												</table>
											</div>
											<div id="setup_content_6" class="setup_right_content"
												style="display: none;">
												<table width="100%" align="center" cellpadding="0"
													cellspacing="1">
													<tr>
														<th align="right" style="width:25%;">
															保存方式:
														</th>
														<td class="input_box">
															<select id="flowFileSaveType" name="flowFileSaveType">
																<option value="local">
																	保存到本地文件
																</option>
																<option value="db">
																	保存到数据库
																</option>
															</select>
															<span class="hint">具体流程实例保存的地址</span>
														</td>
													</tr>
													<tr id="flowAddr">
														<th align="right" style="width:25%;">
															流程文件保存地址:
															<br />
														</th>
														<td class="input_box">
															<br />
															<input id="flowFileSaveAddress" message="流程文件保存地址错误"
																name="flowFileSaveAddress" type="text"
																value="c:\workflow" size="20" />
															<span class="hint">为系统的物理路径，如:c:\flow\，可配置为空，当选择数据库时：为流程设计器的配置信息</span>
															<br />
															<br />
														</td>
													</tr>
												</table>
											</div>
											<div id="setup_content_7" class="setup_right_content"
												style="display: none;">
												<table width="100%" align="center" cellpadding="0"
													cellspacing="1">
													<tr>
														<th align="right" style="width:25%;">
															是否导入数据库：
														</th>
														<td>
															<input type="radio" name="isDBImport" value="1" checked />
															是
															<input type="radio" name="isDBImport" value="0" />
															否
														</td>
													</tr>
												</table>
											</div>
											<div id="setup_content_8" class="setup_right_content"
												style="display: none;">
												<div class=""  id="setupMessage">
													正在安装，请稍候...
												</div>
											</div>
											<div id="setup_content_9" class="setup_right_content"
												style="display: none;">
												<div style="line-height: 25px;">
													你已经成功配置了本系统，请重新启动应用系统，以保证所设置的应用生效。现在可以关闭本设置向导以并在服务器启动成功后进入/System管理目录进行系统的其他管理。
												</div>
												<div>
													设置管理员用户
												</div>
												<table width="100%" align="center" cellpadding="0"
													cellspacing="1">
													<tr>
														<th align="right" style="width:20%;">
															用户名:
														</th>
														<td class="input_box">
															<input name="sysadmin" id="sysadmin" type="text"
																value="admin" size="30" />
															<span class="hint">用户名为5-20个字符</span>
														</td>
													</tr>
													<tr>
														<th align="right" style="width:20%;">
															密码：
														</th>
														<td class="input_box">
															<input name="syspwd" id="syspwd" type="password"
																value="123" size="30" />
															<span class="hint">密码长度要求6-18位;初始密码为123</span>
														</td>
													</tr>
													<tr>
														<th align="right" style="width:20%;">
															密码确认：
														</th>
														<td class="input_box">
															<input name="sysNewpwd" id="sysNewpwd" type="password"
																value="123" size="30" />
															<span class="hint">再次输入密码,保证密码正确</span>
														</td>
													</tr>
													<tr>

														<td class="input_box" colspan=2 align=right>
															<input name="updateUserPwd"  class="connCheck" id="updateUserPwd"
																type="button" onclick="ucapSetup.updateUserPwd();"
																value="修改密码" />
														</td>
													</tr>
												</table>
											</div>
										</div>

										<!-- 内容 end-->

										<!-- 按钮区 begin-->
										<div class="setup_right_button">
											<input type="button" name="previous" id="previous"
												value="上一步" onclick="ucapSetup.previousAndNext(-1);" />
											<input type="button" name="next" id="next"
												onclick="ucapSetup.previousAndNext(1);" value="下一步" />
											<input type="button" name="setupButton" id="setupButton"
												onclick="ucapSetup.previousAndNext(1);" value="安装" />
											<input type="button" name="complete" id="complete" onclick="window.close();"
												value="完成" />
										</div>
										<!-- 按钮区 end-->

									</div>
									<!-- 面板右侧 end-->
								</td>
							</tr>
						</table>
						<!-- 内部表格（用于左右布局） end-->
					</td>
					<td>
						&nbsp;
					</td>
				</tr>
				<tr>
					<td>
						&nbsp;
					</td>
					<td>
						&nbsp;
					</td>
					<td>
						&nbsp;
					</td>
				</tr>
			</table>
			<!-- 面板表格（用于使面板居中） end-->
		</div>
		<!-- 面板区域 end-->

	</body>

</html>
