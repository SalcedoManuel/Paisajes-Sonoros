const functions_readfile = require('./functions_readfile');
const CreateMapFunction = require('./CreateMapFunction');

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
        '<th id="score_quiz">'+quiz_info[i][0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"]+'</th>'
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

/* FUNCIONES  DEL APARATADO de RESULTADOS GLOBALES*/

function WHO_score_global_results() {
    //-- Mostaremos ahora la franja de los resultados del test.
    //-- Guardamos en un array cuanta gente hay con esa puntuación.
    // Los rangos son 4:
    // <18 años, de 18 a 25, de 26 a 35, de 36 a 45, de 46 a 55, de 56 a 65 y 65<.
    let score_array_results = [0,0,0,0,0];
    let score_array_porcentaje = [0,0,0,0,0];
    for (let i = 0; i < quiz_info.length; i++) {
        if (quiz_info[i][0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"] == 0){
            number = 0
        }else if (quiz_info[i][0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"] < 50) {
            number = 1;
        }else if (quiz_info[i][0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"] < 65) {
            number = 2;
        }else if (quiz_info[i][0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"] < 76) {
            number = 3;
        }else{ //-- Por encima de 76 puntos.
            number = 4;
        }
        score_array_results[number] += 1;     
    }
    //-- Calculamos los porcentajes.
    for (let i = 0; i < score_array_porcentaje.length; i++) {
        //-- Dividimos la cantidad de notas que hay en ese intervalo con el número de participantes.
        score_array_porcentaje[i]=(Math.round((score_array_results[i]/quiz_info.length)*10000))/100 + "%";        
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
    string += '</table><br>';
    //global_results.innerHTML += string + "<br>";
    return string;
}

function places_global_results() {
    const number_people = quiz_info.length;
    const number_places = quiz_info[0][0]["Places_Number"];
    const number_recordings = quiz_info[0][0]["Recordings_Number"];
    const VALUE = 1/number_people;

    const name_Scenaries = functions_readfile.get_names_places();   

    var string = "";

    /* Crearemos un array que contendrá las partes de las preguntas.*/

    var array = new Array()
    for (let index = 0; index < number_places*number_recordings; index++) {
        array.push(CreateMapFunction.create_map())
    }

    for (let e = 0; e < number_places*number_recordings; e++) {
        for (let i = 0; i < number_people; i++) {
            if (quiz_info[i][1][e]['Agradable/Placentero'] == "muy_desacuerdo") {
                let value = array[e].get("Agradable/Placentero")
                value[0] += VALUE;
            }else if(quiz_info[i][1][e]['Agradable/Placentero'] == "desacuerdo"){
                let value = array[e].get("Agradable/Placentero")
                value[1] += VALUE;
            }else if(quiz_info[i][1][e]['Agradable/Placentero'] == "neutro"){
                let value = array[e].get("Agradable/Placentero")
                value[2] += VALUE;
            }else if(quiz_info[i][1][e]['Agradable/Placentero'] == "acuerdo"){
                let value = array[e].get("Agradable/Placentero")
                value[3] += VALUE;
            }else if(quiz_info[i][1][e]['Agradable/Placentero'] == "muy_acuerdo"){
                let value = array[e].get("Agradable/Placentero")
                value[4] += VALUE;
            }

            if (quiz_info[i][1][e]['Sin Actividad/Estático'] == "muy_desacuerdo") {
                let value = array[e].get('Sin Actividad/Estático')
                value[0] += VALUE;
            }else if (quiz_info[i][1][e]['Sin Actividad/Estático'] == "desacuerdo") {
                let value = array[e].get('Sin Actividad/Estático')
                value[1] += VALUE;
            }else if (quiz_info[i][1][e]['Sin Actividad/Estático'] == "neutro") {
                let value = array[e].get('Sin Actividad/Estático')
                value[2] += VALUE;                
            }else if (quiz_info[i][1][e]['Sin Actividad/Estático'] == "acuerdo") {
                let value = array[e].get('Sin Actividad/Estático')
                value[3] += VALUE;
            }else if (quiz_info[i][1][e]['Sin Actividad/Estático'] == "muy_acuerdo") {
                let value = array[e].get('Sin Actividad/Estático')
                value[4] += VALUE;
            }
            if (quiz_info[i][1][e]['Desagradable/Molesto'] == "muy_desacuerdo") {
                let value = array[e].get('Desagradable/Molesto')
                value[0] += VALUE;
            }else if (quiz_info[i][1][e]['Desagradable/Molesto'] == "desacuerdo") {
                let value = array[e].get('Desagradable/Molesto')
                value[1] += VALUE;
            }else if (quiz_info[i][1][e]['Desagradable/Molesto'] == "neutro") {
                let value = array[e].get('Desagradable/Molesto')
                value[2] += VALUE;                
            }else if (quiz_info[i][1][e]['Desagradable/Molesto'] == "acuerdo") {
                let value = array[e].get('Desagradable/Molesto')
                value[3] += VALUE;
            }else if (quiz_info[i][1][e]['Desagradable/Molesto'] == "muy_acuerdo") {
                let value = array[e].get('Desagradable/Molesto')
                value[4] += VALUE;
            }

            if (quiz_info[i][1][e]['Con Actividad/Dinámico'] == "muy_desacuerdo") {
                let value = array[e].get('Con Actividad/Dinámico')
                value[0] += VALUE;
            }else if (quiz_info[i][1][e]['Con Actividad/Dinámico'] == "desacuerdo") {
                let value = array[e].get('Con Actividad/Dinámico')
                value[1] += VALUE;
            }else if (quiz_info[i][1][e]['Con Actividad/Dinámico'] == "neutro") {
                let value = array[e].get('Con Actividad/Dinámico')
                value[2] += VALUE;                
            }else if (quiz_info[i][1][e]['Con Actividad/Dinámico'] == "acuerdo") {
                let value = array[e].get('Con Actividad/Dinámico')
                value[3] += VALUE;
            }else if (quiz_info[i][1][e]['Con Actividad/Dinámico'] == "muy_acuerdo") {
                let value = array[e].get('Con Actividad/Dinámico')
                value[4] += VALUE;
            }

            if (quiz_info[i][1][e]['En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?'] == "muy_malo") {
                let value = array[e].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')
                value[0] += VALUE;
            }else if (quiz_info[i][1][e]['En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?'] == "malo") {
                let value = array[e].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')
                value[1] += VALUE;
            }else if (quiz_info[i][1][e]['En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?'] == "neutro") {
                let value = array[e].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')
                value[2] += VALUE;                
            }else if (quiz_info[i][1][e]['En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?'] == "bueno") {
                let value = array[e].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')
                value[3] += VALUE;
            }else if (quiz_info[i][1][e]['En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?'] == "muy_bueno") {
                let value = array[e].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')
                value[4] += VALUE;
            }

            if (quiz_info[i][1][e]['¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?'] == "insoportable") {
                let value = array[e].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')
                value[0] += VALUE;
            }else if (quiz_info[i][1][e]['¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?'] == "molesto") {
                let value = array[e].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')
                value[1] += VALUE;
            }else if (quiz_info[i][1][e]['¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?'] == "bien") {
                let value = array[e].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')
                value[2] += VALUE;                
            }else if (quiz_info[i][1][e]['¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?'] == "bastante") {
                let value = array[e].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')
                value[3] += VALUE;
            }else if (quiz_info[i][1][e]['¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?'] == "encanta") {
                let value = array[e].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')
                value[4] += VALUE;
            }

            if (quiz_info[i][1][e]['¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?'] == "comercial") {
                let value = array[e].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')
                value[0] += VALUE;
            }else if (quiz_info[i][1][e]['¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?'] == "residencial") {
                let value = array[e].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')
                value[1] += VALUE;
            }else if (quiz_info[i][1][e]['¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?'] == "recreativo") {
                let value = array[e].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')
                value[2] += VALUE;                
            }else if (quiz_info[i][1][e]['¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?'] == "otro") {
                let value = array[e].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')
                value[3] += VALUE;                
            }

            if (quiz_info[i][1][e]['¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?'] == "invierno") {
                let value = array[e].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')
                value[0] += VALUE;
            }else if (quiz_info[i][1][e]['¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?'] == "verano") {
                let value = array[e].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')
                value[1] += VALUE;
            }else if (quiz_info[i][1][e]['¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?'] == "otro") {
                let value = array[e].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')
                value[2] += VALUE;                
            }

        }
    }
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

                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Malo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')[1]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Ni bueno ni malo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')[2]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Bueno</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')[3]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Muy bueno</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')[4]
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>'; 
        }else if(pregunta_actual == "¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?"){
            string += '<tr>';
            string +='<th>Me parece insoportable y no aguantaría ni 10 minutos.</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')[0]
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Me molesta un poco y no permanecería mucho tiempo ahí.</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')[1]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Para un rato está bien, pero sin más.</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')[2]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Pasaría bastante tiempo en un lugar como este.</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')[3]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Me encanta y pasaría el resto de mi vida en este lugar.</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')[4]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';
        }else if(pregunta_actual == "¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?"){
            string += '<tr>';
            string +='<th>Comercial</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')[0]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Residencial</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')[1]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Recreativo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')[2]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Otro</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')[3]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';
        }else if(pregunta_actual == "¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?"){
            string += '<tr>';
            string +='<th>Invierno</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')[0]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Verano</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')[1]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Otro</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')[2]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';
        }else{
            string += '<tr>';
            string +='<th>Muy en Desacuerdo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get(pregunta_actual)[0]
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string += '<tr>';
            string +='<th>En Desacuerdo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get(pregunta_actual)[1]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string += '<tr>';
            string +='<th>Neutral</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get(pregunta_actual)[2]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string += '<tr>';
            string +='<th>De acuerdo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get(pregunta_actual)[3]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string += '<tr>';
            string +='<th>Muy de acuerdo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get(pregunta_actual)[4]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';
        }
        string +='</table>\n\n';    
    }
    return string;
}

