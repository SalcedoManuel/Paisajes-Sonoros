const center_x = 198;
const center_y = 151;
const radius = 116;
const max_value = 1+Math.sqrt(2);

function canvas_create_position_and_draw(ctx,number_canvas) {
    let coordenada_x = [];
    let coordenada_y = [];
    for (let i = 0; i < pleasant_list[0].length; i++) {
      x = (pleasant_list[number_canvas][i]-annoying_list[number_canvas][i])+Math.cos(Math.PI/4)*(calm_list[number_canvas][i]-chaotic_list[number_canvas][i])+Math.cos(Math.PI/4)*(vibrant_list[number_canvas][i]-monotonous_list[number_canvas][i]);
      x = x / max_value;
      point_x = radius*x;

      y = (eventful_list[number_canvas][i]-uneventful_list[number_canvas][i])+Math.cos(Math.PI/4)*(chaotic_list[number_canvas][i]-calm_list[number_canvas][i])+Math.cos(Math.PI/4)*(vibrant_list[number_canvas][i]-monotonous_list[number_canvas][i]);
      y = y / max_value;
      point_y = radius*y;
      
      let angulo = Math.atan(point_x/point_y);
      if (point_x < 0) {
        point_x = (-Math.sin(angulo)*radius)+center_x;
      }else{
        point_x = (Math.sin(angulo)*radius)+center_x;
      }

      if (point_y < 0) {
        point_y = (Math.cos(angulo)*radius)+center_y;
      }else{
        point_y = -(Math.cos(angulo)*radius)+center_y;
      }  

      coordenada_x[i] = point_x;
      coordenada_y[i] = point_y;
      
    } 
    canvas_draw_hex(ctx);
    canvas_draw_points(ctx,coordenada_x,coordenada_y);
}
function canvas_draw_hex(ctx) {
    ctx.drawImage(img,0,0);
    ctx.beginPath();
    ctx.arc(center_x,center_y,radius+1,0,2*Math.PI,false);
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