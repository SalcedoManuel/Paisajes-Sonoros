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
    }
    return data
}

function convertXYCoordenates(xCoordenates,yCoordenates) {
    let data = [];
    for (let index = 0; index < xCoordenates.length; index++) {
        data[index] = {x: xCoordenates[index],y: yCoordenates[index], }
    }
    return data;
}
function getMediumValue(uniqueDescriptor,descriptor) {
    let data = [];
    const MAX_VALUE = 4;
    for (let index = 0; index < uniqueDescriptor.length; index++) {
       data[index] =  Functions.getDescriptorNumber(uniqueDescriptor[index][descriptor])/MAX_VALUE       
    }
    let value = (data.reduce((a, b) => a + b, 0))/uniqueDescriptor.length
    return value
}

function drawScatterGraph(numberPlace,numberRecording) {
    document.getElementById("graphLeft"+numberPlace).innerHTML = '<canvas id="renderRadarChart'+numberPlace+'"></canvas>'
    const numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];    
    let position = ((numberPlace-1)*numberTotalRecordings)+Math.floor(numberRecording);
    position = Math.floor(position)
    const uniqueDescriptor = [...new Set(quiz_info.map(descriptor => descriptor[1][position]))]

    // Obtenemos los descriptores.
    var descriptor1 = Object.keys(uniqueDescriptor[0])[3]
    var descriptor2 = Object.keys(uniqueDescriptor[0])[4]
    var descriptor3 = Object.keys(uniqueDescriptor[0])[5]
    var descriptor4 = Object.keys(uniqueDescriptor[0])[6]
    
    // Obtenemos los datos.   
    const yCoordenates = getCoordenates(uniqueDescriptor,descriptor1,descriptor3)
    const xCoordenates = getCoordenates(uniqueDescriptor,descriptor2,descriptor4) 

    const Data = convertXYCoordenates(xCoordenates,yCoordenates)
    // Calculamos el valor medio de cada componente.
    var mediumData = [];
    const MAX_VALUE = 4;
    mediumData[0] = getMediumValue(uniqueDescriptor,descriptor1)
    mediumData[1] = getMediumValue(uniqueDescriptor,descriptor2)
    mediumData[2] = getMediumValue(uniqueDescriptor,descriptor3)
    mediumData[3] = getMediumValue(uniqueDescriptor,descriptor4)

    const data = {
        labels: ['Agradable', 'Dinámico','Molesto','Estático'],
        datasets: [{
            label:"Puntos de los resultados",
            type: 'scatter',
            data: Data,
            borderColor: getDataColors()[numberRecording],
            backgroundColor: getDataColors(90)[numberRecording],
            order:2
        },{
            label:"Región Media de cada Descriptor",
            type:"radar",
            data:mediumData,
            borderColor: getDataColors(30)[numberRecording],
            backgroundColor: getDataColors(10)[numberRecording],
            order:1
        }]
    }

    const options = {
        responsive: true,
        aspectRatio:1,
        plugins: {
            legend: { display:true },
            tooltip:{
                callbacks:{
                    label:(context) =>{
                        let text;
                        if (context.raw.x === undefined && context.raw.y === undefined) {
                            text = context.raw;
                        }else{
                            text = "x: " + context.raw.x +",y: "+context.raw.y;
                        }
                        
                        return text;
                    }
                }
            }
        },
        scales:{
            x:{
                min:-1.2,
                max:1.2,
                ticks:{
                    stepSize: 0.1,
                    color: "white"
                },
                grid: {
                    display: true,
                    lineWidth:0.1,
                    color: "white"
                  }
            },
            y:{
                min:-1.2,
                max:1.2,
                ticks:{
                    stepSize: 0.1,
                    color:"white"
                },
                grid: {
                    display: true,
                    lineWidth:0.1,
                    color: "white"
                  }
            },
            r:{
                min:0,
                max:1,
                angleLines: {
                    display: false
                }, 
                ticks: {
                    display:false
                },
                pointLabels: {
                    color: 'white'
                  }
            },
            tricks:{
                display: false
            }
        }
    }
    const idChart = 'renderRadarChart'+(numberPlace)

    // Creamos un nuevo Chart con el identificador del canvas en el html y el tipo (tipo donut), además luego van los datos y las opciones.
    new Chart(idChart, {data, options })
    
}

document.querySelector('#changeChart2Scatter1').onclick = e =>{
    const property = document.getElementById("changeChart2Scatter1").value;
    const [place, recording] = property.split('-')
    drawScatterGraph(place,recording)
}
document.querySelector('#changeChart2Scatter2').onclick = e =>{
    const property = document.getElementById("changeChart2Scatter2").value;
    const [place, recording] = property.split('-')
    drawScatterGraph(place,recording)
}
document.querySelector('#changeChart2Scatter3').onclick = e =>{
    const property = document.getElementById("changeChart2Scatter3").value;
    const [place, recording] = property.split('-')
    drawScatterGraph(place,recording)
}

module.exports = {
    drawScatterGraph,
}