using Microsoft.AspNetCore.Mvc;
using System.IO.Pipelines;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Project1.Models
{
	[Route("pf")]
	[ApiController]
	public class ValuesController : ControllerBase
	{
		[HttpGet("newToken/list/{page}/{access_token}")]
		public PFResults Get(string page, string access_token)
		{
			PFResults list = PetFinderAPI.GetPetsAddToken(page, access_token).Result;
			return list;
		}

		[HttpGet("newToken/byId/{id}/{access_token}")]
		public PFPet GetSpecific(string id, string access_token)
		{
			PFPet list = PetFinderAPI.GetSpecificPetAddToken(id, access_token).Result;
			return list;
		}

		[HttpGet("list/{page}")]
		public PFResults Get(string page)
		{
			PFResults list = PetFinderAPI.GetPets(page).Result;
			return list;
		}

		[HttpGet("byId/{id}")]
		public PFPet GetSpecific(string id)
		{
			PFPet list = PetFinderAPI.GetSpecificPet(id).Result;
			return list;
		}

	}
}
