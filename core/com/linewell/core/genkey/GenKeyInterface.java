package com.linewell.core.genkey;

/**
 * 序列号生成服务
 * @author JSC
 *
 */
public interface  GenKeyInterface  extends java.rmi.Remote{
	
	/**
	 * 生成序列号
	 * @param sysUnid 系统编号
	 * @param type  序列号类型
	 * @param pathZeroCount 序列号需要补0个数
	 * @return 系统自动生成的序列号
	 * @throws java.rmi.RemoteException
	 */
	public String genKey(String sysUnid,String type,int pathZeroCount)throws java.rmi.RemoteException;
}
