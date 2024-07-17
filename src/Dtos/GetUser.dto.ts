export interface GetUserDTO {
    Id: number;
    Login: string;
    Role: string;
    Profile: GetUserDTOProfile;
}

export interface GetUserDTOProfile {
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    UserId: number;
}