package com.linewell.core.ucap.flow;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Point;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.linewell.core.system.GlobalParameter;
import com.linewell.core.util.StrUtil;
import com.linewell.ucap.workflow.UcapWorkFlow;
import com.linewell.ucap.workflow.bean.flow.Flow;
import com.linewell.ucap.workflow.bean.flow.FlowNode;
import com.linewell.ucap.workflow.bean.flow.Transition;
import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGEncodeParam;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

/**
 * <p>
 *    流程图展示（以图片的形式展示流程图，即整个流程图为一张图片）
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Dec 12, 2012
 * @version 1.0  
 */
public class FlowImage {
    private static final Logger logger = Logger.getLogger(FlowImage.class);

public static final int ARM_LENGTH = 10;     //箭头边的长度
	
	public static final int TIP_HEIGHT = 100;     //提示的高度
	
	public static final int TIP_WIDTH = 240;     //提示的宽度(最小宽度)
	
	private int canvas_width = 200;  //画布宽度,默认为800
	
	private int canvas_height = 150; //画布高度,默认为600
	
	private int node_image_width = 53;//默认图片大小
	
	private int node_image_height = 53;//默认图片大小

	
	private String[] strNodeImages = new String[]{"node.bmp","nodeed.bmp","nodeing.bmp"};//节点图片文件地址
	
	private String[] strsubFlowImages = new String[]{"subFlow.bmp","subFlowed.bmp","subFlowing.bmp"};//节点图片文件地址
	
	private String[] strTipImages = new String[]{"node.bmp","nodeed.bmp","nodeing.bmp"};//提示图片文件地址
	
	private String[] strTips = new String[]{"未办节点","已办节点","当前节点"};//提示信息
	
	private String[][] nodeOuts;// 流程出口节点集列表

	private HashMap xyMap; // 由节点标识和x,y组成的列表,xy之间采用逗号分隔

	private UcapWorkFlow ucapWorkFlow = null; // 流程对象

	private String currentNodeId = null; // 当前节点的unid
	
	private String imagePath = "js"+File.separator+"ucap"+File.separator+"flow"+File.separator+"images";//应用路径
	
	private String vertical = "1";   //默认方式不用采用垂直线画
	
	private Color color = new Color(238,238,238);
	
	private String tansnodes = null;
	
	private FlowManager flowManager = null;
	
	public FlowImage(FlowParams flowParams){
		this.ucapWorkFlow = flowParams.getUcapWorkFlow();
		this.flowManager = new FlowManager(flowParams);
		this.imagePath = GlobalParameter.SYSTEM_REAL_PATH + File.separator + imagePath + File.separator;
	}
	
	/**
	 * 画流程的操作
	 * 
	 * @return
	 * @throws IOException 
	 */
	public void drawingFlow(HttpServletRequest request,HttpServletResponse response) throws IOException {
		if(request.getAttribute("color") != null) {
			this.color = (Color)request.getAttribute("color");
		}
	 	
		//获得所需要绘制的流程
		String docUnid = request.getParameter("docUnid");
		String flowUnid = request.getParameter("flowUnid");
		Flow flow = null;
		if(!StrUtil.isNull(docUnid)){
			flow = flowManager.getFlowByDocUnid(docUnid);
		}
		if(flow == null && !StrUtil.isNull(flowUnid)){
			flow = flowManager.getFlowById(flowUnid);
		}
		if(null != flow){
			FlowNode curNode = flowManager.getCurNode(docUnid);
			curNode = null == curNode ? flowManager.getBeginNode(flowUnid) : curNode;//初始节点
			this.currentNodeId = curNode.getId();
			this.tansnodes = flowManager.getNodeUnid(docUnid, 4);//已办理节点
		}

		//绘制流程图
		response.setContentType("image/jpeg;charset=utf-8");
		createImage(response.getOutputStream(), flow);
	}
	
