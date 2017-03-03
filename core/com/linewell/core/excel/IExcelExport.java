package com.linewell.core.excel;

import java.util.Map;

/**
 * 类说明：Excel文件导出接口
 *
 * @author yq
 * @date 2012-7-28
 * @version 1.0  
 */
public interface IExcelExport {
	/**
	 * 获取到导出Excel的sheet数据
	 * @param map
	 * @return
	 */
	 public String[][] getSheetInfo(Map<String,String> map)throws Exception;
}