package com.linewell.core.view.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.linewell.core.ucap.menu.Menubusiness;
import com.linewell.core.ucap.module.ModuleLeaf;
import com.linewell.core.ucap.module.ModuleLeafManager;
import com.linewell.core.ucap.module.ModuleManager;
import com.linewell.core.util.ListUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.core.view.ViewInterface;
import com.linewell.core.view.ViewNode;
import com.linewell.ucap.platform.authorized.menu.Menu;
import com.linewell.ucap.platform.authorized.module.Module;

public class SysFrameViewGrid implements ViewInterface{

	@Override
	public List<ViewNode> getListViewNode(HttpServletRequest request){
		String id = request.getParameter("id");
		List<ViewNode> viewNodeList = new ArrayList<ViewNode>();
		//判断id是否是菜单，有则找到所属模块
		if("0".equals(id)){//取出所有数据
			Menubusiness menubusiness = new Menubusiness();
			List<Menu> menuList = menubusiness.getAllMenu(request);
			for (Menu menu : menuList) {
				ViewNode viewNodeMenu = new ViewNode();
				viewNodeMenu.setId(menu.getUnid());
				viewNodeMenu.setName(menu.getName());
				viewNodeList.add(viewNodeMenu);
				viewNodeList.addAll(setViewNodeById(request,menu.getUnid()));
			}
		}else{
			viewNodeList = setViewNodeById(request,id);
			//平台的api只能根据menuid和moduleid获取下级模块，无法根据module_leaf所以这边另做处理。
			if(ListUtil.isNull(viewNodeList)){
				viewNodeList = getLeafNode(id);
			}
		}
		return viewNodeList;
	}
	
	private List<ViewNode> setViewNodeById(HttpServletRequest request,String id){
		List<ViewNode> viewNodeList = new ArrayList<ViewNode>();
		ModuleManager moduleManager = new ModuleManager();
		 //加载模块一级模块
		List<Module> moduleList = moduleManager.getModuleListByPunid(request, id);
		for(Module module: moduleList){
			ViewNode viewNode = new ViewNode();
			viewNode.setId(module.getUnid());
			viewNode.setName(module.getName());
			viewNodeList.add(viewNode);
			
			ModuleLeafManager moduleLeafManager = new ModuleLeafManager();
			ModuleLeaf moduleLeaf = moduleLeafManager.doFindBeanByKey(module.getUnid());
			if(null != moduleLeaf){
				String moduleLeafStrS = moduleLeaf.getLeaf_childrens();
				if(!StrUtil.isNull(moduleLeafStrS) ){
					String[] moduleLeafArray = moduleLeafStrS.split(",");
					for (int i = 0; i < moduleLeafArray.length; i++) {
						ModuleLeaf moduleLeafTmp = moduleLeafManager.doFindBeanByKey(moduleLeafArray[i]);
						if(null == moduleLeafTmp){
							continue;
						}
						ViewNode viewNodeleaf = new ViewNode();
						viewNodeleaf.setId(moduleLeafTmp.getLeaf_unid());
						viewNodeleaf.setName(moduleLeafTmp.getLeaf_name());
						viewNodeList.add(viewNodeleaf);
						
						
						moduleLeaf = moduleLeafManager.doFindBeanByKey(moduleLeafTmp.getLeaf_unid());
						if(null != moduleLeaf){
							moduleLeafStrS = moduleLeaf.getLeaf_childrens();
							if(StrUtil.isNull(moduleLeafStrS) ){
								String[] moduleLeafArray2 = moduleLeafStrS.split(",");
								for (int j = 0; j < moduleLeafArray2.length; j++) {
									ModuleLeaf moduleLeafTmp2 = moduleLeafManager.doFindBeanByKey(moduleLeafArray2[j]);
									if(null == moduleLeafTmp2){
										continue;
									}
									ViewNode viewNodeleaf2 = new ViewNode();
									viewNodeleaf2.setId(moduleLeafTmp2.getLeaf_unid());
									viewNodeleaf2.setName(moduleLeafTmp2.getLeaf_name());
									viewNodeList.add(viewNodeleaf2);
								}
							}
						}
					}
				}
			}
		}			
		return viewNodeList;
	}
	
	public List<ViewNode> getLeafNode(String id){ 
		List<ViewNode> viewNodeList = new ArrayList<ViewNode>();

		viewNodeList = setNode(viewNodeList,id); 

		return viewNodeList;
	}	
	
	
	private List<ViewNode> setNode(List<ViewNode> viewNodeList,String id){
		ModuleLeafManager moduleLeafManager = new ModuleLeafManager();
		ModuleLeaf moduleLeaf = moduleLeafManager.doFindBeanByKey(id);
		if(null != moduleLeaf){
			String moduleLeafStrS = moduleLeaf.getLeaf_childrens();
			if(!StrUtil.isNull(moduleLeafStrS) ){
				String[] moduleLeafArray = moduleLeafStrS.split(",");
				for (int i = 0; i < moduleLeafArray.length; i++) {
					ModuleLeaf moduleLeafTmp = moduleLeafManager.doFindBeanByKey(moduleLeafArray[i]);
					if(null == moduleLeafTmp){
						continue;
					}
					ViewNode viewNodeleaf = new ViewNode();
					viewNodeleaf.setId(moduleLeafTmp.getLeaf_unid());
					viewNodeleaf.setName(moduleLeafTmp.getLeaf_name());
					viewNodeList.add(viewNodeleaf);
					
					
					moduleLeaf = moduleLeafManager.doFindBeanByKey(moduleLeafTmp.getLeaf_unid());
					if(null != moduleLeaf){
						moduleLeafStrS = moduleLeaf.getLeaf_childrens();
						if(StrUtil.isNull(moduleLeafStrS) ){
							String[] moduleLeafArray2 = moduleLeafStrS.split(",");
							for (int j = 0; j < moduleLeafArray2.length; j++) {
								ModuleLeaf moduleLeafTmp2 = moduleLeafManager.doFindBeanByKey(moduleLeafArray2[j]);
								if(null == moduleLeafTmp2){
									continue;
								}
								ViewNode viewNodeleaf2 = new ViewNode();
								viewNodeleaf2.setId(moduleLeafTmp2.getLeaf_unid());
								viewNodeleaf2.setName(moduleLeafTmp2.getLeaf_name());
								viewNodeList.add(viewNodeleaf2);
							}
						}
					}
				}
			}
		}
		return viewNodeList;
	}
}
