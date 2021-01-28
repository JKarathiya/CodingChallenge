using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Moq;
using Newtonsoft.Json;
using Paymentsense.Coding.Challenge.Api.Models;
using Paymentsense.Coding.Challenge.Api.Services;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace Paymentsense.Coding.Challenge.Api.Tests.Controllers
{
    public class CountriesControllerTest
    {
        private readonly HttpClient _client;

        public CountriesControllerTest()
        {
            var _mockCountryService = new Mock<ICountryService>();
            _mockCountryService.Setup(x => x.GetAllCountriesAsync()).Returns(Task.FromResult(new List<CountryBase>
            {
                new CountryBase{Name = "Abc", Flag="https://flag.com/abc"},
                new CountryBase{Name = "Abc1", Flag="https://flag.com/abc1"},
                new CountryBase{Name = "Abc2", Flag="https://flag.com/abc2"}
            }));
            _mockCountryService.Setup(x => x.GetCountryAsync("abc")).Returns(Task.FromResult(new Country
            {
                Name = "abc",
            }));

            var testServer = new TestServer(new WebHostBuilder().UseStartup<Startup>()
              .UseSetting("CountriesServiceBaseUrl", "https://restcountries.eu/rest/v2/").ConfigureTestServices(services =>
             {
                 services.RemoveAll<ICountryService>()
                     .TryAddSingleton(_mockCountryService.Object);
             }));
            _client = testServer.CreateClient();
        }


        [Fact]
        public async Task CountriesController_Get_ReturnsAllCountries()
        {
            // Act
            var response = await _client.GetAsync("/countries");
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();

            // Assert
            var countries = JsonConvert.DeserializeObject<List<CountryBase>>(content);
            Assert.True(countries.Count > 2, "Actual countries is greater than two");
        }

        [Fact]
        public async Task CountriesController_GetCountry_ReturnsGivenCountryDetails()
        {
            var CountryName = "abc";
            // Act
            var response = await _client.GetAsync($"/countries/{CountryName}");
            var content = await response.Content.ReadAsStringAsync();

            // Assert
            var country = JsonConvert.DeserializeObject<Country>(content);
            Assert.Equal(CountryName, country.Name);
        }
    }
}
