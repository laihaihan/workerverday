package com.linewell.core.log;

import com.linewell.core.util.DateTime;
import com.linewell.core.util.UNIDGenerate;

public class LogBusiness {
	LogManager logManager = new LogManager();
    /**
     * 日志添加
     * 
     * @param punid		外键关联apas_info.unid
     * @param who		事件发送者
     * @param log_do	事件
     * @return
     */
    public boolean doSave(String punid, String who, String log_do,String log_what){
    	Log log = new Log();
    	log.setUnid(new UNIDGenerate().getUnid());
    	log.setPunid(punid);
    	log.setTarget_unid(punid);
    	log.setWho(who);
    	log.setLog_do(log_do);
    	log.setLog_what(log_what);
    	log.setLog_when(DateTime.getNowDateTime());
        return logManager.doSave(log);
    }
}
