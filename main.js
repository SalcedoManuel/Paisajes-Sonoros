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
electron.ipcMain.handle('create', (event, msg) => {
  console.log("-> Mensaje: " + msg);
  win.loadFile("create_quiz.html");
});
electron.ipcMain.handle('quiz', (event, msg) => {
  console.log("-> Mensaje: " + msg);
  win.loadFile("quiz.html");
});
electron.ipcMain.handle('show', (event, msg) => {
  console.log("-> Mensaje: " + msg);
  win.loadFile("read_file.html");
});
electron.ipcMain.handle('home', (event, msg) => {
  console.log("-> Mensaje: " + msg);
  win.loadFile("index.html");
});
electron.ipcMain.handle('test', (event, msg) => {
  console.log("El nombre del quiz nuevo creado es: " + msg);
  const MAIN_JSON = "plantillas/main_json.json";
  var main_info = JSON.parse(MAIN_JSON);
  //-- Guardamos el nombre del archivo para que cuando lo necesitemos usarlo.
  main_info["Quizs_Names"].push(msg);
  let myJSON = JSON.stringify(main_info);
  fs.writeFileSync(MAIN_JSON,myJSON);
});
