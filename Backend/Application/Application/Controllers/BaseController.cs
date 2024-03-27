using Backend.Domain.Constants;
using Backend.Domain.Entities;
using Backend.Domain.Helpers;
using Backend.Domain.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<TEntity, TCreateValidator, TUpdateValidator> : ControllerBase
        where TEntity : BaseEntity
        where TCreateValidator : AbstractValidator<TEntity>
        where TUpdateValidator : AbstractValidator<TEntity>
    {
        private IBaseService<TEntity, TCreateValidator, TUpdateValidator> _baseService;

        public BaseController(IBaseService<TEntity, TCreateValidator, TUpdateValidator> baseService)
        {
            _baseService = baseService;
        }

        private ResponseModel<TResponseModel> CreateResponseModel<TResponseModel>(string message, TResponseModel result, EStatusResponse status)
        {

            return new ResponseModel<TResponseModel> (message, result, status);
        }

        [HttpPost]
        public IActionResult Create([FromBody] TEntity entity)
        {
            if (entity == null)
            {
                return NotFound(CreateResponseModel<TEntity?>("Erro com os dados usados para a criação.", null, EStatusResponse.ERROR));
            }

            return Execute(() => CreateResponseModel<TEntity>("Criado com sucesso!", _baseService.Add<TCreateValidator>(entity), EStatusResponse.SUCCESS));
        }

        [HttpPut]
        public IActionResult Update([FromBody] TEntity entity)
        {
            if (entity == null)
                return NotFound(CreateResponseModel<TEntity?>("Erro com os dados usados para a criação.", null, EStatusResponse.ERROR));

            return Execute(() => {
                ResponseModel<TEntity> response = CreateResponseModel<TEntity>("Atualização realizada com sucesso!", _baseService.Update<TUpdateValidator>(entity), EStatusResponse.SUCCESS);

                return response;
            });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            if (id == Guid.Empty)
                return NotFound();

            Execute(() =>
            {
                _baseService.Delete(id);

                return CreateResponseModel<Boolean>("Dado deletado.", true, EStatusResponse.SUCCESS);
            });

            return new NoContentResult();
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Execute(() => new ResponseModel<IList<TEntity>>("Dados retornados com sucesso.", _baseService.Get(), EStatusResponse.SUCCESS));
        }

        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            return Execute(() => CreateResponseModel("Dado retornado com sucesso.", _baseService.GetById(id), EStatusResponse.SUCCESS));
        }

        private IActionResult Execute<T>(Func<ResponseModel<T>> func)
        {
            try
            {
                var result = func();

                if (result.Status == EStatusResponse.SUCCESS)
                {
                    return Ok(result);
                }
                else
                {
                    return BadRequest(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModel<T>("Ocorreu um erro ao processar a solicitação.", default(T), EStatusResponse.ERROR));
            }
        }
    }
}

