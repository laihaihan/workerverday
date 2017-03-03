package com.linewell.core.ucap.module;

import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import com.linewell.core.ucap.app.UcapApp;
import com.linewell.core.ucap.app.UcapAppBusiness;
import com.linewell.core.ucap.menu.Menubusiness;
import com.linewell.core.util.ListUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.ucap.platform.authorized.menu.Menu;
import com.linewell.ucap.platform.authorized.module.Module;
import com.linewell.ucap.platform.authorized.module.ModuleItem;
import com.linewell.ucap.platform.authorized.module.ModuleManager;
import com.linewell.ucap.resource.ManageException;
import com.linewell.ucap.session.Session;

/**
 * <p>
 * 	   前台UI模块展示调用类
 * </P>
 * 
 * @author cyingquan@linewell.com
 * @date 2011-1-7
 * @version 1.00
 * <p>
 *    Copyright (c) 2011 www.linewell.com
 * </p>
 */

public class UiModule {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(UiModule.class);
	
	/**
	 * 返回页面使用的模块JSON格式
	 * @param moduleUnid 模块的UNID
	 * @return 
	 */
	public String getModuleJson(String moduleUnid,String appPath,Session session){
		ModuleManager mm=new ModuleManager();
		String jsonStr = "";
	
			Module module =null;
			try {
				module = mm.getModule(moduleUnid, session);
				jsonStr = this.getUiTreeModule(module,appPath);
			} catch (ManageException e) {
				logger.error("平台获取module异常",e);
			}
		
		 
		return jsonStr;
		
	}
	
	/**
	 * 获取树型的模块格式
	 * @param module
	 * @return
	 */
	public String getUiTreeModule(Module module,String appPath){
		StringBuffer rtJson = new StringBuffer();
		rtJson.append("[");
		
		if (module !=null){
			List<ModuleItem> moduleItems = module.getModuleItems();
			rtJson.append(getModuleZtree(moduleItems,appPath));
		}
		rtJson.append("]");
		
		return rtJson.toString();
	}
	
	public String getModuleZtree(List<ModuleItem> moduleItems,String appPath){
		StringBuffer rtJson = new StringBuffer();
		for (ModuleItem moduleItem : moduleItems) {
			rtJson.append("{");
			
			List<ModuleItem> items = moduleItem.getModuleItems();//子元素
			if(items == null || items.size() == 0){
				//小图标
				if (moduleItem.getSmallPicture() != null && moduleItem.getSmallPicture().length() > 0) {
					rtJson.append("icon:\"" + appPath + "/" + moduleItem.getSmallPicture() + "\",");
				}else{
					rtJson.append("icon:\"" + appPath + "/core/js/easyui/themes/icons/application.png\",");
				}
				
				//大图标
				if (moduleItem.getBigPicture() != null && moduleItem.getBigPicture().length() > 0) {
					rtJson.append("big_icon:\"" + appPath + "/" + moduleItem.getBigPicture() + "\",");
				}else{
					rtJson.append("big_icon:\"" + appPath + "/uistyle/images/big/icon_60.gif\",");
				}
			}else{
				rtJson.append("children:["+getModuleZtree(items,appPath)+"],");
			}

			rtJson.append("id:\""+moduleItem.getUnid()+"\",");
			rtJson.append("name:\""+moduleItem.getName()+"\",");//名称
			//这里调用一个方法，加上视图别名
			ModuleLink link = new ModuleLink();
			if(moduleItem.getContents().length()>0){
			String content=link.getLink(moduleItem.getContents());
			rtJson.append("link:\""+content+"\"");
			}else{
			rtJson.append("link:\""+moduleItem.getContents()+"\"");
			}
			//链接
			rtJson.append("},");
		}
		
		return rtJson.substring(0, rtJson.lastIndexOf(","));
	}
	
