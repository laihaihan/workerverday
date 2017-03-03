package com.linewell.core.excel;
/**
 * 类说明：Excel文件导入接口
 *
 * @author qcongyong 
 * @date 2011-9-6
 * @version 1.0  
 */
public interface IExcelImport {
	/**
	 * 解析Excel，将Excel表格数据转化为所需要的数据对象
	 * @param filePath
	 * @param params
	 * @return
	 */
	public Object parseExcel(String filePath, String[] params);
	
	/**
	 * 执行数据导入
	 * @param obj
	 * @return
	 */
	public boolean executeImport(Object obj);
}