var numberTotalPlaces;
var numberTotalRecordings;
var numberTotalPeople;

function drawChronologyGraph() {
    document.getElementById("canvasResult").style.display = "block";
    const canvas = document.getElementById("chronologyChart");
    const ctx = canvas.getContext("2d");
    var uniqueModels = [...new Set(quiz_info.map(quiz_info => new Date(quiz_info[0]["Date"]).getTime()))];
    uniqueModels.sort();
    for (let index = 0; index < uniqueModels.length; index++) {
        uniqueModels[index] = new Date(uniqueModels[index]).toLocaleDateString();
    }
    const label = [...new Set(uniqueModels.map(uniqueModels => uniqueModels))];

    const datesNumbers = uniqueModels.filter((number, i) => i == 0 ? true : uniqueModels[i - 1] != number);
    const counterDates = datesNumbers.map(spec => {
        return {number: spec, count: 0};
    });

    counterDates.map((countSpec, i) =>{
        const actualSpecLength = uniqueModels.filter(number => number === countSpec.number).length;
        countSpec.count = actualSpecLength;
    })
    
    const data = {
        labels: label,
        datasets: [{
            data: counterDates.map(coaster => coaster.count),
            tension: .5,
            borderColor: getDataColors()[1],
            backgroundColor: getDataColors(20)[1],
            fill: true,
            pointBorderWidth: 5
        }]
    }

    const options = {
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Fechas de realización de los cuestionarios',
                    font: {
                        size: 30,
                        family:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                    }
                  }
            },
            y: {
              min: 0,
              title: {
                display: true,
                text: 'Cuestionarios realizados por día',
                font: {
                    size: 25,
                    family:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                }
              }
            }
          }
    }
    new Chart('chronologyChart',{type: 'line',data,options})
}

