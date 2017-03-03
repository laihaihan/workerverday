package com.linewell.core.filter;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

/**
 * @Copyright :(C),2012
 * @CompanyName :南威软件股份有限公司(www.linewell.com)
 * @Version :1.0
 * @Date :Sep 24, 2013
 * @author : 文件创建者姓名：李竞雄 ljingxiong@linewell.com
 * @Description :
 */
public class AuditHttpServletResponseWrapper extends HttpServletResponseWrapper {

    private Map<String, String> headers = new HashMap<String, String>();

    public AuditHttpServletResponseWrapper(HttpServletResponse response) {
        super(response);
    }

    public void setHeader(String name, String value) {
        super.setHeader(name, value);
        headers.put(name, value);
    }

    public void addHeader(String name, String value) {
        super.setHeader(name, value);
        headers.put(name, value);
    }

    public Map<String, String> getHeader() {
        return headers;
    }

}
