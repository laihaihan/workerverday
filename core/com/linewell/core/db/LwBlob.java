package com.linewell.core.db;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Blob;
import java.sql.SQLException;

public class LwBlob implements Blob {
	private InputStream in;

	public LwBlob(InputStream in) {
		this.in = in;
	}

	public InputStream getBinaryStream() throws SQLException {
		if (in == null)
			throw new SQLException("Null Stream");
		return in;
	}

	public byte[] getBytes(long pos, int length) throws SQLException {
		byte[] buf = null;
		try {
			int len;
			byte[] tbuf = new byte[length];
			len = in.read(tbuf, (int) pos, length);
			if (len > 0) {
				buf = new byte[len];
				System.arraycopy(tbuf, 0, buf, 0, len);
			}
			tbuf = null;
		} catch (IOException ex) {
			throw new SQLException(ex.getMessage());
		}
		return buf;
	}

	public long length() throws SQLException {
		long len = 0;
		try {
			len = in.available();
		} catch (IOException ex) {
			throw new SQLException(ex.getMessage());
		}
		return 0;
	}

	public long position(Blob pattern, long start) throws SQLException {
		throw new SQLException("Not Support");
	}

	public long position(byte[] pattern, long start) throws SQLException {
		throw new SQLException("Not Support");
	}

	@Override
	public void free() throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public InputStream getBinaryStream(long arg0, long arg1)
			throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public OutputStream setBinaryStream(long arg0) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int setBytes(long arg0, byte[] arg1) throws SQLException {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int setBytes(long arg0, byte[] arg1, int arg2, int arg3)
			throws SQLException {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void truncate(long arg0) throws SQLException {
		// TODO Auto-generated method stub
		
	}

}
