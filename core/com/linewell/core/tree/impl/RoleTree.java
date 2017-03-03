package com.linewell.core.tree.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

import com.linewell.core.tree.TreeInterface;
import com.linewell.core.tree.TreeNode;
import com.linewell.core.tree.TreeSetting;
import com.linewell.core.ucap.role.Role;
import com.linewell.core.ucap.role.RoleManager;
import com.linewell.ucap.session.Session;

public class RoleTree implements TreeInterface {

    @Override
    public List<TreeNode> getListTreeNode(HttpServletRequest request) {
        List<TreeNode> treeNodeList = new ArrayList<TreeNode>();
        Session session = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
        String id = request.getParameter("id");
        if (StringUtils.isEmpty(id)) {
            TreeNode treeNode = new TreeNode();
            treeNode.setId(session.getApp().getUnid());
            treeNode.setName(session.getApp().getName());
            treeNode.setParent(true);
            treeNodeList.add(treeNode);
        } else {
            List<Role> roleList = null;
            RoleManager roleManager = new RoleManager();
            roleList = roleManager.doFindListByCondition(" role_belong_to_app = ? ", new Object[]{session.getApp().getUnid()});
            for (Role role : roleList) {
                String roleUnid = role.getRole_unid();
                TreeNode treeNode = new TreeNode();
                treeNode.setId(roleUnid);
                treeNode.setName(role.getRole_name());
                List<Role> childrenList = roleManager.doFindListByCondition("  role_funid= ? and role_belong_to_app = ? ", new Object[]{role.getRole_unid(),session.getApp().getUnid()});
                if (childrenList !=null && childrenList.size() > 0) {
                    treeNode.setParent(true);
                }
                treeNodeList.add(treeNode);
            }
        }

        return treeNodeList;
    }

    @Override
    public TreeSetting getTreeSetting() {
        // TODO Auto-generated method stub
        return null;
    }

}