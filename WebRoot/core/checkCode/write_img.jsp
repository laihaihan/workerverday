<%@ page language="java" contentType="image/jpeg" pageEncoding="UTF-8" %>
<%@ page import="java.awt.*"%>
<%@ page import="java.awt.image.BufferedImage"%>
<%@ page import="java.io.OutputStream"%>
<%@ page import="java.util.Random"%>
<%@ page import="javax.imageio.ImageIO"%>
<%--
	功能：输出验证码图片
	@author:qcongyong
	@date:2012-03-28
--%>
<%
	//设置页面不缓存
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", 0);
	
	//图片初始化
	int width = 50, height = 20;
	BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);//创建图象
	Graphics graphics = image.getGraphics();//获取画布
	graphics.setFont(new Font("Times New Roman", Font.PLAIN, 18));//设定字体
	graphics.setColor(this.getRandColor(200, 250));//设置画笔颜色
	graphics.fillRect(0, 0, width, height);//填充矩形
	
	//随机产生150条干扰线，使图象中的认证码不易被其它程序探测到
	graphics.setColor(this.getRandColor(150, 200));//设置画笔颜色
	Random random = new Random();
	for (int i = 0; i < 150; i++) {
		int x = random.nextInt(width);
		int y = random.nextInt(height);
		int xl = random.nextInt(12);
		int yl = random.nextInt(12);
		graphics.drawLine(x, y, x + xl, y + yl);
	}
	
	//写入验证码
	String rand = request.getParameter("rand");
	int r = 20 + random.nextInt(110);
	int g = 20 + random.nextInt(110);
	int b = 20 + random.nextInt(110);
	graphics.setColor(new Color(r,g,b));//调用函数出来的颜色相同，可能是因为种子太接近，所以只能直接生成
	graphics.drawString(rand, 6, 16);
	graphics.dispose();//图象生效

	//输出图象到页面
	response.reset();
    out.clear();
    out = pageContext.pushBody();
	OutputStream os = null;
	try{
		os = response.getOutputStream();
		ImageIO.write(image, "JPEG", os);
	}catch(Exception e){
		e.printStackTrace();
	}finally{
		if(os != null){
			try{
				os.close();
				os = null;
			}catch(Exception e){
				e.printStackTrace();
			}	
		}
	}
%>
	
<%!
	//给定范围获得随机颜色
	private Color getRandColor(int fc, int bc) {
		fc = fc > 255 ? 255 : fc;
		bc = bc > 255 ? 255 : bc;
		Random random = new Random();
		int r = fc + random.nextInt(bc - fc);
		int g = fc + random.nextInt(bc - fc);
		int b = fc + random.nextInt(bc - fc);
		return new Color(r, g, b);
	}
%>