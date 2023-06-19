
function WriteSummaryText(text,numberPlace) {
    document.getElementById("summaryFeatureOption"+numberPlace).innerHTML = "<h3>"+text+"</h3>";
}

function GetOptionNumber(optionText,numberPlace) {
    let text;
    switch (optionText) {
        case "yearPeriod":
            option = 10;
            text = "• Esta gráfica muestra que estación del año le parece al encuestado."
            break;
        case "urbanContext":
            option = 9;
            text = "• Esta gráfica muestra el contexto urbano del entorno a escuchar según el encuestado."
        break;
        case "acousticQuality":
            option = 7;
            text = "• Esta gráfica muestra que calidad acústica tiene el entorno."
        break;    
        default:
            option = 8;
            text = "• En esta gráfica se muestra el tiempo que permanecerían los encuestados si estuviesen en ese mismo entorno con las mismas características."
            break;
    }
    WriteSummaryText(text,numberPlace)
    return option
}

function drawInformationScenary(numberPlace,numberRecording,optionText) {

    var option = GetOptionNumber(optionText,numberPlace);

    const numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];
    let position = Math.floor(((numberPlace-1)*numberTotalRecordings)+Math.floor(numberRecording));
    const uniqueDescriptor = [...new Set(quiz_info.map(descriptor => descriptor[1][position]))]
    // Obtenemos los descriptores.
    var descriptor = Object.keys(uniqueDescriptor[0])[option]

    // Obtenemos las etiquetas.
    const labelOptions = [...new Set(uniqueDescriptor.map(label => label[descriptor]))]

    var label = [];
    for (let index = 0; index < labelOptions.length; index++) {
        final = labelOptions[index];
        final = final.replace('_', ' ').charAt(0).toUpperCase() + final.replace('_', ' ').slice(1)
        label[index] = final;
    }
    //label.sort();

    var newData = [];
    for (let index = 0; index < uniqueDescriptor.length; index++) {
        const element = uniqueDescriptor[index];
        //-- Recorremos los descriptores. Si coincide, sumamos uno en su contador
        for (let index = 0; index < labelOptions.length; index++) {
            if (element[descriptor] == labelOptions[index]) {
                if (newData[index] == undefined) {
                    let initValue = Math.floor(1);
                    newData[index] = initValue;
                }else{
                    newData[index] +=1;
                }
            }
        }
    }
    const data = {
        //labels: uniqueModels,
        labels: label,
        datasets: [{
            //-- Extrae del array de modelos de montañas rusas, el número que hay por cada una.
            //data: uniqueModels.map(currentModel => coasters.filter(coaster => coaster.model === currentModel).length),
            data:newData,
            borderColor: getDataColors(),
            backgroundColor: getDataColors(70)
        }]
    }

    const options = {
        plugins: {
            labels:{
                render: 'percentage',
                fontColor: 'white',
                fontStyle: 'bolder'
            },
            legend: { position: 'top',labels:{color:'white',fontStyle:'bolder'}}
        }
    }
    const idChart = 'renderPieChart'+numberPlace;

    // Creamos un nuevo Chart con el identificador del canvas en el html y el tipo (tipo donut), además luego van los datos y las opciones.
    new Chart(idChart, { type: 'doughnut', data, options })

}

document.querySelector('#featuresOptions1').onchange = e => {

    const { value: property, text: label } = e.target.selectedOptions[0]
    const [option, place,recording] = property.split('-')
    document.getElementById("graphRight"+place).innerHTML = '<canvas id="renderPieChart'+place+'"></canvas>'
    drawInformationScenary(place,recording,option)
}
document.querySelector('#featuresOptions2').onchange = e => {

    const { value: property, text: label } = e.target.selectedOptions[0]
    const [option, place,recording] = property.split('-')
    document.getElementById("graphRight"+place).innerHTML = '<canvas id="renderPieChart'+place+'"></canvas>'
    drawInformationScenary(place,recording,option)
}
document.querySelector('#featuresOptions3').onchange = e => {

    const { value: property, text: label } = e.target.selectedOptions[0]
    const [option, place,recording] = property.split('-')
    document.getElementById("graphRight"+place).innerHTML = '<canvas id="renderPieChart'+place+'"></canvas>'
    drawInformationScenary(place,recording,option)
}

module.exports = {
    drawInformationScenary
}