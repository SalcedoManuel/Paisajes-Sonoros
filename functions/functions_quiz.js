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
        reply += '<table class="default"><caption><h3>'+places_questions[pos]+'</h3></caption>';
        //-- Escribimos las opciones y la tabla.
        reply += '<tr><th scope="col"></th><th>Muy en desacuerdo</th><th>En desacuerdo</th><th>Neutral</th><th>De acuerdo</th><th>Muy de acuerdo</th></tr>';
        
        reply += '<tr><th>Agradable</th>'+'<td><input type="radio" name="pleasant" value="muy_desacuerdo" id="muy_desacuerdo_pleasant" checked></td>'+
                                      '<td><input type="radio" name="pleasant" value="desacuerdo" id="desacuerdo_pleasant"></td>'+
                                      '<td><input type="radio" name="pleasant" value="neutro" id="neutro_pleasant"></td>'+
                                      '<td><input type="radio" name="pleasant" value="acuerdo" id="acuerdo_pleasant"></td>'+
                                      '<td><input type="radio" name="pleasant" value="muy_acuerdo" id="muy_acuerdo_pleasant"></td>'+'</tr>';
        //-- Introducimos la fila de la Sin Actividad
        reply += '<tr><th>Sin Actividad</th>'+'<td><input type="radio" name="uneventful" value="muy_desacuerdo" id="muy_desacuerdo_uneventful" checked></td>'+
                                      '<td><input type="radio" name="uneventful" value="desacuerdo" id="desacuerdo_uneventful"></td>'+
                                      '<td><input type="radio" name="uneventful" value="neutro" id="neutro_uneventful"></td>'+
                                      '<td><input type="radio" name="uneventful" value="acuerdo" id="acuerdo_uneventful"></td>'+
                                      '<td><input type="radio" name="uneventful" value="muy_acuerdo" id="muy_acuerdo_uneventful"></td>'+'</tr>'

        reply += '</table>';
    }
    if (places_questions[pos] == "En general, ¿cómo describirías la calidad acústica del entorno que escuchas?") {
        reply += pos + ". <strong>" + places_questions[pos] + "</strong>:";
        reply += "<br>";
        reply += ' <input type="radio" name="places1" value="ninguna" id="ninguna_place_option" checked>Ninguna</input>';
        reply += ' <input type="radio" name="places1" value="poca" id="poca_place_option">Poca</input>';
        reply += ' <input type="radio" name="places1" value="aveces" id="aveces_place_option">A veces</input>';
        reply += ' <input type="radio" name="places1" value="frecuentemente" id="frecuentemente_place_option">Frecuentemente</input>';
        reply += ' <input type="radio" name="places1" value="diariamente" id="diariamente_place_option">Diariamente</input>';
    }
    if (places_questions[pos] == "¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?") {
        reply += pos + ". <strong>" + places_questions[pos] + "</strong>:";
        reply +="<br>";
        reply += '  <input type="radio" name="places2" value="yes" id="yes2_place_option" checked>Sí</input>';
        reply += '  <input type="radio" name="places2" value="no" id="no2_place_option">No</input>';
    }
    if (places_questions[pos] == "¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?") {
        reply += pos + ". <strong>" + places_questions[pos] + "</strong>:";
        reply += '  <input type="radio" name="places3" value="yes" id="yes3_place_option" checked>Sí</input>';
        reply += ' <input type="radio" name="places3" value="no" id="no3_place_option"> No</input>';
    }
    if (places_questions[pos] == "¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?") {
        reply += pos + ". <strong>" + places_questions[pos] + "</strong>:";
        reply += '  <input type="radio" name="places3" value="yes" id="yes3_place_option" checked>Sí</input>';
        reply += ' <input type="radio" name="places3" value="no" id="no3_place_option"> No</input>';
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
            var hearing_score = document.getElementById("score")                
            user_object[user_questions[1]] = hearuser_ing_score;

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
            console.log(places_replies);
            // Añadimos las respuestas de este apartado al respuestas general.
            all_places_replies.push(places_replies);
            type_of_question_active = "recordings_questions";
            show_questions();
            break;
        default:
            break;
    }
}

function end_quiz() {
    // En esta función lo primero que tenemos que hacer es asegurarnos de que el usuario ha ordenado todas las tomas
    let ok_output_replys = true;
    let number_output_error = "";
    let generic_autocomplete = false;
    // Si las preguntas genéricas se han rellenado automáticamente el número de lugares y el número de grabaciones es 1.
    if (number_places == 1 && number_recordings == 1) {
        ok_output_replys = true;
        generic_autocomplete = true;
    }else{
        for (let i = 0; i < Object.keys(generic_questions).length; i++) {
            let id_text = "output"+i;
            let output = document.getElementById(id_text);
            let output_text = output.innerHTML;
            const number_elements = number_places * number_recordings;
            if (output_text.length != (number_elements)) {
                ok_output_replys = false;
                if (number_output_error.length > 0) {
                    number_output_error += ", " + (i+1);
                }else{
                    number_output_error += i+1;
                }
    
            }        
        }
    }

    if (ok_output_replys) {
        // Si se ha introducido todos los valores correctamente se procede a guardar lo mostrado en el quiz.
        // Si el número de recursos es uno, se procederá al autocompletado del apartado de preguntas genéricas.
        if (generic_autocomplete) {
            // Se guardará automáticamente el único elemento disponible
            for (let i = 0; i < Object.keys(generic_questions).length; i++) {
                let output = '11';
                generic_object[generic_questions[i+1]] = output;
            }
        }else{
            // Se procederá a leer todos los output ya revisados para guardarlos en el objecto de las preguntas genéricas.
            for (let i = 0; i < Object.keys(generic_questions).length; i++) {
                let id_text = "output"+i;
                let output = document.getElementById(id_text);
                console.log(output.innerHTML)
                generic_object[generic_questions[i+1]] = output.innerHTML;            
            }
            console.table(generic_object)
        }
        // Creamos una variable que guardará las respuestas.
        completed_quiz = new Object;
        // Guardamos las respuestas de las preguntas sobre el usuario.
        completed_quiz[0] = user_object;
        // Guardamos las respuestas de las preguntas sobre los lugares.
        completed_quiz[1] = all_places_replies;
        // Guardamos las respuestas sobre las grabaciones.
        completed_quiz[2] = all_recordings_replies;
        // Guardamos las respuestas del apartado de las preguntas genéricas.
        completed_quiz[3] = generic_object;
        console.log(completed_quiz)
        // Enviamos toda la información del escenario a la app para que ella lo trate.
        electron.ipcRenderer.invoke('completed_quiz', completed_quiz);
        // Después del envío de datos se procede a cambiar la interfaz para dar por finalizado el Cuestionario. 
        document.getElementById("wrapper_title_question").innerHTML = "<strong>Cuestionario Finalizado</strong>";
        document.getElementById("wrapper_files").innerHTML = "";
        document.getElementById("wrapper_replys").innerHTML = "";
        document.getElementById("wrapper_next").innerHTML = "";
    }else{
        // Si no se cumple la condición se le muestra al usuario una ventana con los errores que tiene.
        window.alert("Errores en la elección en los siguientes apartados ->" + number_output_error);
    }

}

module.exports = {
    add_user_questions,
    add_places_questions,
    select_option,
    next_option,
    end_quiz

}