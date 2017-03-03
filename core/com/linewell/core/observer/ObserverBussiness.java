package com.linewell.core.observer;

import java.util.Observable;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.linewell.core.util.StrUtil;
import com.linewell.ucap.session.Session;

/**
 * 类说明：观察者业务类
 *
 * @author qcongyong 
 * @date 2011-12-27
 * @version 1.0  
 */
public class ObserverBussiness extends Observable {

    private static final Logger logger = Logger.getLogger(ObserverBussiness.class);
    
	public void execute(HttpServletRequest request){
        String observerName = request.getParameter("observerName");
        if(StrUtil.isNull(observerName)){
        	logger.error("请求中没有【observerName】参数，无法获取观察者配置文件！");
        	return;
        }
        
        /**
         * 注册观察者
         */
		Session ucapSession = (Session) request.getSession().getAttribute(Session.SESSION_NAME);
		String appName = ucapSession.getApp().getNameEn();
        RegisterObserver registerObserver = new RegisterObserver();
        registerObserver.setConcreteAction(appName+"/observer/" + observerName + ".xml");
        registerObserver.redister(this);
        
        /**
         * 通知观察者
         */
        this.setChanged();
        this.notifyObservers(request);
	}
}
