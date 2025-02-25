# GIT
## Descargar e Instalar (GIT)
- https://git-scm.com/
--
## Crear una cuenta en (GITHUB - GITLAB - BITBUCKET)
- https://github.com

## Configurar GIT en su equipo
- Presentarse ante GIT
```
git config --global user.name "Su Nombre"
git config --global user.email "tu@correo.com"
```
---
## Crear un nuevo repositorio en (GITHUB)
- Ingresar a la pagina de GITHUB y Crear el Repositorio

## Configuración del Proyecto (Repositorio)
```
git init
git remote add origin https://url_repositorio_remoto
```
## Subir nuevos cambios al repositorio remoto (github)
```
git add .
git commit -m "Proyecto base con Autenticación"
git push origin master
```
## Actualizar nuevos cambios
```
git pull origin master
```