using CapaDatos;
using CapaModelo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SISTEMATICKET
{
    public partial class frmConsultarTICKET : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<TICKET> ObtenerDetalle(int IdTICKET)
        {
            TICKET oTICKET = new TICKET();
            oTICKET = CD_TICKET.Instancia.ObtenerDetalleTICKET(IdTICKET);
            if (oTICKET != null)
                return new Respuesta<TICKET>() { estado = true, objeto = oTICKET };
            else
                return new Respuesta<TICKET>() { estado = false, objeto = null };
        }

        [WebMethod]
        public static Respuesta<List<TICKET>> ObtenerLista(string codigo,string fechainicio, string fechafin, string numerodocumento, string nombres)
        {
            List<TICKET> oListaTICKET = new List<TICKET>();
            oListaTICKET = CD_TICKET.Instancia.ObtenerListaTICKET(codigo,Convert.ToDateTime(fechainicio),Convert.ToDateTime(fechafin),numerodocumento,nombres);
            if (oListaTICKET != null)
                return new Respuesta<List<TICKET>>() { estado = true, objeto = oListaTICKET };
            else
                return new Respuesta<List<TICKET>>() { estado = false, objeto = null };
        }
    }
}