using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation.AspNetCore;

namespace Backend.Domain.Entities
{
    public abstract class BaseEntity
    {
        public virtual Guid Id { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public bool Deleted { get; set; }

        public DateTime? DeleteAt { get; set; }

    }
}
