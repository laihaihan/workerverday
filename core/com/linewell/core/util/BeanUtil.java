package com.linewell.core.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.sql.Blob;
import java.sql.Clob;
import java.sql.SQLException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;

/**
 * <p>
 * bean操作类 
 * </P>
 * 
 * @author cyingquan@linewell.com
 * @version 1.00
 *          <p>
 *          Copyright (c) 2011 www.linewell.com
 *          </p>
 */
public class BeanUtil {
	/**
	 * Logger for this class
	 */
	private static final Log logger = LogFactory.getLog(BeanUtil.class);

	/**
	 * 来源类属性 更新到 目标类
	 * 
	 * @param dest
	 *            目标类
	 * @param orig
	 *            来源类(一般是formbean)
	 * @throws Exception
	 * @throws Exception
	 * @deprecated 请使用updateBean方法
	 */
	public static void updateProperties(Object dest, Object orig) {
		// System.out.println(System.currentTimeMillis());

		HttpServletRequest request = ServletActionContext.getRequest();

		if (request != null) {
			updateBean(request, dest);
			return;
		}

		Class classDest = dest.getClass();
		Class classOrig = orig.getClass();

		// if (!classDest.getName().equals(classOrig.getName())) {
		// throw new Exception("类型不一致");
		// }

		Field fieldDests[] = classDest.getDeclaredFields();
		Field fieldOrigs[] = classOrig.getDeclaredFields();

		for (int i = 0; i < fieldOrigs.length; i++) {
			Field fieldOrig = fieldOrigs[i];
			Field fieldDest = fieldDests[i];
			String fieldName = fieldOrig.getName();
			String firstLetter = fieldName.substring(0, 1).toUpperCase();

			// 获得和属性对应的getXXX()方法的名字
			String getMethodName = "get" + firstLetter + fieldName.substring(1);

			// 获得和属性对应的setXXX()方法的名字
			String setMethodName = "set" + firstLetter + fieldName.substring(1);

			try {
				// 获得来源目标类属性对应的getXXX()方法
				Method origGetMethod = classOrig.getMethod(getMethodName,
						new Class[] {});

				// 获得目标类属性对应的setXXX()方法
				Method destSetMethod = classDest.getMethod(setMethodName,
						new Class[] { fieldDest.getType() });

				// 调用源对象的getXXX()方法
				if (origGetMethod != null && destSetMethod != null) {
					Object valueOrig = origGetMethod.invoke(orig,
							new Object[] {});
					if (valueOrig != null && !"".equals(valueOrig)) {
						destSetMethod.invoke(dest, new Object[] { valueOrig });
					}
				}
			} catch (SecurityException e) {
			    logger.error(e);
			} catch (IllegalArgumentException e) {
			    logger.error(e);
			} catch (NoSuchMethodException e) {
			    logger.error(e);
			} catch (IllegalAccessException e) {
			    logger.error(e);
			} catch (InvocationTargetException e) {
			    logger.error(e);
			}

		}
	}

	/**
	 * 从页面参数获取值来更新bean
	 * 
	 * @param request
	 *            HttpServletRequest
	 * @param bean
	 */
	public static void updateBean(HttpServletRequest request, Object bean) {

		Enumeration em = request.getParameterNames();
		while (em.hasMoreElements()) {
			String param = em.nextElement().toString();
			String paramProperty = "";
			if(param.indexOf("[]")>=0){
				paramProperty =param.substring(param.lastIndexOf("[]")+2);
			}else{
				paramProperty =param; 
			}
			if (jodd.bean.BeanUtil.hasProperty(bean,paramProperty)) {
				try {
					Class type = jodd.bean.BeanUtil.getPropertyType(bean, paramProperty);
					String value = request.getParameter(param);
 
					if (Clob.class.getName().equals(type.getName())) {
						Clob clob = ClobUtil.StrToClob(value);
						jodd.bean.BeanUtil.setProperty(bean, paramProperty, clob);
					} else {
						jodd.bean.BeanUtil.setProperty(bean, paramProperty, value);
					}
				} catch (RuntimeException e) {
					e.printStackTrace();
					logger.error(e);
				}
			}
		}
	}

