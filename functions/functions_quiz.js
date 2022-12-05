const { fstat } = require("original-fs");

function add_user_questions(pos) {
    let reply = "";
    if (user_questions[pos] == "Introduce aquí tu puntaje auditivo obtenido en el test hearWHO") {
        reply += pos +". <strong>"+user_questions[pos] + "</strong>:";
        reply += '&nbsp;&nbsp;';
        reply += '<input type="number" id="score" min="0" max="100" value="75" style="width:35px;text-align:center;">';
    }
    reply += "<br><br>";
    return reply;
}

function add_places_questions(pos) {
    let reply = "";
    if (places_questions[pos] == "¿En qué medida estás de acuerdo o en desacuerdo con los siguientes 8 adjetivos como descriptores del entorno acústico que escuchas?") {
        reply = '<h3>Evaluación de la calidad acústica</h3>';
        //-- Escribimos la pregunta.
        reply += '<table class="default"><caption><h3>1.'+places_questions[pos]+'</h3></caption>';
        //-- Escribimos las opciones y la tabla.
        reply += '<tr><th scope="col"></th><th>Muy en desacuerdo</th><th>En desacuerdo</th><th>Neutral</th><th>De acuerdo</th><th>Muy de acuerdo</th></tr>';
        //-- Introducimos la fila de Agradable.
        reply += '<tr><th>Agradable</th>'+'<td><input type="radio" name="places0" value="muy_desacuerdo" id="places0" checked></td>'+
                                      '<td><input type="radio" name="places0" value="desacuerdo" id="places0"></td>'+
                                      '<td><input type="radio" name="places0" value="neutro" id="places0"></td>'+
                                      '<td><input type="radio" name="places0" value="acuerdo" id="places0"></td>'+
                                      '<td><input type="radio" name="places0" value="muy_acuerdo" id="places0"></td>'+'</tr>';
        //-- Introducimos la fila de la Sin Actividad
        reply += '<tr><th>Sin Actividad</th>'+'<td><input type="radio" name="places1" value="muy_desacuerdo" id="places1" checked></td>'+
                                      '<td><input type="radio" name="places1" value="desacuerdo" id="places1"></td>'+
                                      '<td><input type="radio" name="places1" value="neutro" id="places1"></td>'+
                                      '<td><input type="radio" name="places1" value="acuerdo" id="places1"></td>'+
                                      '<td><input type="radio" name="places1" value="muy_acuerdo" id="places1"></td>'+'</tr>';
        //-- Introducimos la fila Desagradable
        reply += '<tr><th>Desagradable</th>'+'<td><input type="radio" name="places2" value="muy_desacuerdo" id="places2" checked></td>'+
                                    '<td><input type="radio" name="places2" value="desacuerdo" id="places2"></td>'+
                                    '<td><input type="radio" name="places2" value="neutro" id="places2"></td>'+
                                    '<td><input type="radio" name="places2" value="acuerdo" id="places2"></td>'+
                                    '<td><input type="radio" name="places2" value="muy_acuerdo" id="places2"></td>'+'</tr>';
  
        //-- Introducimos la fila Actividad
        reply += '<tr><th>Actividad / Dinámico</th>'+'<td><input type="radio" name="places3" value="muy_desacuerdo" id="places3" checked></td>'+
                                    '<td><input type="radio" name="places3" value="desacuerdo" id="places3"></td>'+
                                    '<td><input type="radio" name="places3" value="neutro" id="places3"></td>'+
                                    '<td><input type="radio" name="places3" value="acuerdo" id="places3"></td>'+
                                    '<td><input type="radio" name="places3" value="muy_acuerdo" id="places3"></td>'+'</tr>';
        //-- C
        reply += '</table>';
    }
    if (places_questions[pos] == "En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?") {
        reply += pos + ". <strong>" + places_questions[pos] + "</strong>:";
        //--Creamos la tabla.
        reply += '<table><tr><th scope="col"></th><th>Muy malo</th><th>Malo</th><th>Ni bueno ni malo</th><th>Bueno</th><th>Muy bueno</th></tr>';
        //--Introducimos las opciones
        reply += '<tr><th>Escoge una opción</th><td><input type="radio" name="places4" value="muy_malo" id="places4" checked></td>'+
                                                '<td><input type="radio" name="places4" value="malo" id="places4"></td>'+
                                                '<td><input type="radio" name="places4" value="neutro" id="places4"></td>'+
                                                '<td><input type="radio" name="places4" value="bueno" id="places4"></td>'+
                                                '<td><input type="radio" name="places4" value="muy_bueno" id="places4"></td>'+'</tr>';
        reply += '<table>';
    }
    if (places_questions[pos] == "¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?") {
        reply += pos + ". <strong>" + places_questions[pos] + "</strong>:";
        reply +="<br>";
        reply += '  <input type="radio" name="places5" value="insoportable" id="places5" checked>Me parece insoportable y no aguantaría ni 10 minutos.</input><br>';
        reply += '  <input type="radio" name="places5" value="molesto" id="places5">Me molesta un poco y no permanecería mucho tiempo ahí.</input><br>';
        reply += '  <input type="radio" name="places5" value="bien" id="places5">Para un rato está bien, pero sin más.</input><br>';
        reply += '  <input type="radio" name="places5" value="bastante" id="places5">Pasaría bastante tiempo en un lugar como este.</input><br>';
        reply += '  <input type="radio" name="places5" value="encanta" id="places5">Me encanta y pasaría el resto de mi vida en este lugar.</input>';
    }
    if (places_questions[pos] == "¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?") {
        reply += pos + ". <strong>" + places_questions[pos] + "</strong>:";
        reply +="<br>";
        reply += ' <input type="radio" name="places6" value="comercial" id="places6" checked>Comercial</input><br>';
        reply += ' <input type="radio" name="places6" value="residencial" id="places6">Residencial</input><br>';
        reply += ' <input type="radio" name="places6" value="recreativo" id="places6">Recreativo</input><br>';
        reply += ' <input type="radio" name="places6" value="otro" id="places6">Otro</input>';
    }
    if (places_questions[pos] == "¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?") {
        reply += pos + ". <strong>" + places_questions[pos] + "</strong>:";
        reply += '<br>'
        reply += '<input type="radio" name="places7" value="invierno" id="places7" checked>Invierno</input><br>';
        reply += '<input type="radio" name="places7" value="verano" id="places7"> Verano</input><br>';
        reply += '<input type="radio" name="places7" value="otro" id="places7"> Otro</input>';
    }
    reply += "<br><br>";
    return reply;
}