function last_user_results() {
    const number_people = quiz_info.length;
    const number_questions = quiz_info[0][2].length;
    const VALUE = 1/number_people;

    /* Crearemos un array que contendrá las partes de las preguntas.*/

    var array = new Array()
    let keys = Object.keys(quiz_info[0][2][0]);
    let questionChanged = Object.entries(keys)[0][1]
    array.push(CreateMapFunction.create_map_last_user_questions(questionChanged))
    string = "";
    for (let i = 0; i < number_people; i++) {
        if (quiz_info[i][2][0][questionChanged] == "no") {
            let value = array[0].get(questionChanged)
            value[0] += VALUE;
        }else if(quiz_info[i][2][0][questionChanged] == "si_poco"){
            let value = array[0].get(questionChanged)
            value[1] += VALUE;
        }else if(quiz_info[i][2][0][questionChanged] == "si_neutro"){
            let value = array[0].get(questionChanged)
            value[2] += VALUE;
        }else if(quiz_info[i][2][0][questionChanged] == "si_mucho"){
            let value = array[0].get(questionChanged)
            value[3] += VALUE;
        }

        if (quiz_info[i][2][0]['¿Tienes algún tipo de conocimiento o formación en Acústica?'] == "no") {
            let value = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')
            value[0] += VALUE;
        }else if (quiz_info[i][2][0]['¿Tienes algún tipo de conocimiento o formación en Acústica?'] == "si_poco") {
            let value = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')
            value[1] += VALUE;
        }else if (quiz_info[i][2][0]['¿Tienes algún tipo de conocimiento o formación en Acústica?'] == "si_mucho") {
            let value = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')
            value[2] += VALUE;                
        }
    }
    string += "<h3> Preguntas sobre la relación del Participante con el Escenario </h3>"
    var preguntas = array[0].keys();
    // Crearemos tantas tablas como preguntas 
    for (let i = 0; i < array[0].size; i++) {
        string +='<table class="table_global_results">';
        let pregunta_actual = preguntas.next().value
        string += '<caption id="caption_table"><h3>'+pregunta_actual+'</h3></caption>\n';
        string += '<tr><th scope="col">Posibles Respuestas</th>';
        string += '<th>Número</th><th>Porcentaje</th>';
        string += '</tr>';

        if (pregunta_actual == "¿Tienes algún tipo de conocimiento o formación en Acústica?") {
            string += '<tr>';
            string +='<th>No, no tengo ningún conocimiento sobre Acústica.</th>';
            let number = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')[0]
            string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            string += '</tr>';

            string +='<th>Sí, soy/he sido estudiante de materias relacionadas con la Acústica.</th>'
            number = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')[1]
            string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            string += '</tr>';

            string +='<th>Sí, tengo conocimientos sólidos sobre Acústica.</th>'
            number = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')[2]
            string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            string += '</tr>';
        }else{
            string += '<tr>';
            string +='<th>No, no he ido nunca.</th>';
            let number = array[0].get(questionChanged)[0]
            string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            string += '</tr>';

            string +='<th>Sí, he estado una o dos veces.</th>'
            number = array[0].get(questionChanged)[1]
            string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            string += '</tr>';

            string +='<th>Sí, la visito regularmente cada año.</th>'
            number = array[0].get(questionChanged)[2]
            string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            string += '</tr>';

            string +='<th>Sí, soy residente en la isla.</th>'
            number = array[0].get(questionChanged)[3]
            string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            string += '</tr>';
        }
        string +='</table>\n\n';    
    }
    return string
}

module.exports = {
    create_table_info_init_string,
    add_data_table_info,
    WHO_score_global_results,
    places_global_results,
    last_user_results
}