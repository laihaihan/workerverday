package com.linewell.ucap.checkunique;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import com.linewell.ucap.frame.util.GlobalUtils;
import com.linewell.ucap.jdbc.core.JdbcTemplate;
import com.linewell.ucap.platform.cache.dept.Dept;
import com.linewell.ucap.platform.cache.user.OutProxy;
import com.linewell.ucap.platform.cache.user.User;
import com.linewell.ucap.platform.cache.user.UserOpinion;
import com.linewell.ucap.resource.ABaseManager;
import com.linewell.ucap.resource.IResourceManager;
import com.linewell.ucap.resource.ManageException;
import com.linewell.ucap.resource.ResourceCache;
import com.linewell.ucap.resource.ResourceContext;
import com.linewell.ucap.resource.ResourceException;
import com.linewell.ucap.resource.ResourceType;
import com.linewell.ucap.session.GlobalDept;
import com.linewell.ucap.util.StringUtil;
import com.linewell.ucap.util.UcapRequest;

/**
 * 用户对象访问操作相关方法的分装
 * 
 * @author lsongqing@linewell.com
 * 
 */
public class UserManager extends ABaseManager implements IResourceManager {

	/**
	 * 日志对象
	 */
	private static final Log log = LogFactory.getLog(UserManager.class);

	/**
	 * 主表数据集
	 */
	private String[][] mainRS = null;

	/**
	 * 【意见】子表数据集
	 */
	private String[][] subRSInOpinions = null;

	/**
	 * 【代理人】子表数据集
	 */
	private String[][] subRSInProxy = null;

	/**
	 * 带数据库数据库连接对象的构造函数
	 * 
	 * @param jt
	 *            数据库连接对象
	 */
	public UserManager(JdbcTemplate jt) {
		this.jt = jt;
	}

	/**
	 * 缺省构造函数
	 * 
	 */
	public UserManager() {

	}
	/**
	 * 根据新的用户名返回当前是否已经存在新用户所在单位下用户名相同的用户
	 * @param name 用户登录名
	 * @param request 
	 * @param depts 用户部门UNID
	 * @return
	 * @throws ManageException
	 */
	public User getUserByNameAndUnit(String name,UcapRequest request,String depts) throws ManageException{
		String selectSql = "select * from ucap_user where (user_login_name='"+name+"')";
		this.initJdbcTemplate();
		try {
			String[][] rs = jt.queryForArray(selectSql);
			List<User> list = this.translateArray2List(rs);
			if(null==list || list.isEmpty())return null;
			
			GlobalDept globalDept = GlobalUtils.getDept(request);
			String curBelongtoUnit = null;
			
			//判断输入的部门
			String newUserDept = globalDept.getFullNamesByDeptUnid(depts);
			String[] sDept = newUserDept.split("/");
			if(null==sDept)return null;
			
			ResourceContext rc = ResourceContext.newInstance();
			try {
				ResourceCache cache = rc.getResourceCache(ResourceType.RESOURCE_TYPE_DEPT);
				for (int i = sDept.length-1; i >= 0; i--) {
					Dept tempDept  = (Dept)cache.getResource(sDept[i]);
					if(StringUtils.isEmpty(tempDept.getUnid())){
						continue;
					}
					curBelongtoUnit = tempDept.getUnid();
					break;
				}
				if(StringUtils.isEmpty(curBelongtoUnit)){
					return null;
				}
				
				for(int i=0;i<list.size();i++){
					User tmpUser = list.get(i);
					tmpUser.setEffectiveDept(getFirstDept(tmpUser.getDepts()));
					String fullDept = globalDept.getFullNamesByDeptUnid(tmpUser.getEffectiveDept());
					sDept = fullDept.split("/");
					for (int j = sDept.length-1; j >= 0; j--) {
						Dept tempDept  = (Dept)cache.getResource(sDept[j]);
						if(StringUtils.isEmpty(tempDept.getUnid())){
							continue;
						}
						if(curBelongtoUnit.equals(tempDept.getUnid())){
							return tmpUser;
						}
					}
				}
			} catch (ResourceException e) {
			    log.error(e);
			}
		} catch (SQLException e) {
			throw new ManageException(e);
		}finally{
			this.recycleJdbcTemplate();
		}
		return null;
	}

