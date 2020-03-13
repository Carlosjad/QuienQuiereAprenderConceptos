# QuienQuiereAprenderConceptos
Juego basado en quien quiere ser millonario adaptado para repasar y aprender conceptos sobre Software Basado en Componentes

#Pasos para instalacion de este proyecto 

1- Se debe descargar el proyecto

2- Ingresar a la carpeta qqac

3- En una consola(terminal) ejecutada como administrador ejecutar el comando npm install

4- Una vez terminado el proceso de instalacion se debe correr el proyecto con el comando npm start

5- Disfruta del juego

#Pasos para modificacion de archivo de preguntas

1- Se debe ingresar a la carpeta files que esta en la ruta qqac/src/files

2- En esta se encuentra un archivo llamado preguntas.xlsx

3- Este archivo se lo puede modificar ya sea encima o modificarlo por otro nuevo con el mismo nombre

4- El archivo debe tener una cabecera con las columnas de la siguiente manera: OPCION A, OPCION B, OPCION C, OPCION D, PREGUNTA, RESPUESTA, PISTA

5- En donde se ponen en orden las 4 opciones de respuesta, la pregunta, la letra de la respuesta (a,b,c,d) y al finalizar una pista para la ayuda que se tiene en el juego
 
6- En caso de que se aumenten preguntas se debe ingresar en el proyecto al archivo juego.js ubicado en la ruta qqac\src\js en la linea 113 y modificar el for (let i = 2; i <=16; i++) modificándole el 16 por el numero de la fila máxima que se tiene en el archivo Excel

7- Por último, se guardan los archivos se realiza la recarga del proyecto para que se tomen las nuevas preguntas
