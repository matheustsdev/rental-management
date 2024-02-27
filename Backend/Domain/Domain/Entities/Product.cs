using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Entities
{
    public class Product : BaseEntity
    {
        public string Reference { get; set; } = "";

        public string Description { get; set; } = "";

        public string ReceiptDescription { get; set; } = "";
        
        public Guid CategoryId { get; set; }

        public virtual Category Category { get; set; }

        public decimal Price { get; set; }

    }
}
