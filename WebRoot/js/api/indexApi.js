/**
 * yjy 2010-7-15
 * JS�ӿ�API
 */
var ucapApi={
	/**
	 * ͬ����ȡ��ҳƵ��������
	 */
	getAllChannels:function(){
		var url =ucapSession.baseAction;
		url+="?type=portal&act=getValue";
		var conn = Ext.lib.Ajax.getConnectionObject().conn;
		conn.open("GET", url, false);
		conn.send(null);			
		var result = conn.responseText;
		if (result.indexOf("error")>-1){
			Ext.Msg.alert("��ʾ��Ϣ","�޷���ȡƵ�������Ϣ��");
			return;
		};
		var json = Ext.decode(result);
		var exResult=ucapCommonFun.dealException(json);
		if(!exResult)return;
		return json.channels;
	},
	/**
	 * ������ҳ����API
	 * @param {} callBackFun �ص����� 
	 *   �ص����� Ĭ�ϲ���Ϊ paraChannel ��i,j
	 */
	getPortal:function(callBackFun){
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{"type":"portal","act":"getValue"},
			callback:function(options,success,response){
					if (success){
						var json = Ext.decode(response.responseText);
						var exResult=ucapCommonFun.dealException(json);
						if(!exResult)return;
						var channels =json.channels;
						for(var i=0;i<channels.length;i++){
							if (typeof(channels[i].items)=="undefined") continue;
							for(var j=0;j<channels[i].items.length;j++){
								ucapApi.setItemPortal(channels[i].items[j],callBackFun,i,j);
							}
						}
					} else {
						Ext.Msg.alert("��ʾ��Ϣ","�޷���ȡƵ�������Ϣ��");
						Ext.getDom("portal_id").innerHTML="";
						Ext.getDom("portal_info").style.display="none";
					}
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	/**
	 * 
	 * @param {} channelItem   ����е���Ƶ���Ķ���
	 * @param {} callBackFun   �ص����� Ĭ�ϲ���Ϊ paraChannel��i,j paraChannel��ʽ����
		  var paraChannel={	
				id:"", //��ʾƵ����ID
				html:"",//�����ֵ��˵������ȥ��̨ȡֵ��������ͼƬ��URL��
				style:"", //Ƶ����ʽ01 �б� 02 ͼ�Ļ��� 03ͼ�Ĳ�ï 04 FLASH 05 ��Ƶ 06 ���� 07 ͼƬ 08��ݷ�ʽ 09 URL 10���ʽ
				embelish:"", //Ƶ���Զ��庯��
				content:[], //��¼����
				docImg:"",  //��¼��ǰ��ͼ��
				imgNum:0,  //ͼƬ���ڵ���
				imgWidth:"80", //ͼƬ���
				imgHeight:"80", //ͼƬ�ĸ߶�
				url:"",       //URL��ַ
				unidName:"id", //����������
				rowNum:"",    //��ʾ�ļ�¼����
				roll:"",   //����
				rollamount:"",//�ٶ�
				docType:9, //1 ��ʾ��ģ�� 2��ʾ����ͼ 3��ʾ��URL 9��ʾ���ĵ�
				sourceType:"",//1 ��ͼ��2 RSS��3 JSON 4 URL 5��ݷ�ʽ
				viewInfo:{},//��Դ����ͼʱ��������ͼ�������Ϣ
				column:9999//��ͼ������
			}
	 * 
	 * @param {} divId һ������ΪҪ�Ѵ�Ƶ����ֵ���õ�div
	 * @param {} i  ��ʾƵ���еĵ�i��
	 * @param {} j  ��ʾ��i���еĵ�j��
	 */
	setItemPortal:function(channelItem,callBackFun,i,j){
		ucapPortal.setItemPortal(channelItem,callBackFun,i,j);
	},
	getMenu:function(callBackFun){
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{type:"menu",act:"getAllMenu"},
			callback:function(options,success,response){
				callBackFun.call(this,success,response.responseText);
			}
		}
		Ext.Ajax.request(requestConfig);
	},
	getNavigation:function(callBackFun){
		var requestConfig = {
			url:ucapSession.baseAction,
			params:{type:"nav",act:"getNav"},
			callback:function(options,success,response){
				callBackFun.call(this,success,response.responseText);
			}
		}
		Ext.Ajax.request(requestConfig);
	}
}

	