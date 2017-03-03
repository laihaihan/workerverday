package com.linewell.core.db;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Types;

import org.apache.commons.dbutils.DbUtils;

import com.linewell.core.util.OracleDbUtil;


public class BuildDTO {
	public void build(String tableName)
	{
	   PrintWriter pw = null;


	   try
	   {
	    pw = new PrintWriter(new File("src/com/abc/bean/EventStruct.java"));

	    pw.println("package com.abc.bean;\n\n");
	    pw.println("");
	    pw.println("public class EventStruct \n{\t");

	    String[][] result = OracleDbUtil.getCommentsByTablename("", tableName);
	    for (int i = 1; i <= result.length; i++)
	    {
	     String pStr = ""; //setXxxx
	     String typeStr = ""; //类型


	     //获取列名
	     String columName = result[i][0];
	     //获取每一列的数据类型
	     int type = Types.VARCHAR;//Integer.parseInt(result[i][1]) ;

	     //判断
	     if(Types.INTEGER == type)
	     {
	      typeStr = "Integer";
	     }
	     else if(Types.VARCHAR == type)
	     {
	      typeStr = "String";
	     }

	     //组装 private 的语句
	     pStr += "private "+typeStr+" "+columName+";";


	     //输出 private 的字段
	     pw.println("\t"+pStr+"");

	    }


	    String constructStr = ""; //构造
	    //组装空参构造
	    constructStr += "public EventStruct()\n\t{\n\n\t}";
	    //输出空参构造
	    pw.println("\n\t"+constructStr+"\n");

	    for (int i = 1; i <= result.length; i++)
	    {
	     String getStr = "";
	     String setStr = "";
	     String typeStr = "";

	     //获取列名
	     String columName = result[i][0];
	     //获取每一列的数据类型
	     int type = Types.VARCHAR;//Integer.parseInt(result[i][1]) ;


	     //判断
	     if(Types.INTEGER == type)
	     {
	      typeStr = "Integer";
	     }
	     else if(Types.VARCHAR == type)
	     {
	      typeStr = "String";
	     }
	     //组装 set 的语句
	     setStr += "public void set"+columName.substring(0, 1).toUpperCase()+""+columName.substring(1)+"("+typeStr+" "+columName+")\n\t{\n";
	     setStr += "\t\tthis."+columName+" = "+columName+";\n\t}";

	     //组装get语句
	     getStr += "public "+typeStr+" get"+columName.substring(0,1).toUpperCase()+""+columName.substring(1)+"()\n\t{\n\t";
	     getStr += "\treturn this."+columName+";\n\t}";

	     //输出 set
	     pw.println("\t"+setStr);
	     // 输出 get
	     pw.println("\t"+getStr);
	    }


	    pw.println("}");

	    //缓冲
	    pw.flush();
	    pw.close();

	   }
	   catch (FileNotFoundException e)
	   {
	    e.printStackTrace();
	   }
	   finally
	   {
		   pw.close();
	   }
	}

	public static void main(String[] args)
	{
	   BuildDTO dto = new BuildDTO();

	   dto.build("alerts.status");
	}


}
