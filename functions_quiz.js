function add_user_questions(pos) {
    let reply = "";
    if (user_questions[pos] == "¿Cuántos años tienes?") {
        reply += pos +". <strong>"+user_questions[pos] + "</strong>: ";
        reply += '<input type="number" id="age" min="16" max="120" value="18" style="width:40px">'
    }
    if (user_questions[pos] == "¿Cuál es tu género?") {
        reply += pos + ". <strong>" + user_questions[pos] + "</strong>: ";
        reply += 'Hombre <input type="radio" name="gender" value="man" id="man_user_question" checked></input> ';
        reply += 'Mujer <input type="radio" name="gender" value="woman" id="woman_user_question"></input> ';
        reply += 'Otro <input type="radio" name="gender" value="other" id="other_user_question"></input> ';
    }
    if (user_questions[pos] == "¿Tienes problemas auditivos?") {
        reply += pos + ". <strong>" + user_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="auditive_problem" value="yes" id="yes_user_option" checked></input>';
        reply += 'No <input type="radio" name="auditive_problem" value="no" id="no_user_option"></input>';
    }
    reply += "<br>";
    return reply;
}

function add_places_questions(pos) {
    let reply = "";
    if (places_questions[pos] == "¿Conoces el escenario?") {
        reply += pos + ". <strong>" + places_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="places1" value="yes" id="yes1_place_option"></input>';
        reply += 'No <input type="radio" name="places1" value="no" id="no1_place_option"></input>';
    }
    if (places_questions[pos] == "¿Cuál es la frecuencia de paso por él?") {
        reply += pos + ". <strong>" + places_questions[pos] + "</strong>: ";
        reply += 'Ninguna <input type="radio" name="ninguna" id="ninguna_place_option"></input>';
        reply += 'Poca <input type="radio" name="poca" id="poca_place_option"></input>';
        reply += 'A veces <input type="radio" name="aveces" id="aveces_place_option"></input>';
        reply += 'Frecuentemente <input type="radio" name="frecuentemente" id="frecuentemente_place_option"></input>';
        reply += 'Diariamente <input type="radio" name="diariamente" id="diariamente_place_option"></input>';
    }
    if (places_questions[pos] == "Cuando lo has transitado, ¿Has prestado atención al sonido que te rodeaba?") {
        reply += pos + ". <strong>" + places_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="" id="yes2_place_option"></input>';
        reply += 'No <input type="radio" name="" id="no2_place_option"></input>';
    }
    if (places_questions[pos] == "¿Las grabaciones se asemejan a tu recuerdo del escenario?") {
        reply += pos + ". <strong>" + places_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="" id="yes3_place_option"></input>';
        reply += 'No <input type="radio" name="" id="no3_place_option"></input>';
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
    switch (question) {
        case 0:
            // De más a menos ruidosa
            break;
        case 1:
            //De más calidad a menos calidad
            
            break;
        case 2:
            //De más realista a menos realista
            
            break;
        case 3:
            //De más desagradable a menos desagradable
            
            break;
        case 4:
            //De más definida a menos definida
            
            break;
        case 5:
            //De más espacial a menos espacial
            
            break;
        case 6:
            //De más alta a menos alta
            
            break;  
        case 7:
            //De la que más te ha gustado, a la que menos
            
            break;         
        default:
            console.log("Error");
            break;
    }
}

function next_option(type) {
    switch (type) {
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
                // Ahora se mostrarán las preguntas del lugar.
                show_questions();
            }

            break;
        case 1:
            type_of_question_active = "recordings_questions";
            show_questions();
            break;
        case 2:
            type_of_question_active = "generic_questions";
            show_questions();
            break;    
        default:
            break;
    }
}

function end_quiz(params) {
    document.getElementById("wrapper_title_question").innerHTML = "<strong>Cuestionario Finalizado</strong>";
    document.getElementById("wrapper_files").innerHTML = "";
    document.getElementById("wrapper_replys").innerHTML = "";
    document.getElementById("wrapper_next").innerHTML = "";
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