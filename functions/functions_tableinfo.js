const functions_readfile = require('./functions_readfile');

function create_table_info_init_string() {
    let string = '<tr valign="top" class="top_cell">'+
    '<th scope="row" id="number_quiz">Número</th>'+
    '<th id="date_quiz">Fecha de realización</th>'+
    '<th id="score_quiz">Nota en el test HearWHO</th>'+
    '</tr>';
    return string;
}
function add_data_table_info() {
    for (let i = 0; i < quiz_info.length; i++) {
        info_table.innerHTML += '<tr id="table_value">'+
        '<th id="number_quiz">'+(i+1)+'</th>'+
        '<th id="date_quiz">' + quiz_info[i][0]["Date"] + '</th>'+
        '<th id="score_quiz">'+quiz_info[i][0]["Introduce aquí tu puntaje auditivo obtenido en el test hearWHO"]+'</th>'
        +'</tr>';
    }
    info_table.innerHTML = info_table.innerHTML.split("NaN").join('');
}

/* FUNCIONES COMPLEMENTARIAS DEL APARTADO DE RESULTADOS GLOBALES */

function table_global_results_string(params,i) {
    let string = '<table class="table_global_results">';
    if (params == "WHO_score") {        
        string += '<caption id="caption_table"><h2>Puntuación en los test HearWHO</h2></caption>';
        string += '<tr style="font-size:large;">';
        string += '<th scope="col">Grupo de Notas</th>';
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

function get_features_diagram(number_place,number_toma) {
    // Analizando las listas con las características nos quedamos con las 3 características más influyentes.
    var str = "";
    var eventful = false;
    var pleasant = false;
    console.log("Eventful: "+eventful_list[number_place][number_toma])
    console.log("Uneventful: "+uneventful_list[number_place][number_toma])
    if (eventful_list[number_place][number_toma] >= uneventful_list[number_place][number_toma]) {
        str += "Eventful, ";
        eventful = true;
    }else{
        str += "Uneventful, ";
    }
    console.log("Valor de Pleasant" + pleasant_list[number_place])
    console.log("Valor de Annoying" +annoying_list[number_place])
    if (pleasant_list[number_place][number_toma] >= annoying_list[number_place][number_toma]) {
        str += "Pleasant, ";
        pleasant = true;
    }else{
        str += "Annoying, ";
    }

    if (eventful && pleasant) {
        str += "and Vibrant.";
    }else if (eventful && !pleasant) {
        str += "and Chaotic.";
    }else if (!eventful && pleasant) {
        str += "and Calm.";
    }else if (!eventful && !pleasant) {
        str += "and Monotonous.";
    }
    console.log(str)
    return str;
}

/* FUNCIONES  DEL APARATADO de RESULTADOS GLOBALES*/

function WHO_score_global_results() {
    //-- Mostaremos ahora la franja de los resultados del test.
    //-- Guardamos en un array cuanta gente hay con esa puntuación.
    // Los rangos son 4:
    // <18 años, de 18 a 25, de 26 a 35, de 36 a 45, de 46 a 55, de 56 a 65 y 65<.
    let score_array_results = [0,0,0,0,0];
    let score_array_porcentaje = [0,0,0,0,0];
    for (let i = 0; i < quiz_info.length; i++) {
        if (quiz_info[i][0]["Introduce aquí tu puntaje auditivo obtenido en el test hearWHO"] == 0){
            number = 0
        }else if (quiz_info[i][0]["Introduce aquí tu puntaje auditivo obtenido en el test hearWHO"] < 50) {
            number = 1;
        }else if (quiz_info[i][0]["Introduce aquí tu puntaje auditivo obtenido en el test hearWHO"] < 65) {
            number = 2;
        }else if (quiz_info[i][0]["Introduce aquí tu puntaje auditivo obtenido en el test hearWHO"] < 76) {
            number = 3;
        }else{ //-- Por encima de 76 puntos.
            number = 4;
        }
        score_array_results[number] += 1;     
    }
    //-- Calculamos los porcentajes.
    for (let i = 0; i < score_array_porcentaje.length; i++) {
        //-- Dividimos la cantidad de notas que hay en ese intervalo con el número de participantes.
        score_array_porcentaje[i]=(score_array_results[i]/quiz_info.length)*100 + "%";        
    }
    let string = table_global_results_string("WHO_score",0);
    //-- Bucle que sirve para colocar en la APP la información de las edades.
    for (let i = 0; i < score_array_results.length; i++) {
        switch (i) {
            case 0:
                string += "<tr><th> Sin Cuestionario: </th>";
                break;
            case 1:
                string += "<tr><th> Menos de 50 puntos: </th>";
            break;
            case 2:
                string += "<tr><th> Entre 50 y 64 puntos: </th>";
            break;
            case 3:
                string += "<tr><th> Entre 65 y 75 puntos: </th>";
            break;
            default:
                string += "<tr><th> Por encima de 75 puntos: </th>";
            break;
        }
        string += '<td id="value_table">';
        string += score_array_results[i] + '</td><td id="value_table">'+score_array_porcentaje[i]+"</td></tr>";
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

function places_global_results() {
    const number_people = quiz_info.length;
    console.log("Número de personas: "+number_people)
    const number_places = quiz_info[0][0]["Places_Number"];
    console.log("Número de lugares: " + number_places)
    const number_recordings = quiz_info[0][0]["Recordings_Number"];
    const VALUE = 1/number_people;

    const name_Scenaries = functions_readfile.get_names_places();

    

    var string = "";

    /* Crearemos un array que contendrá las partes de las preguntas.*/

    var array = new Array()
    for (let index = 0; index < number_places*number_recordings; index++) {
        array.push(functions_readfile.create_map())
        
    }
    /*
    if (number_places == 1) {
        array.push(functions_readfile.create_map())
    }
    if (number_places == 2) {
        array.push(functions_readfile.create_map())
        array.push(functions_readfile.create_map())
    }
    if (number_places == 3) {
        array.push(functions_readfile.create_map())    
        array.push(functions_readfile.create_map())    
        array.push(functions_readfile.create_map())
    }
    */
    for (let e = 0; e < number_places*number_recordings; e++) {
        for (let i = 0; i < number_people; i++) {
            if (quiz_info[i][1][e]['Agradable/Placentero'] == "muy_desacuerdo") {
                let value = array[e].get("Agradable/Placentero")
                value[0] += 1/number_people;
            }else if(quiz_info[i][1][e]['Agradable/Placentero'] == "desacuerdo"){
                let value = array[e].get("Agradable/Placentero")
                value[1] += 1/number_people;
            }else if(quiz_info[i][1][e]['Agradable/Placentero'] == "neutro"){
                let value = array[e].get("Agradable/Placentero")
                value[2] += 1/number_people;
            }else if(quiz_info[i][1][e]['Agradable/Placentero'] == "acuerdo"){
                let value = array[e].get("Agradable/Placentero")
                value[3] += 1/number_people;
            }else if(quiz_info[i][1][e]['Agradable/Placentero'] == "muy_acuerdo"){
                let value = array[e].get("Agradable/Placentero")
                value[4] += 1/number_people;
            }

            if (quiz_info[i][1][e]['Sin Actividad/Estático'] == "muy_desacuerdo") {
                let value = array[e].get('Sin Actividad/Estático')
                value[0] += 1/number_people;
            }else if (quiz_info[i][1][e]['Sin Actividad/Estático'] == "desacuerdo") {
                let value = array[e].get('Sin Actividad/Estático')
                value[1] += 1/number_people;
            }else if (quiz_info[i][1][e]['Sin Actividad/Estático'] == "neutro") {
                let value = array[e].get('Sin Actividad/Estático')
                value[2] += 1/number_people;                
            }else if (quiz_info[i][1][e]['Sin Actividad/Estático'] == "acuerdo") {
                let value = array[e].get('Sin Actividad/Estático')
                value[3] += 1/number_people;
            }else if (quiz_info[i][1][e]['Sin Actividad/Estático'] == "muy_acuerdo") {
                let value = array[e].get('Sin Actividad/Estático')
                value[4] += 1/number_people;
            }
            if (quiz_info[i][1][e]['Desagradable/Molesto'] == "muy_desacuerdo") {
                let value = array[e].get('Desagradable/Molesto')
                value[0] += 1/number_people;
            }else if (quiz_info[i][1][e]['Desagradable/Molesto'] == "desacuerdo") {
                let value = array[e].get('Desagradable/Molesto')
                value[1] += 1/number_people;
            }else if (quiz_info[i][1][e]['Desagradable/Molesto'] == "neutro") {
                let value = array[e].get('Desagradable/Molesto')
                value[2] += 1/number_people;                
            }else if (quiz_info[i][1][e]['Desagradable/Molesto'] == "acuerdo") {
                let value = array[e].get('Desagradable/Molesto')
                value[3] += 1/number_people;
            }else if (quiz_info[i][1][e]['Desagradable/Molesto'] == "muy_acuerdo") {
                let value = array[e].get('Desagradable/Molesto')
                value[4] += 1/number_people;
            }

            if (quiz_info[i][1][e]['Con Actividad/Dinámico'] == "muy_desacuerdo") {
                let value = array[e].get('Con Actividad/Dinámico')
                value[0] += 1/number_people;
            }else if (quiz_info[i][1][e]['Con Actividad/Dinámico'] == "desacuerdo") {
                let value = array[e].get('Con Actividad/Dinámico')
                value[1] += 1/number_people;
            }else if (quiz_info[i][1][e]['Con Actividad/Dinámico'] == "neutro") {
                let value = array[e].get('Con Actividad/Dinámico')
                value[2] += 1/number_people;                
            }else if (quiz_info[i][1][e]['Con Actividad/Dinámico'] == "acuerdo") {
                let value = array[e].get('Con Actividad/Dinámico')
                value[3] += 1/number_people;
            }else if (quiz_info[i][1][e]['Con Actividad/Dinámico'] == "muy_acuerdo") {
                let value = array[e].get('Con Actividad/Dinámico')
                value[4] += 1/number_people;
            }

            if (quiz_info[i][1][e]['En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?'] == "muy_malo") {
                let value = array[e].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')
                value[0] += 1/number_people;
            }else if (quiz_info[i][1][e]['En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?'] == "malo") {
                let value = array[e].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')
                value[1] += 1/number_people;
            }else if (quiz_info[i][1][e]['En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?'] == "neutro") {
                let value = array[e].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')
                value[2] += 1/number_people;                
            }else if (quiz_info[i][1][e]['En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?'] == "bueno") {
                let value = array[e].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')
                value[3] += 1/number_people;
            }else if (quiz_info[i][1][e]['En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?'] == "muy_bueno") {
                let value = array[e].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')
                value[4] += 1/number_people;
            }

            if (quiz_info[i][1][e]['¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?'] == "insoportable") {
                let value = array[e].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')
                value[0] += 1/number_people;
            }else if (quiz_info[i][1][e]['¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?'] == "molesto") {
                let value = array[e].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')
                value[1] += 1/number_people;
            }else if (quiz_info[i][1][e]['¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?'] == "bien") {
                let value = array[e].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')
                value[2] += 1/number_people;                
            }else if (quiz_info[i][1][e]['¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?'] == "bastante") {
                let value = array[e].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')
                value[3] += 1/number_people;
            }else if (quiz_info[i][1][e]['¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?'] == "encanta") {
                let value = array[e].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')
                value[4] += 1/number_people;
            }

            if (quiz_info[i][1][e]['¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?'] == "comercial") {
                let value = array[e].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')
                value[0] += 1/number_people;
            }else if (quiz_info[i][1][e]['¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?'] == "residencial") {
                let value = array[e].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')
                value[1] += 1/number_people;
            }else if (quiz_info[i][1][e]['¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?'] == "recreativo") {
                let value = array[e].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')
                value[2] += 1/number_people;                
            }else if (quiz_info[i][1][e]['¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?'] == "otro") {
                let value = array[e].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')
                value[3] += 1/number_people;                
            }

            if (quiz_info[i][1][e]['¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?'] == "invierno") {
                let value = array[e].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')
                value[0] += 1/number_people;
            }else if (quiz_info[i][1][e]['¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?'] == "verano") {
                let value = array[e].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')
                value[1] += 1/number_people;
            }else if (quiz_info[i][1][e]['¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?'] == "otro") {
                let value = array[e].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')
                value[2] += 1/number_people;                
            }

        }
    }
    console.table(array)
    string += "<h3> Preguntas sobre los Escenarios </h3>"
    var preguntas = array[0].keys();
    // Crearemos tantas tablas como preguntas 
    for (let i = 0; i < array[0].size; i++) {
        string +='<table class="table_global_results">';
        let pregunta_actual = preguntas.next().value
        string += '<caption id="caption_table"><h3>'+pregunta_actual+'</h3></caption>\n';
        string += '<tr><th scope="col" rowspan="2">Posibles Respuestas</th>';
        for (let e = 0; e < name_Scenaries.length; e++) {
            string += '<th colspan="2" style="font-size:large;">'+name_Scenaries[e] +'</th>';        
        }
        string += '</tr>';
        string += '<tr>\n';
        for (let e = 0; e < name_Scenaries.length; e++) {
            string += '<th>Número</th><th>Porcentaje</th>';
        }
        string += '</tr>';
        if (pregunta_actual == "En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?") {
            string += '<tr>';
            string +='<th>Muy Malo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')[0]

                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Malo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')[1]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Ni bueno ni malo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')[2]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Bueno</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')[3]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Muy bueno</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')[4]
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>'; 
        }else if(pregunta_actual == "¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?"){
            string += '<tr>';
            string +='<th>Me parece insoportable y no aguantaría ni 10 minutos.</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')[0]
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Me molesta un poco y no permanecería mucho tiempo ahí.</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')[1]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Para un rato está bien, pero sin más.</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')[2]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Pasaría bastante tiempo en un lugar como este.</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')[3]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Me encanta y pasaría el resto de mi vida en este lugar.</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')[4]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';
        }else if(pregunta_actual == "¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?"){
            string += '<tr>';
            string +='<th>Comercial</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')[0]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Residencial</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')[1]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Recreativo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')[2]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Otro</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')[3]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';
        }else if(pregunta_actual == "¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?"){
            string += '<tr>';
            string +='<th>Invierno</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')[0]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Verano</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')[1]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Otro</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')[2]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';
        }else{
            string += '<tr>';
            string +='<th>Muy en Desacuerdo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get(pregunta_actual)[0]
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';

            string += '<tr>';
            string +='<th>En Desacuerdo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get(pregunta_actual)[1]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';

            string += '<tr>';
            string +='<th>Neutral</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get(pregunta_actual)[2]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';

            string += '<tr>';
            string +='<th>De acuerdo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get(pregunta_actual)[3]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';

            string += '<tr>';
            string +='<th>Muy de acuerdo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get(pregunta_actual)[4]
                
                string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            }
            string += '</tr>';
        }
        string +='</table>\n\n';    
    }
    global_results.innerHTML += string;
}

