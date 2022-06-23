using CapaModelo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace CapaDatos
{
    public class CD_REQUERIMIENTO
    {
        public static CD_REQUERIMIENTO _instancia = null;

        private CD_REQUERIMIENTO()
        {

        }

        public static CD_REQUERIMIENTO Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new CD_REQUERIMIENTO();
                }
                return _instancia;
            }
        }

        public List<REQUERIMIENTO> ObtenerREQUERIMIENTO()
        {
            List<REQUERIMIENTO> rptListaREQUERIMIENTO = new List<REQUERIMIENTO>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                SqlCommand cmd = new SqlCommand("usp_ObtenerREQUERIMIENTO", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptListaREQUERIMIENTO.Add(new REQUERIMIENTO()
                        {
                            IdREQUERIMIENTO = Convert.ToInt32(dr["IdREQUERIMIENTO"].ToString()),
                            Codigo = dr["Codigo"].ToString(),
                            ValorCodigo = Convert.ToInt32(dr["ValorCodigo"].ToString()),
                            Nombre = dr["Nombre"].ToString(),
                            Descripcion = dr["DescripcionREQUERIMIENTO"].ToString(),
                            IdCategoria = Convert.ToInt32(dr["IdCategoria"].ToString()),
                            oCategoria = new Categoria() { Descripcion = dr["DescripcionCategoria"].ToString() },
                            Activo = Convert.ToBoolean(dr["Activo"].ToString())
                        });
                    }
                    dr.Close();

                    return rptListaREQUERIMIENTO;

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    rptListaREQUERIMIENTO = null;
                    return rptListaREQUERIMIENTO;
                }
            }
        }

        public bool RegistrarREQUERIMIENTO(REQUERIMIENTO oREQUERIMIENTO)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("usp_RegistrarREQUERIMIENTO", oConexion);
                    cmd.Parameters.AddWithValue("Nombre", oREQUERIMIENTO.Nombre);
                    cmd.Parameters.AddWithValue("Descripcion", oREQUERIMIENTO.Descripcion);
                    cmd.Parameters.AddWithValue("IdCategoria", oREQUERIMIENTO.IdCategoria);
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

        public bool ModificarREQUERIMIENTO(REQUERIMIENTO oREQUERIMIENTO)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("usp_ModificarREQUERIMIENTO", oConexion);
                    cmd.Parameters.AddWithValue("IdREQUERIMIENTO", oREQUERIMIENTO.IdREQUERIMIENTO);
                    cmd.Parameters.AddWithValue("Nombre", oREQUERIMIENTO.Nombre);
                    cmd.Parameters.AddWithValue("Descripcion", oREQUERIMIENTO.Descripcion);
                    cmd.Parameters.AddWithValue("IdCategoria", oREQUERIMIENTO.IdCategoria);
                    cmd.Parameters.AddWithValue("Activo", oREQUERIMIENTO.Activo);
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

        public bool EliminarREQUERIMIENTO(int IdREQUERIMIENTO)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("usp_EliminarREQUERIMIENTO", oConexion);
                    cmd.Parameters.AddWithValue("IdREQUERIMIENTO", IdREQUERIMIENTO);
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
