package com.linewell.core.util;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import jp.sourceforge.qrcode.QRCodeDecoder;
import jp.sourceforge.qrcode.data.QRCodeImage;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.swetake.util.Qrcode;

public class QRCodeUtil {
    /**
     * Logger for this class
     */
    private static final Log logger = LogFactory.getLog(QRCodeUtil.class); 

	/**
	 * 生成二维码
	 * 
	 * @param text
	 * @throws Exception
	 */
	public static void encode(String text,String path) throws Exception {
		BufferedImage bi = new BufferedImage(92, 92, BufferedImage.TYPE_INT_RGB);
		Graphics2D g = bi.createGraphics();
		g.setBackground(Color.WHITE);
		g.clearRect(0, 0, 92, 92);
		g.setColor(Color.BLACK);

		byte[] d = text.getBytes("GBK");
		if (d.length > 0 && d.length < 123) {
			Qrcode qrcode = new Qrcode();
			qrcode.setQrcodeErrorCorrect('M');
			qrcode.setQrcodeEncodeMode('B');
			qrcode.setQrcodeVersion(7);
			
			boolean[][] b = qrcode.calQrcode(d);
			for (int i = 0; i < b.length; i++) {
				for (int j = 0; j < b.length; j++) {
					if (b[j][i]) {
						g.fillRect(j * 3 + 2, i * 3 + 2, 3, 3);
					}
				}
			}
		}

		g.dispose();
		bi.flush();

		String FilePath = path + ".png";
		File f = new File(FilePath);
		ImageIO.write(bi, "png", f);
		System.out.println("生成二维码成功，其源字符串为："+text);
	}

	/**
	 * 解析二维码
	 * 
	 * @param path
	 * @throws Exception
	 */
	public static String decoder(String path) {
		String decodedData = "";
		File imageFile = new File(path);
		QRCodeDecoder decoder = new QRCodeDecoder();
		try {
			BufferedImage image = ImageIO.read(imageFile);
			decodedData = new String(decoder.decode(new J2SEImage(image)), "GBK");
			System.out.println("解析二维码成功，其源字符串为："+decodedData);
		} catch (IOException e) {
		    logger.error(e);
		}
		return decodedData;
	}
}

class J2SEImage implements QRCodeImage {
	
	private BufferedImage image;

	public J2SEImage(BufferedImage image) {
		this.image = image;
	}

	public int getWidth() {
		return image.getWidth();
	}

	public int getHeight() {
		return image.getHeight();
	}

	public int getPixel(int x, int y) {
		return image.getRGB(x, y);
	}
}