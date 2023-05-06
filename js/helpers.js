const getDataColors = opacity => {
    const colors = ['#7448c2', '#fcfc21', '#1eff00','#e80ebc', '#cd3a81', '#9c99cc', '#e14eca', '#ffffff', '#ff0000', '#d6ff00' ]
    return colors.map(color => opacity ? `${color + opacity}` : color)
}

function changeChart(place,recording,chartValue) {
    const ScenaryRadarGraph = require("../functions/Canvas/DrawScenaryGraph")
    const ScenaryScatterGraph = require("../functions/Canvas/DrawScatterGraph")
    switch (chartValue) {
        case 0:
            ScenaryRadarGraph.drawScenaryGraph(place,recording)
            break;    
        default:
            ScenaryScatterGraph.drawScatterGraph(place,recording)
            break;
    }
}