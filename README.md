# ProyectoFinal_DesarrolloWeb

## Authors:
### Mariafernananda Salas Martínez
### Maria Renée Benavides Puente
### José Carlos del Castillo Estrada

# Proyect Setup

Required to run the following commands for a correct installation and general setup of this project:

`npm i -y`  
`npm i express mongoose dotenv`  
`npm i ejs` (hay que correr como administrador)

# Database Setup

Required to run the following commands for seeding the project's database correctly:

`db.quizzes.insert({preguntas:` 
                `[{titulo: "Cuál es la forma correcta de escribir 'Naranja'",` 
                `opciones: ["Orange","Oranje","Oruanch","Oranch"],`
                `opcionCorrecta: 0},`
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
                `opciones: ["Apple","Apol","Aple","Apoul"],`
                `opcionCorrecta: 0`
                `}],` 
            `titulo: "Vocabulario de frutas" } )`
`db.quizzes.insert({preguntas:`
                `[{titulo: "Cuál es la forma correcta de escribir 'Mano'",` 
                `opciones: ["Hand","Hend","Han","Jan"],`
                `opcionCorrecta: 0},` 
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
                `opciones: ["Nose","Nous","Nouse","Nois"],`
                `opcionCorrecta: 0`
                `}],` 
            `titulo: "Vocabulario del cuerpo" } )`