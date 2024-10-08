﻿using AutoMapper;
using Backend.Domain.Constants;
using Backend.Domain.Entities;
using Backend.Domain.Helpers;
using Backend.Domain.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend.Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<TEntity, TCreateValidator, TUpdateValidator> : ControllerBase
        where TEntity : BaseEntity
        where TCreateValidator : AbstractValidator<TEntity>
        where TUpdateValidator : AbstractValidator<TEntity>
    {
        protected readonly IBaseService<TEntity, TCreateValidator, TUpdateValidator> _baseService;
        protected readonly IMapper _mapper;

        public BaseController(IBaseService<TEntity, TCreateValidator, TUpdateValidator> baseService, IMapper mapper)
        {
            _baseService = baseService;
            _mapper = mapper;
        }

        private ResponseModel<TResponseModel> CreateResponseModel<TResponseModel>(string message, TResponseModel result, EStatusResponse status)
        {
            return new ResponseModel<TResponseModel>(message, result, status);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TEntity entity)
        {
            if (entity == null)
            {
                return NotFound(CreateResponseModel<TEntity?>("Erro com os dados usados para a criação.", null, EStatusResponse.ERROR));
            }

            Validate(entity, Activator.CreateInstance<TCreateValidator>());

            var result = await _baseService.Add<TCreateValidator>(entity);

            return Execute(() => CreateResponseModel<TEntity>("Criado com sucesso!", result, EStatusResponse.SUCCESS));
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(Guid id, [FromBody] JsonPatchDocument<TEntity> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest("Invalid patch document");
            }

            var entity = _baseService.GetById(id);

            if (entity == null)
            {
                return NotFound();
            }

            // Aplica o patch à entidade
            patchDoc.ApplyTo(entity, ModelState);

            // Verifica se a ModelState é válida após aplicar o patch
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Atualiza a entidade no banco de dados
            _baseService.Update<TUpdateValidator>(entity);

            return Ok(entity);
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
        public virtual IActionResult Get([FromQuery] string? includes)
        {
            var includesList = includes?.Split(",");
            var result = _baseService.Get(includesList);

            return Execute(() => CreateResponseModel("Dados retornados com sucesso.", result, EStatusResponse.SUCCESS));
        }

        [HttpGet("{id}")]
        public virtual IActionResult Get(Guid id)
        {
            var entity = _baseService.GetById(id);
            return Execute(() => CreateResponseModel("Dado retornado com sucesso.", entity, EStatusResponse.SUCCESS));
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

        private void Validate(TEntity obj, AbstractValidator<TEntity> validator)
        {
            if (obj == null)
                throw new Exception("Registros não detectados!");

            validator.ValidateAndThrow(obj);
        }
    }
}