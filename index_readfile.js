const { table } = require('console');
const electron = require('electron');
const fs = require('fs');

var load_quizs_opened = [];

// Variables sobre el Quizs a mostar.
var name_quiz = "";
var quiz_info = [];

var info_table = document.getElementById("info_table");
var global_results = document.getElementById("global_quiz_results");

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
        let gender = "";
        if (quiz_info[i][0]["¿Cuál es tu género?"] == "man") {
            gender = "Masculino";
        }else if (quiz_info[i][0]["¿Cuál es tu género?"] == "woman") {
            gender = "Femenino";
        }else{
            gender = "Otro";
        }
        info_table.innerHTML += '<tr id="table_value">'+
        '<th id="number_quiz">'+(i+1)+'</th>'+
        '<th id="date_quiz">' + quiz_info[i][0]["Date"] + '</th>'+
        '<th id="age_quiz">'+quiz_info[i][0]["¿Cuántos años tienes?"]+'</th>'+
        '<th id="gener_quiz">'+gender+'</th>'+
        +'</tr>';
    }
    info_table.innerHTML = info_table.innerHTML.split("NaN").join('');
    // Cargamos ahora los resultados globales.
    //-- Mostaremos ahora la franja de edad.
    //-- Guardamos en un array cuanta gente hay con esa edad.
    // Los rangos son 7:
    // <18 años, de 18 a 25, de 26 a 35, de 36 a 45, de 46 a 55, de 56 a 65 y 65<.
    let age_array_results = [0,0,0,0,0,0,0];
    let age_array_porcentaje = [0,0,0,0,0,0,0];
    for (let i = 0; i < quiz_info.length; i++) {
        if (quiz_info[i][0]["¿Cuántos años tienes?"] < 18) {
            number = 0;
        }else if (quiz_info[i][0]["¿Cuántos años tienes?"] < 26) {
            number = 1;
        }else if (quiz_info[i][0]["¿Cuántos años tienes?"] < 36) {
            number = 2;
        }else if (quiz_info[i][0]["¿Cuántos años tienes?"] < 46) {
            number = 3;
        }else if (quiz_info[i][0]["¿Cuántos años tienes?"] < 56) {
            number = 4;
        }else if (quiz_info[i][0]["¿Cuántos años tienes?"] < 66) {
            number = 5;
        }else{
            number = 6;
        }
        age_array_results[number] += 1;     
    }
    //-- Calculamos los porcentajes.
    for (let i = 0; i < age_array_porcentaje.length; i++) {
        //-- Dividimos la edad de ese intervalo con el número de participantes.
        age_array_porcentaje[i]=(age_array_results[i]/quiz_info.length)*100 + "%";        
    }
    global_results.innerHTML = "<h3>Edades de los Participantes:</h3><br>"
    //-- Bucle que sirve para colocar en la APP la información de las edades.
    for (let i = 0; i < age_array_results.length; i++) {
        switch (i) {
            case 0:
                global_results.innerHTML += "<b> <18 Años: </b>";
                break;
            case 1:
                global_results.innerHTML += "<b> 18-25 Años: </b>";
            break;
            case 2:
                global_results.innerHTML += "<b> 26-35 Años: </b>";
            break;
            case 3:
                global_results.innerHTML += "<b> 36-46 Años: </b>";
            break;
            case 4:
                global_results.innerHTML += "<b> 46-55 Años: </b>";
            break;
            case 5:
                global_results.innerHTML += "<b> 55-65 Años: </b>";
            break;
            default:
                global_results.innerHTML += "<b> 65< Años: </b>";
                break;
        }
        global_results.innerHTML += age_array_results[i] + "--><b>"+age_array_porcentaje[i]+"</b><br>";
    }

    //-- Después de mostrar la edad se tiene que mostrar el género de los participantes.
    //-- En este caso la cantidad de géneros humanos está marcada en 3. 
    //-- Masculino, Femenino y Otro.
    let gender_array_results = [0,0,0];
    let gender_array_porcentaje = [0,0,0];
    for (let i = 0; i < quiz_info.length; i++) {
        if (quiz_info[i][0]["¿Cuál es tu género?"] == "man") {
            number = 0;
        }else if (quiz_info[i][0]["¿Cuál es tu género?"] == "woman") {
            number = 1;
        }else{
            number = 2;
        }
        gender_array_results[number] += 1;     
    }
    //-- Calculamos los porcentajes.
    for (let i = 0; i < gender_array_porcentaje.length; i++) {
        //-- Dividimos la edad de ese intervalo con el número de participantes.
        gender_array_porcentaje[i]=(gender_array_results[i]/quiz_info.length)*100 + "%";        
    }
    global_results.innerHTML += "<h3>Géneros de los Participantes:</h3><br>"
    //-- Bucle que sirve para colocar en la APP la información de las edades.
    for (let i = 0; i < gender_array_results.length; i++) {
        switch (i) {
            case 0:
                global_results.innerHTML += "<b> Masculino: </b>";
                break;
            case 1:
                global_results.innerHTML += "<b> Femenino: </b>";
            break;
            default:
                global_results.innerHTML += "<b> Otro: </b>";
                break;
        }
        global_results.innerHTML += gender_array_results[i] + "--><b>"+gender_array_porcentaje[i]+"</b><br>";
    }
    
});