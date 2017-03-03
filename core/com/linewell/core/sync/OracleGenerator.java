

package com.linewell.core.sync;

import java.io.File;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.log4j.Logger;

import com.linewell.core.db.JDBCTool;
import com.linewell.core.util.FileUtil;
import com.linewell.core.util.StrUtil;
import com.linewell.core.util.SystemUtil;
import com.linewell.ucap.util.EnvironmentUtil;

/**
 *功能说明：
 *<P></P>
 *@author chh
 *@since 2012
 *
 */
public class OracleGenerator implements INetBrakeGenerator{
	public static final String TEST_USERNAME="DATATEST";
	public static final String TEST_PASSWORD="DATATEST";
	public static final String EXP_FILENAME="数据导出.bat";
	public static final String TEMP_TABLE_PRE="GW_";
	public static final String TEMP_TABLE_SUFFIX_I="_I";
	public static final String TEMP_TABLE_SUFFIX_D="_D";
	public static final String CREATE_FILENAME="autocreateProc.bat";
	private static Logger log = Logger.getLogger(OracleGenerator.class);
	//生成文件的路径
	private String genPath ="";
	/**
	 *功能说明：生成网闸的相关配置
	 *<P></P>
	 *@author chh
	 *@since 2012
	 *
	 */
	public void generate(NetBrakeParameter eBrakeParms,NetBrakeParameter iBrakeParms) {
		this.genPath=eBrakeParms.getPath();
		//外网导入设置
		generateImport(eBrakeParms,iBrakeParms);
		//内网导出设置
		generateExport(eBrakeParms,iBrakeParms);
		
		
	}
	
	/**
	 * 
	 * 功能说明：生成导出相关设置
	 * @param jndi	-数据库连接
	 * @param path	-生成的路径
	 * @param tables-生成的表
	 * void
	 * @author chh
	 * @May 16, 2012
	 */
	public void generateExport(NetBrakeParameter eBrakeParms,NetBrakeParameter iBrakeParms){
		String jndi =eBrakeParms.getJndi();
		String []tables =eBrakeParms.getTables();
		String userName=eBrakeParms.getUserName();
		StringBuffer excuteSql =new StringBuffer();
		String genPath=eBrakeParms.getPath();
		ArrayList<String> addTablesList =new ArrayList<String>();
		//大字段表
		ArrayList bigList =new ArrayList();
		for(int i=0;i<tables.length;i++){
			//判断是否含有大字段
			boolean isBigData =hasBigData(jndi,tables[i]);
			if(isBigData){
				bigList.add(tables[i]);
			}
			//1、产生临时表 lw_表名_I,lw_表名_D 这两张表
			excuteSql.append(generateTableSql(tables[i],this.getExportPath(genPath,"SYNC_"+tables[i]+".txt")));
			addTablesList.add(TEMP_TABLE_PRE+tables[i]+TEMP_TABLE_SUFFIX_I);
			addTablesList.add(TEMP_TABLE_PRE+tables[i]+TEMP_TABLE_SUFFIX_D);
			
			//2、产生触发器
			generateTrigger(jndi,tables[i]);
			//3、如果有大字段
			if(isBigData){
				//产生临时表 lw_表名 如 lw_apas_info表
				String bigSql =generateBigDataTable(tables[i]);
				excuteSql.append(bigSql);
				//需要根据表名产生要执行sql文件 ，如 apas_info.sql
				generateExcuteSqlFileForBigData(jndi,tables[i],userName);
				addTablesList.add(TEMP_TABLE_PRE+tables[i]);
			}
			
			
		}
		//4、产生delflag.sql
		this.generateDelFlagSql(tables, userName);
		//5、产生updateflag.sql
		this.generateUpdateFlagSql(tables, userName);
		//6、产生导出bat文件
		this.generateExportBat(eBrakeParms,iBrakeParms,bigList);
	
	
		
		//7、创建 logs 文件夹
		FileUtil.mkdirs(this.getExportPath(genPath,"logs"));
		//8、创建 history文件夹
		FileUtil.mkdirs(this.getExportPath(genPath,"history"));
		//9、判断系统是否有 datatest这个用户，没有就创建
		 createExpUser(eBrakeParms.getTableSpace());
		//10、产生创建触发器和存储过程的bat
		 createPrcAndTrgBat(eBrakeParms);
		 //11、产生操作说明
		 generateExpMemo();
		//12、执行数据库更新操作
		 String [] sqls =excuteSql.toString().split(";");
		 updateExportDatabase(jndi,sqls,addTablesList,eBrakeParms.isRun());
		
	}
	/**
	 * 
	 * 功能说明:导出操作说明
	 * @return
	 * String
	 * @author chh
	 * @May 24, 2012
	 */
	public String generateExpMemo(){
		StringBuffer sb =new StringBuffer();
		sb.append("1、确认导出所需的临时表，处罚器已经创建。可以自动执行或者手工创建\n" );
		sb.append("2、如果步骤1已经完成，直接运行【export.bat】文件\n" );
		sb.append("3、如果步骤1未完成，手工创建临时表，所有需要创建的临时表都是以【SYNC_、bigdata_】开头的txt文件\n" );
		sb.append("手工创建处罚器，所有需要创建的触发器都是以【TG_】开头的txt文件或者直接运行【createProc.bat】文件\n" );
		FileUtil.stringToFile(sb.toString(), this.getExportPath(genPath,"操作说明.txt"));
		return sb.toString();
			
	}
	public String getnerateImpMemo(){
		StringBuffer sb =new StringBuffer();
		sb.append("1、确认内网导入所需的临时表，储存过程已经创建完毕，这个需要手工创建\n" );
		sb.append("2、手工创建临时表，执行以【SYNC_】开头的所有txt文件；\n" );
		sb.append("手工创建存储过程，执行以【P_LW_】开头的所有txt文件；\n" );
		sb.append("3、如果步骤1已经完成，把内网导出生成的两个文件，文件是【export开头的.dmp文件、数据导入开头.bat文件】，拷贝到导入目录下\n" );
		sb.append("4、直接运行【import开头的.bat】文件即可\n" );
	
		FileUtil.stringToFile(sb.toString(), this.getImportPath(this.genPath,"操作说明.txt"));
		return sb.toString();
	}
	/**
	 * 
	 * 功能说明:创建执行触发器和储存过程的bat文件
	 * @param eBrakeParms
	 * @return
	 * String
	 * @author chh
	 * @May 24, 2012
	 */
	public String createPrcAndTrgBat(NetBrakeParameter eBrakeParms){
		//换行符
		String lineFeed =SystemUtil.getLineFeed();
		String userName =eBrakeParms.getUserName();
		String password =eBrakeParms.getPassword();
		String orcl =eBrakeParms.getOrcl();
		String []tables =eBrakeParms.getTables();
		StringBuffer sb =new StringBuffer();
		StringBuffer sbSd =new StringBuffer();
		sb.append("if \"%time:~0,1%\"==\" \" ( "+lineFeed);
		sb.append("		set curdatetime=%date:~0,4%%date:~5,2%%date:~8,2%_0%time:~1,1%%time:~3,2%%time:~6,2%"+lineFeed);
		sb.append("	) else ("+lineFeed);
		sb.append("		set curdatetime=%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%"+lineFeed);
		sb.append("	)"+lineFeed);
		sb.append("	set filename=%curdatetime%"+lineFeed);
		sb.append("echo 记录%filename%创建触发器、存储过程日志 > logs\\%filename%.txt"+lineFeed);
		sb.append("echo 创建触发器日志 >> logs\\%filename%.txt"+lineFeed);
		sb.append("rem step 1 ****创建触发器处理****"+lineFeed);
		sbSd.append(sb.toString());
		for(int i=0;i<tables.length;i++){
			sb.append("sqlplus "+userName+"/"+password+"@"+orcl+"  @"+this.getExportPath(genPath,"TG_"+tables[i]+"_I.txt")+lineFeed);
			sb.append("sqlplus "+userName+"/"+password+"@"+orcl+"  @"+this.getExportPath(genPath,"TG_"+tables[i]+"_D.txt")+lineFeed);
			sb.append("sqlplus "+userName+"/"+password+"@"+orcl+"  @"+this.getExportPath(genPath,"TG_"+tables[i]+"_U.txt")+lineFeed);
			sbSd.append("sqlplus "+userName+"/"+password+"@"+orcl+"  @"+"TG_"+tables[i]+"_I.txt"+lineFeed);
			sbSd.append("sqlplus "+userName+"/"+password+"@"+orcl+"  @"+"TG_"+tables[i]+"_D.txt"+lineFeed);
			sbSd.append("sqlplus "+userName+"/"+password+"@"+orcl+"  @"+"TG_"+tables[i]+"_U.txt"+lineFeed);
		}
		sb.append("pause \"完成创建触发器处理。\""+lineFeed);
		sb.append("quit;"+lineFeed);
		sbSd.append("pause \"完成创建触发器处理。\""+lineFeed);
		sbSd.append("quit;"+lineFeed);
		FileUtil.stringToFile(sb.toString(), this.getExportPath(genPath,"autocreateProc.bat"));
		FileUtil.stringToFile(sbSd.toString(), this.getExportPath(genPath,"createProc.bat"));
		return sb.toString();
	
	}
	/**
	 * 
	 * 功能说明：更新数据库，执行需要创建的临时表、触发器、存储过程
	 * @return
	 * boolean
	 * @author chh
	 * @May 23, 2012
	 */
	private void updateExportDatabase(String jndi,String[]sqls,ArrayList<String> addTablesList,boolean isRun){
		
		String [] delSqls =this.getDropTableSql(addTablesList);
		try {
			//1、删除临时表
			log.debug("执行删除临时表操作="+Arrays.toString(delSqls));
			JDBCTool.doBatchUpdate(jndi,delSqls);
		} catch (Exception e) {
			log.error("删除表失败"+Arrays.toString(delSqls)+"请手动删除这些表");
			log.error(e.getMessage(),e);
			log.error(sqls.toString());
		}
			//2、创建临时表
			try {
				log.debug("执行创建临时表操作="+Arrays.toString(sqls));
				JDBCTool.doBatchUpdate(jndi, sqls);
			} catch (SQLException e) {
				log.error(e.getMessage(),e);
				log.error("创建表失败"+Arrays.toString(sqls)+"请手动新增这些表");
			}
			//3、创建存储过程和触发器
			if(isRun){
				log.error("执行创建触发器存储过程");
				SystemUtil.excuteRunFile(this.getExportPath(this.genPath,"autocreateProc.bat"));
			}
			
		
	}
	/**
	 * 
	 * 功能说明:根据表名构造删除表的执行语句
	 * @param addTablesList
	 * @return
	 * String[]
	 * @author chh
	 * @May 23, 2012
	 */
	private String [] getDropTableSql(ArrayList<String> addTablesList){
		String []sqls =new String[addTablesList.size()];
		for(int i=0;i<addTablesList.size();i++){
			sqls[i] =" drop table "+addTablesList.get(i);
		}
		return sqls;
	}
	
