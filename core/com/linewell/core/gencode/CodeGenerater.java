package com.linewell.core.gencode; 

import java.io.IOException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;

/**
 * 代码创建车间
 * @author 文件创建者姓名:张建辉 zjianhui@linewell.com
 * @version 1.0.0 date: 
 * <p>
 * Copyright (c) Jul 5, 2011 Linewell.com
 * </p>
 */
public class CodeGenerater implements ICodeGenerater{
	private String path = "";
	/**
	 * 记录日志
	 */
	private static final Log logger = LogFactory.getLog(CodeGenerater.class);

	/**
	 * 代码生成
	 * @param bean 模板数据源
	 * @param javatemplate 模板文件名
	 */
	@Override
	public void generatejava(BeanBean bean,String javatemplate,String sourcename) throws IOException {
		String cfgPath = (VelocityMain.class.getResource("/")).getPath();
		cfgPath = (cfgPath.replaceAll("WEB-INF/classes", "")).substring(1);
		cfgPath = cfgPath.substring(0, cfgPath.indexOf(cfgPath.split("/")[cfgPath.split("/").length-1]));
		this.path=cfgPath;
		this.generateBean(bean,javatemplate,sourcename);
	}
	
	/**
	 * 代码生成
	 * @param bean 模板数据源
	 * @param javatemplate 模板文件名
	 */
	@Override
	public void generatejsp(BeanBean bean,String jsptemplate,String jsppath) throws IOException {
		String outputFileName = getJspFullPath(bean.getBeanName(),jsptemplate,jsppath);
		genrateJsp(bean,jsptemplate,outputFileName);
	}
	
	/**
	 * 获取生成jsp全路径
	 * @param beanName bean 英文名
	 * @param jsptemplate 模板名称
	 * @param jsppath jsp相对应用路径
	 * @return jsp绝对路径
	 */
	private String getJspFullPath(String beanName,String jsptemplate,String jsppath){
		String cfgPath = (VelocityMain.class.getResource("/")).getPath();
		cfgPath = (cfgPath.replaceAll("WEB-INF/classes", "")).substring(1);
		cfgPath = cfgPath.substring(0, cfgPath.indexOf(cfgPath.split("/")[cfgPath.split("/").length-1]));
		String outputFileName = path +"/WebRoot/"+jsppath;
		
		outputFileName = outputFileName + beanName.toLowerCase() + "_" +jsptemplate.replaceAll(".vm","").toLowerCase()+".jsp";
		return outputFileName;
	}
	
	public boolean genrateJsp(BeanBean bean,String javatemplate,String outputFileName) throws IOException{
		VelocityContext context = new VelocityContext();
		context.put("bean", bean); //传递数据源
		Template template =TemplateMerger.getTemplate(javatemplate);//加载
		TemplateMerger.mergeTemplate(template, context, outputFileName);
		return true;
	}
	
	public boolean generateBean(BeanBean bean,String javatemplate,String sourcename) throws IOException{
		VelocityContext context = new VelocityContext();
		context.put("bean", bean); //传递数据源
		Template template =TemplateMerger.getTemplate(javatemplate);//加载
		//根据文件配置总根本目录地址+包结构目录+类名称=输出地址
		String outputFileName = this.path+sourcename +"/";
		String packagePath = TemplateMerger.packageToFilePath(bean.getPackageName());
		if(javatemplate.indexOf("Bean.vm") >= 0){
			javatemplate = javatemplate.replaceAll("Bean.vm", ".vm");
		}
		
		outputFileName = outputFileName+packagePath+bean.getBeanName()+javatemplate.replaceAll(".vm","")+".java";
		TemplateMerger.mergeTemplate(template, context, outputFileName);
		return true;
	}
}
