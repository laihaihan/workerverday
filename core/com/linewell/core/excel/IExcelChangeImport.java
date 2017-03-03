package com.linewell.core.excel;
/**
 * 类说明：Excel文件导入接口
 *
 * @author yq 
 * @date 2012-7-30
 * @version 1.0  
 */
public interface IExcelChangeImport {
	
	/**
	 * 解析Excel，将Excel表格数据转化为所需要的数据对象,记录更新记录和新增记录
	 * @param filePath
	 * @param params
	 * @return
	 */
	public Object parseExcelCh(String filePath, String[] params);
	
	/**
	 * 执行数据导入
	 * @param obj
	 * @return
	 */
	public boolean executeImportCh(Object obj);
}