function add_user_questions(pos) {
    let reply = "";
    if (user_questions[pos] == "¿Cuántos años tienes?") {
        reply += pos +". <strong>"+user_questions[pos] + "</strong>: ";
        reply += '<input type="text">'
    }
    if (user_questions[pos] == "¿Cuál es tu género?") {
        reply += pos + ". <strong>" + user_questions[pos] + "</strong>: ";
        reply += 'Hombre <input type="radio" name="man" id="man_user_question"></input> ';
        reply += 'Mujer <input type="radio" name="woman" id="woman_user_question"></input> ';
        reply += 'Otro <input type="radio" name="other" id="other_user_question"></input> ';
    }
    if (user_questions[pos] == "¿Tienes problemas auditivos?") {
        reply += pos + ". <strong>" + user_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="" id="yes_user_option"></input>';
        reply += 'No <input type="radio" name="" id="no_user_option"></input>';
    }
    reply += "<br>";
    return reply;
}

function add_places_questions(pos) {
    let reply = "";
    if (places_questions[pos] == "¿Conoces el escenario?") {
        reply += pos + ". <strong>" + places_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="yes" id="yes1_place_option"></input>';
        reply += 'No <input type="radio" name="no" id="no1_place_option"></input>';
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
        reply += 'Sí <input type="radio" name="yes" id="yes1_recordings_question"></input> ';
        reply += 'No <input type="radio" name="no" id="no1_recordings_question"></input> ';
    }
    if (recordings_questions[pos] == "¿Qué sonidos podrías distinguir en la toma?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Naturaleza <input type="radio" name="nature" id="nature_recordings_question"></input> ';
        reply += 'Urbano <input type="radio" name="urban" id="urban_recordings_question"></input> ';
        reply += 'Otro <input type="radio" name="other" id="other_recordings_question"></input> ';
    }
    if (recordings_questions[pos] == "¿Consideras ruidoso el audio del paisaje sonoro?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="yes" id="yes2_recordings_question"></input>';
        reply += 'No <input type="radio" name="no" id="no2_recordings_question"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras buena la calidad del audio?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="yes" id="yes3_recordings_question"></input>';
        reply += 'No <input type="radio" name="no" id="no3_recordings_question"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras realista el audio del paisaje sonoro?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="yes" id="yes4_recordings_question"></input>';
        reply += 'No <input type="radio" name="no" id="no4_recordings_question"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras alto el volumen del audio?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="yes" id="yes5_recordings_question"></input>';
        reply += 'No <input type="radio" name="no" id="no5_recordings_question"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras desagradable el audio del paisaje sonoro?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="yes" id="yes6_recordings_question"></input>';
        reply += 'No <input type="radio" name="no" id="no6_recordings_question"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras definido el audio del paisaje sonoro?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="yes" id="yes7_recordings_question"></input>';
        reply += 'No <input type="radio" name="no" id="no7_recordings_question"></input>';
    }
    if (recordings_questions[pos] == "¿Has notado espacialidad en el audio del paisaje sonoro?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="yes" id="yes8_recordings_question"></input>';
        reply += 'No <input type="radio" name="no" id="no8_recordings_question"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras que te ha gustado la toma?") {
        reply += pos + ". <strong>" + recordings_questions[pos] + "</strong>: ";
        reply += 'Sí <input type="radio" name="yes" id="yes9_recordings_question"></input>';
        reply += 'No <input type="radio" name="no" id="no9_recordings_question"></input>';
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
            // Botón que guarda 
            reply += '<button onclick="functions_quiz.select_option('+e+','+(i+1)+')">Toma'+(i+1)+'</button>';            
        }        
        reply += "<br>";
    }
    reply += "<br>";
    console.log(reply)
    return reply;
}

function select_option(question, value) {
    
    switch (question) {
        case 0:
            // De más a menos ruidosa
            generic_value[0] += value;
            break;
        case 1:
            //De más calidad a menos calidad
            generic_value[1] += value;
            break;
        case 2:
            //De más realista a menos realista
            generic_value[2] += value;
            break;
        case 3:
            //De más desagradable a menos desagradable
            generic_value[3] += value;
            break;
        case 4:
            //De más definida a menos definida
            generic_value[4] += value;
            break;
        case 5:
            //De más espacial a menos espacial
            generic_value[5] += value;
            break;
        case 6:
            //De más alta a menos alta
            generic_value[6] += value;
            break;  
        case 7:
            //De la que más te ha gustado, a la que menos
            generic_value[7] += value;
            break;         
        default:
            console.log("Error");
            break;
    }
}

function next_option(type) {
    switch (type) {
        case 0:
            type_of_question_active = "places_questions";
            show_questions();
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