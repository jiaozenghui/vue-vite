<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8" />
	<title>数据机房动环监控</title>
	<meta content="width=device-width, initial-scale=1.0" name="viewport" />
	<meta content="" name="description" />
	<meta content="" name="author" />
	<link href="./static/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
	<link href="./static/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" type="text/css"/>
	<link href="./static/bootstrap/font-awesome/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link href="./static/bootstrap/css/style-metro.css" rel="stylesheet" type="text/css"/>
	<link href="./static/bootstrap/css/style.css" rel="stylesheet" type="text/css"/>
	<link href="./static/bootstrap/css/style-responsive.css" rel="stylesheet" type="text/css"/>
	<link href="./static/bootstrap/css/default.css" rel="stylesheet" type="text/css" id="style_color"/>
	<link href="./static/bootstrap/css/uniform.default.css" rel="stylesheet" type="text/css"/>
	<link href="./static/jquery/plugin/gritter/jquery.gritter.css" rel="stylesheet" type="text/css"/>
	<link href="./static/bootstrap/css/pricing-tables.css" rel="stylesheet" type="text/css" />
	<link href="./static/jquery/plugin/dataTable/DT_bootstrap.css" rel="stylesheet" type="text/css" />
	<link href="./static/my/css/gongge.css" rel="stylesheet" type="text/css"/>
	<link href="./static/jquery/plugin/chosen/chosen.css" rel="stylesheet" type="text/css" />

	<link rel="shortcut icon" href="./static/my/image/xunweilogo.png" />
	<style>
		.table th, .table td {
			padding: 10px;
			line-height: 20px;
			text-align: left;
			vertical-align: top;
			/*border-top: 0px solid #ddd;*/
		}
		.table-striped tbody>tr:nth-child(odd)>td, .table-striped tbody>tr:nth-child(odd)>th {
			background-color: #f1f9fe;
			/*background: -webkit-linear-gradient(left, #f1f9fe , #e1f9fe); !* Safari 5.1 - 6.0 *!*/
			/*background: -o-linear-gradient(right,#f1f9fe , #e1f9fe); !* Opera 11.1 - 12.0 *!*/
			/*background: -moz-linear-gradient(right, #f1f9fe , #e1f9fe); !* Firefox 3.6 - 15 *!*/
			/*background: linear-gradient(to right, #f1f9fe , #e1f9fe); !* 标准的语法 *!*/
		}
		#three_canvas {
			/*position: absolute;*/
			width: 100%;
			height: 100%;
		}
		.toolbar{
			display: block;
			position: absolute;
			/*left: 10px;*/
			top: 375px;
			width: 32px;
			height: 480px;
			/*background: rgba(255, 255, 255, 0.75);*/
			border-radius: 5px;
		}
		.toolbar img{
			position: absolute;
			left: 4px;
			top: 16px;
			pointer-events: auto;
			cursor: pointer;
			width: 24px;
			height: 24px;
		}
	</style>
</head>
<body class="page-header-fixed page-sidebar-closed">
<div class="row-fluid">
	<jsp:include page="top-nav.jsp"></jsp:include>
