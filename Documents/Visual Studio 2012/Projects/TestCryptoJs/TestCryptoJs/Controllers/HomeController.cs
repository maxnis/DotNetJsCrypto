using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;
using TestCryptoJs.Models;
using UpstreamWorks.Cryptography;

namespace TestCryptoJs.Controllers
{
    public class HomeController : Controller
    {
        private UpstreamWorks.Cryptography.Cryptography _crypto = null;
        private string _keyPath = "";

        public HomeController()
        {
            this._keyPath = @"C:\upstream\keys\uwf-rsa.config";
            this._crypto = new UpstreamWorks.Cryptography.Cryptography(this._keyPath);
        }

        //
        // GET: /Home/
        public ActionResult Index()
        {
            //var rsaParams = this._crypto.ServiceProvider.ExportParameters(false);
            var xkey = XElement.Parse(this._crypto.ServiceProvider.ToXmlString(false));
            ViewBag.ServerKey = xkey.Element("Modulus").Value;
            return View(new ModelEncr());
        }

        [HttpPost]
        public string Submit(string encrValue)
        {
            // todo: decrypt here and return
            string result = "";
            try
            {
                result = this._crypto.Decrypt(encrValue);
                //result = Encoding.UTF8.GetString(binaryData);
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }
            return result;
        }
	}
}