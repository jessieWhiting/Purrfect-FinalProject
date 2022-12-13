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
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;


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

		public static void OnLoad(string access_token)
		{
			MyHttp.DefaultRequestHeaders.Remove("Authorization");
			MyHttp.DefaultRequestHeaders.Add("Authorization", "Bearer " + access_token);
			Console.WriteLine("xStartup token: "+MyHttp.DefaultRequestHeaders.Authorization);
		}

		public static async Task<PFResults> GetPetsAddToken(string page, string access_token)
		{
			MyHttp.DefaultRequestHeaders.Remove("Authorization");
			MyHttp.DefaultRequestHeaders.Add("Authorization", "Bearer " + access_token);
			// Console.WriteLine("cl "+MyHttp.DefaultRequestHeaders.Authorization);
			var connection = await MyHttp.GetAsync($"animals?type=cat&limit=18&page={page}");
			PFResults breeds = await connection.Content.ReadAsAsync<PFResults>();

			return breeds;
		}
		public static async Task<PFResults> GetPetsByZipAddToken(string page, string zip, string access_token)
		{
			MyHttp.DefaultRequestHeaders.Remove("Authorization");
			MyHttp.DefaultRequestHeaders.Add("Authorization", "Bearer " + access_token);
			var connection = await MyHttp.GetAsync($"animals?type=cat&limit=18&location={zip}&page={page}");
			PFResults breeds = await connection.Content.ReadAsAsync<PFResults>();

			return breeds;
		}
		public static async Task<PFPet> GetSpecificPetAddToken(string id, string access_token)
		{
			MyHttp.DefaultRequestHeaders.Remove("Authorization");
			MyHttp.DefaultRequestHeaders.Add("Authorization", "Bearer " + access_token);
			// await Task.Delay(1500);
			var connection = await MyHttp.GetAsync($"animals/{id}");
			PFPet thisPet = await connection.Content.ReadAsAsync<PFPet>();

			return thisPet;
		}
		public static async Task<PFResults> GetPets(string page)
		{
			var connection = await MyHttp.GetAsync($"animals?type=cat&limit=18&page={page}");
			PFResults breeds = await connection.Content.ReadAsAsync<PFResults>();

			return breeds;
		}
		public static async Task<PFResults> GetPetsByZip(string page, string zip)
		{
			var connection = await MyHttp.GetAsync($"animals?type=cat&limit=18&location={zip}&page={page}");
			PFResults breeds = await connection.Content.ReadAsAsync<PFResults>();

			return breeds;
		}
		public static async Task<PFPet> GetSpecificPet(string id)
		{
			Console.WriteLine("cl " + MyHttp.DefaultRequestHeaders.Authorization);
			
			PFPet thisPet = new PFPet();
			PFPet deletedID = new PFPet();
			Animal delAnimal = new Animal();
			delAnimal.id = int.Parse(id);
			delAnimal.age = "deleted";
			// try and access our cat db to provide a name
			delAnimal.name = "Adopted :) :(";
			delAnimal.attributes= new Attributes();
			
			deletedID.animal = delAnimal;
			try
			{
				var connection = await MyHttp.GetAsync($"animals/{id}");
				thisPet = await connection.Content.ReadAsAsync<PFPet>();
			}
			catch
			{
				try
				{
					var connection = await MyHttp.GetAsync($"animals/{id}");
					thisPet = await connection.Content.ReadAsAsync<PFPet>();
				}
				catch
				{
					thisPet = deletedID;
				}
			}
			return thisPet;
		}

	}
}
