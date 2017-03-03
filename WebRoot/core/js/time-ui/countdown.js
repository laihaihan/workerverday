function show_date_time(n){
    var m=n-1;
    if (n==0){
        return "1";
    }else{
       TimeMsg(m,60)
       window.setTimeout("show_date_time("+m+")",1000); //1000表示１秒钟
    }
}
//-------------------------
function TimeMsg(a,b){
	var c=parseInt(a/b); //取整
	var d=a%b //取余
	document.getElementById("nowtime").innerHTML=c+"分"+d+"秒";
}