function drawParticipantGraph(option) {
    var uniqueModels;
    document.getElementById("participantCanvas").innerHTML = '<canvas id="participantChart" height="5vh" width="5vh"></canvas>';
    if (option == 0) {
        var statement = 'La puntuación obtenida en el test HearWHO:'
        const label = [...new Set(quiz_info.map(quiz_info => quiz_info[0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"]))].sort();
        var uniqueModels = [];
        for (let index = 0; index < quiz_info.length; index++) {
            uniqueModels[index] =  quiz_info[index][0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"];
        }
        
        const testWHONumbers = label.filter((number, i) => i == 0 ? true : uniqueModels[i - 1] != number);
        const counterTestWHO = testWHONumbers.map(spec => {
            return {number: spec, count: 0};
        });
    
        counterTestWHO.map((countSpec, i) =>{
            const actualSpecLength = uniqueModels.filter(number => number === countSpec.number).length;
            countSpec.count = actualSpecLength;
        })
        const data = {
            labels: label,
            datasets: [{
                data: counterTestWHO.map(testWHO => testWHO.count),
                tension: .9,
                borderColor: getDataColors()[3],
                backgroundColor: getDataColors(90)[4],
                fill: true,
                pointBorderWidth: 5
            }]
        }
    
        const options = {
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Notas del Cuestionario TESTWHO',
                        font: {
                            size: 30,
                            family:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                        }
                      }
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Cantidad de Cuestionarios TESTWHO con esa nota',
                    font: {
                        size: 10,
                        family:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                    }
                  }
                }
              }
        }
        new Chart('participantChart',{type: 'bar',data,options})
    }else{
        const uniqueStatement = [...new Set(quiz_info.map(statement => statement[2]))]
        var statement = Object.keys(Object.values(uniqueStatement)[0][0])[option-1]
        console.table(statement)

        var labelOptions = [...new Set(quiz_info.map(quiz_info => quiz_info[2][0][statement]))];
        console.table(labelOptions)
        var label = [];
        for (let index = 0; index < labelOptions.length; index++) {
            final = labelOptions[index];
            final = final.replace('_', ' ').charAt(0).toUpperCase() + final.replace('_', ' ').slice(1)
            label[index] = final;
        }

        var uniqueModels = [];
        for (let index = 0; index < quiz_info.length; index++) {
            uniqueModels[index] =  quiz_info[index][2][0][statement];
        }
        const participantNumbers = labelOptions.filter((number, i) => i == 0 ? true : uniqueModels[i - 1] != number);
        const counterParticipant = participantNumbers.map(spec => {
            return {number: spec, count: 0};
        });
    
        counterParticipant.map((countSpec, i) =>{
            const actualSpecLength = uniqueModels.filter(number => number === countSpec.number).length;
            countSpec.count = actualSpecLength;
        })
        console.table(counterParticipant)
        var newData = [];
        for (let index = 0; index < counterParticipant.length; index++) {
            newData[index] = counterParticipant[index].count;            
        }
        const data = {
            //labels: uniqueModels,
            labels: label,
            datasets: [{
                //-- Extrae del array de modelos de montañas rusas, el número que hay por cada una.
                label:statement,
                data:newData,
                borderColor: getDataColors(),
                backgroundColor: getDataColors(20),
                aspectRatio: 1
            }]
        }
    
        const options = {
            plugins: {
                legend: { position: 'top' }
            }
        }
        new Chart('participantChart',{type: 'doughnut',data,options})
    }
    let text;
    switch (option) {
        case 2:
            text = "• En el gráfico anterior se muestra la formación en acústica de los participantes."
            break;
        case 0:
            text = "• En el gráfico anterior se muestra la puntuación obtenida en los test de la OMS sobre detección auditiva. Este test va de cero (NO REALIZADO) a 100."
            break;    
        default:
            text = "• En el gráfico anterior se muestra el conocimiento sobre la región o la zona de la realización del estudio."
            break;
    }
    document.getElementById("participantSummery").innerHTML = text;
    document.getElementById("statementQuestion").innerHTML = statement;

}

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

document.querySelector('#recordingOptions').onchange = e => {

    const { value: property, text: label } = e.target.selectedOptions[0]
    console.info(e.target.selectedOptions)
    const [place, recording] = property.split('-')
    
    //document.getElementById("graphLeft").innerHTML = "";
    document.getElementById("graphLeft").innerHTML = '<canvas id="renderRadarChart'+place+'"></canvas>'

    drawScenaryGraph(place,recording)

}

document.querySelector('#generalOptions').onchange = e => {

    const { value: property, text: label } = e.target.selectedOptions[0]
    console.info(e.target.selectedOptions)

    document.getElementById("participantCanvas").innerHTML = '<canvas id="participantChart" height="15vh" width="30vw"></canvas>'

    drawParticipantGraph(property)
}

function drawScenaryGraph(numberPlace,numberRecording) {
    numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];    
    let position = ((numberPlace-1)*numberTotalRecordings)+(numberRecording);
    const uniqueDescriptor = [...new Set(quiz_info.map(descriptor => descriptor[1][position]))]
    // Obtenemos los descriptores.
    var descriptor1 = Object.keys(uniqueDescriptor[0])[3]
    var descriptor2 = Object.keys(uniqueDescriptor[0])[4]
    var descriptor3 = Object.keys(uniqueDescriptor[0])[5]
    var descriptor4 = Object.keys(uniqueDescriptor[0])[6]
    // Obtenemos los datos.
    var newData = [];
    newData[0] = (uniqueDescriptor.map(uniqueDescriptor => getDescriptorNumber(uniqueDescriptor[descriptor1]))).reduce((a, b) => a + b, 0);
    newData[1] = (uniqueDescriptor.map(uniqueDescriptor => getDescriptorNumber(uniqueDescriptor[descriptor2]))).reduce((a, b) => a + b, 0);
    newData[2] = (uniqueDescriptor.map(uniqueDescriptor => getDescriptorNumber(uniqueDescriptor[descriptor3]))).reduce((a, b) => a + b, 0);
    newData[3] = (uniqueDescriptor.map(uniqueDescriptor => getDescriptorNumber(uniqueDescriptor[descriptor4]))).reduce((a, b) => a + b, 0);

    const TOTAL = newData[0]+newData[1]+newData[2]+newData[3];
    newData[0] = Math.round(newData[0]*100/TOTAL);
    newData[1] = Math.round(newData[1]*100/TOTAL);
    newData[2] = Math.round(newData[2]*100/TOTAL);
    newData[3] = Math.round(newData[3]*100/TOTAL);

    const data = {
        //labels: uniqueModels,
        labels: ['Agradable','Molesto', 'Dinámico','Estático'],
        datasets: [{
            //-- Extrae del array de modelos de montañas rusas, el número que hay por cada una.
            //data: uniqueModels.map(currentModel => coasters.filter(coaster => coaster.model === currentModel).length),
            data:[newData[0],newData[1],newData[2],newData[3]],
            borderColor: getDataColors(),
            backgroundColor: getDataColors(20)
        }]
    }

    const options = {
        plugins: {
            legend: { position: 'top' }
        }
    }
    const idChart = 'renderRadarChart'+(numberPlace)

    // Creamos un nuevo Chart con el identificador del canvas en el html y el tipo (tipo donut), además luego van los datos y las opciones.
    new Chart(idChart, { type: 'doughnut', data, options })
    
}

function Draw() {
    console.info("Dentro Canvas")

    numberTotalPlaces = quiz_info[0][0]["Places_Number"];
    numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];
    numberTotalReplies = numberTotalPlaces*numberTotalRecordings;

    drawChronologyGraph();
    drawParticipantGraph(2);
    for (let numberPlace = 1; numberPlace <= numberTotalPlaces; numberPlace++) {
        document.getElementById("scenaryGraph"+(numberPlace)).style.display = "block";
        let position = (numberPlace-1)*numberTotalRecordings;
        document.getElementById("scenaryName"+numberPlace).innerHTML = quiz_info[0][1][position]["Name_Scenary"];
        drawScenaryGraph(numberPlace,0)                
    }
}   
module.exports = {
    Draw
}