
export interface PFSingle {
    animal: Animal;
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
    coat:                   string | null;
    attributes:             Attributes;
    environment:            Environment;
    tags:                   string[];
    name:                   string;
    description:            string;
    organization_animal_id: string;
    photos:                 PrimaryPhotoCropped[];
    primary_photo_cropped:  PrimaryPhotoCropped;
    videos:                 any[];
    status:                 string;
    status_changed_at:      string;
    published_at:           string;
    distance:               null;
    contact:                Contact;
    _links:                 Links;
}

export interface PrimaryPhotoCropped {
    small:  string;
    medium: string;
    large:  string;
    full:   string;
}

export interface Links {
    self:         Organization;
    type:         Organization;
    organization: Organization;
}

export interface Organization {
    href: string;
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
    secondary: null;
    mixed:     boolean;
    unknown:   boolean;
}

export interface Colors {
    primary:   string;
    secondary: string;
    tertiary:  null;
}

export interface Contact {
    email:   string;
    phone:   string;
    address: Address;
}

export interface Address {
    address1: string;
    address2: null;
    city:     string;
    state:    string;
    postcode: string;
    country:  string;
}

export interface Environment {
    children: null;
    dogs:     null;
    cats:     null;
}
