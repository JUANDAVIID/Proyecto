
var table;
$.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '< Ant',
    nextText: 'Sig >',
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};
$.datepicker.setDefaults($.datepicker.regional['es']);


$(document).ready(function () {
    $("#txtFechaInicio").datepicker();
    $("#txtFechaFin").datepicker();
    ObtenerAREA();
    ObtenerAREAProveedores();
    $("#txtFechaInicio").val(ObtenerFecha());
    $("#txtFechaFin").val(ObtenerFecha());
    
    CargarDatos();
});

$('#btnBuscar').on('click', function () {

    CargarDatos();
})

function CargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbREGISTRO')) {
        $('#tbREGISTRO').DataTable().destroy();
    }

    $('#tbREGISTRO tbody').html('');

    var request = {
        fechainicio : $("#txtFechaInicio").val(),
        fechafin : $("#txtFechaFin").val(),
        idAREAproveedor: $("#cboAREAProveedor").val() == null ? "0" : $("#cboAREAProveedor").val(),
        IdAREA: $("#cboAREA").val() == null ? "0" : $("#cboAREA").val()
    };
    AjaxPost("../frmConsultarREGISTRO.aspx/Obtener", JSON.stringify(request),
        function (response) {
            $(".mt-3").LoadingOverlay("hide");
            if (response.estado) {

                
                $("#tbREGISTRO tbody").html("");
                
                $.each(response.objeto, function (i, row) {
                    $("<tr>").append(
                        $("<td>").append(
                            $("<button>").addClass("btn btn-sm btn-primary").text("Ver detalle").data("REGISTRO", row)
                        ),
                        $("<td>").text(row.NumeroREGISTRO),
                        $("<td>").text(row.oAREAProveedor.ASUNTO),
                        $("<td>").text(row.oAREA.Nombre),
                        $("<td>").text(row.FechaREGISTRO),
                        $("<td>").text(row.TotalCosto)
                        
                    ).appendTo("#tbREGISTRO tbody");

                })

            } 
            table = $('#tbREGISTRO').DataTable({
                responsive: true
            });
        },
        function () {
            $(".mt-3").LoadingOverlay("hide");
        },
        function () {
            $(".mt-3").LoadingOverlay("show");
        })
}

$('#tbREGISTRO tbody').on('click', 'button[class="btn btn-sm btn-primary"]', function () {
    var REGISTRO = $(this).data("REGISTRO");
    var url = 'docREGISTRO.aspx?id=' + REGISTRO.IdREGISTRO ;
    window.open(url, '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');
})



function ObtenerAREA() {
    $("#cboAREA").html("");
    AjaxGet("../frmAREA.aspx/Obtener",
        function (response) {
            $("#cboAREA").LoadingOverlay("hide");
            if (response.estado) {

                $("<option>").attr({ "value": 0 }).text("-- Seleccionar todas --").appendTo("#cboAREA");

                $.each(response.objeto, function (i, row) {
                    if (row.Activo == true)
                        $("<option>").attr({ "value": row.IdAREA }).text(row.Nombre).appendTo("#cboAREA");
                })
            }
        },
        function () {
            $("#cboAREA").LoadingOverlay("hide");
        },
        function () {
            $("#cboAREA").LoadingOverlay("show");
        })
}

function ObtenerAREAProveedores() {
    $("#cboAREAProveedor").html("");
    AjaxGet("../frmAREAProveedor.aspx/Obtener",
        function (response) {
            $("#cboAREAProveedor").LoadingOverlay("hide");
            if (response.estado) {

                $("<option>").attr({ "value": 0 }).text("-- Seleccionar todas --").appendTo("#cboAREAProveedor");
                $.each(response.objeto, function (i, row) {
                    if (row.Activo == true)
                        $("<option>").attr({ "value": row.IdAREAProveedor }).text(row.ASUNTO).appendTo("#cboAREAProveedor");
                })
            }
        },
        function () {
            $("#cboAREAProveedor").LoadingOverlay("hide");
        },
        function () {
            $("#cboAREAProveedor").LoadingOverlay("show");
        })
}