package com.linewell.core.tree;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCTool;


public class TestTree implements TreeInterface {
    private static final Logger logger = Logger.getLogger(TestTree.class);
    

	public List<TreeNode> getListTreeNode(HttpServletRequest request) {
		List<TreeNode> treeList = new ArrayList<TreeNode>();
		
		String parentunid = request.getParameter("id");
		if (StringUtils.isEmpty(parentunid)) {
			TreeNode treeNode = new TreeNode();
			treeNode.setId("0");
			treeNode.setName("文章栏目");
			treeNode.setParent(true);
			treeList.add(treeNode);
		} else {
			String sql = "select t.unid, t.name from ptl_category t where t.parentunid = '"
					+ parentunid + "' order by t.sid";
			try {
				List<Map<String, String>> list = JDBCTool.doSQLQueryList("16CDD5D1EB12840A1C3C348E1726A33D",sql);
				for (Map<String, String> map : list) {
					Map<String, String> otherData = new HashMap<String, String>();
					otherData.put("parentunid", map.get("unid"));
					TreeNode treeNode = new TreeNode();
					treeNode.setId(map.get("unid"));
					treeNode.setName(map.get("name"));
					treeNode.setParent(isParent(map.get("unid")));
					treeNode.setOtherData(otherData);

					treeList.add(treeNode);
				}
			} catch (SQLException e) {
			    logger.error(e);
			}
		}
		return treeList;
	}

	public TreeSetting getTreeSetting() {		
		List<String> paramList = new ArrayList<String>();		
		paramList.add("parentunid");
		
		TreeSetting treeSetting = new TreeSetting();
		treeSetting.setParamList(paramList);
		
		return treeSetting;
	}
	/*
	public TreeSetting getTreeSetting() {
		List<String> paramList = new ArrayList<String>();		
		paramList.add("parentunid");
		
		TreeSetting treeSetting = new TreeSetting();
		treeSetting.setParamList(paramList);
		
		return treeSetting;
	}*/
	
	private boolean isParent(String unid){
		boolean bool = false;
		
		String sql = "select unid from ptl_category t where t.parentunid ='"+unid+"'";
		try {
			String[][] array = JDBCTool.doSQLQuery("16CDD5D1EB12840A1C3C348E1726A33D",sql);
			if (array.length>1) {
				bool = true;
			}
		} catch (SQLException e) {
		    logger.error(e);
		}
		
		return bool;
	}

}
