const center_x = 198;
const center_y = 151;
const radius = 116;
const max_value = 1+Math.sqrt(2);

function canvas_create_position_and_draw(ctx,number_canvas) {
    let coordenada_x = [];
    let coordenada_y = [];
    for (let i = 0; i < pleasant_list[0].length; i++) {
      x = (pleasant_list[number_canvas][0]-annoying_list[number_canvas][0])+Math.cos(Math.PI/4)*(calm_list[number_canvas][0]-chaotic_list[number_canvas][0])+Math.cos(Math.PI/4)*(vibrant_list[number_canvas][0]-monotonous_list[number_canvas][0]);
      x = x / max_value;
      point_x = center_x+radius*x;
      y = (eventful_list[number_canvas][0]-uneventful_list[number_canvas][0])+Math.cos(Math.PI/4)*(chaotic_list[number_canvas][0]-calm_list[number_canvas][0])+Math.cos(Math.PI/4)*(vibrant_list[number_canvas][0]-monotonous_list[number_canvas][0]);
      y = y / max_value;
      point_y = center_y+radius*y;

      coordenada_x[i] = point_x;
      coordenada_y[i] = point_y;
      
    } 
    canvas_draw_hex(ctx);
    canvas_draw_points(ctx,coordenada_x,coordenada_y);
}
function canvas_draw_hex(ctx) {
    ctx.drawImage(img,0,0);
    ctx.beginPath();
    //-- Circunferencia exterior.
    ctx.moveTo(198,34);
    ctx.lineTo(280,70);
    ctx.moveTo(280,70);
    ctx.lineTo(314,151);
    ctx.moveTo(314,151);
    ctx.lineTo(280,233);
    ctx.moveTo(280,233);
    ctx.lineTo(198,266);
    ctx.moveTo(198,266);
    ctx.lineTo(115,233);
    ctx.moveTo(115,233);
    ctx.lineTo(82,151);
    ctx.moveTo(82,151);
    ctx.lineTo(115,70);
    ctx.moveTo(115,70);
    ctx.lineTo(198,34);
    ctx.fill();
    ctx.stroke();
}
function canvas_draw_points(ctx,coordenada_x,coordenada_y){
    for (let i = 0; i < coordenada_x.length; i++) {
        ctx.beginPath();
        switch (i) {
            case 0:
                ctx.strokeStyle="blue";
                ctx.lineWidth = 4;
                break;
            case 1:
                ctx.strokeStyle="red";
                ctx.lineWidth = 4;
                break;       
            default:
                ctx.strokeStyle="green";
                ctx.lineWidth = 4;
                break;
        }
        ctx.arc(coordenada_x[i],coordenada_y[i],5,0,2*Math.PI,false);
        ctx.stroke();       
    }
}

module.exports = {
    canvas_create_position_and_draw,
    canvas_draw_hex,
    canvas_draw_points
}