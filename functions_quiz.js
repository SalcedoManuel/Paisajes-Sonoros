function add_user_questions(pos) {
    let reply = "";
    if (user_questions[pos] == "¿Cuántos años tienes?") {
        reply += pos +". <strong>"+user_questions[pos] + "</strong>:";
        reply += '<input type="number" id="age" min="16" max="120" value="18" style="width:40px">'
    }
    if (user_questions[pos] == "¿Cuál es tu género?") {
        reply += pos + ". <strong>" + user_questions[pos] + "</strong>:";
        reply += 'Hombre <input type="radio" name="gender" value="man" id="man_user_question" checked></input> ';
        reply += 'Mujer <input type="radio" name="gender" value="woman" id="woman_user_question"></input> ';
        reply += 'Otro <input type="radio" name="gender" value="other" id="other_user_question"></input> ';
    }
    if (user_questions[pos] == "¿Tienes problemas auditivos?") {
        reply += pos + ". <strong>" + user_questions[pos] + "</strong>:";
        reply += 'Sí <input type="radio" name="auditive_problem" value="yes" id="yes_user_option" checked></input>';
        reply += 'No <input type="radio" name="auditive_problem" value="no" id="no_user_option"></input>';
    }
    reply += "<br>";
    return reply;
}

function add_places_questions(pos) {
    let reply = "";
    if (places_questions[pos] == "¿Conoces el escenario?") {
        reply += pos + ". <strong>" + places_questions[pos] + "</strong>:";
        reply += 'Sí <input type="radio" name="places0" value="yes" id="yes1_place_option" checked></input>';
        reply += 'No <input type="radio" name="places0" value="no" id="no1_place_option"></input>';
    }
    if (places_questions[pos] == "¿Cuál es la frecuencia de paso por él?") {
        reply += pos + ". <strong>" + places_questions[pos] + "</strong>:";
        reply += 'Ninguna <input type="radio" name="places1" value="ninguna" id="ninguna_place_option" checked></input>';
        reply += 'Poca <input type="radio" name="places1" value="poca" id="poca_place_option"></input>';
        reply += 'A veces <input type="radio" name="places1" value="aveces" id="aveces_place_option"></input>';
        reply += 'Frecuentemente <input type="radio" name="places1" value="frecuentemente" id="frecuentemente_place_option"></input>';
        reply += 'Diariamente <input type="radio" name="places1" value="diariamente" id="diariamente_place_option"></input>';
    }
    if (places_questions[pos] == "Cuando lo has transitado, ¿Has prestado atención al sonido que te rodeaba?") {
        reply += pos + ". <strong>" + places_questions[pos] + "</strong>:";
        reply += ' Sí <input type="radio" name="places2" value="yes" id="yes2_place_option" checked></input>';
        reply += ' No <input type="radio" name="places2" value="no" id="no2_place_option"></input>';
    }
    if (places_questions[pos] == "¿Las grabaciones se asemejan a tu recuerdo del escenario?") {
        reply += pos + ". <strong>" + places_questions[pos] + "</strong>:";
        reply += ' Sí <input type="radio" name="places3" value="yes" id="yes3_place_option" checked></input>';
        reply += ' No <input type="radio" name="places3" value="no" id="no3_place_option"></input>';
    }
    reply += "<br>";
    return reply;
}

function add_recordings_questions(pos) {
    let reply = "";
    if (recordings_questions[pos] == "¿Buena definición?") {
        reply += pos +". <strong>"+recordings_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="question0" value="yes" id="yes1_recordings_question" checked></input> ';
        reply += 'No <input type="radio" name="question0" value="no" id="no1_recordings_question"></input> ';
    }
    if (recordings_questions[pos] == "¿Qué sonidos podrías distinguir en la toma?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Naturaleza <input type="radio" name="question1" value="nature" id="nature_recordings_question" checked></input> ';
        reply += 'Urbano <input type="radio" name="question1" value="urban" id="urban_recordings_question"></input> ';
        reply += 'Otro <input type="radio" name="question1" value="other" id="other_recordings_question"></input> ';
    }
    if (recordings_questions[pos] == "¿Consideras ruidoso el audio del paisaje sonoro?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="question2" value="yes" id="yes2_recordings_question" checked></input>';
        reply += 'No <input type="radio" name="question2" value="no" id="no2_recordings_question"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras buena la calidad del audio?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="question3" value="yes" id="yes3_recordings_question" checked></input>';
        reply += 'No <input type="radio" name="question3" value="no" id="no3_recordings_question"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras realista el audio del paisaje sonoro?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="question4" value="yes" id="yes4_recordings_question" checked></input>';
        reply += 'No <input type="radio" name="question4" value="no" id="no4_recordings_question"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras alto el volumen del audio?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="question5" value="yes" id="yes5_recordings_question"checked></input>';
        reply += 'No <input type="radio" name="question5" value="no" id="no5_recordings_question"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras desagradable el audio del paisaje sonoro?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="question6" value="yes" id="yes6_recordings_question" checked></input>';
        reply += 'No <input type="radio" name="question6" value="no" id="no6_recordings_question"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras definido el audio del paisaje sonoro?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="question7" value="yes" id="yes7_recordings_question" checked></input>';
        reply += 'No <input type="radio" name="question7" value="no" id="no7_recordings_question"></input>';
    }
    if (recordings_questions[pos] == "¿Has notado espacialidad en el audio del paisaje sonoro?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="question8" value="yes" id="yes8_recordings_question" checked></input>';
        reply += 'No <input type="radio" name="question8" value="no" id="no8_recordings_question"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras que te ha gustado la toma?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="question9" value="yes" id="yes9_recordings_question" checked></input>';
        reply += 'No <input type="radio" name="question9" value="no" id="no9_recordings_question"></input>';
    }
    reply += "<br>";
    return reply;
}

