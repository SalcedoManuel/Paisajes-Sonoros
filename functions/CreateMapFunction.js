// Esta función sirve para crear un mapa con las preguntas.
function create_map() {
    let new_map = new Map();
    new_map.set("Agradable/Placentero",[0,0,0,0,0]);
    new_map.set("Sin Actividad/Estático",[0,0,0,0,0]);
    new_map.set("Desagradable/Molesto",[0,0,0,0,0]);
    new_map.set("Con Actividad/Dinámico",[0,0,0,0,0]);
    new_map.set("En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?",[0,0,0,0,0]);
    new_map.set("¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?",[0,0,0,0,0]);
    new_map.set("¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?",[0,0,0,0]);
    new_map.set("¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?",[0,0,0]);
    return new_map;
}
function create_map_last_user_questions(questionChanged) {
    let new_map = new Map();
    new_map.set(questionChanged,[0,0,0,0]);
    new_map.set("¿Tienes algún tipo de conocimiento o formación en Acústica?",[0,0,0]);
    return new_map;
}

module.exports = {
    create_map,
    create_map_last_user_questions
}