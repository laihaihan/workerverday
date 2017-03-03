package com.linewell.core.db.orm;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Table;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ArrayHandler;
import org.apache.commons.dbutils.handlers.ArrayListHandler;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class TableProperty {
	/**
	 * Logger for this class
	 */
	private static final Log logger = LogFactory.getLog(TableProperty.class);

	/** 表名 */
	private String tableName;

	/** 主键 */
	private String pk;

	/** 类名 */
	private String className;

	/** bean字段属性名 */
	private String[] beanProperty;
	
	/** bean table 映射关系 如:String[0][0] bean 属性; String[0][1] 表字段 **/
	private String[][] beanTableMap = new String[2][];
	
	/** 插入语句 */
	private StringBuffer insertSql = new StringBuffer();
	
	/** 更新语句 */
	private StringBuffer updateSql = new StringBuffer();
	
	/** 通过主键查询一语句 */
	private StringBuffer selectByIdSql = new StringBuffer();

	/** 查询语句 */
	private StringBuffer selectWhereSql = new StringBuffer();

	private TableProperty() {
	}
	
	/*
	public TableProperty(Connection conn, Class<?> clazz) {
		init(conn, clazz);
	}
	*/

	public TableProperty(Class<?> clazz) {
		init(clazz);
	}

	private void init(Class<?> clazz) {

		this.className = StringUtils.substringAfterLast(clazz.getName(), ".");
		this.tableName = getTable(clazz);

		StringBuffer insertField = new StringBuffer();
		StringBuffer insertValues = new StringBuffer();

		StringBuffer updateSetFields = new StringBuffer();
		StringBuffer selectFields = new StringBuffer();

		String beanProperty = "";//bean 属性
		String tableColumn = "";//table 字段
		
		Field[] fields = clazz.getDeclaredFields();
		int i = 0;
		for (Field field : fields) {
			if (field.isAnnotationPresent(Column.class)) {
				Column column = field.getAnnotation(Column.class);
				String name = column.name();
				String prop = field.getName();

				if (column.unique()) {
					pk = name;
					beanProperty = prop + beanProperty;
					tableColumn = name +tableColumn;
				}
				beanProperty += "," + prop;
				tableColumn += "," + name;
				
				insertField.append(i == 0 ? name : "," + name);
				insertValues.append(i == 0 ? "?" : ",?");

				updateSetFields
						.append(i == 0 ? name + "=?" : "," + name + "=?");

				selectFields.append(i == 0 ? name : "," + name);
				selectFields.append(" ");
				selectFields.append(prop);

				i++;
			}
		}

		insertSql.append("INSERT INTO ");
		insertSql.append(this.tableName);
		insertSql.append(" (");
		insertSql.append(insertField);
		insertSql.append(") ");
		insertSql.append("VALUES (");
		insertSql.append(insertValues);
		insertSql.append(")");

		updateSql.append("UPDATE ");
		updateSql.append(this.tableName);
		updateSql.append(" SET ");
		updateSql.append(updateSetFields);
		updateSql.append(" WHERE ");
		updateSql.append(this.pk);
		updateSql.append("=?");

		selectByIdSql.append("SELECT ");
		selectByIdSql.append(selectFields);
		selectByIdSql.append(" FROM ");
		selectByIdSql.append(this.tableName);
		selectByIdSql.append(" WHERE ");
		selectByIdSql.append(this.pk);
		selectByIdSql.append("=?");

		selectWhereSql.append("SELECT ");
		selectWhereSql.append(selectFields);
		selectWhereSql.append(" FROM ");
		selectWhereSql.append(this.tableName);
		selectWhereSql.append(" ");

		//logger.debug("insertSql:" + insertSql);
		//logger.debug("updateSql:" + updateSql);
		//logger.debug("selectByIdSql:" + selectByIdSql);
		//logger.debug("selectWhereSql:" + selectWhereSql);
		
		this.beanProperty = beanProperty.split(",");
		this.beanTableMap[0] = this.beanProperty;
		this.beanTableMap[1] = tableColumn.split(",");
	}
	
	/**
	 * @deprecated
	 */
	private void init(Connection conn, Class<?> clazz) {

		this.className = StringUtils.substringAfterLast(clazz.getName(), ".");
		this.tableName = setDbTableName(conn);
		this.pk = setTablePk(conn);

		// String dataTypeSql = "SELECT
		// USER_TAB_COLUMNS.COLUMN_NAME,USER_TAB_COLUMNS.DATA_TYPE FROM
		// USER_TAB_COLUMNS WHERE USER_TAB_COLUMNS.TABLE_NAME='"
		// + this.tableName + "'";
		String columnNameSql = "SELECT USER_COL_COMMENTS.COLUMN_NAME,USER_COL_COMMENTS.COMMENTS FROM USER_COL_COMMENTS WHERE USER_COL_COMMENTS.TABLE_NAME = '"
				+ this.tableName
				+ "' AND USER_COL_COMMENTS.COMMENTS LIKE '#[%'";
		// String columnNameSql = "SELECT
		// USER_COL_COMMENTS.COLUMN_NAME,USER_COL_COMMENTS.COMMENTS FROM
		// USER_COL_COMMENTS ,USER_TAB_COLS "
		// + "WHERE USER_COL_COMMENTS.TABLE_NAME='"
		// + this.tableName
		// + "' AND USER_TAB_COLS.COLUMN_NAME=USER_COL_COMMENTS.COLUMN_NAME AND
		// USER_COL_COMMENTS.COMMENTS LIKE '#[%'"
		// + " ORDER BY USER_TAB_COLS.COLUMN_ID";

		QueryRunner qr = new QueryRunner(true);

		try {
			// List<Object[]> dataType = qr.query(conn, dataTypeSql, new
			// ArrayListHandler());
			List<Object[]> columnName = qr.query(conn, columnNameSql,
					new ArrayListHandler());

			StringBuffer insertField = new StringBuffer();
			StringBuffer insertValues = new StringBuffer();

			StringBuffer updateSetFields = new StringBuffer();
			StringBuffer selectFields = new StringBuffer();

			beanProperty = new String[columnName.size() + 1];
			for (int i = 0; i < columnName.size(); i++) {
				String key = String.valueOf(columnName.get(i)[0]);

				// this.dataType.put(key, dataType.get(i)[1]);

				Object obj = columnName.get(i)[1];
				if (obj != null) {
					String prop = obj.toString();

					if (StringUtils.startsWith(prop, "#[")) {
						prop = StringUtils.substringBetween(prop, "#[", "]");
						beanProperty[i + 1] = prop;

						insertField.append(i == 0 ? key : "," + key);
						insertValues.append(i == 0 ? "?" : ",?");

						updateSetFields.append(i == 0 ? key + "=?" : "," + key
								+ "=?");

						selectFields.append(i == 0 ? key : "," + key);
						selectFields.append(" AS ");
						selectFields.append(prop);

						if (key.equals(pk)) {
							beanProperty[0] = prop;
						}
					}
				}

			}
			insertSql.append("INSERT INTO ");
			insertSql.append(this.tableName);
			insertSql.append(" (");
			insertSql.append(insertField);
			insertSql.append(") ");
			insertSql.append("VALUES (");
			insertSql.append(insertValues);
			insertSql.append(")");

			updateSql.append("UPDATE ");
			updateSql.append(this.tableName);
			updateSql.append(" SET ");
			updateSql.append(updateSetFields);
			updateSql.append(" WHERE ");
			updateSql.append(this.pk);
			updateSql.append("=?");

			selectByIdSql.append("SELECT ");
			selectByIdSql.append(selectFields);
			selectByIdSql.append(" FROM ");
			selectByIdSql.append(this.tableName);
			selectByIdSql.append(" WHERE ");
			selectByIdSql.append(this.pk);
			selectByIdSql.append("=?");

			selectWhereSql.append("SELECT ");
			selectWhereSql.append(selectFields);
			selectWhereSql.append(" FROM ");
			selectWhereSql.append(this.tableName);
			selectWhereSql.append(" ");

		} catch (SQLException e) {
			logger.error(e);
		}
	}
	
	/**
	 * 获取表名
	 * @param clazz
	 * @return
	 */
	private String getTable(Class<?> clazz){
		String tableName = "";
		
		if (clazz.isAnnotationPresent(Table.class)) {
			tableName = clazz.getAnnotation(Table.class).name();
		}else{
			logger.debug(clazz.getName()+"未注解@Table名称");
		}
		
		return tableName;
	}

	/**
	 * 获取数据库表名
	 * 
	 * @param conn
	 * @return
	 */
	private String setDbTableName(Connection conn) {
		String tableName = null;
		try {
			String sql = "SELECT TABLE_NAME FROM USER_TAB_COMMENTS T WHERE T.COMMENTS LIKE '#["
					+ this.className
					+ "]%' AND TABLE_NAME NOT LIKE 'BIN$%==$0'";
			QueryRunner qr = new QueryRunner(true);
			Object[] obj = qr.query(conn, sql, new ArrayHandler());

			if (obj != null && obj.length > 0) {
				tableName = String.valueOf(obj[0]);
			} else {
				throw new SQLException(this.className + "未关联表");
			}

		} catch (SQLException e) {
		    logger.error(e);
		}
		return tableName;
	}

	private String setTablePk(Connection conn) {
		String pk = null;

		try {
			String sql = " select cu.column_name from user_cons_columns cu, user_constraints au where cu.constraint_name = au.constraint_name and au.constraint_type = 'P' and au.table_name = '"
					+ this.tableName + "'";

			QueryRunner qr = new QueryRunner(true);
			Object[] obj = qr.query(conn, sql, new ArrayHandler());

			if (obj != null && obj.length > 0) {
				pk = String.valueOf(obj[0]);

			} else {
				throw new SQLException(this.tableName + "未设置主键");
			}

		} catch (SQLException e) {
		    logger.error(e);
		}

		return pk;
	}

	public String getInsertSql() {
		return insertSql.toString();
	}

	public String getUpdateSql() {
		return updateSql.toString();
	}

	public String getPk() {
		return pk;
	}

	public String getTableName() {
		return tableName;
	}

	public String[] getBeanProperty() {
		return beanProperty;
	}

	public String getSelectByIdSql() {
		return selectByIdSql.toString();
	}

	public String getSelectWhereSql() {
		return selectWhereSql.toString();
	}

}