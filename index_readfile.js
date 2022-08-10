const { table } = require('console');
const electron = require('electron');
const fs = require('fs');

const functions_canvas = require('./functions/functions_canvas');
const functions_tableinfo = require('./functions/functions_tableinfo')
const functions_readfile = require('./functions/functions_readfile');

var load_quizs_opened = [];

// Variables sobre el Quizs a mostar.
var name_quiz = "";
var quiz_info = [];

var info_table = document.getElementById("info_table");
var global_results = document.getElementById("global_quiz_results");
var diagram_examples = document.getElementById("diagram_examples");


var annoying_list = [];
var calm_list= [];
var chaotic_list = [];
var eventful_list = [];
var monotonous_list = [];
var pleasant_list = [];
var uneventful_list = [];
var vibrant_list = [];

function load_results() {
    electron.ipcRenderer.invoke('load_quizs_opened', load_quizs_opened);
}
electron.ipcRenderer.on('load_quizs_opened', (event, message) => {
    console.log("Recibido la lista de quizs creados: " + message);
    load_quizs_opened = message;
    //Abremos recibido un array de Cuestionarios Creados.
    for (let i = 0; i < message.length; i++) {
        let name_quiz = message[i].split(".")[0]
        document.getElementById("results").innerHTML = '<button onclick="'+'name_selected('+i+')"><b>'+name_quiz+'<b></button>';        
    }
});