	/**
	 * 
	 * 功能说明：生成导入相关设置
	 * @param jndi	-数据库连接
	 * @param path	-生成的路径
	 * @param tables-生成的表
	 * void
	 * @author chh
	 * @May 16, 2012
	 */
	public void generateImport(NetBrakeParameter eBrakeParms,NetBrakeParameter iBrakeParms){
		String jndi =eBrakeParms.getJndi();
		String []tables =eBrakeParms.getTables();
		String genPath =eBrakeParms.getPath();
		String userName=iBrakeParms.getUserName();
		ArrayList<String> addTablesList =new ArrayList<String>();
		StringBuffer excuteSql =new StringBuffer();
		if(null ==tables ||tables.length<=0)return ;
		for(int i=0;i<tables.length;i++){
			//1、产生临时表 lw_表名_I,lw_表名_D 这两张表
			excuteSql.append(generateTableSql(tables[i],this.getImportPath(genPath,"SYNC_"+tables[i]+".txt")));
			addTablesList.add(TEMP_TABLE_PRE+tables[i]+TEMP_TABLE_SUFFIX_I);
			addTablesList.add(TEMP_TABLE_PRE+tables[i]+TEMP_TABLE_SUFFIX_D);
			//2、产生存储过程
			generateProcedure(jndi,tables[i],userName);
		
		}
		//3、产生 del.sql
		generateImportDelSql(tables,userName);
		//4、产生 执行存储过程 excute_procedure.sql
		generateExcutePrc(tables,userName);
		//5、产生setfilename.bat 文件
		generateSetfilename();
		//6、创建 logs 文件夹
		FileUtil.mkdirs(this.getImportPath(genPath,"logs"));
		//7、创建 history文件夹
		FileUtil.mkdirs(this.getImportPath(genPath,"history"));
		//8、生成操作说明
		this.getnerateImpMemo();
		//9、创建 datatest/datatest用户
		this.createImpUser(iBrakeParms.getTableSpace());
	}
	private String createImpUser(String tableSpace){
		StringBuffer sb =new StringBuffer();
		sb.append(" CREATE USER \"DATATEST\"  PROFILE \"DEFAULT\" \n");
		sb.append("IDENTIFIED BY \"DATATEST\" DEFAULT TABLESPACE \""+tableSpace.toUpperCase()+"\" ;\n");
		sb.append(" ACCOUNT UNLOCK;\n");
		sb.append("GRANT \"DBA\" TO \"DATATEST\" WITH ADMIN OPTION;\n");
		FileUtil.stringToFile(sb.toString(),this.getImportPath(this.genPath, "SYNC_CREATEUSER.txt"));
		return sb.toString();
	}
	private String createExpUser(String tableSpace){
		StringBuffer sb =new StringBuffer();
		sb.append(" CREATE USER \"DATATEST\"  PROFILE \"DEFAULT\" \n");
		sb.append("IDENTIFIED BY \"DATATEST\" DEFAULT TABLESPACE \""+tableSpace.toUpperCase()+"\" ;\n");
		sb.append(" ACCOUNT UNLOCK;\n");
		sb.append("GRANT \"DBA\" TO \"DATATEST\" WITH ADMIN OPTION;\n");
		FileUtil.stringToFile(sb.toString(),this.getExportPath(this.genPath, "SYNC_CREATEUSER.txt"));
		return sb.toString();
	}
	/**
	 * 
	 * 功能说明:产生导入的 setfilename.bat文件
	 * @return
	 * String
	 * @author chh
	 * @May 24, 2012
	 */
	private String generateSetfilename(){
		//换行符
		String lineFeed =SystemUtil.getLineFeed();
		StringBuffer sb =new StringBuffer();
		sb.append("if \"%time:~0,1%\"==\" \" ( "+lineFeed);
		sb.append("		set curdatetime=%date:~0,4%%date:~5,2%%date:~8,2%_0%time:~1,1%%time:~3,2%%time:~6,2%"+lineFeed);
		sb.append("	) else ("+lineFeed);
		sb.append("		set curdatetime=%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%"+lineFeed);
		sb.append("	)"+lineFeed);
		sb.append("	set filename=%curdatetime%"+lineFeed);
		sb.append("echo  生成%filename%外网导入日志 >> logs\\%filename%.txt"+lineFeed);
		FileUtil.stringToFile(sb.toString(), this.getImportPath(this.genPath,"setfilename.bat"));
		return sb.toString();
	}
	/**
	 * 
	 * 功能说明:生成导入时excute_procedure.sql文件
	 * @param tables
	 * @param userName
	 * @return
	 * String
	 * @author chh
	 * @May 23, 2012
	 */
	private String generateExcutePrc(String []tables,String userName){
		StringBuffer sb =new StringBuffer();
		sb.append("spool logs\\%filename%.txt append\n");
		for(int i=0;i<tables.length;i++){
			sb.append("exec "+userName+".P_LW_"+tables[i]+";\n");
		}
		sb.append("quit;\n");
		FileUtil.stringToFile(sb.toString(), this.getImportPath(this.genPath,"excute_procedure.sql"));
		return sb.toString();
	}
	/**
	 * 
	 * 功能说明:生成导入时，del.sql文件
	 * @param tables
	 * @param userName
	 * @return
	 * String
	 * @author chh
	 * @May 23, 2012
	 */
	private String generateImportDelSql(String []tables,String userName){
		StringBuffer sb =new StringBuffer();
		sb.append("spool logs\\%filename%.txt append\n");
		sb.append("--删除临时表数据操作 chh@lincell.com 2012.5.23\n");
		for(int i=0;i<tables.length;i++){
			sb.append("delete "+userName+"."+TEMP_TABLE_PRE+tables[i]+TEMP_TABLE_SUFFIX_D+" ;\n");
			sb.append("delete "+userName+"."+TEMP_TABLE_PRE+tables[i]+TEMP_TABLE_SUFFIX_I+" ;\n");
			sb.append("commit;\n");
			sb.append("quit;\n");
		}
		FileUtil.stringToFile(sb.toString(), this.getImportPath(this.genPath,"del.sql"));
		return sb.toString();
	}
	/**
	 * 
	 * 功能说明:产生导出bat文件
	 * @param eBrakeParms
	 * @param bigList
	 * @return
	 * String
	 * @author chh
	 * @May 22, 2012
	 */
	public String generateExportBat(NetBrakeParameter eBrakeParms,NetBrakeParameter iBrakeParms,List bigList){
		String  expFileName="export";
		String  impFileName="import";
		//换行符
		String lineFeed =SystemUtil.getLineFeed();
		String userName =eBrakeParms.getUserName();
		String password =eBrakeParms.getPassword();
		String orcl =eBrakeParms.getOrcl();
		//导入的orcl
		String iOrcl =iBrakeParms.getOrcl();
		String iUsername =iBrakeParms.getUserName();
		String iPassword =iBrakeParms.getPassword();
		String tables =this.getExportTables(eBrakeParms.getTables());
		StringBuffer sb  =new StringBuffer();
		sb.append("if \"%time:~0,1%\"==\" \" ( "+lineFeed);
		sb.append("		set curdatetime=%date:~0,4%%date:~5,2%%date:~8,2%_0%time:~1,1%%time:~3,2%%time:~6,2%"+lineFeed);
		sb.append("	) else ("+lineFeed);
		sb.append("		set curdatetime=%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%"+lineFeed);
		sb.append("	)"+lineFeed);
		sb.append("	set filename=%curdatetime%"+lineFeed);
		sb.append("echo 记录%filename%内网导出日志 > logs\\%filename%.txt"+lineFeed);
		sb.append("echo 临时表标志设置处理日志 >> logs\\%filename%.txt"+lineFeed);
		sb.append("rem step 1 ****进行临时表标志设置处理****"+lineFeed);
		sb.append("sqlplus "+userName+"/"+password+"@"+orcl+" @updateflag.sql log=logs\\%filename%.txt"+lineFeed);
		sb.append("pause \"完成临时表标志设置处理。若出错，从step 1重新开始\""+lineFeed);
		sb.append(buildBigDataStr(eBrakeParms,bigList));
		sb.append("rem step 6 ****进行数据导出****"+lineFeed);
		sb.append("exp "+userName+"/"+password+"@"+orcl+" tables=("+tables+") file="+expFileName+"%filename%.DMP log=logs\\%filename%.txt"+lineFeed);
	    sb.append("echo  完成数据导出处理 >> logs\\%filename%.txt"+lineFeed);
		sb.append("pause \"完成数据导出处理。若出错，从step 6重新开始\""+lineFeed);

		sb.append("rem step 7 ****拷贝dmp到history目录！****"+lineFeed);
		sb.append("copy "+expFileName+"%filename%.DMP history"+lineFeed);
		sb.append("pause \"拷贝dmp到history目录完成！\""+lineFeed);

		sb.append("rem step 8 ****删除临时表标记记录****\""+lineFeed);
		sb.append("echo  备份导出文件并删除临时表标记记录日志>> logs\\%filename%.txt"+lineFeed);
		sb.append("sqlplus "+TEST_USERNAME+"/"+TEST_PASSWORD+"@"+orcl+" @delflag.sql log=logs\\%filename%.txt"+lineFeed);
		sb.append("pause \"删除临时表标记记录。若出错，请等待，全部完成后重做该步\""+lineFeed);
		
		
		sb.append("rem step 9 ****生成外网导入批处理文件****"+lineFeed);

		sb.append("echo call setfilename.bat > "+impFileName+"%filename%.bat"+lineFeed);
		sb.append("echo rem step 1 ****删除错误日志表**** >> "+impFileName+"%filename%.bat"+lineFeed);
		sb.append("echo sqlplus "+TEST_USERNAME+"/"+TEST_PASSWORD+"@"+iOrcl+" @del.sql log=logs\\%filename%.txt >> "+impFileName+"%filename%.bat"+lineFeed);
		sb.append("rem echo sqlplus "+TEST_USERNAME+"/"+TEST_PASSWORD+"@"+iOrcl+" @del.sql log=logs\\%filename%.txt >> "+impFileName+"%filename%.bat"+lineFeed);
		sb.append("echo pause \"完成删除错误日志表。若出错，从step 1重新开始\" >> "+impFileName+"%filename%.bat"+lineFeed);

		sb.append("echo rem step 2 ****进行数据导入临时表操作**** >> "+impFileName+"%filename%.bat"+lineFeed);
		sb.append("echo imp "+iUsername+"/"+iPassword+"@"+iOrcl+" file="+expFileName+"%filename%.DMP full=y ignore=y log=logs\\%filename%.txt >> "+impFileName+"%filename%.bat"+lineFeed);
		sb.append("echo pause \"完成数据导入临时表。若出错，从step 2重新开始\" >> "+impFileName+"%filename%.bat"+lineFeed);

		

		sb.append("echo rem step 3 ****进行数据导入到正式表，并删除临时表记录**** >> "+impFileName+"%filename%.bat"+lineFeed);

		sb.append("echo sqlplus "+TEST_USERNAME+"/"+TEST_PASSWORD+"@"+iOrcl+" @excute_procedure.sql log=logs\\%filename%.txt >> "+impFileName+"%filename%.bat"+lineFeed);

		sb.append("echo pause \"数据导入到正式表，并删除临时表\" >> "+impFileName+"%filename%.bat"+lineFeed);
		
		sb.append("echo rem step 4 ****备份dmp,bat文件到history并删除当前目录的dmp文件**** >> "+impFileName+"%filename%.bat"+lineFeed);
		sb.append("echo copy "+expFileName+"%filename%.DMP history >> "+impFileName+"%filename%.bat"+lineFeed);
		sb.append("echo copy "+impFileName+"%filename%.bat history >> "+impFileName+"%filename%.bat"+lineFeed);

		sb.append("echo del "+expFileName+"%filename%.DMP >> "+impFileName+"%filename%.bat"+lineFeed);
		sb.append("echo del "+impFileName+"%filename%.bat >> "+impFileName+"%filename%.bat"+lineFeed);
		sb.append("echo pause \"备份dmp文件到history并删除当前目录的dmp文件\""+lineFeed);
	
		//this.writeToFile(sb.toString(), "数据导出.bat");
		FileUtil.stringToFile(sb.toString(), this.getExportPath(this.genPath,"export.bat"));
		
		return sb.toString();
	}
	/**
	 * 
	 * 功能说明：获取需要导出的表
	 * @param tables
	 * @return
	 * String
	 * @author chh
	 * @May 23, 2012
	 */
	private String getExportTables(String []tables){
		ArrayList expList =new ArrayList<String>();
		StringBuffer sb =new StringBuffer();
		for(int i =0;i<tables.length;i++){
			if(i==tables.length-1){
				sb.append(TEMP_TABLE_PRE+tables[i]+TEMP_TABLE_SUFFIX_D+",");
				sb.append(TEMP_TABLE_PRE+tables[i]+TEMP_TABLE_SUFFIX_I);
			}else{
				sb.append(TEMP_TABLE_PRE+tables[i]+TEMP_TABLE_SUFFIX_D+",");
				sb.append(TEMP_TABLE_PRE+tables[i]+TEMP_TABLE_SUFFIX_I+",");
			}
		}
		return sb.toString();
	}
	/**
	 * 
	 * 功能说明:构造大字段表的处理
	 * @param eBrakeParms
	 * @param bigList
	 * @return
	 * String
	 * @author chh
	 * @May 22, 2012
	 */
	private String buildBigDataStr(NetBrakeParameter eBrakeParms,List bigList){
		//换行符
		String lineFeed =SystemUtil.getLineFeed();
		StringBuffer sb =new StringBuffer();
		String userName =eBrakeParms.getUserName();
		String password =eBrakeParms.getPassword();
		String orcl =eBrakeParms.getOrcl();
		if(null!=bigList && !bigList.isEmpty()){
			for(int i=0;i<bigList.size();i++){
				String tableName =bigList.get(i).toString();
				sb.append("echo 进行"+tableName+"的大字段处理日志 >> logs\\%filename%.txt "+lineFeed);
				sb.append("rem step "+(i+1)+" ****进行"+tableName+"的大字段处理****"+lineFeed);
				sb.append("sqlplus "+userName+"/"+password+"@"+orcl+" @"+tableName+".sql "+lineFeed);
				sb.append("pause \"完成"+tableName+"大字段处理。若出错，从step "+(i+1)+"重新开始\""+lineFeed);
			}
		}
		return sb.toString();
	}
	/**
	 * 
	 * 功能说明:获取表的注释
	 * @param jndi
	 * @param tableName
	 * @return
	 * String
	 * @author chh
	 * @May 16, 2012
	 */
	public String getTableComments(String jndi,String tableName){
		String sql ="select  t.comments from user_tab_comments t where t.TABLE_NAME="+tableName+" and t.table_type='TABLE'";
		try {
			String [][] ret =JDBCTool.doSQLQuery(jndi, sql);
			if(ret.length>1)return ret[1][0];
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		return "";
		
	}
	/**
	 * 
	 * 功能说明：获取生成文件的路径
	 * @param path
	 * @return
	 * String
	 * @author chh
	 * @May 16, 2012
	 */
	public String getGeneratePath(String path){
		EnvironmentUtil env =EnvironmentUtil.getInstance();
		return env.getAppPath()+"exchange/"+path;
	}
	/**
	 * 
	 * 功能说明:获取导出路径
	 * @param path
	 * @return
	 * String
	 * @author chh
	 * @May 22, 2012
	 */
	public String getExportPath(String genPath,String filename){
		String realPath ="";
		if(StrUtil.isNull(genPath)){
			EnvironmentUtil env =EnvironmentUtil.getInstance();
			realPath =env.getAppPath();
		}else{
			realPath= genPath+File.separator;
		}
	
		return realPath+"exchange"+File.separator+"export"+File.separator+filename;
	}
	/**
	 * 
	 * 功能说明：获取导入路径
	 * @param path
	 * @return
	 * String
	 * @author chh
	 * @May 22, 2012
	 */
	public String getImportPath(String genPath,String filename){
		String realPath ="";
		if(StrUtil.isNull(genPath)){
			EnvironmentUtil env =EnvironmentUtil.getInstance();
			realPath=env.getAppPath();
			
		}else{
			realPath= genPath+File.separator;
		}
		return realPath+"exchange"+File.separator+"import"+File.separator+filename;
	}
	
	/**
	 * 删除以presix开头得表
	 * @param userName
	 * @param password
	 * @param url
	 * @param presix
	 * @return
	 */
	public String delTablesByPresix(String jndi,String presix){
		String sql ="select t.table_name from user_tables t where t.table_name like '"+presix.toUpperCase()+"%'";
		String ret[][] =null;
		try {
			ret = JDBCTool.doSQLQuery(jndi, sql);
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		StringBuffer sb =new StringBuffer();
		if(ret.length>1)
			for(int i=1;i<ret.length;i++){
				sb.append("delete from  "+ret[i][0]+"; \n");
			}
		//System.out.println(sql);
		return sb.toString();
	}
	/**
	 * 生成存储过程
	 * @param tableName	-表名
	 * @param userName	-用户
	 * @param password	-密码
	 * @param url	-数据库连接
	 * @return
	 */
	
	public String generateProcedure(String jndi,String tableName,String userName){
		String procedurePre="P_LW_";
		//存储过程名称
		String procedureName=procedurePre+tableName;
		//要导入数据的表
		String importTableName=userName+"."+tableName;
		//D表
		String dTableName=TEMP_TABLE_PRE+tableName+TEMP_TABLE_SUFFIX_D;
		//I表
		String iTableName=TEMP_TABLE_PRE+tableName+TEMP_TABLE_SUFFIX_I;
		
		//主键
		String keyColumn =getKeyColumn(tableName,jndi);
		StringBuffer sb =new StringBuffer();
		sb.append("create or replace procedure "+procedureName+" is \n");
		sb.append("v_sqlcode  Varchar(10); --错误编码\n");
		sb.append("v_sqlerrm  Varchar(1000); ---错误的出错信息\n");
		sb.append(" str_result Varchar(200); ----导入成功是否的标记\n");
		sb.append("begin\n");
		sb.append("v_sqlcode := Sqlcode;\n");
		sb.append("v_sqlerrm := Sqlerrm;\n");

		sb.append("--删除掉Ｄ表的数据\n");
		sb.append("DELETE FROM "+importTableName+" \n");
		sb.append(" WHERE "+keyColumn+" IN (SELECT "+keyColumn+" FROM "+dTableName+" where sync_flag = '1');\n");

		sb.append("DELETE FROM "+importTableName+" \n");
		sb.append(" WHERE "+keyColumn+" IN (SELECT "+keyColumn+" FROM "+iTableName+" where sync_flag = '1');\n");

		sb.append(" --插入I表的数据\n");
		sb.append(" INSERT INTO "+importTableName+"(\n");
		String [][]cols =getColumn(tableName,jndi);
		if(null!=cols &&cols.length>0){
			for(int i=1;i<cols.length;i++){
				if(i==cols.length-1){
					sb.append(cols[i][0]+" \n");
				}else{
					sb.append(cols[i][0]+", \n");
				}
				
			}
		}
		sb.append(")  \n");
		sb.append(" SELECT \n");
		
		if(null!=cols &&cols.length>0){
			for(int i=1;i<cols.length;i++){
				if(i==cols.length-1){
					sb.append(cols[i][0]+" \n");
				}else{
					sb.append(cols[i][0]+", \n");
				}
				
			}
		}
	    sb.append(" FROM "+iTableName+" ");
	    sb.append(" where sync_flag = '1' ;\n");
	    sb.append(" --删除掉临时表的数据 \n");
	    sb.append("DELETE FROM "+iTableName+";\n");
	    sb.append("DELETE FROM "+dTableName+";\n");
	    sb.append("Insert Into wErrorLog ");
	    sb.append("Values");
	    sb.append("('"+procedureName+"', str_result, v_sqlcode, v_sqlerrm, Sysdate);\n");
	    sb.append("--加入事务处理，如果其中执行有问题的话，就回滚\n");
	    sb.append("commit;\n");
	    sb.append("EXCEPTION\n");
	    sb.append(" WHEN OTHERS then\n");
	    sb.append(" str_result := '失败!';\n");
	    sb.append("v_sqlerrm  := Sqlerrm;\n");
	    sb.append("v_sqlcode  := Sqlcode;\n");
	    sb.append("rollback;\n");
	    sb.append("Insert Into wErrorLog ");
	    sb.append("Values");
	    sb.append("('"+procedureName+"', str_result, v_sqlcode, v_sqlerrm, Sysdate);\n");
	    sb.append("commit;\n");
	    sb.append("end;\n");
	   // this.writeToFile(sb.toString(),procedureName+".sql");
	    FileUtil.stringToFile(sb.toString(), this.getImportPath(this.genPath,procedureName+".sql"));
	    return sb.toString();

	}
	/**
	 * 
	 * 功能说明:生成updateflag.sql
	 * @param arrays
	 * @param userName
	 * @return
	 * String
	 * @author chh
	 * @May 16, 2012
	 */
	public String generateUpdateFlagSql(String []arrays,String userName){
		StringBuffer sb =new StringBuffer();
		sb.append("spool logs\\%filename%.txt append\n");
		sb.append("--执行更新操作 chh@lincell.com 2012.5.23\n");
		for(int i=0;i<arrays.length;i++){
			sb.append("UPDATE "+userName+"."+TEMP_TABLE_PRE+arrays[i]+TEMP_TABLE_SUFFIX_D+" SET SYNC_FLAG='1';\n");
			sb.append("UPDATE "+userName+"."+TEMP_TABLE_PRE+arrays[i]+TEMP_TABLE_SUFFIX_I+" SET SYNC_FLAG='1';\n");
			sb.append("commit;\n");
		}
		sb.append("quit;\n");
		//this.writeToFile(sb.toString(), "updateflag.sql");
		FileUtil.stringToFile(sb.toString(), this.getExportPath(this.genPath,"updateflag.sql"));
		return sb.toString();
	}
	/**
	 * 
	 * 功能说明:生成delflag.sql
	 * @param arrays
	 * @param userName
	 * @return
	 * String
	 * @author chh
	 * @May 16, 2012
	 */
	public String generateDelFlagSql(String []arrays,String userName){
		StringBuffer sb =new StringBuffer();
		sb.append("spool logs\\%filename%.txt append\n");
		sb.append("--执行删除操作 chh@lincell.com 2012.5.22\n");
		for(int i=0;i<arrays.length;i++){
			sb.append("delete "+userName+"."+TEMP_TABLE_PRE+arrays[i]+TEMP_TABLE_SUFFIX_I+" where SYNC_FLAG='1';\n");
			sb.append("delete "+userName+"."+TEMP_TABLE_PRE+arrays[i]+TEMP_TABLE_SUFFIX_D+" where SYNC_FLAG='1';\n");
			sb.append("commit;\n");
		}
		sb.append("quit;\n");
		//this.writeToFile(sb.toString(), "delflag.sql");
		FileUtil.stringToFile(sb.toString(), this.getExportPath(this.genPath,"delflag.sql"));
		return sb.toString();
	}
	/**
	 * 创建临时表 I,D表
	 * @param tableName	-源表
	 * @param fullPath	-完整路径
	 * @return
	 */
	public String generateTableSql(String tableName,String fullPath){
		String pre=TEMP_TABLE_PRE;
		String suffix_I=TEMP_TABLE_SUFFIX_I;
		String suffix_D=TEMP_TABLE_SUFFIX_D;
		tableName =tableName.toUpperCase();
		String syncTablename=pre+tableName+suffix_I;
		StringBuffer sb =new StringBuffer();
		sb.append("create table "+syncTablename+" as select * from  "+tableName+";");
		sb.append("\n");
		sb.append("alter table "+syncTablename+"");
		sb.append("\n");
		sb.append("add sync_flag varchar(1);");
		sb.append("\n");
		sb.append("comment  on  column  "+syncTablename+".sync_flag ");
		sb.append("is  '同步标示';");
		sb.append("\n");
		sb.append("alter table "+syncTablename+"");
		sb.append("\n");
		sb.append("add sync_createtime varchar(30);");
		sb.append("\n");
		sb.append("comment  on  column  "+syncTablename+".sync_createtime ");
		sb.append("is  '时间戳';");
		sb.append("\n");
		sb.append("truncate table "+syncTablename+" ;");
		sb.append("\n");
		syncTablename=pre+tableName+suffix_D;
		sb.append("create table "+syncTablename+" as select * from  "+tableName+";");
		sb.append("\n");
		sb.append("alter table "+syncTablename+"");
		sb.append("\n");
		sb.append("add sync_flag varchar(1);");
		sb.append("\n");
		sb.append("comment  on  column  "+syncTablename+".sync_flag ");
		sb.append("is  '同步标示';");
		sb.append("\n");
		sb.append("alter table "+syncTablename+"");
		sb.append("\n");
		sb.append("add sync_createtime varchar(30);");
		sb.append("\n");
		sb.append("comment  on  column  "+syncTablename+".sync_createtime ");
		sb.append("is  '时间戳';");
		sb.append("\n");
		sb.append("truncate table "+syncTablename+" ;");
		//writeToFile(sb.toString(),"sync_"+tableName+".txt");
		FileUtil.stringToFile(sb.toString(),fullPath);
		//FileUtil.stringToFile(sb.toString(), this.getImportPath("SYNC_"+tableName+".txt"));
		return sb.toString();
		
	}
	/**
	 * 
	 * 功能说明:如果含有大字段，需要构造"+TEMP_TABLE_PRE+表名 的临时表
	 * @param tableName
	 * @return
	 * String
	 * @author chh
	 * @May 16, 2012
	 */
	public String generateBigDataTable(String tableName){
	
		StringBuffer sb =new StringBuffer();
		sb.append("create table LW_"+tableName+"\n" );
		sb.append("(\n" );
		sb.append("  UNID VARCHAR2(32),\n" );
		sb.append("  SYNC_FLAG VARCHAR2(3)\n" );
		sb.append(");");
		FileUtil.stringToFile(sb.toString(), this.getExportPath(this.genPath,"bigdata_"+tableName+".txt"));
		//FileUtil.stringToFile(sb.toString(), this.getImportPath("bigdata_"+tableName+".txt"));
		return sb.toString();
		
	}
	/**
	 * 
	 * 功能说明:生成触发器
	 * @param tableName	-表名
	 * @param jndi	-数据库连接
	 * void
	 * @author chh
	 * @May 16, 2012
	 */
	public void generateTrigger(String jndi,String tableName){
		generateTgInsert(tableName,jndi);
		generateTgUpdate(tableName,jndi);
		generateTgDelete(tableName,jndi);
	}
	/**
	 * 
	 * 功能说明:根据表名获取查询的列
	 * @param jndi
	 * @param tableName
	 * @return
	 * String
	 * @author chh
	 * @May 16, 2012
	 */
	public String getSelectFileds(String jndi,String tableName){
		String sql="select COLUMN_NAME  from  user_tab_columns  where   table_name='"+tableName+"'";
		String ret[][] =null;
		try {
			ret = JDBCTool.doSQLQuery(jndi, sql);
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		String cols="";
		for(int i=1;i<ret.length;i++){
			if(ret.length-1==i){
				cols =cols+ret[i][0];
			}else{
				cols =cols+ret[i][0]+",";
			}
		}
		return cols;
	}
	/**
	 * 产生 插入的触发器
	 * @return
	 */
	public String generateTgInsert(String tableName,String jndi){
		String pre="TG_";
		tableName =tableName.toUpperCase();
		String triggerNameI=pre+tableName+TEMP_TABLE_SUFFIX_I;
		String table_i =TEMP_TABLE_PRE+tableName+TEMP_TABLE_SUFFIX_I;
		String table_d =TEMP_TABLE_PRE+tableName+TEMP_TABLE_SUFFIX_D;
		String sql="select COLUMN_NAME  from  user_tab_columns  where   table_name='"+tableName+"'";
		String ret[][] =null;
		try {
			ret = JDBCTool.doSQLQuery(jndi, sql);
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		String keyColumn =getKeyColumn(tableName,jndi);
		String cols="";
		for(int i=1;i<ret.length;i++){
			cols =cols+ret[i][0]+",";
		}
		cols=cols+"sync_flag";
		StringBuffer sb =new StringBuffer();
		sb.append("CREATE OR REPLACE TRIGGER "+triggerNameI+" AFTER insert  On "+tableName+" FOR EACH ROW");
		sb.append("\n");
		sb.append("DECLARE\n");
		sb.append("  IS_EXIST_I NUMBER;    --定义在临时表Ｉ里面unid为指定unid的记录数\n");
		sb.append("  IS_EXIST_D NUMBER;    --定义在临时表Ｄ里面unid为指定unid的记录数\n");
		sb.append("BEGIN\n");


		sb.append("  --判断数据的增加是不是从网闸过来的，如果是从网闸过来的话，不进行触发器的数据插入操作。\n");
		sb.append("  IF (user != 'DATATEST') THEN\n" );
		sb.append("    --判断在临时表I里面有没有要编号为unid的记录数,如果在临时表I里面已经有记录的话,执行删除操作\n" );
		sb.append("    SELECT COUNT(*) INTO IS_EXIST_I FROM "+table_i+" lw_i\n" );
		sb.append("       WHERE lw_i."+keyColumn+" = :new."+keyColumn+";\n" );
		sb.append("    IF (IS_EXIST_I != 0) THEN\n" );
		sb.append("      DELETE FROM "+table_i+" lw_i WHERE lw_i."+keyColumn+" = :new."+keyColumn+";\n" );
		sb.append("    END IF;\n");
		sb.append("    --********************************************************************************--\n");
		sb.append("    --判断在临时表Ｄ里面有没有编号为unid的记录，如果有的话，删除后原记录后，增加一条待删除的记录\n");
		sb.append("    SELECT COUNT(*) INTO IS_EXIST_D FROM "+table_d+" lw_d\n" ); 
		sb.append("       WHERE lw_d."+keyColumn+" = :new."+keyColumn+";\n" ); 
		sb.append("    IF (IS_EXIST_D != 0) THEN\n" ); 
		sb.append("      DELETE FROM "+table_d+" lw_d WHERE lw_d."+keyColumn+" = :new."+keyColumn+";\n" );
		sb.append("    END IF;\n" );
		sb.append("    --********************************************************************************--\n");
		sb.append("    --插入临时表I记录\n" );
		sb.append("INSERT INTO "+table_i+"("+cols+") VALUES(");
		sb.append("\n");
		for(int i=1;i<ret.length;i++){
			sb.append(":new."+ret[i][0]+",");
			sb.append("\n");
		}
	
		sb.append("'0');");
		sb.append("  END IF;\n");
		sb.append("END;\n");
		sb.append("/\n");
		sb.append("quit;\n");
		//writeToFile(sb.toString(),triggerNameI+"_trigger.txt");
		FileUtil.stringToFile(sb.toString(), this.getExportPath(this.genPath,triggerNameI+".txt"));
		
		return sb.toString();
	}
	/**
	 * 产生更新的触发器
	 * @param tableName
	 * @param userName
	 * @param password
	 * @param url
	 * @return
	 */
	public String generateTgUpdate(String tableName,String jndi){
		String pre="TG_";
		tableName =tableName.toUpperCase();
		String triggerName=pre+tableName+"_U";
		String table_i =TEMP_TABLE_PRE+tableName+TEMP_TABLE_SUFFIX_I;
		String table_d =TEMP_TABLE_PRE+tableName+TEMP_TABLE_SUFFIX_D;
		String sql="select COLUMN_NAME  from  user_tab_columns  where   table_name='"+tableName+"'";
		String ret[][] =null;
		try {
			ret = JDBCTool.doSQLQuery(jndi, sql);
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		String keyColumn =getKeyColumn(tableName,jndi);
		String cols="";
		for(int i=1;i<ret.length;i++){
			cols =cols+ret[i][0]+",";
		}
		cols=cols+"sync_flag";
		StringBuffer sb =new StringBuffer();
		sb.append("CREATE OR REPLACE TRIGGER "+triggerName+" AFTER update  On "+tableName+" FOR EACH ROW");
		sb.append("\n");
		sb.append("DECLARE\n");
		sb.append("  IS_EXIST_I NUMBER;    --定义在临时表Ｉ里面unid为指定unid的记录数\n");
		sb.append("  IS_EXIST_D NUMBER;    --定义在临时表Ｄ里面unid为指定unid的记录数\n");
		sb.append("BEGIN\n");


		sb.append("  --判断数据的增加是不是从网闸过来的，如果是从网闸过来的话，不进行触发器的数据插入操作。\n");
		sb.append("  IF (user != 'DATATEST') THEN\n" );
		sb.append("    --判断在临时表I里面有没有要编号为unid的记录数,如果在临时表I里面已经有记录的话,执行删除操作\n" );
		sb.append("    SELECT COUNT(*) INTO IS_EXIST_I FROM "+table_i+" lw_i\n" );
		sb.append("       WHERE lw_i."+keyColumn+" = :new."+keyColumn+";\n" );
		sb.append("    IF (IS_EXIST_I != 0) THEN\n" );
		sb.append("      DELETE FROM "+table_i+" lw_i WHERE lw_i."+keyColumn+" = :new."+keyColumn+";\n" );
		sb.append("    END IF;\n");
		sb.append("    --********************************************************************************--\n");
		sb.append("    --判断在临时表Ｄ里面有没有编号为unid的记录，如果有的话，删除后原记录后，增加一条待删除的记录\n");
		sb.append("    SELECT COUNT(*) INTO IS_EXIST_D FROM "+table_d+" lw_d\n" ); 
		sb.append("       WHERE lw_d."+keyColumn+" = :new."+keyColumn+";\n" ); 
		sb.append("    IF (IS_EXIST_D != 0) THEN\n" ); 
		sb.append("      DELETE FROM "+table_d+" lw_d WHERE lw_d."+keyColumn+" = :new."+keyColumn+";\n" );
		sb.append("    END IF;\n" );
		sb.append("    --********************************************************************************--\n");
		sb.append("    --插入临时表I记录\n" );
		sb.append("INSERT INTO "+table_i+"("+cols+") VALUES(");
		sb.append("\n");
		for(int i=1;i<ret.length;i++){
			sb.append(":new."+ret[i][0]+",");
			sb.append("\n");
		}
	
		sb.append("'0');");
		sb.append("    --插入临时表D记录\n" );
		sb.append("INSERT INTO "+table_d+"("+cols+") VALUES(");
		sb.append("\n");
		for(int i=1;i<ret.length;i++){
			sb.append(":old."+ret[i][0]+",");
			sb.append("\n");
		}
	
		sb.append("'0');");
		sb.append("  END IF;\n");
		sb.append("END;\n");
		sb.append("/\n");
		sb.append("quit;\n");
		//writeToFile(sb.toString(),triggerName+"_trigger.txt");
		FileUtil.stringToFile(sb.toString(), this.getExportPath(this.genPath,triggerName+".txt"));
		return sb.toString();
	}
	/**
	 * 
	 * 功能说明:产生删除的触发器
	 * @param tableName
	 * @param jndi
	 * @return
	 * String
	 * @author chh
	 * @May 16, 2012
	 */
	public String generateTgDelete(String tableName,String jndi){
		String pre="TG_";
		tableName =tableName.toUpperCase();
		String triggerName=pre+tableName+TEMP_TABLE_SUFFIX_D;
		String table_i =TEMP_TABLE_PRE+tableName+TEMP_TABLE_SUFFIX_I;
		String table_d =TEMP_TABLE_PRE+tableName+TEMP_TABLE_SUFFIX_D;
		String sql="select COLUMN_NAME  from  user_tab_columns  where   table_name='"+tableName+"'";
		String ret[][] =null;
		try {
			ret = JDBCTool.doSQLQuery(jndi, sql);
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		String keyColumn =getKeyColumn(tableName,jndi);
		String cols="";
		for(int i=1;i<ret.length;i++){
			cols =cols+ret[i][0]+",";
		}
		cols=cols+"sync_flag";
		StringBuffer sb =new StringBuffer();
		sb.append("CREATE OR REPLACE TRIGGER "+triggerName+" AFTER delete  On "+tableName+" FOR EACH ROW");
		sb.append("\n");
		sb.append("DECLARE\n");
		sb.append("  IS_EXIST_I NUMBER;    --定义在临时表Ｉ里面unid为指定unid的记录数\n");
		sb.append("  IS_EXIST_D NUMBER;    --定义在临时表Ｄ里面unid为指定unid的记录数\n");
		sb.append("BEGIN\n");


		sb.append("  --判断数据的增加是不是从网闸过来的，如果是从网闸过来的话，不进行触发器的数据插入操作。\n");
		sb.append("  IF (user != 'DATATEST') THEN\n" );
		sb.append("    --判断在临时表I里面有没有要编号为unid的记录数,如果在临时表I里面已经有记录的话,执行删除操作\n" );
		sb.append("    SELECT COUNT(*) INTO IS_EXIST_I FROM "+table_i+" lw_i\n" );
		sb.append("       WHERE lw_i."+keyColumn+" = :new."+keyColumn+";\n" );
		sb.append("    IF (IS_EXIST_I != 0) THEN\n" );
		sb.append("      DELETE FROM "+table_i+" lw_i WHERE lw_i."+keyColumn+" = :new."+keyColumn+";\n" );
		sb.append("    END IF;\n");
		sb.append("    --********************************************************************************--\n");
		sb.append("    --判断在临时表Ｄ里面有没有编号为unid的记录，如果有的话，删除后原记录后，增加一条待删除的记录\n");
		sb.append("    SELECT COUNT(*) INTO IS_EXIST_D FROM "+table_d+" lw_d\n" ); 
		sb.append("       WHERE lw_d."+keyColumn+" = :new."+keyColumn+";\n" ); 
		sb.append("    IF (IS_EXIST_D != 0) THEN\n" ); 
		sb.append("      DELETE FROM "+table_d+" lw_d WHERE lw_d."+keyColumn+" = :new."+keyColumn+";\n" );
		sb.append("    END IF;\n" );
		sb.append("    --********************************************************************************--\n");
		
		sb.append("    --插入临时表D记录\n" );
		sb.append("INSERT INTO "+table_d+"("+cols+") VALUES(");
		sb.append("\n");
		for(int i=1;i<ret.length;i++){
			sb.append(":old."+ret[i][0]+",");
			sb.append("\n");
		}
	
		sb.append("'0');");
		sb.append("  END IF;\n");
		sb.append("END;\n");
		sb.append("/\n");
		sb.append("quit;\n");
		//writeToFile(sb.toString(),triggerName+"_trigger.txt");
		FileUtil.stringToFile(sb.toString(), this.getExportPath(this.genPath,triggerName+".txt"));
		return sb.toString();
	}
	/**
	 * 获取表的主键
	 * @param tableName	-表名
	 * @param srcquery	-数据连接
	 * @return
	 */
	public String getKeyColumn(String tableName,String jndi){
		String sql="select col.column_name"+
		"　from user_constraints con,  user_cons_columns col"+
		" where con.constraint_name = col.constraint_name "+
		" and con.constraint_type='P' "+
		" and col.table_name = '"+tableName.toUpperCase()+"'";
		String ret[][] =null;
		try {
			ret = JDBCTool.doSQLQuery(jndi, sql);
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		if(ret.length>1)return ret[1][0];
		return "unid";
	}
	/**
	 * 
	 * 功能说明:获取表的字段
	 * @param tableName
	 * @param jndi
	 * @return
	 * String[][]
	 * @author chh
	 * @May 16, 2012
	 */
	public String [][] getColumn(String tableName,String jndi){
		String sql="select COLUMN_NAME  from  user_tab_columns  where   table_name='"+tableName.toUpperCase()+"' and COLUMN_NAME not in('SYNC_FLAG')";
		String ret[][] =null;
		try {
			ret = JDBCTool.doSQLQuery(jndi, sql);
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		if(ret.length>1)return ret;
		return null;
	}
	/**
	 * 
	 * 功能说明:判断是否含有大字段 clob或者blob
	 * @param tableName
	 * @param jndi
	 * @return
	 * boolean
	 * @author chh
	 * @May 16, 2012
	 */
	public boolean hasBigData(String jndi,String tableName){
		String sql="select COLUMN_NAME  from  user_tab_columns  where   table_name='"+tableName.toUpperCase()+"' and DATA_TYPE in('CLOB','BLOB')";
		String ret[][] =null;
		try {
			ret = JDBCTool.doSQLQuery(jndi, sql);
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		if(ret.length>1)return true;
		return false;
	}
	/**
	 * 
	 * 功能说明:获取大字段的列明
	 * @param tableName
	 * @param jndi
	 * @return
	 * String[][]
	 * @author chh
	 * @May 16, 2012
	 */
	public String[][] getBigDataColumn(String tableName,String jndi){
		String sql="select COLUMN_NAME  from  user_tab_columns  where   table_name='"+tableName.toUpperCase()+"' DATA_TYPE in('CLOB','BLOB')";
		String ret[][] =null;
		try {
			ret = JDBCTool.doSQLQuery(jndi, sql);
		} catch (SQLException e) {
			log.error(e.getMessage(),e);
		}
		if(ret.length>1)return ret;
		return null;
	}
	/**
	 * 
	 * 功能说明：生成大字段需要处理的sql文件，如 apas_info.sql
	 * @param jndi
	 * @param tableName
	 * @param userName
	 * void
	 * @author chh
	 * @May 16, 2012
	 */
	public void generateExcuteSqlFileForBigData(String jndi,String tableName,String userName){
		String keyColumn =this.getKeyColumn(tableName, jndi);
		String table_i =userName+"."+TEMP_TABLE_PRE+tableName+"_I";
		String table =userName+".LW_"+tableName;
		String tableOld =userName+"."+tableName;
		String fileds =getSelectFileds(jndi,tableName);
		StringBuffer sb =new StringBuffer();
		sb.append("spool logs\\%filename%.txt append \n");
		sb.append(" DELETE FROM  "+table+";\n");
		sb.append(" INSERT INTO "+table+"\n");
		sb.append(" SELECT \n");
		sb.append("	"+keyColumn+",\n");
		sb.append("	'1'\n");
		sb.append(" FROM "+table_i+"  where sync_flag='1';\n");
		
		sb.append("--删除掉临时表I里面的记录\n");
		sb.append(" DELETE FROM "+table_i+" where sync_flag='1';\n");
		sb.append(" INSERT INTO "+table_i+"("+fileds+",sync_flag)\n");
		sb.append("select \n");
		sb.append(" "+fileds+",'1' \n");
		sb.append(" FROM "+tableOld+"\n");
		sb.append(" WHERE "+keyColumn+" IN (SELECT unid FROM "+table+");\n");
		sb.append("--删除掉"+table+"的记录\n");
		sb.append("DELETE FROM "+table+";\n");
		sb.append("commit;\n");
		sb.append("quit;\n");
		//writeToFile(sb.toString(),tableName+".sql");
		FileUtil.stringToFile(sb.toString(), this.getExportPath(this.genPath,tableName+".sql"));
	}
}