package com.linewell.core.system;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.dispatcher.FilterDispatcher;

/**
 * <p>
 *    自定义的struts2过滤器
 *    	这个类用来解决struts2和文章编辑器(eWebEditor)冲突造成无法上传图片或文件的问题，
 * 		原因是当页面请求中包含附件的时候，struts2会把request给封装成MultiPartRequestWrapper，从而导致eWebEditor上传附件不好使。
 * 		用这个类替换掉web.xml中的struts过滤器类FilterDispatcher就可以了。
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Jun 5, 2012
 * @version 1.0  
 */
public class ExtendStrutsFilter extends FilterDispatcher {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res,FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        if (request.getRequestURI().indexOf("/eWebEditor/jsp/upload.jsp") > -1) {
            chain.doFilter(req, res);//如果是eWebEditor上传附件请求，则使用自定义的过滤器
        }
        else
    	if (request.getRequestURI().indexOf("/ADMIN/uploadJsp/processExcel.jsp") > -1) {
            chain.doFilter(req, res);//add by zwenyu 20120731如果是平台的快速建模在导入数据表时上传附件请求，则使用自定义的过滤器
        }
        else{
            super.doFilter(req, res, chain);//其他请求，则使用默认的过滤器
        }
    }
}

