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
    public partial class frmREQUERIMIENTO : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public static Respuesta<List<REQUERIMIENTO>> Obtener()
        {
            List<REQUERIMIENTO> oListaREQUERIMIENTO = new List<REQUERIMIENTO>();
            oListaREQUERIMIENTO = CD_REQUERIMIENTO.Instancia.ObtenerREQUERIMIENTO();
            if (oListaREQUERIMIENTO != null)
            {
                return new Respuesta<List<REQUERIMIENTO>>() { estado = true, objeto = oListaREQUERIMIENTO };
            }
            else
            {
                return new Respuesta<List<REQUERIMIENTO>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(REQUERIMIENTO oREQUERIMIENTO)
        {
            bool Respuesta = false;
            Respuesta = CD_REQUERIMIENTO.Instancia.RegistrarREQUERIMIENTO(oREQUERIMIENTO);
            return new Respuesta<bool>() { estado = Respuesta };
        }

        [WebMethod]
        public static Respuesta<bool> Editar(REQUERIMIENTO oREQUERIMIENTO)
        {
            bool Respuesta = false;
            Respuesta = CD_REQUERIMIENTO.Instancia.ModificarREQUERIMIENTO(oREQUERIMIENTO);
            return new Respuesta<bool>() { estado = Respuesta };
        }

        [WebMethod]
        public static Respuesta<bool> Eliminar(int IdREQUERIMIENTO)
        {
            bool Respuesta = false;
            Respuesta = CD_REQUERIMIENTO.Instancia.EliminarREQUERIMIENTO(IdREQUERIMIENTO);
            return new Respuesta<bool>() { estado = Respuesta };

        }
    }
}