package com.linewell.core.db;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.linewell.core.util.Reflection;
import com.linewell.core.util.StrUtil;

/**
 * <p>
 * DB通用对象构建
 * </p>
 * 
 * @author 文件创建者姓名:张建辉 zjianhui@linewell.com
 * @version 1.0.0 date: 
 * <p>
 * Copyright (c) Jul 7, 2011 Linewell.com
 * </p>
 */
public class DbObjectBuilder {
		
	/**
	 * 构建数据库插入语句
	 * 例：insert(column1,column2)values(?,?)
	 * @author zjianhui@linewell.com
	 * @date: Jul 7, 2011 
	 * <p>
	 * @param obj javaBean对象
	 * @param tableName  需要操作的表
	 * @return 构建后的sql
	 * </p>
	 */
	public String createDBInsertSql(Object obj,String tableName){
		Reflection rf = new Reflection();
		// 获取所有的setter名称
		List setter = rf.getGetterMethodName(obj);
		String tmpStr = "";
		StringBuffer sb = new StringBuffer();
		sb.append("insert into "+tableName+" (");
		if (setter.size() > 0) {
			for (int i = 0; i < setter.size(); i++) {
				tmpStr = (String) setter.get(i); 
				sb.append(tmpStr);
				if(i < setter.size()-1){
					sb.append(",");
				}
			}
		}
		
		sb.append(")values(");
		if (setter.size() > 0) {
			for (int i = 0; i < setter.size(); i++) {
				sb.append("?");
				if(i < setter.size()-1){
					sb.append(",");
				}
			}
		}
		
		sb.append(")");
		return sb.toString();			
	}
	
	/**
	 * 构建数据库插入对象数组参数
	 * @author zjianhui@linewell.com
	 * @date: Jul 7, 2011 
	 * <p>
	 * @param obj javaBean对象
	 * @param tableName  需要操作的表
	 * @return 构建后的对象数组
	 * </p>
	 */
	public Object[] createDBInsertParams(Object obj,String tableName){
		Reflection rf = new Reflection();
		// 获取所有的setter名称
		List setter = rf.getGetterMethodName(obj);
		Object[] params = new Object[setter.size()]; 
		if (setter.size() > 0) {
			for (int i = 0; i < setter.size(); i++) {
				params[i] = rf.invokeGetter(obj, (String) setter.get(i));  
			}
		}
		return params;
	}	
	
	/**
	 * 构建数据库更新语句
	 * 例：insert(column1,column2)values(?,?)
	 * @author zjianhui@linewell.com
	 * @date: Jul 7, 2011 
	 * <p>
	 * @param obj javaBean对象
	 * @param tableName  需要操作的表
	 * @return 构建后的sql
	 * </p>
	 */
	public String createDBUpdateSql(Object obj,String tableName,String keyStr){
		Reflection rf = new Reflection();
		// 获取所有的setter名称
		List setter = rf.getGetterMethodName(obj);
		String tmpStr = "";
		StringBuffer sb = new StringBuffer();
		sb.append("update "+tableName+" set ");
		if (setter.size() > 0) {
			for (int i = 0; i < setter.size(); i++) {
				tmpStr = (String) setter.get(i);
				sb.append(tmpStr+"=?");
				if(i < setter.size()-1){
					sb.append(",");
				}
			}
		}
		sb.append(" where ");
		//modify by chh 支持联合主键 2012-7-30
		String []keys  =keyStr.split(",");
		for(int i=0;i<keys.length;i++){
			if(i==keys.length-1){
				sb.append(" "+keys[i]+"=? ");
			}else{
				sb.append(" "+keys[i]+"=? and ");
			}
			
		}
		
		return sb.toString();
	}
	
	/**
	 * 构建数据库更新对象数组参数
	 * @author zjianhui@linewell.com
	 * @date: Jul 7, 2011 
	 * <p>
	 * @param obj javaBean对象
	 * @param tableName  需要操作的表
	 * @return 构建后的对象数组
	 * </p>
	 */
	public Object[] createDBUpdateParams(Object obj,String tableName,String keyStr){
		Reflection rf = new Reflection();
		String [] keys =keyStr.split(",");
		// 获取所有的setter名称
		List setter = rf.getGetterMethodName(obj);

		Object[] params = new Object[setter.size()+keys.length]; 
		if (setter.size() > 0) {
			for (int i = 0; i < setter.size(); i++) {
				params[i] = rf.invokeGetter(obj, (String) setter.get(i));  
			}
		}
		for(int i =0;i<keys.length;i++){
			params[setter.size()+i] =  rf.invokeGetter(obj, keys[i]);  
		}
		
		return params;
	}
		
