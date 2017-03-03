<%@ page language="java" pageEncoding="UTF-8"%>
    <table width="100%"border="0" cellpadding="0" cellspacing="0">
      <!--DWLayoutTable-->
      <tr>
        <td valign="top">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <!--DWLayoutTable-->
          <tr>
            <td height="30" valign="top">
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
              <!--DWLayoutTable-->
              <tr>
                <td width="108" height="30" background="images/td_menu_1.gif" class="td_title">&nbsp;&nbsp;统计图表</td>
                <td valign="top" background="images/td_menu_2.gif"><!--DWLayoutEmptyCell-->&nbsp;</td>
                <td width="10" valign="top" background="images/td_menu_3.gif"><!--DWLayoutEmptyCell-->&nbsp;</td>
              </tr>
            </table></td>
            </tr>
          <tr>
            <td class="ys_box">
            <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
					<iframe id="chartIframe1" name="chartIframe1" src="<%=request.getContextPath()%>/amchart/jsp/ampie_iframe_effistate.jsp" width="100%" height="218"   frameborder="0" 
       	  										border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
				</td>
				<td align="center">
					<!--<img src="images/tb_pic_2.gif" width="281" height="183" />-->
					<iframe id="chartIframe2" name="chartIframe2" src="<%=request.getContextPath()%>/amchart/jsp/amcolumn_iframe_handlestate.jsp" width="100%" height="218"  frameborder=0 
       	  										border=0 marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
				</td>
              </tr>
            </table>
            </td>
          </tr>
          
        </table></td>
        <td width="10" valign="top"><!--DWLayoutEmptyCell-->&nbsp;</td>
        <td width="230" valign="top">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <!--DWLayoutTable-->
          <tr>
            <td width="230" height="247" class="link_box"><table width="98%" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td height="47" align="center" valign="top"><a href="#"><img src="images/link_btn_1.gif" width="215" height="43" border="0" /></a></td>
              </tr>
              <tr>
                <td height="47" align="center" valign="top"><a href="#"><img src="images/link_btn_2.gif" width="215" height="43" border="0" /></a></td>
              </tr>
              <tr>
                <td height="47" align="center" valign="top"><a href="#"><img src="images/link_btn_3.gif" width="215" height="43" border="0" /></a></td>
              </tr>
              <tr>
                <td height="47" align="center" valign="top"><a href="#"><img src="images/link_btn_4.gif" width="215" height="43" border="0" /></a></td>
              </tr>
              <tr>
                <td height="47" align="center" valign="top"><a href="#"><img src="images/link_btn_5.gif" width="215" height="43" border="0" /></a></td>
              </tr>
            </table></td>
          </tr>
        </table>
        </td>
      </tr>
    </table>
   