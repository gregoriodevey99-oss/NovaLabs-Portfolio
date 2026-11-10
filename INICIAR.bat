@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"
echo NovaLabs Portfolio - Inicio del sitio
echo.
if exist ".venv\Scripts\python.exe" goto instalar
where py >nul 2>&1
if not errorlevel 1 (
    py -3 -m venv .venv
    goto revisar_entorno
)
where python >nul 2>&1
if not errorlevel 1 (
    python -m venv .venv
    goto revisar_entorno
)
echo No se encontro Python. Instala Python 3.11 o posterior y volve a iniciar.
goto error
:revisar_entorno
if not exist ".venv\Scripts\python.exe" goto error
:instalar
".venv\Scripts\python.exe" -m pip install -r requirements.txt
if errorlevel 1 goto error
echo.
echo Abriendo NovaLabs en http://127.0.0.1:5000
echo Para detener el servidor, presiona Ctrl+C.
echo.
".venv\Scripts\python.exe" app.py
if errorlevel 1 goto error
pause
exit /b 0
:error
echo.
echo No se pudo iniciar. Revisa el mensaje anterior.
echo En la primera instalacion necesitas conexion a Internet.
pause
exit /b 1
