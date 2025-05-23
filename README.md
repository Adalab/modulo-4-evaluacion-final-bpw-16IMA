﻿# modulo-4-evaluacion-final-bpw-16IMA

# Wedding Music API 🎶💍

API RESTful para gestionar bodas, incluyendo eventos como banquete, ceremonia, cócteles, fiesta y usuarios asociados a cada boda. Desarrollada con **Node.js**, **Express.js** y **MySQL**.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Base de Datos**: MySQL
- **Librerías**:
  - `mysql2`
  - `express`
  - `cors`

## Instalación 🚀

1. Clona este repositorio:
   

   git clone https://github.com/Adalab/modulo-4-evaluacion-final-bpw-16IMA

   cd modulo-4-evaluacion-final-bpw-16IMA
   


2. Instala las dependencias:
   

  npm install


3. Configura la base de datos MySQL:
   

Crea la base de datos wedding_music y ejecuta el esquema de base de datos desde el archivo wedding_music.sql.


4. Configura las variables de entorno:
   

Crea un archivo .env con la siguiente información:

  MYSQL_HOST = 'yourhost'

  MYSQL_PORT = '3109'

  MYSQL_USER = 'youruser'

  MYSQL_PASSWORD ='yourpass'

  MYSQL_DATABASE = 'yourschema'


5. Ejecuta el servidor:

  npm run dev

  El servidor correrá en http://localhost:4000.

## Endpoints API 🌐

1. Crear una Boda
   
Método: POST
Ruta: /api/weddingmusic/wedding
Cuerpo:

{
  "localitation": "Hotel Paradise",
  
  "spouse_one_name": "Juan",
  
  "spouse_two_name": "Maria",
  
  "date": "2025-06-15"
}


2. Obtener Todas las Bodas

Método: GET
Ruta: /api/weddingmusic/wedding

3. Obtener una Boda Específica:

Método: GET
Ruta: /api/weddingmusic/wedding/:id

4. Actualizar una Boda

Método: PUT
Ruta: /api/weddingmusic/wedding/:id
Cuerpo:
{
  "localitation": "Luxury Hotel",
  
  "spouse_one_name": "Juan",
  
  "spouse_two_name": "Maria",
  
  "date": "2025-06-16"
}

5. Eliminar una Boda

Método: DELETE
Ruta: /api/weddingmusic/wedding/:id


## Estructura de la Base de Datos 🗄️

La base de datos está compuesta por las siguientes tablas:

* wedding: Información básica de la boda.

* banquet: Detalles del banquete, música y eventos relacionados.

* ceremony: Detalles de la ceremonia, entradas y final.

* cocktail: Información sobre el cóctel y la música asociada.

* party: Detalles sobre la fiesta, canciones y tipo de música.

* usuarias: Información de los usuarios registrados, asociados a bodas.

## Contribuciones 🤝

¡Las contribuciones son bienvenidas! Si encuentras algún problema o deseas agregar una nueva característica, no dudes en abrir un issue o enviar un pull request.

## Licencia 📜

Este proyecto está bajo la MIT License.


