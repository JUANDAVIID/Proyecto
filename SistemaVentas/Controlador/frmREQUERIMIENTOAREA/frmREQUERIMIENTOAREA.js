var table;
var AREASelected;
var REQUERIMIENTOSelected;
$(document).ready(function () {
    cargarDatos();
});



function cargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbREQUERIMIENTOAREA')) {
        $('#tbREQUERIMIENTOAREA').DataTable().destroy();
    }

    $('#tbREQUERIMIENTOAREA tbody').html('');

    AjaxGet("../frmREQUERIMIENTOAREA.aspx/Obtener",
        function (response) {
            if (response.estado) {

                $.each(response.objeto, function (i, row) {
                    $("<tr>").append(
                        $("<td>").text(row.oAREA.Nombre),
                        $("<td>").text(row.oAREA.NUMERO),
                        $("<td>").text(row.oREQUERIMIENTO.Codigo),
                        $("<td>").text(row.oREQUERIMIENTO.Nombre),
                        $("<td>").text(row.Stock),
                        $("<td>").append(
                            $("<button>").addClass("btn btn-sm btn-danger").text("Eliminar").data("REQUERIMIENTOAREA", row.IdREQUERIMIENTOAREA)
                        )
                    ).appendTo("#tbREQUERIMIENTOAREA tbody");

                })
            }

            table = $('#tbREQUERIMIENTOAREA').DataTable({
                responsive: true
            });
        },
        function () {
        },
        function () {
        })
}

$('#tbREQUERIMIENTOAREA tbody').on('click', 'button[class="btn btn-sm btn-danger"]', function () {

    var request = { IdREQUERIMIENTOAREA: String($(this).data("REQUERIMIENTOAREA")) };

    swal({
        title: "Mensaje",
        text: "¿Esta seguro de eliminar esta asignación?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        cancelButtonColor: '#d33',
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
    }, function () {


        AjaxPost("../frmREQUERIMIENTOAREA.aspx/Eliminar", JSON.stringify(request),
            function (response) {
                if (response.estado) {
                    cargarDatos();
                    swal.close();
                } else {
                    swal("Mensaje", "No se puede eliminar, la asignación ya cuenta con un stock", "warning")
                }
            },
            function () {
            },
            function () {
            })
    }
    )
})




$('#btnAsignar').on('click', function () {
    var camposvacios = false;
    

    if ($("#txtIdAREA").val() == "0" || $("#txtIdREQUERIMIENTO").val() == "0") {
        camposvacios = true;
    }

    if (!camposvacios) {

        var request = {
            oREQUERIMIENTOAREA: {
                oREQUERIMIENTO: { IdREQUERIMIENTO: parseInt($("#txtIdREQUERIMIENTO").val()) },
                oAREA: { IdAREA: parseInt($("#txtIdAREA").val()) } ,
            }
        }

        AjaxPost("../frmREQUERIMIENTOAREA.aspx/Guardar", JSON.stringify(request),
            function (response) {
                $("#card-lista").LoadingOverlay("hide");
                if (response.estado) {

                    $("#txtIdREQUERIMIENTO").val("0");
                    $("#txtCodigo").val("");
                    $("#txtNombre").val("");
                    $("#txtDescripcion").val("");
                    cargarDatos();


                } else {
                    swal("Mensaje", "No se pudo registrar la asignación", "warning")
                }
            },
            function () {
                $("#card-lista").LoadingOverlay("hide");
            },
            function () {
                $("#card-lista").LoadingOverlay("show");
            })

        
    } else {
        swal("Mensaje!", "Es necesario completar todos los campos", "warning")
    }


})

