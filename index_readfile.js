const { table } = require('console');
const electron = require('electron');
const fs = require('fs');

var load_quizs_opened = [];

// Variables sobre el Quizs a mostar.
var name_quiz = "";
var quiz_info = [];

var info_table = document.getElementById("info_table");
var global_results = document.getElementById("global_quiz_results");
var diagram_examples = document.getElementById("diagram_examples");


var annoying = [];
var calm= [];
var chaotic = [];
var eventful = [];
var monotonous = [];
var pleasant = [];
var uneventful = [];
var vibrant = [];

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
    // Guardaremos en dos array la información al respecto.
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
    //-- Resumen de las preguntas sobre el escenario.
    //-- Lo primero es saber cuántos escenarios hay. Para saberlo miramos la longitud del array.
    let number_places = quiz_info[0][1].length;
    let number_recordings = quiz_info[0][2].length / number_places;


    let questions_places= Object.keys(quiz_info[0][1][0]);
    let questions_recordings = Object.keys(quiz_info[0][2][0]);
    let questions_generic = Object.keys(quiz_info[0][3])

    console.log("Preguntas sobre el Escenario: " + quiz_info[0][1][0]["Name_Scenary"])
    // Recorremos el listado de preguntas.
    for (let i = 0; i < number_places; i++) {
        global_results.innerHTML += "<h4>Preguntas sobre el Escenario: " + quiz_info[0][1][i]["Name_Scenary"]+"</h4><br>";
        for (let e = 1; e < questions_places.length; e++) {
            global_results.innerHTML += e + ". "+questions_places[e] + "<br>";
        }
        global_results.innerHTML += "<h5>Preguntas sobre el Sistema de Grabación:</h5>";
        for (let e = 0; e < questions_recordings.length; e++) {
            global_results.innerHTML += questions_recordings[e] + "<br>";            
        }
    }
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
    /* Después creamos un bucle el cuál busca en todas las preguntas útiles las respuestas para sumar.
    */
    for (let i = 0; i < number_people; i++) {
        /* El segundo bucle for sirve para leer todas las respuestas que nos interesan.*/
        for (let e = 0; e < quiz_info[i][2].length; e++) {
            if (quiz_info[i][2][e]["¿Consideras ruidoso el audio del paisaje sonoro?"] == "yes") {
                if (annoying[e] != undefined) {
                    annoying[e] += 1;
                }else{
                    annoying[e] = 1;
                }
            }else if (quiz_info[i][2][e]["¿Consideras ruidoso el audio del paisaje sonoro?"] == "no") {
                pleasant[e] += 1;
            }
            
            if (quiz_info[i][2][e]["¿Qué sonidos podrías distinguir en la toma?"] == "urban") {
                eventful[e] +=1;
            }else if (quiz_info[i][2][e]["¿Qué sonidos podrías distinguir en la toma?"] == "nature") {
                uneventful[e] += 1;
            }

            if (quiz_info[i][2][e]["¿Consideras desagradable el audio del paisaje sonoro?"] == "yes") {
                chaotic[e] +=1;
            }else if (quiz_info[i][2][e]["¿Consideras desagradable el audio del paisaje sonoro?"] == "no") {
                calm[e] += 1;
            }

            if (quiz_info[i][2][e]["¿Consideras definido el audio del paisaje sonoro?"] == "yes") {
                monotonous[e] +=1;
            }else if (quiz_info[i][2][e]["¿Consideras definido el audio del paisaje sonoro?"] == "no") {
                vibrant[e] += 1;
            }
        }


    }
    annoying[0] = annoying[0]/number_people;
    annoying[1] = annoying[1]/number_people;
    annoying[2] = annoying[2]/number_people;
    console.log(annoying)
    pleasant[0] = pleasant[0]/number_people;
    pleasant[1] = pleasant[1]/number_people;
    pleasant[2] = pleasant[2]/number_people;
    console.log(pleasant)
    eventful[0] = eventful[0]/number_people;
    eventful[1] = eventful[1]/number_people;
    eventful[2] = eventful[2]/number_people;

    uneventful[0] = uneventful[0]/number_people;
    uneventful[1] = uneventful[1]/number_people;
    uneventful[2] = uneventful[2]/number_people;

    chaotic[0] = chaotic[0]/number_people;
    chaotic[1] = chaotic[1]/number_people;
    chaotic[2] = chaotic[2]/number_people;

    calm[0] = calm[0]/number_people;
    calm[1] = calm[1]/number_people;
    calm[2] = calm[2]/number_people;

    monotonous[0] = monotonous[0]/number_people;
    monotonous[1] = monotonous[1]/number_people;
    monotonous[2] = monotonous[2]/number_people;

    vibrant[0] = vibrant[0]/number_people;
    vibrant[1] = vibrant[1]/number_people;
    vibrant[2] = vibrant[2]/number_people;

    diagram_examples.innerHTML = "";
    console.log(number_places)
    if (number_places == 1) {
        diagram_examples.innerHTML += '<canvas id="diagram1" width="400px" height="297px"></canvas><br>';
    }else if (number_places ==2) {
        diagram_examples.innerHTML += '<canvas id="diagram1" width="400px" height="297px"></canvas><br>';
        diagram_examples.innerHTML += '<canvas id="diagram2" width="400px" height="297px"></canvas><br>';
    }else if (number_places == 3) {
        diagram_examples.innerHTML += '<canvas id="diagram1" width="400px" height="297px"></canvas><br>';
        diagram_examples.innerHTML += '<canvas id="diagram2" width="400px" height="297px"></canvas><br>';
        diagram_examples.innerHTML += '<canvas id="diagram3" width="400px" height="297px"></canvas><br>';
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
    let number_places = quiz_info[0][1].length;
    let number_recordings = quiz_info[0][2].length/number_places;
    if (canvas1.getContext) {
      const ctx = canvas1.getContext('2d');
      

        point_x = (pleasant[0]-annoying[0]);
        console.log(point_x)
        point_x = point_x*116;

        point_y = (eventful[0]-uneventful[0])+Math.cos(Math.PI/4)*(chaotic[0]-calm[0])+Math.cos(Math.PI/4)*(vibrant[0]-monotonous[0]);
        point_y = point_y*116;

        console.log(point_x,point_y)
        canvas_draw_hex(ctx,point_x,point_y);

      //-- Dibujar los puntos del Diagrama.
      //-- Hay que crear un diagrama por cada lugar y por cada toma hay que seleccionar un color.
      // Al haber solo la posibilidad de 3 tomas, se seleccionan 3 colores. Qué serán rojo, verde y azul.
      /* Estos colores son colores que son fáciles de distinguir entre ellos de forma que al usuario no le cueste identificar cada toma.*/
    }
    if (canvas2.getContext) {
        const ctx = canvas2.getContext('2d');
        canvas_draw_hex(ctx);
        //-- Dibujar los puntos del Diagrama.
        //-- Hay que crear un diagrama por cada lugar y por cada toma hay que seleccionar un color.
        // Al haber solo la posibilidad de 3 tomas, se seleccionan 3 colores. Qué serán rojo, verde y azul.
        /* Estos colores son colores que son fáciles de distinguir entre ellos de forma que al usuario no le cueste identificar cada toma.*/
    }
    if (canvas3.getContext) {
        const ctx = canvas3.getContext('2d');
        canvas_draw_hex(ctx);
        //-- Dibujar los puntos del Diagrama.
        //-- Hay que crear un diagrama por cada lugar y por cada toma hay que seleccionar un color.
        // Al haber solo la posibilidad de 3 tomas, se seleccionan 3 colores. Qué serán rojo, verde y azul.
        /* Estos colores son colores que son fáciles de distinguir entre ellos de forma que al usuario no le cueste identificar cada toma.*/
    }
}
function canvas_draw_hex(ctx,point_x,point_y) {
    ctx.drawImage(img,0,0);
    ctx.beginPath();
    ctx.arc(point_x,point_y,15,0,2*Math.PI,false);
    ctx.stroke();
    //-- Circunferencia exterior.
    ctx.moveTo(198,34);
    ctx.lineTo(281,69);
    ctx.moveTo(281,69);
    ctx.lineTo(314,151);
    ctx.moveTo(314,151);
    ctx.lineTo(281,233);
    ctx.moveTo(281,233);
    ctx.lineTo(198,266);
    ctx.moveTo(198,266);
    ctx.lineTo(115,233);
    ctx.moveTo(115,233);
    ctx.lineTo(82,151);
    ctx.moveTo(82,151);
    ctx.lineTo(115,69);
    ctx.moveTo(115,69);
    ctx.lineTo(198,34);
    ctx.fill();
    ctx.stroke();
}