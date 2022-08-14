

function normalize(array,number_people) {
    for (let i = 0; i < array.length; i++) {
        array[i]= array[i]/number_people;   
    }
    return array;
}

function split_lists(array,recordings_system,number_places) {
    let start = 0;
    let end = recordings_system;
    let array_list = [];
    for (let i = 0; i < number_places; i++) {
        array_list[i]=array.slice(start,end);
        start = end;
        end += recordings_system;    
   }
   return array_list;
}

function create_Array(array) {
    for (let i = 0; i < quiz_info[0][2].length; i++) {
        array.push(0)
    }
}

function get_names_places() {
    let array = [];
    for (let i = 0; i < quiz_info[0][1].length; i++) {
        array.push(quiz_info[0][1][i]["Name_Scenary"])        
    }
    return array;
}

function create_map() {
    let new_map = new Map();
    new_map.set("¿Conoces el escenario?",[0,0]);
    new_map.set("¿Cuál es la frecuencia de paso por él?",[0,0,0,0,0]);
    new_map.set("Cuando lo has transitado, ¿Has prestado atención al sonido que te rodeaba?",[0,0]);
    new_map.set("¿Las grabaciones se asemejan a tu recuerdo del escenario?",[0,0]);
    return new_map;
}

module.exports = {
    normalize,
    split_lists,
    create_Array,
    get_names_places,
    create_map
}