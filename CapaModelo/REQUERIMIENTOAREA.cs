namespace CapaModelo
{
    public class REQUERIMIENTOAREA
    {
        public int IdREQUERIMIENTOAREA { get; set; }
        public REQUERIMIENTO oREQUERIMIENTO { get; set; }
        public AREA oAREA { get; set; }
        public float Stock { get; set; }
        public float PrecioUnidadREGISTRO { get; set; }
        public float PrecioUnidadTICKET { get; set; }
        public bool Iniciado { get; set; }
    }
}
