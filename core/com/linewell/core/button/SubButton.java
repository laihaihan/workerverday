package com.linewell.core.button;

import javax.persistence.Column;
import javax.persistence.Table;


@Table(name = "CORE_SUB_BUTTON")
public class SubButton {
	@Column(name = "SUB_SORT")
	private long subSort;

	@Column(name = "SUB_IMG")
	private String subImg = "";

	@Column(name = "SUB_UNID")
	private String subUnid = "";

	@Column(name = "BUTTON_UNID")
	private String buttonUnid = "";

	@Column(name = "SUB_NAME")
	private String subName = "";

	@Column(name = "SUB_BELONGTO")
	private String subBelongto = "";

	@Column(name = "FN_PATH")
	private String fnPath = "";

	public long getSubSort() {
		return subSort;
	}

	public void setSubSort(long subSort) {
		this.subSort = subSort;
	}

	public String getSubImg() {
		return subImg;
	}

	public void setSubImg(String subImg) {
		this.subImg = subImg;
	}

	public String getSubUnid() {
		return subUnid;
	}

	public void setSubUnid(String subUnid) {
		this.subUnid = subUnid;
	}

	public String getButtonUnid() {
		return buttonUnid;
	}

	public void setButtonUnid(String buttonUnid) {
		this.buttonUnid = buttonUnid;
	}

	public String getSubName() {
		return subName;
	}

	public void setSubName(String subName) {
		this.subName = subName;
	}

	public String getSubBelongto() {
		return subBelongto;
	}

	public void setSubBelongto(String subBelongto) {
		this.subBelongto = subBelongto;
	}

	public String getFnPath() {
		return fnPath;
	}

	public void setFnPath(String fnPath) {
		this.fnPath = fnPath;
	}

}
