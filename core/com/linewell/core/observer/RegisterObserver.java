package com.linewell.core.observer;

import java.util.List;
import java.util.Observable;
import java.util.Observer;

import org.apache.log4j.Logger;

/**
 * 
 * <p>注册观察者</p>
 */
public class RegisterObserver {
    
    private static final Logger logger = Logger.getLogger(RegisterObserver.class.getName());
    
    /**
     * 具体操作配置文件
     */
    private String concreteAction = null;
    
    public void redister(Observable observable) {
        
        ObserverHelper observerHelper = new ObserverHelper();
        
        // 读取具体操作观察者配置文件
        ObserverConfig observerConfig = observerHelper.getObservers(this.concreteAction);
        if(null!=observerConfig){
            try {
                // 添加有效(启用)观察者
                List list = observerHelper.getValidateObservers(observerConfig);
                if(null!=list && list.size()>0){
                    for(int i=0; i<list.size(); i++){
                        observable.addObserver((Observer) list.get(i));
                    }
                } 
            } catch (InstantiationException e) {
            	logger.error(e.getMessage(), e);
            } catch (IllegalAccessException e) {
            	logger.error(e.getMessage(), e);
            } catch (ClassNotFoundException e) {
            	logger.error(e.getMessage(), e);
            }
        }
    }
    
    public void setConcreteAction(String concreteAction) {
        this.concreteAction = concreteAction;
    }
}