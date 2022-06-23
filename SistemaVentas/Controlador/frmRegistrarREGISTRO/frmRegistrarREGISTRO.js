$("#txtCodigoREQUERIMIENTO").on('keypress', function (e) {

    
    if (e.which == 13) {

        if (parseInt($("#txtIdAREA").val()) == 0) {
            swal("Mensaje", "Debe seleccionar una AREA primero", "warning")
            return;
        }

        var request = { IdAREA: parseInt($("#txtIdAREA").val()) }

        AjaxPost("../frmREQUERIMIENTOAREA.aspx/ObtenerREQUERIMIENTOxAREA",JSON.stringify(request),
            function (response) {
                $("#txtCodigoREQUERIMIENTO").LoadingOverlay("hide");
                if (response.estado) {
                    var encontrado = false;
                    $.each(response.objeto, function (i, row) {
                        if (row.Activo == true && row.Codigo == $("#txtCodigoREQUERIMIENTO").val()) {
                           
                            $("#txtIdREQUERIMIENTO").val(row.IdREQUERIMIENTO);
                            $("#txtCodigoREQUERIMIENTO").val(row.Codigo);
                            $("#txtNombreREQUERIMIENTO").val(row.Nombre);
                            encontrado = true;
                            return false;
                        }
                    })

                    if (!encontrado) {
                        $("#txtIdREQUERIMIENTO").val("0");
                        $("#txtNombreREQUERIMIENTO").val("");
                    }

                }
            },
            function () {
                $("#txtCodigoREQUERIMIENTO").LoadingOverlay("hide");
            },
            function () {
                $("#txtCodigoREQUERIMIENTO").LoadingOverlay("show");
            })
    }
});


function cargarAREAProveedor() {

    if ($.fn.DataTable.isDataTable('#tbAREAProveedor')) {
        $('#tbAREAProveedor').DataTable().destroy();
    }

    $('#tbAREAProveedor tbody').html('');

    AjaxGet("../frmAREAProveedor.aspx/Obtener",
        function (response) {
            $(".modal-body").LoadingOverlay("hide");
            if (response.estado) {
                $.each(response.objeto, function (i, row) {

                    if (row.Activo == true) {
                        $("<tr>").append(
                            $("<td>").append(
                                $("<button>").addClass("btn btn-sm btn-primary ml-2").text("Seleccionar").data("AREAproveedor", row)
                            ),
                            $("<td>").text(row.NUMERO),
                            $("<td>").text(row.ASUNTO),
                            $("<td>").text(row.Direccion),

                        ).appendTo("#tbAREAProveedor tbody");
                    }
                })
            }

            $('#tbAREAProveedor').DataTable();
        },
        function () {
            $(".modal-body").LoadingOverlay("hide");
        },
        function () {
            $(".modal-body").LoadingOverlay("show");
        })
}

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

    var request = { IdAREA: parseInt($("#txtIdAREA").val())}

    AjaxPost("../frmREQUERIMIENTOAREA.aspx/ObtenerREQUERIMIENTOxAREA", JSON.stringify(request),
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


$('#btnBuscarAREAProveedor').on('click', function () {

    $('#modalAREAProveedor').modal('show');
    cargarAREAProveedor();
})

$('#tbAREAProveedor tbody').on('click', 'button[class="btn btn-sm btn-primary ml-2"]', function () {

    var model = $(this).data("AREAproveedor")
    $("#txtIdAREAProveedor").val(model.IdAREAProveedor);
    $("#txtNUMEROAREAProveedor").val(model.NUMERO);
    $("#txtASUNTOAREAProveedor").val(model.ASUNTO);

    $('#modalAREAProveedor').modal('hide');
})

$('#btnBuscarAREA').on('click', function () {

    $('#modalAREA').modal('show');
    cargarAREA();
})

$('#tbAREA tbody').on('click', 'button[class="btn btn-sm btn-primary ml-2"]', function () {

    var model = $(this).data("AREA")
    $("#txtIdAREA").val(model.IdAREA);
    $("#txtNUMEROAREA").val(model.NUMERO);
    $("#txtNombreAREA").val(model.Nombre);

    $('#modalAREA').modal('hide');
})

$('#btnBuscarREQUERIMIENTO').on('click', function () {

    if (parseInt($("#txtIdAREA").val()) == 0) {
        swal("Mensaje", "Debe seleccionar una AREA primero", "warning")
        return;
    }
    $('#modalREQUERIMIENTO').modal('show');
    cargarREQUERIMIENTO();
})

$('#tbREQUERIMIENTO tbody').on('click', 'button[class="btn btn-sm btn-primary ml-2"]', function () {

    var model = $(this).data("REQUERIMIENTO")
    $("#txtIdREQUERIMIENTO").val(model.IdREQUERIMIENTO);
    $("#txtCodigoREQUERIMIENTO").val(model.Codigo);
    $("#txtNombreREQUERIMIENTO").val(model.Nombre);
    $('#modalREQUERIMIENTO').modal('hide');
})

$.fn.inputFilter = function (inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
        if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
            this.value = "";
        }
    });
};

