<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="java.util.List" %>
<%@page import="java.util.ArrayList"%>
<%@page import="org.apache.commons.lang.StringUtils" %>
<%@page import="com.linewell.ucap.jdbc.core.JdbcTemplate" %>
<%@page import="com.linewell.ucap.db.JDBCTool"%>
<%@page import="java.sql.SQLException"%>
<%
/**
 * 本更新文件解决以下问题
 * 1、为满足用户查询可以查询到子部门的所有用户，生成部门的DEPT_SERIAL_NUMBER字段的内容
 * @author xhuatang@linewell.com
 * @since 2011-08-29
 */
%>
<%!
//JDBC对象
JdbcTemplate jt = null;

//是否已经打开jt
boolean isOpened = false;

//层次的编号长度
int levelLen = 3;

//当前级数
int nowLevel = 0;

//开始的数据
int beginNum = 100;

//记录日志
List<String> log = null;

/**
 * 初始化数据库连接对象
 */
void initJdbcTemplate() {
    if (jt!=null) {
        return;
    }
    isOpened = false;
    if (null == jt) {
        jt = JDBCTool.getPlatformDBTool();
        jt.open();
        isOpened = true;
    }
}

/**
 * 回收数据库连接对象
 */
void recycleJdbcTemplate() {
    if (isOpened) {
        if(null != jt) jt.close();
        jt = null;
    }
}

/**
 * 页面初始化
 */
void pageInit(){
	this.levelLen = 3;

	this.nowLevel = 0;

	this.beginNum = 100;

	this.log = new ArrayList<String>();
}

/**
 * 建立部门系列化的数据
 * @param parUnid 父级部门的UNID
 */
List<String> buildDeptSerialNumber(String parUnid){	
	String sqlStr = "select dept_unid,dept_serial_number,dept_name from ucap_dept";
	sqlStr += " where dept_belongto = '" + parUnid + "'";
	if(StringUtils.isEmpty(parUnid)){
		sqlStr += " or dept_belongto is null";
	}
	sqlStr += " order by dept_sort";
	try {
        this.initJdbcTemplate();
        String[][] rs = jt.queryForArray(sqlStr);
        String parSerialNumber = getParSerialNumber(parUnid);
        this.nowLevel ++;
        for(int i = 1; i < rs.length; i ++){        	
        	//通过父类的系列化组装当前系列化的值
        	String newSerialNum = parSerialNumber + Integer.toString(this.beginNum + i);
        	updateDeptSerialNumber(newSerialNum, rs[i][0]);
        	
        	String tmpStr = "";
        	//获取当前等级的空格
        	for(int k = 1; k < nowLevel; k++){
        		tmpStr += "&nbsp;&nbsp;&nbsp;|-";
            }
        	
        	//输出每个字段
        	for(int j = 0; j < rs[i].length; j++){
        		if(j == 0){
        			continue;
        		}else if(j == 1){
        			  tmpStr += " " + newSerialNum;
        		}else{
        			  tmpStr += " " + rs[i][j];
        		}
        	}
        	log.add(tmpStr);
        	
        	buildDeptSerialNumber(rs[i][0]);
        }
        this.nowLevel --;
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        this.recycleJdbcTemplate();
    }
    return log;
}

/**
 * 获取父类的编码
 * @param parUnid 父类的UNID
 * @return 返回父类的编码
 */
String getParSerialNumber(String parUnid){
	String parSerialNumber = "";
	if(!StringUtils.isEmpty(parUnid)){
		String sqlStr = "select dept_serial_number from ucap_dept";
		sqlStr += " where dept_unid = '" + parUnid + "'";
	    try {
	        this.initJdbcTemplate();
	        String[][] rs = jt.queryForArray(sqlStr);
	        if(rs.length > 1){
	        	parSerialNumber = rs[1][0];
	        }
	    } catch (SQLException e) {
	        e.printStackTrace();
	    } finally {
	        this.recycleJdbcTemplate();
	    }
	}
	return parSerialNumber;
}

/**
 * 更新部门的系列化数字
 * @param serialNumber 系列化的数字
 */
void updateDeptSerialNumber(String serialNumber, String unid){
	String sqlStr = "update ucap_dept set dept_serial_number = '" + serialNumber + "'";
	sqlStr += " where dept_unid = '" + unid + "'";
	try {
        this.initJdbcTemplate();
        jt.execute(sqlStr);
	} catch (SQLException e) {
        e.printStackTrace();
    } finally {
        this.recycleJdbcTemplate();
    }
}
%>
<%
response.setHeader("Expires","0");
response.setHeader("Cache-Control","no-store");
response.setHeader("Pragrma","no-cache");
response.setDateHeader("Expires",0);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta content="升级部门系列化编号" name="description" />
<meta http-equiv="pragma" content="no-cache"/> 
<meta http-equiv="cache-control" content="no-cache"/> 
<meta http-equiv="expires" content="0"/> 
<title>升级部门系列化编号</title>
</head>
<body>
---自动生成系列化begin---<br/>
以下为自动生成后的组织架构以及相应的系列化数值：<br/>
<%
pageInit();
List<String> result = buildDeptSerialNumber("");
for(String str : result){
	str += "<br/>";
%>
<div><%=str%></div>
<%	
}
%>
---自动生成系列化end---
</body>
</html>
