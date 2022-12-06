using System;
using System.Collections.Generic;

namespace Project1.Models;

public partial class Favorite
{
    public int FavoriteId { get; set; }

    public int? UserId { get; set; }

    public int? CatId { get; set; }

    public virtual Cat? Cat { get; set; }

    public virtual User? User { get; set; }
}
