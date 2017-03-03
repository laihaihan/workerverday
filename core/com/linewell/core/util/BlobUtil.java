package com.linewell.core.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import oracle.sql.BLOB;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import net.sf.hibernate.Hibernate;
import com.linewell.core.db.JdbcFactory; 
import com.linewell.core.db.JdbcSession;

/**
 * Blob类型辅助工具类
 * @author zjianhui@linewell.com
 *
 */
public class BlobUtil {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(BlobUtil.class);
	/**
	 * file 对象转换成blob
	 * @param file
	 * @return Blob
	 */
	public static Blob StringToBlob(String str,String encodeStr) {
		try {
			InputStream is;
			is = InputStreamUtil.stringToInputStream(str,encodeStr);		
			Blob blob = Hibernate.createBlob(is);
			return blob;
		} catch (FileNotFoundException e) {
		    logger.error(e);
		}	catch (IOException e) {
		    logger.error(e);
		}
		return null;
	}
	
	/**
	 * file 对象转换成blob
	 * @param file
	 * @return Blob
	 */
	public static Blob fileToBlob(File file) {
		try {
			InputStream is = new FileInputStream(file);
			Blob blob = Hibernate.createBlob(is);
			return blob;
		} catch (FileNotFoundException e) {
		    logger.error(e);
		}	catch (IOException e) {
		    logger.error(e);
		}
		return null;
	}

	/**
	 * blob转string
	 * @param blob
	 * @return
	 */
	public static String blobToString(Blob blob) {
		String str = "";
		try {    
			InputStream ins = blob.getBinaryStream();
			byte[] c = new byte[(int) blob.length()];
			ins.read(c);
			str = new String(c);
		    ins.close();
		} catch (SQLException e) {
		    logger.error(e);
		} catch (IOException e) {
		    logger.error(e);
		}
		return str;
	}
	
	/**
	 * 把Blob类型转换为byte数组类型
	 * 
	 * @param blob
	 * @return
	 */
	public static byte[] blobToBytes(Blob blob) {
		byte[] bytes = null;
		BufferedInputStream is = null;
		try {
			is = new BufferedInputStream(blob.getBinaryStream());
			bytes = new byte[(int) blob.length()];
			is.read(bytes, 0, bytes.length);
		} catch (Exception e) {
		    logger.error(e);
		} finally {
			try {
				is.close();
				is = null;
			} catch (IOException e) {
			    logger.error(e);
			}
		}
		return bytes;
	} 
	
	/**
	 * 更新blob字段
	 * 
	 * @param jndiName		连接池名称
	 * @param tableName		表名
	 * @param columnName	字段名
	 * @param condition		查询条件
	 * @param destBlob		要更新的blob字段的值
	 * @return 操作是否成功 
	 */
	public static boolean updateBlobColumn(String jndiName,String tableName,String columnName,String condition,Blob destBlob){
		JdbcSession jdbc = JdbcFactory.getSession(jndiName);
		Connection conn = jdbc.getConnection();
		BufferedOutputStream out  = null;
		PreparedStatement pst = null;
		try {
			//往blob字段中插入空值
			String sql = "update "+tableName+" set "+columnName+"=empty_blob() where " + condition;
			Statement st = conn.createStatement();
			st.executeUpdate(sql);
			
				conn.commit();
		

		    //取出要更新的内容
			sql = "select "+columnName+" from "+tableName+" where " + condition + " for update";
			ResultSet rs = st.executeQuery(sql);
			BLOB blob = rs.next() ? (BLOB)rs.getBlob(1) : null;

	        //向此blob字段中写入数据
			sql = "update "+tableName+" set "+columnName+"=? where " + condition;
			pst = conn.prepareStatement(sql);
			out = new BufferedOutputStream(blob.getBinaryOutputStream());
			byte[] byteArray = blobToBytes(destBlob);
			 //将byte[]写入blob字段
			out.flush();
			pst.setBlob(1, blob); 
			pst.executeUpdate(); 
			
	        conn.commit(); 
		} catch (SQLException e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}catch (IOException e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}finally{
			try {
				if(null != pst){
					pst.close();
				}
				if(null != out){
					out.close();
				}
				if(null != conn){
					conn.close();
				}
				
			} catch (SQLException e) {
				e.printStackTrace();
				logger.error(e.getMessage());
			} catch (IOException e) {
				e.printStackTrace();
				logger.error(e.getMessage());
			}
		}
		
        return true;
	}
}