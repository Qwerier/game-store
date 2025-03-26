using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Mode
    {
        [Key]
        public int Id { get; set;}
        public required string PlayerMode { get; set; }
    }
}