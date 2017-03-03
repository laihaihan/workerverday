package com.linewell.core.ireport;

import java.io.File;
import java.io.IOException;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Hashtable;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.hibernate.Hibernate;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperRunManager;

import org.apache.log4j.Logger;

import com.linewell.core.db.JdbcFactory;
import com.linewell.core.db.JdbcSession;
import com.linewell.core.print.printitem.PrintItemManager;
import com.linewell.core.print.printlog.PrintLogManager;
import com.linewell.core.util.PropertyUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucap.session.Session;



/**
 * 使用说明
 * 一、参数构造实现
 *   默认参数只有UNID可以直接使用，如需要传入其他参数请各系统自行扩展，如下为为参考类配置文件参考
 *   \core\ireportparameter.properties 各个子系统需要自行编写配置文件且名字必须为ireportparameter.properties放到系统英文名文件夹下面
 *   配置文件例子：审批系统如需扩展参数则需要建立 \was\ireportparameter.properties 文件然后配置编写相应的参数构造类
 *   参数构造类例子：
 *   public class CommonReportParameter implements ReportParameterFactory{
 *   	public Map produce(String unid){
 *			Map parameters = new Hashtable();
 *			parameters.put("UNID", unid);
 *			return parameters;
 *	 	}
 *   }
 *   
 * 二、参数说明
 * fileName：系统别名 + ireport编译后文件 例如审批系统的受理通知单: \was\report\受理通知单.jasper
 * image:套打的时候是否显示底片，默认显示不需要显示则传 “1”
 * sysen：平台英文名，默认没传指向/core
 * type:  配置文件对应实现类的键值
 * printname: 打印名称，打印结果入证照库的时候用来填充 证照名称字段;
 * 
 * 三、调用例子
 *  String reportName = "/was/report/受理通知单.jasper"; 
 *	String unid = "846C51474BF2F623F1DCA89B7F31AE4E";
 *	String jndiName = GlobalParameter.APP_WAS;
 *  String printname = "受理通知单";
 *	String parameter ="fileName="+reportName+"&unid=" + unid + "&type=1&jndiName="+jndiName + "&printname="+printname;
 *	parameter =java.net.URLDecoder.decode(parameter,"UTF-8");
 *	
 *	String postpage  = request.getContextPath() + "/reportjasper?"+parameter;
 *	
 *	%>
 *	<script language="JavaScript">
 *		window.location.href = "<%=postpage%>";
 *	</script>
 * 
 * 
 * @author zjianhui@linewell.com
 * @date 2012-05-21
 */
public class ReportJasperServlet extends HttpServlet {
	
	private static final long serialVersionUID = -8852136998243376520L;
	private static Logger logger = Logger.getLogger(ReportJasperServlet.class);
	
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException,IOException {
		Map parameters = this.getParameters(request);	
		String jndiName = request.getParameter("jndiName");	
		String baseDir = (String) parameters.get("BASEDIR");
		byte[] bytes = null;

		JdbcSession jdbc = JdbcFactory.getSession(jndiName);
		Connection  conn = jdbc.getConnection(); //获取连接
		try {
			bytes = JasperRunManager.runReportToPdf(baseDir,parameters, conn);
		} catch (JRException e) {
			e.printStackTrace();
			logger.debug("报表序列化出错 " + e.getMessage());
		}finally{
			if(null != conn){
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
					logger.debug("打印报表关闭连接错误 " + e.getMessage());
				}
			}
		}

		//保存历史打印记录
		String unid = addLog(bytes,request);
		
		//保存打印域信息
		addItem(request,unid);
		
		if (bytes != null && bytes.length > 0) {
			response.setContentType("text/html");//
			response.setContentLength(bytes.length);
			ServletOutputStream ouputStream = response.getOutputStream();
			ouputStream.write(bytes, 0, bytes.length);
			ouputStream.flush();
			ouputStream.close();
		} else {
			logger.error("Report data is null,Something must be wrong!");
			System.out.println("Report data is null,Something must be wrong!");
		}
	}

	/**
	 * 功能：获取打印模板参数 add by qcongyong 2009-12-31
	 * @param request
	 * @return 构造好参数Map
	 */
	private Map getParameters(HttpServletRequest request){
		String unid = request.getParameter("unid");
		String image = request.getParameter("image");
		String fileName = request.getParameter("fileName");//报表模板文件 如 reportName=\\report\\askreport.jasper
		String BaseDir = (request.getRealPath("/") + fileName).replace('\\','/');
		String parameterClass = this.getParameterClass(request);
		
		Map parameters = new Hashtable();
		try {
			//加入通用参数
			parameters.put("BASEDIR", BaseDir);//模板文件路径
			parameters.put("UNID", unid);//主键
			
			//加入自定义参数
			if(!StrUtil.isNull(parameterClass)){
				ReportParameterFactory factory = (ReportParameterFactory)(Class.forName(parameterClass).newInstance());
				parameters.putAll(factory.produce(request));
			}
			
			//设置背景图
			if(!StrUtil.isNull(image)){
				parameters.put("image", image);
			}
			
			System.out.println("parameters:"+parameters);
		} catch (InstantiationException e) {
			logger.error(e.getMessage());
		} catch (IllegalAccessException e) {
			logger.error(e.getMessage());
		} catch (ClassNotFoundException e) {
			logger.error(e.getMessage());
		}
		return parameters;
	}
	
	/**
	 * 记录打印来自于apas_info的域信息
	 * @param request
	 */
	private void addItem(HttpServletRequest request,String punid){
		PrintItemManager printItemManager = new PrintItemManager();
		String unid = request.getParameter("unid");	
		/*ApasInfoManager apasInfoManager = new ApasInfoManager();
		ApasInfo apasInfo = apasInfoManager.doFindBeanByKey(unid);
		if(null != apasInfo){
			printItemManager.addPrintItem(apasInfo, "APAS_INFO", punid);
		}*/
	}
	
	/**
	 * 记录日志
	 * @param bytes 序列化后的pdf实体
	 * @param request 会话
	 */
	private String addLog(byte[] bytes,HttpServletRequest request){
		Blob pdfBlob = Hibernate.createBlob(bytes);
		String unid = request.getParameter("unid");
		String printname = request.getParameter("printname");	
		String userid = "";
		String username = "";
		Session ucapsession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
		if(null != ucapsession){
			User user = ucapsession.getUser();
			userid = user.getUnid();
			username = user.getName();
		}	
		PrintLogManager printLogManager = new PrintLogManager();
		return printLogManager.addPrintLog(pdfBlob, unid, userid, username,printname);
	}
	
	/**
	 * 取得参数构造类的路径
	 * @param request 会话request
	 * @return 类全路径
	 */
	private String getParameterClass(HttpServletRequest request){
		String sysen = request.getParameter("sysen");//子平台英文名
		String type = request.getParameter("type");//子平台英文名
		if(null == sysen){
			sysen = "core"; //默认取政务支撑平台下面的文件
		}
		
		String classFullName = "";
		String filePath = request.getRealPath("/") + "/"+sysen+"/ireportparameter.properties";
		File file = new File(filePath);
		if(file.exists() && file.isFile()){
			PropertyUtil propertyUtil = PropertyUtil.getInstance();
			propertyUtil.init(filePath);
			classFullName = propertyUtil.getValue(type);
		}
		return classFullName;
	}
	
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
}