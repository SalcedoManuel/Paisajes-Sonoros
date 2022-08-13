const functions_readfile = require('./functions_readfile');

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

function places_global_results() {
    const number_people = quiz_info.length;
    const number_places = quiz_info[0][1].length;
    var string = "";
    console.log("IN")
    function create_map(pos) {
        let new_map = new Map();
        new_map.set("Escenario",quiz_info[0][1][pos]["Name_Scenary"])
        new_map.set("¿Conoces el escenario?",[0,0]);
        new_map.set("¿Cuál es la frecuencia de paso por él?",[0,0,0,0,0]);
        new_map.set("Cuando lo has transitado, ¿Has prestado atención al sonido que te rodeaba?",[0,0]);
        new_map.set("¿Las grabaciones se asemejan a tu recuerdo del escenario?",[0,0]);
        return new_map;
    }
    /* Crearemos un array que contendrá las partes de las preguntas.*/

    var array = new Array()
    if (number_places == 1) {
        array.push(create_map(0))
    }
    if (number_places == 2) {
        array.push(create_map(0))
        array.push(create_map(1))
    }
    if (number_places == 3) {
        array.push(create_map(0))    
        array.push(create_map(1))    
        array.push(create_map(2))
    }

    for (let e = 0; e < number_places; e++) {
    for (let i = 0; i < number_people; i++) {
    if (quiz_info[i][1][e]['¿Conoces el escenario?'] == "yes") {
        let value = array[e].get("¿Conoces el escenario?")
        value[0] += 1/number_people;
    }else{
        let value = array[e].get("¿Conoces el escenario?")
        value[1] += 1/number_people;
    }

    if (quiz_info[i][1][e]['¿Cuál es la frecuencia de paso por él?'] == "ninguna") {
        let value = array[e].get('¿Cuál es la frecuencia de paso por él?')
        value[0] += 1/number_people;
    }else if (quiz_info[i][1][e]['¿Cuál es la frecuencia de paso por él?'] == "poca") {
        let value = array[e].get('¿Cuál es la frecuencia de paso por él?')
        value[1] += 1/number_people;
    }else if (quiz_info[i][1][e]['¿Cuál es la frecuencia de paso por él?'] == "aveces") {
        let value = array[e].get('¿Cuál es la frecuencia de paso por él?')
        value[2] += 1/number_people;
        
    }else if (quiz_info[i][1][e]['¿Cuál es la frecuencia de paso por él?'] == "frecuentemente") {
        let value = array[e].get('¿Cuál es la frecuencia de paso por él?')
        value[3] += 1/number_people;
    }else{
        let value = array[e].get('¿Cuál es la frecuencia de paso por él?')
        value[4] += 1/number_people;
    }

    if (quiz_info[i][1][e]['Cuando lo has transitado, ¿Has prestado atención al sonido que te rodeaba?'] == "yes") {
        let value = array[e].get('Cuando lo has transitado, ¿Has prestado atención al sonido que te rodeaba?')
        value[0] += 1/number_people;
    }else{
        let value = array[e].get('Cuando lo has transitado, ¿Has prestado atención al sonido que te rodeaba?')
        value[1] += 1/number_people;
    }

    if (quiz_info[i][1][e]['¿Las grabaciones se asemejan a tu recuerdo del escenario?'] == "yes") {
        let value = array[e].get('¿Las grabaciones se asemejan a tu recuerdo del escenario?')
        value[0] += 1/number_people;
    }else{
        let value = array[e].get('¿Las grabaciones se asemejan a tu recuerdo del escenario?')
        value[1] += 1/number_people;
    }

    }
    }
    string += "<h3> Preguntas sobre los Escenarios </h3>"
    for (let i = 0; i < array.length; i++) {
        let preguntas = array[i].keys()
        string += "<h2>" + preguntas.next().value + " " + array[i].get('Escenario') + "</h4>";
        // Creamos ahora la tabla que contendrá la pregunta.
        string += '<table class="table_global_results"><caption id="caption_table"><h2>' + preguntas.next().value + "</h2></caption>";
        // Creamos la primera fila, aún no hay valores del quiz.
        string += '<tr style="font-size:large;"><th scope="col"></th><th>Número</th><th>Porcentaje</th></tr>';        
        string += '<tr><th>Sí</th><td id="value_table">' + array[i].get('¿Conoces el escenario?')[0]*number_people + '</td><td id="value_table">' + array[i].get('¿Conoces el escenario?')[0]*100+"%</td><tr>";
        string += '<tr><th>No</th><td id="value_table">' + array[i].get('¿Conoces el escenario?')[1]*number_people + '</td><td id="value_table">' + array[i].get('¿Conoces el escenario?')[1]*100+"%</td><tr>";
        string += "<table>";
        // Creamos una nueva tabla
        string += '<table class="table_global_results"><caption id="caption_table"><h2>' + preguntas.next().value + "</h2></caption>";
        // Creamos de nuevo los valores del quiz.
        string += '<tr style="font-size:large;"><th scope="col"></th><th>Número</th><th>Porcentaje</th></tr>';
        string += '<tr><th>Ninguna</th><td id="value_table">'+ array[i].get('¿Cuál es la frecuencia de paso por él?')[0]*number_people+ '</td><td id="value_table">' + array[i].get('¿Cuál es la frecuencia de paso por él?')[0]*100+"%</td><tr>";
        string += '<tr><th>Poca</th><td id="value_table">'+ array[i].get('¿Cuál es la frecuencia de paso por él?')[1]*number_people+ '</td><td id="value_table">' + array[i].get('¿Cuál es la frecuencia de paso por él?')[1]*100+"%</td><tr>";
        string += '<tr><th>A veces</th><td id="value_table">'+ array[i].get('¿Cuál es la frecuencia de paso por él?')[2]*number_people+ '</td><td id="value_table">' + array[i].get('¿Cuál es la frecuencia de paso por él?')[2]*100+"%</td><tr>"
        string += '<tr><th>Frecuentemente</th><td id="value_table">'+ array[i].get('¿Cuál es la frecuencia de paso por él?')[3]*number_people+ '</td><td id="value_table">' + array[i].get('¿Cuál es la frecuencia de paso por él?')[3]*100+"%</td><tr>"
        string += '<tr><th>Diariamente</th><td id="value_table">'+ array[i].get('¿Cuál es la frecuencia de paso por él?')[4]*number_people+ '</td><td id="value_table">' + array[i].get('¿Cuál es la frecuencia de paso por él?')[4]*100+"%</td><tr>"
        string += "</table>";
        // Volvemos a crear una tabla nueva.
        string += '<table class="table_global_results"><caption id="caption_table"><h2>' + preguntas.next().value + "</h2></caption>";
        // Creamos de nuevo los valores del quiz.
        string += '<tr style="font-size:large;"><th scope="col"></th><th>Número</th><th>Porcentaje</th></tr>';
        string += '<tr><th>Sí</th><td id="value_table">'+ array[i].get('Cuando lo has transitado, ¿Has prestado atención al sonido que te rodeaba?')[0]*number_people+ '</td><td id="value_table">' + array[i].get('Cuando lo has transitado, ¿Has prestado atención al sonido que te rodeaba?')[0]*100+"%</td><tr>";
        string += '<tr><th>No</th><td id="value_table">'+ array[i].get('Cuando lo has transitado, ¿Has prestado atención al sonido que te rodeaba?')[1]*number_people+ '</td><td id="value_table">' + array[i].get('Cuando lo has transitado, ¿Has prestado atención al sonido que te rodeaba?')[1]*100+"%</td><tr>";
        string += "</table>";
        // Creamos la tabla de la última pregunta.
        string += '<table class="table_global_results"><caption id="caption_table"><h2>' + preguntas.next().value + "</h2></caption>";
        // Creamos de nuevo los valores del quiz.
        string += '<tr style="font-size:large;"><th scope="col"></th><th>Número</th><th>Porcentaje</th></tr>';
        string += '<tr><th>Sí</th><td id="value_table">'+ array[i].get('¿Las grabaciones se asemejan a tu recuerdo del escenario?')[0]*number_people+ '</td><td id="value_table">' + array[i].get('¿Las grabaciones se asemejan a tu recuerdo del escenario?')[0]*100+"%</td><tr>";
        string += '<tr><th>No</th><td id="value_table">'+ array[i].get('¿Las grabaciones se asemejan a tu recuerdo del escenario?')[1]*number_people+ '</td><td id="value_table">' + array[i].get('¿Las grabaciones se asemejan a tu recuerdo del escenario?')[1]*100+"%</td><tr>";
        string += '</table><br><br>';
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
    age_global_results,
    gender_global_results,
    places_global_results,
    recordings_global_results,
    generic_global_results
}