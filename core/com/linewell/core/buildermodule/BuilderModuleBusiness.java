package com.linewell.core.buildermodule;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

import com.linewell.core.buildermodule.detail.BuilderModuleDetail;
import com.linewell.core.buildermodule.detail.BuilderModuleDetailBusiness;
import com.linewell.core.buildermodule.detail.BuilderModuleDetailManager;
import com.linewell.core.buildermodule.info.BuilderModuleInfo;
import com.linewell.core.buildermodule.info.BuilderModuleInfoBusiness;
import com.linewell.core.buildermodule.info.BuilderModuleInfoManager;
import com.linewell.core.buildermodule.infterfacts.BuilderModuleGenCode;
import com.linewell.core.gencode.BeanBean;
import com.linewell.core.gencode.TemplateMerger;
import com.linewell.core.gencode.VelocityMain;
import com.linewell.core.subbutton.SubButton;
import com.linewell.core.subbutton.SubButtonManager;
import com.linewell.core.ucap.module.ModuleLeafManager;
import com.linewell.core.util.BeanUtil;
import com.linewell.core.util.DateTime;
import com.linewell.core.util.FileUtil;
import com.linewell.core.util.PinYinUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.core.view.View;
import com.linewell.core.view.ViewManager;
import com.linewell.core.view.column.ColumnManager;
import com.linewell.ucap.platform.authorized.app.App;
import com.linewell.ucap.session.Session;

/**
 * 快速构建系统业务操作类
 * @author JSC
 *
 */
public class BuilderModuleBusiness {
	
	/**
	 * 保存构建模块相关信息，包括主表和从表
	 * @param request
	 * @return 操作是否成功
	 */
	public boolean saveBuilderModuleInfo(HttpServletRequest request ){
		boolean flag = false;

		PinYinUtil pinYinUtil= new PinYinUtil();
		//保存主表信息
		BuilderModuleInfoManager manager = new BuilderModuleInfoManager();
    	BuilderModuleInfo builderModuleInfo = new BuilderModuleInfo();
    	BeanUtil.updateBean(request, builderModuleInfo);    
    	builderModuleInfo.setCreatetime(DateTime.getNowDateTime());
    	flag = manager.doSave(builderModuleInfo);

    	BuilderModuleDetailManager builderModuleDetailManager = new BuilderModuleDetailManager();

    	String[] captions = request.getParameterValues("caption");
    	String[] ennames = request.getParameterValues("enname");
    	String[] isshowinview = request.getParameterValues("isshowinview");
    	String[] lengthlimits = request.getParameterValues("lengthlimit");
    	for (int i = 0; i < captions.length; i++) {
			BuilderModuleDetail builderModuleDetail = new BuilderModuleDetail();
			builderModuleDetail.setUnid(new UNIDGenerate().getUnid());
			builderModuleDetail.setPunid(builderModuleInfo.getUnid());
			builderModuleDetail.setCaption(captions[i]);
			if(StrUtil.isNull(ennames[i])){
				builderModuleDetail.setEnname(pinYinUtil.HanyuToPinyin(captions[i]));
			}else{
				builderModuleDetail.setEnname(ennames[i]);
			}
			if(!StrUtil.isNull(isshowinview[i])){
				builderModuleDetail.setIsshowinview(Integer.parseInt(isshowinview[i]));
			}
			if(StrUtil.isNull(lengthlimits[i])){
				lengthlimits[i] = "500";
			}
			builderModuleDetail.setLengthlimit(Integer.parseInt(lengthlimits[i]));
			builderModuleDetail.setSortcode(String.valueOf(i));
			flag = flag && builderModuleDetailManager.doSave(builderModuleDetail);
		}

    	return flag;
	}
	
	
	/**
	 * 保存构建模块相关信息，包括主表和从表
	 * @param request
	 * @return 操作是否成功
	 */
	public boolean updateBuilderModuleInfo(HttpServletRequest request ){
		boolean flag = false;
		PinYinUtil pinYinUtil= new PinYinUtil();
		//保存主表信息
		BuilderModuleInfoManager manager = new BuilderModuleInfoManager();
    	BuilderModuleInfo builderModuleInfo =manager.doFindBeanByKey(request.getParameter("unid"));
    	BeanUtil.updateBean(request, builderModuleInfo);
    	builderModuleInfo.setLastmodifytime(DateTime.getNowDateTime());
    	flag = manager.doUpdate(builderModuleInfo);

    	BuilderModuleDetailManager builderModuleDetailManager = new BuilderModuleDetailManager();
    	BuilderModuleDetailBusiness  builderModuleDetailBusiness = new BuilderModuleDetailBusiness();
    	String[] captions = request.getParameterValues("caption");
    	String[] ennames = request.getParameterValues("enname");
    	String[] isshowinview = request.getParameterValues("isshowinview");
    	String[] lengthlimits = request.getParameterValues("lengthlimit");
    	String[] dunids = request.getParameterValues("dunid");
    	
    	for (int i = 0; i < captions.length; i++) {
			BuilderModuleDetail builderModuleDetail = new BuilderModuleDetail();
			builderModuleDetail.setUnid(dunids[i]);
			builderModuleDetail.setPunid(builderModuleInfo.getUnid());
			builderModuleDetail.setCaption(captions[i]);
			if(StrUtil.isNull(ennames[i])){
				builderModuleDetail.setEnname(pinYinUtil.HanyuToPinyin(captions[i]));
			}else{
				builderModuleDetail.setEnname(ennames[i]);
			}
			if(!StrUtil.isNull(isshowinview[i])){
				builderModuleDetail.setIsshowinview(Integer.parseInt(isshowinview[i]));
			}
			if(StrUtil.isNull(lengthlimits[i])){
				lengthlimits[i] = "500";
			}
			builderModuleDetail.setLengthlimit(Integer.parseInt(lengthlimits[i]));
			builderModuleDetail.setSortcode(String.valueOf(i));
			if(builderModuleDetailBusiness.detailUnidIsExit(dunids[i])){
				flag = flag && builderModuleDetailManager.doUpdate(builderModuleDetail);
			}else{
				builderModuleDetail.setUnid(new UNIDGenerate().getUnid());
				flag = flag && builderModuleDetailManager.doSave(builderModuleDetail);				
			}
		}
    	
    	return flag;
	}
	