function last_user_questions() {
    const number_people = quiz_info.length;
    const number_questions = quiz_info[0][2].length;
    const VALUE = 1/number_people;

    /* Crearemos un array que contendrá las partes de las preguntas.*/

    var array = new Array()
    array.push(functions_readfile.create_map_last_user_questions())
    string = "";
        console.table(array[0])
        for (let i = 0; i < number_people; i++) {
            if (quiz_info[i][2][0]['¿Conoces Menorca? ¿En qué grado estás familiarizado/a o relacionado/a con la isla?'] == "no") {
                let value = array[0].get("¿Conoces Menorca? ¿En qué grado estás familiarizado/a o relacionado/a con la isla?")
                value[0] += 1/number_people;
            }else if(quiz_info[i][2][0]['¿Conoces Menorca? ¿En qué grado estás familiarizado/a o relacionado/a con la isla?'] == "si_poco"){
                let value = array[0].get("¿Conoces Menorca? ¿En qué grado estás familiarizado/a o relacionado/a con la isla?")
                value[1] += 1/number_people;
            }else if(quiz_info[i][2][0]['¿Conoces Menorca? ¿En qué grado estás familiarizado/a o relacionado/a con la isla?'] == "si_neutro"){
                let value = array[0].get("¿Conoces Menorca? ¿En qué grado estás familiarizado/a o relacionado/a con la isla?")
                value[2] += 1/number_people;
            }else if(quiz_info[i][2][0]['¿Conoces Menorca? ¿En qué grado estás familiarizado/a o relacionado/a con la isla?'] == "si_mucho"){
                let value = array[0].get("¿Conoces Menorca? ¿En qué grado estás familiarizado/a o relacionado/a con la isla?")
                value[3] += 1/number_people;
            }

            if (quiz_info[i][2][0]['¿Tienes algún tipo de conocimiento o formación en Acústica?'] == "no") {
                let value = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')
                value[0] += 1/number_people;
            }else if (quiz_info[i][2][0]['¿Tienes algún tipo de conocimiento o formación en Acústica?'] == "si_poco") {
                let value = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')
                value[1] += 1/number_people;
            }else if (quiz_info[i][2][0]['¿Tienes algún tipo de conocimiento o formación en Acústica?'] == "si_mucho") {
                let value = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')
                value[2] += 1/number_people;                
            }
        }
    console.table(array)
    string += "<h3> Preguntas sobre los Escenarios </h3>"
    var preguntas = array[0].keys();
    // Crearemos tantas tablas como preguntas 
    for (let i = 0; i < array[0].size; i++) {
        string +='<table class="table_global_results">';
        let pregunta_actual = preguntas.next().value
        string += '<caption id="caption_table"><h3>'+pregunta_actual+'</h3></caption>\n';
        string += '<tr><th scope="col">Posibles Respuestas</th>';
        string += '<th>Número</th><th>Porcentaje</th>';
        string += '</tr>';
        if (pregunta_actual == "¿Conoces Menorca? ¿En qué grado estás familiarizado/a o relacionado/a con la isla?") {
            string += '<tr>';
            string +='<th>No, no he ido nunca.</th>';
            let number = array[0].get('¿Conoces Menorca? ¿En qué grado estás familiarizado/a o relacionado/a con la isla?')[0]
            string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            string += '</tr>';

            string +='<th>Sí, he estado una o dos veces.</th>'
            number = array[0].get('¿Conoces Menorca? ¿En qué grado estás familiarizado/a o relacionado/a con la isla?')[1]
            string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            string += '</tr>';

            string +='<th>Sí, la visito regularmente cada año.</th>'
            number = array[0].get('¿Conoces Menorca? ¿En qué grado estás familiarizado/a o relacionado/a con la isla?')[2]
            string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            string += '</tr>';

            string +='<th>Sí, soy residente en la isla.</th>'
            number = array[0].get('¿Conoces Menorca? ¿En qué grado estás familiarizado/a o relacionado/a con la isla?')[3]
            string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            string += '</tr>';

        }else if(pregunta_actual == "¿Tienes algún tipo de conocimiento o formación en Acústica?"){
            string += '<tr>';
            string +='<th>No, no tengo ningún conocimiento sobre Acústica.</th>';
            let number = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')[0]
            string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            string += '</tr>';

            string +='<th>Sí, soy/he sido estudiante de materias relacionadas con la Acústica.</th>'
            number = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')[1]
            string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            string += '</tr>';

            string +='<th>Sí, tengo conocimientos sólidos sobre Acústica.</th>'
            number = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')[2]
            string += '<td id="value_table">'+(number*number_people)+'</td><td id="value_table">'+(number*100)+'%</td>'
            string += '</tr>';
        }
        string +='</table>\n\n';    
    }
    global_results.innerHTML += string;
}

