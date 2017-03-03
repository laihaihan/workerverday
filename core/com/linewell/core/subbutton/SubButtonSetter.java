package com.linewell.core.subbutton;

import javax.servlet.http.HttpServletRequest;

import com.linewell.core.util.NumberUtil;

/**
 * <p>
 * SubButton 表单数据对象构造器
 * </p>
 * 
 * @author:zjianhui email:zjianhui@linewell.com
 * @version 1.0.0 2012-02-09 16:56:56
 *
 */
public class SubButtonSetter {
	/**
	 * 功能：提取web表单请求构造数据对象 - <SubButton>
	 * 
	 * @param request
	 * @return
	 */
	public SubButton getSubButton(HttpServletRequest request) {
		String sub_sort = request.getParameter("sub_sort");
		String sub_img = request.getParameter("sub_img");
		String sub_unid = request.getParameter("sub_unid");
		String button_unid = request.getParameter("button_unid");
		String sub_name = request.getParameter("sub_name");
		String sub_belongto = request.getParameter("sub_belongto");

		SubButton subButton = new SubButton();
		subButton.setSub_sort(NumberUtil.parseLong(sub_sort));
		subButton.setSub_img(sub_img);
		subButton.setSub_unid(sub_unid);
		subButton.setButton_unid(button_unid);
		subButton.setSub_name(sub_name);
		subButton.setSub_belongto(sub_belongto);

		return subButton;
	}
}
