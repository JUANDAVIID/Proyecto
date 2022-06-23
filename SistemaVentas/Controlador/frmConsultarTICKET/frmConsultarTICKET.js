
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
    $("#txtFechaInicio").val(ObtenerFecha());
    $("#txtFechaFin").val(ObtenerFecha());

    CargarDatos();
});

$('#btnBuscar').on('click', function () {

    CargarDatos();
})

function CargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbTICKET')) {
        $('#tbTICKET').DataTable().destroy();
    }

    $('#tbTICKET tbody').html('');

    var request = {
        codigo: $("#txtCodigoTICKET").val(),
        fechainicio: $("#txtFechaInicio").val(),
        fechafin: $("#txtFechaFin").val(),
        numerodocumento: $("#txtDocumentoDATOS").val(),
        nombres: $("#txtNombreDATOS").val()
    };

    AjaxPost("../frmConsultarTICKET.aspx/ObtenerLista", JSON.stringify(request),
        function (response) {
            $(".mt-3").LoadingOverlay("hide");
            if (response.estado) {
                $("#tbTICKET tbody").html("");
                
                $.each(response.objeto, function (i, row) {
                    $("<tr>").append(
                        $("<td>").append(
                            $("<button>").addClass("btn btn-sm btn-primary").text("Ver detalle").data("TICKET", row)
                        ),
                        $("<td>").text(row.TipoDocumento),
                        $("<td>").text(row.Codigo),
                        $("<td>").text(row.FechaRegistro),
                        $("<td>").text(row.oDATOS.NumeroDocumento),
                        $("<td>").text(row.oDATOS.Nombre),
                        $("<td>").text(row.TotalCosto)
                    ).appendTo("#tbTICKET tbody");

                })
            }
            table = $('#tbTICKET').DataTable({
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

$('#tbTICKET tbody').on('click', 'button[class="btn btn-sm btn-primary"]', function () {
    var TICKET = $(this).data("TICKET");
    var url = 'docTICKET.aspx?id=' + TICKET.IdTICKET;
    window.open(url, '', 'height=600,width=800,scrollbars=0,location=1,toolbar=0');
})


