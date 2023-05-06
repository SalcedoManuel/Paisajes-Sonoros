function drawScatterGraph(numberPlace,numberRecording) {
    document.getElementById("graphLeft"+numberPlace).innerHTML = '<canvas id="renderRadarChart'+numberPlace+'"></canvas>'
    const data = {
        //labels: uniqueModels,
        labels: ['Agradable','Molesto', 'Dinámico','Estático'],
        datasets: [{
            //-- Extrae del array de modelos de montañas rusas, el número que hay por cada una.
            //data: uniqueModels.map(currentModel => coasters.filter(coaster => coaster.model === currentModel).length),
            data:[[0.5,0.5],[0.5,0.5]],
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