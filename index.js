const electron = require('electron');

console.log("Hola desde el proceso de la web...");

var file_table = document.getElementById("file_table");
var wrapper0 = document.getElementById("wrapper0");
var wrapper1 = document.getElementById("wrapper1");
var wrapper2 = document.getElementById("wrapper2");
var wrapper3 = document.getElementById("wrapper3");
var wrapper4 = document.getElementById("wrapper4");
var end_boton = document.getElementById("end_create");


var back = document.getElementById("back");

//-- Obtener elementos de la interfaz
const home = document.getElementById("home");
const btn_create = document.getElementById("btn_create");
const btn_quiz = document.getElementById("btn_quiz");
const btn_show = document.getElementById("btn_show");

const display = document.getElementById("display");
const print = document.getElementById("print");

const input = document.getElementById('inputFileServer');


// Variables que marcan las ubicaciones de los archivos.
var audio_files = [];
var image_files = [];
var video_files = [];

// Variable que aglutinará toda la información.
var data = [];


const output = document.querySelector('.output_video');
const output_Audio = document.querySelector('.output_audio');
const myFiles = document.querySelector("#myfiles_video");
const myFiles_Audio = document.querySelector("#myfiles_audio");

//  Número de ejemplos que aparecerán en el cuestionario.
var number_examples = 0;

// Número de preguntas del Cuestionario.
const number_questions = 13;

function logFilenames(){
  // Variable que marca si los archivos añadidos son válidos o no.
  let ok_files = true;
  const fileInput = document.querySelector("#myfiles_video");
  const files = fileInput.files;
  console.log(files)
  const fileListLength = files.length;
  output.innerHTML = "";
  if (fileListLength > number_examples) {
    fileListLength = number_examples;
  }
  for (let i = 0; i < fileListLength; i++) {
    output.innerText = `${output.innerText}\n${i+1}. ${files.item(i).name}`;
    console.log(output.innerHTML)
    let mode = files.item(i).type.split("/")[0];
    if (mode == "image") {
        image_files[i] = files.item(i).path;
    }else if(mode  == "video"){
        video_files[i] = files.item(i).path; 
    }else{
        ok_files = false;
    }
  }
    //  Se añade contenido sin apoyo visual.
    if (fileListLength < number_examples) {
    for (let i = fileListLength; i < number_examples; i++) {
        let value_default = "image_default.png";
        output.innerText = `${output.innerText}\n${i+1}. ${value_default}`;
        image_files[i] = "images/image_default.png";
        video_files[i] = null;
    }
    }
  let status_element = document.getElementById("status_video");
  if (ok_files) {
    status_element.src = "images/ok.png";
  }else{
    status_element.src = "images/no.png";
  }
  console.log("Archivos de Video: "+video_files);
  console.log("Archivos de Imagen: "+image_files);
}

function logFilenamesAudio() {
     // Variable que marca si los archivos añadidos son válidos o no.
    let ok_files = true;
    const fileInput_Audio = document.querySelector("#myfiles_audio");
    const files_Audio = fileInput_Audio.files;
    console.log(files_Audio)
    const fileListLength_Audio = files_Audio.length;
    output_Audio.innerHTML = "";
    let number = fileListLength_Audio - number_examples;
    if (number_examples == fileListLength_Audio) {
        for (let i = 0; i < fileListLength_Audio; i++) {
            output_Audio.innerText = `${output_Audio.innerText}\n${i+1}. ${files_Audio.item(i).name}`;
            let mode = files_Audio.item(i).type.split("/")[0];
            if (mode == "audio") {
                audio_files[i] = files_Audio.item(i).path;
            }else{
                ok_files = false;
            }
          }
          let status_element = document.getElementById("status_audio");
          if (ok_files) {
            status_element.src = "images/ok.png";
          }else{
            status_element.src = "images/no.png";
          }
          console.log("Archivos de Audio: " + audio_files);
    }else if (number < 0) {
        output_Audio.innerHTML = "Faltan " + (number*(-1)) + " audios.";
    }else if(number > 0){
        output_Audio.innerHTML = "Se han introducido " + number + " de mas."       
    }

}

myFiles.addEventListener("change", logFilenames);
myFiles_Audio.addEventListener("change", logFilenamesAudio)

function select_everything() {
    var questions = [];
    for (let i = 0; i < number_questions; i++) {
        questions.push(true);     
    }
    end_create_quiz();
}

// Función que sirve para enviar al main.js la información sobre todo el proceso.
function end_create_quiz() {
    wrapper0.style.display = "none";
    wrapper1.style.display = "none";
    wrapper2.style.display = "none";
    wrapper3.style.display = "none";
    wrapper4.style.display = "none";
    end_boton.style.display = "none";

    back.innerHTML = 'Cuestionario creado. Vuelva al menú principal. <a href="index.html"><button id="retry">Vuelta al menú principal</button></a>';
    data.push(audio_files);
    data.push(video_files);
    data.push(image_files);
    data.push(questions);
    console.log(data);

    electron.ipcRenderer.invoke('test',data);
}

function roughScale(x) {
    const parsed = Number.parseInt(x, 10);
    if (Number.isNaN(parsed)) {
      return 0;
    }
    return parsed;
}

function comprobar_numero() {
    number_examples = document.getElementById("number_examples").value;
    number_examples = roughScale(number_examples)

    if (number_examples > 0 && number_examples < 6) {
        console.log("activar lectura de archivos");
        file_table.style.display = "inline-block";        
    }else{
        if (number_examples > 6) {
            back.innerHTML = "El valor introducido supera el número máximo de preguntas"
        }else{
            console.log("Error en el número introducido")
            back.innerHTML = "El valor introducido no es un número positivo."
        }
        file_table.style.display = "none";
        wrapper0.style.display = "none";
        wrapper1.style.display = "none";
        wrapper2.style.display = "none";
        wrapper3.style.display = "none";
        wrapper4.style.display = "none";
        end_boton.style.display = "none";
    }
}


function create_quiz() {

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

    wrapper0.style.display = "none";
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