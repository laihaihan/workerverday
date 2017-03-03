package com.linewell.core.observer;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Observer;

import org.apache.log4j.Logger;

import com.linewell.core.util.StrUtil;


/**  
 * <p>根据XML路径解析出配置中的观察者对象集合</p>
 *   
 */  
public class ObserverHelper {
    
    private static final Logger logger = Logger.getLogger(ObserverHelper.class.getName());
    
    /**
     * 返回启用的Observer对象
     * @param observerConfig
     * @return
     * @throws ClassNotFoundException 
     * @throws IllegalAccessException 
     * @throws InstantiationException 
     */
    public List getValidateObservers(ObserverConfig observerConfig) throws InstantiationException, 
                    IllegalAccessException, ClassNotFoundException{
        List list = observerConfig.getObservers();
        List<Observer> result = null;
        if(null!=list && list.size()>0){
            result = new ArrayList<Observer>();
            for(int i=0; i<list.size(); i++){
                ObserverBean observerBean = (ObserverBean) list.get(i);
                if(null==observerBean || StrUtil.isNull(observerBean.getClassname())){
                    continue;
                }
                if("Y".equals(observerBean.getUserable())) {
                    String className = observerBean.getClassname();
                    Observer observer;
                    observer = (Observer) Class.forName(className).newInstance();
                    result.add(observer);                  
                }
            }
        }
        return result;
    }
    
    public ObserverConfig getObservers(String fileName){
        InputStream is = getInputStream(fileName);
        if(null == is) return null;
        
        ObserverConfigSAXParser ocsax = new ObserverConfigSAXParser();
        try {
            ocsax.parse(is);
        } catch (Exception e) {
        	logger.error(e.getMessage(), e);
        }
        return ocsax.getObserverConfig();
    }

    /**
     * @param fileName
     * @return
     */
    private InputStream getInputStream(String fileName) {
        String classPath = this.getClass().getResource("/").getPath();      
        String configPath = classPath.replace("WEB-INF/classes/", "");
        String xmlPath = configPath + fileName;
        xmlPath = xmlPath.replaceAll("%20", " ");//将20%转换成空格(文件路径中带有空格会变成20%)
        File file = new File(xmlPath);
        
        InputStream is = null;
        try {
            is = new FileInputStream(file);
        } catch (FileNotFoundException e) {
        	logger.error(e.getMessage(),e);
        }
        return is;
    }
}