using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace CotizadorSeguro
{
    public partial class ExcSegurosDbContext : DbContext
    {
        public ExcSegurosDbContext()
            : base("name=ExcSegurosDbContext")
        {
        }

        public virtual DbSet<Descripcion> Descripcion { get; set; }
        public virtual DbSet<Marca> Marca { get; set; }
        public virtual DbSet<ModeloSubMarca> ModeloSubMarca { get; set; }
        public virtual DbSet<SubMarca> SubMarca { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Descripcion>()
                .Property(e => e.Descripcion1)
                .IsUnicode(false);

            modelBuilder.Entity<Marca>()
                .Property(e => e.NombreMarca)
                .IsUnicode(false);

            modelBuilder.Entity<SubMarca>()
                .Property(e => e.Nombre)
                .IsUnicode(false);
        }
    }
}
