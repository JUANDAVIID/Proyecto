<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmREQUERIMIENTOAREA.aspx.cs" Inherits="SISTEMATICKET.frmREQUERIMIENTOAREA" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

     <div class="row">
            <div class="col-sm-12">
                <div class="mb-3" id="accordion">
                  <div class="card">
                    <div class="card-header p-2" id="headingOne">
                        <label>Asignar REQUERIMIENTO a AREA</label>
                        <div class="float-right">
                            <button class="btn btn-secondary btn-sm float-right" data-toggle="collapse" data-target="#collapseOne" aria-controls="collapseOne"><i class="fa fa-bars" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>

                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                      <div class="card-body p-3">
                          <div class="row">
                            <div class="col-sm-3"><h6>AREA</h6></div>
                            </div>
                            <div class="row">
                                <input id="txtIdAREA" type="hidden" value="0" />
                                <div class="col-sm-2">
                                  <div class="form-group mb-0">
                                    <label for="txtNUMERO" class="col-form-label col-form-label-sm">NUMERO:</label>
                                    <input type="text" class="form-control form-control-sm model" readonly id="txtNUMERO" name="NUMERO">
                                  </div>
                                </div>
                                <div class="col-sm-3">
                                  <div class="form-group mb-0">
                                    <label for="txtASUNTO" class="col-form-label col-form-label-sm">ASUNTO:</label>
                                    <input type="text" class="form-control form-control-sm model" readonly id="txtASUNTO" name="ASUNTO">
                                  </div>
                                </div>
                                <div class="col-sm-3">
                                  <div class="form-group mb-0">
                                    <label for="txtDirecion" class="col-form-label col-form-label-sm">Direccion:</label>
                                    <input type="text" class="form-control form-control-sm model" readonly id="txtDireccion" name="Direccion">
                                  </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group mb-0">
                                        <label for="btnBuscarAREA" class="col-form-label col-form-label-sm invisible">Direccion:</label>
                                        <button id="btnBuscarAREA" type="button" class="btn btn-sm btn-success btn-block">Buscar</button>
                                    </div>
                                </div>
                            </div>
                          <hr />
                          <div class="row">
                                <div class="col-sm-3"><h6>REQUERIMIENTO</h6></div>
                            </div>
                            <div class="row">
                                <input id="txtIdREQUERIMIENTO" type="hidden" value="0" />
                                <div class="col-sm-2">
                                  <div class="form-group mb-0">
                                    <label for="txtCodigo" class="col-form-label col-form-label-sm">Codigo:</label>
                                    <input type="text" class="form-control form-control-sm model" id="txtCodigo" name="Codigo" autocomplete="off">
                                  </div>
                                </div>
                                <div class="col-sm-3">
                                  <div class="form-group mb-0">
                                    <label for="txtNombre" class="col-form-label col-form-label-sm">Nombre:</label>
                                    <input type="text" class="form-control form-control-sm model" readonly id="txtNombre" name="Nombre">
                                  </div>
                                </div>
                                <div class="col-sm-3">
                                  <div class="form-group mb-0">
                                    <label for="txtDescripcion" class="col-form-label col-form-label-sm">Descripción:</label>
                                    <input type="text" class="form-control form-control-sm model" readonly id="txtDescripcion" name="Descripcion">
                                  </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group mb-0">
                                        <label for="btnBuscarREQUERIMIENTO" class="col-form-label col-form-label-sm invisible">Direccion:</label>
                                        <button id="btnBuscarREQUERIMIENTO" type="button" class="btn btn-sm btn-success btn-block">Buscar</button>
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="form-group mb-0">
                                        <label for="btnAsignar" class="col-form-label col-form-label-sm invisible">Direccion:</label>
                                        <button id="btnAsignar" type="button" class="btn btn-sm btn-primary btn-block">Asignar</button>
                                    </div>
                                </div>
                            </div>

                      </div>
                    </div>
                  </div>

                </div>


               <div class="card">
                  <div class="card-header">
                    Lista de Asignaciones
                  </div>
                  <div id="card-lista" class="card-body p-3">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="table-responsive">
                                    <table id="tbREQUERIMIENTOAREA" class="table compact table-bordered" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th>Nombre AREA</th>
                                                <th>NUMERO AREA</th>
                                                <th>Codigo REQUERIMIENTO</th>
                                                <th>Nombre REQUERIMIENTO</th>
                                                <th>Stock</th>
                                                <th></th>
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
    <script src="Controlador/frmREQUERIMIENTOAREA/frmREQUERIMIENTOAREA.js"></script>

</asp:Content>