	/**
	 * 创建formbean
	 * 
	 * @param clazz
	 * @param request
	 * @return bean类型
	 * @deprecated 请使用 createBean方法
	 */
	public static Object getFormBean(Class clazz, HttpServletRequest request) {
		Object obj = null;
		try {
			obj = Class.forName(clazz.getName()).newInstance();

		} catch (InstantiationException e1) {
		    logger.error(e1);
		} catch (IllegalAccessException e1) {
		    logger.error(e1);
		} catch (ClassNotFoundException e1) {
		    logger.error(e1);
		}

		Map paramMap = getParams(request);

		Class classType = obj.getClass();
		// 获得对象的所有属性

		Field fields[] = classType.getDeclaredFields();
		for (int i = 0; i < fields.length; i++) {
			Field field = fields[i];

			String fieldName = field.getName();
			String firstLetter = fieldName.substring(0, 1).toUpperCase();
			String setMethodName = "set" + firstLetter + fieldName.substring(1);

			try {
				Method setMethod = classType.getMethod(setMethodName,
						new Class[] { field.getType() });
				Object value = paramMap.get(fieldName.toLowerCase());
				if (value != null) {
					Class<?> type = field.getType();

					if ("java.lang.String".equals(type.getName())) {
						setMethod.invoke(obj, new Object[] { value });

					} else if (type.equals(Integer.TYPE)) {
						setMethod.invoke(obj, new Object[] { Integer
								.parseInt(value.toString()) });

					} else if (type.equals(Long.TYPE)) {
						setMethod.invoke(obj, new Object[] { Long.valueOf(
								value.toString()).longValue() });

					} else if (type.equals(Double.TYPE)) {

					} else if (type.equals(Float.TYPE)) {

					} else if (type.equals(Short.TYPE)) {

					} else if (type.equals(Byte.TYPE)) {

					} else if (type.equals(Character.TYPE)) {

					} else if (type.equals(Boolean.TYPE)) {

					}
				}
			} catch (SecurityException e) {
			    logger.error(e);
			} catch (IllegalArgumentException e) {
			    logger.error(e);
			} catch (NoSuchMethodException e) {
			    logger.error(e);
			} catch (IllegalAccessException e) {
			    logger.error(e);
			} catch (InvocationTargetException e) {
			    logger.error(e);
			}
		}
		return obj;
	}

	/**
	 * 创建bean
	 * 
	 * @param <T>
	 * @param clazz
	 * @param request
	 * @return <T>
	 */
	public static <T> T createBean(Class<T> clazz, HttpServletRequest request) {
		try {
			T t = clazz.newInstance();

			Method[] methods = clazz.getMethods();
			for (Method method : methods) {
				if (Modifier.isStatic(method.getModifiers())) {
					continue;
				}
				if (!void.class.equals(method.getReturnType())) {
					continue;
				}
				if (method.getParameterTypes().length != 1) {
					continue;
				}
				if (!method.getName().startsWith("set")) {
					continue;
				}
				if (method.getName().length() < 4) {
					continue;
				}
				Class[] paramTypes = method.getParameterTypes();
				//System.out.println(getSetterName(method));
				Object value = request.getParameter(getSetterName(method));
				String className = paramTypes[0].getName();

				if (null == value) {
					continue;

				} else if (String.class.getName().equals(className)) {
					method.invoke(t, ((String) value).trim());

				} else if ("int".equals(className)) {
					method.invoke(t, Integer.parseInt(value.toString()));

				} else if (Integer.class.getName().equals(className)) {
					method.invoke(t, ((Integer) value).intValue());

				} else if (Long.class.getName().equals(className)) {
					method.invoke(t, ((Long) value).longValue());

				} else if (Float.class.getName().equals(className)) {
					method.invoke(t, ((Float) value).floatValue());

				} else if (Clob.class.getName().equals(className)) {
					Clob clob = (Clob) value;
					if (clob != null) {
						method.invoke(t, clob.getSubString(1, (int) clob
								.length()));
					}

				} else if (Blob.class.getName().equals(className)) {
					String content = "";
					Blob blob = (Blob) value;
					content = new String(blob.getBytes((long) 1, (int) blob
							.length()));
					method.invoke(t, content);
				}
			}
			return t;

		} catch (InstantiationException e) {
		    logger.error(e);
		} catch (IllegalAccessException e) {
		    logger.error(e);
		} catch (IllegalArgumentException e) {
		    logger.error(e);
		} catch (InvocationTargetException e) {
		    logger.error(e);
		} catch (SQLException e) {
		    logger.error(e);
		}
		return null;
	}

	/**
	 * 从HttpServletRequest 获取参数 Map
	 * 
	 * @param request
	 * @return Map
	 */
	private static Map getParams(HttpServletRequest request) {
		Map paramMap = new HashMap();

		Map map = request.getParameterMap();
		Set entrySet = map.entrySet();
		for (Iterator it = entrySet.iterator(); it.hasNext();) {
			Entry entry = (Entry) it.next();
			Object key = entry.getKey();
			String[] value = (String[]) entry.getValue();
			if (value != null && value.length > 0) {
				paramMap.put(key.toString().toLowerCase(), value[0]);
			}
		}

		return paramMap;
	}

	private static String getSetterName(Method setter) {
		String name = setter.getName().substring(3).toLowerCase();
		return Character.toLowerCase(name.charAt(0)) + name.substring(1);
	}

}
