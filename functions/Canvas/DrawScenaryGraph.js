const Functions = require("./FuctionsCanvas")
const ScenaryInformation = require('./DrawInformationScenary')

function drawScenaryGraph(numberPlace,numberRecording) {
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
    var newData = [];
    newData[0] = (uniqueDescriptor.map(uniqueDescriptor => Functions.getDescriptorNumber(uniqueDescriptor[descriptor1]))).reduce((a, b) => a + b, 0);
    newData[1] = (uniqueDescriptor.map(uniqueDescriptor => Functions.getDescriptorNumber(uniqueDescriptor[descriptor2]))).reduce((a, b) => a + b, 0);
    newData[2] = (uniqueDescriptor.map(uniqueDescriptor => Functions.getDescriptorNumber(uniqueDescriptor[descriptor3]))).reduce((a, b) => a + b, 0);
    newData[3] = (uniqueDescriptor.map(uniqueDescriptor => Functions.getDescriptorNumber(uniqueDescriptor[descriptor4]))).reduce((a, b) => a + b, 0);

    const TOTAL = newData[0]+newData[1]+newData[2]+newData[3];
    newData[0] = Math.round(newData[0]*100/TOTAL);
    newData[1] = Math.round(newData[1]*100/TOTAL);
    newData[2] = Math.round(newData[2]*100/TOTAL);
    newData[3] = Math.round(newData[3]*100/TOTAL);

    const data = {
        labels: ['Agradable','Molesto', 'Dinámico','Estático'],
        datasets: [{
            //-- Extrae del array de modelos de montañas rusas, el número que hay por cada una.
            //data: uniqueModels.map(currentModel => coasters.filter(coaster => coaster.model === currentModel).length),
            data: newData,
            borderColor: getDataColors(),
            backgroundColor: getDataColors(20)
        }]
    }

    const options = {
        responsive: true,
        aspectRatio:1,
        plugins: {
            legend: { position: 'top' }
        }
    }
    const idChart = 'renderRadarChart'+(numberPlace)
    // Creamos un nuevo Chart con el identificador del canvas en el html y el tipo (tipo donut), además luego van los datos y las opciones.
    new Chart(idChart, { type: 'doughnut', data, options })
    
}

document.querySelector('#changeChart2Radio1').onclick = e =>{
    const property = document.getElementById("changeChart2Radio1").value;
    const [place, recording] = property.split('-')
    drawScenaryGraph(place,recording)
}

document.querySelector('#changeChart2Radio2').onclick = e =>{
    const property = document.getElementById("changeChart2Radio2").value;
    const [place, recording] = property.split('-')
    drawScenaryGraph(place,recording)
}

document.querySelector('#changeChart2Radio3').onclick = e =>{
    const property = document.getElementById("changeChart2Radio3").value;
    const [place, recording] = property.split('-')
    drawScenaryGraph(place,recording)
}

function changeScenarySituation(property) {
    const [place, recording] = property.split('-')
    //-- Cambiamos los valores de las opciones de la derecha al cambiar el escenario.
    document.getElementById("featuresOptions"+place).innerHTML = '<option value="yearPeriod-'+place+'-'+recording+'">Periodo del Año</option>'+
                                                            '<option value="urbanContext-'+place+'-'+recording+'">Contexto Urbano</option>'+
                                                            '<option value="acousticQuality-'+place+'-'+recording+'">Calidad Acústica</option>'+
                                                            '<option value="soundscapeTime-'+place+'-'+recording+'">Tiempo en el Ambiente Sonoro</option>';

    document.getElementById("graphLeft"+place).innerHTML = '<canvas id="renderRadarChart'+place+'"></canvas>'
    document.getElementById("graphRight"+place).innerHTML = '<canvas id="renderPieChart'+place+'"></canvas>'
    document.getElementById("changeChart2Radio"+place).value = place + "-"+recording;
    document.getElementById("changeChart2Scatter"+place).value = place + "-"+recording;
    
    ScenaryInformation.drawInformationScenary(Math.floor(place),Math.floor(recording),"yearPeriod")
    drawScenaryGraph(place,recording)
}

document.querySelector('#recordingOptions1').onchange = e => {

    const { value: property, text: label } = e.target.selectedOptions[0];
    changeScenarySituation(property)

}
document.querySelector('#recordingOptions2').onchange = e => {

    const { value: property, text: label } = e.target.selectedOptions[0]
    changeScenarySituation(property)
}
document.querySelector('#recordingOptions3').onchange = e => {

    const { value: property, text: label } = e.target.selectedOptions[0]
    changeScenarySituation(property)
}
module.exports = {
    drawScenaryGraph
}