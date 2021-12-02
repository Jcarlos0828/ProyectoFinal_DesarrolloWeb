# ProyectoFinal_DesarrolloWeb

## Aprende Ingles

Aprende ingles is a web platform that helps spanish native speakers to learn vocabulary in english by creating quizzes and having a record of all the activities and progress a user has made.

## Authors

Mariafernananda Salas Martínez  
Maria Renée Benavides Puente  
José Carlos del Castillo Estrada  


## Project Setup

Required to run the following commands for a correct installation and general setup of this project:

`npm i -y`  
`npm i express mongoose dotenv`  
`npm i ejs`  (run it as admin)  

To run the project locally, a `.env` file should be created with the following code to connect to localhost and to the database:  
`PORT = 3000`  
`MONGODB_HOST =  'mongodb://localhost/aprendiendo-ingles'`  


## Database Setup

Required to run the following commands for seeding the project's database correctly:

`db.quizzes.insert({preguntas:`  
                `[{titulo: "Cuál es la forma correcta de escribir 'Naranja'",`  
                `opciones: ["Oranje","Orange","Oruanch","Oranch"],`  
                `opcionCorrecta: 1},`  
                `{titulo: "Cuál es la forma correcta de escribir 'Fresa'",`  
                `opciones: ["Straubery","Strawberry","Strauberrie","Straberi"],`  
                `opcionCorrecta: 1`  
                `},`  
                `{titulo: "Cuál es la forma correcta de escribir 'Pera'",`  
                `opciones: ["Piar","Per","Pear","Pier"],`  
                `opcionCorrecta: 2`  
                `},`  
                `{titulo: "Cuál es la forma correcta de escribir 'Piña'",`  
                `opciones: ["Painapol","Pinapple","Paieapple","Pineapple"],`  
                `opcionCorrecta: 3`  
                `},`  
                `{titulo: "Cuál es la forma correcta de escribir 'Manzana'",`  
                `opciones: ["Apol","Apple","Aple","Apoul"],`  
                `opcionCorrecta: 1`  
                `}],`  
            `titulo: "Vocabulario de frutas" } )`  
`db.quizzes.insert({preguntas:`  
                `[{titulo: "Cuál es la forma correcta de escribir 'Mano'",`  
                `opciones: ["Hend","Hand","Han","Jan"],`  
                `opcionCorrecta: 1},`  
                `{titulo: "Cuál es la forma correcta de escribir 'Pie'",`  
                `opciones: ["Fut","Foot","Fot","Fet"],`  
                `opcionCorrecta: 1`  
                `},`  
                `{titulo: "Cuál es la forma correcta de escribir 'Rodilla'",`  
                `opciones: ["Ni","Nee","Knee","Kne"],`  
                `opcionCorrecta: 2`  
                `},`  
                `{titulo: "Cuál es la forma correcta de escribir 'Ojo'",`  
                `opciones: ["Ai","Eie","Ahye","Eye"],`  
                `opcionCorrecta: 3`  
                `},`  
                `{titulo: "Cuál es la forma correcta de escribir 'Nariz'",`  
                `opciones: ["Nous","Nose","Nouse","Nois"],`  
                `opcionCorrecta: 1`  
                `}],`  
            `titulo: "Vocabulario del cuerpo" } )`  