$("#txtPrecioREGISTROREQUERIMIENTO").inputFilter(function (value) {
    return /^-?\d*[.]?\d{0,2}$/.test(value);
});

$("#txtPrecioTICKETREQUERIMIENTO").inputFilter(function (value) {
    return /^-?\d*[.]?\d{0,2}$/.test(value);
});

$("#txtCantidadREQUERIMIENTO").inputFilter(function (value) {
    return /^-?\d*$/.test(value);
});

$('#btnAgregarREGISTRO').on('click', function () {

    var existe_codigo = false;
    if (
        parseInt($("#txtIdAREAProveedor").val()) == 0 ||
        parseInt($("#txtIdAREA").val()) == 0 ||
        parseInt($("#txtIdREQUERIMIENTO").val()) == 0 ||
        parseFloat($("#txtCantidadREQUERIMIENTO").val()) == 0 ||
        parseFloat($("#txtPrecioREGISTROREQUERIMIENTO").val()) == 0 ||
        parseFloat($("#txtPrecioTICKETREQUERIMIENTO").val()) == 0
    ) {
        swal("Mensaje", "Debe completar todos los campos", "warning")
        return;
    }

    $('#tbREGISTRO > tbody  > tr').each(function (index, tr) {
        var fila = tr;
        var codigoREQUERIMIENTO = $(fila).find("td.codigoREQUERIMIENTO").text();

        if (codigoREQUERIMIENTO == $("#txtCodigoREQUERIMIENTO").val()) {
            existe_codigo = true;
            return false;
        }

    });
    
    if (!existe_codigo) {
        $("<tr>").append(
            $("<td>").append(
                $("<button>").addClass("btn btn-danger btn-sm").text("Eliminar")
            ),
            $("<td>").append($("#txtNUMEROAREAProveedor").val()),
            $("<td>").append($("#txtNUMEROAREA").val()),
            $("<td>").addClass("codigoREQUERIMIENTO").data("idREQUERIMIENTO", $("#txtIdREQUERIMIENTO").val()).append($("#txtCodigoREQUERIMIENTO").val()),
            $("<td>").addClass("cantidad").append($("#txtCantidadREQUERIMIENTO").val()),
            $("<td>").addClass("precioREGISTRO").append($("#txtPrecioREGISTROREQUERIMIENTO").val()),
            $("<td>").addClass("precioTICKET").append($("#txtPrecioTICKETREQUERIMIENTO").val()),
        ).appendTo("#tbREGISTRO tbody");

        $("#txtIdREQUERIMIENTO").val("0");
        $("#txtCodigoREQUERIMIENTO").val("");
        $("#txtNombreREQUERIMIENTO").val("");
        $("#txtCantidadREQUERIMIENTO").val("0");
        $("#txtPrecioREGISTROREQUERIMIENTO").val("0");
        $("#txtPrecioTICKETREQUERIMIENTO").val("0");

    } else {
        swal("Mensaje", "El REQUERIMIENTO ya existe en la REGISTRO", "warning")
    }
})

