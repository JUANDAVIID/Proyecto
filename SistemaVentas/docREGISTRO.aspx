<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="docREGISTRO.aspx.cs" Inherits="SISTEMATICKET.docREGISTRO" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <div style="font-size: 11px; text-align: right;">
            <center>
                <button type="button" id="Imprimir" onclick="javascript:imprSelec('seleccion')">IMPRIMIR</button>
            </center>
            <br>
   </div>

    <div id="seleccion">
        <center>
       
    <table style="width: 650px; border:2px solid #000;padding: 10px;" border="0">
        <tbody>
            <tr>
                <td colspan="4">
                <img height="100" src="IMAGENESCOORDINADORATANQUES/ticketporcoordinadoradetanques.PNG" /> - <B>COORDINADORA DE TANQUES S.A.S.</B>
                    <p style = "font-family:Cooper;color:#808080">SISTEMA TICKETS</p>
                </td>

                <td colspan="2" style="vertical-align: top;" align="right">
                    <table border="1" style="height: 90px; font-weight: bold; ">
                        <tr bgcolor="#D9D9D9"><td align="center">REGISTRO</td></tr>
                        <tr><td align="center">NRO - <span id="numero"></span> </td></tr>
                        <tr><td align="center">Fecha - <span id="fechaREGISTRO"></span> </td></tr>
                    </table>
                </td>
            </tr>
            <tr style="height: 20px;"><td colspan="6"><br /></td></tr>
            <tr>
                <td colspan="6">
                    <table style="width: 100%;">
                        <tr bgcolor="#D9D9D9">
                            <td colspan="4">
                                <u>Detalle AREAProveedor</u>
                            </td>
                        </tr>
                        <tr>
                            <td width="15">NUMERO:</td>
                            <td style="border-bottom: 1px solid black;"><center><span id="NUMEROAREAproveedor"></span></center></td>
                            <td width="100">ASUNTO:</td>
                            <td style="border-bottom: 1px solid black;"><center><span id="nombreAREAproveedor"></span></center></td>
                        </tr>
                    </table>
                    <hr>
                </td>
            </tr>
            <tr>
                <td colspan="6">
                    <table style="width: 100%;" border="0">
                        <tr bgcolor="#D9D9D9">
                            <td colspan="4">
                                <u>AREA Destino</u>
                            </td>
                        </tr>
                        <tr>
                            <td width="15">NUMERO:</td>
                            <td style="border-bottom: 1px solid black;"><center><span id="NUMEROAREA"></span></center></td>
                            <td width="110">Nombre AREA:</td>
                            <td style="border-bottom: 1px solid black;"><center><span id="nombreAREA"></span></center></td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr style="height: 10px;"></tr>
            <tr style="height: 10px;"><td style="height:10px"></td></tr>
            <tr bgcolor="#D9D9D9">
                <td colspan="6">
                    <u>Detalle REQUERIMIENTO</u>
                </td>
            </tr>
            <tr>
                <td colspan="6">
                    <table id="tbREGISTRO" border="1" style=" width: 100%;">
                        <thead>
                            <tr bgcolor="#D9D9D9">
                                <th style="width: 15%;">Cantidad</th>
                                <th style="width: 50%;">Concepto</th>
                                <th style="width: 20%;">P.Unit REGISTRO</th>
                                <th style="width: 25%;">Importe</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td colspan="4"></td>
                <td colspan="2" align="right">
                    <table style="font-weight: bold; width: 150px;">
                        <tr>
                            <td>Total S/.</td>
                            <td style="border:1px solid black;"><span id="totalcosto"></span></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</center>
    </div>
    
   <script src="Assets/Plugins/jquery/jquery.3.5.1.min.js"></script>
   <script src="Controlador/Utilidades.js"></script>
   <script src="Assets/Plugins/loadingoverlay/loadingoverlay.js"></script>

   <script type="text/javascript" language="javascript">

       $(document).ready(function () {

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
           const IdREGISTRO = urlParams.get('id')
            
           CargarDatos(IdREGISTRO);
       });

       function CargarDatos($IdREGISTRO) {
           
           $('#tbREGISTRO tbody').html('');

            var request = {
                IdREGISTRO: $IdREGISTRO
           };

           AjaxPost("../frmConsultarREGISTRO.aspx/ObtenerDetalle", JSON.stringify(request),
                function (response) {
                    $("#seleccion").LoadingOverlay("hide");
                    if (response.estado) {
                        $("#numero").text(response.objeto.Codigo);
                        $("#fechaREGISTRO").text(response.objeto.FechaREGISTRO);

                        $("#NUMEROAREAproveedor").text(response.objeto.oAREAProveedor.NUMERO);
                        $("#nombreAREAproveedor").text(response.objeto.oAREAProveedor.ASUNTO);

                        $("#NUMEROAREA").text(response.objeto.oAREA.NUMERO);
                        $("#nombreAREA").text(response.objeto.oAREA.Nombre);
                        
                        $("#totalcosto").text(response.objeto.TotalCosto);

                        $("#tbREGISTRO tbody").html("");
                
                        $.each(response.objeto.oListaDetalleREGISTRO, function (i, row) {
                            $("<tr>").append(
                                $("<td>").text(row.Cantidad),
                                $("<td>").text(row.oREQUERIMIENTO.Nombre),
                                $("<td>").text(row.PrecioUnitarioREGISTRO),
                                $("<td>").text(row.TotalCosto)
                        
                            ).appendTo("#tbREGISTRO tbody");

                        })

                    } 
                },
                function () {
                    $("#seleccion").LoadingOverlay("hide");
                },
                function () {
                    $("#seleccion").LoadingOverlay("show");
                })
       }

        function imprSelec(nombre) {
            var printContents = document.getElementById(nombre).innerHTML;
            var originalContents = document.body.innerHTML;

            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        }
        function hide() {
            document.getElementById('Imprimir').style.visibility = "hidden";
        }
   </script>



</body>
</html>
