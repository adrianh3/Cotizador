using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CotizadorSeguro.Controllers
{
    public class CotizadorController : Controller
    {

        protected ExcSegurosDbContext db = new ExcSegurosDbContext();

        /// <summary>
        /// Vista del cotizador
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }


        /// <summary>
        /// Obtenemos todas las marcas registradas en nuestra BD
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public JsonResult ObtenerMarcas()
        {
            List<Marca> marcas = db.Marca.ToList();
            var marcasSelect = marcas.Select(x => new { Nombre = x.NombreMarca, MarcaId = x.MarcaId });
            return Json(marcasSelect, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Obtenemos todas las sub marcas dependiendo la marcaId que nos es enviada
        /// </summary>
        /// <param name="marcaId"></param>
        /// <returns></returns>
        [HttpGet]
        public JsonResult ObtenerSubMarcas(int marcaId)
        {
            List<SubMarca> SubMarca = db.SubMarca.Where(x=> x.MarcaId == marcaId).ToList();
            var subMarcasSelect = SubMarca.Select(x => new { Nombre = x.Nombre, SubMarcaId = x.SubMarcaId });
            return Json(subMarcasSelect, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Obtenemos todos los modelos de la sub marca que nos es enviada
        /// </summary>
        /// <param name="subMarcaId"></param>
        /// <returns></returns>
        [HttpGet]
        public JsonResult ObtenerModelos(int subMarcaId)
        {
            List<ModeloSubMarca> ModeloSubMarca = db.ModeloSubMarca.Where(x => x.SubMarcaId == subMarcaId).ToList();
            var modeloSubMarcasSelect = ModeloSubMarca.Select(x => new { Anio = x.Modelo, ModeloSubMarcaId = x.ModeloSubMarcaId });
            return Json(modeloSubMarcasSelect, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Obtenemos la descripcion del modelo de la sub marca enviada
        /// </summary>
        /// <param name="modeloSubMarcaId"></param>
        /// <returns></returns>
        [HttpGet]
        public JsonResult ObtenerDescripcion(int modeloSubMarcaId)
        {
            List<Descripcion> Descripciones = db.Descripcion.Where(x => x.ModeloSubMarcaId == modeloSubMarcaId).ToList();
            var modeloDescripciones = Descripciones.Select(x => new { Descripcion = x.Descripcion1, DescripcionId = x.DescripcionId });
            return Json(modeloDescripciones, JsonRequestBehavior.AllowGet);
        }

    }
}
