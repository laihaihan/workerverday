package com.linewell.core.gencode;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.Iterator;
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.velocity.Template;
import org.apache.velocity.context.Context;
import org.apache.velocity.runtime.RuntimeSingleton;

import com.linewell.core.util.StrUtil;

/**
 * <p>
 * 模板与内容合并类
 * </p>
 * 
 * @author 文件创建者姓名:陈鹏 cpeng@linwell.com
 * @version 1.0.0 Jul 1, 2010
 *          <p>
 *          Copyright (c) 2010 Linewell.com
 *          </p>
 */
public class TemplateMerger {
	private static final Logger logger = Logger.getLogger(TemplateMerger.class);

	public TemplateMerger() {
	}

	/**
	 * 合并文章并生成目标文件
	 * 
	 * @param tpl
	 *            模板对象
	 * @param ctx
	 *            上下文
	 * @param outputFileName
	 *            输出文件名
	 * @return true表示合并成功 false表示失败
	 * @throws IOException
	 */
	public static boolean mergeTemplate(Template template, Context context, String outputFileName)
			throws IOException {
		File file = new File(outputFileName);
		//if (file.exists()) {
		//	logger.error("创建单个文件" + outputFileName + "失败，目标文件已存在！");
		//}
		if (outputFileName.endsWith(File.separator)) {
			logger.error("创建单个文件" + outputFileName + "失败，目标不能是目录！");
		}
		if (!file.getParentFile().exists()) {
			if (!file.getParentFile().mkdirs()) {
				logger.error("创建目录文件所在的目录失败！");
				return false;
			}
		}
		boolean retValue = true;
		Writer writer = null;
		try {
			
			//System.out.println(file.toString());
			writer = new OutputStreamWriter(new FileOutputStream(file), "UTF-8"); 
			//writer = new BufferedWriter(new FileWriter(file),"UTF-8");
			template.merge(context, writer);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			retValue = false;
		} finally {
			if (writer != null) {
				writer.flush();
				writer.close();
			}
		}
		
		//通过读写改变File对象去掉文件的第一个问号
		//FileUtil.stringToFile(FileUtil.fileToString(file,"UTF-8").replaceFirst("\\?", ""),file.getAbsolutePath());
		return retValue;
	}

	/**
	 * 根据模板名称返回模板对象
	 * 
	 * @param tplname
	 * @return 对应的模板对象
	 */
	public static Template getTemplate(String tplname) {
		Template tpl = null;
		try {
			tplname = normalPath(tplname);
			//System.out.println(tplname);
			tpl = RuntimeSingleton.getTemplate(tplname);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			tpl = null;
		}

		return tpl;
	}

	public static String normalPath(String path) {
		String sep = File.separator;
		path = path.replace('/', sep.charAt(0));
		path = path.replace('\\', sep.charAt(0));
		return path;
	}
	/**
	 *   路径如xx/xx/xxx/
	 * @param packageName
	 * @return
	 * String       
	 *
	 */
	public static String packageToFilePath(String packageName){
		//System.out.println(packageName);
		List nodes = StrUtil.stringToList(packageName, "\\.");
		StringBuffer path = new StringBuffer();
		//System.out.println(nodes.size());
		if (null==nodes||nodes.size()==0) {
			return path.toString();
		}
		for (Iterator iterator = nodes.iterator(); iterator.hasNext();) {
			String node = (String) iterator.next();
			path.append(node);
			path.append("/");
		}
		return path.toString();
	}
	
	
	
	 public static void main(String[] args) throws IOException {

         File file=new File("D:/workspace/was6.1/core/com/linewell/core/test/DBTest.java"); //获取文件
         FileReader fr=new FileReader(file);
         BufferedReader br=new BufferedReader(fr);

         File file2=new File("D:/workspace/was6.1/core/com/linewell/core/test/DBTest2.java");//转码后保存在这文件里
         file2.createNewFile();
         FileWriter fw=new FileWriter(file2);
         BufferedWriter bw =new BufferedWriter(fw);
         String str;
         while((str=br.readLine())!= null){
                  System.out.println(str);
                   bw.write(new String(str.getBytes(),"utf-8"));//指定转码格式
          }
          br.close();

           fr.close();

           bw.close();
           fw.close();
	 }


	
}