	/**
	 * 获取所属部门的第一个部门
	 * 
	 * @param depts
	 *            部门字符串，以StringUtil.STRINGSPLIT分隔
	 * @return 所属部门的第一个部门，若没找到，则返回NULL
	 */
	private String getFirstDept(String depts) {
		String firstDept = null;

		if (StringUtils.isNotEmpty(depts)) {
			String[] deptsArray = depts.split(StringUtil.STRINGSPLIT);
			firstDept = deptsArray[0];
		}
		return firstDept;
	}

	/**
	 * 根据用户标识获取用户对象
	 * 
	 * @param unid
	 *            用户标识
	 * 
	 * @return 用户对象
	 */
	public User doFindByUnid(String unid) throws ManageException {
		User user = null;

		// 参数合法性检查
		if (StringUtils.isEmpty(unid)) {
			throw new ManageException("用户的标识为空，无法获取用户对象！");
		}

		// 在数据库中搜索资源
		searchResource(unid, null,0);

		// 设置UserBean对象
		user = setUserBean();

		return user;
	}
	/**
	 * 设置UserBean对象
	 * 
	 * @return UserBean对象
	 */
	private User setUserBean() {
		User user;

		// 设置【意见】子表Bean对象
		List<UserOpinion> userOpinions = setBeanInOpinions();

		// 设置【代理人】子表Bean对象
		OutProxy outProxy = setBeanInProxy();

		// 设置主表Bean对象
		user = setBean(userOpinions, outProxy);

		return user;
	}
	/**
	 * 把二维数组转化用户对象列表，这边不加入其他用户相关对象，如意见，代理等
	 * 
	 * @param rs
	 *            二维数组
	 * 
	 * @return 用户列表对象
	 */
	private List<User> translateArray2List(String[][] rs) {
		List<User> list = null;

		if (null == rs || rs.length < 2)
			return list;

		list = new ArrayList<User>();
		String[] columnNames = rs[0];// 列名称
		// 获取列索引值
		int unidIndex = ArrayUtils.indexOf(columnNames, "user_unid");
		int answerIndex = ArrayUtils.indexOf(columnNames, "user_answer");
		int deptsIndex = ArrayUtils.indexOf(columnNames, "user_depts");
		int displayNameIndex = ArrayUtils.indexOf(columnNames,
				"user_display_name");
		int displayNameSpellIndex = ArrayUtils.indexOf(columnNames,
				"user_display_name_spell");
		int sexIndex = ArrayUtils.indexOf(columnNames, "user_sex");
		int forbidIndex = ArrayUtils.indexOf(columnNames, "user_forbid");
		int passIndex = ArrayUtils.indexOf(columnNames,
				"user_last_modified_pass");
		int leadersIndex = ArrayUtils.indexOf(columnNames, "user_leaders");
		int mailIndex = ArrayUtils.indexOf(columnNames, "user_mail");
		int managerDeptsIndex = ArrayUtils.indexOf(columnNames,
				"user_manage_depts");
		int numberIndex = ArrayUtils
				.indexOf(columnNames, "user_message_number");
		int mobileIndex = ArrayUtils.indexOf(columnNames, "user_mobile");
		int loginNameIndex = ArrayUtils.indexOf(columnNames, "user_login_name");
		int userPasswordIndex = ArrayUtils
				.indexOf(columnNames, "user_password");
		int portsIndex = ArrayUtils.indexOf(columnNames, "user_posts");
		int rolesIndex = ArrayUtils.indexOf(columnNames, "user_roles");
		int questionIndex = ArrayUtils.indexOf(columnNames, "user_question");
		int sortIndex = ArrayUtils.indexOf(columnNames, "user_sort");
		int idCardIndex= ArrayUtils.indexOf(columnNames, "user_idCard");
		// 赋值
		for (int i = 1; i < rs.length; i++) {
			User user = new User();

			if (unidIndex >= 0)
				user.setUnid(rs[i][unidIndex]);

			if (answerIndex >= 0)
				user.setAnswer(rs[i][answerIndex]);

			if (deptsIndex >= 0)
				user.setDepts(rs[i][deptsIndex]);

			if (displayNameIndex >= 0)
				user.setDisplayName(rs[i][displayNameIndex]);

			if (displayNameSpellIndex >= 0)
				user.setDisplayNameSpell(rs[i][displayNameSpellIndex]);

			if (sexIndex >= 0)
				user.setSex(rs[i][sexIndex]);

			if (forbidIndex >= 0)
				user.setIsforbit(StringUtil.parseBoolean(rs[i][forbidIndex]));

			if (passIndex >= 0)
				user.setLastModifiedPass(rs[i][passIndex]);

			if (leadersIndex >= 0)
				user.setLeaders(rs[i][leadersIndex]);

			if (mailIndex >= 0)
				user.setMail(rs[i][mailIndex]);

			if (managerDeptsIndex >= 0)
				user.setManageDepts(rs[i][managerDeptsIndex]);

			if (numberIndex >= 0)
				user.setMessageNumber(rs[i][numberIndex]);

			if (mobileIndex >= 0)
				user.setMobile(rs[i][mobileIndex]);

			if (loginNameIndex >= 0)
				user.setName(rs[i][loginNameIndex]);

			if (userPasswordIndex >= 0)
				user.setPassword(rs[i][userPasswordIndex]);

			if (portsIndex >= 0)
				user.setPosts(rs[i][portsIndex]);

			if (rolesIndex >= 0)
				user.setRoles(rs[i][rolesIndex]);

			if (questionIndex >= 0)
				user.setQuestion(rs[i][questionIndex]);

			if (sortIndex >= 0)
				user.setSort(StringUtil.parseInt(rs[i][sortIndex]));
			
			if (idCardIndex >= 0)
				user.setIdCard(rs[i][idCardIndex]);

			list.add(user);
		}

		return list;
	}
	/**
	 * 设置Bean对象
	 * 
	 * @param userOpinions
	 *            数据库视图配置对象
	 * @param
	 * @return Bean对象 outProxy 代理人对象
	 */
	private User setBean(List<UserOpinion> userOpinions, OutProxy outProxy) {
		User user = null;
		if (mainRS == null || mainRS.length < 2) {
			return user;
		}

		List<User> list = this.translateArray2List(mainRS);
		if (null == list || list.isEmpty())
			return user;

		user = list.get(0);

		List<OutProxy> outProxyList=new ArrayList<OutProxy>();
		outProxyList.add(outProxy);
		user.setOutProxy(outProxyList);
		String proxys = null;
		if (outProxy != null) {
			proxys = outProxy.getProxyUnids();
		}
		user.setProxys(proxys);

		user.setUserOpinions(userOpinions);

		user.setEffectiveDept(getFirstDept(user.getDepts()));

		return user;
	}
	/**
	 * 设置【代理人】子表Bean对象
	 * 
	 * @param unid
	 *            资源标识
	 * @param rs
	 *            资源
	 * @return Bean对象
	 */
	private OutProxy setBeanInProxy() {
		OutProxy outProxy = null;
		if (subRSInProxy == null || subRSInProxy.length < 2) {
			return outProxy;
		}

		outProxy = new OutProxy();
		String[] columnNames = subRSInProxy[0];// 列名称
		final int valueRowIndex = 1;// 值所在的行索引

		int beginTimeIndex = ArrayUtils
				.indexOf(columnNames, "proxy_begin_time");
		int endTimeIndex = ArrayUtils.indexOf(columnNames, "proxy_end_time");
		int noteIndex = ArrayUtils.indexOf(columnNames, "proxy_evection_note");
		int proxyUnidsIndex = ArrayUtils.indexOf(columnNames,
				"proxy_proxy_unids");
		int userUnidIndex = ArrayUtils.indexOf(columnNames, "proxy_user_unid");

		if (beginTimeIndex >= 0)
			outProxy.setBeginTime(subRSInProxy[valueRowIndex][beginTimeIndex]);

		if (endTimeIndex >= 0)
			outProxy.setEndTime(subRSInProxy[valueRowIndex][endTimeIndex]);

		if (noteIndex >= 0)
			outProxy.setExectionNote(subRSInProxy[valueRowIndex][noteIndex]);

		if (proxyUnidsIndex >= 0)
			outProxy
					.setProxyUnids(subRSInProxy[valueRowIndex][proxyUnidsIndex]);

		if (userUnidIndex >= 0)
			outProxy.setUserUnid(subRSInProxy[valueRowIndex][userUnidIndex]);

		return outProxy;
	}
	/**
	 * 设置【意见】子表Bean对象
	 * 
	 * @return Bean对象
	 */
	private List<UserOpinion> setBeanInOpinions() {
		List<UserOpinion> userOpinions = null;
		if (subRSInOpinions == null || subRSInOpinions.length < 2) {
			return userOpinions;
		}

		userOpinions = new ArrayList<UserOpinion>();
		String[] columnNames = subRSInOpinions[0];// 列名称
		int rowCount = subRSInOpinions.length;// 总行数

		// 获取列索引值
		int unidIndex = ArrayUtils.indexOf(columnNames, "opinion_unid");
		int contentIndex = ArrayUtils.indexOf(columnNames, "opinion_content");
		int sortIndex = ArrayUtils.indexOf(columnNames, "opinion_sort");
		int userUnidIndex = ArrayUtils
				.indexOf(columnNames, "opinion_user_unid");

		// 赋值
		for (int valueRowIndex = 1; valueRowIndex < rowCount; valueRowIndex++) {
			UserOpinion userOpinion = new UserOpinion();

			if (unidIndex >= 0)
				userOpinion.setUnid(subRSInOpinions[valueRowIndex][unidIndex]);
			if (contentIndex >= 0)
				userOpinion
						.setContent(subRSInOpinions[valueRowIndex][contentIndex]);
			if (sortIndex >= 0)
				userOpinion.setSort(StringUtil
						.parseInt(subRSInOpinions[valueRowIndex][sortIndex]));
			if (userUnidIndex >= 0)
				userOpinion
						.setUserUnid(subRSInOpinions[valueRowIndex][userUnidIndex]);

			userOpinions.add(userOpinion);
		}

		return userOpinions;
	}
	/**
	 * 搜索资源
	 * 
	 * @param unid
	 *            用户标识
	 * @param loginName
	 *            登录名称
	 * @para cn 0-登陆名 1-中文名
	 * @throws ManageException
	 */
	private void searchResource(String unid, String loginName,int cn)
			throws ManageException {

		// 判断资源的查找类型
		boolean unidIsNotEmpty = StringUtils.isNotEmpty(unid) ? true : false;// ID不为空
		boolean searchByUNID = unidIsNotEmpty ? true : false;// 通过ID的方式查找

		boolean nameIsNotEmpty = StringUtils.isNotEmpty(loginName) ? true
				: false;// 用户登录名不为空
		boolean searchByName = ((!searchByUNID && nameIsNotEmpty) ? true
				: false);// 通过用户登录名的方式查找

		// 生成查找SQL语句

		String mainSQL = "";
		String mainPK = unid;
		if (searchByUNID) {
			mainSQL = " SELECT * FROM ucap_user WHERE user_unid='" + mainPK
					+ "'";
		} else if (searchByName) {
			
			if (0==cn) {
				mainSQL = " SELECT * FROM ucap_user WHERE user_login_name='"
					+ loginName + "'";
			}else {
				mainSQL = " SELECT * FROM ucap_user WHERE user_display_name='"
					+ loginName + "'";
			}
			
		} else {
			throw new ManageException("查找用户资源的参数类型不合法！");
		}

		String subSQLInOpinions = "SELECT * FROM ucap_opinion WHERE opinion_user_unid='"
				+ mainPK + "'";
		String subSQLInProxy = "SELECT * FROM ucap_out_proxy WHERE proxy_user_unid='"
				+ mainPK + "'";

		// 执行搜索语句
		try {
			this.initJdbcTemplate();
			mainRS = jt.queryForArray(mainSQL);

			// ---重设主表ID
			if (searchByName) {
				if (mainRS != null && mainRS.length > 1) {
					String[] columnNames = mainRS[0];// 列名称
					final int valueRowIndex = 1;// 值所在的行索引
					mainPK = mainRS[valueRowIndex][ArrayUtils.indexOf(
							columnNames, "user_unid")];
				}
				 subSQLInOpinions = "SELECT * FROM ucap_opinion WHERE opinion_user_unid='"
						+ mainPK + "'";
				 subSQLInProxy = "SELECT * FROM ucap_out_proxy WHERE proxy_user_unid='"
							+ mainPK + "'";
			}	
			

			subRSInOpinions = jt.queryForArray(subSQLInOpinions);
			subRSInProxy = jt.queryForArray(subSQLInProxy);
		} catch (SQLException e) {
			final String errorClue = "查询失败，查询语句mainSQL:" + mainSQL
					+ " subSQLInTabs:" + subSQLInOpinions + " subSQLInProxys:"
					+ subSQLInProxy;
			log.error(errorClue, e);
			throw new ManageException(errorClue, e);
		} finally {
			this.recycleJdbcTemplate();
		}
	}

}

