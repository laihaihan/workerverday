package com.linewell.core.excel;

import jxl.Range;

/**
 * Excel操作辅助类
 * @author lpeitu@linewell.com
 * @date 2010-05-11
 *
 */
public class ExcelUtil {

	/**
	 * 合并单元格站用多少行
	 * @param str
	 * @param range
	 * @return
	 */
	public static int numExits(String str, Range[] range) {
        int bottomRightRow = 0;
        int topLeftRow = 0;
        int rs = 0;
        String content;
        for (int i = 0; i < range.length; i++) {
            content = range[i].getTopLeft().getContents().trim();
            //System.out.println("合并单元格内容:"+content);
            if (content.equals(str)) {
                bottomRightRow = range[i].getBottomRight().getRow();
                //System.out.println("--A01:" + bottomRightRow);
                topLeftRow = range[i].getTopLeft().getRow();
                //System.out.println("--A02:" + topLeftRow);
                rs = bottomRightRow - topLeftRow;
                break;
            }
        }
        return rs;
    }
}
