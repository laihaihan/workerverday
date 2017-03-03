

package com.linewell.core.sync;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.gencode.GenCodeManagerFactory;
import com.linewell.core.gencode.GenCodeManagerInterface;
import com.linewell.core.util.PrintUtil;
import com.linewell.core.util.StrUtil;
import com.opensymphony.xwork2.ActionSupport;

/**
 *功能说明：网闸同步配置
 *<P></P>
 *@author chh
 *@since 2012
 *
 */
public class NetBrakeSyncConfigurateAction  extends ActionSupport {
	
	private static final long serialVersionUID = -5820810860876780048L;
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();	
		HttpServletResponse response = ServletActionContext.getResponse();	
		String jndi = request.getParameter("jndiName");
		GenCodeManagerFactory genCodeManagerFactory = new GenCodeManagerFactory();
		GenCodeManagerInterface genCodeManager = genCodeManagerFactory.build(jndi);
		String fn = request.getParameter("fn");
		boolean flag =true;
		//待选择表
		if("showAllTable".equalsIgnoreCase(fn)){
			String selectTable = request.getParameter("selectTable");
			List<Map<String, String>> list = genCodeManager.selectAllTablesName(jndi);
			request.setAttribute("TableNames", list);
			request.setAttribute("selectTable", selectTable);
			return "choosetable";
			
		}
		else if("gen".equals(fn)){
			String tableName = request.getParameter("sp_table");
			if(!StrUtil.isNull(tableName)){
				NetBrakeParameter eBrakeParms =getExportBrakeParameter(request);
				NetBrakeParameter iBrakeParms =getImportBrakeParameter(request);
				NetBrakeFactory.getInstance().generate(eBrakeParms, iBrakeParms);
			}
			
		}
		JSONObject json = new JSONObject();
		json.put("result", flag);
		PrintUtil.print(response, json.toString());
		return null;
	}
	/**
	 * 
	 * 功能说明：获取导出参数
	 * @param request
	 * @return
	 * NetBrakeParameter
	 * @author chh
	 * @May 22, 2012
	 */
	private NetBrakeParameter getExportBrakeParameter(HttpServletRequest request){
		String jndi = request.getParameter("jndiName");
		String jspPath = request.getParameter("jspPath");
		String orcl = request.getParameter("eOrcl");
		String password = request.getParameter("ePassword");
		String username = request.getParameter("eUsername");
		String tableName = request.getParameter("sp_table");
		String isRun = request.getParameter("isRun");
		String eTablespace = request.getParameter("eTablespace");
		
		NetBrakeParameter eBrakeParams =new NetBrakeParameter();
		eBrakeParams.setJndi(jndi);
		eBrakeParams.setOrcl(orcl);
		eBrakeParams.setPassword(password);
		eBrakeParams.setUserName(username);
		eBrakeParams.setTableSpace(eTablespace);
		eBrakeParams.setRun(Boolean.valueOf(isRun));
		if(!StrUtil.isNull(tableName)){
			String [] tables =tableName.split(",");
			eBrakeParams.setTables(tables);
		}
		eBrakeParams.setPath(jspPath);
		
		return eBrakeParams;
	}
	/**
	 * 
	 * 功能说明：获取导入的参数
	 * @param request
	 * @return
	 * NetBrakeParameter
	 * @author chh
	 * @May 22, 2012
	 */
	private NetBrakeParameter getImportBrakeParameter(HttpServletRequest request){
		NetBrakeParameter iBrakeParams =new NetBrakeParameter();
		String orcl = request.getParameter("iOrcl");
		String password = request.getParameter("iPassword");
		String username = request.getParameter("iUsername");
		String iTablespace = request.getParameter("iTablespace");
		iBrakeParams.setOrcl(orcl);
		iBrakeParams.setUserName(username);
		iBrakeParams.setPassword(password);
		iBrakeParams.setTableSpace(iTablespace);
		
		return iBrakeParams;
	}

}

