

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

module.exports = {
    normalize,
    split_lists
}