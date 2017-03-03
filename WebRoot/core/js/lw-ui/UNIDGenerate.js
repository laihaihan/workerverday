/**
 * unid生成器
 *
*/ 
var UNIDGenerate = {
	//unid字符集
	str : "0 1 2 3 4 5 6 7 8 9 A B C D E F",
	
	//生成32位unid(字母+数字)
	create:function(){
		var unid = "";
		var arr = UNIDGenerate.str.split(" ");
		for(i=0;i<32;i++){
			unid += arr[Math.round(Math.random()*(arr.length-1))];  
		}
		return unid;
	}
}