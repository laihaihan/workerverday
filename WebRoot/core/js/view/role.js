/**
 * 说明： 角色是否可创建子角色列转换函数
 * 参数： val 当前值
 */
 function isCanCreate(val){
 	if(val == '0'){
 		return '否';
 	} else if(val == '1'){
 		return '是';
 	}
}

/**
 * 说明： 角色是否可进行授权列转换函数
 * 参数： val 当前值
 */
 function isCanAuthorize(val){
 	if(val == '0'){
 		return '否';
 	} else if(val == '1'){
 		return '是';
 	}
}

/**
 * 说明： 角色是否可进行授权列转换函数
 * 参数： val 当前值
 */
 function roleType(val){
 	if(val == 'sysAd'){
 		return '系统管理员';
 	} else if(val == 'secAd'){
 		return '安全管理员';
 	} else if(val == 'audAd'){
 		return '审计管理员';
 	} else {
 		return '';
 	}
}