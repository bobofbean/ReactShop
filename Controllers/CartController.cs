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
    public class CartController : Controller
    {
        [HttpPost]
        public void CartInfo()
        {
        }
    }

}