function add_generic_questions(pos,e) {
    let reply = "";
    console.log(generic_questions[pos].substring(0,3))
    if (generic_questions[pos].substring(0,3) == "De ") {
        reply += pos +". <strong>"+generic_questions[pos] + "</strong>:  "+"<br>";
        const number_elements = number_places * number_recordings;
        for (let i = 0; i < number_elements; i++) {
            pos = i+1;
            id_text = e+"_"+pos;
            // Botón que guarda 
            reply += '<button id="option_' + id_text + '" onclick="functions_quiz.select_option('+e+','+pos+')">Toma'+pos+'</button>';            
        }
        reply += '<p>Orden de preferencia: <div id="output'+e+'">.</div></p>'       
        reply += "<br>";
    }
    reply += "<br>";
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
            edad = document.getElementById("age").value;
            let gender_list = document.getElementsByName("gender");
            for (let i = 0; i < gender_list.length; i++) {
                if (gender_list[i].checked) {
                    gender = gender_list[i].value;
                }                
            }
            let auditive_problem_list = document.getElementsByName("auditive_problem");
            for (let i = 0; i < auditive_problem_list.length; i++) {
                if (auditive_problem_list[i].checked) {
                    auditive_problem = auditive_problem_list[i].value;   
                }
            }
            console.log(auditive_problem)
            if (auditive_problem == "yes") {
                document.getElementById("wrapper_files").innerHTML = "<p><strong>Cuestionario Finalizado: </strong> Las personas con problemas auditivos no pueden realizar este cuestionario.</p>"
                document.getElementById("wrapper_replys").innerHTML = "";
                document.getElementById("wrapper_next").innerHTML = "";
            }else{
                type_of_question_active = "places_questions";
                number_places_questions_replied = 0;
                number_recordings_questions_replied = 1;
                // Ahora se mostrarán las preguntas del lugar.
                show_questions();
            }

            break;
        // Case 1, sacar información de las preguntas del lugar.
        case 1:
            let places = [];
            var places_replies = new Object;
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
        // Case 2, sacar información por sistema de grabación.
        case 2:
            number_recordings_questions_replied += 1;
            // Si el número de páginas con respuestas a los sistemas de grabación
            // es superior al número de sistemas de grabación se cambia el tipo de pregunta.
            // Si no, se mantiene el tipo.
            if (number_recordings_questions_replied > number_recordings) {
                // El número de preguntas del lugar respondidas aumenta en uno.
                number_places_questions_replied += 1;
                number_recordings_questions_replied = 1;
                // Si ya se han respondido las preguntas de todos los lugares, se pasa automáticamente a las genéricas.
                // Si no se han respondido se pasa automáticamente a las preguntas sobre lugares.
                if (number_places_questions_replied == number_places) {
                    type_of_question_active = "generic_questions";
                }else{
                    type_of_question_active = "places_questions";
                }
            }else{
                // Si estamos aquí es porque no se han respondido a todas las preguntas sobre los sistemas de grabación.
                // Extraemos primero la información.
                type_of_question_active = "recordings_question";

            }
            
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
    if (ok_output_replys) {
        document.getElementById("wrapper_title_question").innerHTML = "<strong>Cuestionario Finalizado</strong>";
        document.getElementById("wrapper_files").innerHTML = "";
        document.getElementById("wrapper_replys").innerHTML = "";
        document.getElementById("wrapper_next").innerHTML = "";
    }else{
        window.alert("Errores en la elección en los siguientes apartados ->" + number_output_error);
    }

}

module.exports = {
    add_user_questions,
    add_places_questions,
    add_recordings_questions,
    add_generic_questions,
    select_option,
    next_option,
    end_quiz

}