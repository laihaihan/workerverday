<%@page language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%@include file="../../../core/params.jsp"%>
<html>
	<head>
		<title></title>
		<link rel="stylesheet" href="${path}/core/js/jquery-ui/themes/base/jquery.ui.all.css">
		<script src="${path}/core/js/jquery-ui/jquery-1.5.1.js"></script>
		<script src="${path}/core/js/jquery-ui/ui/jquery.ui.core.js"></script>
		<script src="${path}/core/js/jquery-ui/ui/jquery.ui.widget.js"></script>
		<script src="${path}/core/js/jquery-ui/ui/jquery.ui.mouse.js"></script>
		<script src="${path}/core/js/jquery-ui/ui/jquery.ui.sortable.js"></script>
		<LINK rel="stylesheet" type="text/css" href="portal.css">
		<link rel="stylesheet" href="demos.css">
		<style>
.column {
	
}

.ui-sortable-placeholder {
	border: 1px dotted black;
	visibility: visible !important;
	height: 50px !important;
}

.ui-sortable-placeholder * {
	visibility: hidden;
}
</style>
		<script>
$(function() {
	$( ".column" ).sortable({
		connectWith: ".column",
		cursor: 'hand'
	});


	$( ".portlet-header .ui-icon" ).click(function() {
		$( this ).toggleClass( "ui-icon-minusthick" ).toggleClass( "ui-icon-plusthick" );
		$( this ).parents( ".portlet:first" ).find( ".portlet-content" ).toggle();
	});

	$( ".column" ).disableSelection();
});
</script>
	</head>
	<body>
		<div class="demo">

			<div class="column">

				<div class="portlet">
					<div class="portlet-header">
					</div>
					<div class="portlet-content">
						<DIV align="left">
							<DIV style="width: 25%; float: left;">
								<DIV style="height: 450px; overflow: hidden; margin-top: 7px; margin-left: 8px;" id="weitijiao" class="b2">
									<DIV class="header">
										<SPAN style="float: right;"> <A href="javascript:moreMessage('42F3A5B989447114A49CEB5FF287BD98');">更多操作&gt;&gt;</A> </SPAN>
										<H2>
											1111
										</H2>
									</DIV>
									<DIV class="f1">
									</DIV>
									<DIV style='' class="cnt">
									</DIV>
								</DIV>
							</DIV>
						</DIV>
					</div>
				</div>

				<div class="portlet">
					<div class="portlet-header">
					</div>
					<div class="portlet-content">
						<DIV align="left">
							<DIV style="width: 25%; float: left;">
								<DIV style="height: 450px; overflow: hidden; margin-top: 7px; margin-left: 8px;" id="weitijiao" class="b2">
									<DIV class="header">
										<SPAN style="float: right;"> <A href="javascript:moreMessage('42F3A5B989447114A49CEB5FF287BD98');">更多操作&gt;&gt;</A> </SPAN>
										<H2>
											2222
										</H2>
									</DIV>
									<DIV class="f1">
									</DIV>
									<DIV style='' class="cnt">
									</DIV>
								</DIV>
							</DIV>
						</DIV>
					</div>
				</div>

			</div>

			<div class="column">

				<div class="portlet">
					<div class="portlet-header">
					</div>
					<div class="portlet-content">
						<DIV align="left">
							<DIV style="width: 25%; float: left;">
								<DIV style="height: 450px; overflow: hidden; margin-top: 7px; margin-left: 8px;" id="weitijiao" class="b2">
									<DIV class="header">
										<SPAN style="float: right;"> <A href="javascript:moreMessage('42F3A5B989447114A49CEB5FF287BD98');">更多操作&gt;&gt;</A> </SPAN>
										<H2>
											3333
										</H2>
									</DIV>
									<DIV class="f1">
									</DIV>
									<DIV style='' class="cnt">
									</DIV>
								</DIV>
							</DIV>
						</DIV>
					</div>
				</div>

			</div>

			<div class="column">

				<div class="portlet">
					<div class="portlet-header">
					</div>
					<div class="portlet-content">
						<DIV align="left">
							<DIV style="width: 25%; float: left;">
								<DIV style="height: 450px; overflow: hidden; margin-top: 7px; margin-left: 8px;" id="weitijiao" class="b2">
									<DIV class="header">
										<SPAN style="float: right;"> <A href="javascript:moreMessage('42F3A5B989447114A49CEB5FF287BD98');">更多操作&gt;&gt;</A> </SPAN>
										<H2>
											4444
										</H2>
									</DIV>
									<DIV class="f1">
									</DIV>
									<DIV style='' class="cnt">
									</DIV>
								</DIV>
							</DIV>
						</DIV>
					</div>
				</div>

				<div class="portlet">
					<div class="portlet-header">
					</div>
					<div class="portlet-content">
						<DIV align="left">
							<DIV style="width: 25%; float: left;">
								<DIV style="height: 450px; overflow: hidden; margin-top: 7px; margin-left: 8px;" id="weitijiao" class="b2">
									<DIV class="header">
										<SPAN style="float: right;"> <A href="javascript:moreMessage('42F3A5B989447114A49CEB5FF287BD98');">更多操作&gt;&gt;</A> </SPAN>
										<H2>
											5555
										</H2>
									</DIV>
									<DIV class="f1">
									</DIV>
									<DIV style='' class="cnt">
									</DIV>
								</DIV>
							</DIV>
						</DIV>
					</div>
				</div>

			</div>

		</div>
		<!-- End demo -->
	</body>
</html>
