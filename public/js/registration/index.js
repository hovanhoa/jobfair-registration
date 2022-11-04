// $("#tab-registration").DataTable({
//     responsive: true,
//     lengthChange: false,
//     autoWidth: false,
//     language: {
//         url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Vietnamese.json",
//     },
// });

// $("#sel-registration").select2({
//     theme: "bootstrap4",
// });

// $("#form-add-student").submit(function (e) {
//     e.preventDefault();

//     // Write code to check if student id is existed!
//     // Camel case
//     var studentId = $("#addStudentModal input[name='id']").val();
//     var form = $(this);

//     // AJAX
//     $.post("/students/checkId", { id: studentId }, function (data, status) {
//         if (data.status == "FOUND") alert("Đã tồn tại mã số sinh viên này!");
//         else form.unbind("submit").submit();
//     });
// });
// $(".btn-toastr").click(function (e) {

//     toastr["success"]("Cập nhật thành công!");
//     //   Delay to display alert
//       e.preventDefault();
//       var form = $(this);
//       setTimeout(function () {
//         window.location.replace("/registration");
//       }, 1000);

    
// });

$('#stall-select2').select2({
    theme: "bootstrap4",
    tags: true,
    dropdownPosition: true
});

// $('#stall-select2').select2("enable", false)
// $('#stall-select2').prop('disabled', true);
// $('#stall-select2').prop('disabled', true);



$("#stall-select2").on("select2:select", function (evt) {
    var element = evt.params.data.element;
    var $element = $(element);
    
    $element.detach();
    $(this).append($element);
    $(this).trigger("change");
});


