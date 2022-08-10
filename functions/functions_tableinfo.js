function create_table_info_init_string() {
    let string = '<tr valign="top" class="top_cell">'+
    '<th scope="row" id="number_quiz">Número</th>'+
    '<th id="date_quiz">Fecha de realización</th>'+
    '<th id="age_quiz">Edad</th>'+
    '<th id="gener_quiz">Género</th>'+
    '</tr>';
    return string;
}
function add_data_table_info() {
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
}

/* FUNCIONES COMPLEMENTARIAS DEL APARTADO DE RESULTADOS GLOBALES */

function table_global_results_string(params,i) {
    let string = '<table class="table_global_results">';
    if (params == "age") {        
        string += '<caption id="caption_table"><h2>Edades de los Participantes</h2></caption>';
        string += '<tr style="font-size:large;">';
        string += '<th scope="col">Grupo de Edades</th>';
        string += '<th>Número</th>';
        string += '<th>Porcentaje</th>';
        string += '</tr>';
    }else if (params == "gender") {
        string += '<caption id="caption_table"><h2>Géneros de los Participantes</h2></caption>';
        string += '<tr style="font-size:large;">';
        string += '<th scope="col">Géneros</th>';
        string += '<th>Número</th>';
        string += '<th>Porcentaje</th>';
        string += '</tr>';
    }else if (params == "scenary") {
        string += '<caption id="caption_table"><h4>Preguntas sobre el Escenario:'+quiz_info[0][1][i]["Name_Scenary"]+'</h4></caption>';
        string += '<tr style="font-size:large;">';
        string += '<th scope="col">Preguntas</th>';
        string += '<th>Número de Respuestas por opción</th>';
        string += '<th>Porcetaje de las Respuestas por opción</th>';
        string += '</tr>';
    }

    return string;
}


/* FUNCIONES  DEL APARATADO de RESULTADOS GLOBALES*/

function age_global_results() {
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
    let string = table_global_results_string("age",0);
    //-- Bucle que sirve para colocar en la APP la información de las edades.
    for (let i = 0; i < age_array_results.length; i++) {
        switch (i) {
            case 0:
                string += "<tr><th> Menor 18 Años: </th>";
                break;
            case 1:
                string += "<tr><th> 18-25 Años: </th>";
            break;
            case 2:
                string += "<tr><th> 26-35 Años: </th>";
            break;
            case 3:
                string += "<tr><th> 36-46 Años: </th>";
            break;
            case 4:
                string += "<tr><th> 46-55 Años: </th>";
            break;
            case 5:
                string += "<tr><th> 55-65 Años: </th>";
            break;
            default:
                string += "<tr><th> Mayor 65 Años: </th>";
                break;
        }
        string += '<td id="value_table">';
        string += age_array_results[i] + '</td><td id="value_table">'+age_array_porcentaje[i]+"</td></tr>";
    }
    string += '</table>';
    global_results.innerHTML += string + "<br>";
}

function gender_global_results() {
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
    let string = table_global_results_string("gender",0)
    //-- Bucle que sirve para colocar en la APP la información de las edades.
    for (let i = 0; i < gender_array_results.length; i++) {
        switch (i) {
            case 0:
                string += "<tr><th> Masculino: </th>";
                break;
            case 1:
                string += "<tr><th> Femenino: </th>";
            break;
            default:
                string += "<tr><th> Otro: </th>";
                break;
        }
        string += '<td id="value_table">';
        string += gender_array_results[i] + '</td><td id="value_table">'+gender_array_porcentaje[i]+"</td></tr>";
    }
    string += '</table>';
    global_results.innerHTML += string;
}
module.exports = {
    create_table_info_init_string,
    add_data_table_info,
    age_global_results,
    gender_global_results
}