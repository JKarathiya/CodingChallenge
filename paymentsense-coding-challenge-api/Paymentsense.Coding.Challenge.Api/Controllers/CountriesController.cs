using System;
using Microsoft.AspNetCore.Mvc;
using Paymentsense.Coding.Challenge.Api.Models;
using Paymentsense.Coding.Challenge.Api.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net;
using Microsoft.Extensions.Caching.Memory;
using Paymentsense.Coding.Challenge.Api.Helper;

namespace Paymentsense.Coding.Challenge.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CountriesController : ControllerBase
    {
        private readonly ICountryService _countryService;
        private readonly IMemoryCache _cache;

        public CountriesController(ICountryService countryService, IMemoryCache memoryCache)
        {
            _countryService = countryService;
            _cache = memoryCache;
        }

        [HttpGet]
        public async Task<ActionResult<List<CountryBase>>> Get()
        {
            try
            {
                var cacheAllCountries = new List<CountryBase>();

                if (!_cache.TryGetValue(CacheKeys.AllCountry, out cacheAllCountries))
                {
                    // Key not in cache, so get data.
                    cacheAllCountries = await _countryService.GetAllCountriesAsync();

                    // Set cache options.
                    var cacheAllCountriesOptions = new MemoryCacheEntryOptions()
                        // Keep in cache for this time, reset time if accessed.
                        .SetSlidingExpiration(TimeSpan.FromMinutes(60));

                    // Save data in cache.
                    _cache.Set(CacheKeys.AllCountry, cacheAllCountries, cacheAllCountriesOptions);
                }

                return Ok(cacheAllCountries);
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
                string CountryKey = CacheKeys.CountryPrefix + name;
                var cacheCountry = new Country();

                if (!_cache.TryGetValue(CountryKey, out cacheCountry))
                {
                    // Key not in cache, so get data.
                    cacheCountry = await _countryService.GetCountryAsync(name);
                    // Set cache options.
                    var cacheAllCountriesOptions = new MemoryCacheEntryOptions()
                        // Keep in cache for this time, reset time if accessed.
                        .SetSlidingExpiration(TimeSpan.FromMinutes(60));

                    // Save data in cache.
                    _cache.Set(CountryKey, cacheCountry, cacheAllCountriesOptions);
                }

                return Ok(cacheCountry);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
