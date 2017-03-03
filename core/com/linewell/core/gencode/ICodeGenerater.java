package com.linewell.core.gencode;

import java.io.IOException;
/**
 * @author 文件创建者姓名:张建辉 zjianhui@linewell.com
 * @version 1.0.0 date: 
 * <p>
 * Copyright (c) 2012 Linewell.com
 * </p>
 */
public interface ICodeGenerater {
	public void generatejava(BeanBean bean,String javatemplate,String sourcename) throws IOException;
	
	public void generatejsp(BeanBean bean,String jsptemplate,String jsppath) throws IOException;
}
