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
    public class CD_REGISTRO
    {
        public static CD_REGISTRO _instancia = null;

        private CD_REGISTRO()
        {

        }

        public static CD_REGISTRO Instancia
        {
            get
            {
                if (_instancia == null)
                {
                    _instancia = new CD_REGISTRO();
                }
                return _instancia;
            }
        }

        public bool RegistrarREGISTRO(string Detalle)
        {
            bool respuesta = true;
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("usp_RegistrarREGISTRO", oConexion);
                    cmd.Parameters.Add("Detalle", SqlDbType.Xml).Value = Detalle;
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


        public REGISTRO ObtenerDetalleREGISTRO(int IdREGISTRO)
        {
            REGISTRO rptDetalleREGISTRO = new REGISTRO();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                SqlCommand cmd = new SqlCommand("usp_ObtenerDetalleREGISTRO", oConexion);
                cmd.Parameters.AddWithValue("@IdREGISTRO", IdREGISTRO);
                cmd.CommandType = CommandType.StoredProcedure;


                try
                {
                    oConexion.Open();
                    using (XmlReader dr = cmd.ExecuteXmlReader())
                    {
                        while (dr.Read())
                        {
                            XDocument doc = XDocument.Load(dr);
                            if (doc.Element("DETALLE_REGISTRO") != null)
                            {
                                rptDetalleREGISTRO = (from dato in doc.Elements("DETALLE_REGISTRO")
                                                    select new REGISTRO()
                                                    {
                                                        Codigo = dato.Element("Codigo").Value,
                                                        TotalCosto = float.Parse(dato.Element("TotalCosto").Value),
                                                        FechaREGISTRO = dato.Element("FechaREGISTRO").Value
                                                    }).FirstOrDefault();
                                rptDetalleREGISTRO.oAREAProveedor = (from dato in doc.Element("DETALLE_REGISTRO").Elements("DETALLE_AREAproveedor")
                                                               select new AREAProveedor()
                                                               {
                                                                   NUMERO = dato.Element("NUMERO").Value,
                                                                   ASUNTO = dato.Element("ASUNTO").Value,
                                                               }).FirstOrDefault();
                                rptDetalleREGISTRO.oAREA = (from dato in doc.Element("DETALLE_REGISTRO").Elements("DETALLE_AREA")
                                                            select new AREA()
                                                            {
                                                                NUMERO = dato.Element("NUMERO").Value,
                                                                Nombre = dato.Element("Nombre").Value,
                                                                Direccion = dato.Element("Direccion").Value
                                                            }).FirstOrDefault();
                                rptDetalleREGISTRO.oListaDetalleREGISTRO = (from REQUERIMIENTO in doc.Element("DETALLE_REGISTRO").Element("DETALLE_REQUERIMIENTO").Elements("REQUERIMIENTO")
                                                                        select new DetalleREGISTRO()
                                                                        {
                                                                            Cantidad = int.Parse(REQUERIMIENTO.Element("Cantidad").Value),
                                                                            oREQUERIMIENTO = new REQUERIMIENTO() { Nombre = REQUERIMIENTO.Element("NombreREQUERIMIENTO").Value },
                                                                            PrecioUnitarioREGISTRO = float.Parse(REQUERIMIENTO.Element("PrecioUnitarioREGISTRO").Value),
                                                                            TotalCosto = float.Parse(REQUERIMIENTO.Element("TotalCosto").Value)
                                                                        }).ToList();
                            }
                            else
                            {
                                rptDetalleREGISTRO = null;
                            }
                        }

                        dr.Close();

                    }

                    return rptDetalleREGISTRO;
                }
                catch (Exception ex)
                {

                    rptDetalleREGISTRO = null;
                    return rptDetalleREGISTRO;
                }
            }
        }




        public List<REGISTRO> ObtenerListaREGISTRO(DateTime FechaInicio, DateTime FechaFin, int IdAREAProveedor, int IdAREA)
        {
            List<REGISTRO> rptListaREGISTRO = new List<REGISTRO>();
            using (SqlConnection oConexion = new SqlConnection(Conexion.CN))
            {
                SqlCommand cmd = new SqlCommand("usp_ObtenerListaREGISTRO", oConexion);
                cmd.Parameters.AddWithValue("@FechaInicio", FechaInicio);
                cmd.Parameters.AddWithValue("@FechaFin", FechaFin);
                cmd.Parameters.AddWithValue("@IdAREAProveedor", IdAREAProveedor);
                cmd.Parameters.AddWithValue("@IdAREA", IdAREA);
                cmd.CommandType = CommandType.StoredProcedure;

                try
                {
                    oConexion.Open();
                    SqlDataReader dr = cmd.ExecuteReader();

                    while (dr.Read())
                    {
                        rptListaREGISTRO.Add(new REGISTRO()
                        {
                            IdREGISTRO = Convert.ToInt32(dr["IdREGISTRO"].ToString()),
                            NumeroREGISTRO = dr["NumeroREGISTRO"].ToString(),
                            oAREAProveedor = new AREAProveedor() { ASUNTO = dr["ASUNTO"].ToString() },
                            oAREA = new AREA() { Nombre = dr["Nombre"].ToString() },
                            FechaREGISTRO = dr["FechaREGISTRO"].ToString(),
                            TotalCosto = float.Parse(dr["TotalCosto"].ToString())
                        });
                    }
                    dr.Close();

                    return rptListaREGISTRO;

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    rptListaREGISTRO = null;
                    return rptListaREGISTRO;
                }
            }
        }
    }


}
