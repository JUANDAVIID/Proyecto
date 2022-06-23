using CapaDatos;
using CapaModelo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SISTEMATICKET
{
    public partial class frmAREAProveedor : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public static Respuesta<List<AREAProveedor>> Obtener()
        {
            List<AREAProveedor> oListaAREAProveedor = new List<AREAProveedor>();
            oListaAREAProveedor = CD_AREAProveedor.Instancia.ObtenerAREAProveedor();
            if (oListaAREAProveedor != null)
            {
                return new Respuesta<List<AREAProveedor>>() { estado = true, objeto = oListaAREAProveedor };
            }
            else
            {
                return new Respuesta<List<AREAProveedor>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(AREAProveedor oAREAProveedor)
        {
            bool Respuesta = false;
            Respuesta = CD_AREAProveedor.Instancia.RegistrarAREAProveedor(oAREAProveedor);
            return new Respuesta<bool>() { estado = Respuesta };
        }

        [WebMethod]
        public static Respuesta<bool> Editar(AREAProveedor oAREAProveedor)
        {
            bool Respuesta = false;
            Respuesta = CD_AREAProveedor.Instancia.ModificarAREAProveedor(oAREAProveedor);
            return new Respuesta<bool>() { estado = Respuesta };
        }

        [WebMethod]
        public static Respuesta<bool> Eliminar(int IdAREAProveedor)
        {
            bool Respuesta = false;
            Respuesta = CD_AREAProveedor.Instancia.EliminarAREAProveedor(IdAREAProveedor);
            return new Respuesta<bool>() { estado = Respuesta };

        }
    }
}