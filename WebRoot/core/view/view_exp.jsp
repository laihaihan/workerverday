<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.view.View"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.view.column.Column"%>
<%@page import="com.linewell.core.db.JdbcSession"%>
<%@page import="com.linewell.core.db.JdbcFactory"%>
<%@page import="com.linewell.core.system.GlobalParameter"%>
<%@page import="com.linewell.core.view.query.Query"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page import="net.sf.json.JSONArray"%>
<%@page import="com.linewell.core.util.DateTime"%>
<%@page import="java.io.File"%>
<%@page import="java.io.FileWriter"%>
<%@page import="com.linewell.core.util.CompressUtil"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="com.linewell.core.button.SubButton"%>
<%@page import="com.linewell.core.button.Button"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.linewell.core.dict.ApasDict"%>
<%@page import="com.linewell.core.dict.ApasDictManager"%>
<%
	String ids = request.getParameter("ids");
	//ids = "'C7845C78320050BEAD8B88B81D50B990'";
	
	JSONObject data = new JSONObject();
	JSONArray viewArray = new JSONArray();
	JSONArray columnArray = new JSONArray();
	JSONArray queryArray = new JSONArray();
	JSONArray subBtnArray = new JSONArray();
	JSONArray btnArray = new JSONArray();
	JSONArray dictArray = new JSONArray();
	
	JdbcSession jdbc = JdbcFactory.getSession(GlobalParameter.APP_CORE);
	
	String zipName = "";
	List<View> viewList = jdbc.queryForEntityList(View.class,"where view_unid in ("+ids+")");
	for(View view : viewList){
		String viewId = view.getUnid();
		zipName = zipName + view.getName() + "+";
		viewArray.add(JSONObject.fromObject(view));		
		
		List<Column> columnList = jdbc.queryForEntityList(Column.class,"where view_unid='"+viewId+"'");	
		for(Column column : columnList){
			columnArray.add(JSONObject.fromObject(column));
		}
		
		List<Query> queryList = jdbc.queryForEntityList(Query.class,"where view_unid='"+viewId+"'");
		for(Query query : queryList){
			queryArray.add(JSONObject.fromObject(query));
			
			ApasDictManager dm = new ApasDictManager();
			if(StringUtils.isNotEmpty(query.getDicUnid())){
				List<ApasDict> dictList = dm.doFindByType(StringUtils.strip(query.getDicUnid()));
				for(ApasDict dict:dictList){
					dictArray.add(JSONObject.fromObject(dict));
				}
			}
		}
		
		List<SubButton> subBtnList = jdbc.queryForEntityList(SubButton.class,"where SUB_BELONGTO='"+viewId+"'");
		for(SubButton subButton : subBtnList){
			subBtnArray.add(JSONObject.fromObject(subButton));
		}
		
		List<Button> btnList = jdbc.queryForEntityList(Button.class,"where button_unid in (select button_unid from core_sub_button t where t.sub_belongto='"+viewId+"')");
		for(Button button : btnList){
			btnArray.add(JSONObject.fromObject(button));
		}
	}
	
	data.put("VIEW",viewArray);
	data.put("COLUMN",columnArray);
	data.put("QUERY",queryArray);
	data.put("SUB_BTN",subBtnArray);
	data.put("BTN",btnArray);
	data.put("DICT",dictArray);
	

	String time = DateTime.getNowDateTime("yyyyMMddhhmmss");
	String folder = request.getRealPath("/")+"lw-admin"+File.separator+"update"+File.separator+time;
	File folderFile = new File(folder);
	if(!folderFile.exists()){
		folderFile.mkdirs();
	}
	
	FileWriter fw = new FileWriter(folder+File.separator+"data.txt");
	fw.write(data.toString(),0,data.toString().length());  
	fw.flush();
	fw.close();
	
	String[] fileList = new String[1];
	fileList[0] = folder+File.separator+"data.txt";
	
	response.setHeader("Content-disposition", "attachment;filename="+ URLEncoder.encode(zipName + time+".zip", "utf-8"));
    CompressUtil.makeZipOutStream(fileList,response.getOutputStream(),folder);
    response.flushBuffer();
    
	out.clear();
	out = pageContext.pushBody();
%>