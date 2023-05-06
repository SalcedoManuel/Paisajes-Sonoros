
function SelectOption2Show(option) {
    if (document.getElementById(option).style.display == "block") {
        document.getElementById(option).style.display = "none";
    }else{
        document.getElementById(option).style.display = "block";
    }
}

module.exports = {
    SelectOption2Show
}