$('#tbREGISTRO tbody').on('click', 'button[class="btn btn-danger btn-sm"]', function () {
    $(this).parents("tr").remove();
})


$('#btnTerminarGuardarREGISTRO').on('click', function () {


    var $xml = "";
    var REGISTRO = "";
    var detalleREGISTRO = ""
    var detalle = "";
    var totalcostoREGISTRO = 0;

    $xml = "<DETALLE>";
    REGISTRO = "<REGISTRO>" +
        "<IdUsuario>!idusuario¡</IdUsuario>" +
        "<IdAREAProveedor>" + $("#txtIdAREAProveedor").val() + "</IdAREAProveedor>" +
        "<IdAREA>" + $("#txtIdAREA").val() + "</IdAREA>" +
        "<TotalCosto>!totalcosto¡</TotalCosto>" +
        "</REGISTRO>";
    detalleREGISTRO = "<DETALLE_REGISTRO>"

    $('#tbREGISTRO > tbody  > tr').each(function (index, tr) {
        
        var fila = tr;
        var idREQUERIMIENTO = parseFloat($(fila).find("td.codigoREQUERIMIENTO").data("idREQUERIMIENTO"));
        var cantidad = parseFloat($(fila).find("td.cantidad").text());
        var precioREGISTRO = parseFloat($(fila).find("td.precioREGISTRO").text());
        var precioTICKET = parseFloat($(fila).find("td.precioTICKET").text());
        var totalcosto = parseFloat(cantidad) * parseFloat(precioREGISTRO);

        detalle = detalle + "<DETALLE>" +
            "<IdREGISTRO>0</IdREGISTRO>" +
            "<IdREQUERIMIENTO>" + idREQUERIMIENTO + "</IdREQUERIMIENTO>" +
            "<Cantidad>" + cantidad + "</Cantidad>" +
            "<PrecioUnidadREGISTRO>" + precioREGISTRO + "</PrecioUnidadREGISTRO>" +
            "<PrecioUnidadTICKET>" + precioTICKET + "</PrecioUnidadTICKET>" +
            "<TotalCosto>" + totalcosto.toString() + "</TotalCosto>" +
            "</DETALLE>";
        totalcostoREGISTRO = totalcostoREGISTRO + totalcosto;

    });

    REGISTRO = REGISTRO.replace("!totalcosto¡", totalcostoREGISTRO.toString());
    $xml = $xml + REGISTRO + detalleREGISTRO + detalle + "</DETALLE_REGISTRO></DETALLE>";

    var request = { xml: $xml };
    AjaxPost("../frmRegistrarREGISTRO.aspx/Guardar", JSON.stringify(request),
        function (response) {
            $(".card-REGISTRO").LoadingOverlay("hide");
            if (response.estado) {
                //AREAPROVEEDOR
                $("#txtIdAREAProveedor").val("0");
                $("#txtNUMEROAREAProveedor").val("");
                $("#txtASUNTOAREAProveedor").val("");

                //AREA
                $("#txtIdAREA").val("0");
                $("#txtNUMEROAREA").val("");
                $("#txtNombreAREA").val("");

                //REQUERIMIENTO
                $("#txtIdREQUERIMIENTO").val("0");
                $("#txtCodigoREQUERIMIENTO").val("");
                $("#txtNombreREQUERIMIENTO").val("");
                $("#txtCantidadREQUERIMIENTO").val("0");
                $("#txtPrecioREGISTROREQUERIMIENTO").val("0");
                $("#txtPrecioTICKETREQUERIMIENTO").val("0");

                $("#tbREGISTRO tbody").html("");

                swal("Mensaje", "Se registro el REGISTRO", "success")
            } else {
                swal("Mensaje", "No se pudo registrar el REGISTRO", "warning")
            }
        },
        function () {
            $(".card-REGISTRO").LoadingOverlay("hide");
        },
        function () {
            $(".card-REGISTRO").LoadingOverlay("show");
        })

})
