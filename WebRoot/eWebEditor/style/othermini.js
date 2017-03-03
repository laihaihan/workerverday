config.ButtonDir = "blue";
config.StyleUploadDir = "uploadfile/";
config.InitMode = "TEXT";
config.AutoDetectPasteFromWord = "1";
config.BaseUrl = "1";
config.BaseHref = "";
config.AutoRemote = "1";
config.ShowBorder = "0";
config.StateFlag = "0";
config.CssDir = "coolblue";
config.AutoDetectLanguage = "1";
config.DefaultLanguage = "zh-cn";
config.AllowBrowse = "0";
config.AllowImageSize = "100";
config.AllowFlashSize = "100";
config.AllowMediaSize = "100";
config.AllowFileSize = "500";
config.AllowRemoteSize = "100";
config.AllowLocalSize = "100";

function showToolbar(){

  document.write ("<table border=0 cellpadding=0 cellspacing=0 width='100%' class='Toolbar' id='eWebEditor_Toolbar'><tr><td><div class=yToolbar><DIV CLASS=TBSep></DIV><DIV CLASS=Btn TITLE='"+lang["ModeText"]+"' onclick=\"setMode('TEXT')\"><IMG CLASS=Ico SRC='buttonimage/blue/modetextbtn.gif'></DIV><DIV CLASS=TBSep></DIV></div></td></tr></table>");

}
