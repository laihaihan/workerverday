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
<%@page import="com.linewell.core.ucap.module.ModuleManager"%>
<%@page import="com.linewell.ucap.platform.authorized.module.Module"%>
<%@page import="com.linewell.core.ucap.module.CoreModule"%>
<%@page import="com.linewell.core.ucap.module.ModuleLeafManager"%>
<%@page import="com.linewell.core.ucap.module.ModuleLeaf"%>
<%@page import="com.linewell.core.util.StrUtil"%>
<%@page import="com.linewell.core.util.ListUtil"%>
<%@page import="com.linewell.core.ucap.menu.UcapMenuLeafBusiness"%>
<%@page import="com.linewell.core.ucap.menu.UcapMenuLeaf"%>
<%@page import="com.linewell.ucap.session.Session"%>
<%
	UcapMenuLeafBusiness  ucapMenuLeafBusiness = new UcapMenuLeafBusiness();
	String ids = request.getParameter("ids");
	String type = request.getParameter("type");
	Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
	if(!StrUtil.isNull(type)&&type.equals("2")){
		ids = ucapMenuLeafBusiness.getAllModuleAndModuleLeaf(ucapsession.getApp().getUnid());
	}
	
	String zipName = "";
	JSONObject data = new JSONObject();
	JSONArray menuArray = new JSONArray();
	JSONArray moduleArray = new JSONArray();
	JSONArray moduleLeafArray = new JSONArray();
	JSONArray viewArray = new JSONArray();
	JSONArray columnArray = new JSONArray();
	JSONArray queryArray = new JSONArray();
	JSONArray subBtnArray = new JSONArray();
	JSONArray btnArray = new JSONArray();
	JSONArray dictArray = new JSONArray();

	//循环取出所有模块
	String[] idsArray = ids.split(",");
	for(int i =0 ;i < idsArray.length ; i++){
		//如果是传入的是菜单menuid
		UcapMenuLeaf ucapMenuLeaf = ucapMenuLeafBusiness.doFindBeanByKey(idsArray[i]);
		if(null != ucapMenuLeaf){
			menuArray.add(JSONObject.fromObject(ucapMenuLeaf));
			zipName = zipName + ucapMenuLeaf.getLeaf_name() + "+";
			}else{//如果是传入的是模块moduleid
				ModuleManager moduleManager = new ModuleManager();
				CoreModule module = moduleManager.doFindBeanByKey(idsArray[i]);
				if(null != module){
					moduleArray.add(JSONObject.fromObject(module));
					List<UcapMenuLeaf> menuList = ucapMenuLeafBusiness.doFindListByCondition(" leaf_content = '"+idsArray[i]+"'",new Object[0]);
					if(!ListUtil.isNull(menuList)){
						menuArray.add(JSONObject.fromObject((UcapMenuLeaf)menuList.get(0)));
					}
					
					zipName = zipName + module.getModule_name() + "+";
					
				}else{//如果是传入的是模块moduleleafid
					ModuleLeafManager moduleLeafManager = new ModuleLeafManager();
					ModuleLeaf moduleLeaf = moduleLeafManager.doFindBeanByKey(idsArray[i]);
					if(null != moduleLeaf){//叶子模块则导出相应的视图
						moduleLeafArray.add(JSONObject.fromObject(moduleLeaf));
					  
						if(!StrUtil.isNull(moduleLeaf.getLeaf_contents())){
							String viewUnid = moduleLeaf.getLeaf_contents().substring(moduleLeaf.getLeaf_contents().lastIndexOf("viewId=")+7,moduleLeaf.getLeaf_contents().length());
							JdbcSession jdbc = JdbcFactory.getSession(GlobalParameter.APP_CORE);
							List<View> viewList = jdbc.queryForEntityList(View.class," where view_unid = '"+viewUnid+"'");
							if(!ListUtil.isNull(viewList)){
								View view = viewList.get(0);
								String viewId = view.getUnid();
								zipName = zipName + moduleLeaf.getLeaf_name() + "+";
								viewArray.add(JSONObject.fromObject(view));		
								
								List<Column> columnList = jdbc.queryForEntityList(Column.class," where view_unid='"+viewId+"'");	
								for(Column column : columnList){
									columnArray.add(JSONObject.fromObject(column));
								}
								
								List<Query> queryList = jdbc.queryForEntityList(Query.class," where view_unid='"+viewId+"'");
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
								
								List<SubButton> subBtnList = jdbc.queryForEntityList(SubButton.class," where SUB_BELONGTO='"+viewId+"'");
								for(SubButton subButton : subBtnList){
									subBtnArray.add(JSONObject.fromObject(subButton));
								}
								
								List<Button> btnList = jdbc.queryForEntityList(Button.class," where button_unid in (select button_unid from core_sub_button t where t.sub_belongto='"+viewId+"')");
								for(Button button : btnList){
									btnArray.add(JSONObject.fromObject(button));
								}
							}					
						}
					}
				}			
			}
		}
	data.put("MENU",menuArray);
	data.put("MODULE",moduleArray);
	data.put("MODULELEAF",moduleLeafArray);
	data.put("VIEW",viewArray);
	data.put("COLUMN",columnArray);
	data.put("QUERY",queryArray);
	data.put("SUB_BTN",subBtnArray);
	data.put("BTN",btnArray);
	data.put("DICT",dictArray);
	//导出文件并压缩
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
	if(!StrUtil.isNull(type)&&type.equals("2")){
		zipName = ucapsession.getApp().getName();
	}
	response.setHeader("Content-disposition", "attachment;filename="+ URLEncoder.encode(zipName + time+".zip", "utf-8"));
    CompressUtil.makeZipOutStream(fileList,response.getOutputStream(),folder);
    response.flushBuffer();
    out.clear();
    out=pageContext.pushBody();        
%>