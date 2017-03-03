package com.linewell.core.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 
 * <p>
 * 解压缩工具
 * </p>
 * 
 * @author cyingquan@linewell.com
 * @version 1.00 2012 4 9
 *          <p>
 *          Copyright (c) 2012 www.linewell.com
 *          </p>
 */
public class CompressUtil {
	/**
	 * Logger for this class
	 */
	private static final Log logger = LogFactory.getLog(CompressUtil.class);

	private static void createDirectory(String directory, String subDirectory) {
		String dir[];
		File fl = new File(directory);
		try {
			// 如果解压文件基本目录结构不存在,新建
			if (subDirectory == "" && fl.exists() != true) {
				// System.out.println("*******创建基本目录结构*******"+directory);
				fl.mkdirs();
			}
			// 主要创建子目录
			else if (subDirectory != "") {
				dir = subDirectory.replace('\\', '/').split("/");
				for (int i = 0; i < dir.length; i++) {
					File subFile = new File(directory + File.separator + dir[i]);
					if (subFile.exists() == false) {
						// System.out.println("*******创建子目录*******"+directory +
						// File.separator + dir[i]);
						subFile.mkdirs();
					}
					directory += File.separator + dir[i];
				}
			}
		} catch (Exception ex) {
			logger.error(ex);
		}
	}

	/**
	 * 解压zip
	 * @param zipFileName zip文件全路径名
	 * @param outputDirectory 解压路径
	 * @throws Exception
	 */
	public static void unZip(String zipFileName, String outputDirectory)
			throws Exception {
		try {
			org.apache.tools.zip.ZipFile zipFile = new org.apache.tools.zip.ZipFile(
					zipFileName);
			java.util.Enumeration e = zipFile.getEntries();
			org.apache.tools.zip.ZipEntry zipEntry = null;
			createDirectory(outputDirectory, "");
			while (e.hasMoreElements()) {
				zipEntry = (org.apache.tools.zip.ZipEntry) e.nextElement();
				logger.info("========== 解压 ========== " + zipEntry.getName());
				// 判断是否为一个文件夹
				if (zipEntry.isDirectory()) {
					String name = zipEntry.getName().trim();
					// 因为后面带有一个/,所有要去掉
					name = name.substring(0, name.length() - 1);
					File f = new File(outputDirectory + File.separator + name);
					if (!f.exists()) {
						f.mkdirs();
					}
					// System.out.println("*******创建根目录*******" +
					// outputDirectory + File.separator + name);
				} else {
					String fileName = zipEntry.getName();
					fileName = fileName.replace('\\', '/');

					// 判断子文件是否带有目录,有创建,没有写文件
					if (fileName.indexOf("/") != -1) {
						createDirectory(outputDirectory, fileName.substring(0,
								fileName.lastIndexOf("/")));
						fileName = fileName
								.substring(fileName.lastIndexOf("/") + 1);
					}

					File f = new File(outputDirectory + File.separator
							+ zipEntry.getName());
					f.createNewFile();
					InputStream in = zipFile.getInputStream(zipEntry);
					FileOutputStream out = new FileOutputStream(f);

					byte[] by = new byte[1024];
					int c;
					while ((c = in.read(by)) != -1) {
						out.write(by, 0, c);
					}
					in.close();
					out.close();

				}
			}
		} catch (Exception ex) {
			logger.error(ex);
		}
		logger.info("^^^^^^^^^^ 解压完成 ^^^^^^^^^^");
	}
	
	
	/**
	 * ZipOutputStream取得
	 * 
	 * @param arg0 FILELIST
	 * @param stream OutputStream
	 * @param rootPath FILEROOT
	 * @throws Exception ERROR
	 * @author bill http://our-myall.blog.sohu.com/
	 */
	public static void makeZipOutStream(String[] arg0,
			java.io.OutputStream stream, String rootPath) throws Exception {
		byte block[] = new byte[8192];
		rootPath += File.separator;
		int rootPathLen = rootPath.length();
		java.util.zip.ZipOutputStream outputStream;
		outputStream = new java.util.zip.ZipOutputStream(stream);
		String[] fileList = getAbsoluteFilePath(arg0);
		for (int i = 0; i < fileList.length; i++) {			
			java.io.File currentFile = new java.io.File(fileList[i]);
			java.io.InputStream in = new java.io.FileInputStream(currentFile);
			String strTemp = currentFile.getPath();
			strTemp = strTemp.substring(rootPathLen);
			java.util.zip.ZipEntry zEntry = new java.util.zip.ZipEntry(strTemp);
			outputStream.putNextEntry(zEntry);
			int len = 0;
			while ((len = in.read(block)) != -1) {
				outputStream.write(block, 0, len);
			}
			outputStream.closeEntry();
		}
		outputStream.close();
	}
	
	private static String[] getAbsoluteFilePath(String[] arg0){
		for (int i = 0; i < arg0.length; i++) {
			File file = new File(arg0[i]);
			arg0[i] = file.getAbsolutePath();
		}
		return arg0;
	}
	

}