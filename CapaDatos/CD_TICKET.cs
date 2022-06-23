using CapaModelo;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Xml;
using System.Xml.Linq;

namespace CapaDatos
{
    public class CD_TICKET
    {

        public static CD_TICKET _instancia = null;

        private CD_TICKET()
        {

        }

        public static CD_TICKET Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new CD_TICKET();
                }
                return _instancia;
            }
        }

        public int RegistrarTICKET(string Detalle)
        {
            int respuesta = 0;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("usp_RegistrarTICKET", oConexion);
                    cmd.Parameters.Add("Detalle", SqlDbType.Xml).Value = Detalle;
                    cmd.Parameters.Add("Resultado", SqlDbType.Int).Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;

                    oConexion.Open();

                    cmd.ExecuteNonQuery();

                    respuesta = Convert.ToInt32(cmd.Parameters["Resultado"].Value);

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    respuesta = 0;
                }
            }
            return respuesta;
        }




        public TICKET ObtenerDetalleTICKET(int IdTICKET)
        {
            TICKET rptDetalleTICKET = new TICKET();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                SqlCommand cmd = new SqlCommand("usp_ObtenerDetalleTICKET", oConexion);
                cmd.Parameters.AddWithValue("@IdTICKET", IdTICKET);
                cmd.CommandType = CommandType.StoredProcedure;


                try
                {
                    oConexion.Open();
                    using (XmlReader dr = cmd.ExecuteXmlReader())
                    {
                        while (dr.Read())
                        {
                            XDocument doc = XDocument.Load(dr);
                            if (doc.Element("DETALLE_TICKET") != null)
                            {
                                rptDetalleTICKET = (from dato in doc.Elements("DETALLE_TICKET")
                                                   select new TICKET()
                                                   {
                                                       TipoDocumento = dato.Element("TipoDocumento").Value,
                                                       Codigo = dato.Element("Codigo").Value,
                                                       TotalCosto = float.Parse(dato.Element("TotalCosto").Value),
                                                       ImporteRecibido = float.Parse(dato.Element("ImporteRecibido").Value),
                                                       ImporteCambio = float.Parse(dato.Element("ImporteCambio").Value),
                                                       FechaRegistro = dato.Element("FechaRegistro").Value
                                                   }).FirstOrDefault();
                                rptDetalleTICKET.oUsuario = (from dato in doc.Element("DETALLE_TICKET").Elements("DETALLE_USUARIO")
                                                            select new Usuario()
                                                            {
                                                                Nombres = dato.Element("Nombres").Value,
                                                                Apellidos = dato.Element("Apellidos").Value,
                                                            }).FirstOrDefault();
                                rptDetalleTICKET.oAREA = (from dato in doc.Element("DETALLE_TICKET").Elements("DETALLE_AREA")
                                                           select new AREA()
                                                           {
                                                               NUMERO = dato.Element("NUMERO").Value,
                                                               Nombre = dato.Element("Nombre").Value,
                                                               Direccion = dato.Element("Direccion").Value
                                                           }).FirstOrDefault();
                                rptDetalleTICKET.oDATOS = (from dato in doc.Element("DETALLE_TICKET").Elements("DETALLE_DATOS")
                                                            select new DATOS()
                                                            {
                                                                Nombre = dato.Element("Nombre").Value,
                                                                Direccion = dato.Element("Direccion").Value,
                                                                NumeroDocumento = dato.Element("NumeroDocumento").Value,
                                                                Telefono = dato.Element("Telefono").Value
                                                            }).FirstOrDefault();
                                rptDetalleTICKET.oListaDetalleTICKET = (from REQUERIMIENTO in doc.Element("DETALLE_TICKET").Element("DETALLE_REQUERIMIENTO").Elements("REQUERIMIENTO")
                                                                      select new DetalleTICKET()
                                                                      {
                                                                          Cantidad = int.Parse(REQUERIMIENTO.Element("Cantidad").Value),
                                                                          NombreREQUERIMIENTO = REQUERIMIENTO.Element("NombreREQUERIMIENTO").Value,
                                                                          PrecioUnidad = float.Parse(REQUERIMIENTO.Element("PrecioUnidad").Value),
                                                                          ImporteTotal = float.Parse(REQUERIMIENTO.Element("ImporteTotal").Value)
                                                                      }).ToList();
                            }
                            else
                            {
                                rptDetalleTICKET = null;
                            }
                        }

                        dr.Close();

                    }

                    return rptDetalleTICKET;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    rptDetalleTICKET = null;
                    return rptDetalleTICKET;
                }
            }
        }

        public List<TICKET> ObtenerListaTICKET(string Codigo, DateTime FechaInicio, DateTime FechaFin, string NumeroDocumento, string Nombre)
        {
            List<TICKET> rptListaTICKET = new List<TICKET>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                SqlCommand cmd = new SqlCommand("usp_ObtenerListaTICKET", oConexion);
                cmd.Parameters.AddWithValue("@Codigo", Codigo);
                cmd.Parameters.AddWithValue("@FechaInicio", FechaInicio);
                cmd.Parameters.AddWithValue("@FechaFin", FechaFin);
                cmd.Parameters.AddWithValue("@NumeroDocumento", NumeroDocumento);
                cmd.Parameters.AddWithValue("@Nombre", Nombre);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptListaTICKET.Add(new TICKET()
                        {
                            IdTICKET = Convert.ToInt32(dr["IdTICKET"].ToString()),
                            TipoDocumento = dr["TipoDocumento"].ToString(),
                            Codigo = dr["Codigo"].ToString(),
                            FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()).ToString("F"),
                            VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString()),
                            oDATOS = new DATOS() { NumeroDocumento = dr["NumeroDocumento"].ToString(), Nombre = dr["Nombre"].ToString() },
                            TotalCosto = float.Parse(dr["TotalCosto"].ToString())
                        });
                    }
                    dr.Close();

                    return rptListaTICKET;

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    rptListaTICKET = null;
                    return rptListaTICKET;
                }
            }
        }

    }
}
