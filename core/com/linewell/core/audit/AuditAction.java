package com.linewell.core.audit;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.ClientBrowserUtil;
import com.linewell.core.util.DateTime;
import com.linewell.core.util.ParseUrlUtil;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.ucap.session.Session;
import com.opensymphony.xwork2.ActionSupport;

/**
 * <p>
 * 审计管理表 Action
 * </P>
 * 
 * @author admin@linewell.com
 * @date 2013-09-24 17:12:03
 * @version 1.00
 *          <p>
 *          Copyright (c) 2012 www.linewell.com
 *          </p>
 */
public class AuditAction extends ActionSupport {

    private static final long   serialVersionUID = 1L;
    /**
     * Logger for this class
     */
    private static final Logger logger           = Logger.getLogger(AuditAction.class);

    public String execute() {
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpServletResponse response = ServletActionContext.getResponse();

        boolean result = true;
        String fn = request.getParameter("fn");
        AuditBusiness business = new AuditBusiness();

        // 1、新增
        if ("add".equals(fn)) {
            Audit audit = new Audit();
            BeanUtil.updateBean(request, audit);
            result = business.doSave(audit);
        }
        // 2、修改
        else if ("update".equals(fn)) {
            String unid = request.getParameter("unid".toLowerCase());
            Audit audit = business.doFindBeanByKey(unid);
            BeanUtil.updateBean(request, audit);
            result = business.doUpdate(audit);
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
        // 4、视图按钮操作
        else if ("viewButton".equals(fn)) {
            Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
            String btnName = request.getParameter("btnName");
            String viewName = request.getParameter("viewName");
            try {
                btnName = URLDecoder.decode(URLDecoder.decode(btnName, "UTF-8"), "UTF-8");
                viewName = URLDecoder.decode(URLDecoder.decode(viewName, "UTF-8"), "UTF-8");
            } catch (UnsupportedEncodingException e) {
                logger.error(e.getMessage(), e);
            }
            Audit audit = new Audit();
            audit.setUnid(new UNIDGenerate().getUnid());
            audit.setOuser(ucapSession.getUser().getUnid());
            audit.setOuser_cn_(ucapSession.getUser().getDisplayName());
            audit.setAccount(ucapSession.getUser().getName());
            audit.setAppname(ucapSession.getApp().getName());
            audit.setAppunid(ucapSession.getApp().getUnid());
            audit.setClientip(request.getRemoteAddr());
            audit.setClientbrowser(ClientBrowserUtil.getClientExplorerType(request));
            audit.setCreatetime(DateTime.getNowDateTime());
            audit.setRemark("执行[ " + viewName + " ]视图中的-->[" + btnName + "]按钮");
            result = business.doSave(audit);
        }
        // 4、表单按钮操作
        else if ("formButton".equals(fn)) {
            Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
            String btnName = request.getParameter("btnName");
            String referer = request.getHeader("referer");
            String oldData = request.getParameter("oldData");
            String newData = request.getParameter("newData");

            JSONObject oldJsonObject = JSONObject.fromObject(StrUtil.formatNull(oldData));
            JSONArray oldJsonArray = oldJsonObject.getJSONArray("list");
            JSONObject newJsonObject = JSONObject.fromObject(StrUtil.formatNull(newData));
            JSONArray newJsonArray = newJsonObject.getJSONArray("list");

            String formName = ParseUrlUtil.urlRequest(referer).get("dwAuditFormTitle".toLowerCase());
            try {
                btnName = URLDecoder.decode(URLDecoder.decode(btnName, "UTF-8"), "UTF-8");
                formName = URLDecoder.decode(URLDecoder.decode(StrUtil.formatNull(formName), "UTF-8"), "UTF-8");
            } catch (UnsupportedEncodingException e) {
                logger.error(e.getMessage(), e);
            }
            Audit audit = new Audit();
            audit.setUnid(new UNIDGenerate().getUnid());
            audit.setOuser(ucapSession.getUser().getUnid());
            audit.setOuser_cn_(ucapSession.getUser().getDisplayName());
            audit.setAccount(ucapSession.getUser().getName());
            audit.setAppname(ucapSession.getApp().getName());
            audit.setAppunid(ucapSession.getApp().getUnid());
            audit.setClientip(request.getRemoteAddr());
            audit.setClientbrowser(ClientBrowserUtil.getClientExplorerType(request));
            audit.setCreatetime(DateTime.getNowDateTime());
            Map<String, String> map = JsonHelper.getDifferent(newJsonArray, oldJsonArray);
            String remark = "";
            for (Object obj : map.entrySet()) {
                Entry<String, String> entry = (Entry<String, String>) obj;
                remark += "[" + entry.getKey() + "]的值为{" + entry.getValue() + "},";
            }
            if (!StrUtil.isNull(remark)) {
                audit.setRemark("修改" + remark+" ，并执行了[ " + formName + " ]表单中的-->[" + btnName + "]按钮");
            } else {
                audit.setRemark("执行[ " + formName + " ]表单中的-->[" + btnName + "]按钮");
            }
            result = business.doSave(audit);
        }

        // 返回值
        JSONObject json = new JSONObject();
        json.put("result", result);
        PrintUtil.print(response, json.toString());

        return null;
    }
}