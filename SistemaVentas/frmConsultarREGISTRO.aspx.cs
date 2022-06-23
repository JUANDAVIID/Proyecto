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
    public partial class frmConsultarREGISTRO : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        
        [WebMethod]
        public static Respuesta<List<REGISTRO>> Obtener(string fechainicio,string fechafin,int idAREAproveedor, int IdAREA)
        {
            List<REGISTRO> oListaREGISTRO = new List<REGISTRO>();
            oListaREGISTRO = CD_REGISTRO.Instancia.ObtenerListaREGISTRO(Convert.ToDateTime(fechainicio),Convert.ToDateTime(fechafin), idAREAproveedor, IdAREA);
            if(oListaREGISTRO != null)
                return new Respuesta<List<REGISTRO>>() { estado = true, objeto = oListaREGISTRO };
            else
                return new Respuesta<List<REGISTRO>>() { estado = false, objeto = null };
        }

        [WebMethod]
        public static Respuesta<REGISTRO> ObtenerDetalle(int IdREGISTRO)
        {
            REGISTRO oREGISTRO = new REGISTRO();
            oREGISTRO = CD_REGISTRO.Instancia.ObtenerDetalleREGISTRO(IdREGISTRO);
            if (oREGISTRO != null)
                return new Respuesta<REGISTRO>() { estado = true, objeto = oREGISTRO };
            else
                return new Respuesta<REGISTRO>() { estado = false, objeto = null };
        }
    }
}