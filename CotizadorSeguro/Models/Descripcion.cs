namespace CotizadorSeguro
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Descripcion")]
    public partial class Descripcion
    {
        public Guid DescripcionId { get; set; }

        [Column("Descripcion")]
        [Required]
        [StringLength(100)]
        public string Descripcion1 { get; set; }

        public int? ModeloSubMarcaId { get; set; }

        public virtual ModeloSubMarca ModeloSubMarca { get; set; }
    }
}
