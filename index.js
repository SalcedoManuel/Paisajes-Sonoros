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
const output_video1 = document.querySelector('#output_video1');
const output_video2 = document.querySelector('#output_video2');
const output_video3 = document.querySelector('#output_video3');

const output_Audio1 = document.querySelector('#output_audio1');
const output_Audio2 = document.querySelector('#output_audio2');
const output_Audio3 = document.querySelector('#output_audio3');

const myFiles_Video1 = document.querySelector("#myfiles_video1");
const myFiles_Video2 = document.querySelector("#myfiles_video2");
const myFiles_Video3 = document.querySelector("#myfiles_video3");

const myFiles_Audio1 = document.querySelector("#myfiles_audio1");
const myFiles_Audio2 = document.querySelector("#myfiles_audio2");
const myFiles_Audio3 = document.querySelector("#myfiles_audio3");

//  Número de ejemplos que aparecerán en el cuestionario.
var number_places = 0;
var number_sistems = 1;
var number_examples = 0;

// Número de preguntas del Cuestionario.
const number_questions = 13;

function logFilenames_Video1(){
  // Variable que marca si los archivos añadidos son válidos o no.
  let ok_files = true;
  const fileInput = document.querySelector("#myfiles_video1");
  const files = fileInput.files;
  console.log("Ficheros: " + files)
  const fileListLength = files.length;
  output_video1.innerHTML = "";
  console.log("Número de ficheros ingresados: " + fileListLength)
  console.log("Número de ficheros necesarios: " + number_sistems)
  if (fileListLength > number_sistems) {
    fileListLength = number_sistems;
  }
  for (let i = 0; i < fileListLength; i++) {
    output_video1.innerText = `${output_video1.innerText}\n${i+1}. ${files.item(i).name}`;
    console.log(output_video1.innerHTML)
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
    if (fileListLength < number_sistems) {
        console.log("Se añade contenido sin apoyo visual")
        for (let i = fileListLength; i < number_sistems; i++) {
            let value_default = "image_default.png";
            output_video1.innerText = `${output_video1.innerText}\n${i+1}. ${value_default}`;
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

function logFilenames_Video2(){
    // Variable que marca si los archivos añadidos son válidos o no.
    let ok_files = true;
    const fileInput = document.querySelector("#myfiles_video2");
    const files = fileInput.files;
    console.log("Ficheros: " + files)
    const fileListLength = files.length;
    output_video2.innerHTML = "";
    console.log("Número de ficheros ingresados: " + fileListLength)
    console.log("Número de ficheros necesarios: " + number_sistems)
    if (fileListLength > number_sistems) {
      fileListLength = number_sistems;
    }
    for (let i = 0; i < fileListLength; i++) {
      output_video2.innerText = `${output_video2.innerText}\n${i+1}. ${files.item(i).name}`;
      console.log(output_video2.innerHTML)
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
      if (fileListLength < number_sistems) {
          console.log("Se añade contenido sin apoyo visual")
          for (let i = fileListLength; i < number_sistems; i++) {
              let value_default = "image_default.png";
              output_video2.innerText = `${output_video2.innerText}\n${i+1}. ${value_default}`;
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

function logFilenames_Video3(){
    // Variable que marca si los archivos añadidos son válidos o no.
    let ok_files = true;
    const fileInput = document.querySelector("#myfiles_video3");
    const files = fileInput.files;
    console.log("Ficheros: " + files)
    const fileListLength = files.length;
    output_video3.innerHTML = "";
    console.log("Número de ficheros ingresados: " + fileListLength)
    console.log("Número de ficheros necesarios: " + number_sistems)
    if (fileListLength > number_sistems) {
      fileListLength = number_sistems;
    }
    for (let i = 0; i < fileListLength; i++) {
      output_video3.innerText = `${output_video3.innerText}\n${i+1}. ${files.item(i).name}`;
      console.log(output_video2.innerHTML)
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
      if (fileListLength < number_sistems) {
          console.log("Se añade contenido sin apoyo visual")
          for (let i = fileListLength; i < number_sistems; i++) {
              let value_default = "image_default.png";
              output_video3.innerText = `${output_video3.innerText}\n${i+1}. ${value_default}`;
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

function logFilenamesAudio1() {
     // Variable que marca si los archivos añadidos son válidos o no.
    let ok_files = true;
    const fileInput_Audio = document.querySelector("#myfiles_audio1");
    const files_Audio1 = fileInput_Audio.files;
    console.log(files_Audio1)
    const fileListLength_Audio = files_Audio1.length;
    output_Audio1.innerHTML = "";
    let number = fileListLength_Audio - number_sistems;
    if (number == 0) {
        for (let i = 0; i < fileListLength_Audio; i++) {
            output_Audio1.innerText = `${output_Audio1.innerText}\n${i+1}. ${files_Audio1.item(i).name}`;
            let mode = files_Audio1.item(i).type.split("/")[0];
            if (mode == "audio") {
                audio_files[i] = files_Audio1.item(i).path;
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
        output_Audio1.innerHTML = "Faltan " + (number*(-1)) + " audios.";
    }else if(number > 0){
        output_Audio1.innerHTML = "Se han introducido " + number + " de mas."       
    }

}

function logFilenamesAudio2() {
    // Variable que marca si los archivos añadidos son válidos o no.
   let ok_files = true;
   const fileInput_Audio = document.querySelector("#myfiles_audio2");
   const files_Audio2 = fileInput_Audio.files;
   console.log(files_Audio2)
   const fileListLength_Audio = files_Audio2.length;
   output_Audio2.innerHTML = "";
   let number = fileListLength_Audio - number_sistems;
   if (number_sistems == fileListLength_Audio) {
       for (let i = 0; i < fileListLength_Audio; i++) {
           output_Audio2.innerText = `${output_Audio2.innerText}\n${i+1}. ${files_Audio2.item(i).name}`;
           let mode = files_Audio2.item(i).type.split("/")[0];
           if (mode == "audio") {
               audio_files[i] = files_Audio2.item(i).path;
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
       output_Audio2.innerHTML = "Faltan " + (number*(-1)) + " audios.";
   }else if(number > 0){
       output_Audio2.innerHTML = "Se han introducido " + number + " de mas."       
   }

}

function logFilenamesAudio3() {
    // Variable que marca si los archivos añadidos son válidos o no.
   let ok_files = true;
   const fileInput_Audio = document.querySelector("#myfiles_audio3");
   const files_Audio3 = fileInput_Audio.files;
   console.log(files_Audio3)
   const fileListLength_Audio = files_Audio3.length;
   output_Audio3.innerHTML = "";
   let number = fileListLength_Audio - number_sistems;
   if (number_sistems == fileListLength_Audio) {
       for (let i = 0; i < fileListLength_Audio; i++) {
           output_Audio3.innerText = `${output_Audio3.innerText}\n${i+1}. ${files_Audio3.item(i).name}`;
           let mode = files_Audio3.item(i).type.split("/")[0];
           if (mode == "audio") {
               audio_files[i] = files_Audio3.item(i).path;
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
       output_Audio3.innerHTML = "Faltan " + (number*(-1)) + " audios.";
   }else if(number > 0){
       output_Audio3.innerHTML = "Se han introducido " + number + " de mas."       
   }

}


myFiles_Video1.addEventListener("change", logFilenames_Video1);
myFiles_Video2.addEventListener("change", logFilenames_Video2);
myFiles_Video3.addEventListener("change", logFilenames_Video3);

myFiles_Audio1.addEventListener("change", logFilenamesAudio1)
myFiles_Audio2.addEventListener("change", logFilenamesAudio2)
myFiles_Audio3.addEventListener("change", logFilenamesAudio3)

function select_every_checkbox (){

}


function create_quiz() {
    // Para que el número de grabaciones sea cero, el número de lugares debe ser cero.
    if (number_examples = 0) {
        back.innerHTML = "No has seleccionado nada."
    }else{
        var questions = functions_extras.checking_quiz();
        var name_place1 = "";
        var name_place2 = "";
        var name_place3 = "";

        functions_extras.ocultar_wrapper();

        back.innerHTML = "Cuestionario creado. Vuelva al menú principal.";
        console.log(questions);
        // Switch para obtener los nombres de los escenarios.
        switch (number_places) {
            case 1:
                // Nombre del Escenario 1
                name_place1 = document.getElementById("name_place1").value;
                if (name_place1 = null) {
                    name_place1 = "Escenario 1";
                }
                break;
            case 2:
                // Nombre del Escenario 1
                name_place1 = document.getElementById("name_place1").value;
                // Nombre del Escenario 2
                name_place2 = document.getElementById("name_place2").value;
                if (name_place1 = null) {
                    name_place1 = "Escenario 1";
                }
                if (name_place2 = null) {
                    name_place2 = "Escenario 2";
                }
                break
            default:
                // Nombre del Escenario 1
                name_place1 = document.getElementById("name_place1").value;
                // Nombre del Escenario 2
                name_place2 = document.getElementById("name_place2").value;
                // Nombre del Escenario 3
                name_place2 = document.getElementById("name_place3").value;
                break;
        }

        // Ahora generamos el Array que tenga TODA la información.
        //electron.ipcRenderer.invoke('test',questions);
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