function recordings_global_results() {
    /* Extraemos de la información del Quiz los valores que necesitamos para dibujar.
    Lo primero es crear la constante que marque el número de participantes en el custionario.*/
    const number_people = quiz_info.length;
    const number_places = quiz_info[0][1].length;
    /*Número de grabaciones por sistema */
    number_recordings = quiz_info[0][2].length/number_places;
    /* Después creamos un bucle el cuál busca en todas las preguntas útiles las respuestas para sumar.*/
    var annoying = [];
    functions_readfile.create_Array(annoying);
    var calm= [];
    functions_readfile.create_Array(calm);
    var chaotic = [];
    functions_readfile.create_Array(chaotic);
    var eventful = [];
    functions_readfile.create_Array(eventful);
    var monotonous = [];
    functions_readfile.create_Array(monotonous);
    var pleasant = [];
    functions_readfile.create_Array(pleasant);
    var uneventful = [];
    functions_readfile.create_Array(uneventful);
    var vibrant = [];
    functions_readfile.create_Array(vibrant);

    const VALUE = 1/number_people;
    for (let i = 0; i < number_people; i++) {
        for (let e = 0; e < quiz_info[i][2].length; e++) {
            if (quiz_info[i][2][e]["¿Consideras ruidoso el audio del paisaje sonoro?"] == "yes") {
                annoying[e] += VALUE;
            }else if (quiz_info[i][2][e]["¿Consideras ruidoso el audio del paisaje sonoro?"] == "no") {
                pleasant[e] += VALUE;
            }
            
            if (quiz_info[i][2][e]["¿Qué sonidos podrías distinguir en la toma?"] == "urban") {
                eventful[e] += VALUE;
            }else if (quiz_info[i][2][e]["¿Qué sonidos podrías distinguir en la toma?"] == "nature") {
                uneventful[e] += VALUE;
            }else{
                eventful[e] += 0;
                uneventful[e] += 0;
            }
    
            if (quiz_info[i][2][e]["¿Consideras desagradable el audio del paisaje sonoro?"] == "yes") {
                chaotic[e] += VALUE;
            }else if (quiz_info[i][2][e]["¿Consideras desagradable el audio del paisaje sonoro?"] == "no") {
                calm[e] += VALUE;
            }
    
            if (quiz_info[i][2][e]["¿Consideras definido el audio del paisaje sonoro?"] == "yes") {
                monotonous[e] += VALUE;
            }else if (quiz_info[i][2][e]["¿Consideras definido el audio del paisaje sonoro?"] == "no") {
                vibrant[e] += VALUE;
            }
    
        }        
    }
        /*Dividimos el array principal en subarrays los cuáles corresponden con cada lugar.*/

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
    var string = "";
    
    for (let i = 0; i < number_places; i++) {
        string += '<table class="table_global_results">';
        string += '<caption id="caption_table"><h2>'+quiz_info[0][1][i]["Name_Scenary"]+'</h2></caption>';
        string += '<tr style="font-size: large;">';
        string += '<th colspan="3">'+'<canvas id="diagram'+(i+1)+'" width="400px" height="297px"></canvas>'+'</th>';
        string += '</tr>';
        string += '<tr><th>Número de Toma</th><th>Color en el diagrama</td><th >Características de la Toma</td></tr>';
        for (let e = 0; e < recordings_system; e++) {
            string += "<tr>";
            string += '<th> Toma Nº: '+ (e+1) + '</th>';
            string += '<td id="value_table">Color: ';
            switch (e) {
                case 0:
                    string += '<b id="blue">AZUL<b></td>';
                    break;
                case 1:
                    string += '<b id="red">ROJO<b></td>';
                    break;
                default:
                    string += '<b id="green">VERDE<b></td>';
                    break;
            }
            string += '<td id="value_table">'+get_features_diagram(i,e)+'</td>'
            string += '</tr>';
        }
        string += '</table><br>';
    }
    diagram_examples.innerHTML = string;
}