	/**
	 * 开始创建画图对象进行画图
	 * 
	 * @param out
	 *            SERVLET输出对象
	 * 
	 * @param doc
	 *            文档对象
	 */
	private void createImage(OutputStream out, Flow flow) {
		this.setCanvasSize(flow);//设置背景画布
		
		BufferedImage bi = new BufferedImage(canvas_width, canvas_height,BufferedImage.TYPE_INT_RGB);
		Graphics2D g = bi.createGraphics();
		g.setBackground(this.color);// 设置背景色为白色
		g.clearRect(0, 0, canvas_width, canvas_height);
		
		if(null == flow){
			Font font = new Font("system", 0, 20);
			g.setFont(font);
			g.setColor(Color.RED);
			g.drawString("没有配置流程，请联系管理员进行配置！", 20, 20);
		}else{
			// 画流程配置中的所有节点
			this.drawNode(g, flow);

			// 画流程配置间的连接
			this.drawConnect(g, flow);
		}

		//设置提示信息
		//setTips(g);

		g.dispose();
		bi.flush();

		// 编码输出
		JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
		JPEGEncodeParam param = encoder.getDefaultJPEGEncodeParam(bi);
		param.setQuality(1.0f, false);
		encoder.setJPEGEncodeParam(param);
		try {
			encoder.encode(bi);
		} catch (IOException ioe) {
		    logger.error(ioe);
		}
	}
	
	/**
	 * 根据画图对象及文档对象设置画布的大小,其设置的依据主要是根据已经设置好的画布来设置相应的值
	 * 
	 * @param g 画图对象
	 * 
	 * @param doc 文档对象
	 */
	private void setCanvasSize(Flow flow){
		if(null == flow || null == flow.getNodes() || null == flow.getNodes().keySet().iterator()){
			this.canvas_width = 600;//重新设置画布宽度
			return;
		}
		
		int nodeX = 0;
		int nodeY = 0;
		Map map = flow.getNodes();
		Iterator itr = map.keySet().iterator();
		
		//开始循环每个节点
		while(itr.hasNext()){
			Object obj = itr.next();
			if(null==obj)continue;
			
			Object nodeObj = map.get(obj.toString());
			if(null==nodeObj)continue;
			
			FlowNode node = (FlowNode)nodeObj;
			
			if(null==node.getCoordinate())continue;
			
			int w = Integer.parseInt(node.getCoordinate().getX());
			int h = Integer.parseInt(node.getCoordinate().getY());
			
			if(w>nodeX)nodeX = w;
			if(h>nodeY)nodeY = h;
		}
		
		if((nodeY+TIP_HEIGHT)>canvas_height)canvas_height = nodeY+TIP_HEIGHT;
		if((nodeX+2*node_image_width)>canvas_width)canvas_width = (nodeX+2*node_image_width);
		if(canvas_width<TIP_WIDTH)canvas_width = TIP_WIDTH;
	}
	
	/**
	 * 根据画图对象和文档对象进行画节点
	 * 
	 * @param g
	 *            画图对象
	 * 
	 * @param doc
	 *            文档对象
	 */
	private void drawNode(Graphics2D g, Flow flow) {
		String nodeId = null;
		String nodeName = null;
		String nodeType = null;
		int nodeX = 0;
		int nodeY = 0;

		Map map = flow.getNodes();
		if(null==map)return;
		
		Iterator itr = map.keySet().iterator();
		if(null==itr)return;
		
		//开始循环每个节点
		while(itr.hasNext()){
			Object obj = itr.next();
			if(null==obj)continue;
			
			Object nodeObj = map.get(obj.toString());
			if(null==nodeObj)continue;
			
			FlowNode node = (FlowNode)nodeObj;
			
			if(null==node.getCoordinate())continue;
			
			nodeId = node.getId();
			nodeName = node.getName();
			nodeType = node.getNodeType();
			
			nodeX = Integer.parseInt(node.getCoordinate().getX());
			nodeY = Integer.parseInt(node.getCoordinate().getY());

			if (null == xyMap){
				xyMap = new HashMap();
			}
			xyMap.put(nodeId, nodeX + "," + nodeY);

			// 进行画节点
			drawNode(g, nodeType, nodeId, nodeName, nodeX, nodeY);
		}
	}

