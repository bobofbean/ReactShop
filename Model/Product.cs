using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace react.Model
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
    }

    public class ProductsPaginated
    {
        public List<Product> products;
    }

    public class ChosenProducts
    {
        public List<Product> chosenProducts = new List<Product>();
        //public int orderPrice = 0;
    }
}