</div>
<div class="page-container">
	<!-- BEGIN 导航栏 -->
	<div class="page-sidebar nav-collapse collapse" style="position: fixed;z-index: 999;">
		<ul class="page-sidebar-menu" id="id_navigator">
			<li>
				<div class="sidebar-toggler hidden-phone"></div>
			</li>

		</ul>
	</div>
	<!-- END 导航栏 -->

	<!-- BEGIN 内容 -->
	<div class="page-content">
		<div class="container-fluid">
			<div class="row-fluid">
				<div class="span12">
					<ul class="breadcrumb">
						<li>
							<i class="icon-home"></i>
							<a href="javascript:;">监控管理</a>
							<i class="icon-angle-right"></i>
						</li>
						<li>
							<a href="home">监控总览</a>
							<i class="icon-angle-right"></i>
						</li>
						<li><a href="javascript:;">机房总览</a></li>

					</ul>
				</div>
			</div>
			<div id="dashboard">
				<div class="row-fluid">
					<div class="span12" >
						<div class="portlet" style="min-height: 465px;">
							<div class="portlet-body">
								<div class="row-fluid" id="roomMessage" >
									<div id="canvas-frame" class="canvas_frame "  style="max-width: 1500px;min-height: 921px;"></div>
									<div id="toolbar" class="toolbar">
										<img src="./static/jquery/three/img/reset.png" title="场景复位" id="resetScene" style="top:48px">
										<img src="./static/jquery/three/img/space.png" title="创建机柜" id="createCabinet" style="top:80px">
										<%--<img src="./static/jquery/three/img/move.png" title="移除机柜" id="moveCabinet" style="top: 80px;">--%>
										<img src="./static/jquery/three/img/edit.png" title="拖拽机柜" id="dragCabinet" style="top: 112px;">
										<img src="./static/jquery/three/img/power.png" title="保存拖拽状态" id="saveDragCabinet" style="top: 144px;">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row-fluid  last-portlet">
					<div class="span12">
						<div class="portlet" style="min-height: 465px;">
							<div class="portlet-title">
								<div class="caption"><i class="icon-cogs"></i>机房关联信息</div>
							</div>
							<div class="portlet-body" style="">
								<div class="tabbable tabbable-custom tabbable-full-width" id="navTabs">
									<ul class="nav nav-tabs">
										<li class="active"><a href="#tab_index_1" data-toggle="tab">设备</a></li>
										<li><a href="#tab_index_2" data-toggle="tab">接入间</a></li>
										<li><a href="#tab_index_3" data-toggle="tab">SNM模块</a></li>
									</ul>
									<div class="tab-content">
										<div class="tab-pane row-fluid active" id="tab_index_1">
											<table class="table table-full-width table-hover" id="roomRelateDevTable">
											</table>
										</div>
										<div class="tab-pane profile-classic row-fluid" id="tab_index_2">
											<table class="table table-full-width table-hover " id="roomRelateInterAccessTable">
											</table>
										</div>
										<div class="tab-pane row-fluid profile-account" id="tab_index_3">
											<table class="table table-full-width table-hover" id="roomRelateSnmTable">
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<ul  id="3dOperator" class="dropdown-menu" style="display: none;top: 2px;width: 95%;height: 95%;border: 0px;">
		<li id="move_cabinet"><a href="javascript:;"><i class="icon-remove-sign"></i> 移除机柜</a></li>
		<li id="bind_amm"><a href="javascript:;"><i class=" icon-plus-sign"></i> 绑定电表</a></li>
		<li id="unbind_amm"><a href="javascript:;"><i class="icon-minus-sign"></i> 解除绑定</a></li>
	</ul>

	<form class="form-horizontal" id="bindAmmter" style='margin-top: 20px;color: yellowgreen;display: none'>
		<div class="control-group">
			<div class="control-label" style="width: auto;margin-left: 20px;">电表名称</div>
			<div class="controls" style="float: left;width: 50%;">
				<select data-placeholder="-请选择-" placeholder="-请选择-" name="nameOption" id="bindOption" multiple size="2">
				</select>
				<label class="control-label" ></label>
			</div>
		</div>
		<div id="bindContent" style="width: auto;margin-left: 20px;"></div>
	</form>
	<!-- END 内容 -->
</div>
<%--<div class="footer">--%>
<%--<div class="footer-inner">--%>
<%--</div>--%>
<%--<div class="footer-tools">--%>
<%--<span class="go-top">--%>
<%--<i class="icon-angle-up"></i>--%>
<%--</span>--%>
<%--</div>--%>
<%--</div>--%>
<script src="./static/jquery/jquery-1.10.1.min.js" type="text/javascript"></script>
<script src="./static/jquery/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
<script src="./static/jquery/plugin/jquery-ui/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>
<script src="./static/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="./static/jquery/jquery.cookie.min.js" type="text/javascript"></script>
<script src="./static/jquery/jquery.uniform.min.js" type="text/javascript" ></script>
<script src="./static/jquery/plugin/gritter/jquery.gritter.js" type="text/javascript"></script>
<script type="text/javascript" src="./static/jquery/doT.min.js"></script>
<script src="./static/jquery/plugin/dataTable/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="./static/jquery/plugin/dataTable/DT_bootstrap.js" type="text/javascript"></script>
<script src="./static/jquery/jquery.blockui.min.js" type="text/javascript"></script>
<script src="./static/jquery/plugin/chosen/chosen.jquery.min.js" type="text/javascript"></script>
<script src="./static/jquery/plugin/validate/jquery.validate.min.js" type="text/javascript"></script>
<script src="./static/jquery/plugin/validate/form-validate.js" type="text/javascript"></script>

