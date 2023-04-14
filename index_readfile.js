const electron = require('electron');

const functions_tableinfo = require('./functions/functions_tableinfo')
const canvasModule = require("./functions/Canvas/Canvas")

var load_quizs_opened = [];

// Variables sobre el Quizs a mostar.
var name_quiz = "";
var quiz_info = [];
var info_table = document.getElementById("info_table");



//-- Esta función pide al main el nombre de los cuestionarios que se han realizado en la app.
function load_results() {
    electron.ipcRenderer.invoke('load_quizs_opened', load_quizs_opened);
}

// Esta función sirve para cargar cuestionarios que no han sido creados o cargados por la aplicación.
function LoadFileQuiz(){
    CloseFileQuiz();
    document.getElementById("results_button").style.display = "none"
    const fileInput = document.querySelector("#myfilesInputFile");
    const files = fileInput.files;
    const FILEQUIZ = fs.readFileSync(files.item(0).path);
    quiz_info = JSON.parse(FILEQUIZ);
    if (quiz_info.length == undefined) {
        let saveFile = new Array;
        saveFile[0] = quiz_info;
        quiz_info = saveFile;
    }else{
        name_quiz = quiz_info[0][0]["Name_Quiz"]
    }
    
    TreatmentFileQuiz(quiz_info)
}

//-- El main.js manda un listado con los cuestionarios que se ha realizado en la aplicación.
electron.ipcRenderer.on('load_quizs_opened', (event, message) => { 
    console.log("Recibido la lista de quizs creados: " + message);
    load_quizs_opened = message;
    //Abremos recibido un array de Cuestionarios Creados.
    CloseFileQuiz();
    if (load_quizs_opened.length == 0) {
        document.getElementById("results").innerHTML = 'No hay ningún cuestionario realizado en la aplicación.';
    }else{
        for (let i = 0; i < message.length; i++) {
            let name_quiz = message[i].split(".")[0]
            document.getElementById("results").innerHTML += '<button id="button_select_quiz" onclick="'+'name_selected('+i+')"><b>'+name_quiz+'<b></button>';        
        }
    }

});

function name_selected(file_number) {
    // Dependiendo del número se selecciona una opción u otra.
    console.log("El Quiz seleccionado es: " + load_quizs_opened[file_number]);
    // Almacenamos el nombre del cuestionario que vamos a mostrar.
    name_quiz =load_quizs_opened[file_number];
    // Pedimos al main.js que nos pase en un array toda la información sobre los Cuestionarios hechos con ese nombre.
    electron.ipcRenderer.invoke('quizs_summary', load_quizs_opened[file_number]);
}

//--- Esta función estará esperando a recibir el resumen del custionario pedido para su posterior análisis.
electron.ipcRenderer.on('quizs_summary', (event, message) => {
    console.log("Recibido los resultados: " + message);
    /* Se añade el nombre del Cuestionario a la página para que el Usuario de que cuestionario está 
        viendo los resultados. */
    TreatmentFileQuiz(message)
});


function TreatmentFileQuiz(informationQuiz) {
    document.getElementById("option_name_quiz").innerHTML = name_quiz.split(".")[0];
    //-- Pasamos a una variable global toda la información sobre los cuestionarios realizados.
    quiz_info = informationQuiz;
    // Creamos la tabla para que se introduzcan los elementos más relevantes en ella.
    // La tabla estará ordenada de la forma 'First-In First-Out', el primer cuestionario en rellenarse será
    // el primero en aperecer en la lista.
    info_table.innerHTML = functions_tableinfo.create_table_info_init_string();
    // Añadimos los valores de cada partipante a la tabla.
    functions_tableinfo.add_data_table_info();

    // COMENZAMOS CON EL DESARROLLO Y MUESTRA DE LOS VALORES GLOBALES
    // Cargamos ahora los resultados globales.
    // Comenzamos con la información de los cuestionarios.
    document.getElementById("hearWhoResults").innerHTML = functions_tableinfo.WHO_score_global_results();

    // AÑADIMOS LA INFORMACIÓN SOBRE LOS LUGARES.
    document.getElementById("tablePlacesResults").innerHTML = functions_tableinfo.places_global_results();
    // Añadimos los resultados sobre las preguntas finales.
    document.getElementById("lastQuestion").innerHTML = functions_tableinfo.last_user_results();

    // Añadimos las gráficas.
    canvasModule.Draw();
}


function OpenFileQuiz() {
    document.getElementById("getInputQuizFile").style.display = "block";
}
function CloseFileQuiz() {
    document.getElementById("getInputQuizFile").style.display = "none";
}