	/**
	 * 生成模块
	 * @param request
	 * @return  true：操作成功，false:操作失败
	 * @throws IOException 
	 * @throws JDOMException 
	 * @throws SQLException 
	 */
	public boolean genModule(HttpServletRequest request) throws JDOMException, IOException, SQLException{
		//检查系统基础信息是否准备好
		BeanRule beanRule = new BeanRule();
		PinYinUtil pinYinUtil = new PinYinUtil();
    	Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		App app = ucapSession.getApp();
		BuilderModuleInfoManager builderModuleInfoManager = new BuilderModuleInfoManager();
		String sysAlias = app.getNameEn();
		String realPath = request.getSession().getServletContext().getRealPath("/");
		String sysPath = realPath.replaceAll("WebRoot","");//暂时统一使用WebRoot
		String unid = request.getParameter("unid");
		BuilderModuleInfo builderModuleInfo = builderModuleInfoManager.doFindBeanByKey(unid);
		
		String title = builderModuleInfo.getTitile();
		String tableName = "";
		if(StrUtil.isNull(builderModuleInfo.getTablename())){
			tableName = sysAlias + "_" + pinYinUtil.HanyuToPinyin(title);
		}else{
			tableName = builderModuleInfo.getTablename();
		}
		
			
		String sysAliasStrutsXmlPath = sysPath+"/"+sysAlias+"/"+sysAlias+".struts.xml";
		sysAliasStrutsXmlPath = sysAliasStrutsXmlPath.replaceAll("\\\\\\\\", "");
		String strutsXmlPath = sysPath+"/src/struts.xml";
		String beanName = "";
		if(!StrUtil.isNull(builderModuleInfo.getClassname())){
			beanName = builderModuleInfo.getClassname();
		}else{
			beanName = beanRule.getBeanName(pinYinUtil.HanyuToPinyin(title));
		}
		
		String configXmlName = sysAlias + ".struts.xml";
		//  系统别名为目录的源码目录是否存在
		this.sourceSysAliasIni(sysAlias,sysPath);
		
		//TODO自动配置eclipse源码编译设置
		this.classpathIni(sysPath + "/.classpath", sysAlias);
		
		//判断jsp页面目录是否存在
		jspSysAliasIni(sysAlias,realPath);
		
		//  系统别名.struts.xml是否存在不存在则创建
		this.strutsConfigIni(sysAlias, sysPath);
		
		// 系统别名.struts.xml 是否包含action对应的类
		//sysAlias + ".struts.xml
		BeanBean bean = createBaseBean(request,tableName,beanName,builderModuleInfo.getPackname());
		this.strutsActionIni(sysAliasStrutsXmlPath,bean.getPackageName()+"."+beanName+"Action",beanName.toLowerCase());
		
		//  struts.xml是否包含[系统别名.struts.xml]不包含则 动态加进去
		this.strutsXmlIni(strutsXmlPath,configXmlName);
		
		//初始化模板合并类
		VelocityMain.init();
		GenCodeFactory genCodeFactory = new GenCodeFactory();
		BuilderModuleGenCode builderModuleGenCode = genCodeFactory.build(app.getUnid());
		
		//存在则只做追加字段操作
		builderModuleGenCode.genTable(unid, app.getUnid(),title,tableName);
		builderModuleGenCode.genFileTable(app.getUnid());
		
		//生成类
		bean = builderModuleGenCode.parseTableForBean(app.getUnid(), bean);
		if(builderModuleInfo.getIshavefile() == 1){
			bean.setJspTableFileContent("<iframe  width='100%' frameborder='0' src='${path}/core/file/file_coreupload.jsp?unid=${"+bean.getBeanCName().toLowerCase()+".unid}'></iframe>");	
		}
		
		String fieldSql = builderModuleGenCode.getFieldSqlByTable(tableName);
		
		//生成java代码
		this.genCode(bean,"Bean.vm",sysAlias,sysPath);
		this.genCode(bean,"Action.vm",sysAlias,sysPath);
		this.genCode(bean,"Manager.vm",sysAlias,sysPath);
		this.genCode(bean,"Business.vm",sysAlias,sysPath);
		
		//用户没选择所属模块则不生成模块视图数据
		if(!StrUtil.isNull(builderModuleInfo.getBelongtomoduleunid())){
			//生成JSP
			String jspPath = new BeanRule().getJspPath(beanName.toLowerCase(), sysAlias);
			this.genJsp(bean,"Edit.vm",jspPath,sysPath);
			
			//生成视图
			jspPath = jspPath + "?"+bean.getPk_Name().toLowerCase()+"=";
			//生成视图基础表数据
			View view = createView(app.getUnid(),bean,jspPath,title);
			ViewManager viewManager = new ViewManager();
			viewManager.createBaseViewByView(view);
			//生生成视图字段数据
			this.createBaseViewColumnByColumn(app.getUnid(),tableName,view.getUnid(),fieldSql,unid);
			//生成新增和修改按钮
			createDelAndAddButton(view.getUnid());
				
			//生成模块（需要支持二级、三级模块）
			ModuleLeafManager moduleLeafManager = new ModuleLeafManager();
			String moduleunid = moduleLeafManager.createModule(title,builderModuleInfo.getBelongtomoduleunid(),view.getUnid());
			
			//删除旧的视图数据
			if(!StrUtil.isNull(builderModuleInfo.getViewunid())){
				viewManager.delView("'"+builderModuleInfo.getViewunid()+"'");
			}
			//删除旧的模块数据
			if(!StrUtil.isNull(builderModuleInfo.getModuleunid())){
				moduleLeafManager.doDel(builderModuleInfo.getModuleunid());
			}
			builderModuleInfo.setViewunid(view.getUnid());
			builderModuleInfo.setModuleunid(moduleunid);
			
		}
		
		//更新主表关联模块id 和视图id
		builderModuleInfo.setAppunid(app.getUnid());
		builderModuleInfoManager.doUpdate(builderModuleInfo);
		return true;
	}
	
	
	/**
	 * 通过表反向生成模型相关数据
	 * @param request
	 * @return
	 * @throws SQLException
	 */
	public boolean genModuleInfoByTable(HttpServletRequest request) throws SQLException{
		BuilderModuleInfoBusiness builderModuleInfoBusiness = new BuilderModuleInfoBusiness();
		return builderModuleInfoBusiness.genModuleInfoByTable(request);
	}
	
	
	
