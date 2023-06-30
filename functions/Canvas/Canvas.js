//const ChronologyChart = require('./DrawChronologyGraph')
//const ParticipantChart = require('./DrawParticipantGraph')
const ScenaryRadarGraph = require('./DrawScenaryGraph')
const ScenaryInformation = require('./DrawInformationScenary')
const ScenaryScatterGraph = require('./DrawScatterGraph')


function resetAllCanvas() {
    //Reseteamos la cronología.
    document.getElementById("chronologyCanvas").innerHTML = '<canvas id="chronologyChart"></canvas>';
    //Reseteamos el canvas de los graficos del participante
    document.getElementById("participantCanvas").innerHTML = '<canvas id="participantChart"></canvas>';
    // Primer Gráfico izquierdo y derecho - reset 
    document.getElementById("graphLeft1").innerHTML = '<canvas id="renderRadarChart1"></canvas>';
    //
    document.getElementById("graphRight1").innerHTML = '<canvas id="renderPieChart1"></canvas>';
    // Segundo Gráfico izquierdo y derech - reset
    document.getElementById("graphLeft2").innerHTML = '<canvas id="renderRadarChart2"></canvas>';
    //
    document.getElementById("graphRight2").innerHTML = '<canvas id="renderPieChart2"></canvas>';
    // Tercero Gráfico izquierdo y derech - reset
    document.getElementById("graphLeft3").innerHTML = '<canvas id="renderRadarChart3"></canvas>';
    //
    document.getElementById("graphRight3").innerHTML = '<canvas id="renderPieChart3"></canvas>';
}


function Draw() {

    numberTotalPlaces = quiz_info[0][0]["Places_Number"];
    numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];
    numberTotalReplies = numberTotalPlaces*numberTotalRecordings;
    resetAllCanvas();
    //ChronologyChart.drawChronologyGraph();
    drawChronologyGraph();
    //ParticipantChart.drawParticipantGraph(2);
    drawParticipantGraph(2);

    for (let numberPlace = 1; numberPlace <= numberTotalPlaces; numberPlace++) {
        document.getElementById("scenaryGraph"+(numberPlace)).style.display = "block";
        let position = (numberPlace-1)*numberTotalRecordings;
        document.getElementById("recordingOptions"+numberPlace).innerHTML = "";
        
        for (let numberRecording = 1; numberRecording <= numberTotalRecordings; numberRecording++) {
            document.getElementById("recordingOptions"+numberPlace).innerHTML += ' <option value="'+numberPlace+'-'+(numberRecording-1)+'">Grabación '+numberRecording+'</option>';        
        }
        document.getElementById("scenaryName"+numberPlace).innerHTML = quiz_info[0][1][position]["Name_Scenary"];
        ScenaryInformation.drawInformationScenary(numberPlace,0,"yearPeriod") 
        ScenaryRadarGraph.drawScenaryGraph(numberPlace,0)           
    }
}   
module.exports = {
    Draw
}