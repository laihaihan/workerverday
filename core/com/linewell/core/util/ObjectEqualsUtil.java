

package com.linewell.core.util;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 功能说明：对象值是否相等
 * <P>
 * </P>
 * 
 * @author chh
 * @since 2012
 * 
 */
public class ObjectEqualsUtil {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(InputStreamUtil.class); 


	/**
	 * 比较2个对象中属性值的变化，此思路可以用来做日志 日志一般是什么时候什么人做了哪些操作(重要的是改了哪些字段)
	 * 
	 * @author huangshuang 2011-05-01
	 * @param args
	 */
	public static String getChangeValues(Object val1,Object val2) {
		StringBuffer sb =new StringBuffer();
		try{
		// 获取两个类中所有的属性
			Field fields1[] = val1.getClass().getDeclaredFields();
			Field fields2[] = val2.getClass().getDeclaredFields();
			for (int i = 0; i < fields1.length; i++) {
				Field field1 = fields1[i];
				Annotation[] s = field1.getAnnotations();

				// 设置成可以操作private的变量
				field1.setAccessible(true);
				for (int j = 0; j < fields2.length; j++) {
				Field field2 = fields1[j];
				field2.setAccessible(true);
				// 是否是同一个属性
					if (field1.getName().equals(field2.getName())) {
					// 两个值是否相等
						if(!field1.get(val1).equals(field2.get(val2))){
							sb.append("修改字段【"+field1.getName()+"】,值从"+field1.get(val1)+"修改为"+field2.get(val2)+";\n");
							//System.out.println("字段名："+field1.getName()+",user1的值是："+field1.get(val1)+" user2的值是："+field2.get(val2));
						}
					}
				}
			}
		}catch(Exception ex){
		    logger.error(ex);
	
		}
		return sb.toString();
	}
	/**
	 * 
	 * 功能说明:对象负责
	 * @param object
	 * @return
	 * @throws Exception
	 * Object
	 * @author chh
	 * @May 31, 2012
	 */
	 public Object copy(Object object) throws Exception {
	        // 获得对象的类型
	        Class<?> classType = object.getClass();
	 
	        // 通过默认构造方法创建一个新的对象
	        Object objectCopy = classType.getConstructor(new Class[]{}).newInstance(new Object[]{});
	 
	        // 获得对象的所有属性
	        Field fields[] = classType.getDeclaredFields();
	 
	        for (int i = 0; i < fields.length; i++) {
	            Field field = fields[i];
	 
	            String fieldName = field.getName();
	            String firstLetter = fieldName.substring(0, 1).toUpperCase();
	            // 获得和属性对应的getXXX()方法的名字
	            String getMethodName = "get" + firstLetter + fieldName.substring(1);
	            // 获得和属性对应的setXXX()方法的名字
	            String setMethodName = "set" + firstLetter + fieldName.substring(1);
	 
	            // 获得和属性对应的getXXX()方法
	            Method getMethod = classType.getMethod(getMethodName, new Class[]{});
	            // 获得和属性对应的setXXX()方法
	            Method setMethod = classType.getMethod(setMethodName, new Class[]{field.getType()});
	 
	            // 调用原对象的getXXX()方法
	            Object value = getMethod.invoke(object, new Object[]{});
	           // System.out.println(fieldName + ":" + value);
	            // 调用拷贝对象的setXXX()方法
	            setMethod.invoke(objectCopy, new Object[]{value});
	        }
	        return objectCopy;
	    }
	
}

