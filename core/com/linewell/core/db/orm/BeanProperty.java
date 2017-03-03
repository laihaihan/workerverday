package com.linewell.core.db.orm;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class BeanProperty {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(BeanProperty.class);

	public static Map<String, Object> getMapProperty(Object bean) {

		Map<String, Object> mapProperty = new HashMap<String, Object>();

		BeanInfo beanInfo = null;
		try {
			beanInfo = Introspector.getBeanInfo(bean.getClass());
			
			PropertyDescriptor[] properties = beanInfo.getPropertyDescriptors();

			for (int i = 0; i < properties.length; i++) {
				
				PropertyDescriptor property = properties[i];
				
				String key = property.getDisplayName();
				key = StringUtils.substring(key, 0, 1).toLowerCase()+StringUtils.substring(key, 1, key.length());
				
				Object value = null;
				Method method = property.getReadMethod();
				
				if (method == null) {
					throw new RuntimeException("No read method for bean property " + bean.getClass() + " " + property.getName());
				}
				
				try {
					value = method.invoke(bean, new Object[0]);
					
				} catch (InvocationTargetException e) {
					throw new RuntimeException("Couldn't invoke method: " + method, e);
				} catch (IllegalArgumentException e) {
					throw new RuntimeException("Couldn't invoke method with 0 arguments: " + method, e);
				} catch (IllegalAccessException e) {
					throw new RuntimeException("Couldn't invoke method: " + method, e);
				}
				
				mapProperty.put(key, value);
			}

		} catch (IntrospectionException e) {
		     logger.error(e);
			// throw new SQLException(
			// "Bean introspection failed: " + e.getMessage());
		}

		return mapProperty;
	}

}
