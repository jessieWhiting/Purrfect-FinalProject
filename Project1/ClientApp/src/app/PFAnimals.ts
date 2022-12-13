export interface PFAPI {
    animals:    Animal[];
    pagination: Pagination;
}

export interface Animal {
    id:                     number;
    organization_id:        string;
    url:                    string;
    type:                   string;
    species:                string;
    breeds:                 Breeds;
    colors:                 Colors;
    age:                    string;
    gender:                 string;
    size:                   string;
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
    status:                 string;
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
    primary:   string;
    secondary: string | null;
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
    secondary: null | string;
    tertiary:  null | string;
}

export interface Contact {
    email:   null | string;
    phone:   null | string;
    address: Address;
}

export interface Address {
    address1: null | string;
    address2: null | string;
    city:     string;
    state:    string;
    postcode: string;
    country:  string;
}



export interface Environment {
    children: boolean | null;
    dogs:     boolean | null;
    cats:     boolean | null;
}


export interface PrimaryPhotoCropped {
    small:  string;
    medium: string;
    large:  string;
    full:   string;
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


