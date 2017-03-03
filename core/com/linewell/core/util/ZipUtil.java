package com.linewell.core.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import org.apache.tools.zip.ZipEntry;   
import org.apache.tools.zip.ZipFile;   
import org.apache.tools.zip.ZipOutputStream; 

/*
 * zjianhui@linewell.com  
 * 操作zip
 */
public class ZipUtil {

	/**    
     * zip压缩功能,压缩sourceFile(文件夹目录)下所有文件，包括子目录  
     * @param  sourceFile,待压缩目录; toFolerName,压缩完毕生成的目录  
     * @throws Exception    
     */  
    public static void fileToZip(String sourceFile, String toFolerName) throws Exception {   
        List fileList = getSubFiles(new File(sourceFile));//得到待压缩的文件夹的所有内容     
        ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(toFolerName));   
  
        ZipEntry ze = null;   
        byte[] buf = new byte[1024];   
        int readLen = 0;   
        for (int i = 0; i < fileList.size(); i++) { //遍历要压缩的所有子文件  
            File file = (File) fileList.get(i);   
            System.out.println("压缩到的文件名:" + file.getName());  
            ze = new ZipEntry(getAbsFileName(sourceFile, file));   
            ze.setSize(file.length());   
            ze.setTime(file.lastModified());   
            zos.putNextEntry(ze);   
            InputStream is = new BufferedInputStream(new FileInputStream(file));   
            while ((readLen = is.read(buf, 0, 1024)) != -1) {   
                zos.write(buf, 0, readLen);   
            }   
            is.close();   
        }   
        zos.close();
        System.out.println("压缩完成!");     
    }   

    /**  
     * 解压zip文件  
     * @param sourceFile,待解压的zip文件; toFolder,解压后的存放路径  
     * @throws Exception  
     **/  
    public static void zipToFile(String sourceFile, String toFolder) throws Exception {   
        String toDisk = toFolder;//接收解压后的存放路径   
        ZipFile zfile = new ZipFile(sourceFile);//连接待解压文件   
        Enumeration zList = zfile.getEntries();//得到zip包里的所有元素   
        ZipEntry ze = null;   
        byte[] buf = new byte[1024];
        while (zList.hasMoreElements()) {   
            ze = (ZipEntry) zList.nextElement();   
            if (ze.isDirectory()) {   
                getRealFileName(toDisk, ze.getName()); 
                continue;   
            }   
  
            //以ZipEntry为参数得到一个InputStream，并写到OutputStream中   
            OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(getRealFileName(toDisk, ze.getName())));   
            InputStream inputStream = new BufferedInputStream(zfile.getInputStream(ze));   
            int readLen = 0;   
            while ((readLen = inputStream.read(buf, 0, 1024)) != -1) {   
                outputStream.write(buf, 0, readLen);   
            }   
            inputStream.close();   
            outputStream.close();      
        }   
        zfile.close();   
    }   
  
    /**    
     * 给定根目录，返回另一个文件名的相对路径，用于zip文件中的路径.    
     * @param baseDir java.lang.String 根目录    
     * @param realFileName java.io.File 实际的文件名    
     * @return 相对文件名    
     */  
    private static String getAbsFileName(String baseDir, File realFileName) {   
        File real = realFileName;   
        File base = new File(baseDir);   
        String ret = real.getName();   
        while (true) {   
            real = real.getParentFile();   
            if (real == null || real.equals(base)){   
                break;      
            }else { 
                ret = real.getName() + "/" + ret;  
            }    
        }   
        return ret;   
    } 
    
    /**    
     * 取得指定目录下的所有文件列表，包括子目录.    
     * @param baseDir File 指定的目录    
     * @return 包含java.io.File的List    
     */  
    private static List getSubFiles(File baseDir) {   
        List ret = new ArrayList();   
        File[] tmp = baseDir.listFiles();   
        for (int i = 0; i < tmp.length; i++) {   
            if (tmp[i].isFile()){   
                ret.add(tmp[i]);   
            }
            if (tmp[i].isDirectory()){
                ret.addAll(getSubFiles(tmp[i]));
            }
        }   
        return ret;   
    }   
  
    /**  
     * 给定根目录，返回一个相对路径所对应的实际文件名.  
     * @param zippath 指定根目录  
     * @param absFileName 相对路径名，来自于ZipEntry中的name  
     * @return java.io.File 实际的文件  
     */  
    private static File getRealFileName(String zipPath, String absFileName){   
        String[] dirs = absFileName.split("/", absFileName.length());   
        File ret = new File(zipPath);// 创建文件对象   
        if (dirs.length > 1) {   
            for (int i = 0; i < dirs.length - 1; i++) {   
                ret = new File(ret, dirs[i]);   
            }   
        }   
        if (!ret.exists()) {// 检测文件是否存在   
            ret.mkdirs();// 创建此抽象路径名指定的目录   
        }   
        ret = new File(ret, dirs[dirs.length - 1]);// 根据 ret 抽象路径名和 child 路径名字符串创建一个新 File 实例   
        return ret;   
    }   
}