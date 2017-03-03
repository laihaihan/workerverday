package com.linewell.core.excel;

import java.io.File;
import java.io.IOException;

import jxl.Workbook;
import jxl.format.Alignment;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.format.Colour;
import jxl.format.UnderlineStyle;
import jxl.format.VerticalAlignment;
import jxl.read.biff.BiffException;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;



/**
 * ---------------------------------------------<br>
 * excel的操作类<br>
 * <br>
 * Version: 1.0<br>
 * Author: yqi@linewell.com.cn <br>
 * DateTime: 2012-07-30 上午09:12:05<br>
 * ---------------------------------------------<br>
 * 修改版本历史<br>
 * *********************************************<br>
 * Author：<br>
 * DateTime：<br>
 * 内容：<br>
 * *********************************************<br>
 */

public class ExcelOperator {

    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(ExcelOperator.class);
   

    /**
     * 创建只读的Excel工作薄的对象
     * @param templateName
     * @return
     */
    public static Workbook getWorkbook(String templateName){
    	 Workbook wb = null;
         try {
             wb = Workbook.getWorkbook(new File(templateName));
         } catch (IOException e) {
             logger.error("找不到excel的模板，模板" + "名称为[" + templateName + "]" + "文件夹名称为[" + templateName+ "]");
             logger.error("异常的原始代码为：" + e.toString());
         } catch (BiffException e) {
             logger.error("读取excel文件出现异常，异常代码为" + e.toString());
         }
         return wb;
    }
    
    
	/**
	 * 创建可写入的Excel工作薄对象
	 * @param templateName
	 * @param genFilename
	 * @param wb
	 * @return
	 */
    public static WritableWorkbook createWorkbook(String templateName,String genFilename,Workbook wb){
       WritableWorkbook wwb = null;
       
       try {
           wwb = Workbook.createWorkbook(new File(genFilename), wb);
       } catch (Exception e) {
           logger.error("由excel模板生成新的excel文件出现异常，" + "模板名称为[" + templateName + "]" + "文件夹名称为["+ templateName + "]");
           logger.error("异常原始代码为：" + e.toString());
       }
       return wwb;
   }
  
    /**
     * 根据输入的二维数组，产生新的excel表格 在结果集合中，如果是单元格是数字类型，并且是-1的话，表示转失败
     * @param rs 要进行数据填充的结果集合, 注意：rs的数据是从0行开始的
     * @param startRow 开始的行数
     * @param startCol 开始的列数
     * @param wwb  可写入的Excel工作薄对象
     */
    public static boolean writeExcel(String[][] rs,int startRow, int startCol,WritableWorkbook wwb,int SheetNum) {
    	// 根据SheetNum 读取第几张工作表
        WritableSheet ws = wwb.getSheet(SheetNum);
        // 对单元格进行写入
        for (int i = 1; i < rs.length; i++) {
            for (int j = 0; j < rs[i].length; j++) {
                // 加入排序号
                if (j == 0) {
                    Label label = new Label(0, startRow + i - 1, String.valueOf(i),ExcelOperator.normalFormat());
                    try {
                        ws.addCell(label);
                    } catch (Exception e) {
                        logger.error(e.toString());
                    }
                }
                // 数字也当作字符加入到工作表中
                try {
                    Label label = new Label(startCol + j, startRow + i - 1, rs[i][j],ExcelOperator.normalFormat());
                    ws.addCell(label);
                    if(i == 1){
                        ws.setColumnView(1 , 20);
                        ws.setColumnView(2 , 30);
                     }
                } catch (WriteException e) {
                    logger.error("写入单元格发生错误" + "单元格 行号[" + startRow + i + "]" + "列号[" + startCol + j+ "]");
                    logger.error("单元格数值为[" + rs[i][j] + "]");
                    logger.error("原始的异常代码为：" + e.toString());
                    return false;
                }
            }
        }
        return true;
    }
    
    
    /**
     * 根据输入的二维数组，产生新的excel表格 在结果集合中，如果是单元格是数字类型，并且是-1的话，表示转失败  比对使用
     * @param rs 要进行数据填充的结果集合, 注意：rs的数据是从0行开始的
     * @param startRow 开始的行数
     * @param startCol 开始的列数
     * @param wwb  可写入的Excel工作薄对象
     */
    public static boolean writeExcel2(String[][] rs,int startRow, int startCol,WritableWorkbook wwb,int SheetNum,int flagCol) {
    	// 根据SheetNum 读取第几张工作表
        WritableSheet ws = wwb.getSheet(SheetNum);
        String last_content = "";
        WritableCellFormat format = ExcelOperator.normalFormat();
        // 对单元格进行写入
        for (int i = 1; i < rs.length; i++) {
        	//指定的列等于上一次记录的指定列
        	if(last_content.equals(rs[i][flagCol])){
        		format = ExcelOperator.redFormat();
        	}else{
        		format = ExcelOperator.normalFormat();
        	}
        	last_content = rs[i][flagCol];
            for (int j = 0; j < rs[i].length; j++) {
                // 加入排序号
                if (j == 0) {
                    Label label = new Label(0, startRow + i - 1, String.valueOf(i),format);
                    try {
                        ws.addCell(label);
                    } catch (Exception e) {
                        logger.error(e);
                    }
                }
                // 数字也当作字符加入到工作表中
                try {
                	
                    Label label = new Label(startCol + j, startRow + i - 1, rs[i][j],format);
                    ws.addCell(label);
                } catch (WriteException e) {
                    logger.debug("写入单元格发生错误" + "单元格 行号[" + startRow + i + "]" + "列号[" + startCol + j+ "]");
                    logger.debug("单元格数值为[" + rs[i][j] + "]");
                    logger.debug("原始的异常代码为：" + e.toString());
                    logger.error(e);
                    return false;
                }
            }
        }
        return true;
    }
    
    
    
  
    /**
     * 生成Excel
     * @param wb
     * @param wwb
     * @return
     */
    public static boolean genExcel( Workbook wb,WritableWorkbook wwb) {
    	 // 保存工作簿
        try {
            wwb.write();
        } catch (IOException e) {
            logger.debug("WritableWorkbook 写入错误");
            logger.debug("原始的异常代码为" + e.toString());
            logger.error(e);
            return false;
        }

        // 关闭写入工作簿
        try {
            wwb.close();
        } catch (IOException e) {
            logger.debug("WritableWorkbook 关闭发生IO错误");
            logger.debug("原始的异常代码为：" + e.toString());
            logger.error(e);
            return false;
        } catch (WriteException e) {
            logger.debug("WritableWorkbook 关闭发生IO错误");
            logger.debug("原始的异常代码为：" + e.toString());
            logger.error(e);
            return false;
        }
        wb.close();
        return true;
    }
    
