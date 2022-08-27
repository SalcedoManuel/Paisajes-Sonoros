function show_wrapper(){
    document.getElementById("wrapper0").style.display = "block";
    document.getElementById("wrapper1").style.display = "block";
    document.getElementById("wrapper2").style.display = "block";
    document.getElementById("wrapper3").style.display = "block";
    document.getElementById("wrapper4").style.display = "block";
}
function ocultar_wrapper(){
    document.getElementById("wrapper_init").style.display = "none";
    document.getElementById("button_start_creation").style.display = "none";
    document.getElementById("wrapper0").style.display = "none";
    document.getElementById("wrapper1").style.display = "none";
    document.getElementById("wrapper2").style.display = "none";
    document.getElementById("wrapper3").style.display = "none";
    document.getElementById("wrapper4").style.display = "none";
}
function restart_creation() {
    document.getElementById("file_table1").style.display = "none";
    document.getElementById("file_table2").style.display = "none";
    document.getElementById("file_table3").style.display = "none";
    document.getElementById("wrapper_files").innerHTML = "";
    ocultar_wrapper();
    end_boton.style.display = "none";

    document.getElementById("zero").style.display = "block";
    document.getElementById("one_option").style.display = "block";

    document.getElementById("class_name_quiz").innerHTML = '"<label><h4>Introducir nombre del Cuestionario: </h4><input type="text" id="id_name_quiz"></label>"';
    document.getElementById("place_to_evaluate").innerHTML = "¿Cuántos lugares se van a evaluar? :";
    document.getElementById("sistems_recording").innerHTML = "Sistemas de grabación por cada lugar :"; 
    let message = '<button onclick="functions_extras.start_creation()" style="width:fit-content">Iniciar recogida de archivos</button>'     
    document.getElementById("button_start_creation").innerHTML = message;
    document.getElementById("space_buttons_creation").innerHTML = "<br><br><br><br><br>";
}

function start_creation() {
    if (number_examples > 0) {
        // Desaparecen los botones para elegir escenarios "zero" y el de elegir sistemas de grabación "one_option"
        document.getElementById("zero").style.display = "none";
        document.getElementById("one_option").style.display = "none";
        // Ponemos en los siguientes elemntos las variables que antes tenían que rellenar.
        name_quiz = document.getElementById("id_name_quiz").value;
        document.getElementById("class_name_quiz").innerHTML = "<label><h3>El nombre del Cuestionario es: <strong>"+name_quiz+"</strong></h3></label>"  
        document.getElementById("place_to_evaluate").innerHTML += " <strong>" + number_places + "</strong>  .";
        document.getElementById("sistems_recording").innerHTML += " <strong>" + number_sistems + "</strong> ."; 
        let message = '<button id="modify_button" onclick="functions_extras.restart_creation()" style="width:fit-content">Modificar número de audios</button>'     
        document.getElementById("button_start_creation").innerHTML = message;
        // Activamos que aparezcan el resto de opciones.
        console.log(number_places)
        switch (number_places) {
            case 1:
                document.getElementById("file_table1").style.display = "block";
                break;
            case 2:
                document.getElementById("file_table1").style.display = "block";
                document.getElementById("file_table2").style.display = "block";
                break;
            default:
                document.getElementById("file_table1").style.display = "block";
                document.getElementById("file_table2").style.display = "block";
                document.getElementById("file_table3").style.display = "block";
                break;
        }
        
        show_wrapper();
        end_boton.style.display = "block";
        switch (number_sistems) {
            case 1:
                document.getElementById("recording_number_text_audio1").innerHTML = " un audio.";
                document.getElementById("recording_number_text_video1").innerHTML = " un vídeo.";
                if (number_places > 1) {
                    document.getElementById("recording_number_text_audio2").innerHTML = " un audio.";
                    document.getElementById("recording_number_text_video2").innerHTML = " un vídeo.";
                }
                if (number_places > 2) {
                    document.getElementById("recording_number_text_audio3").innerHTML = " un audio.";
                    document.getElementById("recording_number_text_video3").innerHTML = " un vídeo.";
                }
                break;
            default:
                document.getElementById("recording_number_text_audio1").innerHTML = number_sistems + " audios.";
                document.getElementById("recording_number_text_video1").innerHTML = number_sistems + " vídeos."
                if (number_places > 1) {
                    document.getElementById("recording_number_text_audio2").innerHTML = number_sistems + " audios.";
                    document.getElementById("recording_number_text_video2").innerHTML = number_sistems + " vídeos.";
                }
                if (number_places > 2) {
                    document.getElementById("recording_number_text3").innerHTML = number_sistems + " audios.";
                    document.getElementById("recording_number_text3").innerHTML = number_sistems + " vídeos.";
                }
                break;
        }
    }else{
        back.innerHTML = '<h2 style="text-align:center;">El número de lugares seleccionados es cero, cosa imposible.</h2>';
        file_table.style.display = "none";
        ocultar_wrapper();
        end_boton.style.display = "none";
    }
}

