using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Paymentsense.Coding.Challenge.Api.Models;
using Newtonsoft.Json;
using System.Linq;
using System.Net;

namespace Paymentsense.Coding.Challenge.Api.Services
{
    public class CountryService : ICountryService
    {
        private readonly HttpClient _httpClient;

        public CountryService(HttpClient client)
        {
           _httpClient = client;
        }

        public async Task<List<CountryBase>> GetAllCountriesAsync()
        {
            var httpResponse = await _httpClient.GetAsync("all?fields=name;flag");

            if (!httpResponse.IsSuccessStatusCode)
            {
                throw new Exception("can not access country");
            }

            var content = await httpResponse.Content.ReadAsStringAsync();
            var countries = JsonConvert.DeserializeObject<List<CountryBase>>(content);

            return countries;
        }

        public async Task<Country> GetCountryAsync(string name)
        {
            var httpResponse = await _httpClient.GetAsync($"name/{name}");

            if (!httpResponse.IsSuccessStatusCode)
            {
                 if (httpResponse.StatusCode == HttpStatusCode.NotFound)
                    throw new Exception("Invalid country name");
                else 
                    throw new Exception("can not access country");
               
            }

            var content = await httpResponse.Content.ReadAsStringAsync();
            var country = JsonConvert.DeserializeObject<List<Country>>(content);

            return country.FirstOrDefault();
        }
    }
}
