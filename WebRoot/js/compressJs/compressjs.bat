for /f %%i in (dir.txt) do type %%i >> ucap-debug.js    
java -jar yuicompressor-2.4.2.jar --type js --charset utf-8 -o ..\ucap-min.js ucap-debug.js