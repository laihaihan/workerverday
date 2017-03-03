package com.linewell.core.gencode;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.Category;
import org.apache.velocity.app.Velocity;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.RuntimeConstants;
import org.apache.velocity.runtime.RuntimeSingleton;

public class VelocityMain {
	public static String CATEGORY_NAME = "velexample";
	private static final Log logger = LogFactory.getLog(CodeGenerater.class);

	public static void init() {
		/*
		 * configure log4j to log to console
		 */

		BasicConfigurator.configure();
		Category log = Category.getInstance(CATEGORY_NAME);
		log.info("Hello from Log4jCategoryExample - ready to start velocity");
		/*
		 * now create a new VelocityEngine instance, and . * configure it to use
		 * the category
		 */

		VelocityEngine ve = new VelocityEngine();
		ve.setProperty(RuntimeConstants.RUNTIME_LOG_LOGSYSTEM_CLASS,
				"org.apache.velocity.runtime.log.SimpleLog4JLogSystem");
		ve.setProperty("runtime.log.logsystem.log4j.category", CATEGORY_NAME);
		String cfgPath = (VelocityMain.class.getResource("/")).getPath();
		cfgPath = (cfgPath.replaceAll("WEB-INF/classes", "core/gencode/template")).substring(1);
		cfgPath = cfgPath.replaceAll("%20", " ");// 转换文件夹中带有空格的字符
		ve.setProperty(Velocity.FILE_RESOURCE_LOADER_PATH, cfgPath);
		RuntimeSingleton.setProperty(Velocity.FILE_RESOURCE_LOADER_PATH, cfgPath);
		RuntimeSingleton.setProperty(Velocity.ENCODING_DEFAULT, "UTF-8");
		RuntimeSingleton.setProperty(Velocity.INPUT_ENCODING, "UTF-8");
		RuntimeSingleton.setProperty(Velocity.OUTPUT_ENCODING, "UTF-8");
		try {
			RuntimeSingleton.init();
			ve.init();
		} catch (Exception e) {
			logger.error(e.getMessage());
			// TODO Auto-generated catch block
		}

		log.info("this should follow the initialization output from velocity");
	}

}