	/**
	 * 构建数据库查询所有字段sql
	 * @author zjianhui@linewell.com
	 * @date: Jul 7, 2011 
	 * <p>
	 * @param obj
	 * @param tableName
	 * @param keyStr主键字段名
	 * @param keyValue 主键字段值
	 * @return
	 * </p>
	 */
	public String createDbSelectSql(Object obj,String tableName,String keyStr,String keyValue){
		Reflection rf = new Reflection();
		// 获取所有的setter名称
		List setter = rf.getGetterMethodName(obj);
		StringBuffer sb = new StringBuffer();
		sb.append("select ");
		if (setter.size() > 0) {
			for (int i = 0; i < setter.size(); i++) {
				String tmpStr = (String) setter.get(i);
				sb.append((i == 0 ? "" : ",") + tmpStr);
			}
		}
		
		sb.append(" from "+tableName+" where 1=1 ");
		if(null!=keyStr && !keyStr.equals("")){
			sb.append("and "+ keyStr+"='"+keyValue+"' ");
		}
		return sb.toString();
	}
	
	/**
	 * 构建数据库查询所有字段sql,允许多字段
	 * @param obj
	 * @param tableName
	 * @param keyStr
	 * @param keyValue
	 * @return
	 */
	public String createDbSelectSqlMoreField(Object obj,String tableName,String keyStr,String keyValue){
		Reflection rf = new Reflection();
		// 获取所有的setter名称
		List setter = rf.getGetterMethodName(obj);
		String tmpStr = "";
		StringBuffer sb = new StringBuffer();
		sb.append("select ");
		if (setter.size() > 0) {
			for (int i = 0; i < setter.size(); i++) {
				tmpStr = (String) setter.get(i);
				sb.append(tmpStr);
				if(i < setter.size()-1){
					sb.append(",");
				}
			}
		}
		
		sb.append(" from "+tableName+" where 1=1 ");
		if(null!=keyStr && !keyStr.equals("")&& null!=keyValue && !keyValue.equals("")){
			String[] keyStrs=keyStr.split(",");
			String[] keyValues=keyValue.split(",");
			for(int i=0;i<keyStrs.length;i++){
				String str=keyStrs[i];
				String value=keyValues[i];
				if(null!=str && !str.equals("")&& null!=value && !value.equals("")){
					sb.append("and "+ str+"='"+value+"' ");
				}
			}
		}
		return sb.toString();
	}
	
	/**
	 * 封装javaBean，通过Jdbctool查询出来的字符串二维数组
	 * @author zjianhui@linewell.com
	 * @date: Jul 8, 2011 
	 * <p>
	 * @param rs
	 * @param obj
	 * @return
	 * </p>
	 */
	public Object createDBObjectBySz(Object[][] rs,Object obj){
		Reflection rf = new Reflection();
		// 获取所有的setter名称
		Map map = rf.getSetterMethodNameAndReturnType(obj);
		int i = 0;
		if (null != map && !map.isEmpty()) {
			Iterator it = map.entrySet().iterator(); 
			while (it.hasNext()) {
				Map.Entry entry = (Map.Entry) it.next(); 
				String key = entry.getKey().toString(); 
				Object value = entry.getValue(); 
				if(value.equals(int.class)){
					rf.invokeSetter(obj, (String) key,Integer.parseInt(StrUtil.formatNull(StrUtil.objectToString(rs[1][i]), "0")),value); 
				}else{
					rf.invokeSetter(obj, (String) key,rs[1][i],value); 
				}
				i = i + 1;
			} 
		}
		
		return obj;
	}
	
	
	/**
	 * 封装javaBean List，通过Jdbctool查询出来的字符串二维数组
	 * @author zjianhui@linewell.com
	 * @date: Jul 8, 2011 
	 * <p>
	 * @param rs
	 * @param obj
	 * @return
	 * </p>
	 */
	public List createDBObjectListBySz(Object[][] rs,Object[] obj){
		List list = new ArrayList();
		for (int j = 1; j < rs.length; j++) {
			Reflection rf = new Reflection();
			// 获取所有的setter名称
			Map map = rf.getSetterMethodNameAndReturnType(obj[j-1]);
			int i = 0;
			if (null != map && !map.isEmpty()) {
				Iterator it = map.entrySet().iterator(); 
				while (it.hasNext()) {
					Map.Entry entry = (Map.Entry) it.next(); 
					String key = entry.getKey().toString(); 
					Object value = entry.getValue(); 
					rf.invokeSetter(obj[j-1], (String) key,rs[j][i],value); 
					i = i + 1;
				}
			}
			Object objtmp = new Object();
			objtmp = obj[j-1];
			list.add(objtmp);
		}
		return list;
	}
}
