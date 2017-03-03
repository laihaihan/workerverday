package com.linewell.core.form.design;

import javax.servlet.http.HttpServletRequest;
import com.linewell.core.util.NumberUtil;

/**
 * <p>
 * FormDesign 表单数据对象构造器
 * </p>
 * 
 * @author: email:zjianhui@linewell.com
 * @version 1.0.0 2012-02-14 17:05:28
 *
 */
public class FormDesignSetter {
	/**
	 * 功能：提取web表单请求构造数据对象 - <FormDesign>
	 * 
	 * @param request
	 * @return
	 */
	public FormDesign getFormDesign(HttpServletRequest request){
						String  unid = request.getParameter("unid");
				String  punid = request.getParameter("punid");
				String  columnname = request.getParameter("columnname");
				String  columntype = request.getParameter("columntype");
				String  defaulvalue = request.getParameter("defaulvalue");
				String  verifymodule = request.getParameter("verifymodule");
		    	
    	FormDesign formDesign = new FormDesign();
								formDesign.setUnid(unid);
								formDesign.setPunid(punid);
								formDesign.setColumnname(columnname);
								formDesign.setColumntype(columntype);
								formDesign.setDefaulvalue(defaulvalue);
								formDesign.setVerifymodule(verifymodule);
						
		return formDesign;
	}
}
