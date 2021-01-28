using System.Collections.Generic;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using FluentAssertions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Newtonsoft.Json;
using Paymentsense.Coding.Challenge.Api.Models;
using Xunit;

namespace Paymentsense.Coding.Challenge.Api.Tests.Controllers
{
    public class CountriesControllerIntegrationTests
    {
        private readonly HttpClient _client;

        public CountriesControllerIntegrationTests()
        {
            //Arrange
            var testServer = new TestServer(new WebHostBuilder().UseStartup<Startup>()
                .UseSetting("CountriesServiceBaseUrl", "https://restcountries.eu/rest/v2/"));
            _client = testServer.CreateClient();
        }

        [Fact]
        public async Task Countries_Get_ReturnsAllCountries()
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
        public async Task Countries_GetCountry_ReturnsDetailsForGivenCountry()
        {
            var CountryName = "Afghanistan";
            // Act
            var response = await _client.GetAsync($"/countries/{CountryName}");
            var content = await response.Content.ReadAsStringAsync();

            // Assert
            var country = JsonConvert.DeserializeObject<Country>(content);
            Assert.Equal(CountryName, country.Name);
        }

        [Fact]
        public async Task Countries_GetCountry_ReturnsErrorForInvalidCountry()
        {
            var CountryName = "abcd";
            // Act
            var response = await _client.GetAsync($"/countries/{CountryName}");
            var content = await response.Content.ReadAsStringAsync();

            // Assert
            response.StatusCode.Should().Be(StatusCodes.Status404NotFound);
            Assert.Equal("Invalid country name", content);
        }
    }
}
