using CapaModelo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace CapaDatos
{
    public class CD_AREAProveedor
    {
        public static CD_AREAProveedor _instancia = null;

        private CD_AREAProveedor()
        {

        }

        public static CD_AREAProveedor Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new CD_AREAProveedor();
                }
                return _instancia;
            }
        }

        public List<AREAProveedor> ObtenerAREAProveedor()
        {
            List<AREAProveedor> rptListaAREAProveedor = new List<AREAProveedor>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                SqlCommand cmd = new SqlCommand("usp_ObtenerAREAProveedores", oConexion);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptListaAREAProveedor.Add(new AREAProveedor()
                        {
                            IdAREAProveedor = Convert.ToInt32(dr["IdAREAProveedor"].ToString()),
                            NUMERO = dr["NUMERO"].ToString(),
                            ASUNTO = dr["ASUNTO"].ToString(),
                            Telefono = dr["Telefono"].ToString(),
                            Correo = dr["Correo"].ToString(),
                            Direccion = dr["Direccion"].ToString(),
                            Activo = Convert.ToBoolean(dr["Activo"].ToString())

                        });
                    }
                    dr.Close();

                    return rptListaAREAProveedor;

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    rptListaAREAProveedor = null;
                    return rptListaAREAProveedor;
                }
            }
        }

        public bool RegistrarAREAProveedor(AREAProveedor oAREAProveedor)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("usp_RegistrarAREAProveedor", oConexion);
                    cmd.Parameters.AddWithValue("NUMERO", oAREAProveedor.NUMERO);
                    cmd.Parameters.AddWithValue("ASUNTO", oAREAProveedor.ASUNTO);
                    cmd.Parameters.AddWithValue("Telefono", oAREAProveedor.Telefono);
                    cmd.Parameters.AddWithValue("Correo", oAREAProveedor.Correo);
                    cmd.Parameters.AddWithValue("Direccion", oAREAProveedor.Direccion);
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


        public bool ModificarAREAProveedor(AREAProveedor oAREAProveedor)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("usp_ModificarAREAProveedor", oConexion);
                    cmd.Parameters.AddWithValue("IdAREAProveedor", oAREAProveedor.IdAREAProveedor);
                    cmd.Parameters.AddWithValue("NUMERO", oAREAProveedor.NUMERO);
                    cmd.Parameters.AddWithValue("ASUNTO", oAREAProveedor.ASUNTO);
                    cmd.Parameters.AddWithValue("Telefono", oAREAProveedor.Telefono);
                    cmd.Parameters.AddWithValue("Correo", oAREAProveedor.Correo);
                    cmd.Parameters.AddWithValue("Direccion", oAREAProveedor.Direccion);
                    cmd.Parameters.AddWithValue("Activo", oAREAProveedor.Activo);
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

        public bool EliminarAREAProveedor(int IdAREAProveedor)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("usp_EliminarAREAProveedor", oConexion);
                    cmd.Parameters.AddWithValue("IdAREAProveedor", IdAREAProveedor);
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
