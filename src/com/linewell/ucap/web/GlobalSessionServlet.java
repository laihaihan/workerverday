package com.linewell.ucap.web;

import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import com.linewell.ucap.frame.util.GlobalUtils;
import com.linewell.ucap.session.GlobalConfig;
import com.linewell.ucap.session.GlobalConfigItem;
import com.linewell.ucap.session.PersonalSession;
import com.linewell.ucap.util.DateTime;

public class GlobalSessionServlet extends HttpServlet
{
  private static final long serialVersionUID = 1L;

  public void init(ServletConfig config)
    throws ServletException
  {
    System.out.println("开始设置全局Resource缓存！" + DateTime.getNowDateTime());

    GlobalResourceCacheConfig.GetInstance();

    System.out.println("开始设置全局变量！" + DateTime.getNowDateTime());

    GlobalConfig gc = GlobalConfig.GetInstance();

    List globalConfig = gc.getGlobalConfigItems();

    super.init(config);

    for (Iterator iterator = globalConfig.iterator(); iterator
      .hasNext(); )
    {
      GlobalConfigItem globalConfigItem = (GlobalConfigItem)iterator.next();

      GlobalUtils.set(globalConfigItem);
    }

    PersonalSession.initParam();

   // System.out.println("开始加载UDDI配置！" + DateTime.getNowDateTime());
  //  UDDIConfig.init();
   // System.out.println("UDDI配置加载成功！" + DateTime.getNowDateTime());
  }
}