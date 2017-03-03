package com.linewell.core.amchart.common;

import java.util.ArrayList;
import java.util.List;

/**
 * GraphData实体
 * @author lchenming@linewell.com
 * @dateTime  Jan 30, 2011 10:09:01 AM 
 */
public class GraphData {
	
	/**
	 * gid
	 */
	private String gid;
	/**
	 * 标题
	 */
	private String title;
	/**
	 * seriesData
	 */
	private List<ValueData> valueData;
	
	/**
	 * @return
	 */
	public String getTitle() {
		return title;
	}
	/**
	 * @param title
	 */
	public void setTitle(String title) {
		this.title = title;
	}
	/**
	 * @return
	 */
	public String getGid() {
		return gid;
	}
	/**
	 * @param gid
	 */
	public void setGid(String gid) {
		this.gid = gid;
	}
	/**
	 * @return
	 */
	public List<ValueData> getValueData() {
		return valueData;
	}
	/**
	 * @param seriesData
	 */
	public void setValueData(List<ValueData> valueData) {
		this.valueData = valueData;
	}
	
	/**
	 * @param data
	 */
	public void addValueData(ValueData data){
		if(valueData == null){
			valueData = new ArrayList<ValueData>();
		}
		valueData.add(data);
	}
}
