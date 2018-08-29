using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using react.Model;

namespace react.Controllers
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        [HttpGet("[action]")]
        public ProductsPaginated GetProductsFromJson()
        {
            List<Product> prod = new List<Product>();

            for (int i = 0; i < 5; i++)
            {
                prod.Add(new Product
                {
                    ProductId = i,
                    Name = "Daniel Lo Nigro",
                    Price = 0.5f,
                    CurrentCount = 0
                });
            }

            return new ProductsPaginated { products = prod };
        }
    }

}