function select_every_checkbox (){
    document.getElementById("Part1_1").checked = true;
    document.getElementById("Part1_2").checked = true;
    document.getElementById("Part1_3").checked = true;

    document.getElementById("Part2_1").checked = true;
    document.getElementById("Part2_2").checked = true;
    document.getElementById("Part2_3").checked = true;
    document.getElementById("Part2_4").checked = true;

    document.getElementById("Part3_1").checked = true;
    document.getElementById("Part3_2").checked = true;
    document.getElementById("Part3_3").checked = true;
    document.getElementById("Part3_4").checked = true;
    document.getElementById("Part3_5").checked = true;
    document.getElementById("Part3_6").checked = true;
    document.getElementById("Part3_7").checked = true;
    document.getElementById("Part3_8").checked = true;
    document.getElementById("Part3_9").checked = true;
    document.getElementById("Part3_10").checked = true;

    document.getElementById("Part4_1").checked = true;    
    document.getElementById("Part4_2").checked = true;    
    document.getElementById("Part4_3").checked = true;
    document.getElementById("Part4_4").checked = true;
    document.getElementById("Part4_5").checked = true;    
    document.getElementById("Part4_6").checked = true;    
    document.getElementById("Part4_7").checked = true;
    document.getElementById("Part4_8").checked = true;
}

function checking_quiz() {
    var questions = [];
    var Part1_1 = document.getElementById("Part1_1");
    questions.push(Part1_1.checked);
    var Part1_2 = document.getElementById("Part1_2");
    questions.push(Part1_2.checked)
    var Part1_3 = document.getElementById("Part1_3");
    questions.push(Part1_3.checked);

    var Part2_1 = document.getElementById("Part2_1");
    questions.push(Part2_1.checked);
    var Part2_2 = document.getElementById("Part2_2");
    questions.push(Part2_2.checked);
    var Part2_3 = document.getElementById("Part2_3");
    questions.push(Part2_3.checked);
    var Part2_4 = document.getElementById("Part2_4");
    questions.push(Part2_4.checked);

    var Part3_1 = document.getElementById("Part3_1");
    questions.push(Part3_1.checked);
    var Part3_2 = document.getElementById("Part3_2");
    questions.push(Part3_2.checked);
    var Part3_3 = document.getElementById("Part3_3");
    questions.push(Part3_3.checked);
    var Part3_4 = document.getElementById("Part3_4");
    questions.push(Part3_4.checked);
    var Part3_5 = document.getElementById("Part3_5");
    questions.push(Part3_5.checked);
    var Part3_6 = document.getElementById("Part3_6");
    questions.push(Part3_6.checked);
    var Part3_7 = document.getElementById("Part3_7");
    questions.push(Part3_7.checked);
    var Part3_8 = document.getElementById("Part3_8");
    questions.push(Part3_8.checked);
    var Part3_9 = document.getElementById("Part3_9");
    questions.push(Part3_9.checked);
    var Part3_10 = document.getElementById("Part3_10");
    questions.push(Part3_10.checked);

    var Part4_1 = document.getElementById("Part4_1");
    questions.push(Part4_1.checked);
    var Part4_2 = document.getElementById("Part4_2");
    questions.push(Part4_2.checked);
    var Part4_3 = document.getElementById("Part4_3");
    questions.push(Part4_3.checked);
    var Part4_4 = document.getElementById("Part4_4");
    questions.push(Part4_4.checked);
    var Part4_5 = document.getElementById("Part4_5");
    questions.push(Part4_5.checked);
    var Part4_6 = document.getElementById("Part4_6");
    questions.push(Part4_6.checked);
    var Part4_7 = document.getElementById("Part4_7");
    questions.push(Part4_7.checked);
    var Part4_8 = document.getElementById("Part4_8");
    questions.push(Part4_8.checked);

    return questions;
}

module.exports = {
    restart_creation,
    start_creation,
    show_wrapper,
    ocultar_wrapper,
    checking_quiz,
    select_every_checkbox
}