	/**
	 * 初始化系统别名.struts.xml Action 元素
	 * @param fileName
	 * @param actionName
	 * @throws IOException
	 * @throws FileNotFoundException 
	 * @throws JDOMException 
	 */
	private void strutsActionIni(String fileName,String actionName,String beanName) throws FileNotFoundException, IOException, JDOMException{
		 SAXBuilder builder=new SAXBuilder(false);
		 Document document=builder.build(fileName);   
		 Element elements=document.getRootElement();    
		 List elementsList=elements.getChildren("action"); 
		 boolean isExit = false;
		 for (int i = 0; i < elementsList.size(); i++) {
			 Element element = (Element)elementsList.get(i);
			 //系统已经存在跳出循环
			 if(element.getAttribute("name").getValue().equals(beanName)){
				 isExit = true;
				 break;
			 }
		 }
		  
		 if(!isExit){
			 Element packElement = elements.getChild("package");
			 Element includeElement = new Element("action");
			 includeElement.setAttribute("name", beanName);
			 includeElement.setAttribute("class", actionName);
			 packElement.addContent(includeElement);
			 XMLOutputter out = new XMLOutputter() ;
		     Format format = Format.getCompactFormat() ;
		     format.setEncoding("UTF-8") ;
		     format.setIndent(" ") ;
		     out.setFormat(format) ;
		     out.output(document, new FileOutputStream(new File(fileName)));
		 }
	}
	
	
	/**
	 * 自动创建新增和删除按钮
	 * @param viewUnid
	 * @return
	 */
	private boolean createDelAndAddButton(String viewUnid){
		boolean flag = false;
		SubButtonManager subButtonManager = new SubButtonManager();
		
		//删除按钮
		SubButton subButtondel = new SubButton();
		subButtondel.setButton_unid("E0C9D635C6B62EAAF4B48D62D960ECF2");
		subButtondel.setSub_belongto(viewUnid);
		subButtondel.setSub_img("icon-del");
		subButtondel.setSub_name("删除");
		subButtondel.setSub_unid(new UNIDGenerate().getUnid());
		flag = subButtonManager.doSave(subButtondel);
		
		//添加按钮
		SubButton subButtonadd = new SubButton();
		subButtonadd.setButton_unid("BBBA97C3A415865ABFD0D1371FFF9951");
		subButtonadd.setSub_belongto(viewUnid);
		subButtonadd.setSub_img("icon-add");
		subButtonadd.setSub_name("新增");
		subButtonadd.setSub_unid(new UNIDGenerate().getUnid());
		flag = flag && subButtonManager.doSave(subButtonadd);
		return flag;
	}
	
