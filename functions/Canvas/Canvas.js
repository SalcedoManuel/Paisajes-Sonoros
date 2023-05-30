const ChronologyChart = require('./DrawChronologyGraph')
const ParticipantChart = require('./DrawParticipantGraph')
const ScenaryRadarGraph = require('./DrawScenaryGraph')
const ScenaryInformation = require('./DrawInformationScenary')
const ScenaryScatterGraph = require('./DrawScatterGraph')


function Draw() {
    console.info("Dentro Canvas")
    numberTotalPlaces = quiz_info[0][0]["Places_Number"];
    numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];
    numberTotalReplies = numberTotalPlaces*numberTotalRecordings;

    ChronologyChart.drawChronologyGraph();
    ParticipantChart.drawParticipantGraph(2);

    for (let numberPlace = 1; numberPlace <= numberTotalPlaces; numberPlace++) {
        document.getElementById("scenaryGraph"+(numberPlace)).style.display = "block";
        let position = (numberPlace-1)*numberTotalRecordings;
        document.getElementById("recordingOptions"+numberPlace).innerHTML = "";
        
        for (let numberRecording = 1; numberRecording <= numberTotalRecordings; numberRecording++) {
            document.getElementById("recordingOptions"+numberPlace).innerHTML += ' <option value="'+numberPlace+'-'+numberRecording+'">Grabación '+numberRecording+'</option>';        
        }

        document.getElementById("scenaryName"+numberPlace).innerHTML = quiz_info[0][1][position]["Name_Scenary"];
        ScenaryInformation.drawInformationScenary(numberPlace,0,"yearPeriod") 
        ScenaryRadarGraph.drawScenaryGraph(numberPlace,0)           
    }
}   
module.exports = {
    Draw
}