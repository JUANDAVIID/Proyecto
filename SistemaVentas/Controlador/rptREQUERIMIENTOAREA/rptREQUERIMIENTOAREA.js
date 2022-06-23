var table;

$(document).ready(function () {
    table = $('#tbReporte').DataTable({
        "scrollY": "200px",
        "scrollCollapse": true,
        "scrollX": true,
        "paging": false,
        dom: 'Bfrtip',
        buttons: [{
            extend: 'excelHtml5',
            title: 'REQUERIMIENTOenAREA_' + ObtenerFecha()
            },
            {
                extend: 'pdfHtml5',
                title: 'REQUERIMIENTOenAREA_' + ObtenerFecha()
            },
            {
                extend: 'print'
            }
        ]
    });
    ObtenerAREA();
    
});


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



function CargarDatos() {

    if ($.fn.DataTable.isDataTable('#tbReporte')) {
        $('#tbReporte').DataTable().destroy();
    }

    $('#tbReporte tbody').html('');

    var request = {
        codigoREQUERIMIENTO: $("#txtCodigoREQUERIMIENTO").val(),
        IdAREA: $("#cboAREA").val() == null ? "0" : $("#cboAREA").val()
    };
    AjaxPost("../rptREQUERIMIENTOAREA.aspx/Obtener", JSON.stringify(request),
        function (response) {
            $(".mt-3").LoadingOverlay("hide");
            if (response.estado) {

                var filas = JSON.parse(response.objeto)
                $("#tbReporte tbody").html("");

                if (filas.length > 0) {
                    $.each(filas, function (i, row) {
                        
                        $("<tr>").append(
                            $("<td>").text(row["NUMERO AREA"]),
                            $("<td>").text(row["Nombre AREA"]),
                            $("<td>").text(row["Direccion AREA"]),
                            $("<td>").text(row["Codigo REQUERIMIENTO"]),
                            $("<td>").text(row["Nombre REQUERIMIENTO"]),
                            $("<td>").text(row["Descripcion REQUERIMIENTO"]),
                            $("<td>").text(row["Stock en AREA"]),
                            $("<td>").text(row["Precio REGISTRO"]),
                            $("<td>").text(row["Precio TICKET"])

                        ).appendTo("#tbReporte tbody");

                    })
                }
               

            }
            table = $('#tbReporte').DataTable({
                "scrollY": "200px",
                "scrollCollapse": true,
                "scrollX": true,
                "paging": false,
                dom: 'Bfrtip',
                buttons: [{
                        extend: 'excelHtml5',
                    title: 'REQUERIMIENTOenAREA_' + ObtenerFecha()
                    },
                    {
                        extend: 'pdfHtml5',
                        title: 'REQUERIMIENTOenAREA_' + ObtenerFecha()
                    },
                    {
                        extend: 'print'
                    }]
            } );
        },
        function () {
            $(".mt-3").LoadingOverlay("hide");
        },
        function () {
            $(".mt-3").LoadingOverlay("show");
        })
}

$('#btnBuscar').on('click', function () {

    CargarDatos();
})