$("#txtCodigo").on('keypress', function (e) {
   
    if (e.which == 13) {
        AjaxGet("../frmREQUERIMIENTO.aspx/Obtener",
            function (response) {
                $("#txtCodigo").LoadingOverlay("hide");
                if (response.estado) {
                    var encontrado = false;
                    $.each(response.objeto, function (i, row) {
                        if (row.Activo == true && row.Codigo == $("#txtCodigo").val()) {
                            $("#txtIdREQUERIMIENTO").val(row.IdREQUERIMIENTO);
                            $("#txtCodigo").val(row.Codigo);
                            $("#txtNombre").val(row.Nombre);
                            $("#txtDescripcion").val(row.Descripcion);
                            encontrado = true;
                        }
                    })

                    if (!encontrado) {
                        $("#txtIdREQUERIMIENTO").val("0");
                        $("#txtNombre").val("");
                        $("#txtDescripcion").val("");
                    }

                }
            },
            function () {
                $("#txtCodigo").LoadingOverlay("hide");
            },
            function () {
                $("#txtCodigo").LoadingOverlay("show");
            })
    }
});
function cargarAREA() {

    if ($.fn.DataTable.isDataTable('#tbAREA')) {
        $('#tbAREA').DataTable().destroy();
    }

    $('#tbAREA tbody').html('');

    AjaxGet("../frmAREA.aspx/Obtener",
        function (response) {
            $(".modal-body").LoadingOverlay("hide");
            if (response.estado) {
                $.each(response.objeto, function (i, row) {

                    if (row.Activo == true) {
                        $("<tr>").append(
                            $("<td>").append(
                                $("<button>").addClass("btn btn-sm btn-primary ml-2").text("Seleccionar").data("AREA", row)
                            ),
                            $("<td>").text(row.NUMERO),
                            $("<td>").text(row.Nombre),
                            $("<td>").text(row.Direccion),

                        ).appendTo("#tbAREA tbody");
                    }
                })
            }

            $('#tbAREA').DataTable();
        },
        function () {
            $(".modal-body").LoadingOverlay("hide");
        },
        function () {
            $(".modal-body").LoadingOverlay("show");
        })
}

function cargarREQUERIMIENTO() {

    if ($.fn.DataTable.isDataTable('#tbREQUERIMIENTO')) {
        $('#tbREQUERIMIENTO').DataTable().destroy();
    }

    $('#tbREQUERIMIENTO tbody').html('');

    AjaxGet("../frmREQUERIMIENTO.aspx/Obtener",
        function (response) {
            $(".modal-body").LoadingOverlay("hide");
            if (response.estado) {
                
                $.each(response.objeto, function (i, row) {
                    if (row.Activo == true) {
                        $("<tr>").append(
                            $("<td>").append(
                                $("<button>").addClass("btn btn-sm btn-primary ml-2").text("Seleccionar").data("REQUERIMIENTO", row)
                            ),
                            $("<td>").text(row.Codigo),
                            $("<td>").text(row.Nombre),
                            $("<td>").text(row.Descripcion),
                            $("<td>").text(row.oCategoria.Descripcion)
                        ).appendTo("#tbREQUERIMIENTO tbody");
                    }
                })
            }

            table = $('#tbREQUERIMIENTO').DataTable();
        },
        function () {
            $(".modal-body").LoadingOverlay("hide");
        },
        function () {
            $(".modal-body").LoadingOverlay("show");
        })
}

$('#btnBuscarAREA').on('click', function () {

    $('#modalAREA').modal('show');
    cargarAREA();
})

$('#btnBuscarREQUERIMIENTO').on('click', function () {

    $('#modalREQUERIMIENTO').modal('show');
    cargarREQUERIMIENTO();
})

$('#tbAREA tbody').on('click', 'button[class="btn btn-sm btn-primary ml-2"]', function () {

    var model = $(this).data("AREA")
    $("#txtIdAREA").val(model.IdAREA);
    $("#txtNUMERO").val(model.NUMERO);
    $("#txtASUNTO").val(model.Nombre);
    $("#txtDireccion").val(model.Direccion);

    $('#modalAREA').modal('hide');
})

$('#tbREQUERIMIENTO tbody').on('click', 'button[class="btn btn-sm btn-primary ml-2"]', function () {

    var model = $(this).data("REQUERIMIENTO")
    $("#txtIdREQUERIMIENTO").val(model.IdREQUERIMIENTO);
    $("#txtCodigo").val(model.Codigo);
    $("#txtNombre").val(model.Nombre);
    $("#txtDescripcion").val(model.Descripcion);
    $('#modalREQUERIMIENTO').modal('hide');
})