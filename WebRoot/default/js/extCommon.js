/**
 * 定义ext的公共文件
 * 此文件只能在加载了Ext以后才能加载
 * @author yjianyou@linewell.com
 * @since 2011-07-01
 */
if(Ext){
	// 替换图片文件地址为本地
	Ext.BLANK_IMAGE_URL = appPath + 'uistyle/images/s.gif';
	/**
	 * 定义获取对象的简单方法，即document.getElementById()
	 * @param id 对象的ID
	 * @return   返回DOM对象
	 */
//	function $(id) {
//		return Ext.getDom(id);
//	}
}
