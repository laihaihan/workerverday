package com.linewell.core.util;

import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.sql.Clob;
import java.sql.SQLException;

import javax.sql.rowset.serial.SerialClob;
import javax.sql.rowset.serial.SerialException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Clob类型辅助工具类
 * @author zjianhui@linewell.com
 *
 */
public class ClobUtil {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(ClobUtil.class);
	/**
	 * Clob转成字符串
	 * @param clob java.sql.Clob
	 * @return String
	 */
	public static String clobToStr(Clob clob) {
		if (clob == null) {
			return null;
		}
		try {
			Reader inStreamDoc = clob.getCharacterStream();
			char[] tempDoc = new char[(int) clob.length()];
			inStreamDoc.read(tempDoc);
			inStreamDoc.close();
			return new String(tempDoc);
		} catch (IOException e) {
		    logger.error(e);
		} catch (SQLException es) {
		    logger.error(es);
		}

		return null;
	}
	
	/**
	 * 字符串转成Clob
	 * 
	 * @param str
	 *            String
	 * @return Clob
	 */
	public static Clob StrToClob(String str) {
		Clob clob = null;
		if(!StrUtil.isNull(str)){
			try {
				clob = new SerialClob(str.toCharArray());
			} catch (SerialException e) {
			    logger.error(e);
			} catch (SQLException e) {
			    logger.error(e);
			}
		}
		return clob;
	}

	/**
	 * 文件转clob
	 * @param file
	 * @return Clob
	 */
	public static Clob fileToClob(File file) {
		String str = FileUtil.fileToString(file, "utf-8");
		Clob clob = StrToClob(str);
		return clob;
	}
}