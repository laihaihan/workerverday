package com.linewell.core.style.windows;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class DesktopHelper {
	
	/**
	 * 获取指定路径文件夹下所有图片路径
	 * @param folderPath 文件夹全路径
	 * @param webAppDir web应用路径
	 * @return 字符串组成的链表，内容为图片的路径
	 */
	public List<String> getFolderAllPic(String folderPath,String  webAppDir){
		List filePathList = new ArrayList<String>();
		
		//获取对象
		File folder = new File(folderPath);
		File folderList[] = folder.listFiles();
		
		//循环取出数据
		if(null != folderList){
			for(int i = 0; i < folderList.length; i++){
				if(folderList[i].isFile()){
					//System.out.println(folderList[i].getPath().replace(webAppDir, ""));
					filePathList.add(folderList[i].getPath().replace(webAppDir, "").replace("\\", "\\\\"));
				}
			}
		}
		
		return filePathList;
	}
}
