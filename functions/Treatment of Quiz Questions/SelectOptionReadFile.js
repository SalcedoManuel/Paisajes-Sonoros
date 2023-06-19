
function SelectOption2Show(option,number) {
    if (document.getElementById(option).style.display == "block") {
        document.getElementById(option).style.display = "none";
        document.getElementById("button_select_quiz"+number).style = "background-color: rgb(235,235,235);color: #000000;"
    }else{
        document.getElementById(option).style.display = "block";
        document.getElementById("button_select_quiz"+number).style = "background-color: rgb(34,34,34); color: #ffff;"
    }
}

module.exports = {
    SelectOption2Show
}