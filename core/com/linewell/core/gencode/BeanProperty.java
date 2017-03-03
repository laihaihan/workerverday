package com.linewell.core.gencode;

/**
 * <p>
 * 	bean 属性
 * </P>
 * 
 * @author zjianhui@linewell.com
 * @date 2012-2-3
 * @version 1.00
 * <p>
 * 	Copyright (c) 2011 www.linewell.com
 * </p>
 */
public class BeanProperty {
	private String name = "";
	private String type = "";
	private String comment = "";
	private String hName = "";
	private String fieldName = "";
	private String defaultValue = "";

	/**
	 * @return the fieldName
	 */
	public String getFieldName() {
		return fieldName;
	}

	/**
	 * @param fieldName the fieldName to set
	 */
	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
		String temp = name.substring(0, 1).toUpperCase() + name.substring(1);
		this.hName = temp;
	}

	/**
	 * @return String
	 */
	public String getHName() {
		return this.hName;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the comment
	 */
	public String getComment() {
		return comment;
	}

	/**
	 * @param comment
	 *            the comment to set
	 */
	public void setComment(String comment) {
		this.comment = comment;
	}

	public static class Type {
		public final static String STRING = "String";
		public final static String LONG = "long";
		public final static String INT = "int";
		public final static String BLOB = "BLOB";
		public final static String CLOB = "CLOB";

	}

	public String getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}
}
