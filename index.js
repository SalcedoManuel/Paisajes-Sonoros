const electron = require('electron');
const fs = require('fs');

const nav_extras = require('./functions/nav_extras');
const functions_extras = require('./functions/functions_create');

console.log("Hola desde el proceso de la web...");

var end_boton = document.getElementById("end_create");

var name_quiz = "Quiz1";

var get_files = false;

var get_files1 = false;
var get_files2 = false;
var get_files3 = false;

//-- Guarda si la Ubicación de los archivos es la nube o en local
//--        Si el valor es cero, los archivos están en un servidor.
//--        Si el valor es uno, los archivos están en el ordenador.

var file_location_online = false;

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
var visual_files = [];

// Array de ficheros de audio.
var audio_files1 = [];
var audio_files2 = [];
var audio_files3 = [];

var visual_files1 = [];
var visual_files2 = [];
var visual_files3 = [];


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
    if (mode == "image" || mode == "video") {
        visual_files1[i] = files.item(i).path;
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
            visual_files1[i] = "images/image_default.png";
        }
    }
  let status_element = document.getElementById("status_video1");
  if (ok_files) {
    status_element.src = "images/ok.png";
  }else{
    status_element.src = "images/no.png";
  }
  console.log("Archivos Visuales: " + visual_files1);

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
      if (mode == "image" || mode == "video") {
          visual_files2[i] = files.item(i).path;
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
              visual_files2[i] = "images/image_default.png";
          }
      }
    let status_element = document.getElementById("status_video2");
    if (ok_files) {
      status_element.src = "images/ok.png";
    }else{
      status_element.src = "images/no.png";
    }
    console.log("Archivos Visuales: " + visual_files2);
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
      if (mode == "image" || mode == "video") {
          visual_files3[i] = files.item(i).path;
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
              visual_files3[i] = "images/image_default.png";
          }
      }
    let status_element = document.getElementById("status_video3");
    if (ok_files) {
      status_element.src = "images/ok.png";
    }else{
      status_element.src = "images/no.png";
    }
    console.log("Archivos Visuales: "+visual_files3);
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
                audio_files1[i] = files_Audio1.item(i).path;
            }else{
                ok_files = false;
            }
          }
          let status_element = document.getElementById("status_audio1");
          if (ok_files) {
            status_element.src = "images/ok.png";
            get_files1 = true;
          }else{
            status_element.src = "images/no.png";
          }
          console.log("Archivos de Audio: " + audio_files1);
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
               audio_files2[i] = files_Audio2.item(i).path;
           }else{
               ok_files = false;
           }
         }
         let status_element = document.getElementById("status_audio2");
         if (ok_files) {
           status_element.src = "images/ok.png";
           get_files2 = true;
         }else{
           status_element.src = "images/no.png";
         }
         console.log("Archivos de Audio: " + audio_files2);
   }else if (number < 0) {
       output_Audio2.innerHTML = "Faltan " + (number*(-1)) + " audios.";
   }else if(number > 0){
       output_Audio2.innerHTML = "Se han introducido " + number + " de mas."       
   }
   console.table(files_Audio2)
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
               audio_files3[i] = files_Audio3.item(i).path;
           }else{
               ok_files = false;
           }
         }
         let status_element = document.getElementById("status_audio3");
         if (ok_files) {
           status_element.src = "images/ok.png";
           get_files3 = true;
         }else{
           status_element.src = "images/no.png";
         }
         console.log("Archivos de Audio: " + audio_files3);
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

function change_status(place,type,recording) {
    let text_status = "status"+place+"_"+type+recording;
    let text_input = "scenary"+place+"_"+type+recording;
    let input = document.getElementById(text_input).value;
    if (input == "" || input == null) {
        document.getElementById(text_status).src = "images/no.png";
    }else{
        document.getElementById(text_status).src = "images/ok.png";
    }
}


