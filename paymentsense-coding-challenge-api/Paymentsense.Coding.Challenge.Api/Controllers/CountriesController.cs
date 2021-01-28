using System;
using Microsoft.AspNetCore.Mvc;
using Paymentsense.Coding.Challenge.Api.Models;
using Paymentsense.Coding.Challenge.Api.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net;

namespace Paymentsense.Coding.Challenge.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountriesController : ControllerBase
    {
        private readonly ICountryService _countryService;

        public CountriesController(ICountryService countryService)
        {
            _countryService = countryService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CountryBase>>> Get()
        {
            try
            {
                var result = await _countryService.GetAllCountriesAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<Country>> GetCountry(string name)
        {
            try
            {
                var result = await _countryService.GetCountryAsync(name);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
