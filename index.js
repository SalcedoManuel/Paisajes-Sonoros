const electron = require('electron');

console.log("Hola desde el proceso de la web...");

var wrapper1 = document.getElementById("wrapper1");
var wrapper2 = document.getElementById("wrapper2");
var wrapper3 = document.getElementById("wrapper3");
var wrapper4 = document.getElementById("wrapper4");

var back = document.getElementById("back");

//-- Obtener elementos de la interfaz
const home = document.getElementById("home");
const btn_create = document.getElementById("btn_create");
const btn_quiz = document.getElementById("btn_quiz");
const btn_show = document.getElementById("btn_show");

const display = document.getElementById("display");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const print = document.getElementById("print");

const input = document.getElementById('inputFileServer');
//-- Acceder a la API de node para obtener la info
//-- Sólo es posible si nos han dado permisos desde
//-- el proceso princpal
info1.textContent = process.arch;
info2.textContent = process.platform;
info3.textContent = process.cwd();

// Variables que marcan las ubicaciones de los archivos.
var audio_files = [];
var video_files = [];
var imagen_file = [];


function cambiarFile(number){

    if(input.files && input.files[0])
        console.log("File Seleccionado : ", input.files[0]);
        if (input.files[0].type.split("/")[0] == "imagen") {
            console.log("Es una imagen");
        }else if (input.files[0].type.split("/")[0] == "video") {
            console.log("Es una video");
        }else if (input.files[0].type.split("/")[0] == "audio") {
            console.log("Es una audio");
        }
}


function create_quiz() {
    var ejemplos = [];
    var audio0 = document.getElementById("audio0").value;
    ejemplos.push(audio0);
    var audio1 = document.getElementById("audio1").value;
    ejemplos.push(audio1);
    var audio2 = document.getElementById("audio2").value;
    ejemplos.push(audio2);
    var audio3 = document.getElementById("audio3").value;
    ejemplos.push(audio3);
    console.log(ejemplos);

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

    wrapper1.style.display = "none";
    wrapper2.style.display = "none";
    wrapper3.style.display = "none";
    wrapper4.style.display = "none";

    back.innerHTML = "Cuestionario creado. Vuelva al menú principal.";
    console.log(questions);
    electron.ipcRenderer.invoke('test',questions);
}







home.onclick = () => {
    console.log("Creamos un nuevo Cuestionario");
    //-- Enviar mensaje al proceso principal
    electron.ipcRenderer.invoke('home', "Vuelta a la página principal");
}

btn_create.onclick = () => {

    console.log("Creamos un nuevo Cuestionario");

    //-- Enviar mensaje al proceso principal
    electron.ipcRenderer.invoke('create', "NUEVO CUESTIONARIO DE PAISAJES SONOROS.");
}

btn_quiz.onclick = () => {

    console.log("Rellenamos el Cuestionario");

    //-- Enviar mensaje al proceso principal
    electron.ipcRenderer.invoke('quiz', "RELLENAR CUESTIONARIO DE PAISAJES SONOROS.");
}

btn_show.onclick = () => {

    console.log("Mostramos los resultados del Cuestionario");

    //-- Enviar mensaje al proceso principal
    electron.ipcRenderer.invoke('show', "RESULTADO CUESTIONARIO DE PAISAJES SONOROS.");
}

btn_test.onclick = () => {
    display.innerHTML += "TEST! ";
    console.log("Botón apretado!");

    //-- Enviar mensaje al proceso principal
    electron.ipcRenderer.invoke('test', "MENSAJE DE PRUEBA: Boton apretado");
}

//-- Mensaje recibido del proceso MAIN
electron.ipcRenderer.on('print', (event, message) => {
    console.log("Recibido: " + message);
    print.textContent = message;
  });