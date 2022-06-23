<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmRegistrarREGISTRO.aspx.cs" Inherits="SISTEMATICKET.frmRegistrarREGISTRO" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
            <div class="col-sm-12">
               <div class="card">
                  <div class="card-header">
                     Registrar REGISTRO
                  </div>
                  <div class="card-body card-REGISTRO p-2">
                        <div class="row">

                            <div class="col-sm-6">
                                <div class="card">
                                  <div class="card-body p-2">
                                      <h6 class="card-title mb-1">Detalle AREAProveedor Origen</h6>
                                      <div class="row">
                                          <input id="txtIdAREAProveedor" type="hidden" value="0" />
                                          <div class="col-sm-4">
                                            <div class="form-group mb-0">
                                              <label for="txtNUMEROAREAProveedor" class="col-form-label col-form-label-sm">NUMERO:</label>
                                              <input type="text" class="form-control form-control-sm model" readonly id="txtNUMEROAREAProveedor" name="NUMERO">
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group mb-0">
                                              <label for="txtASUNTOAREAProveedor" class="col-form-label col-form-label-sm">ASUNTO:</label>
                                              <input type="text" class="form-control form-control-sm model" readonly id="txtASUNTOAREAProveedor" name="ASUNTO">
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group mb-0">
                                                <label for="btnBuscarAREAProveedor" class="col-form-label col-form-label-sm invisible">Buscar:</label>
                                                <button id="btnBuscarAREAProveedor" type="button" class="btn btn-sm btn-secondary btn-block">Buscar</button>
                                            </div>
                                          </div>
                                      </div>
                                  </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="card">
                                  <div class="card-body p-2">
                                      <h6 class="card-title mb-1">Detalle AREA Destino</h6>
                                      <div class="row">
                                          <input id="txtIdAREA" type="hidden" value="0" />
                                          <div class="col-sm-4">
                                            <div class="form-group mb-0">
                                              <label for="txtNUMEROAREA" class="col-form-label col-form-label-sm">NUMERO:</label>
                                              <input type="text" class="form-control form-control-sm model" readonly id="txtNUMEROAREA" name="NUMERO">
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group mb-0">
                                              <label for="txtNombreAREA" class="col-form-label col-form-label-sm">Nombre:</label>
                                              <input type="text" class="form-control form-control-sm model" readonly id="txtNombreAREA" name="NombreAREA">
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group mb-0">
                                                <label for="btnBuscarAREA" class="col-form-label col-form-label-sm invisible">Buscar:</label>
                                                <button id="btnBuscarAREA" type="button" class="btn btn-sm btn-secondary btn-block">Buscar</button>
                                            </div>
                                          </div>
                                      </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-sm-12">
                                <div class="card">
                                  <div class="card-body p-2">
                                      <h6 class="card-title mb-1">Detalle REQUERIMIENTO</h6>
                                      <div class="row">
                                          <input id="txtIdREQUERIMIENTO" type="hidden" value="0" />
                                          <div class="col-sm-2">
                                            <div class="form-group mb-0">
                                              <label for="txtCodigoREQUERIMIENTO" class="col-form-label col-form-label-sm">Codigo:</label>
                                              <input type="text" class="form-control form-control-sm model" id="txtCodigoREQUERIMIENTO" name="Codigo" autocomplete="off">
                                            </div>
                                          </div>
                                          <div class="col-sm-2">
                                            <div class="form-group mb-0">
                                              <label for="txtNombreREQUERIMIENTO" class="col-form-label col-form-label-sm">Nombre:</label>
                                              <input type="text" class="form-control form-control-sm model" readonly id="txtNombreREQUERIMIENTO" name="Nombre">
                                            </div>
                                          </div>
                                          <div class="col-sm-2">
                                            <div class="form-group mb-0">
                                                <label for="btnBuscarAREA" class="col-form-label col-form-label-sm invisible">Buscar:</label>
                                                <button id="btnBuscarREQUERIMIENTO" type="button" class="btn btn-sm btn-secondary btn-block">Buscar</button>
                                            </div>
                                          </div>
                                          <div class="col-sm-2">
                                            <div class="form-group mb-0">
                                              <label for="txtCantidadREQUERIMIENTO" style="display: none;" class="col-form-label col-form-label-sm">Cantidad:</label>
                                              <input type="text" style="display: none;" class="form-control form-control-sm model" id="txtCantidadREQUERIMIENTO" name="Cantidad" value="1000">
                                            </div>
                                          </div>
                                          <div class="col-sm-2">
                                            <div class="form-group mb-0">
                                              <label for="txtPrecioREGISTROREQUERIMIENTO" style="display: none;" class="col-form-label col-form-label-sm">Precio REGISTRO:</label>
                                              <input type="text" style="display: none;" class="form-control form-control-sm model" id="txtPrecioREGISTROREQUERIMIENTO" name="PrecioREGISTRO" value="1">
                                            </div>
                                          </div>
                                          <div class="col-sm-2">
                                            <div class="form-group mb-0">
                                              <label for="txtPrecioTICKETREQUERIMIENTO" style="display: none;" class="col-form-label col-form-label-sm">Precio TICKET:</label>
                                              <input type="text" style="display: none;" class="form-control form-control-sm model" id="txtPrecioTICKETREQUERIMIENTO" name="PrecioTICKET" value="1">
                                            </div>
                                          </div>
                                      </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                       <div class="row mt-2">
                           <div class="col-sm-12">
                               <div class="float-right">
                                    <button id="btnAgregarREGISTRO" class="btn btn-primary btn-sm float-right" ><i class="fa fa-plus-circle" aria-hidden="true"></i> Agregar a REGISTRO
                                    </button>
                                </div>
                           </div>
                           
                       </div>

                      <hr />
                        <div class="row mt-3">
                            <div class="col-sm-12">
                                <div class="table-responsive-sm">
                                    <table id="tbREGISTRO" class="table table-striped table-bordered nowrap table-sm" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>NUMERO AREAProveedor</th>
                                                <th>NUMERO AREA</th>
                                                <th>Codigo REQUERIMIENTO</th>
                                                <th>Cantidad</th>
                                                <th># REGISTRO</th>
                                                <th># TICKET
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>

                                </div>
                                
                            </div>
                        </div>
                  </div>
                  <div class="card-footer">
                      <div class="float-right">
                          <button id="btnTerminarGuardarREGISTRO" class="btn btn-success btn-sm float-right"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Terminar y Guardar REGISTRO
                          </button>
                      </div>
                  </div>
                </div>
            </div>
    </div>

    <div class="modal fade" id="modalAREAProveedor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">AREAProveedores</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <div class="table-responsive">
                  <table id="tbAREAProveedor" class="table table-striped table-bordered nowrap compact">
                    <thead>
                      <tr>
                          <th></th>
                          <th>NUMERO</th>
                          <th>ASUNTO</th>
                          <th>Direccion</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
              </div>
                
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modalAREA" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">AREA</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <div class="table-responsive">
                  <table id="tbAREA" class="table table-striped table-bordered nowrap compact">
                    <thead>
                      <tr>
                          <th></th>
                          <th>NUMERO</th>
                          <th>ASUNTO</th>
                          <th>Direccion</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
              </div>
                
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modalREQUERIMIENTO" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">REQUERIMIENTO</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <div class="table-responsive">
                  <table id="tbREQUERIMIENTO" class="table table-striped table-bordered nowrap compact">
                    <thead>
                      <tr>
                          <th></th>
                          <th>Codigo</th>
                          <th>Nombre</th>
                          <th>Descripcion</th>
                          <th>Categoria</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
              </div>
                
          </div>
        </div>
      </div>
    </div>
    <script src="Controlador/frmRegistrarREGISTRO/frmRegistrarREGISTRO.js"></script>
</asp:Content>
