
var table
$(document).ready(function () {
    cargarDatos();
});


function cargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbAREAProveedor')) {
        $('#tbAREAProveedor').DataTable().destroy();
    }

    $('#tbAREAProveedor tbody').html('');

    AjaxGet("../frmAREAProveedor.aspx/Obtener",
        function (response) {
            $(".card-body").LoadingOverlay("hide");
            if (response.estado) {

                $.each(response.objeto, function (i, row) {
                    $("<tr>").append(
                        $("<td>").text(i + 1),
                        $("<td>").text(row.NUMERO),
                        $("<td>").text(row.ASUNTO),
                        $("<td>").text(row.Telefono),
                        $("<td>").text(row.Correo),
                        $("<td>").text(row.Direccion),
                        $("<td>").text(row.Activo == true ? "Activo" : "No Activo"),
                        $("<td>").append(
                            $("<button>").addClass("btn btn-sm btn-primary mr-1").text("Editar").data("AREAproveedor", row),
                            $("<button>").addClass("btn btn-sm btn-danger").text("Eliminar").data("AREAproveedor", row.IdAREAProveedor)
                        )
                    ).appendTo("#tbAREAProveedor tbody");

                })
            }

            table = $('#tbAREAProveedor').DataTable({
                responsive: true
            });
        },
        function () {
            $(".card-body").LoadingOverlay("hide");
        },
        function () {
            $(".card-body").LoadingOverlay("show");
        })
}


$('#tbAREAProveedor tbody').on('click', 'button[class="btn btn-sm btn-primary mr-1"]', function () {

    var model = $(this).data("AREAproveedor")
    $("#txtIdAREAProveedor").val(model.IdAREAProveedor);
    $("#txtNUMERO").val(model.NUMERO);
    $("#txtASUNTO").val(model.ASUNTO);
    $("#txtTelefono").val(model.Telefono);
    $("#txtCorreo").val(model.Correo);
    $("#txtDireccion").val(model.Direccion);
    $("#cboEstado").val(model.Activo == true ? 1 : 0);
    $("#cboEstado").prop("disabled", false);

    $('#modalrol').modal('show');
})

$('#tbAREAProveedor tbody').on('click', 'button[class="btn btn-sm btn-danger"]', function () {

    var request = { IdAREAProveedor: String($(this).data("AREAproveedor")) };

    swal({
        title: "Mensaje",
        text: "¿Esta seguro de eliminiar el AREAproveedor?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        cancelButtonColor: '#d33',
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
    }, function () {


        AjaxPost("../frmAREAProveedor.aspx/Eliminar", JSON.stringify(request),
            function (response) {
                if (response.estado) {
                    cargarDatos();
                    swal.close();
                } else {
                    swal("oops!", "No se pudo eliminar el AREAproveedor", "warning")
                }
            },
            function () {
            },
            function () {
            })
    }
    )
})


$('#btnNuevoAREAProveedor').on('click', function () {

    $("#txtIdAREAProveedor").val("0");
    $("#txtNUMERO").val("");
    $("#txtASUNTO").val("");
    $("#txtTelefono").val("");
    $("#txtCorreo").val("");
    $("#txtDireccion").val("");


    $("#cboEstado").val(1);
    $("#cboEstado").prop("disabled", true);

    $('#modalrol').modal('show');
})

$('#btnGuardarCambios').on('click', function () {
    var camposvacios = false;
    var fields = $(".model").serializeArray();


    $.each(fields, function (i, field) {
        if (!field.value) {
            camposvacios = true;
            return false;
        }
    });


    if (!camposvacios) {
        
        var request = {
            oAREAProveedor: {
                IdAREAProveedor: parseInt($("#txtIdAREAProveedor").val()),
                NUMERO: $("#txtNUMERO").val(),
                ASUNTO: $("#txtASUNTO").val(),
                Telefono: $("#txtTelefono").val(),
                Correo: $("#txtCorreo").val(),
                Direccion: $("#txtDireccion").val(),
                Activo: ($("#cboEstado").val() == "1" ? true : false)
            }
        }


        if (parseInt($("#txtIdAREAProveedor").val()) == 0) {

            AjaxPost("../frmAREAProveedor.aspx/Guardar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("Mensaje", "No se pudo registrar el AREAproveedor", "warning")
                    }
                },
                function () {
                    $(".modal-body").LoadingOverlay("hide");
                },
                function () {
                    $(".modal-body").LoadingOverlay("show");
                })
        } else {
            AjaxPost("../frmAREAProveedor.aspx/Editar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("Mensaje", "No se pudo editar el AREAproveedor", "warning")
                    }
                },
                function () {
                    $(".modal-body").LoadingOverlay("hide");
                },
                function () {
                    $(".modal-body").LoadingOverlay("show");
                })
        }
    } else {
        swal("Mensaje!", "Es necesario completar todos los campos", "warning")
    }


})