	/**
	 * 
	 * @param appUnid
	 * @param tableName
	 * @param viewUnid
	 * @throws SQLException
	 */
	private void createBaseViewColumnByColumn(String appUnid ,String tableName,String viewUnid,String fieldSql,String unid) throws SQLException{

		BuilderModuleDetailBusiness builderModuleDetailBusiness = new BuilderModuleDetailBusiness();
		List<BuilderModuleDetail> needViewList = builderModuleDetailBusiness.getNeedViewList(unid);
		String[][] result = new String[needViewList.size()+2][4];
		result[1][0] = "UNID";
		result[1][3] = "主键";
		for (int i = 0; i < needViewList.size(); i++){
			BuilderModuleDetail builderModuleDetail = needViewList.get(i);
			result[i+2][0] = builderModuleDetail.getEnname();
			result[i+2][3] = builderModuleDetail.getCaption();
		}
		
		
		ColumnManager columnManager = new ColumnManager();
		columnManager.createBaseViewColumnByColumnList(result, viewUnid);
	}
	
	/**
	 * 创建默认格式的视图bean对象
	 * @param jndiName  
	 * @param bean
	 * @param jspPath
	 * @return
	 */
	private View createView(String jndiName,BeanBean bean,String jspPath,String title){
		View view = new View();
		view.setUnid(new UNIDGenerate().getUnid());
		view.setName(title);
		view.setAlias(bean.getBeanCName().toLowerCase());
		view.setJndi(jndiName);
		view.setType("0");
		view.setShowType("0");
		view.setSourceType("1");
		view.setSqlcontent("select * from "+bean.getTableName());
		view.setOpenType("1");
		view.setWidth(1000);
		view.setHeight(600);
		view.setRownumbers("1");
		view.setOpenContent(jspPath);
		view.setRownumbers("0");
		view.setAppid(jndiName);
		return view;
	}
	
