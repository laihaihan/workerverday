<%@ page language="java" pageEncoding="UTF-8"%>
<%@page import="com.linewell.core.file.AppFileManager"%>
<%@page import="java.util.List"%>
<%@page import="com.linewell.core.file.AppFile"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>图片浏览</title>
<LINK rel=stylesheet type=text/css href="${path}/core/js/slide/css/lrtk.css">
<script type=text/javascript src="${path}/core/js/slide/jquery.js"></script>
<script type=text/javascript src="${path}/core/js/slide/slide.js"></script>
</head>
<body style="text-align:center"> 
<DIV style="HEIGHT: 560px; PADDING-TOP: 20px" class="wrap picshow"> 
  <!--大图轮换区--> 
  <DIV id=picarea> 
    <DIV style="MARGIN: 0px auto; WIDTH: 774px; HEIGHT: 436px; OVERFLOW: hidden"> 
      <DIV style="MARGIN: 0px auto; WIDTH: 774px; HEIGHT: 436px; OVERFLOW: hidden" id=bigpicarea> 
        <P class=bigbtnPrev><SPAN id=big_play_prev></SPAN></P> 
        
        <DIV id=image_xixi-01 class=image><A href="http://www.lanrentuku.com/" target=_blank><IMG alt="" src="/app//core/js/images/42766101.jpg" width=772 height=434></A> 
          <DIV class=word> 
            <H3>舞动青春</H3> 
          </DIV> 
        </DIV> 
        
        <DIV id=image_xixi-02 class=image><A href="http://www.lanrentuku.com/" target=_blank><IMG alt="" src="images/42813100.jpg" width=772 height=434></A> 
          <DIV class=word> 
            <H3>台球厅的生活</H3> 
          </DIV> 
        </DIV>
        
        <DIV id=image_xixi-03 class=image><A href="http://www.lanrentuku.com/" target=_blank><IMG alt="" src="images/42813102.jpg" width=772 height=434></A> 
          <DIV class=word> 
            <H3>采访进行中</H3> 
          </DIV> 
        </DIV> 
        
        <DIV id=image_xixi-04 class=image><A href="http://www.lanrentuku.com/" target=_blank><IMG alt="" src="images/42813139.jpg" width=772 height=434></A> 
          <DIV class=word> 
            <H3>美女代言人</H3> 
          </DIV> 
        </DIV> 
        <DIV id=image_xixi-05 class=image><A href="http://www.lanrentuku.com/" target=_blank><IMG alt="" src="images/42766145.jpg" width=772 height=434></A> 
          <DIV class=word> 
            <H3>红色经典</H3> 
          </DIV> 
        </DIV> 
        <DIV id=image_xixi-06 class=image><A href="http://www.lanrentuku.com/" target=_blank><IMG alt="" src="images/42766146.jpg" width=772 height=434></A> 
          <DIV class=word> 
            <H3>回眸</H3> 
          </DIV> 
        </DIV> 
        <DIV id=image_xixi-07 class=image><A href="http://www.lanrentuku.com/" target=_blank><IMG alt="" src="images/42766159.jpg" width=772 height=434></A> 
          <DIV class=word> 
            <H3>眩光的诱惑</H3> 
          </DIV> 
        </DIV> 
        <P class=bigbtnNext><SPAN id=big_play_next></SPAN></P> 
      </DIV> 
    </DIV> 
    <DIV id=smallpicarea> 
      <DIV id=thumbs> 
        <UL> 
          <LI class="first btnPrev"><IMG id=play_prev src="${path}/core/js/slide/images/left.png"></LI> 
          <LI class=slideshowItem> <A id=thumb_xixi-01 href="#"><IMG src="images/42766316.jpg" width=90 height=60></A> </LI> 
          <LI class=slideshowItem> <A id=thumb_xixi-02 href="#"><IMG src="images/42813171.jpg" width=90 height=60></A> </LI> 
          <LI class=slideshowItem> <A id=thumb_xixi-03 href="#"><IMG src="images/42813178.jpg" width=90 height=60></A> </LI> 
          <LI class=slideshowItem> <A id=thumb_xixi-04 href="#"><IMG src="images/42813186.jpg" width=90 height=60></A> </LI> 
          <LI class=slideshowItem> <A id=thumb_xixi-05 href="#"><IMG src="images/42766362.jpg" width=90 height=60></A> </LI> 
          <LI class=slideshowItem> <A id=thumb_xixi-06 href="#"><IMG src="images/42766274.jpg" width=90 height=60></A> </LI> 
          <LI class="last_img slideshowItem"> <A id=thumb_xixi-07 href="#"><IMG src="/images/42766298.jpg" width=90 height=60></A> </LI> 
          <LI class="last btnNext"><IMG id=play_next src="${path}/core/js/slide/images/right.png"></LI> 
        </UL> 
      </DIV> 
    </DIV> 
  </DIV> 
  <SCRIPT>
var target = ["xixi-01","xixi-02","xixi-03","xixi-04","xixi-05","xixi-06","xixi-07"];
</SCRIPT> 
</DIV> 

</body>
</html>
