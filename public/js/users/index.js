$("#tab-users").DataTable({
    responsive: true,
    lengthChange: false,
    autoWidth: false,
    language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.25/i18n/Vietnamese.json",
    },
    // buttons: [
    //     {
    //         text: "Thêm mới",
    //         action: function (e, dt, node, config) {
    //             window.location.href = "/faculty/add";
    //         },
    //     },
    // ],
});

$(".btn-edit").click(function (e) {
    var id = $(this).data("id");
    var name = $(this).data("name");
    var eyear = $(this).data("eyear");

    $("#editFacultyModal input[name='id']").val(id);
    $("#editFacultyModal input[name='name']").val(name);
    $("#editFacultyModal input[name='establishedYear']").val(eyear);

    $("#editFacultyModal").modal("show");
});

$(".btn-delete").click(function (e) {
    var id = $(this).data("id");

    $("#deleteFacultyModal input[name='id']").val(id);

    $("#deleteFacultyModal").modal("show");
});
