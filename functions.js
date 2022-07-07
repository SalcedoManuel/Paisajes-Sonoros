function show_wrapper(){
    document.getElementById("wrapper0").style.display = "block";
    document.getElementById("wrapper1").style.display = "block";
    document.getElementById("wrapper2").style.display = "block";
    document.getElementById("wrapper3").style.display = "block";
    document.getElementById("wrapper4").style.display = "block";
}
function ocultar_wrapper(){
    document.getElementById("wrapper0").style.display = "none";
    document.getElementById("wrapper1").style.display = "none";
    document.getElementById("wrapper2").style.display = "none";
    document.getElementById("wrapper3").style.display = "none";
    document.getElementById("wrapper4").style.display = "none";
}
function restart_creation() {
    file_table.style.display = "none";
    document.getElementById("wrapper_files").innerHTML = "";
    ocultar_wrapper();
    end_boton.style.display = "none";

    document.getElementById("zero").style.display = "block";
    document.getElementById("one_option").style.display = "block";

    document.getElementById("place_to_evaluate").innerHTML = "¿Cuántos lugares se van a evaluar? :";
    document.getElementById("sistems_recording").innerHTML = "Sistemas de grabación por cada lugar :"; 
    let message = '<button onclick="functions_extras.start_creation()" style="width:fit-content">Iniciar recogida de archivos</button>'     
    document.getElementById("button_start_creation").innerHTML = message;
    document.getElementById("space_buttons_creation").innerHTML = "<br><br><br><br><br>";
}

function start_creation() {
    if (number_examples > 0) {
        document.getElementById("zero").style.display = "none";
        document.getElementById("one_option").style.display = "none";
        document.getElementById("place_to_evaluate").innerHTML += " <strong>" + number_places + "</strong>  .";
        document.getElementById("sistems_recording").innerHTML += " <strong>" + number_sistems + "</strong>"; 
        let message = '<button onclick="functions_extras.restart_creation()" style="width:fit-content">Modificar número de audios</button>'     
        document.getElementById("button_start_creation").innerHTML = message;
        document.getElementById("space_buttons_creation").innerHTML = "<br><br>";
        // Activamos que aparezcan el resto de opciones.
        file_table.style.display = "block";
        show_wrapper();
        end_boton.style.display = "block";
    }else{
        back.innerHTML = "El número de lugares seleccionados es cero, cosa imposible.";
        file_table.style.display = "none";
        ocultar_wrapper();
        end_boton.style.display = "none";
    }
}

function checking_quiz() {
    var questions = [];
    var Part1_Traffic = document.getElementById("Part1_Traffic");
    questions.push(Part1_Traffic.checked);
    var Part1_Other = document.getElementById("Part1_Other");
    questions.push(Part1_Other.checked)
    var Part1_Human = document.getElementById("Part1_Human");
    questions.push(Part1_Human.checked);
    var Part1_Natural = document.getElementById("Part1_Natural");
    questions.push(Part1_Natural.checked);

    var Part2_Pleasant = document.getElementById("Part2_Pleasant");
    questions.push(Part2_Pleasant.checked);
    var Part2_Chaotic = document.getElementById("Part2_Chaotic");
    questions.push(Part2_Chaotic.checked);
    var Part2_Vibrant = document.getElementById("Part2_Vibrant");
    questions.push(Part2_Vibrant.checked);
    var Part2_Uneventful = document.getElementById("Part2_Uneventful");
    questions.push(Part2_Uneventful.checked);
    var Part2_Calm = document.getElementById("Part2_Calm");
    questions.push(Part2_Calm.checked);
    var Part2_Annoying = document.getElementById("Part2_Annoying");
    questions.push(Part2_Annoying.checked);
    var Part2_Eventful = document.getElementById("Part2_Eventful");
    questions.push(Part2_Eventful.checked);
    
    var Part3 = document.getElementById("Part3");
    questions.push(Part3.checked);

    var Part4 = document.getElementById("Part4");
    questions.push(Part4.checked);
    return questions;
}

module.exports = {
    restart_creation,
    start_creation,
    show_wrapper,
    ocultar_wrapper,
    checking_quiz
}