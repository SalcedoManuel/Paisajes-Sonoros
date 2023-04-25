
var xCoordinates = new Array;
var yCoordinates = new Array;

var placesCoordinates = new Array;

var numberTotalPlaces;
var numberTotalRecordings;
var numberTotalPeople;

const MAX_VALUE = 300;
const MAX_OPTIONS_VALUE = 4;
const MAX_OPTIONS = 8;

function GetDescriptorNumber(number_questions,descriptor) {
    let arrayDescriptorGeneral = new Array;
    numberTotalPlaces = quiz_info[0][0]["Places_Number"];
    numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];
    const arrayOptions = ["muy_acuerdo","acuerdo","neutro","desacuerdo","muy_desacuerdo"]
    numberTotalPeople = quiz_info.length;
    for (let i = 0; i < number_questions; i++) {
        
        let arrayDescriptorPoint = new Array;
        for (let e = 0; e < numberTotalPeople; e++) {
            let number;
            if (quiz_info[e][1][i][descriptor] == arrayOptions[0]) {
                number = 4;
            }else if(quiz_info[e][1][i][[descriptor]] == arrayOptions[1]){
                number = 3;
            }else if(quiz_info[e][1][i][[descriptor]] == arrayOptions[2]){
                number = 2;
            }else if(quiz_info[e][1][i][[descriptor]] == arrayOptions[3]){
                number = 1;
            }else if(quiz_info[e][1][i][[descriptor]] == arrayOptions[4]){
                number = 0;
            }  
            arrayDescriptorPoint.push(number);       
        }        
        arrayDescriptorGeneral.push(arrayDescriptorPoint);
    }
    let array = new Array;
    for (let index = 0; index < numberTotalPlaces; index++) {
        let inicio = index * numberTotalRecordings;
        let final = inicio + numberTotalRecordings;
        array[index] =  arrayDescriptorGeneral.slice(inicio,final);     
    }
    arrayDescriptorGeneral = array;
    return arrayDescriptorGeneral;
}

function fillVerticalText(ctx,texto,positionX,positionY) {
    let arr = [...texto];
    let intervalo = 12;
    for (let index = 0; index < arr.length; index++) {
        ctx.fillText(arr[index],positionX,positionY);
        positionY += intervalo;       
    }
}

function DrawArrow(ctx,direction,positionInitialX,positionInitialY) {
    switch (direction) {
        case 'Up':
            ctx.moveTo(positionInitialX,positionInitialY);
            ctx.lineTo(positionInitialX-3,positionInitialY+3)
            ctx.moveTo(positionInitialX,positionInitialY)
            ctx.lineTo(positionInitialX+3,positionInitialY+3)
            break;
        case 'Bottom':
            ctx.moveTo(positionInitialX,positionInitialY);
            ctx.lineTo(positionInitialX-3,positionInitialY-3)
            ctx.moveTo(positionInitialX,positionInitialY)
            ctx.lineTo(positionInitialX+3,positionInitialY-3)
            break;
        case 'Left':
            ctx.moveTo(positionInitialX,positionInitialY);
            ctx.lineTo(positionInitialX+3,positionInitialY-3)
            ctx.moveTo(positionInitialX,positionInitialY)
            ctx.lineTo(positionInitialX+3,positionInitialY+3)
            break;
        case 'Right':
            ctx.moveTo(positionInitialX,positionInitialY);
            ctx.lineTo(positionInitialX-3,positionInitialY-3)
            ctx.moveTo(positionInitialX,positionInitialY)
            ctx.lineTo(positionInitialX-3,positionInitialY+3)
            break;
        default:
            break;
    }
}

function DrawBase() {
    for (let index = 1; index <= numberTotalPlaces; index++) {

        document.getElementById("tableScenary"+index).style.display = "block";
        for (let graph = 1; graph <= numberTotalRecordings; graph++) {
            document.getElementById("canvasGraph"+index+graph).style.display = "block";
            var c = document.getElementById("myCanvas"+index+graph);
            var ctx = c.getContext("2d");
            ctx.lineWidth = 1;
            ctx.moveTo(150, 10);
            ctx.lineWidth = 0.5;
            ctx.lineTo(150, 140);
            ctx.lineWidth = 1;
            DrawArrow(ctx,'Up',150,10)
            DrawArrow(ctx,'Bottom',150,140)
            DrawArrow(ctx,'Left',10,75)
            DrawArrow(ctx,'Right',290,75)

            ctx.moveTo(10, 75);
            ctx.lineTo(290, 75);

            ctx.stroke();
            ctx.font = "11.5px Arial";
            //Añadimos la etiqueta Agradable.
            ctx.fillText("Agradable", 125, 9);
            //Añadimos la etiqueta Molesto.
            ctx.fillText("Molesto", 130, 149);
            //Añadimos la etiqueta Dinámico.
            fillVerticalText(ctx,"Dinámico",3,37)
            //Añadimos la etiqueta Estático.
            fillVerticalText(ctx,"Estático",292,30)
            ctx.stroke();            
        }
    }

}

