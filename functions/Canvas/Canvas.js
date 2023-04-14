
var XCoordinates = new Array;
var YCoordinates = new Array;

var numberTotalPlaces;
var numberTotalRecordings;
var numberTotalPeople;

const MAX_VALUE = 150;

function GetDescriptorNumber(number_questions,descriptor,arrayOptions) {
    let arrayDescriptorPoint = new Array;
    numberTotalPlaces = quiz_info[0][0]["Places_Number"];
    numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];
    numberTotalPeople = numberTotalPlaces * numberTotalRecordings;
    for (let i = 0; i < number_questions; i++) {
        for (let e = 0; e < numberTotalPeople; e++) {
            let number;
            console.info(quiz_info[i][1][e])
            if (quiz_info[i][1][e][descriptor] == arrayOptions[0]) {
                number = 4;
            }else if(quiz_info[i][1][e][[descriptor]] == arrayOptions[1]){
                number = 3;
            }else if(quiz_info[i][1][e][[descriptor]] == arrayOptions[2]){
                number = 2;
            }else if(quiz_info[i][1][e][[descriptor]] == arrayOptions[3]){
                number = 1;
            }else if(quiz_info[i][1][e][[descriptor]] == arrayOptions[4]){
                number = 0;
            }  
            arrayDescriptorPoint.push(number);       
        }        
    }
    return arrayDescriptorPoint;
}

function GetCoordinates(descriptor1,descriptor2) {
    let positionPoint = new Array;
    for (let index = 0; index < descriptor1.length; index++) {
        let position = ((descriptor1[index] + descriptor2[index])/2);
        if (position == 0) {
            position = 5;
        }else if(position == MAX_VALUE){
            position = MAX_VALUE - 5;
        }
        position = MAX_VALUE/position;
        positionPoint.push(position)
    }
    return positionPoint;
}

function DrawBase() {
    for (let index = 1; index <= numberTotalPlaces; index++) {
        document.getElementById("table"+index).style.display = "block";
        var c = document.getElementById("myCanvas"+index);
        var ctx = c.getContext("2d");
        ctx.moveTo(150, 0);
        ctx.lineTo(150, 150);
        ctx.moveTo(0, 75);
        ctx.lineTo(300, 75);
        ctx.stroke();
        ctx.fillText("Agradable", 100, 10);
        ctx.fillText("Molesto", 155, 145);
        ctx.fillText("Dinámico", 5, 85);
        ctx.fillText("Estático", 250, 85);
        ctx.stroke();
    }

}

function DrawPoint(numberPlace,numberRecordings,pointX,pointY) {
    var c = document.getElementById("myCanvas"+(numberPlace + 1));
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(pointX,pointY,1.5,0,2*Math.PI,true);
    let color;
    switch (numberRecordings) {
        case 0:
            color = 'red';
            break;
        case 1:
            color = 'green';
            break;    
        default:
            color = 'blue';
            break;
    }
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function DrawScenary(numberPlace,numberRecording) {
    let numberTotalPlaces = quiz_info[0][0]["Places_Number"];
    let numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];
    let numberTotal = numberTotalPlaces * numberTotalRecordings;
    for (let index = 0; index < quiz_info.length; index++) {
        let pointX = XCoordinates[(index * numberTotal) + ((numberTotalRecordings*numberPlace)+numberRecording)];
        let pointY = YCoordinates[(index * numberTotal) + ((numberTotalRecordings*numberPlace)+numberRecording)];
        DrawPoint(numberPlace,numberRecording,pointX,pointY);
    }
}

function Draw() {
    console.info("Dentro")
    const number_people = quiz_info.length;
    const number_places = quiz_info[0][0]["Places_Number"];
    const number_recordings = quiz_info[0][0]["Recordings_Number"];
    const number_questions = number_places * number_recordings;

    var arrayPleasantPoints = GetDescriptorNumber(number_questions,'Agradable/Placentero',["muy_desacuerdo","desacuerdo","neutro","acuerdo","muy_acuerdo"])
    var arrayAnnoyingPoints = GetDescriptorNumber(number_questions,'Desagradable/Molesto',["muy_acuerdo","acuerdo","neutro","desacuerdo","muy_desacuerdo"])
    var arrayDinamicPoints = GetDescriptorNumber(number_questions,'Con Actividad/Dinámico',["muy_desacuerdo","desacuerdo","neutro","acuerdo","muy_acuerdo"])
    var arrayStaticPoints = GetDescriptorNumber(number_questions,'Sin Actividad/Estático',["muy_acuerdo","acuerdo","neutro","desacuerdo","muy_desacuerdo"])

    XCoordinates = GetCoordinates(arrayPleasantPoints,arrayAnnoyingPoints);
    YCoordinates = GetCoordinates(arrayDinamicPoints,arrayStaticPoints);
    DrawBase();
    console.table(XCoordinates)
    console.table(YCoordinates)

    for (let index = 0; index < number_places; index++) {
        for (let e = 0; e < number_recordings; e++) {
            DrawScenary(index,e);
        }    
    }
}   
module.exports = {
    Draw
}