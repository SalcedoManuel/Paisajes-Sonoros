//-- Cargar el módulo de electron
const electron = require('electron');
const fs = require('fs');

console.log("Arrancando electron...");

//-- Variable para acceder a la ventana principal
//-- Se pone aquí para que sea global al módulo principal
let win = null;

var questions = [true,true,true,true,true,true,true,true,true,true,true,true,true,true]

//-- Punto de entrada. En cuanto electron está listo,
//-- ejecuta esta función
electron.app.on('ready', () => {
    console.log("Evento Ready!");

    //-- Crear la ventana principal de nuestra aplicación
    win = new electron.BrowserWindow({
        width: 800,   //-- Anchura 
        height: 600,  //-- Altura

        //-- Permitir que la ventana tenga ACCESO AL SISTEMA
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    });

  //-- Cargar interfaz gráfica en HTML
  win.loadFile("index.html");

  //-- Esperar a que la página se cargue y se muestre
  //-- y luego enviar el mensaje al proceso de renderizado para que 
  //-- lo saque por la interfaz gráfica
  win.on('ready-to-show', () => {
    win.webContents.send('print', "MENSAJE ENVIADO DESDE PROCESO MAIN");
  });

  //-- Enviar un mensaje al proceso de renderizado para que lo saque
  //-- por la interfaz gráfica
  win.webContents.send('print', "MENSAJE ENVIADO DESDE PROCESO MAIN");

});


//-- Esperar a recibir los mensajes de botón apretado (Test) del proceso de 
//-- renderizado. Al recibirlos se escribe una cadena en la consola

electron.ipcMain.handle('quizs',(event, msg) => {
  console.log("Nos piden los nombres de los quizs ya creados: " + msg);
  const MAIN_JSON = "plantillas/main.json";
  const  MAIN_JSON_FILE = fs.readFileSync(MAIN_JSON);
  var main_info = JSON.parse(MAIN_JSON_FILE);
  //-- Guardamos el nombre del archivo para cuando lo usemos.
  let quizs_names = main_info["Quizs_Names"];
  console.log("Enviamos: " + quizs_names)
  win.webContents.send('quizs', quizs_names);

});

electron.ipcMain.handle('test', (event, msg) => {
  console.log("El nombre del quiz nuevo creado es: " + msg.split("/")[1]);
  const MAIN_JSON = "plantillas/main.json";
  const  MAIN_JSON_FILE = fs.readFileSync(MAIN_JSON);
  var main_info = JSON.parse(MAIN_JSON_FILE);
  //-- Guardamos el nombre del archivo para cuando lo usemos.
  msg = msg.split("/")[1];
  //-- Buscamos en el array de nombres si está en la lista
  if (main_info["Quizs_Names"].includes(msg) == false) {
    // Si entra aquí es que el valor NO está en la lista y por tanto se guarda.
    main_info["Quizs_Names"].push(msg);
    main_info["Number_Quizs"] = main_info["Quizs_Names"].length;
  }else{
    console.log("El archivo ya existía")
  }
  let myJSON = JSON.stringify(main_info);
  fs.writeFileSync(MAIN_JSON,myJSON);
});
