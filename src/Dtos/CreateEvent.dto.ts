export interface CreateEventDTO {
    General: {
        Name: null | string,
        Description: null | string,
        Private: null | boolean,
        HideDate: null | boolean,
        HidePlace: null | boolean,
        Fundraising: null | boolean,
        Date: null | Date,
        Place: null | string
    };
    Additionals: Array<{ Key: string; Value: string; }>;
    OrganizerId: null | number;
}  