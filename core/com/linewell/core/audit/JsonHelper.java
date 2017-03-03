package com.linewell.core.audit;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.linewell.core.util.StrUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * @Copyright :(C),2012
 * @CompanyName :南威软件股份有限公司(www.linewell.com)
 * @Version :1.0
 * @Date :Sep 27, 2013
 * @author : 文件创建者姓名：李竞雄 ljingxiong@linewell.com
 * @Description :
 */
public class JsonHelper {
    /**
     * 获取两个JSONArray不同的值
     * @param arg1
     * @param arg2
     * @return
     */
    public static final Map<String,String> getDifferent(JSONArray arg1,JSONArray arg2){
        Map<String,String> map = new HashMap<String,String>();
        for(int i=0;i<arg1.size();i++){
            JSONObject jsonObject1 = arg1.getJSONObject(i);
            Iterator it = jsonObject1.keys();
            while(it.hasNext()){
                String key = (String) it.next();
                String value1 = (String) jsonObject1.get(key);
                for(int j=0;j<arg2.size();j++){
                    JSONObject jsonObject2 = arg2.getJSONObject(j);
                    String value2 = (String) jsonObject2.get(key);
                    if(!StrUtil.formatNull(value1).equals(value2)){
                        map.put(key, value1);
                    }
                }
            }
        }
        return map;
    }
}
