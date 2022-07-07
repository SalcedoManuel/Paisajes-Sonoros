const electron = require('electron');

const functions_extras = require('./functions');

console.log("Hola desde el proceso de la web...");

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

// Constantes usadas para la extracción de los ficheros.
const output_video = document.querySelector('.output_video');
const output_Audio = document.querySelector('.output_audio');
const myFiles_Video = document.querySelector("#myfiles_video");
const myFiles_Audio = document.querySelector("#myfiles_audio");

//  Número de ejemplos que aparecerán en el cuestionario.
var number_places = 0;
var number_sistems = 1;
var number_examples = 0;

// Número de preguntas del Cuestionario.
const number_questions = 13;

function logFilenames_Video(){
  // Variable que marca si los archivos añadidos son válidos o no.
  let ok_files = true;
  const fileInput = document.querySelector("#myfiles_video");
  const files = fileInput.files;
  console.log("Ficheros: " +files)
  const fileListLength = files.length;
  output_video.innerHTML = "";
  console.log("Número de ficheros ingresados: " + fileListLength)
  console.log("Número de ficheros necesarios: " + number_examples)
  if (fileListLength > number_examples) {
    fileListLength = number_examples;
  }
  for (let i = 0; i < fileListLength; i++) {
    output_video.innerText = `${output_video.innerText}\n${i+1}. ${files.item(i).name}`;
    console.log(output_video.innerHTML)
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
        console.log("Se añade contenido sin apoyo visual")
        for (let i = fileListLength; i < number_examples; i++) {
            let value_default = "image_default.png";
            output_video.innerText = `${output_video.innerText}\n${i+1}. ${value_default}`;
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

myFiles_Video.addEventListener("change", logFilenames_Video);
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
    functions_extras.ocultar_wrapper();
    end_boton.style.display = "none";

    back.innerHTML = 'Cuestionario creado. Vuelva al menú principal. <a href="index.html"><button id="retry">Vuelta al menú principal</button></a>';
    data.push(audio_files);
    data.push(video_files);
    data.push(image_files);
    data.push(questions);
    console.log(data);

    electron.ipcRenderer.invoke('test',data);
}


function create_quiz() {
    if (number_examples = 0) {
        back.innerHTML = "No has seleccionado nada."
    }else{
        var questions = functions_extras.checking_quiz();
        functions_extras.ocultar_wrapper();

        back.innerHTML = "Cuestionario creado. Vuelva al menú principal.";
        console.log(questions);
        electron.ipcRenderer.invoke('test',questions);
    }
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



function select_option(value,mode){
    var zero_places = document.getElementById("zero_places");
    var one_places = document.getElementById("one_places");
    var two_places = document.getElementById("two_places");
    var three_places = document.getElementById("three_places");

    var zero = document.getElementById("zero");
    var one = document.getElementById("one");
    var two = document.getElementById("two");
    var three = document.getElementById("three");

    var one_places_1 = document.getElementById("one_places_1");
    var two_places_1 = document.getElementById("two_places_1");
    var three_places_1 = document.getElementById("three_places_1");

    var one_option = document.getElementById("one_option");
    var two_option = document.getElementById("two_option");
    var three_option = document.getElementById("three_option");
    console.log(mode)
    if (mode == '1') {
        if (zero_places.value == value) {
            zero.innerHTML = '<button id="zero_places" value="0" onclick="select_option(0,1)">0</button>';
            one.innerHTML = '<button id="one_places" value="1" onclick="select_option(1,1)">1</button>';
            two.innerHTML = '<button id="two_places" value="2" onclick="select_option(2,1)">2</button>';
            three.innerHTML = '<button id="three_places" value="3" onclick="select_option(3,1)">3</button>';
      }else if(one_places.value == value){
            zero.innerHTML = '<button id="one_places" value="1" onclick="select_option(1,1)">1</button>';
            one.innerHTML = '<button id="zero_places" value="0" onclick="select_option(0,1)">0</button>';
            two.innerHTML = '<button id="two_places" value="2" onclick="select_option(2,1)">2</button>';
            three.innerHTML = '<button id="three_places" value="3" onclick="select_option(3,1)">3</button>';
      }else if(two_places.value == value){
            zero.innerHTML = '<button id="two_places" value="2" onclick="select_option(2,1)">2</button>';
            one.innerHTML = '<button id="zero_places" value="0" onclick="select_option(0,1)">0</button>';
            two.innerHTML = '<button id="one_places" value="1" onclick="select_option(1,1)">1</button>';
            three.innerHTML = '<button id="three_places" value="3" onclick="select_option(3,1)">3</button>';
      }else if(three_places.value == value){
            zero.innerHTML = '<button id="three_places" value="3" onclick="select_option(3,1)">3</button>';
            one.innerHTML = '<button id="zero_places" value="0" onclick="select_option(0,1)">0</button>';
            two.innerHTML = '<button id="one_places" value="1" onclick="select_option(1,1)">1</button>';
            three.innerHTML = '<button id="two_places" value="2" onclick="select_option(2,1)">2</button>';
      }
      number_places = value;
    }else{
        if (one_places_1.value == value) {
            one_option.innerHTML = '<button id="one_places_1" value="1" onclick="select_option(1,2)">1</button>';
            two_option.innerHTML = '<button id="two_places_1" value="2" onclick="select_option(2,2)">2</button>';
            three_option.innerHTML = '<button id="three_places_1" value="3" onclick="select_option(3,2)">3</button>';
        }else if (two_places_1.value ==  value) {
            one_option.innerHTML = '<button id="two_places_1" value="2" onclick="select_option(2,2)">2</button>';
            two_option.innerHTML = '<button id="one_places_1" value="1" onclick="select_option(1,2)">1</button>';
            three_option.innerHTML = '<button id="three_places_1" value="3" onclick="select_option(3,2)">3</button>';
        }else if (three_places_1.value ==  value) {
            one_option.innerHTML = '<button id="three_places_1" value="3" onclick="select_option(3,2)">3</button>';
            two_option.innerHTML = '<button id="one_places_1" value="1" onclick="select_option(1,2)">1</button>';
            three_option.innerHTML = '<button id="two_places_1" value="2" onclick="select_option(2,2)">2</button>';
        }
        number_sistems = value;
    }
    number_examples = number_places * number_sistems;
}

//-- Mensaje recibido del proceso MAIN
electron.ipcRenderer.on('print', (event, message) => {
    console.log("Recibido: " + message);
    print.textContent = message;
  });