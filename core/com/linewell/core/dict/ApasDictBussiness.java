package com.linewell.core.dict;

import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import com.linewell.core.util.StrUtil;

/**
 * 利用字典数据衍生出来的各种工具类
 * @author zjianhui@linewell.com
 *
 */
public class ApasDictBussiness {
	
	private static Logger logger = Logger.getLogger(ApasDictBussiness.class);
	
    /**
     * 从字典里面获取Html单选框
     * 
     * @param stype
     * @param name 单选框名称
     * @param value 选中的选项值
     * @return  返回单选框的状态
     */
    public String getRadio(String type, String name, String value) {
        //获取列表
    	String condition = "dicttype='"+type+"' and state='Y' order by sortid";
        List list = new ApasDictManager().doFindListByCondition(condition, null);
        StringBuffer buffer = new StringBuffer();
        if (list != null) {
            for (int i = 0; i < list.size(); i++) {
                ApasDict dict = (ApasDict)list.get(i);
                String dictName = dict.getDictname();
                String dictValue = dict.getDictvalue();
                String checked = (i == 0 || dict.getDictvalue().equals(value)) ? "checked" : "";
                buffer.append("<label><input type=\"radio\" name=\"" + name + "\" value=\"" + dictValue + "\" "+checked+">" + dictName + "</label>&nbsp;\n");
            }
        }
        return buffer.toString();
    }
    
    public String getCheckBox(String type, String name, String value) {
        //获取列表
    	String condition = "dicttype='"+type+"' and state='Y' order by sortid";
        List list = new ApasDictManager().doFindListByCondition(condition, null);
        String [] values = StrUtil.formatNull(value).split(",");
        
        StringBuffer buffer = new StringBuffer();
        if (list != null) {
            for (int i = 0; i < list.size(); i++) {
                ApasDict dict = (ApasDict)list.get(i);
                String dictName = dict.getDictname();
                String dictValue = dict.getDictvalue();
                String checked = StrUtil.isArrayHasValue(values,dictValue) ? "checked" : "";
                buffer.append("<label><input type=\"checkbox\" name=\"" + name + "\" value=\"" + dictValue + "\" "+checked+"  title=\""+dictValue+"\">" + dictName + "</label>&nbsp;\n");
            }
        }
        return buffer.toString();
    }
    
    /**
     * 
     * 从字典表里面统一取出字典数据,表现形式为下拉框的样式
     * 返回代码解释字段的下拉框列表
     * 
     * @param type String 字典的类型
     * @param value 选中的选项值
     * @return 返回下拉列表的数值
     */
    public String getSelectList(String type, String value) {
        //获取列表
        StringBuffer buffer = new StringBuffer();
    	String condition = "dicttype='"+type+"' and state='Y' order by sortid";
        List list = new ApasDictManager().doFindListByCondition(condition, null);
        if (list != null) {
        	for(int i = 0; i < list.size(); i++) {
                ApasDict dict = (ApasDict) list.get(i);
                String dictName = dict.getDictname();
                String dictValue = dict.getDictvalue();
                String selected = dictValue.equals(value) ? "selected" : "";
                buffer.append("<option value=\"" + dictValue + "\" "+ selected+">" + dictName + "</option>\n");
            }
        }else {
        	logger.error("从字典里面获取类型为" + type + "为空！");
        }
        
        return buffer.toString();
    }

	/**
	 * 获取comboTree数据
	 * 
	 * @param type	字典类型
	 * @param checkedItems	默认选中的选项
	 * @return
	 */
    public String getComboTreeData(String type, String checkedItems){
    	JSONArray jsonArray = new JSONArray();
    	String condition = "dicttype='"+type+"' and state='Y' order by sortid";
    	List list = new ApasDictManager().doFindListByCondition(condition, null);
    	for (int i = 0; i < list.size(); i++) {
    		ApasDict dict = (ApasDict)list.get(i);
    		JSONObject json = new JSONObject();
			json.put("id", dict.getDictvalue());
			json.put("text", dict.getDictname());
			if(StrUtil.formatNull(checkedItems).indexOf(dict.getDictvalue()) > -1){
				json.put("checked", true);
			}
			jsonArray.add(json);
		}
    	return jsonArray.toString();
    }
    
    /**
     * 
     * 功能说明:根据字典类型和值获取字典的名称
     * @param type	-字段类型
     * @param value	-字典的值
     * @author chh
     * @Aug 9, 2012
     */
    public static String getDictNameByTypeAndValue(String type,String value){
    	String condition = "dicttype='"+type+"' and state='Y' order by sortid";
        List list = new ApasDictManager().doFindListByCondition(condition, null);
        if (list != null) {
        	for(int i = 0; i < list.size(); i++) {
                ApasDict dict = (ApasDict) list.get(i);
                String dictName = dict.getDictname();
                String dictValue = dict.getDictvalue();
                if(dictValue.equals(value)){
                	return dictName;
                }
            }
        }else {
        	logger.error("从字典里面获取类型为" + type + "为空！");
        }
        return value;
    }
    
    public String getDictValueByType(String type){
    	String condition = "dicttype='"+type+"' and state='Y'";
    	ApasDict dict = new ApasDictManager().doFindByCondition(condition, null);
    	String value = null != dict ? dict.getDictvalue() : null;
    	return value;
    }
    
    public static String getDicValue(String dictType,String dictName){
    	String condition = "dictType='"+dictType+"' and dictName='"+dictName+"' and state='Y'";
    	ApasDict dict = new ApasDictManager().doFindByCondition(condition, null);
    	String value = null != dict ? dict.getDictvalue() : null;
    	return value;
    }
}