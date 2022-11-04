$("#tab-stall").DataTable({
    responsive: true,
    lengthChange: false,
    autoWidth: false,
    language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Vietnamese.json",
    },
    stateSave: true,
    // buttons: [
    //     {
    //         text: "Thêm mới",
    //         action: function (e, dt, node, config) {
    //             window.location.href = "/faculty/add";
    //         },
    //     },
    // ],
});

// $(".btn-toastr").click(function (e) {

//     toastr["success"]("Thêm mới thành công!");
//     //   Delay to display alert
//     //   e.preventDefault();
//       var form = $(this);
//       setTimeout(function () {
//         window.location.replace("/stall");
//       }, 3000);

    
// });


$(".btn-edit").click(function (e) {

    var id = $(this).data("id");
    var name = $(this).data("name");
    var registered = $(this).data("registered");
    var price = $(this).data("price");
    var position_x = $(this).data("position_x");
    var position_y = $(this).data("position_y");
    var long = $(this).data("long");
    var width = $(this).data("width");
    console.log($(this).data());
    console.log(registered);


    $("#editstallmodal input[name='id']").val(id);
    $("#editstallmodal input[name='name']").val(name);
    $("#editstallmodal input[name='Registered']").attr("checked", registered==1);
    $("#editstallmodal input[name='price']").val(price);
    $("#editstallmodal input[name='position_x']").val(position_x);
    $("#editstallmodal input[name='position_y']").val(position_y);
    $("#editstallmodal input[name='long']").val(long);
    $("#editstallmodal input[name='width']").val(width);

    $("#editstallmodal").modal("show");
});

$(".btn-delete").click(function (e) {
    var id = $(this).data("id");

    $("#deletestallModal input[name='id']").val(id);

    $("#deletestallModal").modal("show");
});

