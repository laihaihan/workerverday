<%@page contentType="text/html;charset=UTF-8"%>
<!--提示窗口代码开始-->
<!--初状态-->
<div id="loft_win" style="z-index: 99999; left: 0px; visibility: hidden; width: 200px;
    position: absolute; top: 0px; height: 30px;">
    <table cellspacing="0" cellpadding="0" width="100%" bgcolor="#FFFFFF" border="0"
        onmousedown="ucapfloatpage.startdrag(this)" onmouseup="ucapfloatpage.stopdrag(this)" onmousemove="ucapfloatpage.drag(this)"
        style="cursor: pointer">
        <tr>
            <td width="100%" valign="top" align="center">
                <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td width="17px" class="loft_win_head" onclick="ucapfloatpage.minDiv()">
                            <img id="icondiv" src="../../uistyle/images/b.gif" width="15px" height="15px" alt="" />
                        </td>
                        <td width="70px" class="loft_win_head">
                            <span id="titlediv" style="cursor: hand; font-size: 12px; font-weight: bold; margin-right: 4px;"
                                title="最小化" onclick="ucapfloatpage.minDiv()">无标题</span></td>
                        <td width="9px" class="loft_win_head">
                        </td>
                        <td align="right" class="loft_win_head">
                            <span style="cursor: hand; font-size: 12px; font-weight: bold; margin-right: 4px;"
                                title="最小化" onclick="ucapfloatpage.minDiv()">- </span><span style="cursor: hand; font-size: 12px;
                                    font-weight: bold; margin-right: 4px;" title="关闭" onclick="ucapfloatpage.closeDiv()">×</span>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td height="100%" align="center" valign="middle" colspan="3">
                <div id="contentDiv">
                    <table width="100%" height="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td align="left" height="100%" style="font-size: 12px; padding: 3px; text-align: center">
                                <div id="ContentDiv">
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </td>
        </tr>
    </table>
</div>
<!--最小化状态-->
<div id="loft_win_min" style="z-index: 99999; left: 0px; visibility: hidden; width: 200px;
    position: absolute; top: 0px;">
    <table cellspacing="0" cellpadding="0" width="100%" bgcolor="#FFFFFF" border="0">
        <tr>
            <td width="100%" valign="top" align="center">
                <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td width="70" class="loft_win_head">
                            <span title="还原" style="cursor: hand; font-size: 12px; font-weight: bold; margin-right: 4px;"
                                onclick="ucapfloatpage.maxDiv()">展开</span></td>
                        <td width="26" class="loft_win_head">
                        </td>
                        <td align="right" class="loft_win_head">
                            <span title="还原" style="cursor: hand; font-size: 12px; font-weight: bold; margin-right: 4px;"
                                onclick="ucapfloatpage.maxDiv()">□</span><span title="关闭" style="cursor: hand; font-size: 12px;
                                    font-weight: bold; margin-right: 4px;" onclick="ucapfloatpage.closeDiv()">×</span>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>
<!--提示窗口代码结束-->
