const electron = require('electron');
const fs = require('fs');

const output_main = document.querySelector('#output_main');
const output_secundary = document.querySelector('#output_secundary');

const myFiles_Main = document.querySelector("#myfiles_main");
const myFiles_Secundary = document.querySelector("#myfiles_secundary");

myFiles_Main.addEventListener("change", logFilenames_Main);
myFiles_Secundary.addEventListener("change", logFilenames_Secundary);

var main_json_file = "";
var secundary_json_file = [];

function logFilenames_Main(){
    //--Obtener los ficheros añadidos.
    const fileInput = document.querySelector("#myfiles_main");
    const files = fileInput.files;
    console.table("Ficheros: " + files.item(0).type.split("/")[1])
    const fileListLength = files.length;
    output_main.innerHTML = "";
    console.log("Número de ficheros ingresados: " + fileListLength)
    //-- Creamos una variable local que nos ayudará a saber si el usuario ha realizado
    //-- todos los pasos de manera correcta. La definimos en falso hasta que se modifique.
    let ok_files = false;
    //-- Mostrar al usuario el nombre del fichero principal
    output_main.innerText = ` 1. ${files.item(0).name}`;
    //-- ¿De qué tipo es el fichero? Si el tipo de fichero no encaja, descartar.
    let mode = files.item(0).type.split("/")[0];
    console.log("Modo: ",mode)
    //-- ¿Cuál es la extensión? Si no la extensión no encaja descartar también.
    let format = files.item(0).type.split("/")[1];
    //-- Si el formato y el modo encaja dar por bueno el ingreso de información.
    if (mode == "application" && format == "json" ) {
        ok_files = true;
    }else{
        ok_files = false;
    }
    let status_element = document.getElementById("status_main");
    if (ok_files) {
      status_element.src = "images/ok.png";
      main_json_file = files.item(0).path;
    }else{
      status_element.src = "images/no.png";
    }
}

function logFilenames_Secundary(){
    // Variable que marca si los archivos añadidos son válidos o no.
    let ok_files = true;
    const fileInput = document.querySelector("#myfiles_secundary");
    const files = fileInput.files;
    console.log("Ficheros: " + files)
    const fileListLength = files.length;
    output_secundary.innerText = "";
    output_secundary.innerHTML = "";
    secundary_json_file = [];
    console.log("Número de ficheros ingresados: " + fileListLength)
    for (let i = 0; i < fileListLength; i++) {
        if (i==0) {
            output_secundary.innerText = `${i+1}. ${files.item(i).name}`;
        }else{
            output_secundary.innerText = `${output_secundary.innerText}\n${i+1}. ${files.item(i).name}`;
        }
      console.log(output_secundary.innerText)
      let mode = files.item(i).type.split("/")[0];
      let format = files.item(i).type.split("/")[1];
      if (mode == "application" && format == "json") {
        secundary_json_file.push(files.item(i).path)
      }else{
        output_secundary.innerText = `${output_secundary.innerText}\n ${"Hay un fichero de un tipo no válido."}`;
        ok_files = false;
      }
    }
    let status_element = document.getElementById("status_secundary");
    console.log("Estados de los ficheros secundarios",ok_files)
    if (ok_files) {
      status_element.src = "images/ok.png";
    }else{
      status_element.src = "images/no.png";
    }  
}

function check_results() {
      //-- Leer el fichero principal, en main_json_file guardamos la ruta.
      const  MAIN_JSON_FILE = fs.readFileSync(main_json_file);
      var main_file = JSON.parse(MAIN_JSON_FILE);

      //-- Leeremos el ID_QUIZ y el Nombre del Principal
      console.table(main_json_file)
      var id_quiz = main_file[0]["ID_Quiz"];
      var name_quiz = main_file[0]["Name_Quiz"]

      //-- Iremos leyendo cada fichero secundario para ver si su ID es el mismo.
      //-- Si su ID es distinto se borra de la lista de JSON.
      for (let i = 0; i < secundary_json_file.length; i++) {
        //-- Obtenemos la ruta.
        let path = secundary_json_file[i];
        //-- Leemos el fichero secundario
        const  SECUNDARY_JSON_FILE = fs.readFileSync(path);
        var secundary_file = JSON.parse(SECUNDARY_JSON_FILE);

        //-- Leemos el ID.
        console.log(path,secundary_file[0])
        var id_quiz_secundary = secundary_file[0]["ID_Quiz"];
        //-- Si el Identificador no coincide --> Borrar de la lista.
        if (id_quiz_secundary != id_quiz) {
          secundary_json_file.pop(path)
        }
      }
      console.log(secundary_json_file.length)
      //-- Modificar los valores de la tabla.
      if (secundary_json_file.length > 0) {
        document.getElementById("wrapper0").style.display = "none";
        document.getElementById("wrapper1").style.display = "block";
        document.getElementById("status_quiz").innerHTML = "Correcto";
        document.getElementById("secundary_quiz_number").innerHTML = secundary_json_file.length;
        document.getElementById("name_quiz").innerHTML = name_quiz;
        document.getElementById("id_quiz").innerHTML = id_quiz;
        document.getElementById("button_end_page1").innerHTML = '<button id="end_create" onclick="join_quizzes()">Realizar Unión</button>';
      }else{
        document.getElementById("status_quiz").innerHTML = "Incorrecto";
      }


      
}

function join_quizzes() {
    //-- Leer el fichero principal, en main_json_file guardamos la ruta.
    var save_file;
    const  MAIN_JSON_FILE = fs.readFileSync(main_json_file);
    var main_file = JSON.parse(MAIN_JSON_FILE);
    //-- Si está indefinido es que solo hay un cuestionario.
    if (main_file.length == undefined) {
      save_file = [];
      save_file[0] = main_file;
      main_file = save_file;
    }
    //-- Iremos leyendo cada fichero secundario y añadiremos su información al que ha sido elegido como principal.
    console.info("Unimos ",secundary_json_file.length," Cuestionarios.")
    for (let i = 0; i < secundary_json_file.length; i++) {
        //-- Obtenemos la ruta.
        let path = secundary_json_file[i];
        //-- Leemos el fichero secundario
        const  SECUNDARY_JSON_FILE = fs.readFileSync(path);
        var secundary_file = JSON.parse(SECUNDARY_JSON_FILE);
        console.table(secundary_file)
        //-- Introducimos dentro del archivo principal, el secundario.
        console.info("Número de Quizs hechos: ",secundary_file.length)
        //-- Añadiremos cada cuestionario realizado al principal, en orden de aparición.
        if (secundary_file.length == undefined) {
          main_file.push(secundary_file);
        }else{
          for (let e = 0; e < secundary_file.length; e++) {
            main_file.push(secundary_file[e]);            
          }
        }

    }
    
    //-- Después de introducir todos los ficheros, guardamos el main actualizado.
    let myJSON = JSON.stringify(main_file);
    fs.writeFileSync(main_json_file,myJSON);

    //-- Para acabar, mostrará un mensaje de que se ha juntado correctamente.
    document.getElementById("back").innerHTML += "<h4 style='text-align:center;'>El proceso de fusión de los ficheros se ha realizado con éxito.</h4>";
    document.getElementById("button_end_page1").innerHTML = "";
    //-- Se oculta la recogida de archivos.
    document.getElementById("wrapper0").style.display = "none";
    //-- Se oculta el resumen
    document.getElementById("wrapper1").style.display = "none";
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