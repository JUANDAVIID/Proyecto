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
    public partial class frmAREA : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public static Respuesta<List<AREA>> Obtener()
        {
            List<AREA> oListaAREA = new List<AREA>();
            oListaAREA = CD_AREA.Instancia.ObtenerAREA();

            if (oListaAREA != null)
            {
                return new Respuesta<List<AREA>>() { estado = true, objeto = oListaAREA };
            }
            else
            {
                return new Respuesta<List<AREA>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(AREA oAREA)
        {
            bool Respuesta = false;
            Respuesta = CD_AREA.Instancia.RegistrarAREA(oAREA);
            return new Respuesta<bool>() { estado = Respuesta };
           
        }

        [WebMethod]
        public static Respuesta<bool> Editar(AREA oAREA)
        {
            bool Respuesta = false;
            Respuesta = CD_AREA.Instancia.ModificarAREA(oAREA);
            return new Respuesta<bool>() { estado = Respuesta };
          
        }

        [WebMethod]
        public static Respuesta<bool> Eliminar(int IdAREA)
        {
            bool Respuesta = false;
            Respuesta = CD_AREA.Instancia.EliminarAREA(IdAREA);
            return new Respuesta<bool>() { estado = Respuesta };
            
        }
    }
}