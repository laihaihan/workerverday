var ucapModuleConfig = {
	moduleNames:[
		{name:'首页',action:'initDocForm(this,"system/html/index.jsp","getProxool")'},
		{name:'基础配置',action:'initView(this,"resourcescache")',
			child:[{name:'数据库配置',action:'initDocForm(this,"system/html/proxool.html","getProxool")'},
				{name:'缓存类型配置',action:'initDocForm(this,"system/html/cache.html","getCache")'},
				{name:'日志配置',action:'initDocForm(this,"system/html/logSet.html","getLog")'},
				{name:'流程环境配置',action:'initDocForm(this,"system/html/flowSet.html","getFlow")'}]},
		{name:'登录配置',action:'initDocForm(this,"system/html/loginSet.html","getLogin","959FD73A82998E2AEED16AA114A69444","1322222223")'},
		{name:'安全设置',action:'',
			child:[{name:'IP地址配置',action:'initDocForm(this,"system/html/ipSet.html","getLogin","959FD73A82998E2AEED16AA114A69444","1322222223")'},
				{name:'密码相关配置',action:'initDocForm(this,"system/html/passwordSet.html","getLogin","959FD73A82998E2AEED16AA114A69444","1322222223")'}]},
		{name:'消息配置',action:'initDBView(this,"63BACAD9AC487DC6E25D037ECABF2DFB",null,true,"AE74B10C386F01F7054319BADCE4AAC5")'},
		{name:'系统参数',action:'initDBView(this,"CF27D2752F03DA99C4532656DBA9610E",null,true,"255C00984F625B8BB6AFD08437BBF1BD")'},
		{name:'缓存资源配置',action:'',
			child:[{name:'全局缓存',action:'initView(this,"globalSession")'},
				{name:'资源缓存',action:'initView(this,"resources")'},
				{name:'缓存更新配置',action:'initView(this,"resourcescache")'}]
		},
		{name:'流程参数配置',action:'initView(this,"flowParams")'},
			
		{name:'Action配置',action:'initView(this,"action")'},		
		//{name:'复制配置',action:''},
		{name:'日志管理',action:'',
			child:[{name:'登陆日志',action:'initDBView(this,"EBA9E225E69C7C798E3C98585604FA20",null,false)'},
					{name:'操作日志',action:'initDBView(this,"826AAAADE71A028A0CD90EC86949789D",null,false)'}
					]}
//		{name:'安全配置',action:'',
//			child:[{name:'登陆日志管理',action:'initDBView(this,"EBA9E225E69C7C798E3C98585604FA20",null,false)'},
//					{name:'操作日志管理',action:'initDBView(this,"826AAAADE71A028A0CD90EC86949789D",null,false)'},
//				{name:'时时监控',action:''}]}
		]
};