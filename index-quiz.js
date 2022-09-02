const electron = require('electron');
const fs = require('fs');

const functions_quiz = require('./functions/functions_quiz');
const nav_extras = require('./functions/nav_extras');

// Modo root activado:
var root_mode = false;

var quizs_names = [];
var quiz_name_actual_file = "";
var quiz_name_actual = "";

// Variables necesarias para las preguntas.
var number_places = 0;
var number_places_questions_replied = 0;
var number_recordings = 0;
var number_recordings_questions_replied = 1;

// Variables que guardan los PATH a los archivos.
// Cada Array interno guarda la info de cada lugar max. 3.
var name_scenary = [[],[],[]];
var name_actual_scenary = "";
var audio_files = [[],[],[]];
var visual_files = [[],[],[]];

// Variables que guardan las preguntas que se van a usar.
var user_questions = new Object;
var places_questions = new Object;
var recordings_questions = new Object;
var generic_questions = new Object;
var type_of_question_active = "";

// Respuestas del cuestionario.
var edad = 0;
var genero = "";
var user_object = new Object;
var all_places_replies = [];
var all_recordings_replies = [];
var generic_object = new Object;

function seek_quizs() {
    // Pedimos al proceso Main que nos mande los quizs ya creados.
    console.log("Pedimos al main.js los nombre de los quizs")
    document.getElementById("wrapper_files").innerHTML = "";
    electron.ipcRenderer.invoke('quizs', "Quizs names");
}

electron.ipcRenderer.on('quizs', (event, message) => {
    console.log("Recibidos los nombres: " + message);
    quizs_names = message;
    // Obtenemos el número de Cuestionarios ya creados.
    const number_quizs_created = quizs_names.length;

    // Mostramos en el contenedor los nombres de los Cuestionarios creados.
    text = document.getElementById("wrapper_text");
    text.innerHTML = "";
    for (let i = 0; i < number_quizs_created; i++) {
        let name_quiz = quizs_names[i].split(".json")[0]
        text.innerHTML += '<button id="btn_special" onclick="Select_Quiz(' + i + ')"><h2>'+name_quiz+'</h2></button>'
    }
    
});

function start_quiz() {
    // Pedimos al proceso Main que nos mande el Quiz Actual.
    electron.ipcRenderer.invoke('actual_quizs', "Quiz actual");
}

electron.ipcRenderer.on('actual_quizs', (event, message) => {
    console.log("Recibido: " + message);
    quiz_name_actual_file = message;
    quiz_name_actual = quiz_name_actual_file.split(".json")[0];
    // Obtenemos el nombre de los archivos.
    const MAIN_JSON = "resources/plantillas/main.json";
    const  MAIN_JSON_FILE = fs.readFileSync(MAIN_JSON);
    var main_info = JSON.parse(MAIN_JSON_FILE);
    quizs_names = main_info["Quizs_Names"]
    position = quizs_names.indexOf(quiz_name_actual_file);
    // Ocultamos los botones de "Iniciar Recogida de Datos" y "Buscar Cuestionarios Creados".
    document.getElementById("wrapper0").style.display = 'none';
    if (position != -1) {
        Select_Quiz(position)
    }else{
        document.getElementById("wrapper_text").innerHTML = '<h3 style="text-align:center;">No se ha hecho antes un Cuestionario de los de la lista.</h3>';
    }    
});

