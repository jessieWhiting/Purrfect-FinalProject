using System;
using System.Collections.Generic;

namespace Project1.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? Email { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public bool? Admin { get; set; }

    public string? PhoneNumber { get; set; }

    public string? ZipCode { get; set; }

    public string? GoogleId { get; set; }

    public virtual ICollection<Favorite> Favorites { get; } = new List<Favorite>();
}
