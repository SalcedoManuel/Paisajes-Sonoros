Chart.defaults.color = '#fff'
Chart.defaults.borderColor = '#444'

//const handlers = require('./handlers.js');

const printCharts = () => {

    /*fetchCoastersData('https://coasters-api.herokuapp.com', 'https://coasters-api.herokuapp.com/country/Spain')
        .then(([allCoasters, nationalCoasters]) => {
            renderModelsChart(allCoasters)
            renderFeaturesChart(nationalCoasters)
            renderYearsChart(allCoasters)
            enableEventHandlers(nationalCoasters)
        })*/
    renderModelsChart()
    renderFeaturesChart()
    renderYearsChart()
}

document.querySelector('#featuresOptions').onchange = e => {

    const { value: property, text: label } = e.target.selectedOptions[0]

    //const newData = coasters.map(coaster => coaster[property])
    var newData;
    if (label == 'Altura (m)') {
        newData = [10,29,30,28]
    }else{
        newData = [10,10,10,10]
    }
    
    updateChartData('featuresChart', newData, label)
}

const renderModelsChart = coasters => {

    //const uniqueModels = [...new Set(coasters.map(coaster => coaster.model))]

    const data = {
        //labels: uniqueModels,
        labels: ['Agradable','Molesto', 'Dinámico','Estático'],
        datasets: [{
            //-- Extrae del array de modelos de montañas rusas, el número que hay por cada una.
            //data: uniqueModels.map(currentModel => coasters.filter(coaster => coaster.model === currentModel).length),
            data:[10,20,30,12],
            borderColor: getDataColors(),
            backgroundColor: getDataColors(20)
        }]
    }

    const options = {
        plugins: {
            legend: { position: 'top' }
        }
    }
    // Creamos un nuevo Chart con el identificador del canvas en el html y el tipo (tipo donut), además luego van los datos y las opciones.
    new Chart('modelsChart', { type: 'doughnut', data, options })
}
/*
const renderFeaturesChart = coasters => {

    const data = {
        //labels: coasters.map(coaster => coaster.name),
        labels: ['Agradable','Molesto', 'Dinámico','Estático'],
        datasets: [{
            label: 'Altura (m)',
            //data: coasters.map(coaster => coaster.height),
            data:[10,29,30,28],
            borderColor: getDataColors()[0],
            backgroundColor: getDataColors(20)[0]
        },{
            label: 'Distancia (m)',
            //data: coasters.map(coaster => coaster.height),
            data:[20,19,32,18],
            borderColor: getDataColors()[1],
            backgroundColor: getDataColors(20)[1]
        },{
            type: 'scatter',
            label: 'Puntos',
            //data: coasters.map(coaster => coaster.height),
            data: [{
                x: 10,
                y: 20
            },{
                x:20,
                y:30
            }],
            borderColor: getDataColors()[2],
            backgroundColor: getDataColors(20)[2]
        },
        ]
    }

    const options = {
        plugins: {
           // legend: { display: false }
           legend: { display: true}
        },
        scales: {
            r: { 
                min: 0,
                ticks: { display: false }
            }
        }
    }

    new Chart('featuresChart', { type: 'radar', data, options })
}
*/

const renderFeaturesChart = coasters => {

    const data = {
        labels: [
            'Eating',
            'Drinking',
            'Sleeping',
            'Designing',
            'Coding',
            'Cycling',
            'Running'
          ],
        datasets: [{
          type: 'scatter',
          label: 'Scatter Dataset',
          data: [{
            x: -10,
            y: 0
          }, {
            x: 0,
            y: 10
          }, {
            x: 10,
            y: 5
          }, {
            x: 0.5,
            y: 5.5
          }],
            borderColor: getDataColors()[2],
            backgroundColor: getDataColors(20)[2]
        },{
            type: 'radar',
            label: 'Distancia (m)',
            //data: coasters.map(coaster => coaster.height),
            data: [65, 59, 90, 81, 56, 55, 40],
            borderColor: getDataColors()[1],
            backgroundColor: getDataColors(20)[1]
        }
        ]
    }
    const options = {
        plugins: {
           // legend: { display: false }
           legend: { display: true},
           title: {
            display: true,
            text: 'Custom Chart Title'
            },
            subtitle: {
                display: true,
                text: 'Custom Chart Subtitle'
            }
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                max: 11,
                min: -11,
              },
            y: {
                max: 11,
                min: -11,

            },
            r: { 
                min: 0,
                ticks: { display: false },
                angleLines: {
                    color: 'red'
                  }
            }
        }
    }

    new Chart('featuresChart', {data, options })
}

const renderYearsChart = coasters => {
    const canvas = document.getElementById("yearsChart");
    const ctx = canvas.getContext("2d");
    ctx.rotate((45 * Math.PI) / 180);
    const years = ['1998-2000', '2001-2003', '2004-2006', '2007-2009', '2013-2015', '2016-2018', '2019-2021']

    const data = {
        labels: years,
        datasets: [{
            //data: getCoastersByYear(coasters, years),
            data: [15,20,25,5],
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
        }
    }

    new Chart('yearsChart', { type: 'line', data, options })
}



printCharts()