function name_selected(file_number) {
    // Dependiendo del número se selecciona una opción u otra.
    console.log("El Quiz seleccionado es: " + load_quizs_opened[file_number]);
    name_quiz =load_quizs_opened[file_number];
    // Pedimos al main.js que nos pase en un array toda la información sobre los Cuestionarios hechos con ese nombre.
    electron.ipcRenderer.invoke('quizs_summary', load_quizs_opened[file_number]);
}
electron.ipcRenderer.on('quizs_summary', (event, message) => {
    console.log("Recibido los resultados: " + message);
    /* Se añade el nombre del Cuestionario a la página para que el Usuario de que cuestioanrio está 
        viendo los resultados. */
    document.getElementById("option_name_quiz").innerHTML = name_quiz.split(".")[0];
    //-- Pasamos a una variable global toda la información sobre los cuestionarios realizados.
    quiz_info = message;
    console.log("Número de cuestionarios hechos: " + quiz_info.length);
    console.log("Info " + quiz_info[0][0]["Date"])
/* Creating a table with the information of the file. */
    // Creamos la tabla para que se introduzcan los elementos más relevantes en ella.

    // La tabla estará ordenada de la forma 'First-In First-Out', el primer cuestionario en rellenarse será
    // el primero en aperecer en la lista.
    info_table.innerHTML = functions_tableinfo.create_table_info_init_string();
    // Añadimos los valores de cada partipante a la tabla.
    functions_tableinfo.add_data_table_info();

    // COMENZAMOS CON EL DESARROLLO Y MUESTRA DE LOS VALORES GLOBALES

    // Cargamos ahora los resultados globales.
    // Comenzamos con la información de la edad.
    functions_tableinfo.age_global_results();
    // Continuamos con la información del género.
    functions_tableinfo.gender_global_results();

    //-- Resumen de las preguntas sobre el escenario.
    //-- Lo primero es saber cuántos escenarios hay. Para saberlo miramos la longitud del array.
    let number_places = quiz_info[0][1].length;
    let number_recordings = quiz_info[0][2].length / number_places;


    let questions_places= Object.keys(quiz_info[0][1][0]);
    let questions_recordings = Object.keys(quiz_info[0][2][0]);

    // Recogemos en un array las respuestas y su probabilidad de aparición. 
    let places_array = [[[],[]],[[],[],[],[],[]],[[],[]],[[],[]]];
    let places_array_porcentaje = [[[],[]],[[],[],[],[],[]],[[],[]],[[],[]]];

    let places_object = new Object();
    if (number_places == 1) {
        places_object.place1 = places_array;
    }
    if (number_places == 2) {
        places_object.place1 = places_array;
        places_object.place2 = places_array;
    }
    if (number_places == 3) {
        places_object.place1 = places_array;
        places_object.place2 = places_array;
        places_object.place3 = places_array;
    }

    let places_object_porcentaje = new Object();
    if (number_places == 1) {
        places_object_porcentaje.place1 = places_array_porcentaje;
    }
    if (number_places == 2) {
        places_object_porcentaje.place1 = places_array_porcentaje;
        places_object_porcentaje.place2 = places_array_porcentaje;
    }
    if (number_places == 3) {
        places_object_porcentaje.place1 = places_array_porcentaje;
        places_object_porcentaje.place2 = places_array_porcentaje;
        places_object_porcentaje.place3 = places_array_porcentaje;
    }
    for (let e = 0; e < Object.keys(places_object).length; e++) {
        for (let i = 0; i < quiz_info.length; i++) {
            if (quiz_info[i][1][e]["¿Conoces el escenario?"] == "yes") {
                if (places_object[e][0][0] == undefined) {
                    places_object[e][0][0] = 1;
                    places_object[e][0][1] = 0;
                }else{
                    places_object[e][0][0] += 1;
                    places_object[e][0][1] += 0;
                } 
            }else{
                if (places_object[e][0][1] == undefined) {
                    places_object[e][0][1] = 1;
                    places_object[e][0][0] = 0;
                }else{
                    places_object[e][0][1] += 1;
                    places_object[e][0][0] += 0;
                } 
            }
            
        }        
    }


    // Recorremos el listado de preguntas.
    for (let i = 0; i < number_places; i++) {
        global_results.innerHTML += "<h4>Preguntas sobre el Escenario: " + quiz_info[0][1][i]["Name_Scenary"]+"</h4>";
        for (let e = 1; e < questions_places.length; e++) {
            global_results.innerHTML += e + ". "+questions_places[e] + "<br>";
        }
        global_results.innerHTML += "<h5>Preguntas sobre el Sistema de Grabación:</h5>";
        for (let e = 0; e < questions_recordings.length; e++) {
            global_results.innerHTML += questions_recordings[e] + "<br>";            
        }
    }

    let questions_generic = Object.keys(quiz_info[0][3])
    global_results.innerHTML += "<h4>Preguntas Genéricas</h4>"
    for (let i = 0; i < questions_generic.length; i++) {
        global_results.innerHTML += "Pregunta Genérica Número"+(i+1) + ": " +questions_generic[i]+"<br>";        
    }
/* Extraemos de la información del Quiz los valores que necesitamos para dibujar.
    Lo primero es crear la constante que marque el número de participantes en el custionario.*/
    const number_people = quiz_info.length;
    number_places = quiz_info[0][1].length;
    /*Número de grabaciones por sistema */
    number_recordings = quiz_info[0][2].length/number_places;
    /* Después creamos un bucle el cuál busca en todas las preguntas útiles las respuestas para sumar.*/
    var annoying = [];
    var calm= [];
    var chaotic = [];
    var eventful = [];
    var monotonous = [];
    var pleasant = [];
    var uneventful = [];
    var vibrant = [];
    for (let i = 0; i < number_people; i++) {
        /* El segundo bucle for sirve para leer todas las respuestas que nos interesan.*/
        for (let e = 0; e < quiz_info[i][2].length; e++) {
            if (quiz_info[i][2][e]["¿Consideras ruidoso el audio del paisaje sonoro?"] == "yes") {
                if (annoying[e] != undefined) {
                    annoying[e] += 1;
                    pleasant[e] += 0;
                }else{
                    annoying[e] = 1;
                    pleasant[e] = 0;
                }
            }else if (quiz_info[i][2][e]["¿Consideras ruidoso el audio del paisaje sonoro?"] == "no") {
                if (pleasant[e] != undefined) {
                    annoying[e] += 0;
                    pleasant[e] += 1;
                }else{
                    annoying[e] = 0;
                    pleasant[e] = 1;
                }
            }
            
            if (quiz_info[i][2][e]["¿Qué sonidos podrías distinguir en la toma?"] == "urban") {
                if (eventful[e] != undefined) {
                    eventful[e] += 1;
                    uneventful[e] += 0;
                }else{
                    eventful[e] = 1;
                    uneventful[e] = 0;
                }
            }else if (quiz_info[i][2][e]["¿Qué sonidos podrías distinguir en la toma?"] == "nature") {
                if (uneventful[e] != undefined) {
                    eventful[e] += 0;
                    uneventful[e] += 1;
                }else{
                    eventful[e] = 0;
                    uneventful[e] = 1;
                }
            }

            if (quiz_info[i][2][e]["¿Consideras desagradable el audio del paisaje sonoro?"] == "yes") {

                if (chaotic[e] != undefined) {
                    chaotic[e] += 1;
                    calm[e] += 0;
                }else{
                    chaotic[e] = 1;
                    calm[e] = 0;

                }
            }else if (quiz_info[i][2][e]["¿Consideras desagradable el audio del paisaje sonoro?"] == "no") {
                calm[e] += 1;
                if (calm[e] != undefined) {
                    calm[e] += 1;
                    chaotic[e] = 0;
                }else{
                    calm[e] = 1;
                    chaotic[e] = 0;
                }
            }

            if (quiz_info[i][2][e]["¿Consideras definido el audio del paisaje sonoro?"] == "yes") {

                if (monotonous[e] != undefined) {
                    monotonous[e] += 1;
                    vibrant[e] += 0;
                }else{
                    monotonous[e] = 1;
                    vibrant[e] = 0;
                }
            }else if (quiz_info[i][2][e]["¿Consideras definido el audio del paisaje sonoro?"] == "no") {

                if (vibrant[e] != undefined) {
                    vibrant[e] += 1;
                    monotonous[e] += 0;
                }else{
                    vibrant[e] = 1;
                    monotonous[e] = 0;
                }
            }
        }
    }

    console.log("Annoying"+annoying);
    console.log("Eventful"+eventful);
    console.log("Chaotic"+chaotic);
    console.log("Monotonous"+monotonous);

    /*Dividimos el array principal en subarrays los cuáles corresponden con cada lugar.
    Para ello lo primero que hacemos es normalizar las variables. */
    annoying = functions_readfile.normalize(annoying,number_people);
    calm = functions_readfile.normalize(calm,number_people);
    chaotic = functions_readfile.normalize(chaotic,number_people);
    eventful = functions_readfile.normalize(annoying,number_people);
    monotonous = functions_readfile.normalize(annoying,number_people);
    pleasant = functions_readfile.normalize(annoying,number_people);
    uneventful = functions_readfile.normalize(annoying,number_people);
    vibrant = functions_readfile.normalize(annoying,number_people);

    const recordings_system = annoying.length/number_places;

    annoying_list = functions_readfile.split_lists(annoying,recordings_system,number_places);
    pleasant_list = functions_readfile.split_lists(pleasant,recordings_system,number_places);
    eventful_list = functions_readfile.split_lists(eventful,recordings_system,number_places);
    uneventful_list = functions_readfile.split_lists(uneventful,recordings_system,number_places);
    chaotic_list = functions_readfile.split_lists(chaotic,recordings_system,number_places);
    calm_list = functions_readfile.split_lists(calm,recordings_system,number_places);
    vibrant_list = functions_readfile.split_lists(vibrant,recordings_system,number_places);
    monotonous_list = functions_readfile.split_lists(monotonous,recordings_system,number_places);


    diagram_examples.innerHTML = "";
    console.log(number_places)
    if (number_places == 1) {
        diagram_examples.innerHTML += '<h3>'+quiz_info[0][1][0]["Name_Scenary"]+'</h3>';
        diagram_examples.innerHTML += '<canvas id="diagram1" width="400px" height="297px"></canvas><br>';
        diagram_examples.innerHTML += '<h5>';          
        for (let i = 0; i < recordings_system; i++) {
            diagram_examples.innerHTML += 'Toma ' + (i+1) + " de color ";
            if (i == 0) {
                diagram_examples.innerHTML += '<b id="blue">AZUL<b>.';
            }else if (i==1) {
                diagram_examples.innerHTML += '<b id="red">ROJO<b>'; 
            }else{
                diagram_examples.innerHTML += '<b id="green">VERDE<b>';
            }       
        }
        diagram_examples.innerHTML += '</h5>';
    }else if (number_places ==2) {
        diagram_examples.innerHTML += '<h3>'+quiz_info[0][1][0]["Name_Scenary"]+'</h3><br>';
        diagram_examples.innerHTML += '<canvas id="diagram1" width="400px" height="297px"></canvas><br>';
        diagram_examples.innerHTML += '<h5>';          
        for (let i = 0; i < recordings_system; i++) {
            diagram_examples.innerHTML += 'Toma ' + (i+1) + " de color ";
            if (i == 0) {
                diagram_examples.innerHTML += '<b id="blue">AZUL<b>.';
            }else if (i==1) {
                diagram_examples.innerHTML += '<b id="red">ROJO<b>'; 
            }else{
                diagram_examples.innerHTML += '<b id="green">VERDE<b>';
            }           
        }
        diagram_examples.innerHTML += '</h5>';

        diagram_examples.innerHTML += '<h3>'+quiz_info[0][1][1]["Name_Scenary"]+'</h3><br>';
        diagram_examples.innerHTML += '<canvas id="diagram2" width="400px" height="297px"></canvas><br>';
        diagram_examples.innerHTML += '<h5>';          
        for (let i = 0; i < recordings_system; i++) {
            diagram_examples.innerHTML += 'Toma ' + (i+1) + " de color ";
            if (i == 0) {
                diagram_examples.innerHTML += '<b id="blue">AZUL<b>.';
            }else if (i==1) {
                diagram_examples.innerHTML += '<b id="red">ROJO<b>'; 
            }else{
                diagram_examples.innerHTML += '<b id="green">VERDE<b>';
            }          
        }
        diagram_examples.innerHTML += '</h5>';
    }else if (number_places == 3) {
        diagram_examples.innerHTML += '<h3>'+quiz_info[0][1][0]["Name_Scenary"]+'</h3><br>';
        diagram_examples.innerHTML += '<canvas id="diagram1" width="400px" height="297px"></canvas><br>';
        diagram_examples.innerHTML += '<h5>';          
        for (let i = 0; i < recordings_system; i++) {
            diagram_examples.innerHTML += 'Toma ' + (i+1) + " de color ";
            if (i == 0) {
                diagram_examples.innerHTML += '<b id="blue">AZUL<b>.';
            }else if (i==1) {
                diagram_examples.innerHTML += '<b id="red">ROJO<b>'; 
            }else{
                diagram_examples.innerHTML += '<b id="green">VERDE<b>';
            }           
        }
        diagram_examples.innerHTML += '</h5>';

        diagram_examples.innerHTML += '<h3>'+quiz_info[0][1][1]["Name_Scenary"]+'</h3><br>';
        diagram_examples.innerHTML += '<canvas id="diagram2" width="400px" height="297px"></canvas><br>';
        diagram_examples.innerHTML += '<h5>';          
        for (let i = 0; i < recordings_system; i++) {
            diagram_examples.innerHTML += 'Toma ' + (i+1) + " de color ";
            if (i == 0) {
                diagram_examples.innerHTML += '<b id="blue">AZUL<b>.';
            }else if (i==1) {
                diagram_examples.innerHTML += '<b id="red">ROJO<b>'; 
            }else{
                diagram_examples.innerHTML += '<b id="green">VERDE<b>';
            }      
        }
        diagram_examples.innerHTML += '</h5>';

        diagram_examples.innerHTML += '<h3>'+quiz_info[0][1][2]["Name_Scenary"]+'</h3><br>';
        diagram_examples.innerHTML += '<canvas id="diagram3" width="400px" height="297px"></canvas><br>';
        diagram_examples.innerHTML += '<h5>';          
        for (let i = 0; i < recordings_system; i++) {
            diagram_examples.innerHTML += 'Toma ' + (i+1) + " de color ";
            if (i == 0) {
                diagram_examples.innerHTML += '<b id="blue">AZUL<b>.';
            }else if (i==1) {
                diagram_examples.innerHTML += '<b id="red">ROJO<b>'; 
            }else{
                diagram_examples.innerHTML += '<b id="green">VERDE<b>';
            }           
        }
        diagram_examples.innerHTML += '</h5>';
    }
    console.log(diagram_examples)
    draw();
});

var img = new Image(400,400);
img.src = "images/diagram.png";

function draw() {
    const canvas1 = document.getElementById('diagram1');
    const canvas2 = document.getElementById('diagram2');
    const canvas3 = document.getElementById('diagram3');

    if (canvas1.getContext) {
      const ctx = canvas1.getContext('2d');
      functions_canvas.canvas_create_position_and_draw(ctx,0);
    }
    if (canvas2.getContext) {
        const ctx = canvas2.getContext('2d');
        functions_canvas.canvas_create_position_and_draw(ctx,1);
    }
    if (canvas3.getContext) {
        const ctx = canvas3.getContext('2d');
        functions_canvas.canvas_create_position_and_draw(ctx,2);
    }
}