function show_questions() {
    let replys = document.getElementById("wrapper_replys");
    switch (type_of_question_active) {
        case "user_questions":
            //-- Preguntas al participante
            var table_user_questions = '<table><caption><div id="wrapper_title_question"><h2>Cuestionario: '+quiz_name_actual_file.split('.')[0]+'</h2></div></caption>'+
            '<tr><th><h3>Resumen General:</h3></th><th><h3>Preguntas Generales al Participante</h3></th></tr>'+
            '<tr><td rowspan="2" style="border-right: 2px white solid"><div id="wrapper_files" style="margin-right:10px;"></div></td><td><div id="wrapper_replys" style="margin-left: 5px;"></div></td></tr>'+
            '<tr><th><div id="wrapper_next"></div></th></tr></table>';               
            document.getElementById("wrapper2").innerHTML = table_user_questions;
            //-- Cambiar Título.
            let info = document.getElementById("wrapper_files");
            for (let i = 0; i < number_places; i++) {
                info.innerHTML += "Nombre del Escenario: " + name_scenary[i] + "<br>"
                for (let e = 0; e < number_recordings; e++) {
                   info.innerHTML += "Número de tomas: " +  (e+1) + "<br>";                    
                }
                info.innerHTML += "<br>"
            }
            replys = document.getElementById("wrapper_replys")
            replys.innerHTML = "";
            for (let i = 0; i < Object.keys(user_questions).length; i++) {
                let pos = i + 1;
                replys.innerHTML += functions_quiz.add_user_questions(pos);    
            }
            replys.innerHTML += "<br>"
            document.getElementById("wrapper_next").innerHTML = '<button id="button_next" onclick="functions_quiz.next_option(0)">Siguiente</button>';            
            break;
        case "places_questions":
            var table_places_questions = '<table><caption><div id="wrapper_title_question"><h2>Cuestionario: '+quiz_name_actual_file.split('.')[0]+'</h2></div></caption>'+
            '<tr><th style="padding-right: 5px;"><h3>Nombre Escenario:</h3></th><th><h3>Preguntas sobre el Escenario</h3></th></tr>'+
            '<tr><td rowspan="2" style="border-right: 2px white solid"><div id="wrapper_files" style="margin-right:10px;"></div></td><td><div id="wrapper_replys" style="margin-left: 5px;"></div></td></tr>'+
            '<tr><th><div id="wrapper_next"></div></th></tr></table>';
            document.getElementById("wrapper2").innerHTML = table_places_questions;
            console.log(document.getElementById("wrapper2").innerHTML)
            //-- Preguntas al participante
            //-- Se modifica el Nombre del Escenario.
            document.getElementById("wrapper_files").innerHTML = '<h2>'+name_scenary[number_places_questions_replied]+'</h2>';
            // Se vacian los replys.
            replys = document.getElementById("wrapper_replys");
            replys.innerHTML = "";
            console.log(Object.keys(places_questions).length)
            name_actual_scenary = name_scenary[number_places_questions_replied];
            for (let i = 0; i < Object.keys(places_questions).length; i++) {
                let pos = i + 1;
                replys.innerHTML += functions_quiz.add_places_questions(pos);    
            }
            document.getElementById("wrapper_next").innerHTML = '<button onclick="functions_quiz.next_option(1)">Siguiente</button>';
            console.log(document.getElementById("wrapper2").innerHTML)
            break;
        case "recordings_questions":
            var table_recordings_questions = '<table><caption><div id="wrapper_title_question"><h2>Cuestionario: '+quiz_name_actual_file.split('.')[0]+'</h2></div></caption>'+
            '<tr><th style="padding-right: 5px;"><h3>Nombre Escenario:</h3></th><th><h3>Preguntas sobre el Escenario</h3></th></tr>'+
            '<tr><td rowspan="2" style="border-right: 2px white solid"><div id="wrapper_files" style="margin-right:10px;"></div></td><td><div id="wrapper_replys" style="margin-left: 5px;"></div></td></tr>'+
            '<tr><th><div id="wrapper_next"></div></th></tr></table>';
            document.getElementById("wrapper2").innerHTML = table_recordings_questions;
            
            aux_visual = visual_files[number_places_questions_replied][number_recordings_questions_replied-1].split(".");
            aux_visual_length = aux_visual.length;
            console.log(aux_visual[aux_visual_length-1])
            format_visual = aux_visual[aux_visual_length-1];
            if (format_visual == 'jpg' || format_visual == 'jiff' || format_visual == 'png' || format_visual == 'jfif') {
                document.getElementById("wrapper_files").innerHTML += '<img id="file_image" src="'+visual_files[number_places_questions_replied][number_recordings_questions_replied-1]+'" alt=""></img><br>';
            }else if (format_visual == 'mp4' || format_visual == 'ogg' || format_visual == 'webm') {
                document.getElementById("wrapper_files").innerHTML += '<video id="file_video" src="'+visual_files[number_places_questions_replied][number_recordings_questions_replied-1]+'" autoplay muted></video><br>';
            }
            

            document.getElementById("wrapper_files").innerHTML += '<audio controls><source src="' +
            audio_files[number_places_questions_replied][number_recordings_questions_replied-1] + '"></audio>';
            replys = document.getElementById("wrapper_replys");
            replys.innerHTML = "";
            console.log(Object.keys(recordings_questions).length)
            replys.innerHTML +=name_scenary[number_places_questions_replied]+ " Toma número: " + number_recordings_questions_replied + "<br>";
            for (let i = 0; i < Object.keys(recordings_questions).length; i++) {
                let pos = i + 1;
                replys.innerHTML += functions_quiz.add_recordings_questions(pos);    
            }
            document.getElementById("wrapper_next").innerHTML = '<button onclick="functions_quiz.next_option(2)">Siguiente</button>';
            break;
        case "generic_questions":
            var table_generic_questions = '<table><caption><div id="wrapper_title_question"><h2>Preguntas Genéricas del Cuestionario: '+quiz_name_actual+'</h2></div></caption>'+
            '<tr><td><div id="wrapper_files"></div></td></tr>'+
            '<tr><td><div id="wrapper_replys"></div></td></tr>'+
            '<tr><th><div id="wrapper_next"></div></th></tr></table>';
            document.getElementById("wrapper2").innerHTML = table_generic_questions;
            
            document.getElementById("wrapper_title_question").innerHTML = "<h2>Preguntas Genéricas del Cuestionario: &nbsp"+quiz_name_actual+"</h2>";
                replys = document.getElementById("wrapper_replys");
                console.log("Número de Preguntas Genéricas",Object.keys(generic_questions).length)
                e = places_questions * recordings_questions;
                for (let i = 0; i < Object.keys(generic_questions).length; i++) {
                    let pos = i + 1;
                    replys.innerHTML += functions_quiz.add_generic_questions(pos,i);    
                }
                document.getElementById("wrapper_next").innerHTML = '<button onclick="functions_quiz.end_quiz()">Finalizar</button>';
            break;
        default:
            break;
    }
}

