using System;

namespace CapaModelo
{
    public class DetalleREGISTRO
    {
        public int IdDetalleREGISTRO { get; set; }
        public int IdREGISTRO { get; set; }
        public REQUERIMIENTO oREQUERIMIENTO { get; set; }
        public int Cantidad { get; set; }
        public float PrecioUnitarioREGISTRO { get; set; }
        public float PrecioUnitarioTICKET { get; set; }
        public float TotalCosto { get; set; }
        public bool Activo { get; set; }
        public DateTime FechaRegistro { get; set; }
    }
}
