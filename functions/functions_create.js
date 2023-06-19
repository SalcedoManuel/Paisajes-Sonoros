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
// Esta función resetea
function restart_creation() {
    //-- Ocultamos completamente la recogida de recursos.
    document.getElementById("file_table1").style.display = "none";
    document.getElementById("file_table2").style.display = "none";
    document.getElementById("file_table3").style.display = "none";
    document.getElementById("wrapper_files").innerHTML = "";
    //-- Ocultamos todos los contenedores.
    ocultar_wrapper();
    //-- 
    end_boton.style.display = "none";
    //-- Borramos los posibles mensajes guardados en los mensajes de información back
    document.getElementById("back").innerHTML = "";
    //-- Mostramos solo los que nos interesan.
    document.getElementById("wrapper_init").style.display = "block"
    document.getElementById("zero").style.display = "block";
    document.getElementById("one_option").style.display = "block";
    document.getElementById("button_start_creation").style.display = "block";

    document.getElementById("class_name_quiz").innerHTML = '<label><h4>Introducir nombre del Cuestionario: <input type="text" id="id_name_quiz"></h4></label><br>';
    document.getElementById("id_name_quiz").value = name_quiz;
    document.getElementById("class_online_quiz").innerHTML = '<label><h3>Seleccione la ubicación de los recursos:'+
    '<button  id="online_button" onclick="select_file_location(0)" style="width: 50px;">'+'<b>Online</b></button>'+
    '<button  id="local_button"  onclick="select_file_location(1)" style="width: 50px;"><b>Local</b></button></h3></label><br>';
    document.getElementById("place_to_evaluate").innerHTML = "¿Cuántos lugares se van a evaluar? :";
    document.getElementById("sistems_recording").innerHTML = "Sistemas de grabación por cada lugar :"; 
    let message = '<button id="button_start_creation" onclick="functions_extras.start_creation()" style="width:fit-content"><h5>Iniciar recogida de archivos</h5></button>'     
    document.getElementById("button_start_creation").innerHTML = message;
}

function start_creation() {
    document.getElementById("back").innerHTML = '';
    document.getElementById("buttons_end_page").style = 'margin:0 auto;';
    if (number_examples > 0) {
        // Desaparecen los botones para elegir escenarios "zero" y el de elegir sistemas de grabación "one_option"
        document.getElementById("zero").style.display = "none";
        document.getElementById("one_option").style.display = "none";
        // Ponemos en los siguientes elemntos las variables que antes tenían que rellenar.
        name_quiz = document.getElementById("id_name_quiz").value;
        if (name_quiz == "") {
            name_quiz = "Quiz1";
        }
        document.getElementById("class_name_quiz").innerHTML = "<label><h3>El nombre del Cuestionario es: <strong>"+name_quiz+"</strong></h3></label>"  
        let file_location_name = "";
        switch (file_location_online) {
            case true:
                file_location_name = "Online";
                break;
        
            default:
                file_location_name = "Local";
                break;
        }
        document.getElementById("class_online_quiz").innerHTML = "<label><h3>La ubicación de los recursos es "+file_location_name;
        document.getElementById("place_to_evaluate").innerHTML += " <strong>" + number_places + "</strong>  .";
        document.getElementById("sistems_recording").innerHTML += " <strong>" + number_sistems + "</strong> ."; 
        let message = '<button id="modify_button" onclick="functions_extras.restart_creation()" style="width:fit-content">Modificar número de audios</button>'     
        document.getElementById("button_start_creation").innerHTML = message;
        // Activamos que aparezcan el resto de opciones.
        console.log(number_places)
        if (file_location_name == "Online") {
            switch (number_places) {
                case 1:
                    document.getElementById("online_table1").style.display = "block";
                    break;
                case 2:
                    document.getElementById("online_table1").style.display = "block";
                    document.getElementById("online_table2").style.display = "block";
                    break;
                default:
                    document.getElementById("online_table1").style.display = "block";
                    document.getElementById("online_table2").style.display = "block";
                    document.getElementById("online_table3").style.display = "block";
                    break;
            }
            for (let i = 0; i < number_places; i++) {
                for (let e = 0; e < number_sistems; e++) {
                    let text_video = "online_option"+(i+1)+"_video"+(e+1);
                    document.getElementById(text_video).style.display = "block";
                }
            }
        }else{
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
        }

        
        show_wrapper();
        end_boton.style.display = "block";
        if (file_location_name == "Local") {
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
        }
        
    }else{
        back.innerHTML = '<h2 style="text-align:center;">El número de lugares seleccionados es cero, cosa imposible.</h2>';
        file_table.style.display = "none";
        ocultar_wrapper();
        end_boton.style.display = "none";
    }
}

module.exports = {
    restart_creation,
    start_creation,
    show_wrapper,
    ocultar_wrapper
}