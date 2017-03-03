<%--
/**
 * 内网视图页
 * @author cyingquan@qq.com
 * @2010-11-18
 * @version 1.0
*/
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="org.apache.poi.hssf.usermodel.HSSFWorkbook"%>
<%@page import="org.apache.poi.hssf.usermodel.HSSFSheet"%>
<%@page import="org.apache.poi.hssf.usermodel.HSSFRow"%>
<%@page import="org.apache.poi.hssf.usermodel.HSSFCell"%>
<%@page import="java.io.OutputStream"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="org.apache.poi.ss.usermodel.Workbook"%>
<%@page import="org.apache.poi.ss.usermodel.Sheet"%>
<%@page import="java.io.FileOutputStream"%>
<%@page import="org.apache.poi.ss.usermodel.Row"%>
<%@page import="org.apache.poi.ss.usermodel.Cell"%>
<%@page import="java.util.Map"%>
<%@page import="com.linewell.core.db.JDBCTool"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="org.apache.velocity.runtime.directive.Foreach"%>
<%@page import="org.apache.poi.ss.usermodel.CellStyle"%>
<%@page import="org.apache.poi.ss.usermodel.IndexedColors"%>
<%@page import="org.apache.poi.ss.usermodel.Header"%>
<%@page import="org.apache.poi.hssf.usermodel.HSSFHeader"%>
<%@page import="org.apache.poi.hssf.usermodel.HSSFFont"%>
<%@page import="java.io.FileInputStream"%>
<%@page import="java.io.File"%>
<%@page import="com.linewell.core.util.UNIDGenerate"%>
<%@page import="com.linewell.core.view.*"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String headers = request.getParameter("headers");
	String fields = request.getParameter("fields");

	String[] headerArray = headers.split(",");
	String[] fieldArray = fields.split(",");

	Workbook wb = new HSSFWorkbook();
	Sheet sheet = wb.createSheet();

	CellStyle style = wb.createCellStyle();
	style.setWrapText(true);

	//1.表头
	Row rowTitle = sheet.createRow(0);
	for (int i = 0; i < headerArray.length; i++) {
		Cell cell = rowTitle.createCell(i);
		cell.setCellValue(headerArray[i]);
		cell.setCellStyle(style);
	}

	//2.数据
    String viewunid = request.getParameter("viewunid");
    JSONObject json = (JSONObject)request.getSession().getAttribute("VIEW");

	
	String sql = json.get("VIEW_SQL").toString();
	String jndi = json.get("VIEW_JNDI").toString();

	List<Map> dataList = JDBCTool.doSQLQueryList(jndi, sql);

	for (int i = 0; i < dataList.size(); i++) {
		Map data = dataList.get(i);
		Row row = sheet.createRow(i + 1);

		for (short j = 0; j < fieldArray.length; j++) {
			String field = fieldArray[j].toLowerCase();
			if ("_emptyfield".equals(field) || StrUtil.isNull(field)) {
				continue;
			}
			Cell cell = row.createCell(j);
			cell.setCellValue(StrUtil.formatNull(String.valueOf(data.get(field))));
			cell.setCellStyle(style);
			sheet.autoSizeColumn(j);
		}
	}

	//3.生成
	String filedownload = "c:\\"+ new UNIDGenerate().getUnid()+".xls";
	FileOutputStream fileOut = new FileOutputStream(filedownload);
	wb.write(fileOut);
	fileOut.close();
	
	
	//4.下载
	response.setContentType("application/x-download");
	String filedisplay = "导出excel.xls";
	filedisplay = URLEncoder.encode(filedisplay, "UTF-8");
	response.addHeader("Content-Disposition", "attachment;filename="
			+ filedisplay);

	OutputStream outp = null;
	FileInputStream in = null;
	try {
		outp = response.getOutputStream();
		in = new FileInputStream(filedownload);

		byte[] b = new byte[1024];
		int i = 0;

		while ((i = in.read(b)) > 0) {
			outp.write(b, 0, i);
		}
		outp.flush();
	} catch (Exception e) {
		System.out.println("Error!");
		e.printStackTrace();
	} finally {
		if (in != null) {
			in.close();
			in = null;
		}
		if (outp != null) {
			outp.close();
			outp = null;
		}
	}
    out.clear();
    out=pageContext.pushBody();

	File delFile = new File(filedownload);
	delFile.delete();
%>