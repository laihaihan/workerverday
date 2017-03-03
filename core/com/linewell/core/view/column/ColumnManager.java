package com.linewell.core.view.column;

import java.util.List;

import com.linewell.core.buildermodule.detail.BuilderModuleDetail;
import com.linewell.core.buildermodule.detail.BuilderModuleDetailBusiness;
import com.linewell.core.db.JdbcFactory;
import com.linewell.core.db.JdbcSession;
import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.UNIDGenerate;

/**
 * 
 * @author zjianhui@linewell.com
 *
 */
public class ColumnManager {
	
	private static String JNDI = GlobalParameter.APP_CORE;
	
	/**
	 * 创建字段列数据
	 * @param result result[][0]=字段名称;result[][1]=字段类型;result[][2]=字段默认值;result[][3]=字段说明
	 * @param viewUnid 所属视图主键
	 * @return 是否成功： true 成功，false 失败
	 */
	public boolean createBaseViewColumnByColumnList(String[][] result,String viewUnid){
		
		
		
		boolean flag = true;
		for (int i = 1; i < result.length; i++) {
			Column column = new Column();
			column.setUnid(new UNIDGenerate().getUnid());
			column.setViewUnid(viewUnid);
			column.setTitle(result[i][3]);
			column.setField(result[i][0].toUpperCase());
			column.setWidth("10");
			column.setSort(i-1);
			column.setAlign("1");
			column.setSortable("1");
			column.setRowspan(1);
			column.setColspan(1);
			if(i==1){
				column.setCheckbox("1");
				column.setHidden("0");
				column.setRowspan(0);
				column.setColspan(0);
				column.setWidth("");
				column.setHidden("0");
			}
			JdbcSession jdbc = JdbcFactory.getSession(JNDI);
			flag = flag&&jdbc.saveEntity(column);
		}
		
		return flag;
	}
}
