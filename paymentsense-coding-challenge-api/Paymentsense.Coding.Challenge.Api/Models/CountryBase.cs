using Newtonsoft.Json;

namespace Paymentsense.Coding.Challenge.Api.Models
{
    public class CountryBase
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("flag")]
        public string Flag { get; set; }
    }
}
