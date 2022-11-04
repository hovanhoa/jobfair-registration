var c = document.getElementById("canvas1");
var ctx = c.getContext("2d");

ctx.fillStyle = "#404040";
ctx.fillRect(0,0,46,36);

var c = document.getElementById("canvas2");
var ctx = c.getContext("2d");

ctx.fillStyle = "#Aeaead";
ctx.fillRect(0,0,46,36);


var c = document.getElementById("canvas3");
var ctx = c.getContext("2d");
ctx.strokeStyle = '#FF0000';
ctx.moveTo(0,0);
ctx.lineTo(46,36);
ctx.moveTo(46,0);
ctx.lineTo(0,36);
ctx.stroke();


$(document).ready(function () {
  dbCanvas = $('#myCanvas').get(0);
  ctx = dbCanvas.getContext('2d');
  ctx.font = '5px Arial';

  // Background
  // Yellow zone
  ctx.fillStyle = '#feff99';
  ctx.fillRect(0, 0, 648, 237);
  // Tram Bus
  ctx.fillStyle = '#fcd3c1';
  ctx.fillRect(0, 0, 21, 60);

  // Duong nhua
  ctx.fillStyle = '#cccccc';
  ctx.fillRect(0, 60, 21, 177);
  ctx.fillRect(21, 204, 627, 33);

  // Toa nha H6
  ctx.fillStyle = '#59c5c7';
  ctx.fillRect(21, 0, 35, 132);
  ctx.fillRect(56, 0, 60, 33);

  // Blue zone
  ctx.fillStyle = '#4473c5';
  ctx.fillRect(220, 33, 460, 33);
  ctx.fillRect(116, 0, 532, 33);

  // Cay co
  ctx.fillStyle = '#00a65e';
  ctx.fillRect(56, 33, 39, 33);
  ctx.fillRect(21, 170, 35, 34);
  ctx.fillRect(56, 189, 60, 15);
  ctx.fillRect(155, 33, 66, 15);
  ctx.fillRect(155, 103, 600, 28);
  ctx.fillRect(95, 110, 23, 20);
  ctx.fillRect(155, 189, 600, 15);

  // Cau thang
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(95, 33, 60, 15);
  ctx.fillStyle = '#000000';
  ctx.fillText('Cầu thang', 105, 43);

  // San khau
  ctx.fillStyle = '#ddebf7';
  ctx.fillRect(95, 48, 60, 37);

  ctx.fillStyle = '#000000';
  ctx.fillText('Bụi cây', 66, 199);
  ctx.fillText('Bụi cây', 66, 54);
  ctx.fillText('Bụi cây', 173, 43);
  ctx.fillText('Bụi cây', 95, 123);
  ctx.fillText('Cỏ', 200, 199);
  ctx.fillText('Cỏ', 300, 199);
  ctx.fillText('Cỏ', 400, 199);
  ctx.fillText('Cỏ', 500, 199);
  ctx.fillText('Cỏ', 600, 199);
  ctx.fillText('Hàng Cây, Ghế đá', 200, 120);
  ctx.fillText('Hàng Cây, Ghế đá', 400, 120);
  ctx.fillText('Sân Khấu', 110, 70);
  ctx.fillText('Đường nhựa', 300, 220);
  ctx.fillText('Trạm', 3, 17);
  ctx.fillText('Bus', 3, 27);
  ctx.fillText('50', 3, 37);

  $.post('/registration/listStall', function (data) {
    console.log(data.data);
    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].price == 7000000) ctx.fillStyle = '#404040';
      else ctx.fillStyle = '#Aeaead';
      ctx.fillRect(
        data.data[i].position_x - 10,
        data.data[i].position_y - 10,
        23,
        18,
      );

      if (data.data[i].price == 7000000) ctx.fillStyle = '#fff';
      else ctx.fillStyle = '#000';
      ctx.fillText(
        data.data[i].name,
        data.data[i].position_x - 7,
        data.data[i].position_y,
      );

      if(data.data[i].Registered == 1){
        ctx.strokeStyle = '#FF0000';
        ctx.moveTo(data.data[i].position_x-10,data.data[i].position_y - 10);
        ctx.lineTo(data.data[i].position_x-10+23,data.data[i].position_y-10+18);
        ctx.moveTo(data.data[i].position_x-10+23,data.data[i].position_y - 10);
        ctx.lineTo(data.data[i].position_x-10,data.data[i].position_y-10+18);
        ctx.stroke();
      }

    }
  });
});