	/**
	 * 创建bean基础信息
	 * @param request
	 * @param title 标题
	 * @return BeanBean 对象
	 */
	private BeanBean createBaseBean(HttpServletRequest request,String tableName,String beanName,String packname){
    	Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		App app = ucapSession.getApp();
		BeanBean bean=new BeanBean();
		BeanRule beanRule = new BeanRule();
		bean.setAppid(app.getUnid());
		bean.setTableName(tableName);
		bean.setPk_Name("unid");
		bean.setBeanName(beanName);
		bean.setBeanCName(beanName.toLowerCase());
		bean.setAliasName(beanName.toLowerCase());
		bean.setClassName(beanName); // 生成的类名
		if(StrUtil.isNull(packname)){
			bean.setPackageName(beanRule.getPackageName(beanName, app.getNameEn()));
		}else{
			bean.setPackageName(packname);
		}
		
		
		bean.setCreater(ucapSession.getUser().getDisplayName());
		
		bean.setCreaterEmail(ucapSession.getUser().getMail());

		bean.setCreateTime(DateTime.getNowDateTime());
		return bean;
	}
	
	
	private boolean genJsp(BeanBean bean,String javatemplate,String outputFileName,String sysPath) throws IOException{
		VelocityContext context = new VelocityContext();
		context.put("bean", bean); //传递数据源
		Template template =TemplateMerger.getTemplate(javatemplate);//加载
		DateTime dt = new DateTime();
		//如果为jsp，存在的的话重新生成个
		String fullFilePath =sysPath + "WebRoot/" + outputFileName;
		File file = new File(fullFilePath);
		if (file.exists()) {
			String extName = outputFileName.substring(outputFileName.lastIndexOf(".")+1, outputFileName.length()); 
			if(extName.equals("jsp")){
				outputFileName =  outputFileName.substring(0,outputFileName.lastIndexOf("."))+DateTime.getNowDateTime().replaceAll(" ", "").replaceAll(":", "")+".jsp";
			}
		}

		fullFilePath =  sysPath + "WebRoot/" + outputFileName ;
		TemplateMerger.mergeTemplate(template, context, fullFilePath);
		return true;
	}
	

	
	
	private boolean genCode(BeanBean bean,String javatemplate,String sysAlias,String sysPath) throws IOException{
		VelocityContext context = new VelocityContext();
		context.put("bean", bean); //传递数据源
		Template template =TemplateMerger.getTemplate(javatemplate);//加载
		//根据文件配置总根本目录地址+包结构目录+类名称=输出地址
		String outputFileName = sysPath+"/"+sysAlias +"/";
		String packagePath = TemplateMerger.packageToFilePath(bean.getPackageName());
		if(javatemplate.indexOf("Bean.vm") >= 0){
			javatemplate = javatemplate.replaceAll("Bean.vm", ".vm");
		}
		
		outputFileName = outputFileName+packagePath+bean.getBeanName()+javatemplate.replaceAll(".vm","")+".java";
		TemplateMerger.mergeTemplate(template, context, outputFileName);
		return true;
	}
			
	
	/**
	 * 
	 * @param sysAlias
	 * @param sysPath
	 * @throws IOException 
	 * @throws JDOMException 
	 */
	public void classpathIni(String fileName,String sysAlias) throws JDOMException, IOException{
		 SAXBuilder builder=new SAXBuilder(false);    
		 Document document=builder.build(fileName);   
		 Element elements=document.getRootElement();    
		 List elementsList=elements.getChildren("classpathentry"); 
		 boolean isExit = false;
		 for (int i = 0; i < elementsList.size(); i++) {
			 Element element = (Element)elementsList.get(i);
			 //系统已经存在跳出循环
			 //System.out.println(element.getAttribute("kind").getValue());
			 if(element.getAttribute("kind").getValue().equals("src")&&element.getAttribute("path").getValue().equals(sysAlias)){
				 isExit = true;
				 break;
			 }
		 }
		  
		 if(!isExit){
			 Element includeElement = new Element("classpathentry");
			 includeElement.setAttribute("kind", "src");
			 includeElement.setAttribute("path", sysAlias);
			 elements.addContent(includeElement);
			 XMLOutputter out = new XMLOutputter() ;
		     Format format = Format.getCompactFormat() ;
		     format.setEncoding("UTF-8") ;
		     format.setIndent(" ") ;
		     out.setFormat(format) ;
		     out.output(document, new FileOutputStream(new File(fileName)));
		 }
	}
	
	
	/**
	 * 初始化strus.xml
	 * @param fileName
	 * @param configXmlName
	 * @throws JDOMException
	 * @throws IOException
	 */
	 public void strutsXmlIni(String fileName,String configXmlName) throws JDOMException, IOException {   
		 SAXBuilder builder=new SAXBuilder(false);    
		 Document document=builder.build(fileName);   
		 Element elements=document.getRootElement();    
		 List elementsList=elements.getChildren("include"); 
		 
		 //判读是否已经存在信息
		 boolean isExit = false;
		 for (int i = 0; i < elementsList.size(); i++) {
			 Element element = (Element)elementsList.get(i);
			 //系统已经存在跳出循环
			 if(element.getAttribute("file").getValue().equals(configXmlName)){
				 isExit = true;
				 break;
			 }
		 }
		 //不存在则创建
		 if(!isExit){
			 Element includeElement = new Element("include");
			 includeElement.setAttribute("file", configXmlName);
			 elements.addContent(includeElement);
			 XMLOutputter out = new XMLOutputter() ;
		     Format format = Format.getCompactFormat() ;
		     format.setEncoding("UTF-8") ;
		     format.setIndent(" ") ;
		     out.setFormat(format) ;
		     out.output(document, new FileOutputStream(new File(fileName))) ;
		 }
		 
	 }
	
