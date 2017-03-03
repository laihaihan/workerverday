package com.linewell.core.system.frame.tree;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

import com.linewell.core.tree.TreeInterface;
import com.linewell.core.tree.TreeNode;
import com.linewell.core.tree.TreeSetting;
import com.linewell.core.ucap.menu.Menubusiness;
import com.linewell.core.ucap.module.CoreModule;
import com.linewell.core.ucap.module.ModuleLeaf;
import com.linewell.core.ucap.module.ModuleLeafManager;
import com.linewell.core.ucap.module.ModuleManager;
import com.linewell.core.util.ListUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.ucap.platform.authorized.menu.Menu;
import com.linewell.ucap.platform.authorized.module.Module;
import com.linewell.ucap.session.Session;

public class SystemFrameContentsTree implements TreeInterface {

	@Override
	public List<TreeNode> getListTreeNode(HttpServletRequest request) {
		List<TreeNode> treeList = new ArrayList<TreeNode>();

		ModuleManager moduleManager = new ModuleManager();
		Session session = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		String belongToAppId = session.getApp().getUnid();
		String parentunid = request.getParameter("id");
		if (StringUtils.isEmpty(parentunid)) {
			TreeNode treeNode = new TreeNode();
			treeNode.setId("0");
			treeNode.setName("系统架构");
			treeNode.setParent(true);
			treeList.add(treeNode);
		}else if("0".equals(parentunid)){//加载菜单
			Menubusiness menubusiness = new Menubusiness();
			List<Menu> menuList = menubusiness.getAllMenu(request);
			for (Menu menu : menuList) {
				TreeNode treeNode = new TreeNode(); 
				treeNode.setId(menu.getUnid());
				treeNode.setName(menu.getName());
				treeNode.setParent(true);
				treeList.add(treeNode);
			}
		}else { //加载模块
			 //加载模块一级模块
			List<Module> moduleList = moduleManager.getModuleListByPunid(request, parentunid);
			for(Module module: moduleList){
				TreeNode treeNode = new TreeNode();
				
				treeNode.setId(module.getUnid());
				treeNode.setName(module.getName());
				if(StrUtil.isNull(module.getChildrens())){
					treeNode.setParent(false);
				}else{ 
					treeNode.setParent(true);
				}
				
				treeList.add(treeNode);
			}
			 //加载模块二级模块 由于现有的视图树机制不支持一次加载多层树，所以平台的模块树形api无法直接使用，
			//这里就暂时不做权限过滤，等后面树形改造后这段代码需要修改
			if(ListUtil.isNull(moduleList)){
				ModuleLeafManager moduleLeafManager = new ModuleLeafManager();
				ModuleLeaf moduleLeaf = moduleLeafManager.doFindBeanByKey(parentunid);
				String moduleLeafStrS = moduleLeaf.getLeaf_childrens();
				String[] moduleLeafArray = moduleLeafStrS.split(",");
				for (int i = 0; i < moduleLeafArray.length; i++) {
					ModuleLeaf moduleLeafTmp = moduleLeafManager.doFindBeanByKey(moduleLeafArray[i]);
					if(null == moduleLeafTmp){
						continue;
					}
					TreeNode treeNode = new TreeNode();
					treeNode.setId(moduleLeafTmp.getLeaf_unid());
					treeNode.setName(moduleLeafTmp.getLeaf_name());
					treeNode.setParent(false);
					treeList.add(treeNode);
				}
			}

		}
		return treeList;
	}

	@Override
	public TreeSetting getTreeSetting() {
		
		List<String> paramList = new ArrayList<String>();		
		paramList.add("parentunid");
		
		TreeSetting treeSetting = new TreeSetting();
		treeSetting.setParamList(paramList);
		
		return treeSetting;
	}
}
