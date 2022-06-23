<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="rptREQUERIMIENTOAREA.aspx.cs" Inherits="SISTEMATICKET.rptREQUERIMIENTOAREA" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .buttons-excel{
            color: #fff !important;
            background-color: #28a745 !important;
            border-color: #28a745 !important;
        }

        .buttons-pdf{
            color: #fff !important;
            background-color: #dc3545 !important;
            border-color: #dc3545 !important;
        }

        .buttons-print {
            color: #fff !important;
            background-color: #17a2b8 !important;
            border-color: #17a2b8 !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
            <div class="col-sm-12">
               <div class="card">
                  <div class="card-header">
                    Reportes de REQUERIMIENTO por AREA
                  </div>
                  <div class="card-body p-2">
                        <div class="row">
                            <div class="col-sm-2">
                              <div class="form-group mb-0">
                                <label for="cboAREA" class="col-form-label col-form-label-sm">AREA:</label>
                                <select class="form-control form-control-sm model" id="cboAREA" name="AREA">
                                </select>
                              </div>
                            </div>
                            <div class="col-sm-2">
                              <div class="form-group mb-0">
                                <label for="txtCodigoREQUERIMIENTO" class="col-form-label col-form-label-sm">Codigo REQUERIMIENTO:</label>
                                <input type="text" class="form-control form-control-sm model" id="txtCodigoREQUERIMIENTO" name="FechaInicio" autocomplete="off">
                              </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="form-group mb-0">
                                    <label for="btnBuscar" class="col-form-label col-form-label-sm invisible">Direccion:</label>
                                    <button id="btnBuscar" type="button" class="btn btn-sm btn-primary btn-block">Buscar</button>
                                </div>
                            </div>
                        </div>
                      <hr />
                        <div class="row mt-3">
                            <div class="col-sm-12">
                                <table id="tbReporte" class="table table-striped table-bordered nowrap compact" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>NUMERO AREA</th>
                                            <th>Nombre AREA</th>
                                            <th>Direccion AREA</th>
                                            <th>Codigo REQUERIMIENTO</th>
                                            <th>Nombre REQUERIMIENTO</th>
                                            <th>Descripcion REQUERIMIENTO</th>
                                            <th>Stock en AREA</th>
                                            <th>Precio REGISTRO</th>
                                            <th>Precio TICKET</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                  </div>
                  <div class="card-footer">
                  </div>
                </div>
            </div>
    </div>
    <script src="Controlador/rptREQUERIMIENTOAREA/rptREQUERIMIENTOAREA.js"></script>
</asp:Content>
