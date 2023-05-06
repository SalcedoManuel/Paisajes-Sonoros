function getDescriptorNumber(value) {
    let number;
    const arrayOptions = ["muy_acuerdo","acuerdo","neutro","desacuerdo","muy_desacuerdo"]
    if (value == arrayOptions[0]) {
        number = 4;
    }else if(value == arrayOptions[1]){
        number = 3;
    }else if(value == arrayOptions[2]){
        number = 2;
    }else if(value == arrayOptions[3]){
        number = 1;
    }else if(value == arrayOptions[4]){
        number = 0;
    }  
    return number;
}

module.exports = {
    getDescriptorNumber
}