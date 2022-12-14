using System;
using System.Collections.Generic;

namespace Project1.Models;

public partial class Cat
{
    public int PetId { get; set; }

    public int? ShelterId { get; set; }

    public int? Points { get; set; }

    public virtual ICollection<Favorite> Favorites { get; } = new List<Favorite>();
}