	/**
	 * 画节点间的连接线,在执行这个方法前,必须先执行画节点
	 * 
	 * @param g
	 *            画图对象
	 * 
	 * @param doc
	 *            文档对象
	 */
	private void drawConnect(Graphics2D g, Flow flow) {
		Point pFrom = new Point();
		Point pTo = new Point();
		
		Map map = flow.getNodes();
		if(null==map)return;
		
		Iterator itr = map.keySet().iterator();
		if(null==itr)return;
		
		//开始循环每个节点
		while(itr.hasNext()){
			Object obj = itr.next();
			if(null==obj)continue;
			
			Object nodeObj = map.get(obj.toString());
			if(null==nodeObj)continue;
			
			FlowNode node = (FlowNode)nodeObj;
			
			if(null==node.getCoordinate())continue;
			
			String xy = (String) xyMap.get(node.getId());

			pFrom.x = Integer.parseInt(node.getCoordinate().getX());
			pFrom.y = Integer.parseInt(node.getCoordinate().getY());
			
			int type = 1;
			if(node.getNodeType().equals("0")){
				type = 0;
			}

			List tranList = node.getTransitions();
			
			if(null!=tranList){
				for (int j = 0; j < tranList.size(); j++) {
					if(null==tranList.get(j))continue;
					Transition tran = (Transition) tranList.get(j);
					xy = (String) xyMap.get(tran.getId());
					pTo.x = Integer.parseInt(xy.split(",")[0]);
					pTo.y = Integer.parseInt(xy.split(",")[1]);

					if (isExist(type, node.getId(), tran.getId())) {//isExist(1, tran.getId(), tran.getId())
						drawConnect(g, pFrom, pTo, Color.BLUE,flow);
					} else {
						drawConnect(g, pFrom, pTo, Color.BLACK,flow);
					}
				}
			}
		}
	}
	/**
	 * 设置提示信息
	 * 
	 * @param g
	 */
	private void setTips(Graphics2D g){
		int jgdd = 30;
		int jgii = 5;
		int y = canvas_height - TIP_HEIGHT+65;
		int x = (canvas_width-TIP_WIDTH)/2;
	
		
		Image img = null;
		for(int i=0;i<strTipImages.length;i++){
			File file = new File(imagePath+strTipImages[i]);
			try {
				img = ImageIO.read(file);
			} catch (IOException e) {
			    logger.error(e);
			}
			
			int widethw = img.getWidth(null);
			int heightw = img.getHeight(null);
			//先设置图片的宽度
			node_image_width = widethw;
			node_image_height = heightw;
			
			g.drawImage(img, x, y, widethw, heightw, null);
			
			g.setColor(Color.BLACK);
			x=x+widethw+jgii;
			g.drawString(this.strTips[i], x, y+(int)(TIP_HEIGHT/4));
			
			x=x+jgdd+40;
		}
	}
	/**
	 * 实现在图上画节点的功能
	 * 
	 * @param g
	 * @param nodeType
	 * @param nodeId
	 * @param nodeName
	 * @param x
	 * @param y
	 */
	private void drawNode(Graphics2D g, String nodeType, String nodeId, String nodeName, int x, int y) {
		String fileName = imagePath;
		boolean isNoded = false;
		int pos = 0;
		String flowState = "";
		
		if (null != nodeId && null!=currentNodeId && currentNodeId.indexOf(nodeId)>=0) {
			flowState = ucapWorkFlow.getFlowStateBean().getFlowState();
			pos = 2;
//			if(null!=flowState && flowState.equals(WorkFlowConstant.UCAP_FLOW_END_STATE)){
//				pos = 1;
//			}else{
//				pos = 2;
//			}
		} else {
			if(null!=nodeType && nodeType.trim().equals("0")){//为开始节点的话,则默认为已办过节点
				pos = 1;
				isNoded = true;
			}else if (isExist(0, nodeId, null)) {
				pos = 1;
				isNoded = true;
			}
		}
		
		if(pos == 0 && null != this.tansnodes) {
			if(this.tansnodes.indexOf(nodeId) > -1) {
				pos = 1;
			}
		}
		if (null != nodeType && !nodeType.trim().equals("3")) {
			fileName = strNodeImages[pos];
			
		} else {
			fileName = strsubFlowImages[pos];
		}
		Image img = null;
		File file = new File(imagePath+fileName);
		try {
			img = ImageIO.read(file);
		} catch (IOException e) {
		    logger.error(e);
		}

		int widethw = img.getWidth(null);
		int heightw = img.getHeight(null);
		//先设置图片的宽度
		node_image_width = widethw;
		node_image_height = heightw;
		
		g.drawImage(img, x, y, widethw, heightw, null);

		// 进行图面上写字
		if (null != nodeId && null!=currentNodeId && currentNodeId.indexOf(nodeId)>=0) {
			g.setColor(Color.RED);
//			if(null!=flowState && flowState.equals(WorkFlowConstant.UCAP_FLOW_END_STATE)){
//				g.setColor(Color.BLUE);
//			}else{
//				g.setColor(Color.RED);
//			}
			
		} else {
			if (isNoded) {
				g.setColor(Color.BLUE);
			} else {
				g.setColor(Color.BLACK);
			}
		}

		
		// 做适当的偏移
		x = x + (4 - nodeName.length()) * 3;

		g.drawString(nodeName, x, y + heightw + 15);
		// 节点画图完毕

	}
	/**
	 * 判断一个unid在一个数组中是否存在,如果type=0的话,那么只需要判断bunid在数组中是否存在,存在则返回true ,
	 * 否则则判断eunid在二维数组的第二维是否也存在
	 * 
	 * @param type
	 *            判断的类型
	 * @param bunid
	 *            一维的unid
	 * @param eunid
	 *            二维的unid
	 * @return true或false
	 */
	private boolean isExist(int type, String bunid, String eunid) {
		boolean result = false;
		
		if(type==0 && null!=eunid && eunid.equals(this.currentNodeId)){
			return true;
		}
		
		if (null != nodeOuts) {
			for (int i = 0; i < nodeOuts.length; i++) {
				if (type == 0) {
					if (null != bunid && bunid.trim().equals(nodeOuts[i][0])) {
						result = true;
						break;
					}
				} else {
					if ((null != bunid && bunid.trim().equals(nodeOuts[i][0]))
							&& (null != eunid && eunid.trim().equals(nodeOuts[i][1]))) {
						result = true;
						break;
					}
				}
			}
		}

		return result;
	}
	/**
	 * 画节点间的连接
	 * 
	 * @param g
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 * @param color
	 */
	private void drawConnect(Graphics2D g, Point rtFrom, Point rtTo, Color color,Flow flow) {
		Point pFrom = new Point(); // 源节点中心坐标
		Point pTo = new Point(); // 目标节点中心坐标
		Point pLineFrom = new Point(); // 连线起点坐标
		Point pLineTo = new Point(); // 连线终点坐标
		int halfHeightFrom; // 源节点长度的一半
		int halfHeightTo; // 目标节点长度的一半
		int halfWidthFrom; // 源节点高度的一半
		int halfWidthTo; // 目标节点高度的一半
		int a; // 直角三角形的对边（组成直角的一个边）
		int b; // 直角三角形的邻边（组成直角的另一个边）
		double tgab = 0; // a/b的值
		double tgba = 0; // b/a的值
		int aSign = 0; // 竖轴的符号标志
		int bSign = 0; // 横轴的符号标志

		int pospx = 4; // 定义一个偏移量
		
		boolean hasTween = false;
		
		hasTween  = this.hasBetween(rtFrom, rtTo, flow);

		if(!this.isVertical(rtFrom.x, rtFrom.y, rtTo.x, rtTo.y, hasTween)){
			pFrom.x = node_image_width / 2 + rtFrom.x;
			pFrom.y = node_image_height / 2 + rtFrom.y;
			pTo.x = node_image_width / 2 + rtTo.x;
			pTo.y = node_image_height / 2 + rtTo.y;

			halfWidthFrom = node_image_width / 2;
			halfWidthTo = node_image_width / 2 + pospx;
			halfHeightFrom = node_image_height / 2;
			halfHeightTo = node_image_height / 2 + pospx;

			a = pTo.y - pFrom.y;
			b = pTo.x - pFrom.x;

			// 现在逻辑实现如下
			if (b == 0) {
				pLineFrom.x = pFrom.x;
				pLineTo.x = pTo.x;
				if (a > 0) {
					pLineFrom.y = pFrom.y + halfHeightFrom;
					pLineTo.y = pTo.y - halfHeightTo;
				} else {
					pLineFrom.y = pFrom.y - halfHeightFrom;
					pLineTo.y = pTo.y + halfHeightTo;
				}
			} else {
				if (a == 0) {
					pLineFrom.y = pFrom.y;
					pLineTo.y = pTo.y;
					if (b > 0) {
						pLineFrom.x = pFrom.x + halfWidthFrom;
						pLineTo.x = pTo.x - halfWidthTo;
					} else {
						pLineFrom.x = pFrom.x - halfWidthFrom;
						pLineTo.x = pTo.x + halfWidthTo;
					}
				} else{
					tgab = a / b;
				}
				if (b > 0){
					bSign = 1;
				}
				if (b < 0){
					bSign = -1;
				}
				if (tgab >= -1 && tgab <= 1) {
					pLineFrom.x = pFrom.x + halfWidthFrom * bSign;
					pLineFrom.y = pFrom.y + (int) (halfWidthFrom * bSign * tgab);
					pLineTo.x = pTo.x - halfWidthTo * bSign;
					pLineTo.y = pTo.y - (int) (halfWidthTo * bSign * tgab);
				} else {
					tgba = b / a;
					if (a > 0){
						aSign = 1;
					}
					if (a < 0){
						aSign = -1;
					}
					if (tgba > -1 && tgba < 1) {
						pLineFrom.x = pFrom.x + (int) (halfHeightFrom * aSign * tgba);
						pLineFrom.y = pFrom.y + halfHeightFrom * aSign;
						pLineTo.x = pTo.x - (int) (halfHeightTo * aSign * tgba);
						pLineTo.y = pTo.y - halfHeightTo * aSign;
					}
				}

			}
			// 算出开始节点坐标和终止终点坐标,现在可以进行画线
			g.setColor(color);
			g.drawLine(pLineFrom.x, pLineFrom.y, pLineTo.x, pLineTo.y);
			// 画完线条之后,开始画箭头
			int[][] result = this.getPolygon(pLineFrom.x, pLineFrom.y, pLineTo.x, pLineTo.y,false);
			g.fillPolygon(result[0], result[1], 3);
		}else{//画垂直线
			Point pMidle = new Point(); // 目标节点中心坐标
			Point ptZZ = new Point();    //转折点
			
			//起点
			if(hasTween){
				pFrom.y = rtFrom.y+(int)(node_image_height/2);
				
				if(rtFrom.x<rtTo.x){
					pFrom.x = rtFrom.x+node_image_width;
					ptZZ.x = pFrom.x+node_image_width;
					//pTo.x = rtTo.x+node_image_width;//
				}else{
					pFrom.x = rtFrom.x;
					ptZZ.x = pFrom.x-node_image_width;
					//pTo.x = rtTo.x;
				}
				
				if(ptZZ.x>rtTo.x){
					pTo.x = rtTo.x+node_image_width;
				}else{
					pTo.x = rtTo.x;
				}
				
				ptZZ.y = pFrom.y;
				pTo.y = rtTo.y+(int)(node_image_height/2);
				pMidle.x = ptZZ.x;
				pMidle.y = pTo.y;
				
			}else{
				if(rtTo.y>rtFrom.y){
					pFrom.y = rtFrom.y+node_image_height;
				}else{
					pFrom.y = rtFrom.y;
				}
				pFrom.x = rtFrom.x+node_image_width/2;
				
				//终点
				pTo.y = rtTo.y+node_image_height/2;
				if(rtTo.x>rtFrom.x){
					pTo.x = rtTo.x;
				}else{
					pTo.x = rtTo.x+node_image_width;
				}
				
				pMidle.x=pFrom.x;
				pMidle.y = pTo.y;
			}
			
			g.setColor(color);
			
//			if(pFrom.y>pTo.y){
//				pMidle.y = pMidle.y+4;
//				pTo.y = pTo.y+4;
//			}else{
//				if(pFrom.y<pTo.y){
//					pMidle.y = pMidle.y-4;
//					pTo.y = pTo.y-4;
//				}
//			}
			
			if(ptZZ.x!=0){
				g.drawLine(pFrom.x, pFrom.y, ptZZ.x, ptZZ.y);
				g.drawLine(ptZZ.x, ptZZ.y, pMidle.x, pMidle.y);
			}else{
				if(pMidle.x>rtFrom.x && pMidle.x<rtFrom.x+node_image_width && pMidle.y>rtFrom.y && pMidle.y<rtFrom.y+node_image_height){
					pMidle.x = rtFrom.x+node_image_width;
					pMidle.y = pTo.y;
				}else{
					g.drawLine(pFrom.x, pFrom.y, pMidle.x, pMidle.y);
				}
			}
			
			g.drawLine(pMidle.x, pMidle.y, pTo.x, pTo.y);
			
			//画箭头
			int[][] result = this.getPolygon(pMidle.x, pMidle.y, pTo.x, pTo.y,hasTween);
			
			g.fillPolygon(result[0], result[1], 3);
		}
	}
	
