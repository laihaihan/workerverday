package servlet;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class FileUpload extends HttpServlet {
	
	private String uploadPath="E:\\addnetFile\\";//要上传文件的目录
	private File tempPath=new File("E:\\tempFile\\");//存放上传的文件的目录
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html;charset=GB2312");
		response.setCharacterEncoding("gb2312");
		PrintWriter out=response.getWriter();
		out.println("请求内容的长度为："+request.getContentLength());
		out.println("请求内容的类型为："+request.getContentType());
		
		DiskFileItemFactory factory=new DiskFileItemFactory();
		factory.setRepository(tempPath);
		factory.setSizeThreshold(4096);
		
		ServletFileUpload upload=new ServletFileUpload(factory);
		upload.setSizeMax(1000000);
		List<?> fileitems=null;
		try{
			fileitems=upload.parseRequest(request);
			Iterator<?> iterator=fileitems.iterator();
			String regex=".+\\\\(.+)$";
			String[] errortype={".exe",".com",".cgi",".asp"};
			Pattern p=Pattern.compile(regex);
			while(iterator.hasNext()){
				FileItem item=(FileItem) iterator.next();
				if(!item.isFormField()){
					String name=item.getName();
					long size=item.getSize();
					if(name==null||name.equals("")&&size==0)
						continue;
					Matcher m=p.matcher(name);
					if(m.find()){
						for(int temp=0;temp<errortype.length;temp++){
							if(m.group(1).endsWith(errortype[temp]))
								throw new IOException(name+":wrong type");
						}
						try{
							item.write(new File(tempPath,m.group(1)));
							out.println(name+"  "+size+"<br/>");
							out.println("上传成功");
						}catch(Exception e){
							out.println("333"+e);
						}	
					}
					else{
						throw new IOException("fail to upload");
					}
						
				}
			}
		}catch(IOException e){
			out.println("222"+e);
		}
		catch(FileUploadException e1){
			e1.printStackTrace();
			out.println("111"+e1);
		}
	}

	public void init() throws ServletException {
		if(!new File(uploadPath).isDirectory())
			new File(uploadPath).mkdir();
		if(!tempPath.isDirectory())
			tempPath.mkdir();
	}
	
	public void destroy(){
		super.destroy();
	}

}
