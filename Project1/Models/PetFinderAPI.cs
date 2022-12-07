using Microsoft.AspNetCore.DataProtection;
using System.IO.Pipelines;
using System.Text.Json.Nodes;
using System.Text;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using static System.Net.WebRequestMethods;
using System.Text.Json;
using System.Net.Http;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using RestSharp;
using RestSharp.Authenticators;


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
			Console.WriteLine("xStartup token: "+MyHttp.DefaultRequestHeaders.Authorization);
		}
		//public async static void FirstLoad()
		//{
		//	Sauce secrets = new Sauce();	
		//	try
		//	{
		//		MyHttp.DefaultRequestHeaders.Remove("Authorization");
		//	}
		//	catch
		//	{
		//		Console.WriteLine("xFPt: couldn't remove auth");
		//	}


		//	// MyHttp.DefaultRequestHeaders.Add("grant_type", "client_credentials");
		//	// MyHttp.DefaultRequestHeaders.Add("client_id", secrets.PFPublicKey);
		//	// MyHttp.DefaultRequestHeaders.Add("client_secret", secrets.PFSecretKey);

		//	MyHttp.DefaultRequestHeaders.Add("Access-Control-Allow-Origin", "*");
		//	MyHttp.DefaultRequestHeaders.Add("Content-Type", "application/x-www-form-urlencoded");


		//	var sendFor = new Dictionary<string, string>{
		//		{ "grant_type", "client_credentials" },
		//		{ "client_id", $"{secrets.PFPublicKey}" },
		//		{ "client_secret", $"{secrets.PFSecretKey}" },
		//	};

		//	// var json = JsonConvert.SerializeObject(sendFor, Formatting.Indented);
		//	// var stringContent = new StringContent(json);

		//	// PFSendFor content = new PFSendFor("client_credentials", secrets.PFPublicKey, secrets.PFSecretKey);

		//	// JsonSerializer.SerializeObject<PFSendFor>(content);
		//	// new StringContent(secrets.json, Encoding.UTF8, "application/json")

		//	var connection = await MyHttp.PostAsync("oauth2/token", stringContent);
		//	PFToken newToken = await connection.Content.ReadAsAsync<PFToken>();


		//	MyHttp.DefaultRequestHeaders.Add("Authorization", "Bearer " + newToken.access_token);
		//	Console.WriteLine("xStartup token#: " + MyHttp.DefaultRequestHeaders.Authorization);
		//}
		public async static void FirstLoad()
		{
			Sauce secrets = new Sauce();

			string url = $"https://api.petfinder.com/v2/oauth/token";
			var client = new RestClient(url)
			{
				Authenticator = new HttpBasicAuthenticator(secrets.PFPublicKey, secrets.PFSecretKey),
			};
			var request = new RestRequest();

			request.AddHeader("Access-Control-Allow-Origin", "*");
			request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
			request.AddHeader("Accept", "*/*");
			request.AddHeader("Accept-Encoding", "gzip, deflate, br");
			request.AddHeader("Connection", "keep-alive");
			request.AddHeader("Access-Control-Allow-Credentials", "true");

			// cant have it as headers
			request.AddParameter("grant_type", "client_credentials");
			// request.AddParameter("client_id", $"{secrets.PFPublicKey}");
			// request.AddParameter("client_secret", $"{secrets.PFSecretKey}");

			// cant have it as string
			string postData = $"grant_type=client_credentials&client_id={secrets.PFPublicKey}&client_secret={secrets.PFSecretKey}";
			
			// this dont work 
			var sendFor = new Dictionary<string, string>{
					{ "grant_type", "client_credentials" },
					{ "client_id", $"{secrets.PFPublicKey}" },
					{ "client_secret", $"{secrets.PFSecretKey}" },
			};


			var content = new FormUrlEncodedContent(
				new KeyValuePair<string, string>[] {
					new KeyValuePair<string, string>("grant_type", "client_credentials"),
					new KeyValuePair<string, string>("client_id", $"{secrets.PFPublicKey}"),
					new KeyValuePair<string, string>("client_secret", $"{secrets.PFSecretKey}")
			   }
			);

			// this is what i found on the restsharp site but it also dont work
			var body = new
			{
				grant_type = "client_credentials",
				client_id = secrets.PFPublicKey,
				client_secret = secrets.PFSecretKey
			};

			string encodedBody = string.Format("grant_type=client_credentials&client_id={0}&client_secret={1}", secrets.PFPublicKey, secrets.PFSecretKey);
			// request.AddParameter("application/x-www-form-urlencoded", encodedBody, ParameterType.RequestBody);



			// request.AddBody(body);
			// request.AddBody(new StringContent(string.Format($"grant_type=client_credentials&client_id={secrets.PFPublicKey}&client_secret={secrets.PFSecretKey}", Encoding.UTF8, "application/x-www-form-urlencoded")));
			var response = client.PostAsync<PFToken>(request);

			PFToken token = response.Result; 

			MyHttp.DefaultRequestHeaders.Add("Authorization", "Bearer " + token.access_token);
			Console.WriteLine("xStartup token#: " + MyHttp.DefaultRequestHeaders.Authorization);
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
