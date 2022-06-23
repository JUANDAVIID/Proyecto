$(document).ready(function () {

    $("#txtREQUERIMIENTOcantidad").val("1");
    $("#txtfechaTICKET").val(ObtenerFecha());

    AjaxGet("../Inicio.aspx/ObtenerDetalleUsuario",
        function (response) {
            if (response.estado) {
                //AREA
                $("#txtIdAREA").val(response.objeto.oAREA.IdAREA);
                $("#lblAREAnombre").text(response.objeto.oAREA.Nombre);
                $("#lblAREANUMERO").text(response.objeto.oAREA.NUMERO);
                $("#lblAREAdireccion").text(response.objeto.oAREA.Direccion);

                //USUARIO
                $("#txtIdUsuario").val(response.objeto.IdUsuario);
                $("#lblempleadonombre").text(response.objeto.Nombres);
                $("#lblempleadoapellido").text(response.objeto.Apellidos);
                $("#lblempleadocorreo").text(response.objeto.Correo);
            }
        },
        function () {
        },
        function () {
        })

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

$("#txtREQUERIMIENTOcantidad").inputFilter(function (value) {
    return /^-?\d*$/.test(value);
});

$("#txtmontopago").inputFilter(function (value) {
    return /^-?\d*[.]?\d{0,2}$/.test(value);
});

$('#btnBuscarREQUERIMIENTO').on('click', function () {
    $('#modalREQUERIMIENTO').modal('show');

    if ($.fn.DataTable.isDataTable('#tbREQUERIMIENTO')) {
        $('#tbREQUERIMIENTO').DataTable().destroy();
    }

    $('#tbREQUERIMIENTO tbody').html('');

    var request = { IdAREA: parseInt($("#txtIdAREA").val()) }

    AjaxPost("../frmCrearTICKET.aspx/ObtenerREQUERIMIENTOxAREA", JSON.stringify(request),
        function (response) {
            $(".modal-body").LoadingOverlay("hide");
            if (response.estado) {
                $.each(response.objeto, function (i, row) {
                        $("<tr>").append(
                            $("<td>").append(
                                $("<button>").addClass("btn btn-sm btn-primary ml-2").append(
                                    $("<i>").addClass("fa fa-check").attr({"aria-hidden":"true"})
                                ).data("REQUERIMIENTO", row)
                            ),
                            $("<td>").text(row.oREQUERIMIENTO.Codigo),
                            $("<td>").text(row.oREQUERIMIENTO.Nombre),
                            $("<td>").text(row.oREQUERIMIENTO.Descripcion),
                            $("<td>").text(row.Stock)
                        ).appendTo("#tbREQUERIMIENTO tbody");
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

})

$('#tbREQUERIMIENTO tbody').on('click', 'button[class="btn btn-sm btn-primary ml-2"]', function () {
    var model = $(this).data("REQUERIMIENTO")
    $("#txtIdREQUERIMIENTO").val(model.oREQUERIMIENTO.IdREQUERIMIENTO);
    $("#txtREQUERIMIENTOcodigo").val(model.oREQUERIMIENTO.Codigo);
    $("#txtREQUERIMIENTOnombre").val(model.oREQUERIMIENTO.Nombre);
    $("#txtREQUERIMIENTOdescripcion").val(model.oREQUERIMIENTO.Descripcion);
    $("#txtREQUERIMIENTOstock").val(model.Stock);
    $("#txtREQUERIMIENTOprecio").val(model.PrecioUnidadTICKET);
    $("#txtREQUERIMIENTOcantidad").val("1");
    $('#modalREQUERIMIENTO').modal('hide');
})

$("#txtREQUERIMIENTOcodigo").on('keypress', function (e) {


    if (e.which == 13) {

        var request = { IdAREA: parseInt($("#txtIdAREA").val()) }

        AjaxPost("../frmCrearTICKET.aspx/ObtenerREQUERIMIENTOxAREA", JSON.stringify(request),
            function (response) {
                $("#txtREQUERIMIENTOcodigo").LoadingOverlay("hide");
                var encontrado = false;
                if (response.estado) {
                    
                    $.each(response.objeto, function (i, row) {
                        if (row.oREQUERIMIENTO.Codigo == $("#txtREQUERIMIENTOcodigo").val()) {
                            $("#txtIdREQUERIMIENTO").val(row.oREQUERIMIENTO.IdREQUERIMIENTO);
                            $("#txtREQUERIMIENTOcodigo").val(row.oREQUERIMIENTO.Codigo);
                            $("#txtREQUERIMIENTOnombre").val(row.oREQUERIMIENTO.Nombre);
                            $("#txtREQUERIMIENTOdescripcion").val(row.oREQUERIMIENTO.Descripcion);
                            $("#txtREQUERIMIENTOstock").val(row.Stock);
                            $("#txtREQUERIMIENTOprecio").val(row.PrecioUnidadTICKET);
                            encontrado = true;
                            return false;
                        }
                    })
                }

                if (!encontrado) {
                    $("#txtIdREQUERIMIENTO").val("0");
                    $("#txtREQUERIMIENTOcodigo").val("");
                    $("#txtREQUERIMIENTOnombre").val("");
                    $("#txtREQUERIMIENTOdescripcion").val("");
                    $("#txtREQUERIMIENTOstock").val("");
                    $("#txtREQUERIMIENTOprecio").val("");
                    $("#txtREQUERIMIENTOcantidad").val("1");
                }

            },
            function () {
                $("#txtREQUERIMIENTOcodigo").LoadingOverlay("hide");
            },
            function () {
                $("#txtREQUERIMIENTOcodigo").LoadingOverlay("show");
            })
       
    }
});


$('#btnAgregar').on('click', function () {

    $("#txtREQUERIMIENTOcantidad").val($("#txtREQUERIMIENTOcantidad").val() == "" ? "0" : $("#txtREQUERIMIENTOcantidad").val());

    var existe_codigo = false;
    if (
        parseInt($("#txtIdREQUERIMIENTO").val()) == 0 ||
        parseFloat($("#txtREQUERIMIENTOcantidad").val()) == 0
    ) {
        swal("Mensaje", "Debe completar todos los campos del REQUERIMIENTO", "warning")
        return;
    }

    $('#tbTICKET > tbody  > tr').each(function (index, tr) {
        var fila = tr;
        var idREQUERIMIENTO = $(fila).find("td.REQUERIMIENTO").data("idREQUERIMIENTO");

        if (idREQUERIMIENTO == $("#txtIdREQUERIMIENTO").val()) {
            existe_codigo = true;
            return false;
        }

    });

    if (!existe_codigo) {

        controlarStock(parseInt($("#txtIdREQUERIMIENTO").val()), parseInt($("#txtIdAREA").val()), parseInt($("#txtREQUERIMIENTOcantidad").val()),true);

        var importetotal = parseFloat($("#txtREQUERIMIENTOprecio").val()) * parseFloat($("#txtREQUERIMIENTOcantidad").val());
        $("<tr>").append(
            $("<td>").append(
                $("<button>").addClass("btn btn-danger btn-sm").text("Eliminar").data("idREQUERIMIENTO", parseInt($("#txtIdREQUERIMIENTO").val())).data("cantidadREQUERIMIENTO", parseInt($("#txtREQUERIMIENTOcantidad").val()))
            ),
            $("<td>").addClass("REQUERIMIENTOcantidad").text($("#txtREQUERIMIENTOcantidad").val()),
            $("<td>").addClass("REQUERIMIENTO").data("idREQUERIMIENTO", $("#txtIdREQUERIMIENTO").val()).text($("#txtREQUERIMIENTOnombre").val()),
            $("<td>").text($("#txtREQUERIMIENTOdescripcion").val()),
            $("<td>").addClass("REQUERIMIENTOprecio").text($("#txtREQUERIMIENTOprecio").val()),
            $("<td>").addClass("importetotal").text(importetotal)
        ).appendTo("#tbTICKET tbody");

        $("#txtIdREQUERIMIENTO").val("0");
        $("#txtREQUERIMIENTOcodigo").val("");
        $("#txtREQUERIMIENTOnombre").val("");
        $("#txtREQUERIMIENTOdescripcion").val("");
        $("#txtREQUERIMIENTOstock").val("");
        $("#txtREQUERIMIENTOprecio").val("");
        $("#txtREQUERIMIENTOcantidad").val("1");

        $("#txtREQUERIMIENTOcodigo").focus();

        calcularPrecios();
    } else {
        swal("Mensaje", "El REQUERIMIENTO ya existe en el TICKET", "warning")
    }
})

$('#tbTICKET tbody').on('click', 'button[class="btn btn-danger btn-sm"]', function () {
    var idREQUERIMIENTO = $(this).data("idREQUERIMIENTO");
    var cantidadREQUERIMIENTO = $(this).data("cantidadREQUERIMIENTO");

    controlarStock(idREQUERIMIENTO, parseInt($("#txtIdAREA").val()), cantidadREQUERIMIENTO, false);
    $(this).parents("tr").remove();

    calcularPrecios();
})

$('#btnTerminarGuardarTICKET').on('click', function () {

    //VALIDACIONES DE DATOS
    if ($("#txtDATOSdocumento").val().trim() == "" || $("#txtDATOSnombres").val().trim() == "") {
        swal("Mensaje", "Complete los datos del Ticket", "warning");
        return;
    }
    //VALIDACIONES DE REQUERIMIENTO
    if ($('#tbTICKET tbody tr').length == 0) {
        swal("Mensaje", "Debe registrar minimo un REQUERIMIENTO en el TICKET", "warning");
        return;
    }

    //VALIDACIONES DE MONTO PAGO
    if ($("#txtmontopago").val().trim() == "") {
        swal("Mensaje", "Ingrese el monto de pago", "warning");
        return;
    }

    var $totalREQUERIMIENTO = 0;
    var $totalimportes = 0;

    var DETALLE = "";
    var TICKET = "";
    var DETALLE_DATOS = "";
    var DETALLE_TICKET = "";
    var DATOS_TICKET = "";
    
    calcularCambio();

    $('#tbTICKET > tbody  > tr').each(function (index, tr) {
        var fila = tr;
        var REQUERIMIENTOcantidad = parseInt($(fila).find("td.REQUERIMIENTOcantidad").text());
        var idREQUERIMIENTO = $(fila).find("td.REQUERIMIENTO").data("idREQUERIMIENTO");
        var REQUERIMIENTOprecio = parseFloat($(fila).find("td.REQUERIMIENTOprecio").text());
        var importetotal = parseFloat($(fila).find("td.importetotal").text());

        $totalREQUERIMIENTO = $totalREQUERIMIENTO + REQUERIMIENTOcantidad;
        $totalimportes = $totalimportes + importetotal;

        DATOS_TICKET = DATOS_TICKET + "<DATOS>"+
            "<IdTICKET> 0</IdTICKET >" +
            "<IdREQUERIMIENTO>" + idREQUERIMIENTO + "</IdREQUERIMIENTO>" +
            "<Cantidad>" + REQUERIMIENTOcantidad + "</Cantidad>" +
            "<PrecioUnidad>" + REQUERIMIENTOprecio + "</PrecioUnidad>" +
            "<ImporteTotal>" + importetotal + "</ImporteTotal>" +
        "</DATOS>"
    });


    TICKET = "<TICKET>" +
        "<IdAREA>" + $("#txtIdAREA").val() + "</IdAREA>" +
        "<IdUsuario>" + $("#txtIdUsuario").val() + "</IdUsuario>" +
        "<IdDATOS>0</IdDATOS>" +
        "<TipoDocumento>" + $("#cboTICKETtipodocumento").val() + "</TipoDocumento>" +
        "<CantidadREQUERIMIENTO>" + $('#tbTICKET tbody tr').length + "</CantidadREQUERIMIENTO>" +
        "<CantidadTotal>" + $totalREQUERIMIENTO + "</CantidadTotal>" +
        "<TotalCosto>" + $totalimportes + "</TotalCosto>" +
        "<ImporteRecibido>" + $("#txtmontopago").val() + "</ImporteRecibido>" +
        "<ImporteCambio>" + $("#txtcambio").val() + "</ImporteCambio>" +
        "</TICKET>";

    DETALLE_DATOS = "<DETALLE_DATOS><DATOS>" +
        "<TipoDocumento>" + $("#cboDATOStipodocumento").val() +"</TipoDocumento>" +
        "<NumeroDocumento>" + $("#txtDATOSdocumento").val() +"</NumeroDocumento>" +
        "<Nombre>" + $("#txtDATOSnombres").val() +"</Nombre>" +
        "<Direccion>" + $("#txtDATOSdireccion").val() +"</Direccion>" +
        "<Telefono>" + $("#txtDATOStelefono").val() +"</Telefono>" +
        "</DATOS></DETALLE_DATOS>";

    DETALLE_TICKET = "<DETALLE_TICKET>" + DATOS_TICKET + "</DETALLE_TICKET>";

    DETALLE = "<DETALLE>" + TICKET + DETALLE_DATOS + DETALLE_TICKET + "</DETALLE>"


    var request = { xml: DETALLE };
    AjaxPost("../frmCrearTICKET.aspx/Guardar", JSON.stringify(request),
        function (response) {
            $(".card-TICKET").LoadingOverlay("hide");
            if (response.estado) {
                //DOCUMENTO
                $("#cboTICKETtipodocumento").val("Carnet Extranjeria");

                //DATOS
                $("#cboDATOStipodocumento").val("Cedula Ciudadana");
                $("#txtDATOSdocumento").val("");
                $("#txtDATOSnombres").val("");
                $("#txtDATOSdireccion").val("");
                $("#txtDATOStelefono").val("");


                //REQUERIMIENTO
                $("#txtIdREQUERIMIENTO").val("0");
                $("#txtREQUERIMIENTOcodigo").val("");
                $("#txtREQUERIMIENTOnombre").val("");
                $("#txtREQUERIMIENTOdescripcion").val("");
                $("#txtREQUERIMIENTOstock").val("");
                $("#txtREQUERIMIENTOprecio").val("");
                $("#txtREQUERIMIENTOcantidad").val("1");

                //PRECIOS
                $("#txtsubtotal").val("0");
                $("#txtigv").val("0");
                $("#txttotal").val("0");
                $("#txtmontopago").val("");
                $("#txtcambio").val("");


                $("#tbTICKET tbody").html("");

                var url = 'docTICKET.aspx?id=' + response.valor;
                window.open(url, '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');
                
            } else {
                swal("Mensaje", "No se pudo registrar la TICKET", "warning")
            }
        },
        function () {
            $(".card-TICKET").LoadingOverlay("hide");
        },
        function () {
            $(".card-TICKET").LoadingOverlay("show");
        })

})

function calcularCambio() {
    var montopago = $("#txtmontopago").val().trim() == "" ? 0 : parseFloat($("#txtmontopago").val().trim());
    var totalcosto = parseFloat($("#txttotal").val().trim());
    var cambio = 0;
    cambio = (montopago <= totalcosto ? totalcosto : montopago) - totalcosto;

    $("#txtcambio").val(cambio.toFixed(2));
}

$('#btncalcular').on('click', function () {
    calcularCambio();
})


function calcularPrecios() {
    var subtotal = 0;
    var igv = 0;
    var sumatotal = 0;
    $('#tbTICKET > tbody  > tr').each(function (index, tr) {
        var fila = tr;
        var importetotal = parseFloat($(fila).find("td.importetotal").text());
        sumatotal = sumatotal + importetotal;
    });
    igv = sumatotal * 0.18;
    subtotal = sumatotal - igv;


    $("#txtsubtotal").val(subtotal.toFixed(2));
    $("#txtigv").val(igv.toFixed(2));
    $("#txttotal").val(sumatotal.toFixed(2));
}




function controlarStock($idREQUERIMIENTO, $IdAREA,$cantidad,$restar) {
    var request = {
        idREQUERIMIENTO: $idREQUERIMIENTO,
        IdAREA: $IdAREA,
        cantidad: $cantidad,
        restar: $restar
    }

    AjaxPost("../frmCrearTICKET.aspx/ControlarStock", JSON.stringify(request) ,
        function (response) {
            if (response.estado) {
            }
        },
        function () {
        },
        function () {
        })
}


window.onbeforeunload = function () {
    if ($('#tbTICKET tbody tr').length > 0) {

        $('#tbTICKET > tbody  > tr').each(function (index, tr) {
            var fila = tr;
            var REQUERIMIENTOcantidad = parseInt($(fila).find("td.REQUERIMIENTOcantidad").text());
            var idREQUERIMIENTO = $(fila).find("td.REQUERIMIENTO").data("idREQUERIMIENTO");

            controlarStock(parseInt(idREQUERIMIENTO), parseInt($("#txtIdAREA").val()), parseInt(REQUERIMIENTOcantidad), false);
        });
    }
};

//Textarea del frmCrearTicket - Limites.

var inputs = "input[maxlength], textarea[maxlength]";
$(document).on('keyup', "[maxlength]", function (e) {
    var este = $(this),
        maxlength = este.attr('maxlength'),
        maxlengthint = parseInt(maxlength),
        textoActual = este.val(),
        currentCharacters = este.val().length;
    remainingCharacters = maxlengthint - currentCharacters,
        espan = este.prev('label').find('span');
    // Detectamos si es IE9 y si hemos llegado al final, convertir el -1 en 0 - bug ie9 porq. no coge directamente el atributo 'maxlength' de HTML5
    if (document.addEventListener && !window.requestAnimationFrame) {
        if (remainingCharacters <= -1) {
            remainingCharacters = 0;
        }
    }
    espan.html(remainingCharacters);
    if (!!maxlength) {
        var texto = este.val();
        if (texto.length >= maxlength) {
            este.removeClass().addClass("borderojo");
            este.val(text.substring(0, maxlength));
            e.preventDefault();
        }
        else if (texto.length < maxlength) {
            este.removeClass().addClass("bordegris");
        }
    }
});