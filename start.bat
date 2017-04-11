:: 0:43 2017/3/23
:: create by li shihai

@echo off

set "filename=handler\all.js"
set "tempfile=temp.txt"
if exist %filename% del %filename%
echo // %date%>%tempfile%
echo // create by li shihai>>%tempfile%

for /f %%i in ('dir handler\*.js /b') do (
    echo require['./%%i'];>>%tempfile%
)

set "search1=["
set "replace1=("
set "search2=]"
set "replace2=)"

setlocal EnableDelayedExpansion

for /f "tokens=* delims=%%" %%l in (%tempfile%) do (
    set "line=%%l"
    set "line=!line:%search1%=%replace1%!"
    set "line=!line:%search2%=%replace2%!"
    echo !line!>>%filename%
)

setlocal DisableDelayedExpansion

del %tempfile%

set "srcFile=%~dp0Table.js"
set "dstFile=%~dp0..\client\assets\script\Table.js"
echo copy /Y %srcFile% %dstFile%
copy /Y %srcFile% %dstFile%

node index.js