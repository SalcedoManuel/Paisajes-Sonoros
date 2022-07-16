function add_user_questions(pos) {
    let reply = "";
    if (user_questions[pos] == "¿Cuántos años tienes?") {
        reply += pos +". "+user_questions[pos] + ": ";
        reply += '<input type="text">'
    }
    if (user_questions[pos] == "¿Cuál es tu género?") {
        reply += pos + ". " + user_questions[pos] + ": ";
        reply += 'Hombre <input type="radio" name="man" id="man_user_question"></input> ';
        reply += 'Mujer <input type="radio" name="woman" id="woman_user_question"></input> ';
        reply += 'Otro <input type="radio" name="other" id="other_user_question"></input> ';
    }
    if (user_questions[pos] == "¿Tienes problemas auditivos?") {
        reply += pos + ". " + user_questions[pos] + ": ";
        reply += 'Sí <input type="radio" name="" id="yes_user_option"></input>';
        reply += 'No <input type="radio" name="" id="no_user_option"></input>';
    }
    reply += "<br>";
    return reply;
}

function add_places_questions(pos) {
    let reply = "";
    if (places_questions[pos] == "¿Conoces el escenario?") {
        reply += pos + ". " + places_questions[pos] + ": ";
        reply += 'Sí <input type="radio" name="yes" id="yes1_place_option"></input>';
        reply += 'No <input type="radio" name="no" id="no1_place_option"></input>';
    }
    if (places_questions[pos] == "¿Cuál es la frecuencia de paso por él?") {
        reply += pos + ". " + places_questions[pos] + ": ";
        reply += 'Ninguna <input type="radio" name="ninguna" id="ninguna_place_option"></input>';
        reply += 'Poca <input type="radio" name="poca" id="poca_place_option"></input>';
        reply += 'A veces <input type="radio" name="aveces" id="aveces_place_option"></input>';
        reply += 'Frecuentemente <input type="radio" name="frecuentemente" id="frecuentemente_place_option"></input>';
        reply += 'Diariamente <input type="radio" name="diariamente" id="diariamente_place_option"></input>';
    }
    if (places_questions[pos] == "Cuando lo has transitado, ¿Has prestado atención al sonido que te rodeaba?") {
        reply += pos + ". " + places_questions[pos] + ": ";
        reply += 'Sí <input type="radio" name="" id="yes2_place_option"></input>';
        reply += 'No <input type="radio" name="" id="no2_place_option"></input>';
    }
    if (places_questions[pos] == "¿Las grabaciones se asemejan a tu recuerdo del escenario?") {
        reply += pos + ". " + places_questions[pos] + ": ";
        reply += 'Sí <input type="radio" name="" id="yes3_place_option"></input>';
        reply += 'No <input type="radio" name="" id="no3_place_option"></input>';
    }
    reply += "<br>";
    return reply;
}

function add_recordings_questions(pos) {
    let reply = "";
    if (recordings_questions[pos] == "¿Buena definición?") {
        reply += pos +". "+recordings_questions[pos] + ": ";
        reply += '<input type="text">'
    }
    if (recordings_questions[pos] == "¿Qué sonidos podrías distinguir en la toma?") {
        reply += pos + ". " + recordings_questions[pos] + ": ";
        reply += 'Hombre <input type="radio" name="man" id="man_user_question"></input> ';
        reply += 'Mujer <input type="radio" name="woman" id="woman_user_question"></input> ';
        reply += 'Otro <input type="radio" name="other" id="other_user_question"></input> ';
    }
    if (recordings_questions[pos] == "¿Consideras ruidoso el audio del paisaje sonoro?") {
        reply += pos + ". " + recordings_questions[pos] + ": ";
        reply += 'Sí <input type="radio" name="" id="yes_user_option"></input>';
        reply += 'No <input type="radio" name="" id="no_user_option"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras buena la calidad del audio?") {
        reply += pos + ". " + recordings_questions[pos] + ": ";
        reply += 'Sí <input type="radio" name="" id="yes_user_option"></input>';
        reply += 'No <input type="radio" name="" id="no_user_option"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras realista el audio del paisaje sonoro?") {
        reply += pos + ". " + recordings_questions[pos] + ": ";
        reply += 'Sí <input type="radio" name="" id="yes_user_option"></input>';
        reply += 'No <input type="radio" name="" id="no_user_option"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras alto el volumen del audio?") {
        reply += pos + ". " + recordings_questions[pos] + ": ";
        reply += 'Sí <input type="radio" name="" id="yes_user_option"></input>';
        reply += 'No <input type="radio" name="" id="no_user_option"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras desagradable el audio del paisaje sonoro?") {
        reply += pos + ". " + recordings_questions[pos] + ": ";
        reply += 'Sí <input type="radio" name="" id="yes_user_option"></input>';
        reply += 'No <input type="radio" name="" id="no_user_option"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras definido el audio del paisaje sonoro?") {
        reply += pos + ". " + recordings_questions[pos] + ": ";
        reply += 'Sí <input type="radio" name="" id="yes_user_option"></input>';
        reply += 'No <input type="radio" name="" id="no_user_option"></input>';
    }
    if (recordings_questions[pos] == "¿Has notado espacialidad en el audio del paisaje sonoro?") {
        reply += pos + ". " + recordings_questions[pos] + ": ";
        reply += 'Sí <input type="radio" name="" id="yes_user_option"></input>';
        reply += 'No <input type="radio" name="" id="no_user_option"></input>';
    }
    if (recordings_questions[pos] == "¿Consideras que te ha gustado la toma?") {
        reply += pos + ". " + recordings_questions[pos] + ": ";
        reply += 'Sí <input type="radio" name="" id="yes_user_option"></input>';
        reply += 'No <input type="radio" name="" id="no_user_option"></input>';
    }
    reply += "<br>";
    return reply;
}

function add_generic_questions(pos) {
    let reply = "";
    if (generic_questions[pos] == "¿Cuántos años tienes?") {
        reply += pos +". "+generic_questions[pos] + ": ";
        reply += '<input type="text">'
    }
    if (generic_questions[pos] == "¿Cuál es tu género?") {
        reply += pos + ". " + generic_questions[pos] + ": ";
        reply += 'Hombre <input type="radio" name="man" id="man_user_question"></input> ';
        reply += 'Mujer <input type="radio" name="woman" id="woman_user_question"></input> ';
        reply += 'Otro <input type="radio" name="other" id="other_user_question"></input> ';
    }
    if (generic_questions[pos] == "¿Tienes problemas auditivos?") {
        reply += pos + ". " + generic_questions[pos] + ": ";
        reply += 'Sí <input type="radio" name="" id="yes_user_option"></input>';
        reply += 'No <input type="radio" name="" id="no_user_option"></input>';
    }
    reply += "<br>";
    return reply;
}



module.exports = {
    add_user_questions,
    add_places_questions,
    add_recordings_questions,
    add_generic_questions
}