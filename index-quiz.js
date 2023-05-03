const electron = require('electron');
const fs = require('fs');

const functions_quiz = require('./functions/functions_quiz');

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

var recordings_list = new Array;
var places_list = new Array;
var pos_places = 0;
var pos_recording = 0;

// Variables que guardan los PATH a los archivos.
// Cada Array interno guarda la info de cada lugar max. 3.
// Los archivos son locales o en remoto --> file_location_online
var name_scenary = [[],[],[]];
var name_actual_scenary = "";
var id_quiz = 0;
var file_location_online = false;
var audio_files = [[],[],[]];
var visual_files = [[],[],[]];
var questions_replies = [];
var questions_types_replies = [];

// Variables que guardan las preguntas que se van a usar.
var user_questions = new Object;
var places_questions = new Object;
var places_replies_tag = new Object;
var last_user_questions = new Object;
var type_of_question_active = "";

// Respuestas del cuestionario.
var user_object = new Object;
var all_places_replies = [];
var last_user_replies = [];

//-- Esta función se encarga de preparar todo para obtener un cuestionario que está online.
function seek_online_quiz() {
    document.getElementById("wrapper2").style.display = "none";
    //document.getElementById("wrapper_files").innerHTML = "";
    document.getElementById("wrapper_summary").style.display = "block";
    document.getElementById("table_summary").style.display = "none";
    document.getElementById("wrapper_text").style.display = "none";
}

//-- Esta función se encarga de verificar que el enlace es un cuestionario.
function verify_quiz_online() {
     let url = document.getElementById("verify_quiz_online").value;
     fetch(url)
        .then(response => response.json())
        .then(data => saveData(data))
        .catch(error => show_error(error));

}

function saveData(data) {
    console.log("Dentro")
    var quiz_json = data;
    //-- Enviamos el JSON al main para que lo descargue, lo guarde y después lo ejecute.
    electron.ipcRenderer.invoke('online_quiz_save',quiz_json);
}

function show_error(error) {
    console.log(error);
    //-- Modificamos los valores del resumen.
    document.getElementById("table_summary").style.display = "block";
    document.getElementById("online_status").innerHTML = "Cuestionario No Válido";
    document.getElementById("online_quiz_name").innerHTML = "";
    document.getElementById("online_number_places").innerHTML = "";
    document.getElementById("online_number_recording").innerHTML = "";
    document.getElementById("online_button_start").style.display = "none";

}

electron.ipcRenderer.on('online_quiz_save', (event, message) => {
    console.log(message);
    //-- Añadimos el nuevo nombre, ya viene con el JSON
    quizs_names.push(message);
    //-- Modificaremos ahora los valores de la tabla resumen.
    //-- Para ello primero habrá que obtener los valores del JSON.
    // Leer el fichero JSON donde esté la información para el cuestionario.
    const  FILE_JSON = fs.readFileSync("resources/quiz_files/"+message);
    // Creamos el array con toda la información del cuestionario.
    let quiz_info = JSON.parse(FILE_JSON);
    document.getElementById("online_status").innerHTML = "Correcto";
    document.getElementById("online_quiz_name").innerHTML = quiz_info["Name_Quiz"];
    document.getElementById("online_number_places").innerHTML = quiz_info["Number_Places"] + " Lugares";
    document.getElementById("online_number_recording").innerHTML = quiz_info["Number_Recordings"] + " Grabaciones";
    //-- Hacemos visibles al usuario todos los datos.
    document.getElementById("table_summary").style.display = "block";
    document.getElementById("online_button_start").style.display = "block";

    
});

function get_quiz_online() {
    //-- La función que crea el cuestionario necesita la posición en el quizs_names.
    document.getElementById("wrapper2").style.display = "flex";
    document.getElementById("wrapper0").style.display = "none";
    let name = document.getElementById("online_quiz_name").innerHTML + ".json";
    let position = quizs_names.indexOf(name);
    console.log("position es: ",position)
    Select_Quiz(position);
}