	/**
	 * sourc源码包是否存储，不存在则创建文件夹
	 * 注意：创建文件夹后，要eclipse编译则还需要在eclipse做设置
	 * @param sysAlias 系统别名
	 * @param sysPath 应用物理路径
	 * @param request
	 */
	private void sourceSysAliasIni(String sysAlias,String sysPath){
		sysPath = sysPath + sysAlias;
		FileUtil.isExist(sysPath);
	}
	
	/**
	 * WebRoot下jsp文件momus是否存在，不存在则创建文件夹
	 * 注意：创建文件夹后，要eclipse编译则还需要在eclipse做设置
	 * @param sysAlias 系统别名
	 * @param realPath 应用物理路径
	 * @param request
	 */
	private void jspSysAliasIni(String sysAlias,String realPath){
		realPath = realPath + sysAlias;
		FileUtil.isExist(realPath);
	}
	
	
	/**
	 * 初始化系统别名.struts.xml 不存在则创建
	 * @param sysAlias 系统别名
	 * @param sysPath 应用物理路径
	 * @return 操作是否成功： 成功true 失败false
	 */
	private boolean strutsConfigIni(String sysAlias,String sysPath){
		boolean flag = false;
		sysPath = sysPath + sysAlias;
		String configName = sysAlias + ".struts.xml";
		String configPath = sysPath + "/" + configName;
		if(!FileUtil.isFileExist(configPath)){
			//创建默认的.struts.xml配置文件
			flag = createDefaulStrutsConfig(configPath,sysAlias);
		}
		return flag;
	}
	
	
	/**
	 * 创建缺省的struts配置文件
	 * @param configPath 文件全路径包括文件名
	 * @return 操作是否成功
	 */
	private boolean createDefaulStrutsConfig(String configPath,String sysAlias){
		StringBuffer sb = new StringBuffer();
	
		sb.append("<!DOCTYPE struts PUBLIC\r\n");
		sb.append("\"-//Apache Software Foundation//DTD Struts Configuration 2.0//EN\"\r\n");
		sb.append("\"http://struts.apache.org/dtds/struts-2.0.dtd\">\r\n");
		sb.append("<struts>\r\n");
		sb.append("<package name=\""+sysAlias+"\" extends=\"struts-default\">\r\n");
		sb.append(" <!--add action on here-->\r\n");
		sb.append("</package>\r\n");
		sb.append("</struts>\r\n");

		return FileUtil.stringToFile(sb.toString(), configPath);
	}
	

	public static void main(String[] args) throws JDOMException, IOException {
	/*	BuilderModuleBusiness builderModuleBusiness = new BuilderModuleBusiness();
		builderModuleBusiness.classpathIni("D:/workspace/partyaffairsplt1.0/.classpath", "tesst");*/

		String sss= "D:\\workspace\\partyaffairsplt1.0\\\\/test1/test1.struts.xml";
		System.out.println(sss);
		
		System.out.println(sss.replaceAll("\\\\\\\\", ""));
	}
}