	private boolean isVertical(int x1,int y1,int x2,int y2,boolean hasBetween){
		if(null!=this.vertical && this.vertical.trim().equals("0")){
			return false;
		}else{
			if(hasBetween){
				return true;
			}
			
			if(x1>(x2-10) && x1<(x2+10)){
				return false;
			}
			
			if(y1>(y2-10) && y1<(y2+10)){
				return false;
			}
		}	
		return true;
	}
	
	/**
	 * 看中间是否有间隔节点
	 * 
	 * @param rtFrom
	 * @param rtTo
	 * @param flow
	 * @return
	 */
	private boolean hasBetween(Point rtFrom,Point rtTo,Flow flow){
		boolean result = false;
		int nodeX=0;
		int nodeY=0;
		int minY=0;
		int maxY = 0;
		int x = 0;
		
		Map map = flow.getNodes();
		if(null==map)return false;
		
		Iterator itr = map.keySet().iterator();
		if(null==itr)return false;
		
		if(rtFrom.y>rtTo.y){
			minY = rtTo.y;
			maxY = rtFrom.y;
		}else{
			minY = rtFrom.y;
			maxY = rtTo.y;
		}
		
		x = rtFrom.x+(int)(node_image_width/2);
		
		//开始循环每个节点
		while(itr.hasNext()){
			Object obj = itr.next();
			if(null==obj)continue;
			
			Object nodeObj = map.get(obj.toString());
			if(null==nodeObj)continue;
			
			FlowNode node = (FlowNode)nodeObj;
			
			nodeX = Integer.parseInt(node.getCoordinate().getX());
			nodeY = Integer.parseInt(node.getCoordinate().getY());

			if(nodeY<maxY && nodeY>minY){
				if(nodeX<x && nodeX>(x-node_image_width)){
					result = true;
					break;
				}
			}
		}
		
		return result;
	}
	/**
	 * 
	 * @param x1
	 * @param x2
	 * @param y1
	 * @param y2
	 * @return
	 */
	private int[][] getPolygon(int x1, int y1, int x2, int y2,boolean hasBetween) {
		int ddx = 0;
		int ddy = 0;

		int[][] result = new int[2][3];
		
		if(!this.isVertical(x1, y1, x2, y2, hasBetween)){
			double sin30 = Math.sin(Math.PI / 6);
			double cos30 = Math.cos(Math.PI / 6);
			double sin60 = Math.sin(Math.PI / 3);
			double cos60 = Math.cos(Math.PI / 3);
			double length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

			int dx = x2 - x1;
			int dy = y2 - y1;

			ddx = (int) (dx / length * ARM_LENGTH * cos30 + dy / length * ARM_LENGTH * sin30);
			ddy = (int) (dy / length * ARM_LENGTH * cos30 - dx / length * ARM_LENGTH * sin30);
			// 第一点
			result[0][0] = (x2 - ddx);
			result[1][0] = (y2 - ddy);
			// ddx =

			// 中间点的坐标
			result[0][1] = x2;
			result[1][1] = y2;

			ddx = (int) (dy / length * ARM_LENGTH * cos60 - dx / length * ARM_LENGTH * sin60);
			ddy = (int) (dx / length * ARM_LENGTH * cos60 + dy / length * ARM_LENGTH * sin60);

			result[0][2] = (x2 + ddx);
			result[1][2] = (y2 - ddy);
		}else{
			double sin30 = Math.sin(Math.PI / 6);
			double cos30 = Math.cos(Math.PI / 6);
				
			result[0][1] = x2;
			result[1][1] = y2;
			
			if(x2>x1){
				result[0][0] = x2-(int)(ARM_LENGTH * cos30);
				result[0][2] = x2-(int)(ARM_LENGTH * cos30);
			}else{
				result[0][0] = x2+(int)(ARM_LENGTH * cos30);
				result[0][2] = x2+(int)(ARM_LENGTH * cos30);
			}
		
			result[1][0]=y2+(int)(ARM_LENGTH * sin30);
			result[1][2]=y2-(int)(ARM_LENGTH * sin30);
		}

		return result;
	}
}