    /**
     * 正文字样式 
     * @return
     */
    public static WritableCellFormat normalFormat(){
    	 // 正文字样式  
        WritableCellFormat normalFormat = new WritableCellFormat();     
        try {
			normalFormat.setBorder(Border.ALL, BorderLineStyle.THIN);
			normalFormat.setAlignment(Alignment.CENTRE);  
		    normalFormat.setVerticalAlignment(VerticalAlignment.CENTRE);
		} catch (Exception e) {
		    logger.debug(e.toString());
		    logger.error(e);
		}  
        return normalFormat;
    }
    
    /**
     * 变更说明正文字样式 
     * @return
     */
    public static WritableCellFormat redFormat(){
    	WritableFont wfc = new WritableFont(WritableFont.ARIAL,10,WritableFont.NO_BOLD,false,UnderlineStyle.NO_UNDERLINE,Colour.RED); 
    	 // 正文字样式  
        WritableCellFormat normalFormat = new WritableCellFormat(wfc);     
        try {
			normalFormat.setBorder(Border.ALL, BorderLineStyle.THIN);
			normalFormat.setAlignment(Alignment.CENTRE);  
		    normalFormat.setVerticalAlignment(VerticalAlignment.CENTRE);
		} catch (Exception e) {
		    logger.debug(e.toString());
		    logger.error(e);
		}  
        return normalFormat;
    }
    
    /**
     * 变更说明-正文字样式 
     * @return
     */
    public static WritableCellFormat changeFormat(){
    	WritableFont wfc = new WritableFont(WritableFont.ARIAL,10,WritableFont.NO_BOLD,false,UnderlineStyle.NO_UNDERLINE,Colour.BLACK); 
    	 // 正文字样式  
        WritableCellFormat normalFormat = new WritableCellFormat(wfc);     
        try {
			normalFormat.setBorder(Border.ALL, BorderLineStyle.THIN);
			normalFormat.setAlignment(Alignment.LEFT);  
			normalFormat.setWrap(true);
		    normalFormat.setVerticalAlignment(VerticalAlignment.CENTRE);
		} catch (Exception e) {
		    logger.debug(e.toString());
		    logger.error(e);
		}  
        return normalFormat;
    }
    
    /**
     * 变更说明-标题样式 
     * @return
     */
    public static WritableCellFormat changeTitleFormat(){
    	WritableFont wfc = new WritableFont(WritableFont.ARIAL,10,WritableFont.NO_BOLD,false,UnderlineStyle.NO_UNDERLINE,Colour.BLACK); 
        WritableCellFormat normalFormat = new WritableCellFormat(wfc);     
        try {
			normalFormat.setBorder(Border.ALL, BorderLineStyle.THIN);
			normalFormat.setBorder(Border.TOP, BorderLineStyle.MEDIUM);
			normalFormat.setAlignment(Alignment.CENTRE);  
			normalFormat.setWrap(true);
		    normalFormat.setVerticalAlignment(VerticalAlignment.CENTRE);
		} catch (Exception e) {
		    logger.debug(e.toString());
		    logger.error(e);
		}  
        return normalFormat;
    }
    
}
