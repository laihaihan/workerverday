package com.linewell.core.util;

import java.io.File;

/**
 * <p>
 *    操作视频的工具类<使用MPlayer>
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Nov 7, 2012
 * @version 1.0  
 */
public class VedioUtil {
	/**
	 * 将视频文件转换成flv格式
	 * 
	 * @param file			源视频文件
	 * @param playerPath	MPlayer软件的存放路径
	 * @param destPath		生成的预览图片的存放路径
	 * @return
	 */
	public static boolean transToFlv(File file, String playerPath, String destPath) {
		boolean result = true;
		String fileName = file.getName();
		String filePath = file.getPath();
		String fileExt = fileName.substring(fileName.lastIndexOf("."));
		
		//对flv文件只需将其拷贝到目标路径即可
		if(".flv".equals(fileExt.toLowerCase())){
			if(!StrUtil.isNull(destPath)){
				File destFile = new File(destPath + File.separator + fileName);		
				result = FileUtil.copyFile(file, destFile);	
			}
		}
		//对非flv文件做转换
		else{
			if(StrUtil.isNull(destPath)){
				destPath = filePath.replaceAll(fileExt, ".flv");
			}else{
				destPath = destPath + File.separator + fileName.replaceAll(fileExt, ".flv");
			}
			
			StringBuffer command = new StringBuffer();
			command.append(playerPath + "/mencoder " + file.getPath() + " -o " + destPath);
			command.append(" -of lavf -oac mp3lame -lameopts abr:br=56 -ovc lavc");
			command.append(" -lavcopts vcodec=flv:vbitrate=500:mbd=2:mv0:trell:v4mv:cbp:last_pred=3:dia=4:cmp=6:vb_strategy=1");
			command.append(" -vf scale=512:-3 -ofps 12 -srate 22050");
			
			System.out.println("当前执行的dos命令：【"+command.toString()+"】");
			DosUtil.doCommand(command.toString());
		}
		
		return result; 
	}

	/**
	 * 生成视频的预览图片
	 * 
	 * @param file			源视频文件
	 * @param playerPath	MPlayer软件的存放路径
	 * @param destPath		生成的预览图片的存放路径
	 * @return
	 */
	public static boolean createPreViewImage(File file, String playerPath, String destPath){
		String fileName = file.getName();
		String filePath = file.getPath();
		String fileExt = fileName.substring(fileName.lastIndexOf("."));
		if(StrUtil.isNull(destPath)){
			destPath = filePath.replaceAll(fileExt, ".jpg");
		}else{
			destPath = destPath + File.separator + fileName.replaceAll(fileExt, ".jpg");
		}
		
		String command = playerPath + "/ffmpeg -i " + filePath + " -y -f image2 -t 1 -ss 2 " + destPath;		
		System.out.println("当前执行的dos命令：【"+command+"】");
		DosUtil.doCommand(command);
		return true;
	}
}