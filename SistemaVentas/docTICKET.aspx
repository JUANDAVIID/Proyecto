<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="docTICKET.aspx.cs" Inherits="SISTEMATICKET.docTICKET" %>

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
            <div>
                <table style="width: 650px; border:2px solid #000;padding: 10px;" border="0">
                    <tbody>
                        <tr>
                            <td colspan="4">
                                <img height="100" src="IMAGENESCOORDINADORATANQUES/COORDITANQUES.PNG" />
                            </td>
                            <td colspan="2" rowspan="3" align="center" style="vertical-align: top;">
                                <table border="1" style="width: 100%; height: 100px; font-weight: bold; ">
                                    <tr><td align="center">N° AREA <span id="NUMEROAREA"></span></td></tr>
                                    <tr bgcolor="#D9D9D9"><td align="center"><span id="tipodocumento"></span></td></tr>
                                    <tr><td align="center">NRO - <span id="codigodocumento"></span> </td></tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" align="center">Solicitado por: <span id="nombreempleado"></span></td>
                        </tr>
                        <tr>
                            <td colspan="4" align="center"><span id="direccionAREA"></span></td>
                        </tr>
                        <tr style="height: 20px;"><td colspan="6"><br /></td></tr>
                        <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                       <tr>
                           <td colspan="6">
                               <table style=" width: 100%;" border="0">
                                   <tr>
                                       <td colspan="1" style="width:50px !important">DATOS:</td>
                                       <td colspan="5" style="border-bottom:1px solid #000"><span id="nombresDATOS"></span></td>
                                   </tr>
                                   <tr>
                                       <td colspan="1" style="width:50px !important">Solicitud:</td>
                                       <td colspan="5" style="height:80px; border-bottom:1px solid #000"><span id="direccionDATOS"></span></td>

                                   </tr>
                                   <tr>
                                       <td style="width:50px">Nro.Documento:</td>
                                       <td style="border-bottom:1px solid #000"><span id="documentoDATOS"></span></td>
                                       <td style="width:50px"> Telefono:</td>
                                       <td style="border-bottom:1px solid #000"><span id="telefonoDATOS"></span></td>
                                       <td style="width:50px"> Fecha:</td>
                                       <td style="border-bottom:1px solid #000"><span id="fecharegistro"></span></td>
                                   </tr>
                               </table>
                           </td>
                       </tr>



                        <tr>
                            <td colspan="6">
                                <table id="tbTICKET" border="1" style="width: 100%;">
                                    <thead>
                                        <tr bgcolor="#D9D9D9">
                                            <th style="width: 15%;">Cantidad</th>
                                            <th style="width: 45%;">Descripcion</th>
                                           
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr style="height: 10px;"><td colspan="6"><br /><br /></td></tr>
                        <tr>
                           
                            
                        </tr>
                    </tbody>
                </table>
            </div>

        </center>
    </div>

    <script src="Assets/Plugins/jquery/jquery.3.5.1.min.js"></script>
   <script src="Controlador/Utilidades.js"></script>
   <script src="Assets/Plugins/loadingoverlay/loadingoverlay.js"></script>

   <script type="text/javascript" language="javascript">

       $(document).ready(function () {

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
           const IdTICKET = urlParams.get('id')
            
           CargarDatos(IdTICKET);
       });

       function CargarDatos($IdTICKET) {
           
           $('#tbREGISTRO tbody').html('');

            var request = {
                IdTICKET: $IdTICKET
           };

           AjaxPost("../frmConsultarTICKET.aspx/ObtenerDetalle", JSON.stringify(request),
                function (response) {
                    $("#seleccion").LoadingOverlay("hide");
                    if (response.estado) {
                        $("#NUMEROAREA").text(response.objeto.oAREA.NUMERO);
                        $("#tipodocumento").text(response.objeto.TipoDocumento);
                        $("#codigodocumento").text(response.objeto.Codigo);


                        $("#nombreempleado").text(response.objeto.oUsuario.Nombres + " " +response.objeto.oUsuario.Apellidos);
                        $("#direccionAREA").text(response.objeto.oAREA.Direccion);


                        $("#nombresDATOS").text(response.objeto.oDATOS.Nombre);
                        $("#direccionDATOS").text(response.objeto.oDATOS.Direccion);
                        $("#documentoDATOS").text(response.objeto.oDATOS.NumeroDocumento);
                        $("#telefonoDATOS").text(response.objeto.oDATOS.Telefono);


                        $("#fecharegistro").text(response.objeto.FechaRegistro);

                        
                        $("#tbTICKET tbody").html("");
                
                        $.each(response.objeto.oListaDetalleTICKET, function (i, row) {
                            $("<tr>").append(
                                $("<td>").text(row.Cantidad),
                                $("<td>").text(row.NombreREQUERIMIENTO),
                           
                        
                            ).appendTo("#tbTICKET tbody");

                        })

                        $("#importerecibido").text(response.objeto.ImporteRecibido);
                        $("#importecambio").text(response.objeto.ImporteCambio);//TotalCosto
                        $("#totalcosto").text(response.objeto.TotalCosto);//TotalCosto
                        

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
