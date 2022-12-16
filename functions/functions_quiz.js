const { fstat } = require("original-fs");

function add_user_questions(pos) {
    let reply = "";
    if (user_questions[pos] == "Introduce aquí tu puntaje auditivo obtenido en el test hearWHO") {
        reply += pos +". <strong>"+user_questions[pos] + "</strong>:";
        reply += '&nbsp;&nbsp;';
        reply += '<input type="number" id="score" min="0" max="100" value="75" style="width:35px;text-align:center;">';
        reply += '<br><h5>Si no tiene la App puede descargarsela y realziar el test leyendo el siguiente QR.</h5><br><img src="images/QR.PNG" alt="QRCODE" style="margin-left: 30% ">'
    }
    reply += "<br><br>";
    return reply;
}

function add_places_questions(pos) {
    let reply = "";
    if (places_questions[pos] == "¿En qué medida estás de acuerdo o en desacuerdo con los siguientes 8 adjetivos como descriptores del entorno acústico que escuchas?") {
        reply = '<h3>• Evaluación de la calidad acústica</h3>';
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

function create_array(list,number) {
    for (let i = 0; i < number; i++) {
        list[i] = i;        
    }
}

function random_quiz(list) {
    var i,j,k;
    for (i = list.length; i; i--) {
        j = Math.floor(Math.random() * i);
        k = list[i - 1];
        list[i - 1] = list[j];
        list[j] = k;
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
            user_object["Places_Number"] = number_places;
            user_object["Recordings_Number"] = number_recordings;
            console.log("Valor del WHO: "+user_object[user_questions[1]])
            type_of_question_active = "places_questions";
            // Aleatorizar los números para el cuestionario.
            //--- Lista con el orden de aparición tanto en lugares como en grabaciones.
            create_array(places_list,number_places)
            create_array(recordings_list,number_recordings)
            random_quiz(places_list)
            random_quiz(recordings_list)
            pos_places = 0;
            pos_recording = 0;
            console.info("Las posiciones en los array: ",pos_places,pos_recording)
            console.table(places_list)
            console.table(recordings_list)
            number_places_questions_replied = places_list[pos_places];
            number_recordings_questions_replied = recordings_list[pos_recording];
            // Ahora se mostrarán las preguntas del lugar.
            show_questions();

            break;
        // Case 1, sacar información de las preguntas del lugar.
        case 1:
            let places = [];
            var places_replies = new Object;
            //-- Guardamos el valor exacto del 
            number_places_questions_replied = places_list[pos_places];
            number_recordings_questions_replied = recordings_list[pos_recording]
            places_replies["Name_Scenary"] = name_actual_scenary;
            places_replies["Places_Number"] = number_places_questions_replied;
            places_replies["Recording_Number"] = number_recordings_questions_replied;
            //-- Número de preguntas a guardar.
            let number_answers = Object.keys(places_questions).length+3;
            for (let i = 0; i < number_answers; i++) {
                let id_text = "places"+i;
                let places_list = document.getElementsByName(id_text);
                    for (let e = 0; e < places_list.length; e++) {
                        if (places_list[e].checked) {
                            places[i] = places_list[e].value;
                        }                
                    }
                
                places_replies[places_replies_tag[i+1]] =  places[i];   
            }
            // Añadimos las respuestas de este apartado al respuestas general.
            var position = ((places_list[pos_places]*number_recordings) - 1) + (recordings_list[pos_recording]+1);
            console.log("Se guarda en la posición en el array: ",position)
            all_places_replies[position] = places_replies;
            console.table(all_places_replies)
            switch (pos_recording) {
                case (number_recordings-1):
                    console.log("Como se ha evaluado 3 posiciones cambiamos el valor de la posición en el array del lugar.")
                    if ((number_places-1) != pos_places) {
                        pos_places += 1;
                        pos_recording = 0;
                    }else{
                        number_places_questions_replied = number_recordings
                    }
                    break;
            
                default:
                    pos_recording += 1;
                    break;
            }
            number_places_questions_replied = places_list[pos_places];
            number_recordings_questions_replied = recordings_list[pos_recording]
            console.info("La nueva posición del lugar es: ",pos_places," y de la grabación es ",pos_recording)
            show_questions();
            break;
        default:
            break;
    }
}

function end_quiz() {

    let places = [];
    var places_replies = new Object;
    number_places_questions_replied = places_list[pos_places];
    number_recordings_questions_replied = recordings_list[pos_recording]
    places_replies["Name_Scenary"] = name_actual_scenary;
    places_replies["Places_Number"] = number_places_questions_replied;
    places_replies["Recording_Number"] = number_recordings_questions_replied;
    //-- Número de preguntas a guardar.
    let number_answers = Object.keys(places_questions).length+3;
    for (let i = 0; i < number_answers; i++) {
        let id_text = "places"+i;
        let places_list = document.getElementsByName(id_text);
            for (let e = 0; e < places_list.length; e++) {
                if (places_list[e].checked) {
                    places[i] = places_list[e].value;
                }                
            }
        
        places_replies[places_replies_tag[i+1]] =  places[i];   
    }
    console.table(places_replies)
    // Añadimos las respuestas de este apartado al respuestas general.
    var position = ((places_list[pos_places]*number_recordings) - 1) + (recordings_list[pos_recording]+1);
    console.log("Se guarda en la posición en el array: ",position)
    all_places_replies[position] = places_replies;
    
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

function add_support_examples() {
    var text = '<h4>Pincha en los nombres para escuchar audios de referencia y poder asociar mejor los resultados</h4><hr><div style="text-align: center;margin: 0 auto;border-bottom: 1px #ffff solid;width: 200px;">'+
                    '<div onclick="functions_quiz.show_audio(0)"><h4>Audio Agradable <img id="img_pleasant"style="width: 12px;" src="images/down-arrow.png" alt="" srcset=""></h4></div>'+
                    '<div id="support_pleasant" style="text-align: center;margin: 0 auto;width: 200px;">'+
                        '<audio controls loop style="width: 200px;"><source src="resources/examples/Pleasant/Agradable.wav"></audio>'+
                    '</div>'+
                '</div>'+
                '<div style="text-align: center;margin: 0 auto;border-bottom: 1px #ffff solid;width: 200px;">'+
                    '<div onclick="functions_quiz.show_audio(1)"><h4>Audio Sin Actividad <img id="img_uneventful"style="width: 12px;" src="images/down-arrow.png" alt="" srcset=""></h4></div>'+
                    '<div id="support_uneventful" style="text-align: center;margin: 0 auto;width: 200px;">'+
                        '<audio controls loop style="width: 200px;"><source src="resources/examples/Uneventful/No_definido.wav"></audio>'+
                    '</div>'+
                '</div>'+
                '<div style="text-align: center;margin: 0 auto;border-bottom: 1px #ffff solid;width: 200px;">'+
                    '<div onclick="functions_quiz.show_audio(2)"><h4> Audio Desagradable <img id="img_annoying"style="width: 12px;" src="images/down-arrow.png" alt="" srcset=""></h4></div>'+
                    '<div id="support_annoying" style="text-align: center;margin: 0 auto;width: 200px;">'+
                        '<audio controls loop style="width: 200px;"><source src="resources/examples/Annoying/Molesto.wav"></audio>'+
                    '</div>'+
                '</div>'+
                '<div style="text-align: center;margin: 0 auto;border-bottom: 1px #ffff solid;width: 200px;">'+
                    '<div onclick="functions_quiz.show_audio(3)"><h4> Audio Dinámico <img id="img_eventful"style="width: 12px;" src="images/down-arrow.png" alt="" srcset=""></h4></div>'+
                    '<div id="support_eventful" style="text-align: center;margin: 0 auto;width: 200px;">'+
                        '<audio controls loop style="width: 200px;"><source src="resources/examples/Eventful/Eventful.wav"></audio>'+
                    '</div>'+
                '</div>';
    document.getElementById("wrapper_support").innerHTML = text;

}

function show_audio(value) {

    var text_id = "";

    switch (value) {
        case 0:
            text_id = "support_pleasant";
            img_id = "img_pleasant";
            break;
        case 1:
            text_id = "support_uneventful";
            img_id = "img_uneventful";
            break;
        case 2:
            text_id = "support_annoying";
            img_id = "img_annoying";
            break;    
        default:
            text_id = "support_eventful";
            img_id = "img_eventful";
            break;
    }
    console.info(document.getElementById(text_id).style.display=="")
    if (document.getElementById(text_id).style.display == "") {
        document.getElementById("support_pleasant").style.display = "none";
        document.getElementById("support_uneventful").style.display = "none";
        document.getElementById("support_annoying").style.display = "none";
        document.getElementById("support_eventful").style.display = "none";
        document.getElementById(text_id).style.display = "block";
    }else if(document.getElementById(text_id).style.display == "none"){
        document.getElementById("support_pleasant").style.display = "none";
        document.getElementById("support_uneventful").style.display = "none";
        document.getElementById("support_annoying").style.display = "none";
        document.getElementById("support_eventful").style.display = "none";
        document.getElementById(text_id).style.display = "block";
    }else{
        document.getElementById("support_pleasant").style.display = "none";
        document.getElementById("support_uneventful").style.display = "none";
        document.getElementById("support_annoying").style.display = "none";
        document.getElementById("support_eventful").style.display = "none";
    }
    console.log(document.getElementById(text_id).style.display)

}

module.exports = {
    add_user_questions,
    add_places_questions,
    next_option,
    end_quiz,
    save_file_app,
    add_support_examples,
    show_audio
}