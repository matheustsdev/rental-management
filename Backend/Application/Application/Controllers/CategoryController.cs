using Backend.Domain.Interfaces;
using Backend.Domain.Entities;
using Backend.Service.Validators;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private IBaseService<Category> _baseService;

        public CategoryController(IBaseService<Category> baseService)
        {
            _baseService = baseService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] Category category)
        {
            if (category == null)
            {
                return NotFound();
            }

            return Execute(() => _baseService.Add<CategoryValidator>(category).Id);
        }

        [HttpPut]
        public IActionResult Update([FromBody] Category category)
        {
            if (category == null)
                return NotFound();
           
            return Execute(() => _baseService.Update<CategoryValidator>(category));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            if (id == Guid.Empty)
                return NotFound();

            Execute(() =>
            {
                _baseService.Delete(id);
                return true;
            });

            return new NoContentResult();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Execute(() => _baseService.Get());
        }

        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            return Execute(() => _baseService.GetById(id));
        }


        private IActionResult Execute(Func<object> func)
        {
            try
            {
                var result = func();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
