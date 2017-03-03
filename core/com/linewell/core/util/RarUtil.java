package com.linewell.core.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;



public class RarUtil { 
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(RarUtil.class); 
	/*  
	 * cmd 压缩与解压缩命令  
	 */


	/**  
	 * 将1个文件压缩成RAR格式  
	 * rarName 压缩后的压缩文件名(不包含后缀)  
	 * fileName 需要压缩的文件名(必须包含路径)  
	 * destDir 压缩后的压缩文件存放路径  
	 */
	public static void RARFile(String rarName, String fileName, String destDir) {

		String rarCmd = "C:\\Program Files\\WinRAR\\Rar.exe a ";
		String unrarCmd = "C:\\Program Files\\WinRAR\\UnRar x ";
		rarCmd += destDir + rarName + ".rar " + fileName;
		try {
			Runtime rt = Runtime.getRuntime();
			Process p = rt.exec(rarCmd);
		} catch (Exception e) {
		    logger.error(e);
			//System.out.println(e.getMessage());
		}
	}

	/**  
	 * 将1个RAR文件解压  
	 * rarFileName 需要解压的RAR文件(必须包含路径信息以及后缀)  
	 * destDir 解压后的文件放置目录  
	 */
	public static void unRARFile(String rarFileName, String destDir) {

		String rarCmd = "C:\\Program Files\\WinRAR\\Rar.exe a ";
		String unrarCmd = "C:\\Program Files\\WinRAR\\UnRar x ";
		
		unrarCmd += rarFileName + " " + destDir;
		try {
			Runtime rt = Runtime.getRuntime();
			Process p = rt.exec(unrarCmd);
			InputStreamReader isr = new InputStreamReader(p.getInputStream());
			BufferedReader bf = new BufferedReader(isr);
			String line = null;
			while ((line = bf.readLine()) != null) {
				line = line.trim();
				if ("".equals(line)) {
					continue;
				}
				System.out.println(line);
			}
			bf.close();


		} catch (Exception e) {
		    logger.error(e);
			System.out.println(e.getMessage());
		}
	}

	public static void main(String[] args) {
		String absPath = "D://workspace//hzapas//webapp//ftpfile//021000//B-M00200101917//2011-06-05074109//zipfile//20110531_0917.rar";
		// 文件绝对目录
		String toPath = "D://workspace//hzapas//webapp//ftpfile//021000//B-M00200101917//2011-06-05074109//file";
		// 文件目录
		 RarUtil.unRARFile(absPath, toPath);
		//System.out.println("flag ---" + flag);
	}
}
