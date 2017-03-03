package com.linewell.ucap.checkunique;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.collections.BidiMap;
import org.apache.commons.collections.bidimap.DualHashBidiMap;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.linewell.ucap.appInterface.AppimplException;
import com.linewell.ucap.appInterface.IFormVerify;
import com.linewell.ucap.jdbc.core.JdbcTemplate;
import com.linewell.ucap.platform.cache.form.Form;
import com.linewell.ucap.platform.cache.form.Item;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucap.resource.ABaseManager;
import com.linewell.ucap.resource.ManageException;
import com.linewell.ucap.session.Session;
import com.linewell.ucap.util.StringUtil;
import com.linewell.ucap.web.form.FormResultManager;

/**
 * 
 * @author linyashan
 * 登录名同名异常验证
 *
 */
public class VerifyUserNameByUnit extends ABaseManager  implements IFormVerify {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(VerifyUserNameByUnit.class); 

	/**
	* @author lhaihua E-lhaihua@linewell.com
	* @version 创建时间：2010-6-9 下午03:41:34
	* @remark 说明:唯一性校验
	* @return true或者错误信息
	*/
	public String verify(Form form, JSONArray jsonArray,
			JdbcTemplate jt, String unid,String isNew,Session session) throws AppimplException{
		String result = "true";
		if (StringUtils.isEmpty(form.getVerifyFields())) {
			return result;
		}
		BidiMap fieldNameMap = new DualHashBidiMap();
		Map<String, String> itemCnMap = new HashMap<String, String>();//  
		List<Item> itemList = form.getItems();
		for (Item item : itemList) {
			fieldNameMap.put(item.getUnid(), item.getNameEn().toLowerCase());
			itemCnMap.put(item.getUnid(), item.getNameCn());
		}
		Iterator iter = jsonArray.iterator();
		Map<String, String> verifyMap = new HashMap<String, String>();// 唯一性字段map
		Map<String, String> itemValueMap = null;// 字段值map
		String verifyFields = form.getVerifyFields();
		while (iter.hasNext()) {
			JSONObject itemObject = (JSONObject) iter.next();
			if (itemObject.get(FormResultManager.ITEMVALUE) != null) {
				String itemName = itemObject
						.getString(FormResultManager.ITEMNAME).toLowerCase();
				String itemValue = itemObject
						.getString(FormResultManager.ITEMVALUE);
				// 是唯一性字段
				if (fieldNameMap.getKey(itemName)!=	null&&verifyFields
						.indexOf((String) fieldNameMap.getKey(itemName)) != -1) {
					verifyMap.put(itemName, itemValue);
				}
			}
		}
		String[] fieldArr = verifyFields.split(";");
		for (String fieldids : fieldArr) {
			boolean isVerify = false;
			String[] fieldidArr = fieldids.split(StringUtil.STRINGSPLIT);
			for (String fieldid : fieldidArr) {
				if (verifyMap.get(fieldNameMap.get(fieldid)) != null) {
					// 说明这个条件要验证
					isVerify = true;
					break;
				}
			}
			if (isVerify) {
				String deptValue = verifyMap.get("user_depts");
				String userValue = verifyMap.get("user_login_name");
				UserManager um = new UserManager();
				try {
					User user = um.getUserByNameAndUnit(userValue, session.getRequest(), deptValue);
					if(user!=null)return "登录名"+userValue+"已经存在!";
				} catch (ManageException e) {
				    logger.error(e);
				}
			}
		}
		
		return result;

	}


}
