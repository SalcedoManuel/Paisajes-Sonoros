const sweetalert = require('sweetalert');
const Admin = require("./SetAdminMode")
/* Pantalla que muestra una ventana emergente con la información de contacto. */
function ContactPopupScreen() {
    let message = "Contacto: m.salcedoa.2016@alumnos.urjc.es";
    swal(message)
}

/* Pantalla que muestra una ventana emergente con indicaciones sobre las tres opciones principales:
 Crear Cuestionario, Rellenar Cuestionario y Mostrar Cuestionario*/
function HelpPopupScreen() {
    let message = "";
    let title = "¿En qué apartado necesitas ayuda?";
    swal(title, {
        buttons: {
          create: {
            text: "Crear Cuestionario",
            value: "create_quiz"
          },
          quiz:{
            text: "Rellenar Cuestionario",
            value: "quiz"
          },
          read:{
            text: "Mostrar Resultados",
            value: "read_quiz"
          },
        },
      })
      .then((value) => {
        switch (value) {
       
          case "create_quiz":
            title = "Crear un Cuestionario";
            message = "Sirve para crear un cuestionario para que en el futuro se pueda rellenar.\n";
            swal(title,message, "info");
            break;
          case "quiz":
            title = "Rellenar un Cuestionario";
            message = "El objetivo de esta función es la de que un usuario rellene el cuestionario.\n";
            swal(title,message, "info");
            break;
          case "read_quiz":
            title = "Mostrar Resultados";
            message = "Con esta función se puede observar los resultados de los cuestionarios.\n";
            swal(title,message, "info");
            break;
        }
      });

}

/* Pantalla que muestra una ventana emergente con las opciones extras que tiene la aplicación, que son:
    Resetear Información de la aplicación, Modo Administrador que habilitada y Juntar fihceros de Resultados.*/
function SettingsPopupScreen() {
    let title = "¿Qué ajuste quieres hacer?";
    swal(title, {
        buttons: {
          reseat: {
            text: "Resetear información",
            value: "reseat"
          },
          root: {
            text: "Modo Admin",
            value: "root"
          },
          join: {
            text: "Juntar Resultados",
            value:"join"
          }
        },
      })
      .then((value) => {
        switch (value) {
       
          case "reseat":
            const MAIN_ZERO = "resources/plantillas/main_zero.json";
            const  MAIN_ZERO_FILE = fs.readFileSync(MAIN_ZERO);
            var main_zero = JSON.parse(MAIN_ZERO_FILE);
            let myJSON = JSON.stringify(main_zero);
            const MAIN_FILE = "resources/plantillas/main.json";
            fs.writeFileSync(MAIN_FILE,myJSON);
            msg = "Configuración Reseteada";
            swal(title,msg);
            break;
          case "root":
            const MAIN_JSON = "resources/plantillas/main.json";
            const  MAIN_JSON_FILE = fs.readFileSync(MAIN_JSON);
            var info = JSON.parse(MAIN_JSON_FILE);
            if (info["root_mode"] == true) {
              info["root_mode"] = false;
              msg = "Modo Root Desactivado";
            }else{
              info["root_mode"] = true;
              msg = "Modo Root Activado";
            }
            fs.writeFileSync(MAIN_JSON,JSON.stringify(info));
            ChangeAdminMode();
            swal(msg);
            break;
          case "join":
            window.location.href = "./join_quizzes.html";
            swal(msg);
            break;
          default:
            console.log("Exit!!")
        }
      });
}

module.exports = {
  ContactPopupScreen,
  HelpPopupScreen,
  SettingsPopupScreen
}