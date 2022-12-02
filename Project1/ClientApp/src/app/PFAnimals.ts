export interface PFAPI {
    animals:    Animal[];
    pagination: Pagination;
}

export interface Animal {
    id:                     number;
    organization_id:        string;
    url:                    string;
    type:                   Species;
    species:                Species;
    breeds:                 Breeds;
    colors:                 Colors;
    age:                    Age;
    gender:                 Gender;
    size:                   Size;
    coat:                   null | string;
    attributes:             Attributes;
    environment:            Environment;
    tags:                   string[];
    name:                   string;
    description:            null | string;
    organization_animal_id: null | string;
    photos:                 PrimaryPhotoCropped[];
    primary_photo_cropped:  PrimaryPhotoCropped;
    videos:                 any[];
    status:                 Status;
    status_changed_at:      string;
    published_at:           string;
    distance:               null;
    contact:                Contact;
    _links:                 AnimalLinks;
}

export interface AnimalLinks {
    self:         Next;
    type:         Next;
    organization: Next;
}

export interface Next {
    href: string;
}

export enum Age {
    Adult = "Adult",
    Baby = "Baby",
    Senior = "Senior",
    Young = "Young",
}

export interface Attributes {
    spayed_neutered: boolean;
    house_trained:   boolean;
    declawed:        boolean;
    special_needs:   boolean;
    shots_current:   boolean;
}

export interface Breeds {
    primary:   Ary;
    secondary: Ary | null;
    mixed:     boolean;
    unknown:   boolean;
}

export enum Ary {
    DomesticLongHair = "Domestic Long Hair",
    DomesticMediumHair = "Domestic Medium Hair",
    DomesticShortHair = "Domestic Short Hair",
}

export interface Colors {
    primary:   null | string;
    secondary: null;
    tertiary:  null;
}

export interface Contact {
    email:   null | string;
    phone:   string;
    address: Address;
}

export interface Address {
    address1: null | string;
    address2: null;
    city:     string;
    state:    string;
    postcode: string;
    country:  Country;
}

export enum Country {
    CA = "CA",
    MX = "MX",
    Us = "US",
}

export interface Environment {
    children: boolean | null;
    dogs:     boolean | null;
    cats:     boolean | null;
}

export enum Gender {
    Female = "Female",
    Male = "Male",
}

export interface PrimaryPhotoCropped {
    small:  string;
    medium: string;
    large:  string;
    full:   string;
}

export enum Size {
    Medium = "Medium",
    Small = "Small",
}

export enum Species {
    Cat = "Cat",
}

export enum Status {
    Adoptable = "adoptable",
}

export interface Pagination {
    count_per_page: number;
    total_count:    number;
    current_page:   number;
    total_pages:    number;
    _links:         PaginationLinks;
}

export interface PaginationLinks {
    previous: Next;
    next:     Next;
}