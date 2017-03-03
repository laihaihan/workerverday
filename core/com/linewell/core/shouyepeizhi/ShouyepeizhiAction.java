package com.linewell.core.shouyepeizhi;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.collections.ListUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;

import com.linewell.core.db.JdbcFactory;
import com.linewell.core.db.JdbcSession;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.NumberUtil;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.core.view.View;
import com.linewell.core.view.ViewManager;
import com.linewell.core.view.column.Column;
import com.linewell.core.yonghushouyepaixu.Yonghushouyepaixu;
import com.linewell.core.yonghushouyepaixu.YonghushouyepaixuBusiness;
import com.linewell.ucap.checkunique.UserManager;
import com.linewell.ucap.session.Session;
import com.linewell.util.StringBase;
import com.opensymphony.xwork2.ActionSupport;

/**
 * <p>
 * Action
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2013-05-08 11:39:43
 * @version 1.00
 *          <p>
 *          Copyright (c) 2012 www.linewell.com
 *          </p>
 */
public class ShouyepeizhiAction extends ActionSupport {
    /**
     * 日志对象
     */
    private static final Log  logger           = LogFactory.getLog(UserManager.class);
    private static final long serialVersionUID = 1L;

    public String execute() {
        // 返回值
        JSONObject json = new JSONObject();

        HttpServletRequest request = ServletActionContext.getRequest();
        HttpServletResponse response = ServletActionContext.getResponse();

        boolean result = true;
        String fn = request.getParameter("fn");
        ShouyepeizhiBusiness business = new ShouyepeizhiBusiness();

        // 1、新增
        if ("add".equals(fn)) {
            Shouyepeizhi shouyepeizhi = new Shouyepeizhi();
            BeanUtil.updateBean(request, shouyepeizhi);
            result = business.doSave(shouyepeizhi);
        }
        // 2、修改
        else if ("update".equals(fn)) {
            String unid = request.getParameter("unid".toLowerCase());
            Shouyepeizhi shouyepeizhi = business.doFindBeanByKey(unid);
            BeanUtil.updateBean(request, shouyepeizhi);
            result = business.doUpdate(shouyepeizhi);
        }
        // 3、删除
        else if ("del".equals(fn)) {
            String ids = request.getParameter("ids");
            String[] objsStr = ids.replace("'", "").split(",");
            String condition = "unid = ?";
            for (int i = 0; i < objsStr.length; i++) {
                Object[] objs = new Object[1];
                objs[0] = objsStr[i];
                result = business.doDeleteByCondition(condition, objs);
            }
        }
        // 4、
        else if ("showAllRole".equals(fn)) {
            String selectRolesname = request.getParameter("selectRolesname");
            try {
                selectRolesname = URLDecoder.decode(selectRolesname, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                logger.error(e.getMessage());
            }
            String jndi = request.getParameter("jndiName");
            List<Map<String, String>> list = business.selectRole(jndi);

            request.setAttribute("roleList", list);
            request.setAttribute("selectRolesname", selectRolesname);
            return "chooserole";
        }
        // 5、获取首页组件
        else if ("getPortlets".equals(fn)) {
            List leftList = new ArrayList();
            List rightList = new ArrayList();
            List centerList = new ArrayList();
            Session session = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
            String appunid = session.getApp().getUnid();
            String roles = session.getUser().getRoles();
            String[] roleArray = roles.split(",");
            // 查询角色拥有的插件信息
            for (int i = 0; i < roleArray.length; i++) {
                List tempLeft = business.doFindListByCondition(" position = ? and belong_to_apps = ? and belong_to_roles like ? ", new Object[] { "left",appunid, "%" + roleArray[i] + "%" });
                List tempCenter = business.doFindListByCondition(" position = ? and belong_to_apps = ? and belong_to_roles like ? ", new Object[] { "center",appunid, "%" + roleArray[i] + "%" });
                List tempRight = business.doFindListByCondition(" position = ? and belong_to_apps = ? and belong_to_roles like ? ", new Object[] { "right",appunid, "%" + roleArray[i] + "%" });
                // 左
                if (tempLeft != null) {
                    int count = 0;
                    for (int j = 0; j < tempLeft.size(); j++) {
                        Shouyepeizhi temp = (Shouyepeizhi) tempLeft.get(j);
                        if (count == 0) {
                            leftList = tempLeft;
                        } else {
                            for (int k = 0; k < leftList.size(); k++) {
                                Shouyepeizhi ttemp = (Shouyepeizhi) leftList.get(k);
                                if (!temp.getUnid().equals(ttemp.getUnid())) {
                                    leftList.add(ttemp);
                                }
                            }
                        }
                    }
                }
                // 中
                if (tempCenter != null) {
                    int count = 0;
                    for (int j = 0; j < tempCenter.size(); j++) {
                        Shouyepeizhi temp = (Shouyepeizhi) tempCenter.get(j);
                        if (count == 0) {
                            centerList = tempCenter;
                        } else {
                            for (int k = 0; k < centerList.size(); k++) {
                                Shouyepeizhi ttemp = (Shouyepeizhi) centerList.get(k);
                                if (!temp.getUnid().equals(ttemp.getUnid())) {
                                    centerList.add(ttemp);
                                }
                            }
                        }
                    }
                }
                // 右
                if (tempRight != null) {
                    int count = 0;
                    for (int j = 0; j < tempRight.size(); j++) {
                        Shouyepeizhi temp = (Shouyepeizhi) tempRight.get(j);
                        if (count == 0) {
                            rightList = tempRight;
                        } else {
                            for (int k = 0; k < rightList.size(); k++) {
                                Shouyepeizhi ttemp = (Shouyepeizhi) rightList.get(k);
                                if (!temp.getUnid().equals(ttemp.getUnid())) {
                                    rightList.add(ttemp);
                                }
                            }
                        }
                    }
                }
            }
            // 判断是否有用户自定义的排序
            YonghushouyepaixuBusiness ybusiness = new YonghushouyepaixuBusiness();
            Yonghushouyepaixu yonghushouyepaixu = ybusiness.doFindBeanByUserID(session.getUser().getUnid());
            if (yonghushouyepaixu != null) {
                String portletSort = yonghushouyepaixu.getPortlets_sort();
                String[] temp = portletSort.split("~@~");// 长度必定为3//左中右。
                if(StringBase.nullOrEmpty(temp[0])){
                    temp[0] = "''";
                }
                if(StringBase.nullOrEmpty(temp[1])){
                    temp[1] = "''";
                }
                if(StringBase.nullOrEmpty(temp[2])){
                    temp[2] = "''";
                }
                // 左
                List userLeftList = business.doFindListByCondition(" unid in(" + temp[0] + ") ", null);
                // 解决数据库取出时不按顺序排列
                List userLeftTempList = new ArrayList();
                String[] leftTempArray = temp[0].split(",");
                for (int i = 0; i < leftTempArray.length; i++) {
                    if (userLeftList != null) {
                        leftTempArray[i] = leftTempArray[i].substring(1, leftTempArray[i].length() - 1);
                        for (int j = 0; j < userLeftList.size(); j++) {
                            Shouyepeizhi sp = (Shouyepeizhi) userLeftList.get(j);
                            if (sp.getUnid().equals(leftTempArray[i])) {
                                Shouyepeizhi oksp = business.doFindBeanByKey(leftTempArray[i]);
                                userLeftTempList.add(oksp);
                            }
                        }
                    }
                }
                userLeftList = userLeftTempList;
                // 中
                List userCenterList = business.doFindListByCondition(" unid in(" + temp[1] + ") ", null);
                // 解决数据库取出时不按顺序排列
                List userCenterTempList = new ArrayList();
                String[] centerTempArray = temp[1].split(",");
                for (int i = 0; i < centerTempArray.length; i++) {
                    if (userCenterList != null) {
                        centerTempArray[i] = centerTempArray[i].substring(1, centerTempArray[i].length() - 1);
                        for (int j = 0; j < userCenterList.size(); j++) {
                            Shouyepeizhi sp = (Shouyepeizhi) userCenterList.get(j);
                            if (sp.getUnid().equals(centerTempArray[i])) {
                                Shouyepeizhi oksp = business.doFindBeanByKey(centerTempArray[i]);
                                userCenterTempList.add(oksp);
                            }
                        }
                    }
                }
                userCenterList = userCenterTempList;
                // 右
                List userRightList = business.doFindListByCondition(" unid in(" + temp[2] + ") ", null);
                // 解决数据库取出时不按顺序排列
                List userRightTempList = new ArrayList();
                String[] rightTempArray = temp[2].split(",");
                for (int i = 0; i < rightTempArray.length; i++) {
                    if (userRightList != null) {
                        rightTempArray[i] = rightTempArray[i].substring(1, rightTempArray[i].length() - 1);
                        for (int j = 0; j < userRightList.size(); j++) {
                            Shouyepeizhi sp = (Shouyepeizhi) userRightList.get(j);
                            if (sp.getUnid().equals(rightTempArray[i])) {
                                Shouyepeizhi oksp = business.doFindBeanByKey(rightTempArray[i]);
                                userRightTempList.add(oksp);
                            }
                        }
                    }
                }
                userRightList = userRightTempList;
                // 与角色拥有的插件与用户自定义排序进行对比：并集+角色剩余的
                List rolesAllList = new ArrayList();
                rolesAllList = ListUtils.union(rolesAllList, leftList == null ? new ArrayList() : leftList);
                rolesAllList = ListUtils.union(rolesAllList, centerList == null ? new ArrayList() : centerList);
                rolesAllList = ListUtils.union(rolesAllList, rightList == null ? new ArrayList() : rightList);

                leftList = new LinkedList();
                centerList = new LinkedList();
                rightList = new LinkedList();
                // 角色与用户的交集
                if (userLeftList != null) {
                    for (int j = 0; j < userLeftList.size(); j++) {
                        Shouyepeizhi sp2 = (Shouyepeizhi) userLeftList.get(j);
                        for (int i = 0; i < rolesAllList.size(); i++) {
                            Shouyepeizhi sp = (Shouyepeizhi) rolesAllList.get(i);
                            if (sp.getUnid().equals(sp2.getUnid())) {
                                leftList.add(sp);
                            }
                        }
                    }
                }
                if (userCenterList != null) {
                    for (int j = 0; j < userCenterList.size(); j++) {
                        Shouyepeizhi sp2 = (Shouyepeizhi) userCenterList.get(j);
                        for (int i = 0; i < rolesAllList.size(); i++) {
                            Shouyepeizhi sp = (Shouyepeizhi) rolesAllList.get(i);
                            if (sp.getUnid().equals(sp2.getUnid())) {
                                centerList.add(sp);
                            }
                        }
                    }
                }
                if (userRightList != null) {
                    for (int j = 0; j < userRightList.size(); j++) {
                        Shouyepeizhi sp2 = (Shouyepeizhi) userRightList.get(j);
                        for (int i = 0; i < rolesAllList.size(); i++) {
                            Shouyepeizhi sp = (Shouyepeizhi) rolesAllList.get(i);
                            if (sp.getUnid().equals(sp2.getUnid())) {
                                rightList.add(sp);
                            }
                        }
                    }
                }
                // 角色－用户的差集
                List rolesLeaveList = ListUtils.subtract(rolesAllList, ListUtils.union(ListUtils.union(leftList, centerList), rightList));
                for (int i = 0; i < rolesLeaveList.size(); i++) {
                    Shouyepeizhi sp = (Shouyepeizhi) rolesLeaveList.get(i);
                    if ("left".equals(sp.getPosition())) {
                        leftList.add(sp);
                    } else if ("center".equals(sp.getPosition())) {
                        centerList.add(sp);
                    } else if ("right".equals(sp.getPosition())) {
                        rightList.add(sp);
                    }
                }
            }

            json.put("leftList", JSONArray.fromObject(leftList).toString());
            json.put("centerList", JSONArray.fromObject(centerList).toString());
            json.put("rightList", JSONArray.fromObject(rightList).toString());
        }
        // 6. 保存排序
        else if ("saveSort".equals(fn)) {
            String sort = request.getParameter("sort");
            YonghushouyepaixuBusiness ybusiness = new YonghushouyepaixuBusiness();
            Session session = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
            Yonghushouyepaixu yonghushouyepaixu = new Yonghushouyepaixu();
            // 先查询当前用户是否有记录，如果有，则更新；没有则新增一条。
            List list = ybusiness.doFindListByCondition(" userid = ? and belong_to_apps = ? ", new Object[] { session.getUser().getUnid(),session.getApp().getUnid() });
            if (list == null || list.size() == 0) {
                yonghushouyepaixu.setUnid(new UNIDGenerate().getUnid());
                yonghushouyepaixu.setUserid(session.getUser().getUnid());
                yonghushouyepaixu.setPortlets_sort(sort);
                yonghushouyepaixu.setBelong_to_apps(session.getApp().getUnid());
                result = ybusiness.doSave(yonghushouyepaixu);
            } else {
                yonghushouyepaixu = (Yonghushouyepaixu) list.get(0);//
                yonghushouyepaixu.setUnid(yonghushouyepaixu.getUnid());
                yonghushouyepaixu.setPortlets_sort(sort);
                yonghushouyepaixu.setBelong_to_apps(session.getApp().getUnid());
                result = ybusiness.doUpdate(yonghushouyepaixu);
            }
        }
        // 7、视图列
        else if ("getViewColumn".equals(fn)) {
            String viewId = request.getParameter("viewId");
            JdbcSession jdbc = JdbcFactory.getSession(GlobalParameter.APP_CORE);
            List<Column> columnList = jdbc.queryForEntityList(Column.class, "where view_unid='" + viewId + "'");

            PrintUtil.print(response, JSONArray.fromObject(columnList));
            return null;
        }
        // 8、获取数据
        else if ("getViewData".equals(fn)) {
            String viewColumns = request.getParameter("viewColumns");
            String viewId = request.getParameter("viewId");
            String portletUnid = request.getParameter("unid");
            Shouyepeizhi shouyepeizhi = new Shouyepeizhi();
            JdbcSession jdbc = JdbcFactory.getSession(GlobalParameter.APP_CORE);
            // 得到column的名称
            if (StringUtils.isNotEmpty(viewColumns)) {
                String[] columns = viewColumns.split(",");
                String unids = "";
                for (int i = 0; i < columns.length; i++) {
                    unids += "'" + columns[i] + "',";
                }
                unids = StringUtils.substringBeforeLast(unids, ",");
                String hql = " where view_unid='" + viewId + "' " + " and column_unid in (" + unids + ") order by column_sort";

                List<Column> columnList = jdbc.queryForEntityList(Column.class, hql);
                json.put("columns", JSONArray.fromObject(columnList));
            }
            // 得到分页数据
            String page = request.getParameter("page");
            String rows = request.getParameter("rows");
            if (!StringUtils.isNotEmpty(rows)) {
                rows = "8";
            }

            ViewManager viewService = new ViewManager();
            String data = viewService.getPadding(viewId, NumberUtil.parseInt("1"), NumberUtil.parseInt(rows), request);
            json.put("resultList", data);
            PrintUtil.print(response, json);
            return null;
        }
        //9、获取
        else if("init".equals(fn)){
            YonghushouyepaixuBusiness ybusiness = new YonghushouyepaixuBusiness();
            Session session = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
            Yonghushouyepaixu yonghushouyepaixu = new Yonghushouyepaixu();

            // 先查询当前用户是否有记录，如果有，则更新；没有则新增一条。
            List<Yonghushouyepaixu> list = ybusiness.doFindListByCondition(" userid = ? ", new Object[] { session.getUser().getUnid() });
            json.put("sort", list.get(0).getPortlets_sort());
        }
        //10、获取视图
        else if("getView".equals(fn)){
            String viewId = request.getParameter("viewId");
            ViewManager manager = new ViewManager();
            View view = manager.getView(viewId);
            json.put("view",JSONObject.fromObject(view));
        }
        json.put("result", result);
        PrintUtil.print(response, json.toString());

        return null;
    }
}