package com.linewell.core.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;

import org.apache.log4j.Logger;

/**
 * <p>
 *    文件操作的工具类
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Nov 8, 2012
 * @version 1.0  
 */
public class FileUtil {
	
	private static Logger logger = Logger.getLogger(FileUtil.class);
	
	/**
	 * 取得指定目录下的所有文件
	 * 
	 * @param filePath
	 * @return
	 */
	public static File[] getListFiles(String filePath) {
		File file = new File(filePath);
		if (!file.isDirectory()) {
			return null;
		}
		
		return file.listFiles();
	}

	/**
	 * 取得指定目录下相应扩展名的文件
	 * 
	 * @param filePath
	 * @param fileExt
	 * @return
	 */
	public static File[] getListFiles(String filePath,final String fileExt) {
		File fileDir = new File(filePath);
		if (!fileDir.isDirectory()) {
			return null;
		}
		
		//使用适配器过筛选出符合要求的文件
		return fileDir.listFiles(new FilenameFilter() {
			public boolean accept(File dir, String name) {
                return new File(dir, name).isFile() && name.toLowerCase().endsWith(fileExt.toLowerCase());
            }
        });
	}

    /**
     * 判断文件是否存在
     * 
     * @param String filePath 文件绝对路径
     * @return boolean 
     */
    public static boolean isFileExist(String filePath) {
        File file = new File(filePath);
        return file.exists() && file.isFile();
    }
	
	/**
	 * 创建指定的文件夹目录
	 * 
	 * @param filePath
	 */
	public static void mkdirs(String filePath){
		File fileDir = new File(filePath);
		if(!fileDir.exists() || !fileDir.isDirectory()){
			fileDir.mkdirs();//创建文件夹
		}
	}

    /**
     * 读取文件的内容，结果是个字符串
     *
     * @param filePath 文件的地址
     */
    public static String fileToString(String filePath) {
        String result = "";
        FileReader fr = null;
        BufferedReader br = null;
        try {
            fr = new FileReader(filePath);
            br = new BufferedReader(fr);
            String Line = br.readLine();

            while (Line != null) {
                result += Line + "\n";
                Line = br.readLine();
            }
            br.close();
            fr.close();
        } catch (IOException e) {
        	logger.debug("读取文件内容失败，文件的地址为：[" + filePath + "]", e);
        } finally {
			try {
				if (fr != null) {
					fr.close();
					fr = null;
				}
				if (null != br) {
					br.close();
					br = null;
				}
			} catch (IOException e) {
			    logger.error(e);
			}
		}
        return result;
    }
	
	 /** 
     * 文本文件转换为指定编码的字符串 
     * 
     * @param file 文本文件 
     * @param encoding 编码类型 
     * @return 转换后的字符串 
     * @throws IOException 
     */ 
    public static String fileToString(File file, String encoding) {
    	String result = null;
		InputStreamReader reader = null;
		StringWriter writer = new StringWriter();
		try {
			if (encoding == null || "".equals(encoding.trim())) {
				reader = new InputStreamReader(new FileInputStream(file));
			} else {
				reader = new InputStreamReader(new FileInputStream(file), encoding);
			}
			
			//将输入流写入输出流 
			char[] buffer = new char[1024];
			int n = 0;
			while (-1 != (n = reader.read(buffer))) {
				writer.write(buffer, 0, n);
			}
			result = writer.toString();//返回转换结果 
		} catch (Exception e) {
		    logger.error(e);
			return null;
		} finally {
			try {
				if (null != reader){
					reader.close();
					reader = null;
				}
				if (null != writer){
					writer.close();
					writer = null;
				}
			} catch (IOException e) {
			    logger.error(e);
			}
		}
		return result;
	}

	/** 
	 * 将字符串写入指定文件(当指定的父路径中文件夹不存在时，会最大限度去创建，以保证保存成功！) 
	 * 
	 * @param res 原字符串 
	 * @param filePath 文件路径 
	 * @return 成功标记 
	 */
	public static boolean stringToFile(String res, String filePath) {
		boolean flag = true;
		BufferedReader reader = null;
		BufferedWriter writer = null;
		try {
			File distFile = new File(filePath);
			if (!distFile.getParentFile().exists()){
				distFile.getParentFile().mkdirs();
			}
			reader = new BufferedReader(new StringReader(res));
			writer = new BufferedWriter(new FileWriter(distFile));
			char buf[] = new char[1024]; //字符缓冲区 
			int len;
			while ((len = reader.read(buf)) != -1) {
				writer.write(buf, 0, len);
			}
			writer.flush();
		} catch (IOException e) {
		    logger.error(e);
			flag = false;
		} finally {
			try {
				if (null != reader) {
					reader.close();
					reader = null;
				}
				if (null != writer) {
					writer.close();
					writer = null;
				}
			} catch (IOException e) {
			    logger.error(e);
			}
		}
		return flag;
	} 
	
