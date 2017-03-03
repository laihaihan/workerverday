package com.linewell.core.genkey.imp;

import java.rmi.RemoteException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types; 
import javax.naming.NamingException;

import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCWrapper;
import com.linewell.core.genkey.GenKeyInterface;
import com.linewell.core.system.GlobalParameter;

public class GenKeyInterfaceImp implements GenKeyInterface{
    private static final Logger logger = Logger.getLogger(GenKeyInterfaceImp.class);
	/**
	 * 生成序列号
	 * @param sysUnid 系统编号
	 * @param type  序列号类型
	 * @param pathZeroCount 序列号需要补0个数
	 * @return 系统自动生成的序列号
	 * @throws java.rmi.RemoteException
	 */
	@Override
	public synchronized String genKey(String sysUnid, String type, int pathZeroCount)
			throws RemoteException {
		try {
			JDBCWrapper  jDBCWrapper = new JDBCWrapper(GlobalParameter.APP_CORE);
			Connection conn = jDBCWrapper.getConnection();
			CallableStatement proc = null;
		    proc = conn.prepareCall("{ call P_GEN_KEY(?,?,?,?) }");
		    proc.setString(2, type);
		    proc.setString(3, sysUnid);
		    proc.setString(4, String.valueOf(pathZeroCount));
		    proc.registerOutParameter(1, Types.VARCHAR);
		    proc.execute();
		    String reStr = proc.getString(1);
		    return reStr;
		} catch (NamingException e) {
		    logger.error(e.getStackTrace());
		} catch (SQLException e) {
		    logger.error(e.getStackTrace());
		}
		return null;
	}

}
