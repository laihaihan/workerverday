package com.linewell.core.db.test;

import java.io.File;
import java.sql.Blob;
import java.sql.Clob;
import java.sql.Timestamp;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import com.linewell.core.file.AppFile;
import com.linewell.core.util.FileUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.UNIDGenerate;

public class BigFieldTest {
	private Blob btype;
	private String unid;
	private Clob ctype;
	private Timestamp dtype;

	public Timestamp getDtype() {
		return dtype;
	}

	public void setDtype(Timestamp dtype) {
		this.dtype = dtype;
	}

	public Blob getBtype() {
		return btype;
	}

	public void setBtype(Blob btype) {
		this.btype = btype;
	}

	public String getUnid() {
		return unid;
	}

	public void setUnid(String unid) {
		this.unid = unid;
	}

	public Clob getCtype() {
		return ctype;
	}

	public void setCtype(Clob ctype) {
		this.ctype = ctype;
	}
	
	public JSONObject doUpload(HttpServletRequest request,String fileName,File file){
		return null;
	}
}