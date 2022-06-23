using System;
using System.Collections.Generic;

namespace CapaModelo
{
    public class TICKET
    {
        public int IdTICKET { get; set; }
        public string TipoDocumento { get; set; }
        public string Codigo { get; set; }
        public float TotalCosto { get; set; }
        public float ImporteRecibido { get; set; }
        public float ImporteCambio { get; set; }
        public string FechaRegistro { get; set; }
        public DateTime VFechaRegistro { get; set; }
        public Usuario oUsuario { get; set; }
        public AREA oAREA { get; set; }
        public DATOS oDATOS { get; set; }
        public List<DetalleTICKET> oListaDetalleTICKET { get; set; }

    }
}
