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
                ticks:{
                    color:'white'
                },
                title: {
                    display: true,
                    text: 'Fechas de realización de los cuestionarios',
                    color: 'white',
                    font: {
                        size: 30,
                        family:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                    }
                  }
            },
            y: {
              color:'white',
              ticks:{
                color:'white'
              },
              min: 0,
              title: {
                display: true,
                text: 'Cuestionarios realizados por día',
                color:'white',
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

module.exports = {
    drawChronologyGraph
}