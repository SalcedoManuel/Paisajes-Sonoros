const { table } = require('console');
const electron = require('electron');
const fs = require('fs');

var load_quizs_opened = [];

// Variables sobre el Quizs a mostar.
var name_quiz = "";
var quiz_info = [];

user_result = document.getElementById("user_results");
info_table = document.getElementById("info_table");

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
    document.getElementById("option_name_quiz").innerHTML = name_quiz.split(".")[0];
    quiz_info = message;
    console.log("Número de cuestionarios hechos: " + quiz_info.length);
    console.log("Info " + quiz_info[0][0]["Date"])
    info_table.innerHTML = '<tr valign="top" class="top_cell">'+
    '<th scope="row" id="number_quiz">Número</th>'+
    '<th id="date_quiz">Fecha de realización</th>'+
    '<th id="age_quiz">Edad</th>'+
    '<th id="gener_quiz">Género</th>'+
    '</tr>';
    for (let i = 0; i < quiz_info.length; i++) {
        info_table.innerHTML += '<tr id="table_value">'+
        '<th id="number_quiz">'+(i+1)+'</th>'+
        '<th id="date_quiz">' + quiz_info[i][0]["Date"] + '</th>'+
        '<th id="age_quiz">'+quiz_info[i][0]["¿Cuántos años tienes?"]+'</th>'+
        '<th id="gener_quiz">'+quiz_info[i][0]["¿Cuál es tu género?"]+'</th>'+
        +'</tr>';
        
    }
    info_table.innerHTML = info_table.innerHTML.split("NaN").join('');
    console.log(info_table.innerHTML)
    
});