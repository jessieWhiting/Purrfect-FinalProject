using System.IO.Pipelines;
using static System.Net.WebRequestMethods;

namespace Project1.Models
{
	public class PetFinderAPI
	{
		private static HttpClient _realClient = null;
		public static HttpClient MyHttp
		{
			get
			{
				if (_realClient == null)
				{
					_realClient = new HttpClient();
					_realClient.BaseAddress = new Uri("https://api.petfinder.com/v2/");
				}
				return _realClient;
			}
		}
		// public bool hasToken = false;
		// public DateTime lastSet;

		public void SetToken(string access_token)
		{
			// need to make this store the token and check if its different and delete the old and switch them
			// double timeDifference = (DateTime.Now - lastSet).TotalMinutes;

			// Console.WriteLine("time dif "+timeDifference);

			// if (hasToken == false || timeDifference > 58)
			{
			//	MyHttp.DefaultRequestHeaders.Add("Authorization", "Bearer " + access_token);
			//	hasToken = true;
			//	lastSet= DateTime.Now;
			}
		}
		public static void OnLoad(string access_token)
		{
			MyHttp.DefaultRequestHeaders.Remove("Authorization");
			MyHttp.DefaultRequestHeaders.Add("Authorization", "Bearer " + access_token);
		}
		public static async Task<PFResults> GetPetsAddToken(string page, string access_token)
		{
			MyHttp.DefaultRequestHeaders.Remove("Authorization");
			MyHttp.DefaultRequestHeaders.Add("Authorization", "Bearer " + access_token);
			// Console.WriteLine("cl "+MyHttp.DefaultRequestHeaders.Authorization);
			var connection = await MyHttp.GetAsync($"animals?type=cat&page={page}");
			PFResults breeds = await connection.Content.ReadAsAsync<PFResults>();

			return breeds;
		}
		public static async Task<PFPet> GetSpecificPetAddToken(string id, string access_token)
		{
			MyHttp.DefaultRequestHeaders.Remove("Authorization");
			MyHttp.DefaultRequestHeaders.Add("Authorization", "Bearer " + access_token);
			var connection = await MyHttp.GetAsync($"animals/{id}");
			PFPet breeds = await connection.Content.ReadAsAsync<PFPet>();

			return breeds;
		}
		public static async Task<PFResults> GetPets(string page)
		{
			var connection = await MyHttp.GetAsync($"animals?type=cat&page={page}");
			PFResults breeds = await connection.Content.ReadAsAsync<PFResults>();

			return breeds;
		}
		public static async Task<PFPet> GetSpecificPet(string id)
		{
			var connection = await MyHttp.GetAsync($"animals/{id}");
			PFPet breeds = await connection.Content.ReadAsAsync<PFPet>();

			return breeds;
		}

	}
}
