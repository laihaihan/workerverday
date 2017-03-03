package com.linewell.core.excel;

import jxl.Workbook;

/**
 * 类说明：Excel文件比对功能接口
 *
 * @author yq
 * @date 2012-7-31
 * @version 1.0  
 */
public interface IExcelCheck {
	/**
	 * 解析Excel，将Excel表格数据转化为所需要的数据对象
	 * @param rwb
	 * @param params
	 * @return
	 */
	public Object parseExcel(Workbook rwb, String[] params);
	
}