function seek_quizs() {
    // Pedimos al proceso Main que nos mande los quizs ya creados.
    console.log("Pedimos al main.js los nombre de los quizs")
    document.getElementById("wrapper_files").innerHTML = "";
    document.getElementById("wrapper_summary").style.display = "none";
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
    // Mostramos el contenedor que tendrá la información para el usuario.
    document.getElementById("wrapper2").style.display = "flex";
    // Pedimos al proceso Main que nos mande el Quiz Actual.
    electron.ipcRenderer.invoke('actual_quizs', "Quiz actual");
    document.getElementById("wrapper_summary").style.display = "none";
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
            //-- Instrucciones y Preguntas al participante
            var table_user_questions = '<table><caption><div id="wrapper_title_question"><h2>Cuestionario: '+quiz_name_actual_file.split('.')[0]+'</h2></div></caption>'+
            '<tr><th><h3>Instrucciones para el Usuario</h3></th></tr>'+
            '<tr><td><div id="wrapper_instructions" style="width:fit-content;"></div><div id="wrapper_replys" style="margin-left: 5px;"></div></td>'+
            '</tr>'+
            '<tr><th><div id="wrapper_next"></div></th></tr></table>';               
            document.getElementById("wrapper2").innerHTML = table_user_questions;
            //-- Introducimos las instrucciones para el cuestionario.
            instructions_info = functions_quiz.add_instructions();
            //-- Introducimos las preguntas para el usuario.
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
            //-- Cambiamos el nombre del escenario actual.
            name_actual_scenary = name_scenary[number_places_questions_replied]
            //-- Creamos la tabla
            var table_recordings_questions = '<table><caption><div id="wrapper_title_question"><h2>Cuestionario: '+quiz_name_actual_file.split('.')[0]+'</h2></div></caption>'+
            '<tr><th style="padding-right: 5px;"></th><th style=""><h3>Preguntas sobre el Escenario</h3></th></tr>'+
            '<tr><td rowspan="2" style="border-right: 2px white solid"><div id="wrapper_files" style="margin-right:10px;"></div></td><td><div id="wrapper_replys" style="margin-left: 5px;border-right: 2px #ffff solid"></div></td></tr>'+
            '<tr><th><div id="wrapper_next"></div></th></tr></table>';
            document.getElementById("wrapper2").innerHTML = table_recordings_questions;
            //-- Contenido visual
            
            aux_visual = visual_files[number_places_questions_replied][number_recordings_questions_replied].split(".");
            aux_visual_length = aux_visual.length;
            console.log(aux_visual[aux_visual_length-1])/* Formato del contenido visual */
            format_visual = aux_visual[aux_visual_length-1]; // El formato del vídeo o de la imagen.
            // Dependiendo del formato se eligirá una foto o un video.
            if (format_visual == 'jpg' || format_visual == 'jiff' || format_visual == 'png' || format_visual == 'jfif') {
                document.getElementById("wrapper_files").innerHTML += '<img id="file_image" src="'+visual_files[number_places_questions_replied][number_recordings_questions_replied]+'" alt=""></img><br>';
            }else if (format_visual == 'mp4' || format_visual == 'ogg' || format_visual == 'webm') {

                document.getElementById("wrapper_files").innerHTML += '<video id="file_video" src="'+visual_files[number_places_questions_replied][number_recordings_questions_replied]+'" autoplay muted loop></video><br>';

            }else{
                console.log(visual_files[number_places_questions_replied][number_recordings_questions_replied])
                document.getElementById('wrapper_files').innerHTML += '<iframe style="width:500px;height:300px"id="file_video" src="'+visual_files[number_places_questions_replied][number_recordings_questions_replied]+'?controls=0?showinfo=0?modestbranding=1?loop=1?rel=0&amp;autoplay=1"'+
                ' allow="accelerometer; autoplay;loop;showinfo;modestbranding; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>';
            }
            
            // Añadimos la etiqueta de audio si los recursos están en en local, en caso contrario se deja solo el vídeo.
            if (!file_location_online) {
                document.getElementById("wrapper_files").innerHTML += '<audio controls loop><source src="' +
                audio_files[number_places_questions_replied][number_recordings_questions_replied] + '"></audio>';
            }

            replys = document.getElementById("wrapper_replys");
            replys.innerHTML = "";
            for (let i = 0; i < Object.keys(places_questions).length; i++) {
                let pos = i + 1;
                replys.innerHTML += functions_quiz.add_places_questions(pos);    
            }
            document.getElementById("wrapper_next").innerHTML = '<button id="button_next" onclick="functions_quiz.next_option(1)">Siguiente</button>';

            console.info("Si los siguientes números son iguales excepción ",pos_recording,number_recordings-1)
            switch (pos_recording) {
                case (number_recordings-1):
                    console.info("Si los siguientes números son iguales --> SE ACABA",pos_places,number_places-1)
                    if ((number_places-1) == pos_places ) {
                        type_of_question_active = "last_user_questions";
                        document.getElementById("wrapper_next").innerHTML = '<button id="button_next" onclick="functions_quiz.last_question_user()">Siguiente</button>';
                        console.log("Se acaba")
                    }
                break;
            }    
            break;

        case "last_user_questions":
            //-- Instrucciones y Preguntas al participante
            var table_last_user_questions = '<table><caption><div id="wrapper_title_question"><h2>Cuestionario: '+quiz_name_actual_file.split('.')[0]+'</h2></div></caption>'+
            '<tr><th><h3>Preguntas Finales para el Usuario</h3></th></tr>'+
            '<tr><td><div id="wrapper_replys" style="margin-left: 5px;"></div></td>'+
            '</tr>'+
            '<tr><th><div id="wrapper_next"></div></th></tr></table>';               
            document.getElementById("wrapper2").innerHTML = table_last_user_questions;
            //-- Introducimos las preguntas para el usuario.
            replys = document.getElementById("wrapper_replys")
            replys.innerHTML = "";
            console.table(last_user_questions)
            for (let i = 0; i < Object.keys(last_user_questions).length; i++) {
                let pos = i + 1;
                replys.innerHTML += functions_quiz.add_last_question_user(pos);    
            }
            replys.innerHTML += "<br>"
            document.getElementById("wrapper_next").innerHTML = '<button id="button_next" onclick="functions_quiz.end_quiz()">Finalizar</button>';
            break;
        default:
            break;
    }
}

