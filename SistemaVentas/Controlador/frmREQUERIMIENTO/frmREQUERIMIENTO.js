
var table
$(document).ready(function () {
    ObtenerCategoria();
    cargarDatos();
    
});


function cargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbREQUERIMIENTO')) {
        $('#tbREQUERIMIENTO').DataTable().destroy();
    }

    $('#tbREQUERIMIENTO tbody').html('');

    AjaxGet("../frmREQUERIMIENTO.aspx/Obtener",
        function (response) {
            $(".card-body").LoadingOverlay("hide");
            if (response.estado) {

                $.each(response.objeto, function (i, row) {
                    $("<tr>").append(
                        $("<td>").text(i + 1),
                        $("<td>").text(row.Codigo),
                        $("<td>").text(row.Nombre),
                        $("<td>").text(row.Descripcion),
                        $("<td>").text(row.oCategoria.Descripcion),
                        $("<td>").text(row.Activo == true ? "Activo" : "No Activo"),
                        $("<td>").append(
                            $("<button>").addClass("btn btn-sm btn-primary mr-1").text("Editar").data("REQUERIMIENTO", row),
                            $("<button>").addClass("btn btn-sm btn-danger").text("Eliminar").data("REQUERIMIENTO", row.IdREQUERIMIENTO)
                        )
                    ).appendTo("#tbREQUERIMIENTO tbody");

                })
            }

            table = $('#tbREQUERIMIENTO').DataTable({
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

function ObtenerCategoria() {
    $("#cboCategoria").html("");
    AjaxGet("../frmCategoria.aspx/Obtener",
        function (response) {
            $(".card-body").LoadingOverlay("hide");
            if (response.estado) {
                $.each(response.objeto, function (i, row) {
                    if (row.Activo == true)
                        $("<option>").attr({ "value": row.IdCategoria }).text(row.Descripcion).appendTo("#cboCategoria");
                })
            }
        },
        function () {
            $(".card-body").LoadingOverlay("hide");
        },
        function () {
            $(".card-body").LoadingOverlay("show");
        })
}


$('#tbREQUERIMIENTO tbody').on('click', 'button[class="btn btn-sm btn-primary mr-1"]', function () {

    var model = $(this).data("REQUERIMIENTO")
    $("#txtIdREQUERIMIENTO").val(model.IdREQUERIMIENTO);
    $("#txtCodigo").val(model.Codigo);
    $("#txtNombre").val(model.Nombre);
    $("#txtDescripcion").val(model.Descripcion);
    $("#cboCategoria").val(model.IdCategoria);
    $("#cboEstado").val(model.Activo == true ? 1 : 0);
    $("#cboEstado").prop("disabled", false);
    $("#txtCodigo").prop("disabled", true)

    $('#modalrol').modal('show');
})

$('#tbREQUERIMIENTO tbody').on('click', 'button[class="btn btn-sm btn-danger"]', function () {

    var request = { IdREQUERIMIENTO: String($(this).data("REQUERIMIENTO")) };

    swal({
        title: "Mensaje",
        text: "¿Esta seguro de eliminar el REQUERIMIENTO?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        cancelButtonColor: '#d33',
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
    }, function () {


        AjaxPost("../frmREQUERIMIENTO.aspx/Eliminar", JSON.stringify(request),
            function (response) {
                if (response.estado) {
                    cargarDatos();
                    swal.close();
                } else {
                    swal("Mensaje", "No se pudo eliminar el REQUERIMIENTO", "warning")
                }
            },
            function () {
            },
            function () {
            })
    }
    )
})


$('#btnNuevoREQUERIMIENTO').on('click', function () {
    
    $("#txtIdREQUERIMIENTO").val("0");
    $("#txtCodigo").val("AUTOGENERADO");
    $("#txtCodigo").prop("disabled", true)
    $("#txtNombre").val("");
    $("#txtDescripcion").val("");
    $("select#cboCategoria").prop('selectedIndex', 0);


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
            oREQUERIMIENTO: {
                IdREQUERIMIENTO: parseInt($("#txtIdREQUERIMIENTO").val()),
                Nombre: $("#txtNombre").val(),
                Descripcion: $("#txtDescripcion").val(),
                IdCategoria: $("#cboCategoria").val(),
                Activo: ($("#cboEstado").val() == "1" ? true : false)
            }
        }


        if (parseInt($("#txtIdREQUERIMIENTO").val()) == 0) {

            AjaxPost("../frmREQUERIMIENTO.aspx/Guardar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("Mensaje", "No se pudo registrar el REQUERIMIENTO", "warning")
                    }
                },
                function () {
                    $(".modal-body").LoadingOverlay("hide");
                },
                function () {
                    $(".modal-body").LoadingOverlay("show");
                })
        } else {
            AjaxPost("../frmREQUERIMIENTO.aspx/Editar", JSON.stringify(request),
                function (response) {
                    $(".modal-body").LoadingOverlay("hide");
                    if (response.estado) {
                        cargarDatos();
                        $('#modalrol').modal('hide');
                    } else {
                        swal("Mensaje", "No se pudo editar el REQUERIMIENTO", "warning")
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
