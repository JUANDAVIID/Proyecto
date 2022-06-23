
var table
$(document).ready(function () {
    cargarDatos();
});


function cargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbAREA')) {
        $('#tbAREA').DataTable().destroy();
    }

    $('#tbAREA tbody').html('');

    AjaxGet("../frmAREA.aspx/Obtener",
        function (response) {
            $(".card-body").LoadingOverlay("hide");
            if (response.estado) {
                $.each(response.objeto, function (i, row) {
                    $("<tr>").append(
                        $("<td>").text(i + 1),
                        $("<td>").text(row.Nombre),
                        $("<td>").text(row.NUMERO),
                        $("<td>").text(row.Direccion),
                        $("<td>").text(row.Telefono),
                        $("<td>").text(row.Activo == true ? "Activo" : "No Activo"),
                        $("<td>").append(
                            $("<button>").addClass("btn btn-sm btn-primary mr-1").text("Editar").data("AREA", row),
                            $("<button>").addClass("btn btn-sm btn-danger").text("Eliminar").data("AREA", row.IdAREA)
                        )
                    ).appendTo("#tbAREA tbody");
                })
            }

            table = $('#tbAREA').DataTable({
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


$('#tbAREA tbody').on('click', 'button[class="btn btn-sm btn-primary mr-1"]', function () {

    var model = $(this).data("AREA")
    $("#txtIdAREA").val(model.IdAREA);
    $("#txtNombre").val(model.Nombre);
    $("#txtNUMERO").val(model.NUMERO);
    $("#txtDireccion").val(model.Direccion);
    $("#txtTelefono").val(model.Telefono);
    $("#cboEstado").val(model.Activo == true ? 1 : 0);
    $("#cboEstado").prop("disabled", false);

    $('#modalrol').modal('show');
})

$('#tbAREA tbody').on('click', 'button[class="btn btn-sm btn-danger"]', function () {

    var request = { IdAREA: String($(this).data("AREA")) };

    swal({
        title: "Mensaje",
        text: "¿Esta seguro de eliminiar la AREA?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        cancelButtonColor: '#d33',
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
    }, function () {


        AjaxPost("../frmAREA.aspx/Eliminar", JSON.stringify(request),
            function (response) {
                if (response.estado) {
                    cargarDatos();
                    swal.close();
                } else {
                    swal("oops!", "No se pudo eliminar el AREA", "warning")
                }
            },
            function () {
            },
            function () {
            })
    }
    )
})


$('#btnNuevoAREA').on('click', function () {

    $("#txtIdAREA").val("0");
    $("#txtNombre").val("");
    $("#txtNUMERO").val("");
    $("#txtDireccion").val("");
    $("#txtTelefono").val("");

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
            oAREA: {
                IdAREA: parseInt($("#txtIdAREA").val()),
                Nombre: $("#txtNombre").val(),
                NUMERO: $("#txtNUMERO").val(),
                Direccion: $("#txtDireccion").val(),
                Telefono: $("#txtTelefono").val(),
                Activo: ($("#cboEstado").val() == "1" ? true : false)
            }
        }


        if (parseInt($("#txtIdAREA").val()) == 0) {

            AjaxPost("../frmAREA.aspx/Guardar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("Mensaje", "No se pudo registrar el AREA", "warning")
                    }
                },
                function () {
                    $(".modal-body").LoadingOverlay("hide");
                },
                function () {
                    $(".modal-body").LoadingOverlay("show");
                })
        } else {
            AjaxPost("../frmAREA.aspx/Editar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("Mensaje", "No se pudo editar el AREA", "warning")
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