function Select_Quiz(position) {
    //  Obtenemos el nombre del fichero del que vamos a realiza el Cuestioanrio.
    quiz_name_actual_file = quizs_names[position];
    console.log("El nombre del quiz actual seleccionado:" + quiz_name_actual_file)
    // Eliminar las opciones que han aparecido.
    document.getElementById("wrapper_text").innerHTML = "";

    // Leer el fichero JSON donde esté la información para el cuestionario.
    const  FILE_JSON = fs.readFileSync("resources/quiz_files/"+quiz_name_actual_file+".json");
    // Creamos el array con toda la información del cuestionario.
    var quiz_json = JSON.parse(FILE_JSON);

    // Extraemos primero la información genérica.
    quiz_name_actual = quiz_json["Name_Quiz"];
    console.log("El nombre del quiz actual es: "+quiz_name_actual_file)
    electron.ipcRenderer.invoke('refresh_quiz_actual_name', quiz_name_actual_file);
    number_places = quiz_json["Number_Places"];
    number_recordings = quiz_json["Number_Recordings"];

    //  Conociendo la información genérica extraemos
    // las rutas de los ficheros y el nombre del escenario.

    for (let i = 0; i < number_places; i++) {
        name_scenary[i] = quiz_json["files"][i]["Name_Scenary"];
        audio_files[i] = quiz_json["files"][i]["audio_files"];
        visual_files[i] = quiz_json["files"][i]["visual_files"];       
    }

    // Ahora toca obtener las preguntas.
    user_questions = quiz_json["questions"][0];
    places_questions = quiz_json["questions"][1];
    recordings_questions = quiz_json["questions"][2];
    generic_questions = quiz_json["questions"][3];

    type_of_question_active = "user_questions";
    show_questions();
}

function root_activated_mode() {
    //Preguntamos al main si el modo root está activado. Si es así, desactivar el menú de arriba.
    electron.ipcRenderer.invoke('root_activated_mode', root_mode);
}
electron.ipcRenderer.on('root_activated_mode', (event, message) => {
    console.log("Recibido: " + message);
    // Si lo recibido es un true, el modo root está activado y por tanto no se puede mostrar el menú del centro.
    if (message) {
        document.getElementById("nav_center").style.display = "none";
        document.getElementById("home_reference").style.display = "block";
    }else{
        document.getElementById("nav_center").style.display = "block";
        document.getElementById("home_reference").style.display = "none";
    }
    root_mode = message;
});

