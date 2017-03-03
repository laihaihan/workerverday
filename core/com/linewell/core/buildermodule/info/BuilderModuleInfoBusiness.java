package com.linewell.core.buildermodule.info;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.linewell.core.buildermodule.GenCodeFactory;
import com.linewell.core.buildermodule.detail.BuilderModuleDetail;
import com.linewell.core.buildermodule.detail.BuilderModuleDetailBusiness;
import com.linewell.core.buildermodule.detail.BuilderModuleDetailManager;
import com.linewell.core.buildermodule.infterfacts.BuilderModuleGenCode;
import com.linewell.core.db.JDBCTool;
import com.linewell.core.util.DateTime;
import com.linewell.core.util.UNIDGenerate;
import com.linewell.ucap.platform.authorized.app.App;
import com.linewell.ucap.session.Session;

public class BuilderModuleInfoBusiness {
	BuilderModuleInfoManager builderModuleInfoManager = new BuilderModuleInfoManager();
	/**
	 * 记录是否存在
	 * @param unid
	 * @return
	 */
	public boolean isExits(String unid){
		BuilderModuleInfo builderModuleInfo = builderModuleInfoManager.doFindBeanByKey(unid);
		
		boolean flag = true;
		if(null == builderModuleInfo){
			flag = false;
		}
		return flag;
	}
	
	public List<BuilderModuleInfo> dofindAll(){
		BuilderModuleInfoManager builderModuleInfoManager =new  BuilderModuleInfoManager();
		List<BuilderModuleInfo> list = builderModuleInfoManager.doFindListByCondition(" 2=2", new Object[0]);
		return list;
	}
	
	/**
	 * 根据表名反向生成模型数据
	 * @param request
	 * @return
	 * @throws SQLException
	 */
	public boolean genModuleInfoByTable(HttpServletRequest request) throws SQLException{
		
		boolean flag = false;
    	Session ucapSession = (Session)request.getSession().getAttribute(Session.SESSION_NAME);
		App app = ucapSession.getApp();
		String tableName = request.getParameter("tablename");
		String unid = request.getParameter("unid");
		GenCodeFactory genCodeFactory = new GenCodeFactory();
		BuilderModuleGenCode builderModuleGenCode = genCodeFactory.build(app.getUnid());
		BuilderModuleDetailManager builderModuleDetailManager = new BuilderModuleDetailManager();
		//生成主表信息
		BuilderModuleInfoManager builderModuleInfoManager = new BuilderModuleInfoManager();
		BuilderModuleDetailBusiness builderModuleDetailBusiness = new BuilderModuleDetailBusiness();
		boolean isNew = false;
		BuilderModuleInfo builderModuleInfo = builderModuleInfoManager.doFindBeanByKey(unid);
		if(null == builderModuleInfo){
			builderModuleInfo = new BuilderModuleInfo();
			isNew = true;
		}
		builderModuleInfo.setUnid(unid);
		builderModuleInfo.setCreatetime(DateTime.getNowDateTime());
		builderModuleInfo.setAppunid(app.getUnid());
		builderModuleInfo.setLastmodifytime(DateTime.getNowDateTime());
		builderModuleInfo.setTablename(tableName);
		builderModuleInfo.setTitile(tableName);
		
		if(isNew){
			flag = builderModuleInfoManager.doSave(builderModuleInfo);
		}else{
			flag =builderModuleInfoManager.doUpdate(builderModuleInfo);
		}
		
		//生成从表信息
		String[][] rs = JDBCTool.doSQLQuery(app.getUnid(), builderModuleGenCode.getFieldSqlByTable(tableName));
		for (int i = 1; i < rs.length; i++) {
			if(!builderModuleDetailBusiness.ennameIsExit(unid, rs[i][0])&&!rs[i][0].toLowerCase().equals("unid")){//不存在则新增记录
				BuilderModuleDetail builderModuleDetail = new BuilderModuleDetail();
				builderModuleDetail.setUnid(new UNIDGenerate().getUnid());
				builderModuleDetail.setCaption(rs[i][3]);
				builderModuleDetail.setEnname(rs[i][0]);
				builderModuleDetail.setLengthlimit(500);
				builderModuleDetail.setPunid(unid);
				flag = flag && builderModuleDetailManager.doSave(builderModuleDetail);
			}
		}
		return flag;
	}
}
