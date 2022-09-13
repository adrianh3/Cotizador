namespace CotizadorSeguro
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ModeloSubMarca")]
    public partial class ModeloSubMarca
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ModeloSubMarca()
        {
            Descripcion = new HashSet<Descripcion>();
        }

        public int ModeloSubMarcaId { get; set; }

        public int Modelo { get; set; }

        public int? SubMarcaId { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Descripcion> Descripcion { get; set; }

        public virtual SubMarca SubMarca { get; set; }
    }
}
