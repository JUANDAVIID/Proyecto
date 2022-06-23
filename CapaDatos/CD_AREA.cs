using CapaModelo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace CapaDatos
{
    public class CD_AREA
    {
        public static CD_AREA _instancia = null;

        private CD_AREA()
        {

        }

        public static CD_AREA Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new CD_AREA();
                }
                return _instancia;
            }
        }

        public List<AREA> ObtenerAREA()
        {
            List<AREA> rptListaUsuario = new List<AREA>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                SqlCommand cmd = new SqlCommand("usp_ObtenerAREA", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptListaUsuario.Add(new AREA()
                        {
                            IdAREA = Convert.ToInt32(dr["IdAREA"].ToString()),
                            Nombre = dr["Nombre"].ToString(),
                            NUMERO = dr["NUMERO"].ToString(),
                            Direccion = dr["Direccion"].ToString(),
                            Telefono = dr["Telefono"].ToString(),
                            Activo = Convert.ToBoolean(dr["Activo"].ToString())

                        });
                    }
                    dr.Close();

                    return rptListaUsuario;

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    rptListaUsuario = null;
                    return rptListaUsuario;
                }
            }
        }

        public bool RegistrarAREA(AREA oAREA)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("usp_RegistrarAREA", oConexion);
                    cmd.Parameters.AddWithValue("Nombre", oAREA.Nombre);
                    cmd.Parameters.AddWithValue("NUMERO", oAREA.NUMERO);
                    cmd.Parameters.AddWithValue("Direccion", oAREA.Direccion);
                    cmd.Parameters.AddWithValue("Telefono", oAREA.Telefono);
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


        public bool ModificarAREA(AREA oAREA)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("usp_ModificarAREA", oConexion);
                    cmd.Parameters.AddWithValue("IdAREA", oAREA.IdAREA);
                    cmd.Parameters.AddWithValue("Nombre", oAREA.Nombre);
                    cmd.Parameters.AddWithValue("NUMERO", oAREA.NUMERO);
                    cmd.Parameters.AddWithValue("Direccion", oAREA.Direccion);
                    cmd.Parameters.AddWithValue("Telefono", oAREA.Telefono);
                    cmd.Parameters.AddWithValue("Activo", oAREA.Activo);
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

        public bool EliminarAREA(int IdAREA)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("usp_EliminarAREA", oConexion);
                    cmd.Parameters.AddWithValue("IdAREA", IdAREA);
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
