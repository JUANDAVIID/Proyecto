<%@ Page Title="" Language="C#" MasterPageFile="~/PaginaMaster.Master" AutoEventWireup="true" CodeBehind="frmCrearTICKET.aspx.cs" Inherits="SISTEMATICKET.frmCrearTICKET" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .form-control-sm {
            height: calc(1.3em + .3rem + 2px) !important;
            padding: .15rem .3rem !important;
            font-size: .875rem !important;
            line-height: 1.3 !important;
            border-radius: .2rem !important;
        }
        .col-form-label-sm {
            padding-top: calc(.25rem + 1px) !important;
            padding-bottom: calc(.25rem + 1px) !important;
            font-size: .800rem !important;
            line-height: 1.5 !important;
        }
        .input-group-sm > .custom-select, .input-group-sm > .form-control, .input-group-sm > .input-group-append > .btn, .input-group-sm > .input-group-append > .input-group-text, .input-group-sm > .input-group-prepend > .btn, .input-group-sm > .input-group-prepend > .input-group-text {
            padding: .15rem .3rem !important;
            height: calc(1.3em + .3rem + 2px) !important;
        }
        .btn-custom, .btn-sm-custom {
            padding: .25rem .5rem;
            font-size: .875rem;
            line-height: 1.5;
            border-radius: .2rem;
        }

        .btn-group-sm > .btn, .btn-sm {
            padding: .15rem .5rem !important;
            font-size: .750rem !important;
            line-height: 1.5 !important;
            border-radius: .2rem !important;
        }

        table.dataTable.compact tbody th, table.dataTable.compact tbody td {
            padding: 1px !important;
        }
        table.dataTable.compact thead th, table.dataTable.compact thead td {
            padding: 2px 5px !important;
        }
        table.dataTable, table.dataTable th, table.dataTable td {
            box-sizing: content-box;
            font-size: 11pt !important;
        }
        .required{
            color: #ff0000;
            font-weight: bold;
            margin-left: 1px;
        }

        textarea {
        box-sizing: border-box;
        font: 14px Cascadia Mono;
        height: 125px;
        margin: 5px 0 15px 0;
        padding: 5px 2px;
        width: 100%;  
         }
        .borderojo {
         outline: none;
         border: 3px solid #CA515C;
         }
        .bordegris { border: 3.5px solid #808080; }

        #tbTICKET tbody {display: block; max-height: 120px;overflow: auto;}
        #tbTICKET thead, #tbTICKET tbody tr { display: table; width: 100%; table-layout: fixed; }
        #tbTICKET tbody{width:100%; }
        #tbTICKET thead{width:99%; }

        .invisibles {display: none;}
        .auto-style1 {
            margin-left: auto;
        }
    </style>
    
    <script>

        function clickboton2() {
            document.querySelector('#btnTerminarGuardarTICKET').click();
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
            <div class="col-sm-12">
               <div class="card">
                  <div class="card-header p-2">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i> <a style="color: #CA515C;"><b>Registrar Nuevo Ticket Hacia el Área: </b></a> 
                      <form id="form2" runat="server">
                        <asp:Button id="Button3" style="background-color:#CA515C; border:#b20000" class="btn-custom btn-primary btn-sm-custom btn-danger float-right" OnClick="btnTerminarGuardarTICKET_Click" Text="Imprimir y Terminar TICKET" runat="server" OnClientClick="clickboton2()"/>
                        <asp:DropDownList ID="ddlEmail"  class="custom-select float-right" runat="server" CssClass="auto-style1" Height="30px" Width="304px">
                            <asp:ListItem Value="juan.quintero758@pascualbravo.edu.co"> David Quintero  </asp:ListItem>
                            <asp:ListItem Value="jquintero@coorditanques.com"> Juan David </asp:ListItem>

                        </asp:DropDownList>
                    </form>
                      <div class="float-right">
                         <abbr title="ENVIAR TICKET"><button id="btnTerminarGuardarTICKET" class="invisibles" style="background-color:#CA515C; border:#b20000" class="btn-custom btn-primary btn-sm-custom float-right btn-danger"><i class="fa fa-print" aria-hidden="true"></i> Imprimir y Terminar Ticket
                          </button></abbr>
                      </div>
                  </div>
                  <div class="card-body p-2 card-TICKET">
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="input-group input-group-sm mb-2">
                                  <div class="input-group-prepend">
                                     <label class="input-group-text" for="inputGroupSelect01"><b>Prioridad - Ticket</b></label>
                                      
                                  </div>
                                  

                                  <select class="custom-select" id="cboTICKETtipodocumento">
                                  <option value="Sin Clasificar">--Sin Clasificar--</option>
                                    <option value="Prioridad: Baja">Baja</option>
                                    <option value="Prioridad: Media">Media</option>
                                    <option value="Prioridad: Alta">Alta</option>
                                  </select>
                                </div>


                            </div>
                            <div class="col-sm-3">
                                <div class="input-group input-group-sm mb-2">
                                  <div class="input-group-prepend">
                                     <label class="input-group-text" for="inputGroupSelect01">Fecha de Ticket</label>
                                  </div>
                                  <input id="txtfechaTICKET" readonly type="text" class="form-control" >
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="card" style="background-color: #F7F7F7">
                                  <div class="card-body p-2">
                                      <div class="row">
                                          <div class="col-sm-10">
                                              <h6 class="card-title mb-1">AREA origen</h6>
                                          </div>
                                          <div class="col-sm-2">
                                              <div class="float-right">
                                                  <a class="btn btn-secondary btn-sm" data-toggle="collapse" href="#collapse1" role="button" aria-expanded="false" aria-controls="collapseExample">
                                                      <i class="fa fa-sort" aria-hidden="true"></i>
                                                    </a>
                                              </div>
                                          </div>
                                          
                                      </div>
                                      
                                      <div class="row collapse" id="collapse1">
                                          <input id="txtIdAREA" type="hidden" value="0" />
                                          <div class="col-sm-4">
                                            <div class="form-group mb-0">
                                              <label for="txtASUNTOAREAProveedor" class="col-form-label col-form-label-sm">Nombre:</label>
                                              <label class="form-control form-control-sm model mb-1" readonly="" id="lblAREAnombre" ></label>
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group mb-0">
                                              <label for="txtASUNTOAREAProveedor" class="col-form-label col-form-label-sm">NUMERO:</label>
                                              <label class="form-control form-control-sm model mb-1" readonly="" id="lblAREANUMERO" ></label>
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group mb-0">
                                              <label for="txtASUNTOAREAProveedor" class="col-form-label col-form-label-sm">Direccion:</label>
                                              <label class="form-control form-control-sm model mb-1" readonly="" id="lblAREAdireccion" ></label>
                                            </div>
                                          </div>
                                      </div>
                                  </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="card" style="background-color: #F7F7F7">
                                  <div class="card-body p-2">
                                      
                                      <div class="row">
                                          <div class="col-sm-10">
                                              <h6 class="card-title mb-1">Datos Empleado</h6>
                                          </div>
                                          <div class="col-sm-2">
                                              <div class="float-right">
                                                  <a class="btn btn-secondary btn-sm" data-toggle="collapse" href="#collapse2" role="button" aria-expanded="false" aria-controls="collapseExample">
                                                      <i class="fa fa-sort" aria-hidden="true"></i>
                                                    </a>
                                              </div>
                                          </div>
                                          
                                      </div>

                                      <div class="row collapse" id="collapse2">
                                          <input id="txtIdUsuario" type="hidden" value="0" />
                                          <div class="col-sm-4">
                                            <div class="form-group mb-0">
                                              <label for="txtNUMEROAREAProveedor" class="col-form-label col-form-label-sm">Nombre:</label>
                                              <label class="form-control form-control-sm model mb-1" readonly="" id="lblempleadonombre" ></label>
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group mb-0">
                                              <label for="txtASUNTOAREAProveedor" class="col-form-label col-form-label-sm">Apellido:</label>
                                              <label class="form-control form-control-sm model mb-1" readonly="" id="lblempleadoapellido" ></label>
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group mb-0">
                                              <label for="txtASUNTOAREAProveedor" class="col-form-label col-form-label-sm">Correo:</label>
                                              <label class="form-control form-control-sm model mb-1" readonly="" id="lblempleadocorreo" ></label>
                                            </div>
                                          </div>
                                      </div>
                                  </div>
                                </div>
                            </div>
                        </div>

                      <div class="row mt-2">
                            <div class="col-sm-6">
                                <div class="card">
                                  <div class="card-body p-2">
                                      <h6 class="card-title mb-1">Detalle DATOS</h6>
                                      <div class="row">
                                          <div class="col-sm-4">
                                            <div class="form-group mb-0">
                                              <label for="txtASUNTOAREAProveedor" class="col-form-label col-form-label-sm">Tipo Documento:</label>
                                              <select class="form-control form-control-sm model" id="cboDATOStipodocumento" name="Rol">
                                                  <option value="Cedula Ciudadana">Cedula Ciudadana</option>
                                                  <option value="Carnet Extranjeria">Carnet Extranjeria</option>
                                                  <option value="Otro">Otro</option>
                                              </select>
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group mb-0">
                                              <label for="txtASUNTOAREAProveedor" class="col-form-label col-form-label-sm">Numero Documento: <span class="required">*</span> </label>
                                              <input type="text" class="form-control form-control-sm model" id="txtDATOSdocumento" name="ASUNTO" autocomplete="off" value="null">
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group mb-0">
                                              <label for="txtASUNTOAREAProveedor" class="col-form-label col-form-label-sm">Nombres: <span class="required">*</span></label>
                                              <input type="text" class="form-control form-control-sm model" id="txtDATOSnombres" name="ASUNTO" autocomplete="off" value="null">
                                                <br />
                                            </div>
                                          </div>
                                      </div>
                                      <div class="row">
                                          <div class="col-sm-8">
                                            <div class="form-group mb-0">
                                              <label for="txtASUNTOAREAProveedor" ><a style="color: #CA515C;" class="col-form-label col-form-label-sm"><b>Incidente/Reporte/Solicitud (Puntualizar modulos y/o error):</b></a>
                                                <br />
                                                
                                                </label>
                                                  <label> Caracteres restantes: <span></span></label>



                                             <textarea id="txtDATOSdireccion" name="DATOSdireccion" placeholder="Introduce tu requerimiento..." autocomplete="off" cols="50" class="offset-sm-0" maxlength="1000"></textarea>
                                                    </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group mb-0">
                                              <label for="txtASUNTOAREAProveedor" class="col-form-label col-form-label-sm">Telefono:</label>
                                              <input type="text" class="form-control form-control-sm model" id="txtDATOStelefono" name="ASUNTO" autocomplete="off">
                                            </div>
                                          </div>
                                      </div>
                                  </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="card">
                                  <div class="card-body p-2">
                                      <a><h6 style="color: #CA515C;"class="card-title mb-1"><b>Solicitar Requerimiento: </b></h6></a>
                                      <div class="row">
                                          <input id="txtIdREQUERIMIENTO" type="hidden" value="0" />
                                          <div class="col-sm-3">
                                            <div class="form-group mb-0">
                                              <label for="txtREQUERIMIENTOcodigo" class="col-form-label col-form-label-sm">Codigo: <span class="required">*</span></label>
                                              <input type="text" class="form-control form-control-sm model" readonly id="txtREQUERIMIENTOcodigo" name="Codigo" autocomplete="off">
                                            </div>
                                          </div>
                                          <div class="col-sm-3">
                                            <div class="form-group mb-0">
                                              <label for="txtnombre" class="col-form-label col-form-label-sm">Nombre:</label>
                                              <input type="text" class="form-control form-control-sm model" readonly id="txtREQUERIMIENTOnombre" name="Nombre">
                                            </div>
                                          </div>
                                          <div class="col-sm-4">
                                            <div class="form-group mb-0">
                                              <label for="txtREQUERIMIENTOdescripcion" class="col-form-label col-form-label-sm">Descripcion:</label>
                                              <input type="text" class="form-control form-control-sm model" readonly id="txtREQUERIMIENTOdescripcion" name="Descripcion">
                                            </div>
                                          </div>
                                          <div class="col-sm-2">
                                              <div class="form-group mb-0">
                                                  <label for="btnBuscarREQUERIMIENTO" class="col-form-label col-form-label-sm invisible">Buscar:</label>
                                                  <abbr title="Adjuntar Requerimiento"><button id="btnBuscarREQUERIMIENTO" type="button" class="btn btn-sm btn-secondary btn-block">Buscar</button></abbr>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="row">
                                          <div class="col-sm-3">
                                            <div class="form-group mb-0">
                                              <label for="txtREQUERIMIENTOstock" class="col-form-label col-form-label-sm">En Stock:</label>
                                              <input type="text" class="form-control form-control-sm model" readonly id="txtREQUERIMIENTOstock" name="Codigo">
                                            </div>
                                          </div>
                                          <div class="col-sm-3">
                                            <div class="form-group mb-0">
                                              <label for="txtREQUERIMIENTOprecio" style="display: none;" class="col-form-label col-form-label-sm">Precio:</label>
                                              <input type="text" style="display: none;" class="form-control form-control-sm model" readonly id="txtREQUERIMIENTOprecio" name="Nombre">
                                            </div>
                                          </div>
                                          <div class="col-sm-3">
                                            <div class="form-group mb-0">
                                              <label for="txtREQUERIMIENTOcantidad" style="display: none;" class="col-form-label col-form-label-sm">Cantidad: <span class="required">*</span></label>
                                              <input type="number" style="display: none;" class="form-control form-control-sm model"  id="txtREQUERIMIENTOcantidad" value="1" name="Descripcion" autocomplete="off">
                                            </div>
                                          </div>
                                          <div class="col-sm-3">
                                              <div class="form-group mb-0">
                                                  <label for="btnAsignar" class="col-form-label col-form-label-sm invisible">Buscar:</label>
                                                  <abbr title="Confirmar"><button id="btnAgregar" type="button" style="background-color:#CA515C; border:#b20000" class="btn btn-sm btn-success btn-block btn-danger"><i class="fa fa-plus-circle" aria-hidden="true"></i> Agregar</button></abbr>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                </div>
                            </div>
                        </div>


                      <hr />
                        <div class="row mt-3">
                            <div class="col-sm-12">
                                <div class="table-responsive-sm">
                                    <table id="tbTICKET" class="table table-striped table-bordered nowrap table-sm" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>#</th>
                                                <th>REQUERIMIENTO</th>
                                                <th>Descripcion</th>
                                                <th>Ticket</th>
                                                <th>Ticket</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                
                            </div>
                        </div>

                      <hr />
                      <div class="row">
                          <div class="col-sm-6">
                              <div class="row">
                                  <div class="col-sm-4">
                                        <div class="input-group input-group-sm mb-2">
                                          <div class="input-group-prepend">
                                             <label class="input-group-text" style="display: none;" for="inputGroupSelect01">Sub Total S/.</label>
                                          </div>
                                          <input id="txtsubtotal" style="display: none;" readonly type="text" class="form-control" value="0" >
                                        </div>
                                    </div>
                                  <div class="col-sm-4">
                                        <div class="input-group input-group-sm mb-2">
                                          <div class="input-group-prepend">
                                             <label class="input-group-text" style="display: none;" for="inputGroupSelect01">IGV S/.</label>
                                          </div>
                                          <input id="txtigv" style="display: none;" readonly type="text" class="form-control" value="0" >
                                        </div>
                                    </div>
                                  <div class="col-sm-4">
                                        <div class="input-group input-group-sm mb-2">
                                          <div class="input-group-prepend">
                                             <label class="input-group-text" style="display: none;" for="inputGroupSelect01">Total S/.</label>
                                          </div>
                                          <input id="txttotal" style="display: none;" readonly type="text" class="form-control" value="0" >
                                        </div>
                                    </div>
                              </div>
                          </div>
                          <div class="col-sm-6">
                               <div class="row">
                                  <div class="col-sm-4">
                                        <div class="input-group input-group-sm mb-2">
                                          <div class="input-group-prepend">
                                             <label class="input-group-text" style="display: none;" for="inputGroupSelect01">Monto Pago S/.</label>
                                          </div>
                                          <input id="txtmontopago" style="display: none;" type="text" class="form-control" autocomplete="off" value="1" >
                                        </div>
                                    </div>
                                  <div class="col-sm-4">
                                         <button id="btncalcular" style="display: none;" type="button" class="btn btn-sm btn-warning btn-block"><i class="fa fa-caret-right" aria-hidden="true"></i> Calcular</button>
                                    </div>
                                  <div class="col-sm-4">
                                        <div class="input-group input-group-sm mb-2">
                                          <div class="input-group-prepend">
                                             <label class="input-group-text" style="display: none;" for="inputGroupSelect01">Cambio S/.</label>
                                          </div>
                                          <input id="txtcambio" style="display: none;" readonly type="text" class="form-control" >
                                        </div>
                                    </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="card-footer">
                  </div>
                </div>
            </div>
    </div>

    <!-- MODAL REQUERIMIENTO: Elección de la solicitud -->
    <div class="modal fade" id="modalREQUERIMIENTO" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><a style="color: #b20000;">Requerimiento/Solicitud x Área</a></h5>
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
                          <th>Stock</th>
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


    <script src="Controlador/frmCrearTICKET/frmCrearTICKET.js"></script>
    </form>
</asp:Content>
