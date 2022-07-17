const electron = require('electron');
const fs = require('fs');

const functions_quiz = require('./functions_quiz');

var quizs_names = [];
var quiz_name_actual_file = "";
var quiz_name_actual = "";

// Variables necesarias para las preguntas.
var number_places = 0;
var number_recordings = 0;

// Variables que guardan los PATH a los archivos.
// Cada Array interno guarda la info de cada lugar max. 3.
var name_scenary = [[],[],[]];
var audio_files = [[],[],[]];
var visual_files = [[],[],[]];

// Variables que guardan las preguntas que se van a usar.
var user_questions = new Object;
var places_questions = new Object;
var recordings_questions = new Object;
var generic_questions = new Object;
var type_of_question_active = "";

var generic_value = ["A","A","A","A","A"]

var number_type_question = 0;

function seek_quizs() {
    // Pedimos al proceso Main que nos mande los quizs ya creados.
    electron.ipcRenderer.invoke('quizs', "Quizs names");
}

electron.ipcRenderer.on('quizs', (event, message) => {
    console.log("Recibido: " + message);
    quizs_names = message;
    // Obtenemos el número de Cuestionarios ya creados.
    const number_quizs_created = quizs_names.length;

    // Mostramos en el contenedor los nombres de los Cuestionarios creados.
    text = document.getElementById("wrapper_text");
    text.innerHTML = "";
    for (let i = 0; i < number_quizs_created; i++) {
        let name_quiz = quizs_names[i].split(".json")[0]
        text.innerHTML += '<button onclick="Select_Quiz(' + i + ')">'+name_quiz+'</button>'
    }
    
});

function start_quiz() {
    // Pedimos al proceso Main que nos mande los quizs ya creados.
    electron.ipcRenderer.invoke('actual_quizs', "Quiz actual");
}

electron.ipcRenderer.on('actual_quizs', (event, message) => {
    console.log("Recibido: " + message);
    quiz_name_actual_file = message;
});

function show_questions() {
    let replys = document.getElementById("wrapper_replys");
    switch (type_of_question_active) {
        case "user_questions":
            //-- Preguntas al participante
            //-- Cambiar Título.
            document.getElementById("wrapper_title_question").innerHTML = "<h2>"+quiz_name_actual+"</h2>";
            document.getElementById("wrapper_files").innerHTML = "";

            replys.innerHTML = "";
            console.log(Object.keys(user_questions).length)
            for (let i = 0; i < Object.keys(user_questions).length; i++) {
                let pos = i + 1;
                replys.innerHTML += functions_quiz.add_user_questions(pos);    
            }
            document.getElementById("wrapper_next").innerHTML = '<button onclick="functions_quiz.next_option(0)">Siguiente</button>';            
            break;
        case "places_questions":
            //-- Preguntas al participante
            //-- Cambiar Título.
            document.getElementById("wrapper_title_question").innerHTML = "<h2>"+quiz_name_actual+"</h2>";
            document.getElementById("wrapper_files").innerHTML = "";
            replys.innerHTML = "";
            console.log(Object.keys(places_questions).length)
            for (let i = 0; i < Object.keys(places_questions).length; i++) {
                let pos = i + 1;
                replys.innerHTML += functions_quiz.add_places_questions(pos);    
            }
            document.getElementById("wrapper_next").innerHTML = '<button onclick="functions_quiz.next_option(1)">Siguiente</button>';
            break;
        case "recordings_questions":
            document.getElementById("wrapper_title_question").innerHTML = "<h2>"+quiz_name_actual+"</h2>";
            document.getElementById("wrapper_files").innerHTML = "";
            replys.innerHTML = "";
            console.log(Object.keys(recordings_questions).length)
            for (let i = 0; i < Object.keys(recordings_questions).length; i++) {
                let pos = i + 1;
                replys.innerHTML += functions_quiz.add_recordings_questions(pos);    
            }
            document.getElementById("wrapper_next").innerHTML = '<button onclick="functions_quiz.next_option(2)">Siguiente</button>';
            break;
        case "generic_questions":
            document.getElementById("wrapper_title_question").innerHTML = "<h2>"+quiz_name_actual+"</h2>";
            document.getElementById("wrapper_files").innerHTML = "";
            replys.innerHTML = "";
            console.log(Object.keys(generic_questions).length)
            e = places_questions * recordings_questions;
            for (let i = 0; i < Object.keys(generic_questions).length; i++) {
                let pos = i + 1;
                replys.innerHTML += functions_quiz.add_generic_questions(pos,e);    
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
    console.log(quiz_name_actual_file)
    // Eliminar las opciones que han aparecido.
    document.getElementById("wrapper_text").innerHTML = "";

    // Leer el fichero JSON donde esté la información para el cuestionario.
    const  FILE_JSON = fs.readFileSync("quiz_files/"+quiz_name_actual_file);
    // Creamos el array con toda la información del cuestionario.
    var quiz_json = JSON.parse(FILE_JSON);

    // Extraemos primero la información genérica.
    quiz_name_actual = quiz_json["Name_Quiz"];
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