function DrawRectangulo(numberPlace,numberRecordings,pointX,pointY,grosor) {
    var c = document.getElementById("myCanvas"+(numberPlace + 1)+(numberRecordings+1));
    var ctx = c.getContext("2d");
    ctx.beginPath();
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
    ctx.fillRect(pointX-grosor,pointY-grosor,grosor*2,grosor*2)
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function DrawCruz(numberPlace,numberRecordings,pointX,pointY,grosor) {
    var c = document.getElementById("myCanvas"+(numberPlace + 1)+(numberRecordings+1));
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(pointX-grosor,pointY-grosor)
    ctx.lineTo(pointX+grosor,pointY+grosor);

    ctx.moveTo(pointX-grosor,pointY+grosor)
    ctx.lineTo(pointX+grosor,pointY-grosor);

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
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function DrawPoint(numberPlace,numberRecordings,pointX,pointY,grosor) {
    var c = document.getElementById("myCanvas"+(numberPlace + 1)+(numberRecordings+1));
    var ctx = c.getContext("2d");
    ctx.beginPath();

    ctx.arc(pointX,pointY,grosor,0,2*Math.PI,true);
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

function WriteCount(numberPlace,numberRecording,pointX,pointY,grosor) {
    let lienzo = "myCanvas"+(numberPlace+1)+(numberRecording + 1);
    console.info(lienzo)
    var c = document.getElementById(lienzo);
    var ctx = c.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillText("x"+grosor, pointX+grosor, pointY+grosor);
    ctx.stroke();  
}

function DrawScenary(numberPlace,numberRecording) {
    let numberTotalPlaces = quiz_info[0][0]["Places_Number"];
    let numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];
    let numberTotal = numberTotalPlaces * numberTotalRecordings;
    for (let index = 0; index < quiz_info.length; index++) {
        let pointX = placesCoordinates[numberPlace][numberRecording][0][index];
        let pointY = placesCoordinates[numberPlace][numberRecording][1][index];
        let grosor = placesCoordinates[numberPlace][numberRecording][2][index];
        if (grosor > 1) {
            WriteCount(numberPlace,numberRecording,pointX,pointY,grosor);
        }
        if (grosor > 4) {
            grosor = grosor/2;
        }else{
            grosor = 2;
        }
        if (grosor > 10) {
            grosor = 10;
        }
        if (numberRecording == 0) {
            DrawPoint(numberPlace,numberRecording,pointX,pointY,grosor);
        }else if (numberRecording == 1) {
            DrawCruz(numberPlace,numberRecording,pointX,pointY,grosor);
        } else {
            DrawRectangulo(numberPlace,numberRecording,pointX,pointY,grosor);
        }
        
    }
}
function GetCoordinates(eje,lowRangePoints,highRangePoints) {
    var resultsPoints = [];
    for (let placeNumber = 0; placeNumber < numberTotalPlaces; placeNumber++) {
       for (let recordingNumber = 0; recordingNumber < numberTotalRecordings; recordingNumber++) {            
            let longitud = lowRangePoints[placeNumber][recordingNumber].length;
            for (let index = 0; index < longitud; index++) {
                let value;
                if (lowRangePoints[placeNumber][recordingNumber][index] > highRangePoints[placeNumber][recordingNumber][index]) {                    
                    value = (lowRangePoints[placeNumber][recordingNumber][index]-MAX_OPTIONS_VALUE)*(-1); 
                    if (eje == 1) {
                        value = ((MAX_VALUE/2) * value)/MAX_OPTIONS;
                    }else{
                        value = ((MAX_VALUE) * value)/MAX_OPTIONS;
                    }
                    if (MAX_VALUE == value || (MAX_VALUE/2) == value || value == 0) {
                        value += 10;
                    }else{
                        value += 5;
                    }
                                         
                }else if (lowRangePoints[placeNumber][recordingNumber][index] < highRangePoints[placeNumber][recordingNumber][index]) {
                    value = (highRangePoints[placeNumber][recordingNumber][index] + MAX_OPTIONS_VALUE)
                    if (eje == 1) {
                        value = (value*((MAX_VALUE)/2))/MAX_OPTIONS;
                    }else{
                        value = (value*((MAX_VALUE)))/MAX_OPTIONS;
                    }
                    if (MAX_VALUE == value || (MAX_VALUE/2) == value) {
                        value -= 10;
                    }else{
                        value -= 5;
                    }
                } else {
                    if (eje == 1) {
                        value =  MAX_VALUE/4;
                    }else{
                        value = MAX_VALUE/2;
                    }  
                    
                }

                resultsPoints.push(value);        
            }
       }        
    }
    let placeNumber = 0;
    let recordingNumber = 0;
    let indice = 0;
    for (let index = 0; index < resultsPoints.length; index++) {
        placesCoordinates[placeNumber][recordingNumber][eje][indice] = resultsPoints[index];
        placesCoordinates[placeNumber][recordingNumber][2][indice] = 0;
        recordingNumber +=1;
        if (recordingNumber == (numberTotalRecordings)) {
            if (placeNumber == (numberTotalPlaces-1)) {
                placeNumber = 0;
                recordingNumber = 0;
                indice +=1;
                if (indice > quiz_info.length) {
                    indice = 0;
                } 
            }else{
                placeNumber +=1;
                recordingNumber = 0;
            }            
            
        } 
              
    }
}

function GetGrosorCoordinates() {
    for (let placesPosition = 0; placesPosition < placesCoordinates.length; placesPosition++) {
        for (let recordingPosition = 0; recordingPosition < placesCoordinates[placesPosition].length; recordingPosition++) {
            for (let point = 0; point < placesCoordinates[placesPosition][recordingPosition][0].length; point++) {                
                for (let index = 0; index < placesCoordinates[placesPosition][recordingPosition][0].length; index++) {
                    console.log(point,index)
                    if (placesCoordinates[placesPosition][recordingPosition][0][point] == placesCoordinates[placesPosition][recordingPosition][0][index]
                        && placesCoordinates[placesPosition][recordingPosition][1][point] == placesCoordinates[placesPosition][recordingPosition][1][index])
                    {
                        placesCoordinates[placesPosition][recordingPosition][2][point] += 1;      
                    }
                    console.info(placesCoordinates[placesPosition][recordingPosition][0][point],placesCoordinates[placesPosition][recordingPosition][0][index],placesCoordinates[placesPosition][recordingPosition][2][point])
                }
                
            }
        }
    }
    console.table(placesCoordinates)
}

function Draw() {
    console.info("Dentro Canvas")

    numberTotalPlaces = quiz_info[0][0]["Places_Number"];
    numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];
    numberTotalReplies = numberTotalPlaces*numberTotalRecordings;

    var scenaryCoordinates = new Array;
    for (let index = 0; index < numberTotalRecordings; index++) {
        let coordinatesX = new Array;
        let coordinatesY = new Array;
        let grosor = new Array(quiz_info.length);
        for (let pos = 0; pos < grosor.length; pos++) {
           grosor[pos] = 0;           
        }
        scenaryCoordinates.push([coordinatesX,coordinatesY,grosor])        
    }

    //-- Creamos el array que guardará las coordenadas.
    for (let index = 0; index < numberTotalPlaces; index++) {
        placesCoordinates.push(scenaryCoordinates)        
    }
    console.table(placesCoordinates)
    placesCoordinates = new Array(numberTotalPlaces);
    for (let index = 0; index < placesCoordinates.length; index++) {
        placesCoordinates[index] = new Array(numberTotalRecordings);
        for (let indice = 0; indice < placesCoordinates[index].length; indice++) {
            placesCoordinates[index][indice] = new Array(3);
            placesCoordinates[index][indice][0] = [];
            placesCoordinates[index][indice][1] = [];
            placesCoordinates[index][indice][2] = [0]           
        }        
    }
    console.table(placesCoordinates)
    var arrayPleasantPoints = GetDescriptorNumber(numberTotalReplies,'Agradable/Placentero')
    var arrayAnnoyingPoints = GetDescriptorNumber(numberTotalReplies,'Desagradable/Molesto')
    var arrayDinamicPoints = GetDescriptorNumber(numberTotalReplies,'Con Actividad/Dinámico')
    var arrayStaticPoints = GetDescriptorNumber(numberTotalReplies,'Sin Actividad/Estático')

    GetCoordinates(1,arrayPleasantPoints,arrayAnnoyingPoints);
    GetCoordinates(0,arrayDinamicPoints,arrayStaticPoints);
    GetGrosorCoordinates();

/*  xCoordinates = GetCoordinates(arrayPleasantPoints,arrayAnnoyingPoints);
    yCoordinates = GetCoordinates(arrayDinamicPoints,arrayStaticPoints);
    console.info(xCoordinates,yCoordinates)*/
    DrawBase();

    for (let index = 0; index < numberTotalPlaces; index++) {
        for (let e = 0; e < numberTotalRecordings; e++) {
            DrawScenary(index,e);
        }    
    }
}   
module.exports = {
    Draw
}