function select_option(question, value) {

    // Con el valor question y el valor value obtenemos la salida que mostrará el orden de las respuestas.
    let id_text = "output"+question;
    let output = document.getElementById(id_text);
    console.log("Dentro: " + id_text)
    // Añadimos el valor al string.
    // Si el indexOf(value) = -1 implica que no hay ningún elemento
    if (output.innerHTML == ".") {
        output.innerHTML = value;
    }else{
        console.log("Es -1 si no esta: "+output.innerHTML.indexOf(value))
        if (output.innerHTML.indexOf(value) == -1) {
            output.innerHTML += value;
        }else{
            // Obtenemos la posición a eliminar.
            console.log("La posición del elemento a eliminar" + output.innerHTML.indexOf(value));
            // Eliminamos del string al caracter.
            let str = "";
            for (let i = 0; i < output.innerHTML.length; i++) {
                console.log(output.innerHTML[i])
                if (value != output.innerHTML[i]) {
                    str += output.innerHTML[i];
                    console.log("String con los valores: "+str)
                }                
            }
            output.innerHTML = str;
            console.log("Resultado al borrar: " + output);
            
        }
    }
}

function next_option(type) {
    switch (type) {
        // Case 0, sacar datos del las PREGUNTAS DE USUARIO.
        case 0:
            // Después de obtener los valores los guardamos.
            // Creamos un objeto que contenga la el nombre de la pregunta y la respuesta.
            date = Date().split("00 (")[0];
            user_object["Date"] = date;
            let hearing_score = document.getElementById("score")                
            user_object[user_questions[1]] = hearing_score.value;
            console.log("Valor del WHO: "+user_object[user_questions[1]])
            type_of_question_active = "places_questions";
            number_places_questions_replied = 0;
            number_recordings_questions_replied = 1;
            // Ahora se mostrarán las preguntas del lugar.
            show_questions();

            break;
        // Case 1, sacar información de las preguntas del lugar.
        case 1:
            let places = [];
            var places_replies = new Object;
            places_replies["Name_Scenary"] = name_actual_scenary;
            for (let i = 0; i < Object.keys(places_questions).length; i++) {
                let id_text = "places"+i;
                let places_list = document.getElementsByName(id_text);
                    for (let e = 0; e < places_list.length; e++) {
                        if (places_list[e].checked) {
                            places[i] = places_list[e].value;
                        }                
                    }
                places_replies[places_questions[i+1]] =  places[i];   
            }
            console.log("Replies - Places: "+places_replies);
            // Añadimos las respuestas de este apartado al respuestas general.
            all_places_replies.push(places_replies);
            show_questions();
            break;
        default:
            break;
    }
}

