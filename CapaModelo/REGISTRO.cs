using System;
using System.Collections.Generic;


namespace CapaModelo
{
    public class REGISTRO
    {
        public int IdREGISTRO { get; set; }
        public string Codigo { get; set; }
        public string FechaREGISTRO { get; set; }
        public string NumeroREGISTRO { get; set; }
        public Usuario oUsuario { get; set; }
        public AREAProveedor oAREAProveedor { get; set; }
        public AREA oAREA { get; set; }
        public List<DetalleREGISTRO> oListaDetalleREGISTRO { get; set; }
        public float TotalCosto { get; set; }
        public string TipoComprobante { get; set; }
        public bool Activo { get; set; }
        public DateTime FechaRegistro { get; set; }
    }
}