function generic_global_results() {
    const number_people = quiz_info.length;
    const number_places = quiz_info[0][1].length;
    const number_recordings = quiz_info[0][2].length/number_places;

    const questions_names = Object.keys(quiz_info[0][3]);

    var array_str = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
    var list_max = [0,0,0,0,0,0,0,0];
    var list_min = [0,0,0,0,0,0,0,0];

    for (let i = 0; i < quiz_info.length; i++) {
        for (let x = 0; x < questions_names.length; x++) {
            let str = quiz_info[i][3][questions_names[x]];
            
            for (let e = 0; e < str.length; e++) {
                let caracter = str.charAt(e);
                
                let value = (str.length-e);
                
                array_str[x][caracter-1] += value;        
            } 
        }        
    }
    for (let i = 0; i < array_str.length; i++) {
        let ok = true
        for (let e = 0; e < array_str[i].length; e++) {
            if (Math.max(...array_str[i])== array_str[i][e] && ok) {
                let pos = e+1;
                list_max[i] = pos;
                ok = false
            }
        }
    }
    for (let i = 0; i < array_str.length; i++) {
        for (let e = 0; e < array_str[i].length; e++) {
            if (Math.min(...array_str[i])== array_str[i][e] ) {
                let pos = e+1;
                list_min[i] = pos;
            }
        }
    }

    // Ahora se crea la tabla que luego mostrará el HTML.
    var string = '<table class="table_global_results">';
    string += '<caption id="caption_table"><h2>Resumen de las Preguntas Genéricas</h2></caption>';
    string += '<tr style="font-size:large;background-color:white;"><th scope"col">De más ... a menos</th>'+ '<th>Toma que <b>MÁS</b> cumple</th>'+'<th>Toma que <b>MENOS</b> cumple</th></tr>';
    for (let i = 0; i < questions_names.length; i++) {
           string += '<tr><th>'+ questions_names[i] +'</th><td id="value_table"><b>Toma número: '+ list_max[i] + '</b></td><td id="value_table"><b>Toma número: ' +list_min[i] + '</b></td></tr>';    
    }
    string += "</table>";
    global_results.innerHTML += string;

}


module.exports = {
    create_table_info_init_string,
    add_data_table_info,
    WHO_score_global_results,
    gender_global_results,
    places_global_results,
    last_user_questions,
    recordings_global_results,
    generic_global_results
}