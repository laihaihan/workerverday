<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="com.linewell.ucap.db.JDBCTool"%>
<%@ page import="com.linewell.ucap.jdbc.core.JdbcTemplate"%>
<%@page import="com.linewell.ucap.util.UNIDGenerate"%>
<%@page import="java.util.*"%>
<%
	String begin = request.getParameter("begin");

	if (null != begin && begin.equals("1")) {
		String[] selectSqls = new String[3];
		selectSqls[0] = "select leaf_punid,leaf_use_scopes from ucap_menu_leaf where leaf_use_scopes is not null or leaf_use_scopes!=''";
		selectSqls[1] = "select module_punid,module_use_scopes from ucap_module where module_use_scopes is not null or module_use_scopes!=''";
		selectSqls[2] = "select leaf_punid,leaf_use_scopes from ucap_module_leaf where leaf_use_scopes is not null or leaf_use_scopes!=''";

		String[] names = new String[3];
		names[0] = "菜单";
		names[1] = "模块";
		names[2] = "模块叶子";

		JdbcTemplate jt = JDBCTool.getPlatformDBTool();
		jt.open();
		UNIDGenerate ug = new UNIDGenerate();

        String deleteSql = "delete from ucap_bussiness_permission";
		String insertSql = "insert into ucap_bussiness_permission(bp_unid,bp_subjectid,bp_objectid,bp_mode) values(";
		for (int i = 0; i < selectSqls.length; i++) {
			String[][] rs = jt.queryForArray(selectSqls[i]);

			if (null != rs && rs.length > 1) {

				List<String> list = new ArrayList<String>();
				list.add(deleteSql);
				for (int j = 1; j < rs.length; j++) {
					if (null == rs[j][1] || rs[j][1].trim().equals(""))
						continue;

					String[] scopes = rs[j][1].split(",");

					for (int k = 0; k < scopes.length; k++) {
					    if(null==scopes[k] || scopes[k].length()>32)continue;
						String tmpInsertSql = insertSql + "'"
								+ ug.getUnid() + "'";
						tmpInsertSql += ",'" + scopes[k] + "'";
						tmpInsertSql += ",'" + rs[j][0] + "'";
						tmpInsertSql += ",'1')";

						list.add(tmpInsertSql);
					}

					if (list.size() >= 100) {
						jt.batchUpdate(list);

						list.clear();
					}
				}

				if (!list.isEmpty()) {
					jt.batchUpdate(list);

					list.clear();
				}
			}

			System.out.println("成功迁移了“" + names[i] + "”");
		}

		//迁移按钮
		String selectSql = "select t.sbutton_unid,t.sbutton_use_scopes from ucap_sub_button t where t.sbutton_use_scopes is not null or t.sbutton_use_scopes<>''";
		insertSql = "insert into ucap_subbutton_pemission(sp_unid,sp_subjectid,sp_objectid,sp_mode) values(";
		deleteSql = "delete from ucap_subbutton_pemission";
		String[][] btnRs = jt.queryForArray(selectSql);
		if (null != btnRs && btnRs.length > 1) {

			List<String> list = new ArrayList<String>();
			list.add(deleteSql);
			for (int j = 1; j < btnRs.length; j++) {
				if (null == btnRs[j][1]
						|| btnRs[j][1].trim().equals(""))
					continue;

				String[] scopes = btnRs[j][1].split(",");

				for (int k = 0; k < scopes.length; k++) {
				    if(null==scopes[k] || scopes[k].length()>32)continue;
					String tmpInsertSql = insertSql + "'"
							+ ug.getUnid() + "'";
					tmpInsertSql += ",'" + scopes[k] + "'";
					tmpInsertSql += ",'" + btnRs[j][0] + "'";
					tmpInsertSql += ",'1')";

					list.add(tmpInsertSql);
				}

				if (list.size() >= 100) {
					jt.batchUpdate(list);

					list.clear();
				}
			}

			if (!list.isEmpty()) {
				jt.batchUpdate(list);

				list.clear();
			}
		}else{
			jt.execute(deleteSql);
		}
		System.out.println("迁移子按钮使用范围完成!");

		//迁移页签	
		selectSql = "select t.tab_unid,t.tab_use_scopes from ucap_compose_form_tab t where t.tab_use_scopes is not null or t.tab_use_scopes<>''";
		insertSql = "insert into ucap_cformtab_pemission(cp_unid,cp_subjectid,cp_objectid,cp_mode) values(";
		deleteSql = "delete from ucap_cformtab_pemission";
		btnRs = jt.queryForArray(selectSql);
		if (null != btnRs && btnRs.length > 1) {

			List<String> list = new ArrayList<String>();
			list.add(deleteSql);
			for (int j = 1; j < btnRs.length; j++) {
				if (null == btnRs[j][1]
						|| btnRs[j][1].trim().equals(""))
					continue;

				String[] scopes = btnRs[j][1].split(",");

				for (int k = 0; k < scopes.length; k++) {
				    if(null==scopes[k] || scopes[k].length()>32)continue;
					String tmpInsertSql = insertSql + "'"
							+ ug.getUnid() + "'";
					tmpInsertSql += ",'" + scopes[k] + "'";
					tmpInsertSql += ",'" + btnRs[j][0] + "'";
					tmpInsertSql += ",'1')";

					list.add(tmpInsertSql);
				}

				if (list.size() >= 100) {
					jt.batchUpdate(list);

					list.clear();
				}
			}

			if (!list.isEmpty()) {
				jt.batchUpdate(list);

				list.clear();
			}
		}else{
			jt.execute(deleteSql);
		}
		System.out.println("迁移页签使用范围完成!");
		//迁移页签完毕

		jt.close();

	}
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html:html lang="true">
<head>
	<html:base />

	<title>test.jsp</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--   
    <link rel="stylesheet" type="text/css" href="styles.css">   
    -->

</head>

<body>
	<form name="checkform" method="post" action="dataTransfer.jsp">
		<input type="hidden" name="begin" value="1" />
		<font color="red">请检查是否做好ucap数据库备份,如已做好备份，点击“迁移”开始数据迁移！</font>：
		<br>
		<input type="submit" name="b1" value="迁移">
	</form>
</body>
</html:html>
