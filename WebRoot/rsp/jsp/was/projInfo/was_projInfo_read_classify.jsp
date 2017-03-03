<%@ page language="java" pageEncoding="UTF-8" %>
 <fieldset>
        <legend class="legend">项目分类信息</legend>
        <table cellpadding="0" cellspacing="1"   class="p_table01" align="center">
            <col width="16%" align="right">
            <col width="34%" align="left">
            <col width="15%" align="right">
            <col width="35%" align="left">
            <tr>
                <th>项目性质 ：</th>
                <td>
                	<s:property value="@com.linewell.rsp.baseresouse.was.treedict.WasTreeDictManager@getDictNameByTypeAndValue('proj_prop',#request.projInfo.proj_prop)"/>
                </td>
                <th>行业分类 ：</th>
                <td>
                	<s:property value="@com.linewell.rsp.baseresouse.was.treedict.WasTreeDictManager@getDictNameByTypeAndValue('invest_type',#request.projInfo.indust_type)"/>
                </td>
            </tr>
            <tr>
                <th>建设性质 ：</th>
                <td>
                	<s:property value="@com.linewell.rsp.baseresouse.was.treedict.WasTreeDictManager@getDictNameByTypeAndValue('build_type',#request.projInfo.build_type)"/>
                </td>
                <th>资金来源 ：</th>
                <td>
                	<s:property value="@com.linewell.rsp.baseresouse.was.treedict.WasTreeDictManager@getDictNameByTypeAndValue('fund_source',#request.projInfo.fund_source)"/>
                </td>
            </tr>
            <tr>
                <th>资金来源说明 ：</th>
                <td>${projInfo.fund_sourcememo}</td>
                <th>地区分类 ：</th>
                <td>
                	<s:property value="@com.linewell.rsp.baseresouse.was.treedict.WasTreeDictManager@getDictNameByTypeAndValue('area_class',#request.projInfo.area_class)"/>
                </td>
            </tr>
            <tr>
                <th>投资类型 ：</th>
                <td>
                	<s:property value="@com.linewell.rsp.baseresouse.was.treedict.WasTreeDictManager@getDictNameByTypeAndValue('invest_type',#request.projInfo.invest_type)"/>
                </td>
                <th>管辖范围 ：</th>
                <td>
                	<s:property value="@com.linewell.rsp.baseresouse.was.treedict.WasTreeDictManager@getDictNameByTypeAndValue('domi_scope',#request.projInfo.domi_scope)"/>
                </td>
            </tr>
        </table>
    </fieldset>