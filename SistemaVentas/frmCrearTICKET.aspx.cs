using CapaDatos;
using CapaModelo;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
using System.IO;

namespace SISTEMATICKET
{
    public partial class frmCrearTICKET : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        

        [WebMethod]
        public static Respuesta<int> Guardar(string xml)
        {
            xml = xml.Replace("!idusuario¡", Configuracion.oUsuario.IdUsuario.ToString());
            int Respuesta = 0;
            Respuesta = CD_TICKET.Instancia.RegistrarTICKET(xml);
            if(Respuesta != 0)
                return new Respuesta<int>() { estado = true, valor = Respuesta.ToString() };
            else
                return new Respuesta<int>() { estado = false };
        }

        [WebMethod]
        public static Respuesta<List<REQUERIMIENTOAREA>> ObtenerREQUERIMIENTOxAREA(int IdAREA)
        {
            List<REQUERIMIENTOAREA> oListaREQUERIMIENTOAREA = CD_REQUERIMIENTOAREA.Instancia.ObtenerREQUERIMIENTOAREA();
            oListaREQUERIMIENTOAREA = oListaREQUERIMIENTOAREA.Where(x => x.oAREA.IdAREA == IdAREA && x.Stock > 0).ToList();


            if (oListaREQUERIMIENTOAREA != null)
            {
                return new Respuesta<List<REQUERIMIENTOAREA>>() { estado = true, objeto = oListaREQUERIMIENTOAREA };
            }
            else
            {
                return new Respuesta<List<REQUERIMIENTOAREA>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<bool> ControlarStock(int idREQUERIMIENTO, int IdAREA,int cantidad,bool restar)
        {
            bool Respuesta = false;
            Respuesta = CD_REQUERIMIENTOAREA.Instancia.ControlarStock(idREQUERIMIENTO, IdAREA, cantidad,restar);
            return new Respuesta<bool>() { estado = Respuesta };
        }

        private void SendAsync(string to, string subject, string body, bool isBodyHtml = true)
        {
            var host = ConfigurationManager.AppSettings["Host"];
            var port = Convert.ToInt32(ConfigurationManager.AppSettings["EmailPort"]);
            var from = ConfigurationManager.AppSettings["SMTPuser"];
            var username = ConfigurationManager.AppSettings["SMTPuser"];
            var password = ConfigurationManager.AppSettings["SMTPpassword"];
            var ssl = Convert.ToBoolean(ConfigurationManager.AppSettings["EnableSSL"]);

            using (var smtpClient = new SmtpClient(host, port))
            {
                smtpClient.Credentials = new NetworkCredential(username, password);
                smtpClient.EnableSsl = ssl;

                using (var mailMessage = new MailMessage())
                {
                    mailMessage.From = new MailAddress(from);
                    mailMessage.Subject = subject;
                    mailMessage.Body = body;
                    mailMessage.IsBodyHtml = isBodyHtml;
                    mailMessage.To.Add(new MailAddress(to));
                    smtpClient.Send(mailMessage);
                }
            }
        }

        protected void btnTerminarGuardarTICKET_Click(object sender, EventArgs e)
        {
            //try
            //{
                //TextBox txtclientenombres = Page.FindControl("txtclientenombres") as TextBox;
                DropDownList dllEmail = Page.FindControl("ddlEmail") as DropDownList;

            //using (MailMessage mm = new MailMessage(ConfigurationManager.AppSettings["SMTPuser"], ddlEmail.SelectedItem.Value.ToString()))
            //{
            //    mm.Subject = "Ticket Creado";
            //    mm.Body = CreateBody();
            //    mm.IsBodyHtml = true;
            //    SmtpClient smtp = new SmtpClient();
            //    smtp.Host = ConfigurationManager.AppSettings["Host"];
            //    smtp.EnableSsl = true;

            //    NetworkCredential NetworkCred = new NetworkCredential(ConfigurationManager.AppSettings["SMTPuser"], ConfigurationManager.AppSettings["SMTPpassword"]);
            //    smtp.UseDefaultCredentials = Convert.ToBoolean(ConfigurationManager.AppSettings["EnableSSL"]);
            //    smtp.Credentials = NetworkCred;
            //    smtp.Port = int.Parse(ConfigurationManager.AppSettings["EmailPort"]);
            //    smtp.Send(mm);

            //}
            SendAsync(ddlEmail.SelectedItem.Value.ToString(),"Ticket Creado","N°");
            Response.Write("alert('Email Sent..');");

            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine(ex.ToString());
            //}

        }
        private string CreateBody()
        {
            TextBox txtfechaTICKET = Page.FindControl("txtfechaTICKET") as TextBox;
            TextBox txtDATOSdocumento = Page.FindControl("txtDATOSdocumento") as TextBox;
            string body = string.Empty;
            using (StreamReader reader = new StreamReader(Server.MapPath("~/EmailTamplate.html")))
            {

                body = reader.ReadToEnd();

            }

            //body = body.Replace("{fname}", txtfname.Text); //replacing Parameters

            body = body.Replace("{lname}", "txtDATOSdocumento.Text");//txtclientedocumento.Text);

            body = body.Replace("{dob}", "txtfechaTICKET.Text");//txtfechaventa.Text);
            //body = body.Replace("{post}", txtpost.Text);
            //body = body.Replace("{designation}", txtdesignation.Text);

            return body;

        }
    }
}