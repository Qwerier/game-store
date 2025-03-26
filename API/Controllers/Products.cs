using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ILogger<ProductsController> logger;
        private readonly StoreContext context;
        public ProductsController(ILogger<ProductsController> logger, StoreContext context)
        {
            this.logger = logger;
            this.context = context;
        }

    }
}