$('#tab-approve').DataTable({
  paging: false,
  ordering: false,
  info: false,
  searching: false,
});

$(document).ready(function() {
  $('#noapprove').DataTable( {
    paging: false,
    // ordering: false,
    info: false,
    searching: false,
      "order": [[ 1, "asc" ]],
      "columnDefs": [ {
        "targets": 2,
        "orderable": false
        } ],
  } );

} );


$("#tab-approve2").submit(function (e) {
  e.preventDefault();
  var str = $('form').serialize();
  console.log(str);
  var arr= new Array();
  var i = 0;
  while(str.indexOf("tick=", i) != -1){
    if(arr[arr.length-1] != ((str.indexOf("tick=", i) + 5))) arr.push(str.indexOf("tick=", i) + 5);
    i++;
  }
  
  var list = new Array();
  for(var j = 0; j < arr.length; j ++)
  {
    list.push(str[arr[j]]);
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i] == 0 && list[i + 1] == 1) list.splice(i, 1);
  }

  var email = $("#tab-approve2 input[name='email']").val();
  // console.log(list);
  // console.log(email);
  var number = 0;
  for(let i = 0; i < list.length;i ++){
    if(list[i] == 1) number += 1;
  }
  // console.log(number);
  var form = $(this);
  $.post('/approve/numberStallRegister', {email: email, }, function (data) {
    if(data.data['numberstall'] < number){
      
      $(document).Toasts('create', {
        class: 'bg-danger',
        title: 'Phê Duyệt',
        subtitle: 'Approve',
        body: 'Số lượng phê duyệt nhiều hơn số lượng gian hàng đăng kí',
      });
      // e.preventDefault();
      // setTimeout(function () {
      //   window.location.replace("/approve");
      // }, 3000);

    }
    else form.unbind("submit").submit();
  });


});


$('.btn-to-watch').click(function (e) {
  var t = $('#tab-approve').DataTable();
  var email = $(this).data('email');
  $("#watchregistrationmodal input[name='email']").val(email);
  t.rows().remove().draw();

  $.post(
    '/approve/registrationList',
    {
      email: email,
    },
    function (data) {
      for (var i = 0; i < data.data.length; i++) {
        if (data.data[i]['tick'] == 0)
        {
          if(data.data[i]['stall']['Registered'] == 1){
            t.row
            .add([
              `<center name="stallname"><td> ${data.data[i]['stall']['name']} </td></center>`,
              `<center name="priorityNumber"><td > ${data.data[i]['priorityNumber']} </td></center>`,
              '<center><td><input type="checkbox" name="tick" value="0" hidden="hidden" checked/>Đã được đăng kí</td></center>',
            ])
            .draw(false);
          } else {
            t.row
            .add([
              `<center name="stallname"><td> ${data.data[i]['stall']['name']} </td></center>`,
              `<center name="priorityNumber"><td > ${data.data[i]['priorityNumber']} </td></center>`,
              '<center><td><input type="checkbox" name="tick" value="0" hidden="hidden" checked/><input type="checkbox" name="tick" value="1"/></td></center>',
            ])
            .draw(false);
          }
            
        }

        if (data.data[i]['tick'] == 1)
        {
          if(data.data[i]['stall']['Registered'] == 1){
            t.row
            .add([
              `<center name="stallname"><td> ${data.data[i]['stall']['name']} </td></center>`,
              `<center name="priorityNumber"><td > ${data.data[i]['priorityNumber']} </td></center>`,
              '<center><td><input type="checkbox" name="tick" value="0" hidden="hidden" checked/>Đã được đăng kí</td></center>',
            ])
            .draw(false);
          } else {
            t.row
            .add([
              `<center name="stallname"><td> ${data.data[i]['stall']['name']} </td></center>`,
              `<center name="priorityNumber"><td > ${data.data[i]['priorityNumber']} </td></center>`,
              '<center><td><input type="checkbox" name="tick" value="0" hidden="hidden" checked/><input type="checkbox" name="tick" value="1" checked /></td></center>',
            ])
            .draw(false);
          }
        }
        
      }
    },
  );

  $('#watchregistrationmodal').modal('show');

  
});

$('.btn-to-watch2').click(function (e) {
  var t = $('#tab-approve').DataTable();
  var email = $(this).data('email');
  $("#watchregistrationmodal input[name='email']").val(email);
  t.rows().remove().draw();

  $.post(
    '/approve/registrationList',
    {
      email: email,
    },
    function (data) {
      for (var i = 0; i < data.data.length; i++) {
        if (data.data[i]['tick'] == 0)
        {
            t.row
            .add([
              `<center name="stallname"><td> ${data.data[i]['stall']['name']} </td></center>`,
              `<center name="priorityNumber"><td > ${data.data[i]['priorityNumber']} </td></center>`,
              '<center><td><input type="checkbox" name="tick" value="0" hidden="hidden" checked/><input type="checkbox" name="tick" value="1" disabled/></td></center>',
            ])
            .draw(false);    
        }

        if (data.data[i]['tick'] == 1)
        {
          t.row
            .add([
              `<center name="stallname"><td> ${data.data[i]['stall']['name']} </td></center>`,
              `<center name="priorityNumber"><td > ${data.data[i]['priorityNumber']} </td></center>`,
              '<center><td><input type="checkbox" name="tick" value="0" hidden="hidden" checked/><input type="checkbox" name="tick" value="1" checked disabled/></td></center>',
            ])
            .draw(false);
        }
        
      }
    },
  );

  $('#watchregistrationmodal').modal('show');

  
});




$('.btn-lock').click(function (e) {
  var id = $(this).data('email');

  $("#lockregistrationModal input[name='email']").val(id);
  $('#lockregistrationModal').modal('show');
});

$('.btn-unlock').click(function (e) {
  var id = $(this).data('email');

  $("#unlockregistrationModal input[name='email']").val(id);
  $('#unlockregistrationModal').modal('show');
});
