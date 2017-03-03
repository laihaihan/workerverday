package com.linewell.core.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * <p>
 *    InputStream 操作帮助类
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Nov 8, 2012
 * @version 1.0  
 */
public class InputStreamUtil {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(InputStreamUtil.class); 
	
	final static int BUFFER_SIZE = 4096;

	/**
	 * 将InputStream转换成某种字符编码的String
	 * @param in
	 * @param encoding
	 * @return String
	 * @throws Exception
	 */
	public static String inputStreamToString(InputStream in, String encoding) throws Exception {
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		byte[] data = new byte[BUFFER_SIZE];
		int count = -1;
		while ((count = in.read(data, 0, BUFFER_SIZE)) != -1){
			outStream.write(data, 0, count);
		}
		data = null;
		
		encoding = StrUtil.isNull(encoding) ? "GBK" : encoding;
		return new String(outStream.toByteArray(), encoding);
	}

	/**
	 * 将String转换成InputStream
	 * @param in
	 * @return InputStream
	 * @throws UnsupportedEncodingException 
	 * @throws Exception
	 */
	public static InputStream stringToInputStream(String in,String encodeStr) throws UnsupportedEncodingException {
		ByteArrayInputStream is = new ByteArrayInputStream(in.getBytes(encodeStr));
		return is;
	}
	
	/**
	 * 将String转换成InputStream
	 * @param in
	 * @return InputStream
	 * @throws UnsupportedEncodingException 
	 * @throws Exception
	 */
	public static InputStream stringToInputStream(String in) throws UnsupportedEncodingException {
		ByteArrayInputStream is = new ByteArrayInputStream(in.getBytes("ISO-8859-1"));
		return is;
	}

	/**
	 * 将InputStream转换成byte数组
	 * @param in InputStream
	 * @return byte[]
	 * @throws IOException
	 */
	public static byte[] inputStreamToByte(InputStream in) throws IOException {
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		byte[] data = new byte[BUFFER_SIZE];
		int count = -1;
		while ((count = in.read(data, 0, BUFFER_SIZE)) != -1){
			outStream.write(data, 0, count);
		}
		return outStream.toByteArray();
	}

	/**
	 * 将byte数组转换成InputStream
	 * @param in
	 * @return InputStream
	 * @throws Exception
	 */
	public static InputStream byteToInputStream(byte[] in) throws Exception {
		ByteArrayInputStream is = new ByteArrayInputStream(in);
		return is;
	}

	/**
	 * 将文件转换成InputStream
	 * 
	 * @param file
	 * @throws Exception
	 */
	public static InputStream fileToInputStream(File file) {
		InputStream in = null;
		try {
			in = new FileInputStream(file);
		} catch (FileNotFoundException e) {
		    logger.error(e);
		}
		return in;
	}

    /**
     * 将数据流写入具体的文件里面
     * 
     * @param in InputStream数据流
     * @param file File 具体的文件操作
     * @return 操作成功返回true,操作失败返回false
     */
    public static boolean inputStreamToFile(InputStream in, File file) {
    	boolean result = true;
        FileOutputStream out = null;
        try {
            out = new FileOutputStream(file);
            final int bufferSize = 1000;
            byte[] buffer = new byte[bufferSize];
            int readCount = 0;
            while ((readCount = in.read(buffer)) != -1) {
            	out.write(buffer, 0, readCount);
            }
        } catch(Exception e){
            logger.error(e);
        	result = false;
        } finally {
			try {
				if (null != out) {
					out.close();
					out = null;
				}
			} catch (IOException e) {
			    logger.error(e);
	        	result = false;
			}
		}
        return result;
    }
}