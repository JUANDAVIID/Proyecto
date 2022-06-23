using System;
using System.Data;
using System.Data.SqlClient;

namespace CapaDatos
{
    public class CD_Reportes
    {
        public static CD_Reportes _instancia = null;

        private CD_Reportes()
        {

        }

        public static CD_Reportes Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new CD_Reportes();
                }
                return _instancia;
            }
        }

        public DataTable ReporteREQUERIMIENTOAREA(int IdAREA, string CodigoREQUERIMIENTO)
        {
            DataTable dt = new DataTable();

            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                SqlCommand cmd = new SqlCommand("usp_rptREQUERIMIENTOAREA", oConexion);
                cmd.Parameters.AddWithValue("@IdAREA", IdAREA);
                cmd.Parameters.AddWithValue("@Codigo", CodigoREQUERIMIENTO);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);
                    return dt;

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    dt = null;
                    return dt;
                }
            }
        }

        public DataTable ReporteTICKET(DateTime FechaInicio, DateTime FechaFin, int IdAREA)
        {
            DataTable dt = new DataTable();

            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                SqlCommand cmd = new SqlCommand("usp_rptTICKET", oConexion);
                cmd.Parameters.AddWithValue("@FechaInicio", FechaInicio);
                cmd.Parameters.AddWithValue("@FechaFin", FechaFin);
                cmd.Parameters.AddWithValue("@IdAREA", IdAREA);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);
                    return dt;

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    dt = null;
                    return dt;
                }
            }

        }
    }
}
