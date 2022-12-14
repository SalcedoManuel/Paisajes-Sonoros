function hide_content(content) {
    switch (content) {
        case 0:
            //-- Ocultar el contenido.
            document.getElementById("text_create_quiz").style.display = "none";
            let msg_create = '<button id="msg_create" onclick="show_content(1)"><b>Mostrar</b></button>';         
            document.getElementById("msg_create_id").innerHTML = msg_create;
            let arrow_create = '<img src="images/up-arrow.png" id="arrow_create" onclick="show_content(0)" alt="Mostrar información">'
            document.getElementById("arrow_create_id").innerHTML = arrow_create;
            document.getElementById("msg_create").innerHTML = "<b>Mostrar</b>";
            break;
        case 1:
            //-- Ocultar el contenido.
            document.getElementById("text_fill_quiz").style.display = "none";
            let msg_fill = '<button id="msg_fill" onclick="show_content(1)"><b>Mostrar</b></button>';         
            document.getElementById("msg_fill_id").innerHTML = msg_fill;
            let arrow_fill = '<img src="images/up-arrow.png" id="arrow_fill" onclick="show_content(1)" alt="Mostrar información">'
            document.getElementById("arrow_fill_id").innerHTML = arrow_fill;
            document.getElementById("msg_fill").innerHTML = "<b>Mostrar Información</b>";
            break;
    
        default:
            //-- Ocultar el contenido.
            document.getElementById("text_show_quiz").style.display = "none";
            let msg_show = '<button id="msg_show" onclick="show_content(2)"><b>Mostrar</b></button>';         
            document.getElementById("msg_show_id").innerHTML = msg_show;
            let arrow_show = '<img src="images/up-arrow.png" id="arrow_show" onclick="show_content(2)" alt="Mostrar información">'
            document.getElementById("arrow_show_id").innerHTML = arrow_show;
            document.getElementById("msg_show").innerHTML = "<b>Mostrar</b>";
            break;
    }
}

function show_content(content) {
    switch (content) {
        case 0:
            //-- Ocultar el contenido.
            document.getElementById("text_create_quiz").style.display = "block";
            let msg_create = '<button id="msg_create" onclick="hide_content(0)"><b>Ocultar</b></button>';
            document.getElementById("msg_create_id").innerHTML = msg_create;
            let arrow_create = '<img src="images/down-arrow.png" id="arrow_create" onclick="hide_content(0)" alt="Ocultar información">'
            document.getElementById("arrow_create_id").innerHTML = arrow_create;
            document.getElementById("msg_create").innerHTML = "<b>Ocultar</b>";
            break;
        case 1:
            //-- Ocultar el contenido.
            document.getElementById("text_fill_quiz").style.display = "block";
            let msg_fill = '<button id="msg_fill" onclick="hide_content(1)"><b>Ocultar</b></button>';
            document.getElementById("msg_fill_id").innerHTML = msg_fill;
            let arrow_fill = '<img src="images/down-arrow.png" id="arrow_fill" onclick="hide_content(1)" alt="Ocultar información">'
            document.getElementById("arrow_fill_id").innerHTML = arrow_fill;
            document.getElementById("msg_fill").innerHTML = "<b>Ocultar</b>";
        break;
        default:
            //-- Ocultar el contenido.
            document.getElementById("text_show_quiz").style.display = "block";
            let msg_show = '<button id="msg_show" onclick="hide_content(2)"><b>Ocultar</b></button>';
            document.getElementById("msg_show_id").innerHTML = msg_show;
            let arrow_show = '<img src="images/down-arrow.png" id="arrow_show" onclick="hide_content(2)" alt="Ocultar información">'
            document.getElementById("arrow_show_id").innerHTML = arrow_show;
            document.getElementById("msg_show").innerHTML = "<b>Ocultar</b>";
            break;
    }
}

