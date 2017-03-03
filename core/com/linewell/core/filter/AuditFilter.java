package com.linewell.core.filter;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;
import java.util.Map.Entry;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.MDC;

import com.linewell.core.audit.Audit;
import com.linewell.core.audit.AuditBusiness;
import com.linewell.core.util.ClientBrowserUtil;
import com.linewell.core.util.DateTime;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.ucap.platform.authorized.app.App;
import com.linewell.ucap.platform.authorized.app.AppManager;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucap.resource.ManageException;
import com.linewell.ucap.session.Session;
import com.linewell.util.StringBase;

/**
 * @Copyright :(C),2012
 * @CompanyName :南威软件股份有限公司(www.linewell.com)
 * @Version :1.0
 * @Date :Sep 4, 2013
 * @author : 文件创建者姓名：李竞雄 ljingxiong@linewell.com
 * @Description :
 */
public class AuditFilter implements Filter {

    private static final Log          LOG                   = LogFactory.getLog(AuditFilter.class);

    protected FilterConfig            filterConfig;
    private boolean                   enabled;
    private static final List<String> DEFAULT_IGNORE_SUFFIX = Arrays.asList("css;js;jpg;ico;jpeg;bmp;gif;png;css;swf".split(";"));
    private static final String       CHARSET_ENCODING      = "UTF-8";

    /**
     * 构造函数
     */
    public AuditFilter() {
        filterConfig = null;
        enabled = true;
    }

    /**
     * 初始化 (non-Javadoc)
     * 
     * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
     */
    public void init(FilterConfig mFilterConfig) throws ServletException {
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>MonitorFilter开始>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        this.filterConfig = mFilterConfig;
        String value = filterConfig.getInitParameter("enabled");
        if (StrUtil.isNull(value)) {
            enabled = true;
        } else if ("true".equalsIgnoreCase(value)) {
            enabled = true;
        } else {
            enabled = false;
        }
    }

    /**
     * 过滤 (non-Javadoc)
     * 
     * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest,
     *      javax.servlet.ServletResponse, javax.servlet.FilterChain)
     */
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;

        // 开始时间
        long start_time = System.currentTimeMillis();
        AuditHttpServletResponseWrapper responseWrapper = new AuditHttpServletResponseWrapper(resp);
        
        Session ucapSession = (Session) req.getSession().getAttribute(Session.SESSION_NAME);
        if (ucapSession != null) {
            MDC.put("userId",ucapSession.getUser().getUnid());
            MDC.put("userName",ucapSession.getUser().getDisplayName());
        }
        MDC.put("exceptionUnid",new UNIDGenerate().getUnid());
        chain.doFilter(request, responseWrapper);
        // 结束时间
        long end_time = System.currentTimeMillis();
        // 保存请求信息
        if (enabled) {
            saveRequestInfo(req, responseWrapper, String.valueOf(end_time - start_time));
        }
    }

    /**
     * 销毁 (non-Javadoc)
     * 
     * @see javax.servlet.Filter#destroy()
     */
    public void destroy() {
        filterConfig = null;
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>MonitorFilter销毁>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    }

    /**
     * 是否为ajax异步请求
     */
    private boolean isAjaxRequest(HttpServletRequest request) {
        String isAjax = request.getParameter("x-requested-with");
        boolean status = false;
        status = !StringBase.nullOrEmpty(isAjax);
        return status;
    }

    /**
     * 保存请求事件
     * 
     * @param request
     * @param resp
     * @param costTime
     */
    private void saveRequestInfo(HttpServletRequest request, AuditHttpServletResponseWrapper response, String costTime) {

        Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
        if (ucapSession != null) {
            User user = ucapSession.getUser();
            App app = ucapSession.getApp();
            String ctxPath = request.getContextPath();
            String reqUri = request.getRequestURI();
            String uri = reqUri.substring(ctxPath.length());

            if (uri.indexOf(".") > -1) {
                Audit audit = new Audit();
                audit.setUnid(new UNIDGenerate().getUnid());
                audit.setAccount(user.getName());
                audit.setCreatetime(DateTime.getNowDateTime());
                audit.setOuser(user.getUnid());
                audit.setOuser_cn_(user.getDisplayName());

                String appUnid = request.getParameter("APP_UNID");
                if (!StrUtil.isNull(appUnid)) {
                    audit.setAppunid(appUnid);
                    AppManager am = new AppManager();
                    App vistedApp = null;
                    try {
                        vistedApp = am.doFinByUnid(appUnid);
                    } catch (ManageException e) {
                        LOG.error(e.getMessage(), e);
                    }
                    audit.setAppname(vistedApp == null ? "" : vistedApp.getName());
                } else {
                    audit.setAppname(app.getName());
                    audit.setAppunid(app.getUnid());
                }

                audit.setClientip(request.getRemoteAddr());
                audit.setClientbrowser(ClientBrowserUtil.getClientExplorerType(request));
                audit.setRemark(operateDesc(request, response));
                AuditBusiness ab = new AuditBusiness();
                String suffix = uri.substring(uri.lastIndexOf(".") + 1).toLowerCase();
                if (!DEFAULT_IGNORE_SUFFIX.contains(suffix) && !StrUtil.isNull(audit.getRemark())) {//&& !StrUtil.isNull(audit.getRemark())
                    ab.doSave(audit);
                }
            }
        }
    }

    /**
     * 操作描述（看了什么、做了什么、拿了什么）
     * 
     * @param request
     * @param response
     * @param audit
     */
    private String operateDesc(HttpServletRequest request, AuditHttpServletResponseWrapper response) {
        String result = "";
        Enumeration pNames = request.getParameterNames();
        while (pNames.hasMoreElements()) {
            String name = (String) pNames.nextElement();
            String value = request.getParameter(name);
            try {
                value = URLDecoder.decode(URLDecoder.decode(value, CHARSET_ENCODING), CHARSET_ENCODING);
            } catch (UnsupportedEncodingException e) {
                LOG.error(e.getMessage(), e);
            }
            // 打开视图
            if ("dwAuditViewTitle".equalsIgnoreCase(name)) {
                result = "访问[ " + value + " ]视图";
                break;
            }
            // 打开表单
            if ("dwAuditFormTitle".equalsIgnoreCase(name)) {
                result = "打开[ " + value + " ]表单";
                break;
            }

        }
        for (Object obj : response.getHeader().entrySet()) {
            Entry entry = (Entry) obj;
            if ("content-disposition".equalsIgnoreCase((String) entry.getKey())) {
                String resource = (String) entry.getValue();
                resource = resource.substring(resource.indexOf("=") + 1, resource.length());
                try {
                    resource = URLDecoder.decode(URLDecoder.decode(resource, CHARSET_ENCODING), CHARSET_ENCODING);
                } catch (UnsupportedEncodingException e) {
                    LOG.error(e.getMessage(), e);
                }
                result = "下载[ " + resource + " ]资源";
                break;

            }
        }
        return result;
    }
}
