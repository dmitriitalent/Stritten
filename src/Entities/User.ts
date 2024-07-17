import { Profile } from "./Profile";

export type Role = "User" | "Admin" | "Moderator" | null;
export class User {
    Id: null | number;
    Login: null | string;
    Password: null | string;
    Role: null | Role;

    Profile: null | Profile;
    OrganizedEvents: null | Event[];
    VisitedEvents: null | Event[];

    constructor() {
        this.Profile = new Profile();
        this.OrganizedEvents = new Array<Event>();
        this.VisitedEvents = new Array<Event>();
    }
}