function Select_Quiz(position) {
    //-- Eliminamos la información dada si se ha iniciado a través de la opción Cuestionario Online,
    //-- En caso de venir otra opción no pasa nada.
    document.getElementById("wrapper0").style.display = "none";
    document.getElementById("wrapper_summary").style.display = "none";
    //  Obtenemos el nombre del fichero del que vamos a realiza el Cuestioanrio.
    quiz_name_actual_file = quizs_names[position];
    console.table(quizs_names);
    console.log("El nombre del quiz actual seleccionado:" + quiz_name_actual_file)
    // Eliminar las opciones que han aparecido.
    document.getElementById("wrapper_text").innerHTML = "";

    // Leer el fichero JSON donde esté la información para el cuestionario.
    const  FILE_JSON = fs.readFileSync("resources/quiz_files/"+quiz_name_actual_file);
    // Creamos el array con toda la información del cuestionario.
    var quiz_json = JSON.parse(FILE_JSON);

    // Extraemos primero la información genérica.
    // Sacamos el nombre del Cuestionario
    quiz_name_actual = quiz_json["Name_Quiz"];
    console.log("El nombre del quiz actual es: "+quiz_name_actual_file)
    // Cambiamos en el archivo principal el nuevo nombre del cuestionario.
    electron.ipcRenderer.invoke('refresh_quiz_actual_name', quiz_name_actual_file);
    // Número de lugares a evaluar
    number_places = quiz_json["Number_Places"];
    // Número de grabaciones a evaluar.
    number_recordings = quiz_json["Number_Recordings"];
    // Ruta online o local
    file_location_online = quiz_json["File_Location_Online"];
    // Extraemos el Identificador del fichero.
    id_quiz = quiz_json["ID_Quiz"];

    //  Conociendo la información genérica extraemos
    // las rutas de los ficheros y el nombre del escenario.

    for (let i = 0; i < number_places; i++) {
        name_scenary[i] = quiz_json["files"][i]["Name_Scenary"];
        audio_files[i] = quiz_json["files"][i]["audio_files"];
        visual_files[i] = quiz_json["files"][i]["visual_files"];       
    }

    // Ahora toca obtener las preguntas.
    //-- Preguntas al usuario
    user_questions = quiz_json["questions"][0];
    //-- Preguntas sobre el escenario para mostrar.
    places_questions = quiz_json["questions"][1];
    //-- Preguntas que aparecen al acabar.
    last_user_questions = quiz_json["questions"][2];
    console.table(last_user_questions)
    //-- Respuestas de las preguntas del escenario.
    places_replies_tag = quiz_json["questions_replies"][1]
    //-- Tipos de Preguntas 
    questions_types_replies = quiz_json["questions_types_replies"];
    // Respuestas de las preguntas
    questions_replies = quiz_json["questions_replies"];
    // Pregunta Activa, iniciamos las preguntas. 
    type_of_question_active = "user_questions";
    show_questions();
}

function root_mode_activated() {
    const MAIN_JSON = "resources/plantillas/main.json";
    const  MAIN_JSON_FILE = fs.readFileSync(MAIN_JSON);
    var main_info = JSON.parse(MAIN_JSON_FILE);
    if (main_info["root_mode"]) {
        document.getElementById("wrapper_create").style.display = "none";
        document.getElementById("wrapper_show").style.display = "none";
    }else{
        document.getElementById("wrapper_create").style.display = "block";
        document.getElementById("wrapper_show").style.display = "block";
    }
    console.log("Root")   
    let myJSON = JSON.stringify(main_info);
    fs.writeFileSync(MAIN_JSON,myJSON);
}