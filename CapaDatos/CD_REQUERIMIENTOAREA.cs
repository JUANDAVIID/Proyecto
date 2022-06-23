using CapaModelo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace CapaDatos
{
    public class CD_REQUERIMIENTOAREA
    {
        public static CD_REQUERIMIENTOAREA _instancia = null;

        private CD_REQUERIMIENTOAREA()
        {

        }

        public static CD_REQUERIMIENTOAREA Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new CD_REQUERIMIENTOAREA();
                }
                return _instancia;
            }
        }

        public List<REQUERIMIENTOAREA> ObtenerREQUERIMIENTOAREA()
        {
            List<REQUERIMIENTOAREA> rptListaREQUERIMIENTOAREA = new List<REQUERIMIENTOAREA>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                SqlCommand cmd = new SqlCommand("usp_ObtenerREQUERIMIENTOAREA" +
                    "", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptListaREQUERIMIENTOAREA.Add(new REQUERIMIENTOAREA()
                        {
                            IdREQUERIMIENTOAREA = Convert.ToInt32(dr["IdREQUERIMIENTOAREA"].ToString()),
                            oREQUERIMIENTO = new REQUERIMIENTO()
                            {
                                IdREQUERIMIENTO = Convert.ToInt32(dr["IdREQUERIMIENTO"].ToString()),
                                Codigo = dr["CodigoREQUERIMIENTO"].ToString(),
                                Nombre = dr["NombreREQUERIMIENTO"].ToString(),
                                Descripcion = dr["DescripcionREQUERIMIENTO"].ToString(),
                            },
                            oAREA = new AREA()
                            {
                                IdAREA = Convert.ToInt32(dr["IdAREA"].ToString()),
                                NUMERO = dr["NUMERO"].ToString(),
                                Nombre = dr["NombreAREA"].ToString(),
                                Direccion = dr["DireccionAREA"].ToString(),
                            },
                            PrecioUnidadREGISTRO = float.Parse(dr["PrecioUnidadREGISTRO"].ToString()),
                            PrecioUnidadTICKET = float.Parse(dr["PrecioUnidadTICKET"].ToString()),
                            Stock = float.Parse(dr["Stock"].ToString()),
                            Iniciado = Convert.ToBoolean(dr["Iniciado"].ToString())
                        });
                    }
                    dr.Close();

                    return rptListaREQUERIMIENTOAREA;

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    rptListaREQUERIMIENTOAREA = null;
                    return rptListaREQUERIMIENTOAREA;
                }
            }
        }

        public bool RegistrarREQUERIMIENTOAREA(REQUERIMIENTOAREA oREQUERIMIENTOAREA)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("usp_RegistrarREQUERIMIENTOAREA", oConexion);
                    cmd.Parameters.AddWithValue("IdREQUERIMIENTO", oREQUERIMIENTOAREA.oREQUERIMIENTO.IdREQUERIMIENTO);
                    cmd.Parameters.AddWithValue("IdAREA", oREQUERIMIENTOAREA.oAREA.IdAREA);
                    cmd.Parameters.Add("Resultado", SqlDbType.Bit).Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;

                    oConexion.Open();

                    cmd.ExecuteNonQuery();

                    respuesta = Convert.ToBoolean(cmd.Parameters["Resultado"].Value);

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    respuesta = false;
                }
            }
            return respuesta;
        }

        public bool ModificarREQUERIMIENTOAREA(REQUERIMIENTOAREA oREQUERIMIENTOAREA)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("usp_ModificarREQUERIMIENTOAREA", oConexion);
                    cmd.Parameters.AddWithValue("IdREQUERIMIENTOAREA", oREQUERIMIENTOAREA.IdREQUERIMIENTOAREA);
                    cmd.Parameters.AddWithValue("IdREQUERIMIENTO", oREQUERIMIENTOAREA.oREQUERIMIENTO.IdREQUERIMIENTO);
                    cmd.Parameters.AddWithValue("IdAREA", oREQUERIMIENTOAREA.oAREA.IdAREA);
                    cmd.Parameters.Add("Resultado", SqlDbType.Bit).Direction = ParameterDirection.Output;

                    cmd.CommandType = CommandType.StoredProcedure;

                    oConexion.Open();

                    cmd.ExecuteNonQuery();

                    respuesta = Convert.ToBoolean(cmd.Parameters["Resultado"].Value);

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    respuesta = false;
                }

            }

            return respuesta;

        }

        public bool EliminarREQUERIMIENTOAREA(int IdREQUERIMIENTOAREA)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("usp_EliminarREQUERIMIENTOAREA", oConexion);
                    cmd.Parameters.AddWithValue("IdREQUERIMIENTOAREA", IdREQUERIMIENTOAREA);
                    cmd.Parameters.Add("Resultado", SqlDbType.Bit).Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;

                    oConexion.Open();

                    cmd.ExecuteNonQuery();

                    respuesta = Convert.ToBoolean(cmd.Parameters["Resultado"].Value);

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    respuesta = false;
                }

            }

            return respuesta;

        }

        public bool ControlarStock(int IdREQUERIMIENTO, int IdAREA, int Cantidad, bool Restar)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("usp_ControlarStock", oConexion);
                    cmd.Parameters.AddWithValue("IdREQUERIMIENTO", IdREQUERIMIENTO);
                    cmd.Parameters.AddWithValue("IdAREA", IdAREA);
                    cmd.Parameters.AddWithValue("Cantidad", Cantidad);
                    cmd.Parameters.AddWithValue("Restar", Restar);
                    cmd.Parameters.Add("Resultado", SqlDbType.Bit).Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;

                    oConexion.Open();

                    cmd.ExecuteNonQuery();

                    respuesta = Convert.ToBoolean(cmd.Parameters["Resultado"].Value);

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    respuesta = false;
                }
            }
            return respuesta;
        }
    }
}
