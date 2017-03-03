package com.linewell.core.util;
import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

/**
 * ip地址工具类
 * @author Administrator
 *
 */
public class IpUtil {
	private static Logger log = Logger.getLogger(IpUtil.class);
	public static final long a1 = getIpNum("10.0.0.0");
	public static final long a2 = getIpNum("10.255.255.255");
	public static final long b1 = getIpNum("172.16.0.0");
	public static final long b2 = getIpNum("172.31.255.255");
	public static final long c1 = getIpNum("192.168.0.0");
	public static final long c2 = getIpNum("192.168.255.255");
	public static final long d1 = getIpNum("10.44.0.0");
	public static final long d2 = getIpNum("10.69.0.255");

	public static boolean isInnerIP(String ip) {
		long n = getIpNum(ip);
		return (n >= a1 && n <= a2) || (n >= b1 && n <= b2)
				|| (n >= c1 && n <= c2) || (n >= d1 && n <= d2);
	}

	private static long getIpNum(String ipAddress) {
		String[] ip = ipAddress.split("\\.");
		long a = Integer.parseInt(ip[0]);
		long b = Integer.parseInt(ip[1]);
		long c = Integer.parseInt(ip[2]);
		long d = Integer.parseInt(ip[3]);
		return a * 256 * 256 * 256 + b * 256 * 256 + c * 256 + d;
	}

	public static void go(String ip) {
		//String ip=(String)getIpAddr(request);
		System.out.println(ip
				+ " "
				+ ("127.0.0.1".equals(ip)
						? "本机"
						: (isInnerIP(ip) ? "内网" : "外网")));
	}
	/**
	 * 获取客户端的地址
	 * @param request
	 * @return
	 */
	public static String getIpAddr(HttpServletRequest request) {
		String ipAddress = null;
		//ipAddress = this.getRequest().getRemoteAddr();   
		ipAddress = request.getHeader("x-forwarded-for");
		if (ipAddress == null || ipAddress.length() == 0
				|| "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("Proxy-Client-IP");
		}
		if (ipAddress == null || ipAddress.length() == 0
				|| "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ipAddress == null || ipAddress.length() == 0
				|| "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getRemoteAddr();
			if (ipAddress.equals("127.0.0.1")) {
				//根据网卡取本机配置的IP   
				InetAddress inet = null;
				try {
					inet = InetAddress.getLocalHost();
				} catch (UnknownHostException e) {
				    log.error(e);
				}
				ipAddress = inet.getHostAddress();
			}

		}

		//对于通过多个代理的情况，第一个IP为客户端真实IP,多个IP按照','分割   
		if (ipAddress != null && ipAddress.length() > 15) { //"***.***.***.***".length() = 15   
			if (ipAddress.indexOf(",") > 0) {
				ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
			}
		}
		return ipAddress;
	}
	/**
	 * 根据客户端的ip地址和系统配置的内网地址判断是否该访问ip是否是内网
	 * @param ipAddr
	 * @param innerIp
	 * @return
	 */
	public static boolean isInnerIp(String ipAddr,String inDict){
		if(StrUtil.isNull(inDict))return false;
		if("127.0.0.1".equals(ipAddr)||"0:0:0:0:0:0:0:1".equals(ipAddr)){
			return true;
		}
		String []dicts =inDict.split(",");
		for(int i=0;i<dicts.length;i++){
			if(ipAddr.indexOf(dicts[i])>-1){
				return true;
			}
		}
		return false;
		
	}
	public static String getLocalIP() {
		InetAddress[] mArLocalIP = null;
		if (mArLocalIP == null) {
			try {
				mArLocalIP = InetAddress.getAllByName(InetAddress
						.getLocalHost().getHostName());
			} catch (Exception e) {
			    log.error("getHostIP     error ",e);
				System.out.println("getHostIP     error ");
			}
		}
		return mArLocalIP[0].getHostAddress();

	}
	
	public static void main(String[] args) {
		String ipAddr ="10.1.6.24";
		String inDict="192.168"; 
		isInnerIp(ipAddr,inDict);
	}


}
