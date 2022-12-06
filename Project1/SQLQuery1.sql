--create table Cat
--(
--PetId int primary key,
--ShelterId int);
--8 numbers for petfinder ID

--create table Users
--(
--UserId int primary key identity (1,1),
--[Email] nvarchar(50),
--FirstName nvarchar(50),
--LastName nvarchar(50),
--Password nvarchar (50),
--Admin bit,
--PhoneNumber nvarchar(10),
--ZipCode nvarchar (5));


--create table Favorites
--(
--FavoriteId int primary key identity (1,1),
--UserId int foreign key references Users(UserId),
--CatId int foreign key references Cat(PetId));