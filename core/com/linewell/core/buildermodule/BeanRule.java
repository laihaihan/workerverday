package com.linewell.core.buildermodule;

/**
 * 封装bean生成规则
 * @author JSC
 *
 */
public class BeanRule {
	
	/**
	 * 根据表名生成Bean类名
	 * 规则为：首字母改成大写
	 * @param tablename
	 * @return
	 */
	public String getBeanName(String tableName){
		String beanName = tableName.substring(0,1).toUpperCase()+tableName.substring(1, tableName.length());
		return beanName;
	}
	

	/**
	 * 获取全包名
	 * 命名规则：com.linewell.+系统别名 + 小写表名
	 * @param tableName 表名
	 * @param sysAlias 系统别名
	 * @return
	 */
	public String getPackageName(String beanName , String sysAlias){
		String packageName = "com.linewell."+sysAlias + "."+beanName.toLowerCase();
		return packageName;
	}
	
	/**
	 * jsp存储路径
	 * @param tableName 表名
	 * @param sysAlias 系统别名
	 * @return
	 */
	public String getJspPath(String beanName , String sysAlias){
		String jspPath = sysAlias + "/jsp/" +beanName.toLowerCase() +"/"+ beanName.toLowerCase() + "_edit.jsp";
		return jspPath;
	}
	
	/**
	 * action 类调用路径
	 * @param tableName 表名
	 * @param sysAlias 系统别名
	 * @return
	 */
	public String getBeanAction(String beanName , String sysAlias){
		String actionName = getPackageName(beanName,sysAlias) + "." + getBeanName(beanName) + "Action";
		return actionName;
	}
	
	
}
