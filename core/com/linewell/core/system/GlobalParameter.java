package com.linewell.core.system;

/**
 * 常用常量定义
 * 
 * @author qcongyong
 * @date 2012-01-13
 * @version 1.0
 *
 */
public class GlobalParameter {
	/**
	 * 应用系统
	 */	
	public final static String APP_CORE = "3E2592D5DD95DA5C339C0935F7E9DAA8";		//核心平台
	public final static String APP_UCAP = "proxool";
	
	/**
	 * 流程状态
	 */
	public static final int FLOWSTATE_HOU_XUAN = 1;		// 候选
	public final static int FLOWSTATE_BANG_DING = 2;	// 绑定
	public final static int FLOWSTATE_SHAN_CHU = 99;	// 删除
	
	/**
	 * 流程操作
	 */
	public static final String  FLOW_SUBMIT="submit";		// 提交
	public static final String  FLOW_SUBMIT_CN="提交";		// 提交
	public static final String  FLOW_SENDBACK="sendBack";	// 退回
	public static final String  FLOW_SENDBACK_CN="退回";	// 退回
	public static final String  FLOW_TERMINATE="terminate";	// 办结
	public static final String  FLOW_TERMINATE_CN="办结";	// 办结
	
	/**
	 * 系统顶级部门编号 
	 */
	public final static String WAS_TOPDEPTUNID = "88001";			// 审批系统
	public final static String ESS_TOPDEPTUNID = WAS_TOPDEPTUNID;	// 综合监察系统
	public final static String DEFAULT_TOPDEPTUNID = "88001";			
	
	/**
	 * 系统附件上传路径
	 */
	public final static String CORE_FILEPATH = "/core/upload/";		//核心平台附件上传路径
	public final static String WAS_FILEPATH = "/was/upload/";		//审批系统附件上传路径
	public final static String XXPT_FILEPATH = "/xxpt/upload/";		//内部学习平台附件上传路径
	public final static String FDS_FILEPATH = "/fds/upload/";		//执法系统附件上传路径
	public final static String FDS_DOSSIER_FILEPATH = "/fds/upload/dossier/";//执法系统卷宗附件上传路径
	public final static String NEW_ESS_FILEPATH = "/essm/upload/";	//新综合电子监察系统附件上传路径
	public final static String RSP_FILEPATH = "/rsp/upload/";		//共享资源库附件上传路径
	
	/**
	 * 系统实际路径
	 */
	public final static String SYSTEM_REAL_PATH = getSystemRealPath();
	
	
	/** 乡镇街道部门编号 */
	public final static String XZJD_DEPT_UIND = "F08DCA2EDA0A0728BE05AFA1BF26961A";
	
		
	/** 新审批系统 */
	public final static String NEW_SPSITE_NAME = "新网上办事大厅";
	
	
	/**
	 * 获取系统实际路径
	 * @return
	 */
	private static String getSystemRealPath() {
		Class theClass = GlobalParameter.class;
		java.net.URL u = theClass.getProtectionDomain().getCodeSource().getLocation();
		// str会得到这个函数所在类的路径
		String str = u.toString();
		// 截去一些前面6个无用的字符
		if(str.startsWith("jar")){
			str = str.substring(9, str.length());
		}else{
			str = str.substring(6, str.length());
		}
		
		// 将%20换成空格（如果文件夹的名称带有空格的话，会在取得的字符串上变成%20）
		str = str.replaceAll("%20", " ");
		// 查找“WEB-INF”在该字符串的位置
		int num = str.indexOf("WEB-INF");
		// 截取即可
		str = str.substring(0, num);
		if (System.getProperty("os.name").toUpperCase().indexOf("LINUX") >= 0) {
			str = "/" + str;
		}
		return str;
	}
}