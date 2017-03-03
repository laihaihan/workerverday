package com.linewell.core.amchart.pie;

import java.util.*;

import com.linewell.core.amchart.common.*;
/**
 * 圆柱形数据实体类
 * @author lchenming@linewell.com
 *
 */
public class PieData {
	/**
	 * 根结点名称
	 */
	private String rootName = "pie";
	/**
	 * 圆柱形数据
	 */
	private List<SliceData> sliceData = null;
	
	/**
	 * 获取圆柱形数据
	 * @return
	 */
	public List<SliceData> getSliceData() {
		return sliceData;
	}

	/**
	 * 设置圆柱形数据
	 * @param sliceData
	 */
	public void setSliceData(List<SliceData> sliceData) {
		this.sliceData = sliceData;
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
	 * 添加数据
	 * @param data 柱形数据
	 */
	public void addSliceData(SliceData data){
		if(sliceData == null){
			sliceData = new ArrayList<SliceData>();
		}
		sliceData.add(data);
	}
	
}
