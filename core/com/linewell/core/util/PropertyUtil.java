package com.linewell.core.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


/**
 * 类说明：properties配置文件的辅助工具类
 * 
 * @author qcongyong
 * @version 1.0 2011-11-23
 */
public class PropertyUtil {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(InputStreamUtil.class); 
	
    String cfgFileName = "";

    private Properties properties;
    
    private static PropertyUtil propertyUtil = null;

    /**
     * 单例模式，获取构造对象
     * 
     * @return propertyBase  PropertyBase
     */
    public static PropertyUtil getInstance() {
        if (propertyUtil == null){
        	propertyUtil = new PropertyUtil();
        }
        return propertyUtil;
    }

    /**
     * 私有缺省构造函数
     */
    private PropertyUtil() {
        properties = new Properties();
    }

    /**
     * 加载配置文件
     * 
     * @param filename 配置文件所在文件路径
     */
    public void init(String filename) {
        this.cfgFileName = filename;
        load(filename);
    }

    /**
     * 重新加载属性配置文件
     */
    public void reload() {
        load(this.cfgFileName);
    };

    /**
     * 加载属性配置文件
     * 
     * @param filename 属性配置文件所在的文件地址 String
     */
    private void load(String filename) {
        try {
            //打开环境配置文件
            FileInputStream fi = new FileInputStream(filename);
            //通过properties.load(fi)方面将环境配置文件读入，依次枚举各个环境变量健和值，并配置JVM的环境变量
            properties.load(fi);
            fi.close();
        } catch (IOException ex) {
            logger.error(ex);
            System.out.println(ex);
        } catch (Exception ex) {
            logger.error(ex);
            System.out.println(ex);
        }
    }

    /**
     * 根据关键字获取关键字的对应值
     * @param key 关键字 String
     * @return 关键字对应值 String
     */
    public String getValue(String key) {
        return properties.getProperty(key, "");
    }
    
    public  Iterator getIterator(){
    	return properties.entrySet().iterator();
    }
}
