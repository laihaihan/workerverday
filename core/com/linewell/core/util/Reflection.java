package com.linewell.core.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.Blob;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import net.sf.hibernate.Hibernate;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * <p>
 * 	反射封装
 * </p>
 * @author 文件创建者姓名:张建辉 zjianhui@linewell.com
 * @version 1.0.0 date: 
 * <p>
 * Copyright (c) Jul 6, 2011 Linewell.com
 * </p>
 */
public class Reflection {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(Reflection.class); 

	/**
	 * 获取一个类的父类所有getXX方法get后面的字符串
	 * 
	 * @param Object:类实例
	 * @return List 元素为String
	 */
	public List getGetterMethodName(Object o) {
		Class c = o.getClass();
		Map map = getAllMethods(c);
		return consistName(map, "get");
	}

	public Map getSetterMethodNameAndReturnType(Object o) {
		Class c = o.getClass();
		Map map = getAllMethodsAndReruenType(c);
		return consistNameMap(map, "get");
	}
	
	/**
	 * 过滤
	 * @param c
	 * @param startsWithName
	 * @return
	 */
	private Map consistNameMap(Map map, final String startsWithName) {
		Map retMap = new LinkedHashMap();
		if (null != map && !map.isEmpty()) {
			Iterator it = map.entrySet().iterator(); 
			while (it.hasNext()) { 
				Map.Entry entry = (Map.Entry) it.next(); 
				String key = entry.getKey().toString(); 
				Object value = entry.getValue(); 
				if (key.startsWith(startsWithName)) {
					key = key.substring(3,key.length());
					if(!key.toUpperCase().equals("CLASS")&&typeFilter(value.toString())){
						retMap.put(key, value);
					}					
				}
			} 
		}
		return retMap;
	}
	
	private List consistName(Map map, final String startsWithName) {
		List list = new ArrayList();
		if (null != map && !map.isEmpty()) {
			Iterator iter = map.entrySet().iterator(); 
			while (iter.hasNext()) { 
				Map.Entry entry = (Map.Entry) iter.next(); 
				String key = entry.getKey().toString(); 
				String val = entry.getValue().toString();
				if (key.startsWith(startsWithName)) {
					key = key.substring(3,key.length());
					if(!key.toUpperCase().equals("CLASS") &&typeFilter(val)){
						list.add(key);
					}
				}
			} 
		}
		return list;
	}

	/**
	 * 过滤目前数据库字段映射支持类型
	 * @param type
	 * @return
	 */
	private boolean typeFilter(String type){
		if(type.equals("class java.lang.String") || type.equals("class java.lang.Long") 
				|| type.equals("interface java.sql.Blob") ||
				type.equals("long") ||type.equals("int") ||
				type.equals("double") ||type.equals("float") ||
				type.equals("class java.sql.Timestamp") ||
				type.equals("interface java.sql.Clob") ||
				type.equals("class java.lang.Float") ||
				type.equals("class java.lang.Double") ){
			return true;
		}else{
			return false;
		}
		
	}
	
	/**
	 * 得到一个类中所有方法名和返回值类型
	 * 
	 * @return ArrayList:包含所有公开方法名的集合
	 */
	private Map getAllMethodsAndReruenType(Class c) {
		LinkedHashMap map = new LinkedHashMap();
		Method[] methods = c.getMethods();
		if (null != methods && methods.length > 0) {
			for (int i = 0; i < methods.length; i++) {
				map.put(methods[i].getName(), methods[i].getReturnType());
			}
		}
		return map;
	}
	
	/**
	 * 得到一个类中所有方法名
	 * 
	 * @return ArrayList:包含所有公开方法名的集合
	 */
	private Map getAllMethods(Class c) {
		Map map = new LinkedHashMap();
		Method[] methods = c.getMethods();
		if (null != methods && methods.length > 0) {
			for (int i = 0; i < methods.length; i++) {
				map.put(methods[i].getName(), methods[i].getReturnType());
			}
		}
		return map;
	}

	private List getDeclaredMethods(Class c) {
		List array = new ArrayList();
		Method[] methods = c.getDeclaredMethods();
		if (null != methods && methods.length > 0) {
			for (int i = 0; i < methods.length; i++) {
				array.add(methods[i].getName());
			}
		}
		return array;
	}
	
	 /**   
     * 调用指定属性的setter方法   
     * @param beanName-------mySession中的key，通过它可以获取到对应的JavaBean对象   
     * @param propertyName---外部资源文件中的name，通过它构造setter方法   
     * @param propertyValue--外部资源文件中的value，通过它指定构造的setter的参数值   
	 * @throws NoSuchMethodException 
	 * @throws SecurityException 
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 * @throws IllegalArgumentException 
     */   
    public Object invokeGetter(Object obj, String propertyName){    
    	Class clazz = obj.getClass();    
        //动态构造一个setter方法，比如name --> setName    
        String methodName = "get" + propertyName.substring(0,1).toUpperCase() + propertyName.substring(1);    
        Method method = null;
		try {
			method = clazz.getMethod(methodName);
		} catch (SecurityException e) {
		    logger.error(e);
		} catch (NoSuchMethodException e) {
		    logger.error(e);
		}    
        Object retrunValue = null;
		try {
			retrunValue = method.invoke(obj);
		} catch (IllegalArgumentException e) {
		    logger.error(e);
		} catch (IllegalAccessException e) {
		    logger.error(e);
		} catch (InvocationTargetException e) {
		    logger.error(e);
		} 
        return retrunValue;
    } 
	
