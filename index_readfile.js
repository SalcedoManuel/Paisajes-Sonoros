
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

function load_results() {
    electron.ipcRenderer.invoke('load_quizs_opened', load_quizs_opened);
}
electron.ipcRenderer.on('load_quizs_opened', (event, message) => {
    console.log("Recibido la lista de quizs creados: " + message);
    load_quizs_opened = message;
    //Abremos recibido un array de Cuestionarios Creados.
    for (let i = 0; i < message.length; i++) {
        let name_quiz = message[i].split(".")[0]
        document.getElementById("results").innerHTML += '<button id="button_select_quiz" onclick="'+'name_selected('+i+')"><b>'+name_quiz+'<b></button>';        
    }
});

function name_selected(file_number) {
    // Dependiendo del número se selecciona una opción u otra.
    console.log("El Quiz seleccionado es: " + load_quizs_opened[file_number]);
    // Almacenamos el nombre del cuestionario que vamos a mostrar.
    name_quiz =load_quizs_opened[file_number];
    // Pedimos al main.js que nos pase en un array toda la información sobre los Cuestionarios hechos con ese nombre.
    electron.ipcRenderer.invoke('quizs_summary', load_quizs_opened[file_number]);
}

//--- Esta función estará esperando a recibir el resumen del custionario pedido para su posterior análisis.
electron.ipcRenderer.on('quizs_summary', (event, message) => {
    console.log("Recibido los resultados: " + message);
    /* Se añade el nombre del Cuestionario a la página para que el Usuario de que cuestioanrio está 
        viendo los resultados. */
    document.getElementById("option_name_quiz").innerHTML = name_quiz.split(".")[0];
    //-- Pasamos a una variable global toda la información sobre los cuestionarios realizados.
    quiz_info = message;
    console.log("Número de cuestionarios hechos: " + quiz_info.length);
    console.log("Fecha: " + quiz_info[0][0]["Date"])
    // Creamos la tabla para que se introduzcan los elementos más relevantes en ella.

    // La tabla estará ordenada de la forma 'First-In First-Out', el primer cuestionario en rellenarse será
    // el primero en aperecer en la lista.
    info_table.innerHTML = functions_tableinfo.create_table_info_init_string();
    // Añadimos los valores de cada partipante a la tabla.
    functions_tableinfo.add_data_table_info();

    // COMENZAMOS CON EL DESARROLLO Y MUESTRA DE LOS VALORES GLOBALES

    // Cargamos ahora los resultados globales.
    // Comenzamos con la información de los custionarios.
    functions_tableinfo.WHO_score_global_results();

    // AÑADIMOS LA INFORMACIÓN SOBRE LOS LUGARES.
    functions_tableinfo.places_global_results();

    // AÑADIMOS LA INFORMACIÓN SOBRE LAS GRABACIONES.
    //functions_tableinfo.recordings_global_results();
    // DIBUJAMOS LA INFORMACIÓN SOBRE LAS GRABACIONES.
    //draw();

    //AÑADIMOS LA INFORMARCIÓN SOBRE LAS CUESTIONES GENERALES.
    //functions_tableinfo.generic_global_results();
});
/*
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
}*/