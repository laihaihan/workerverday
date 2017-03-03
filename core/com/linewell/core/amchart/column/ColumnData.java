package com.linewell.core.amchart.column;

import java.util.ArrayList;
import java.util.List;

import com.linewell.core.amchart.common.GraphData;
import com.linewell.core.amchart.common.ValueData;

/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Apr 4, 2010 4:20:09 PM 
 * @version  v1.0
 * 类说明 :
 */
public class ColumnData {
	/**
	 * 根结点名称
	 */
	private String rootName = "chart";
	/**
	 * 
	 */
	private List<ValueData> seriesData;
	/**
	 * 
	 */
	private List<GraphData> graphsData;
	/**
	 * @return
	 */
	public List<ValueData> getSeriesData() {
		return seriesData;
	}
	/**
	 * @param seriesData
	 */
	public void setSeriesData(List<ValueData> seriesData) {
		this.seriesData = seriesData;
	}
	/**
	 * @return
	 */
	public List<GraphData> getGraphsData() {
		return graphsData;
	}
	/**
	 * @param graphsData
	 */
	public void setGraphsData(List<GraphData> graphsData) {
		this.graphsData = graphsData;
	}
	
	/**
	 * @param data
	 */
	public void addSeriesData(ValueData data){
		if(seriesData == null){
			seriesData = new ArrayList<ValueData>();
		}
		seriesData.add(data);
	}
	/**
	 * @return
	 */
	public String getRootName() {
		return rootName;
	}
	/**
	 * @param rootName
	 */
	public void setRootName(String rootName) {
		this.rootName = rootName;
	}
	/**
	 * @param data
	 */
	public void addGraphsData(GraphData data){
		if(graphsData == null){
			graphsData = new ArrayList<GraphData>();
		}
		graphsData.add(data);
	}
}
