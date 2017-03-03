package com.linewell.core.tree;

import java.util.List;

public class TreeSetting {

	private String asyncParam = "id";// 设置异步获取数据时,必需传递父节点数据属性的值
	private List<String> paramList;// 设置需要向视图传递参数的属性名称

	public List<String> getParamList() {
		return paramList;
	}

	/**
	 * 设置要传递参数的属性名称
	 * 
	 * @param paramList
	 */
	public void setParamList(List<String> paramList) {
		this.paramList = paramList;
	}

	public String getAsyncParam() {
		return asyncParam;
	}

	public void setAsyncParam(String asyncParam) {
		this.asyncParam = asyncParam;
	}

}