<script src="./static/jquery/layer/layer.js" type="text/javascript"></script>
<script src="./static/jquery/three/Detector.js" type="text/javascript"></script>
<script src="./static/jquery/three/three.min.js" type="text/javascript"></script>
<%--<script src="./static/jquery/three/threeQuery.min.js" type="text/javascript"></script>--%>
<script src="./static/jquery/three/ThreeBSP.js" type="text/javascript"></script>
<script src="./static/jquery/three/Tween.js" type="text/javascript"></script>
<script src="./static/jquery/three/SEA3D.js" type="text/javascript"></script>
<script src="./static/jquery/three/SEA3DLoader.js" type="text/javascript"></script>
<script src="./static/jquery/three/TransformControls.js" type="text/javascript"></script>
<script src="./static/jquery/three/OrbitControls.js" type="text/javascript"></script>
<script src="./static/jquery/three/DragControls.js" type="text/javascript"></script>
<script src="./static/jquery/three/Stats.min.js" type="text/javascript"></script>
<%--<script src="./static/jquery/three/dcms3D.js" type="text/javascript"></script>--%>
<script src="./static/jquery/three/Room3D.js" type="text/javascript"></script>
<%--<script src="./static/jquery/three/data.js" type="text/javascript"></script>--%>
<script src="./static/my/js/public-constant.js" type="text/javascript"></script>
<script src="./static/my/js/common.js" type="text/javascript"></script>
<script src="./static/my/js/roomInfo.js" type="text/javascript"></script>
<script src="./static/my/js/app.js" type="text/javascript"></script>
<script>
	jQuery(document).ready(function() {
		App.init();
		CommonJS.init();
		CommonJS.fnNavBar("monitor","home");
		RoomInfo.init();
	});
</script>
<script type="x-shader/x-fragment" id="fragmentShaderDepth">
			#include <packing>
			uniform sampler2D texture;
			varying vec2 vUV;
			void main() {
				vec4 pixel = texture2D( texture, vUV );
				if ( pixel.a < 0.5 ) discard;
				gl_FragData[ 0 ] = packDepthToRGBA( gl_FragCoord.z );
			}
	</script>

<script type="x-shader/x-vertex" id="vertexShaderDepth">
			varying vec2 vUV;
			void main() {
				vUV = 0.75 * uv;
				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
				gl_Position = projectionMatrix * mvPosition;
			}
	</script>

<script id="devInfoTemplate" type="text/x-dot-template">
	{{~it.data:value:index }}
	<div class="row-fluid">
		{{~value:val:ind}}
		<div class="span12 ">
			<div class="control-group">
				<label class="control-label" style="text-align: center !important;">{{=val.name}}
				</label>
				<div class="controls">
					<span class="text" style="color: greenyellow;;">{{=val.displayName}}</span>
				</div>
			</div>
		</div>
		{{~}}
	</div>
	{{~ }}

</script>
<script id="unBindTemplate" type="text/x-dot-template">
	<form class="form-horizontal" id="unbindAmmter" style='margin-top: 20px;color: yellowgreen;'>
		{{~it.data:value:index }}
		<div class="control-group">
			<div class='control-label' style='width: auto;margin-left: 10px;'>
				<input type='checkbox' id="{{=value.shellname}}" name="{{=value.shellname}}"></div>
			<div class="control-label" style="width: auto;margin-left: 20px;">名称</div>
			<div class="controls" style="float: left;width: 50%;">
				<label class="control-label" >{{=value.devObj.devName}}</label>
			</div>
		</div>
		{{~ }}
		<span id="spanId" style="color:red;"></span>
	</form>



</script>
</body>
</html>