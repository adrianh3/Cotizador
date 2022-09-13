namespace CotizadorSeguro
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SubMarca")]
    public partial class SubMarca
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SubMarca()
        {
            ModeloSubMarca = new HashSet<ModeloSubMarca>();
        }

        public int SubMarcaId { get; set; }

        [Required]
        [StringLength(50)]
        public string Nombre { get; set; }

        public int? MarcaId { get; set; }

        public virtual Marca Marca { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ModeloSubMarca> ModeloSubMarca { get; set; }
    }
}
