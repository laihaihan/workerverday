package com.linewell.core.buildermodule.infterfacts;

import java.sql.SQLException;

import com.linewell.core.gencode.BeanBean;

public interface BuilderModuleGenCode {
	/**
	 * 根据表名进行解析,生成Bean需要的相关信息
	 * @param jndiName
	 * @param bean 表对应Bean
	 * @return
	 */
	public BeanBean parseTableForBean(String jndiName,BeanBean bean);
	
	

	/**
	 * 根据表名组装表信息相应的SQL 第一列为字段名称, 第二列为字段类型, 第三列为字段默认值, 第四列为字段说明
	 * 
	 * @param tableName 表名
	 * @return
	 */
	public String getFieldSqlByTable(String tableName) throws SQLException ;
	
	
	

	/**
	 * 动态生成表，如存在则只做字段和注释的追加
	 * @param unid  模型构建住表唯一标识
	 * @param jndi JNDI
	 * @param title  标题
	 * @param tableName   表名
	 * @return 操作是否成功
	 * @throws SQLException 
	 */
	public boolean genTable(String unid,String jndi,String title,String tableName) throws SQLException;
	
	
	/**
	 * 生成附件存储表
	 * @param jndi
	 * @return
	 * @throws SQLException 
	 */
	public boolean genFileTable(String jndi) throws SQLException;
}