function create_quiz() {
    /*
        Dependiendo de si el cuestionario tiene recursos online o locales se comprueba de distinta manera.
        --> Si los recursos son online lo primero es comprobar que los espacios no están vacíos, en caso de que en los videos 
            no se introdujese el número necesario se avisaría al usuario.
    */
   console.log("Es online los recursos?? ",file_location_online)
   console.log("El número de lugares es:",number_places)
   console.log("El número de grabaciones es:",number_sistems)
    if (file_location_online == true) {
        //-- Se tomará como que el usuario ha introducido las url correctamente salvo que se diga lo contrario.
        get_files = true
        //-- El objetivo de este bucle es el de saber si el usuario ha introducido correctamente todos los enlaces a los recursos.
        for (let i = 0; i < number_places; i++) {
            for (let e = 0; e < number_sistems; e++) {
                //--Creamos el id que va a leer.
                  let text = "scenary"+(i+1)+"_video"+(e+1);
                //-- Leemos el valor.
                  let text_value = document.getElementById(text).value;
                  console.info(text_value)
                //-- Si el valor es igual a "", implica que no está definido y por tanto está mal.
                if (text_value == "") {
                    //-- Lo ha hecho mal y saltará la excepción.
                    get_files = false;
                }            
            }
        }
        //-- Si se ha hecho todo bien, preparamos la lectura de los valores eliminando lo que moleste para ello.
        if (get_files) {
            //-- Se borran las tablas no necesarias.
            document.getElementById("file_table1").innerHTML = "";
            document.getElementById("file_table2").innerHTML = "";
            document.getElementById("file_table3").innerHTML = "";
        }
    }else{
        // Para que el número de grabaciones sea cero, el número de lugares debe ser cero.
        switch (number_places) {
            case 1:
                if(get_files1){
                    get_files = true;
                }
                break;
            case 2:
                if(get_files1 && get_files2){
                    get_files = true;
                }
                break;
            case 3:
                if (get_files1 && get_files2 && get_files3) {
                    get_files = true;
                }
                break;
            default:
                get_files = false;
                break;
        }
        if (get_files) {
            //-- Se borran las tablas no necesarias.
            document.getElementById("online_table1").innerHTML = "";
            document.getElementById("online_table2").innerHTML = "";
            document.getElementById("online_table3").innerHTML = "";
        }
    }

    //-- Si no has entroducido el número de recursos necesarios --> Debe saltar un error.
    if (number_examples == 0 || !(get_files)) {
        if (!get_files) {
            if (file_location_online) {
                back.innerHTML = '<p style="text-align:center;">No has introducido los <strong>VÍDEOS</strong> mínimos, revisa otra vez tu petición.</p>';
                window.alert("No has introducido los RECURSOS AUDIOVISUALES mínimos, revisa otra vez tu petición.")
            } else {
                back.innerHTML = '<p style="text-align:center;">No has introducido los <strong>Audios</strong> mínimos, revisa otra vez tu petición.</p>';
                window.alert("No has introducido los Audios mínimos, revisa otra vez tu petición.")
            }

        }else{
            back.innerHTML = '<p style="text-align:center;">No has seleccionado nada.</p>';
        }
       
    }else{
        var name_place1 = "";
        var name_place2 = "";
        var name_place3 = "";

        functions_extras.ocultar_wrapper();

        back.innerHTML = '<h3 style:"text-align: center;">Cuestionario creado. Vuelva al menú principal.</h3>';
        document.getElementById("button_end_page1").style.display = "none";
        // Switch para obtener los nombres de los escenarios.
        switch (number_places) {
            case 1:
                // Nombre del Escenario 1
                name_place1 = document.getElementById("name_place1").value;
                //-- Si no está definido el nombre generamos uno por defecto.
                if (name_place1 == null || name_place1 == "") {
                    name_place1 = "Escenario 1";
                }
                break;
            case 2:
                // Nombre del Escenario 1
                name_place1 = document.getElementById("name_place1").value;
                // Nombre del Escenario 2
                name_place2 = document.getElementById("name_place2").value;
                //-- Si no está definido el nombre generamos uno por defecto.
                if (name_place1 == null || name_place1 == "") {
                    name_place1 = "Escenario 1";
                }
                if (name_place2 == null || name_place2 == "") {
                    name_place2 = "Escenario 2";
                }
                break
            default:
                // Nombre del Escenario 1
                name_place1 = document.getElementById("name_place1").value;
                // Nombre del Escenario 2
                name_place2 = document.getElementById("name_place2").value;
                // Nombre del Escenario 3
                name_place3 = document.getElementById("name_place3").value;
                //-- Si no está definido el nombre generamos uno por defecto.
                if (name_place1 == null || name_place1 == "") {
                    name_place1 = "Escenario 1";
                }
                if (name_place2 == null || name_place2 == "") {
                    name_place2 = "Escenario 2";
                }
                if (name_place3 == null || name_place3 == "") {
                    name_place3 = "Escenario 3";
                }
                break;
        }
        // Extraeremos un JSON de ejemplo, lo convertiremos en un array, lo rellenaremos a nuestro gusto
        // y luego lo guardaremos para su posterior uso.
        const PLANTILLA_JSON = "resources/plantillas/quiz_template.json";
        //-- Leer el fichero JSON
        const  plantilla_json = fs.readFileSync(PLANTILLA_JSON);
        //-- Creamos el array en el que se modificará todo.
        var quiz_json = JSON.parse(plantilla_json);
        //-- Extraemos de la plantilla el nombre del quiz genérico y añadimos el nuevo.
        quiz_json["Name_Quiz"] = name_quiz;
        quiz_json["Number_Places"] = number_places;
        quiz_json["Number_Recordings"] = number_sistems;
        //-- Si la ubicación de los recursos es online
        quiz_json["File_Location_Online"] = file_location_online;
        //-- Creamos el ID del Cuestionario, el objetivo de esto es que en caso de que dos custionarios NO tengan
        //-- el mismo ID no se puedan juntar a pesar de tener el mismo nombre.
        var d = new Date();
        var id_quiz = Math.round(d.getTime() / 1000);
        quiz_json["ID_Quiz"] = id_quiz;
        //-- Si el contenido multimedia son enlaces, entrará en esta opción, si no en el else.
        if (file_location_online) {
            for (let i = 0; i < number_places; i++) {
                //let audio_files = [];
                let visual_files = [];
                //-- Recorremos todos los inputs
                for (let e = 0; e < number_sistems; e++) {
                    //-- Obtenemos el identificador de cada audio y video.
                    //let text_audio = "scenary"+(i+1)+"_audio"+(e+1);
                    let text_video = "scenary"+(i+1)+"_video"+(e+1);
                    //-- Sacamos el contenido del input para poder posteriormente guardarlo.
                    //let audio_url = document.getElementById(text_audio).value;
                    let video_url = document.getElementById(text_video).value;
                    //-- Comprobamos que se ha añadido contenido al input de video o imagen, si no es así, se añade el predeterminado.
                    if (video_url == null || video_url == "") {
                        video_url = "https://github.com/SalcedoManuel/Paisajes-Sonoros/blob/main/images/logo3.png";
                    } else {
                        video_url = document.getElementById(text_video).value;  
                    }

                    //-- Guardamos el contenido en un array. 
                    //audio_files.push(audio_url);
                    visual_files.push(video_url);
                    console.info("Terminado el push del escenario ",i+1," y la grabación ", e+1)                
                }
                //-- Cuando se ha recorrido todas las grabaciones, lo pasamos a su correspondiente variable.
                switch (i) {
                    case 0:
                        //audio_files1 = audio_files;
                        visual_files1 = visual_files;
                        break;
                    case 1:
                        //audio_files2 = audio_files;
                        visual_files2 = visual_files;
                        break;
                    default:
                        //audio_files3 = audio_files;
                        visual_files3 = visual_files;
                        break;
                }
            }
        }

        //-- Añadimos la ruta de los ficheros multimedia al JSON en LOCAL.
        switch (number_places) {
        case 1:
            quiz_json["files"][0]["Name_Scenary"] = name_place1;
            quiz_json["files"][0]["audio_files"] = audio_files1;
            quiz_json["files"][0]["visual_files"] = visual_files1;
            break;
        case 2:
            quiz_json["files"][0]["Name_Scenary"] = name_place1;
            quiz_json["files"][0]["audio_files"] = audio_files1;
            quiz_json["files"][0]["visual_files"] = visual_files1;

            quiz_json["files"][1]["Name_Scenary"] = name_place2;
            quiz_json["files"][1]["audio_files"] = audio_files2;
            quiz_json["files"][1]["visual_files"] = visual_files2;
            break;
        default:
            quiz_json["files"][0]["Name_Scenary"] = name_place1;
            quiz_json["files"][0]["audio_files"] = audio_files1;
            quiz_json["files"][0]["visual_files"] = visual_files1;

            quiz_json["files"][1]["Name_Scenary"] = name_place2;
            quiz_json["files"][1]["audio_files"] = audio_files2;
            quiz_json["files"][1]["visual_files"] = visual_files2;

            quiz_json["files"][2]["Name_Scenary"] = name_place3;
            quiz_json["files"][2]["audio_files"] = audio_files3;
            quiz_json["files"][2]["visual_files"] = visual_files3;
            break;
        } 

        
      

        //-- Convertir la variable a cadena JSON
        let myJSON = JSON.stringify(quiz_json);
        //-- Guardarla en el fichero destino
        let destinity = "resources/quiz_files/"+name_quiz+".json"; 
        fs.writeFileSync(destinity, myJSON);
        console.log(destinity)
        electron.ipcRenderer.invoke('test',destinity);
    }
}
//-- Esta función selecciona la ubicación de los recursos del cuestionario.
function select_file_location(online_location) {
    var option_false;
    var option_true;
    switch (online_location) {

        //-- Los archivos están en remoto.
        case true:
            file_location_online = true;
            option_true = "online_button";
            option_false = "local_button";
            break;
        //-- Los archivos están en local.
        default:
            file_location_online = false;
            option_true = "local_button";
            option_false = "online_button";
            break;
    }
    document.getElementById(option_true).style.animation = "neon 5s infinite";
    document.getElementById(option_false).style.animation = "";
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
            zero.innerHTML = '<button class="select_button" id="zero_places" value="0" onclick="select_option(0,1)">0</button>';
            one.innerHTML = '<button class="select_button" id="one_places" value="1" onclick="select_option(1,1)">1</button>';
            two.innerHTML = '<button class="select_button"  id="two_places" value="2" onclick="select_option(2,1)">2</button>';
            three.innerHTML = '<button class="select_button"  id="three_places" value="3" onclick="select_option(3,1)">3</button>';
      }else if(one_places.value == value){
            zero.innerHTML = '<button class="select_button" id="one_places" value="1" onclick="select_option(1,1)">1</button>';
            one.innerHTML = '<button class="select_button" id="zero_places" value="0" onclick="select_option(0,1)">0</button>';
            two.innerHTML = '<button class="select_button" id="two_places" value="2" onclick="select_option(2,1)">2</button>';
            three.innerHTML = '<button class="select_button" id="three_places" value="3" onclick="select_option(3,1)">3</button>';
      }else if(two_places.value == value){
            zero.innerHTML = '<button class="select_button" id="two_places" value="2" onclick="select_option(2,1)">2</button>';
            one.innerHTML = '<button class="select_button" id="zero_places" value="0" onclick="select_option(0,1)">0</button>';
            two.innerHTML = '<button class="select_button" id="one_places" value="1" onclick="select_option(1,1)">1</button>';
            three.innerHTML = '<button class="select_button" id="three_places" value="3" onclick="select_option(3,1)">3</button>';
      }else if(three_places.value == value){
            zero.innerHTML = '<button class="select_button" id="three_places" value="3" onclick="select_option(3,1)">3</button>';
            one.innerHTML = '<button class="select_button" id="zero_places" value="0" onclick="select_option(0,1)">0</button>';
            two.innerHTML = '<button class="select_button" id="one_places" value="1" onclick="select_option(1,1)">1</button>';
            three.innerHTML = '<button class="select_button" id="two_places" value="2" onclick="select_option(2,1)">2</button>';
      }
      number_places = value;
    }else{
        if (one_places_1.value == value) {
            one_option.innerHTML = '<button class="select_button" id="one_places_1" value="1" onclick="select_option(1,2)">1</button>';
            two_option.innerHTML = '<button class="select_button" id="two_places_1" value="2" onclick="select_option(2,2)">2</button>';
            three_option.innerHTML = '<button class="select_button" id="three_places_1" value="3" onclick="select_option(3,2)">3</button>';
        }else if (two_places_1.value ==  value) {
            one_option.innerHTML = '<button class="select_button" id="two_places_1" value="2" onclick="select_option(2,2)">2</button>';
            two_option.innerHTML = '<button class="select_button" id="one_places_1" value="1" onclick="select_option(1,2)">1</button>';
            three_option.innerHTML = '<button class="select_button" id="three_places_1" value="3" onclick="select_option(3,2)">3</button>';
        }else if (three_places_1.value ==  value) {
            one_option.innerHTML = '<button class="select_button" id="three_places_1" value="3" onclick="select_option(3,2)">3</button>';
            two_option.innerHTML = '<button class="select_button" id="one_places_1" value="1" onclick="select_option(1,2)">1</button>';
            three_option.innerHTML = '<button class="select_button" id="two_places_1" value="2" onclick="select_option(2,2)">2</button>';
        }
        number_sistems = value;
    }
    number_examples = number_places * number_sistems;
}

function root_mode_activated() {
    const MAIN_JSON = "resources/plantillas/main.json";
    const  MAIN_JSON_FILE = fs.readFileSync(MAIN_JSON);
    var main_info = JSON.parse(MAIN_JSON_FILE);
    if (main_info["root_mode"]) {
        document.getElementById("wrapper_create").style.display = "none";
        document.getElementById("wrapper_show").style.display = "none";
    }else{
        document.getElementById("wrapper_create").style.display = "block";
        document.getElementById("wrapper_show").style.display = "block";
    }
    console.log("Root")   
    let myJSON = JSON.stringify(main_info);
    fs.writeFileSync(MAIN_JSON,myJSON);
}

//-- Mensaje recibido del proceso MAIN
electron.ipcRenderer.on('print', (event, message) => {
    console.log("Recibido: " + message);
    print.textContent = message;
  });