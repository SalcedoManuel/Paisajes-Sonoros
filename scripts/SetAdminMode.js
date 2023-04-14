const fs = require('fs');

function ChangeAdminMode() {
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
    let myJSON = JSON.stringify(main_info);
    fs.writeFileSync(MAIN_JSON,myJSON);
}