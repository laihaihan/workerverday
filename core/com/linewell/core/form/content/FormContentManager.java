package com.linewell.core.form.content;

import java.util.List;

import com.linewell.core.db.DbObjectManager;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.ListUtil;

/**
 * <p>
 * FormContent数据库操作
 * </p>
 * 
 * @author:张建辉 email:zjianhui@linewell.com
 * @version 1.0.0 2012-02-14 17:25:00
 *
 */
public class FormContentManager {
	
	private DbObjectManager dbObjectManager = new DbObjectManager("FORM_CONTENT","UNID",GlobalParameter.APP_CORE);
	/**
	 * 新增
	 */
	public boolean doSave(FormContent formContent){
		return dbObjectManager.doSave(formContent);
	}
	
	/**
	 * 更新
	 */
	public boolean doUpdate(FormContent formContent){
		return dbObjectManager.doUpdate(formContent);
	}
	
	/**
	 * 根据主键找单个对象
	 */
	public FormContent doFindBeanByKey(String keyValue){
		return (FormContent)dbObjectManager.doFindBeanByKey(new FormContent(), keyValue);
	}
	
	/**
	 * 根据查询条件找单个对象
	 */
	public FormContent doFindBeanByCondition(String condition,Object[] objs){
		List list = this.doFindListByCondition(condition, objs);
		return (null != list && !list.isEmpty()) ? (FormContent)list.get(0) : null;
	}
	
	/**
	 * 自定义条件查询对象列表
	 */
	public List doFindListByCondition(String condition,Object[] objs){
		return dbObjectManager.doFindListByCondition(new FormContent(),condition,objs);
	}
	
	/**
	 * 根据查询条件删除
	 */
	public boolean doDeleteByCondition(String condition){
		return dbObjectManager.doDeleteByCondition(condition);
	}
	
	/**
	 * 拼装表名规则： F+infoprojid+nodeunid 取前面30位不足后面补0
	 * date: Feb 22, 2011
	 * @param infoprojid
	 * @param nodeunid
	 * @return
	 */
	public static String getAutoTableName(String infoprojid,String sortid){
		String tablename = "form_"+infoprojid+"_"+sortid;
		return tablename;
	}
	
	/**
	 * 取得上个表单对象
	 * @param formContent
	 * @return
	 */
	public FormContent getBeforeFormByNowForm(FormContent formContent){
		List list = doFindListByCondition(" punid = '"+formContent.getPunid()+"' order by sortid",new Object[0]);
		for (int i = 0; i < list.size(); i++) {
			FormContent formContentTmp = (FormContent)list.get(i);
			if(formContentTmp.getUnid().equals(formContent.getUnid()) && i > 0){
				return (FormContent)list.get(i-1);
			}
		}
		return null;
	}
	
	/**
	 * 表单是否存在
	 * @param infoprojid 事项编码 
	 * @return
	 */
	public boolean formIsExit(String infoprojid){
		List list = doFindListByCondition("infoprojid = '"+infoprojid+"'",new Object[0]);
		return !ListUtil.isNull(list);
	}
	
	/**
	 * 取得上个表单对象
	 * @param formContent
	 * @return
	 */
	public FormContent getNextFormByNowForm(FormContent formContent){
		List list = doFindListByCondition(" punid = '"+formContent.getPunid()+"' order by sortid",new Object[0]);
		for (int i = 0; i < list.size(); i++) {
			FormContent formContentTmp = (FormContent)list.get(i);
			if(formContentTmp.getUnid().equals(formContent.getUnid()) && i < list.size() - 1){
				return (FormContent)list.get(i+1);
			}
		}
		return new FormContent();
	}
	
	public static void main(String[] args) {
		
		/*
		File file = new File("C:\\Users\\Administrator\\Desktop\\QQ截图20120329091650.jpg");
		String fileStrContent =  FileUtil.fileToString(file, "utf-8");

		//System.out.println("fileStrContent："+fileStrContent);
		System.out.println("附件转字符串长度："+fileStrContent.length());
	    String stmp = "";
		try {
			String encodeStr = StrUtil.encode(fileStrContent.getBytes("utf-8"));
			//System.out.println(encodeStr);
			
			stmp = new String(StrUtil.decode(encodeStr),"utf-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//System.out.println("byte再转回字符串长度"+stmp.length());
		//System.out.println("fileStrContent："+stmp);
		ByteArrayInputStream is = new ByteArrayInputStream(stmp.getBytes());  
		
		FormContentManager formContentManager = new FormContentManager();
		try {
			formContentManager.saveToFile("C:\\Users\\Administrator\\Desktop\\phototest.jpg", is);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		File file1 = new File("C:\\Users\\Administrator\\Desktop\\photo11111222222222.jpg");  
	
		FileUtil.stringToFile(fileStrContent,"C:\\Users\\Administrator\\Desktop\\photo11111222222222.txt");
		//FileUtils.writeStringToFile(file1, fileStrContent,"utf-8");
*/
	}
}
