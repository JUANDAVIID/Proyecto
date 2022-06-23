<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmConsultarREGISTRO.aspx.cs" Inherits="SISTEMATICKET.frmConsultarREGISTRO" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        select{
            cursor:pointer;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
            <div class="col-sm-12">
               <div class="card">
                  <div class="card-header">
                    Consultar REGISTRO
                  </div>
                  <div class="card-body p-2">
                        <div class="row">
                            <div class="col-sm-2">
                              <div class="form-group mb-0">
                                <label for="txtNUMEROAREAProveedor" class="col-form-label col-form-label-sm">Fecha Inicio:</label>
                                <input type="text" class="form-control form-control-sm model" id="txtFechaInicio" name="FechaInicio" autocomplete="off">
                              </div>
                            </div>
                            <div class="col-sm-2">
                              <div class="form-group mb-0">
                                <label for="txtNUMEROAREAProveedor" class="col-form-label col-form-label-sm">Fecha Fin:</label>
                                <input type="text" class="form-control form-control-sm model" id="txtFechaFin" name="FechaFin" autocomplete="off">
                              </div>
                            </div>
                            <div class="col-sm-2">
                              <div class="form-group mb-0">
                                <label for="txtNUMEROAREAProveedor" class="col-form-label col-form-label-sm">AREAProveedor:</label>

                                <select class="form-control form-control-sm model" id="cboAREAProveedor" name="AREAProveedor">
                                </select>
                              </div>
                            </div>
                            <div class="col-sm-2">
                              <div class="form-group mb-0">
                                <label for="txtNUMEROAREAProveedor" class="col-form-label col-form-label-sm">AREA:</label>
                                <select class="form-control form-control-sm model" id="cboAREA" name="AREA">
                                </select>
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
                                <table id="tbREGISTRO" class="table table-striped table-bordered nowrap compact" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Numero REGISTRO</th>
                                            <th>AREAProveedor</th>
                                            <th>AREA Destino</th>
                                            <th>Fecha REGISTRO</th>
                                            <th>Total Costo </th>
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
    <script src="Controlador/frmConsultarREGISTRO/frmConsultarREGISTRO.js"></script>

</asp:Content>
