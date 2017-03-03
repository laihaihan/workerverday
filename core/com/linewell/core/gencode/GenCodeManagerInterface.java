package com.linewell.core.gencode;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.linewell.core.view.View;

public interface GenCodeManagerInterface {
	/**
	 *  查询对应jndi下所有表，并将表名称和字段名称封装成map，再将map以list的方式存储返回
	 * @param jndi 数据库JNDI
	 * @return
	 */
	public List<Map<String, String>> selectAllTablesName(String jndi) ;
	
	/**
	 * 自动生成封装bean
	 * @param jndiName
	 * @param bean
	 * @return
	 */
	public List<BeanBean> getBeansByJndiAndBean(String jndiName,BeanBean bean);
	/**
	 * 根据表名进行解析,生成Bean需要的相关信息
	 * @param jndiName
	 * @param bean 表对应Bean
	 * @return
	 */
	public BeanBean parseTableForBean(String jndiName,BeanBean bean);
	
	
	/**
	 * 创建默认格式的视图bean对象
	 * @param jndiName  
	 * @param bean
	 * @param jspPath
	 * @return
	 */
	public View createView(String jndiName,BeanBean bean,String jspPath);
	/**
	 * 自动创建新增和删除按钮
	 * @param viewUnid
	 * @return
	 */
	public boolean createDelAndAddButton(String viewUnid);
	/**
	 * 封装表字段下拉框列表
	 * @param beanpropertis
	 * @return
	 */
	public String createFieldSelect(List<BeanProperty> beanpropertis);
	
	/**
	 *  生成代码、jsp、模块、视图、按钮数据
	 * @param jndi
	 * @param request
	 * @return
	 */
	public boolean genCodeAll(String jndi,HttpServletRequest request);
	
	/**
	 * 根据表名组装表信息相应的SQL 第一列为字段名称, 第二列为字段类型, 第三列为字段默认值, 第四列为字段说明
	 * 
	 * @param tableName
	 * @return
	 */
	public String getFieldSqlByTable(String tableName) ;
	
	public  Object[][] getUcapApp();


}
