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
        ChosenProducts products = new ChosenProducts();

        [HttpGet("[action]")]
        public ProductsPaginated GetStartProductsFromJson()
        {
            List<Product> prod = new List<Product>();

            for (int i = 0; i < 5; i++)
            {
                prod.Add(new Product
                {
                    ProductId = i,
                    Name = "Daniel Lo Nigro",
                    Price = 0.5f,
                    Quantity = 0
                });
            }
            return new ProductsPaginated { products = prod };
        }

        [HttpPost("[action]")]
        public void SaveProducts(ChosenProducts products)
        {
            this.products = products;
        }

        [HttpGet("[action]")]
        public ChosenProducts GetProducts()
        {
            return products;
        }
    }
}
