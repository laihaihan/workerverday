package com.linewell.core.view;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.linewell.ucap.util.UNIDGenerate;

public class ViewNode {

	private String id;// 节点id
	private String name;// 节点显示名称
	private String value;// 节点显示名称
	private String icon;// 图标地址	
	private List<ViewNode> children;
	private boolean isParent = false;// 设置某节点是否为父节点
	private Map<String, String> otherData;// 其它参数数据

	public ViewNode() {
		super();
	}
	
	public ViewNode(String id, String name, boolean isParent, Map<String, String> otherData) {
		super();
		this.id = id;
		this.name = name;
		this.isParent = isParent;
		this.otherData = otherData;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public boolean isParent() {
		return isParent;
	}
	public void setParent(boolean isParent) {
		this.isParent = isParent;
	}
	public Map<String, String> getOtherData() {
		return otherData;
	}
	public void setOtherData(Map<String, String> otherData) {
		this.otherData = otherData;
	}
	 public String getJsonString(String itemName, boolean isParent, boolean hasChecked)
	  {
	    StringBuffer sb = new StringBuffer();
	    sb.append("{");
	    sb.append("'id':");
	    UNIDGenerate ug = new UNIDGenerate();
	    sb.append("'").append(ug.getUnid()).append("'");

	    sb.append(",'isParent':");
	    if (isParent)
	      sb.append(String.valueOf(true));
	    else {
	      sb.append(String.valueOf(false));
	    }
	    sb.append(",'name':");
	    if (StringUtils.isEmpty(this.name))
	      sb.append("''");
	    else {
	      sb.append("'").append(this.name).append("'");
	    }

	    sb.append(",'value':");
	    if (StringUtils.isEmpty(this.value))
	      sb.append("''");
	    else {
	      sb.append("'").append(this.value).append("'");
	    }

	    if ((this.children != null) && (!(this.children.isEmpty()))) {
	      sb.append(",'node':[");
	      for (int i = 0; i < this.children.size(); ++i) {
	    	  ViewNode utn = (ViewNode)this.children.get(i);
	        sb.append(utn.getJsonString(itemName, isParent, hasChecked));
	        if (i != this.children.size() - 1)
	          sb.append(",");
	      }

	      sb.append("]");
	    }

	    Map map = this.otherData;
	    if (map == null)
	      map = new HashMap();

	    if (!(map.containsKey("name"))) {
	      map.put("name", itemName);
	    }

	    if (map != null) {
	      Iterator itr = map.keySet().iterator();
	      while (itr.hasNext()) {
	        String key = (String)itr.next();
	        String val = (String)map.get(key);

	        sb.append(",'").append(key).append("':");
	        sb.append("'").append(val).append("'");
	      }
	    }

	    sb.append("}");

	    return sb.toString();
	  }
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public List<ViewNode> getChildren() {
		return children;
	}
	public void setChildren(List<ViewNode> children) {
		this.children = children;
	}
}
