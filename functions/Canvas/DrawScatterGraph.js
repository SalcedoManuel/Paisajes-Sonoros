const Functions = require("./FuctionsCanvas");

function getCoordenates(uniqueDescriptor,descriptor1,descriptor2) {
    let data = [];
    const MAX_VALUE = 4;
    for (let index = 0; index < uniqueDescriptor.length; index++) {
        let descriptorValue1 = Functions.getDescriptorNumber(uniqueDescriptor[index][descriptor1])
        let descriptorValue2 = Functions.getDescriptorNumber(uniqueDescriptor[index][descriptor2])
        
        if (descriptorValue1 > descriptorValue2) {
            data[index] = descriptorValue1/MAX_VALUE;  
        }else if (descriptorValue1 < descriptorValue2) {
            data[index] = -(descriptorValue2/MAX_VALUE);
        }else{
            data[index] = 0;
        } 
        console.info(descriptor1,descriptorValue1,descriptor2,descriptorValue2,"Resultado: ",data[index]) 
    }
    return data
}

function convertXYCoordenates(xCoordenates,yCoordenates) {
    let data = [];
    for (let index = 0; index < xCoordenates.length; index++) {
        data[index] = [xCoordenates[index],yCoordenates[index]]
    }
    return data;
}

function drawScatterGraph(numberPlace,numberRecording) {
    document.getElementById("graphLeft"+numberPlace).innerHTML = '<canvas id="renderRadarChart'+numberPlace+'"></canvas>'
    const numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];    
    let position = ((numberPlace-1)*numberTotalRecordings)+numberRecording;
    position = Math.floor(position)
    const uniqueDescriptor = [...new Set(quiz_info.map(descriptor => descriptor[1][position]))]
    console.table(uniqueDescriptor)

    // Obtenemos los descriptores.
    var descriptor1 = Object.keys(uniqueDescriptor[0])[3]
    var descriptor2 = Object.keys(uniqueDescriptor[0])[4]
    var descriptor3 = Object.keys(uniqueDescriptor[0])[5]
    var descriptor4 = Object.keys(uniqueDescriptor[0])[6]
    
    // Obtenemos los datos.   
    const yCoordenates = getCoordenates(uniqueDescriptor,descriptor1,descriptor3)
    const xCoordenates = getCoordenates(uniqueDescriptor,descriptor2,descriptor4) 
    console.table(xCoordenates)
    console.table(yCoordenates)

    const Data = convertXYCoordenates(xCoordenates,yCoordenates)

    const data = {
        //labels: uniqueModels,
        labels: ['Agradable','Molesto', 'Dinámico','Estático'],
        datasets: [{
            //-- Extrae del array de modelos de montañas rusas, el número que hay por cada una.
            //data: uniqueModels.map(currentModel => coasters.filter(coaster => coaster.model === currentModel).length),
            data: Data,
            borderColor: getDataColors()[numberRecording],
            backgroundColor: getDataColors(90)[numberRecording]
        }]
    }

    const options = {
        responsive: true,
        aspectRatio:1,
        plugins: {
            legend: { display:false }
        },
        scales:{
            x:{
                min:-1,
                max:1,
                ticks:{
                    stepSize: 0.1
                }
            },
            y:{
                min:-1,
                max:1,
                ticks:{
                    stepSize: 0.1
                }
            },
        }
    }
    const idChart = 'renderRadarChart'+(numberPlace)

    // Creamos un nuevo Chart con el identificador del canvas en el html y el tipo (tipo donut), además luego van los datos y las opciones.
    new Chart(idChart, { type: 'scatter', data, options })
    
}

document.querySelector('#changeChart2Scatter').onclick = e =>{
    const property = document.getElementById("changeChart2Scatter").value;
    const [place, recording] = property.split('-')
    drawScatterGraph(place,recording)
}

module.exports = {
    drawScatterGraph,
}