    /**   
     * 调用指定属性的setter方法   
     * @param beanName-------mySession中的key，通过它可以获取到对应的JavaBean对象   
     * @param propertyName---外部资源文件中的name，通过它构造setter方法   
     * @param propertyValue--外部资源文件中的value，通过它指定构造的setter的参数值   
	 * @throws NoSuchMethodException 
	 * @throws SecurityException 
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 * @throws IllegalArgumentException 
     */   
    public Object invokeSetter(Object obj, String propertyName,Object propertyValue,Object returnType){    
    	Class clazz = obj.getClass();    
        //动态构造一个setter方法，比如name --> setName    
        String methodName = "set" + propertyName.substring(0,1).toUpperCase() + propertyName.substring(1);    
        Method method = null;
		try {
			method = clazz.getMethod(methodName,(Class)returnType);
		} catch (SecurityException e) {
		    logger.error(e);
		} catch (NoSuchMethodException e) {
		    logger.error(e);
		}    
		try {
			Object objVal = null;
			if(returnType.toString().equals("interface java.sql.Clob")){
				objVal = Hibernate.createClob(propertyValue.toString());
			}else if(returnType.toString().equals("interface java.sql.Blob")){
				if(null != propertyValue && !StrUtil.isNull(propertyValue.toString())){
					objVal = (Blob)propertyValue;
				}
			}else if(returnType.toString().equals("class java.sql.Timestamp")){
				if(null == propertyValue || propertyValue.toString().equals("")){
					objVal = Timestamp.valueOf("0000-00-00 00:00:00");
				}else{
					objVal = Timestamp.valueOf(propertyValue.toString());
				}
			}else if(returnType.toString().equals("class java.lang.Float")){
				if("".equals(propertyValue)){
					propertyValue = "0";
				}
				objVal = Float.valueOf(propertyValue.toString());
			}else if(returnType.toString().equals("float")){
				if("".equals(propertyValue)){
					propertyValue = "0";
				}
				objVal = Float.valueOf(propertyValue.toString()).floatValue();
			}else if(returnType.toString().equals("double")){
				if("".equals(propertyValue)){
					propertyValue = "0";
				}
				objVal = Double.valueOf(propertyValue.toString()).doubleValue();
			}else if(returnType.toString().equals("class java.lang.Double")){
				if("".equals(propertyValue)){
					propertyValue = "0";
				}
				objVal = Double.valueOf(propertyValue.toString());
			}else if(returnType.toString().equals("long")){
				if("".equals(propertyValue)){
					propertyValue = "0";
				}
				objVal = Long.valueOf(propertyValue.toString()).longValue();
			}
			else if(returnType.toString().equals("class java.lang.Long")){
				if("".equals(propertyValue)){
					propertyValue = "0";
				}
				objVal = Long.valueOf(propertyValue.toString());
			}else if(returnType.toString().equals("int")){
				objVal = Integer.parseInt(String.valueOf(propertyValue));
			}else{
				objVal = propertyValue;
			}
			method.invoke(obj,objVal);
		} catch (IllegalArgumentException e) {
		    logger.error(e);
		    e.printStackTrace();
		} catch (IllegalAccessException e) {
		    logger.error(e);
		} catch (InvocationTargetException e) {
		    logger.error(e);
		}
        return obj;
    } 
    
    public Object copy(Object object) throws Exception {
		// 获得对象的类型
		Class classType = object.getClass();
		// 通过默认构造方法创建一个新的对象
		Object objectCopy = classType.getConstructor(new Class[] {}).newInstance(new Object[] {});
		// 获得对象的所有属性
		Field fields[] = classType.getDeclaredFields();
		for (int i = 0; i < fields.length; i++) {
			Field field = fields[i];
			if(field.toString().indexOf("final")>=0){ //过滤掉final 类型
				continue;	
			}
			String fieldName = field.getName();
			String firstLetter = fieldName.substring(0, 1).toUpperCase();
			// 获得和属性对应的getXXX()方法的名字
			String getMethodName = "get" + firstLetter + fieldName.substring(1);
			// 获得和属性对应的setXXX()方法的名字
			String setMethodName = "set" + firstLetter + fieldName.substring(1);
			// 获得和属性对应的getXXX()方法
			Method getMethod = classType.getMethod(getMethodName,new Class[] {});
			// 获得和属性对应的setXXX()方法
			Method setMethod = classType.getMethod(setMethodName,new Class[] { field.getType() });
			// 调用原对象的getXXX()方法
			Object value = getMethod.invoke(object, new Object[] {});
			// 调用复制对象的setXXX()方法
			setMethod.invoke(objectCopy, new Object[] { value });
		}
		return objectCopy;
	}
    
    public static void main(String[] args) {

	
    	
    }
    
}