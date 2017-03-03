/**
 * 定义平台中的全局变量
 * @author fshaoming@linewell.com
 * @since 2012-02-16
 * @type 
 */
var globalVariables={
	//定义查看附件大小上限（单位：M），小于设置的值可直接查看，否则要先下载在查看
	review_attr_max:50,
	//定义单个文件上传的大小限制 （单位：M，如：1）默认为0,为0表示大小不受限制(用于表单文件上传),如果系统没配置上传大小则以这里配置的为主，否则以系统配置的为主
	attr_upload_max:0,
	//定义单个文件上传的类型限制如：.txt|.jpg|.doc|.docx，设置为空时，表示上传类型不受限制(用于表单文件上传),如果系统没配置上传大小则以这里配置的为主，否则以系统配置的为主
	attr_upload_type:"",
	//视图数据中是否对统一授权的数据权限进行过滤  0：不过滤 1：过滤
	is_hav_data_permission : 0,
	//视图数据中是否对数据角色进行数据权限过滤     0：不过滤 1：不过滤
	is_hav_data_role : 0,
	//保存部门扩展功能模式    0：不执行扩展功能  1：执行保存前扩展功能(save_dept_before) 
	// 2：执行保存后扩展功能（save_dept_after） 3：执行保存前，后的扩展功能
	save_dept_mode:"0",
	//保存部门前扩展功能
	save_dept_before:"",
	//保存部门后扩展功能
	save_dept_after:"",
	//删除部门扩展功能模式    0：不执行扩展功能  1：执行删除前扩展功能(del_dept_before) 
	// 2：执行删除后扩展功能（del_dept_after） 3：执行删除前，后的扩展功能
	del_dept_mode:"0",
	//删除部门前扩展功能
	del_dept_before:"",
	//删除部门后扩展功能
	del_dept_after:"",
	//平台头部的高度,设置为0时取平台默认高度(100px)，否则以这里设置的高度作为平台头部的高度
	headerHeight:0
	
	
	
	
	
	
}
