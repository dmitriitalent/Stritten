import { EventAdditional } from "./EventAdditional";
import { EventGeneral } from "./EventGeneral";
import { User } from "./User";

export class Event {
    Id: null | number;
    General: null | EventGeneral;
    Additionals: null | EventAdditional[];
    Organizer: null | User;
    OrganizerId: null | number;
    Visiters: null | User[];

    constructor() {
        this.General = new EventGeneral();
        this.Additionals = new Array<EventAdditional>();
        this.Organizer = new User();
        this.Visiters = new Array<User>();
    }
}


