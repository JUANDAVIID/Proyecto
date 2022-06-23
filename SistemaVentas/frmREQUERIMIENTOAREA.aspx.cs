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
    public partial class frmREQUERIMIENTOAREA : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public static Respuesta<List<REQUERIMIENTOAREA>> Obtener()
        {
            List<REQUERIMIENTOAREA> oListaREQUERIMIENTOAREA = new List<REQUERIMIENTOAREA>();
            oListaREQUERIMIENTOAREA = CD_REQUERIMIENTOAREA.Instancia.ObtenerREQUERIMIENTOAREA();
            if (oListaREQUERIMIENTOAREA != null)
            {
                return new Respuesta<List<REQUERIMIENTOAREA>>() { estado = true, objeto = oListaREQUERIMIENTOAREA };
            }
            else
            {
                return new Respuesta<List<REQUERIMIENTOAREA>>() { estado = false, objeto = null };
            }
        }


        [WebMethod]
        public static Respuesta<List<REQUERIMIENTO>> ObtenerREQUERIMIENTOxAREA(int IdAREA)
        {
            List<REQUERIMIENTO> oListaREQUERIMIENTO = CD_REQUERIMIENTO.Instancia.ObtenerREQUERIMIENTO();
            List<REQUERIMIENTOAREA> oListaREQUERIMIENTOAREA = CD_REQUERIMIENTOAREA.Instancia.ObtenerREQUERIMIENTOAREA();

            oListaREQUERIMIENTO = oListaREQUERIMIENTO.Where(x => x.Activo == true).ToList();
            if (IdAREA != 0)
            {
                oListaREQUERIMIENTOAREA = oListaREQUERIMIENTOAREA.Where(x => x.oAREA.IdAREA == IdAREA).ToList();
                oListaREQUERIMIENTO = (from REQUERIMIENTO in oListaREQUERIMIENTO
                                       join REQUERIMIENTOAREA in oListaREQUERIMIENTOAREA on REQUERIMIENTO.IdREQUERIMIENTO equals REQUERIMIENTOAREA.oREQUERIMIENTO.IdREQUERIMIENTO
                                       where REQUERIMIENTOAREA.oAREA.IdAREA == IdAREA
                                  select REQUERIMIENTO).ToList();
            }

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
        public static Respuesta<bool> Guardar(REQUERIMIENTOAREA oREQUERIMIENTOAREA)
        {
            bool Respuesta = false;
            Respuesta = CD_REQUERIMIENTOAREA.Instancia.RegistrarREQUERIMIENTOAREA(oREQUERIMIENTOAREA);
            return new Respuesta<bool>() { estado = Respuesta };
        }

        [WebMethod]
        public static Respuesta<bool> Editar(REQUERIMIENTOAREA oREQUERIMIENTOAREA)
        {
            bool Respuesta = false;
            Respuesta = CD_REQUERIMIENTOAREA.Instancia.ModificarREQUERIMIENTOAREA(oREQUERIMIENTOAREA);
            return new Respuesta<bool>() { estado = Respuesta };
        }

        [WebMethod]
        public static Respuesta<bool> Eliminar(int IdREQUERIMIENTOAREA)
        {
            bool Respuesta = false;
            Respuesta = CD_REQUERIMIENTOAREA.Instancia.EliminarREQUERIMIENTOAREA(IdREQUERIMIENTOAREA);
            return new Respuesta<bool>() { estado = Respuesta };

        }
    }
}