function end_quiz() {

    let places = [];
    var places_replies = new Object;
    places_replies["Name_Scenary"] = name_actual_scenary;
    for (let i = 0; i < Object.keys(places_questions).length; i++) {
        let id_text = "places"+i;
        let places_list = document.getElementsByName(id_text);
            for (let e = 0; e < places_list.length; e++) {
                if (places_list[e].checked) {
                    places[i] = places_list[e].value;
                }                
            }
        places_replies[places_questions[i+1]] =  places[i];   
    }
    console.log("Replies - Places: "+places_replies);
    // Añadimos las respuestas de este apartado al respuestas general.
    all_places_replies.push(places_replies);
    console.table(all_places_replies);
    
    // Creamos una variable que guardará las respuestas.
    completed_quiz = new Object;
    // Guardamos las respuestas de las preguntas sobre el usuario.
    completed_quiz[0] = user_object;
    // Guardamos las respuestas de las preguntas sobre los lugares.
    completed_quiz[1] = all_places_replies;
    console.table(completed_quiz)
    // Guardamos de manera temporal el fichero temporal
    const SAVE_JSON = "resources/quiz_savings/temporal/temporal_file.json";
    let myJSON = JSON.stringify(completed_quiz)
    fs.writeFileSync(SAVE_JSON,myJSON)
    // Después del envío de datos se procede a cambiar la interfaz para dar por finalizado el Cuestionario. 
    document.getElementById("wrapper_title_question").innerHTML = "<strong>Cuestionario Finalizado</strong>";
    document.getElementById("wrapper_files").innerHTML = '<a href="'+SAVE_JSON+'" download><button><h4>Exportar fichero</h4></button></a>';
    document.getElementById("wrapper_replys").innerHTML = '<button onclick="functions_quiz.save_file_app()">Guardar en la App</button>';
    document.getElementById("wrapper_next").innerHTML = '';

}

function save_file_app() {
    const TEMPORAL_JSON = "resources/quiz_savings/temporal/temporal_file.json";
    const TEMPORAL_JSON_FILE = fs.readFileSync(TEMPORAL_JSON)
    let temporal_quiz = JSON.parse(TEMPORAL_JSON_FILE)
    electron.ipcRenderer.invoke('completed_quiz', temporal_quiz);
    document.getElementById("wrapper_title_question").innerHTML = "<strong>Cuestionario Finalizado</strong>";
    document.getElementById("wrapper2").innerHTML = '<a href='+'"index.html"'+'><button>Volver a Inicio</button></a>';
}

module.exports = {
    add_user_questions,
    add_places_questions,
    select_option,
    next_option,
    end_quiz,
    save_file_app
}