	/**
	 * 系统架构树形json数据组装
	 * @param session
	 * @return
	 */
	public String getSysFrame(Session session,String path){
		String jsonStr = "";
		JSONArray jsonArray = new JSONArray();
		UcapAppBusiness ucapAppBusiness = new UcapAppBusiness();
		ModuleLeafManager moduleLeafManager = new ModuleLeafManager();
		Menubusiness menubusiness = new Menubusiness();
		List<UcapApp> appList = ucapAppBusiness.getAllApp();
		UNIDGenerate unidGenerate = new UNIDGenerate();
		//**************************应用系统列表***********************************
		for (UcapApp ucapApp :appList) {
			JSONObject json = new JSONObject();
			json.put("unid", ucapApp.getApp_unid());
			json.put("name", ucapApp.getApp_name());
			json.put("isopen", "true");
			JSONArray jsonConfigArray = new JSONArray();
			
			//**************************菜单模块树形数据*********************************
			JSONObject json1 = new JSONObject();
			json1.put("unid", ucapApp.getApp_unid());
			json1.put("name", "系统架构");
			json1.put("isParent",true);
			//获取对应系统id的所有菜单列表
			List<com.linewell.ucap.platform.authorized.menu.Menu> menulist = menubusiness.getMenuByAppUnid(ucapApp.getApp_unid(),session);
			JSONArray jsonArrayMenu = new JSONArray();
			for (int i = 0; i < menulist.size(); i++) {
				Menu menu =  (Menu)menulist.get(i);
				JSONObject jsonmenu = new JSONObject();
				jsonmenu.put("unid", menu.getUnid());
				jsonmenu.put("name", menu.getName());
				//取出菜单下模块
				ModuleManager moduleManager = new ModuleManager();
				try {
					List moduleList = (List)moduleManager.doFindByPunid(menu.getUnid());
					if(!ListUtil.isNull(moduleList) ){
						Module  module = (Module)moduleList.get(0);
						if(null != module.getChildrens()){
							JSONArray leafArray = new JSONArray();
							String[] childrens =module.getChildrens().split(",");
							for (int j = 0; j < childrens.length; j++) {
								ModuleLeaf moduleLeaf = moduleLeafManager.doFindBeanByKey(childrens[j]);
								if(null != moduleLeaf){
									JSONObject jsonLeaf1 = new JSONObject();
									jsonLeaf1.put("id", moduleLeaf.getLeaf_unid());
									jsonLeaf1.put("unid", moduleLeaf.getLeaf_unid());
									jsonLeaf1.put("name", moduleLeaf.getLeaf_name());
									jsonLeaf1.put("urlcontent", path+"/core/system/moduleleaf_config.jsp?appunid="+ucapApp.getApp_unid()+"&leafunid="+moduleLeaf.getLeaf_unid());
									String[] leafChildrens = moduleLeaf.getLeaf_childrens().split(",");
									if(null != leafChildrens && leafChildrens.length > 0){
										JSONArray gongnengArray = new JSONArray();
										for (int k = 0; k < leafChildrens.length; k++) {
											ModuleLeaf moduleLeafChildren = moduleLeafManager.doFindBeanByKey(leafChildrens[k]);
											if(null != moduleLeafChildren){
												JSONObject jsonLeaf = new JSONObject();
												jsonLeaf.put("id", moduleLeafChildren.getLeaf_unid());
												jsonLeaf.put("unid", moduleLeafChildren.getLeaf_unid());
												jsonLeaf.put("name", moduleLeafChildren.getLeaf_name());									
												jsonLeaf.put("urlcontent", path+"/core/system/moduleleaf_config.jsp?appunid="+ucapApp.getApp_unid()+"&leafunid="+moduleLeafChildren.getLeaf_unid());
												gongnengArray.add(jsonLeaf);
											}
										}
										jsonLeaf1.put("children", gongnengArray);
										leafArray.add(jsonLeaf1);
									}
								}
							}
							jsonmenu.put("children", leafArray);
						}
					}
				} catch (ManageException e) {
					e.printStackTrace();
				}
				jsonArrayMenu.add(jsonmenu);
			}
			json1.put("children", jsonArrayMenu);
			
			
			//*******************系统配置**************************star
			JSONObject json2 = new JSONObject();
			json2.put("unid", ucapApp.getApp_unid());
			json2.put("name", "系统配置");
			JSONArray sysConfigArray = new JSONArray();
			//视图配置
			JSONObject jsonView = new JSONObject();
			jsonView.put("id", unidGenerate.getUnid());
			jsonView.put("unid", ucapApp.getApp_unid());
			jsonView.put("name", "视图配置");
			jsonView.put("urlcontent", path+"/view.action?fn=grid&viewId=B369E053C83ABB44A118725975D2DEAE&viewAlias=view&APP_UNID="+ucapApp.getApp_unid()+"&modId=BE8C5B401210A69DF2E72B106F0AAA98");
			
			//按钮配置
			JSONObject jsonButtion = new JSONObject();
			jsonButtion.put("id", unidGenerate.getUnid());
			jsonButtion.put("unid", ucapApp.getApp_unid());
			jsonButtion.put("name", "按钮配置");
			jsonButtion.put("urlcontent", path+"/view.action?fn=grid&viewId=501D5A1D1D31D6B2ED79E90F1DDDB7D8&APP_UNID="+ucapApp.getApp_unid()+"&viewAlias=buttonInfo&modId=7AE32932EA30058B9DC53ACF21857B8F");
			
			//流程配置
			JSONObject jsonFlow = new JSONObject();
			jsonFlow.put("id", unidGenerate.getUnid());
			jsonFlow.put("unid", ucapApp.getApp_unid());
			jsonFlow.put("name", "流程配置");
			jsonFlow.put("urlcontent", path+"/view.action?fn=grid&viewId=31EC0A5EE301E6BE829C4C903CBA6F17&APP_UNID="+ucapApp.getApp_unid()+"&viewAlias=flowconfig&modId=2E4CB3D9225C2D6145CCB57FC30AD8AA");
			
			//图标配置
			JSONObject jsonIcon = new JSONObject();
			jsonIcon.put("id", unidGenerate.getUnid());
			jsonIcon.put("unid", ucapApp.getApp_unid());
			jsonIcon.put("name", "图标配置");
			jsonIcon.put("urlcontent", path+"/view.action?fn=grid&viewId=8A6F9E6071EBD831A0B8E6057FA6A9B4&APP_UNID="+ucapApp.getApp_unid()+"&viewAlias=iconApplication&modId=D84FF1C747387013F264E646AC26BD9B");
			
			//首页插件配置
			JSONObject portalPlugButtion = new JSONObject();
			portalPlugButtion.put("id", unidGenerate.getUnid());
			portalPlugButtion.put("unid", ucapApp.getApp_unid());
			portalPlugButtion.put("name", "首页插件配置");
			portalPlugButtion.put("urlcontent", path+"/view.action?fn=grid&viewId=4ED94BD46CAA4C3714E30083457C67EF&APP_UNID="+ucapApp.getApp_unid()+"&viewAlias=portlet&modId=C3970998DCA0B35C740D9CE661EDC662");
			
			//首页配置
			JSONObject portalButtion = new JSONObject();
			portalButtion.put("id", unidGenerate.getUnid());
			portalButtion.put("unid", ucapApp.getApp_unid());
			portalButtion.put("name", "首页配置");
			portalButtion.put("urlcontent", path+"/view.action?fn=grid&viewId=1DD81D965191FDEEFFAA44BB320B00C7&APP_UNID="+ucapApp.getApp_unid()+"&viewAlias=shouyepeizhi&modId=C3970998DCA0B35C740D9CE661EDC662");
			
			sysConfigArray.add(jsonView);
			sysConfigArray.add(jsonButtion);
			sysConfigArray.add(jsonIcon);
			sysConfigArray.add(portalPlugButtion);
			sysConfigArray.add(portalButtion);
			sysConfigArray.add(jsonFlow);
			json2.put("children", sysConfigArray);
			//*******************系统配置**************************end
			 
			
			//*******************通用管理*******************star
			JSONArray coreManagerArray = new JSONArray();
			JSONObject json3 = new JSONObject();
			json3.put("unid", ucapApp.getApp_unid());
			json3.put("name", "通用管理");
			

			//用户管理
			JSONObject jsonuser = new JSONObject();
			jsonuser.put("id", unidGenerate.getUnid());
			jsonuser.put("unid", ucapApp.getApp_unid());
			jsonuser.put("name", "用户管理");
			jsonuser.put("urlcontent", path+"/view.action?fn=grid&viewId=650189F8025FAAB998E0114623700991&viewAlias=user&APP_UNID="+ucapApp.getApp_unid()+"&modId=B070508316C51E58B6EAD813E5F96512");
			
			//部门管理
			JSONObject jsondept = new JSONObject();
			jsondept.put("id", unidGenerate.getUnid());
			jsondept.put("unid", ucapApp.getApp_unid());
			jsondept.put("name", "部门管理");
			jsondept.put("urlcontent", path+"/view.action?fn=grid&viewId=C29400558158B396D944AB3F2573DB24&viewAlias=ucapdept&APP_UNID="+ucapApp.getApp_unid()+"&modId=B070508316C51E58B6EAD813E5F96512");
			
			//角色管理
			JSONObject jsonrole = new JSONObject();
			jsonrole.put("id", unidGenerate.getUnid());
			jsonrole.put("unid", ucapApp.getApp_unid());
			jsonrole.put("name", "角色管理");
			jsonrole.put("urlcontent", path+"/view.action?fn=grid&viewId=4688FF7BE46E4067F8C0F4E2125FDD63&viewAlias=role&APP_UNID="+ucapApp.getApp_unid()+"&modId=B070508316C51E58B6EAD813E5F96512");
	
			//字典管理
			JSONObject jsondict = new JSONObject();
			jsondict.put("id", unidGenerate.getUnid());
			jsondict.put("unid", ucapApp.getApp_unid());
			jsondict.put("name", "字典管理");
			jsondict.put("urlcontent", path+"/view.action?fn=grid&viewId=B369E053C83ABB44A118725975D2D001&viewAlias=dict&APP_UNID="+ucapApp.getApp_unid()+"&modId=B070508316C51E58B6EAD813E5F96512");
	
			//定时任务管理
			JSONObject jsontask = new JSONObject();
			jsontask.put("id", unidGenerate.getUnid());
			jsontask.put("unid", ucapApp.getApp_unid());
			jsontask.put("name", "定时任务管理");
			jsontask.put("urlcontent", "view.action?fn=grid&viewId=3E698BE88AABF4B0B5E821FF83A28348&APP_UNID="+ucapApp.getApp_unid()+"&viewAlias=TaskScheduling&modId=2ADE6F1423C0E7C06D8B48CAD3EF1A0A");
			
			//审计管理
			JSONObject jsonshenji = new JSONObject();
			jsonshenji.put("id", unidGenerate.getUnid());
			jsonshenji.put("unid", ucapApp.getApp_unid());
			jsonshenji.put("name", "审计管理");
			jsonshenji.put("urlcontent", "view.action?fn=grid&viewId=21A5D03695C065FFDFF218EA2325A08D&APP_UNID="+ucapApp.getApp_unid()+"&viewAlias=audit&modId=2ADE6F1423C0E7C06D8B48CAD3EF1A0A");
			coreManagerArray.add(jsondict);
			coreManagerArray.add(jsontask);
			coreManagerArray.add(jsonshenji);
			coreManagerArray.add(jsonuser);
			coreManagerArray.add(jsondept);
			coreManagerArray.add(jsonrole);
			json3.put("children", coreManagerArray);
			
			
			//*************************通用管理*******************end
			
			//************************快速开发************************star
			JSONObject json4 = new JSONObject();
			json4.put("unid", ucapApp.getApp_unid());
			json4.put("name", "快速开发");
			
			JSONArray kskfArray = new JSONArray();
			//快速建模
			JSONObject jsonBuilderModule = new JSONObject();
			jsonBuilderModule.put("id", unidGenerate.getUnid());
			jsonBuilderModule.put("unid", ucapApp.getApp_unid());
			jsonBuilderModule.put("name", "快速建模");
			jsonBuilderModule.put("urlcontent", "view.action?fn=grid&viewId=BDC1C8E09F8B4D2FC2A33246190189E2&APP_UNID="+ucapApp.getApp_unid()+"&viewAlias=buildermodule&modId=7753AE0A838D255CCB885F85AB8AF2A0");
			
			kskfArray.add(jsonBuilderModule);
			json4.put("children", kskfArray);
			//************************快速开发************************end
			

			//************************运维管理************************star
			JSONObject json5 = new JSONObject();
			json5.put("unid", ucapApp.getApp_unid());
			json5.put("name", "运维管理");
			
			JSONArray runManagerArray = new JSONArray();
			
	        JSONObject jsonUserLog = new JSONObject();
	        jsonUserLog.put("id", unidGenerate.getUnid());
	        jsonUserLog.put("unid", ucapApp.getApp_unid());
	        jsonUserLog.put("name", "业务日志");
	        
	        JSONArray userLogArray = new JSONArray();
	        
//	        JSONObject userLoginLog = new JSONObject();
//	        userLoginLog.put("id", unidGenerate.getUnid());
//	        userLoginLog.put("unid", ucapApp.getApp_unid());
//	        userLoginLog.put("name", "登录日志");
//            userLogArray.add(userLoginLog);
            
            JSONObject userOperateLog = new JSONObject();
            userOperateLog.put("id", unidGenerate.getUnid());
            userOperateLog.put("unid", ucapApp.getApp_unid());
            userOperateLog.put("name", "操作日志");
            userOperateLog.put("urlcontent", "view.action?fn=grid&viewId=21A5D03695C065FFDFF218EA2325A08D&APP_UNID="+ucapApp.getApp_unid()+"&viewAlias=audit&modId=2ADE6F1423C0E7C06D8B48CAD3EF1A0A");
            userLogArray.add(userOperateLog);
            
            jsonUserLog.put("children", userLogArray);
            
	        
	        runManagerArray.add(jsonUserLog);
			
			JSONObject jsonSysLog = new JSONObject();
			jsonSysLog.put("id", unidGenerate.getUnid());
			jsonSysLog.put("unid", ucapApp.getApp_unid());
			jsonSysLog.put("name", "系统日志");
			
			JSONArray sysLogArray = new JSONArray();
            
            JSONObject sysExceptioninLog = new JSONObject();
            sysExceptioninLog.put("id", unidGenerate.getUnid());
            sysExceptioninLog.put("unid", ucapApp.getApp_unid());
            sysExceptioninLog.put("name", "异常日志");
            sysExceptioninLog.put("urlcontent", "view.action?fn=grid&viewId=923A320F1D51B7EB111E86D7C83ACB1B&APP_UNID="+ucapApp.getApp_unid()+"&viewAlias=exceptionlog&modId=2ADE6F1423C0E7C06D8B48CAD3EF1A0A");
            sysLogArray.add(sysExceptioninLog);
            
            JSONObject sysPerformanceLog = new JSONObject();
            sysPerformanceLog.put("id", unidGenerate.getUnid());
            sysPerformanceLog.put("unid", ucapApp.getApp_unid());
            sysPerformanceLog.put("name", "性能日志");
            sysLogArray.add(sysPerformanceLog);
            
            jsonSysLog.put("children", sysLogArray);
			
			runManagerArray.add(jsonSysLog);
			json5.put("children", runManagerArray);
			
			
			jsonConfigArray.add(json1);
			jsonConfigArray.add(json2);
			jsonConfigArray.add(json3);
			jsonConfigArray.add(json4);
			jsonConfigArray.add(json5);
			json.put("children",jsonConfigArray);
			jsonArray.add(json);
		} 
		jsonStr = jsonArray.toString();
		return jsonStr;
		
	}
	
}