	 /**
     * 文件拷贝命令
     *
     * @param src  java.io.File 要拷贝的文件
     * @param dest java.io.File 拷贝到的文件
     */
    public static boolean copyFile(File src, File dest) {
    	InputStream in = InputStreamUtil.fileToInputStream(src);
    	boolean result = InputStreamUtil.inputStreamToFile(in, dest);
		try {
			if (null != in) {
				in.close();
				in = null;
			}
		} catch (IOException e) {
		    logger.error(e);
        	result = false;
		}
        return result;
    }

    /**
     * 重命名或是移动文件
     * 
     * @param String oldName 要移动或重命名的文件名及路径
     * @param String newName 目的文件文件名及路径
     */
    public static boolean renameFile(String oldName, String newName) {
    	//确定源文件存在，是一个文件，可读写
        File oldFile = new File(oldName);
        File newFile = new File(newName);
        try {
        	if (!oldFile.exists()) {
            	throw new FileNotFoundException("找不到指定的文件: [" + oldName + "] !");
            }
            if (!oldFile.isFile()) {
                throw new IOException("当前目录不是一个文件，不能重命名: [" + oldName + "] !");
            }
            if (!oldFile.canRead() || !oldFile.canWrite()) {
                throw new IOException("当前文件不可读写 :[" + oldName + "] !");
            }
            if (newFile.exists()) {
            	throw new IOException("目标文件已经存在，不能同名 :[" + newName + "] !");
            }
		} catch (Exception e) {
		    logger.error(e);
			return false;
		}
        return oldFile.renameTo(newFile);
    }
    
    
    /**
     *判断文件夹是否存在,如果不存在则创建文件夹
     * @param path 文件夹路径
     */
    public static void isExist(String path) {
    	File file = new File(path);
	    if (!file.exists()) {
	    	file.mkdir();
	    }
    }
   
    /**
     * <p>向文件中追加文本字符串</p>
     * @param filePath 文件路径
     * @param appendStr 追加的文本字符串
     * @return boolean 是否追加成功
     */
    public static boolean appendStringToFile(String filePath, String appendStr){
    	boolean flag = false;
    	FileWriter fw = null;
    	BufferedWriter bf = null;
    	try {
    		if (StrUtil.isNull(filePath)) {
				return false;
			}
    		if (StrUtil.isNull(appendStr)) {
				return false;
			}
    		File file = new File(filePath);
			if (!file.exists()) {
				return false;
			} else {
				fw =  new FileWriter(file, true);
				bf = new BufferedWriter(fw);
				bf.append(appendStr);  
				bf.flush(); 
				flag = true;
			}
		} catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
			return false;
		} finally {
			try {
				if (fw != null) {
					fw.close();
				}
				if (bf != null) {
					bf.close();
				}
			} catch (Exception e) {
				logger.error(e);
				return false;
			}
		}
		return flag;
    }
    
    /**
     * <p>替换文件中字符串</p>
     * @param filePath 文件路径
     * @param oldStr 文本中旧的字符串
     * @param newStr 文本中新的字符串
     * @return boolean 是否追加成功
     */
    public static boolean replaceFileString(String filePath, String oldStr, String newStr){
    	boolean flag = false;
    	FileOutputStream fos = null;
    	PrintWriter pw = null;
    	try {
    		if (StrUtil.isNull(filePath)) {
				return false;
			}
    		if (StrUtil.isNull(oldStr)) {
    			return false;
			}
    		File file = new File(filePath);
			if (!file.exists()) {
				return false;
			} else {
	            String fileString = fileToString(filePath);
	            if (!StrUtil.isNull(fileString)) {
	            	fileString = fileString.replace(oldStr, newStr);
	            	fos = new FileOutputStream(file);
	                pw = new PrintWriter(fos);
	                pw.write(fileString.toCharArray());
	                pw.flush();
	                flag = true;
				}
			}
		} catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
			return false;
		} finally {
			try {
				if (fos != null) {
					fos.close();
				}
				if (pw != null) {
					pw.close();
				}
			} catch (Exception e) {
				logger.error(e);
				return false;
			}
		}
    	return flag;
    }
}