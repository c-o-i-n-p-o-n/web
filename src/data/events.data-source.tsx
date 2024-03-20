import { Endpoints } from "../core/constants/endpoints";
import { HttpClient } from "../core/http-client-adapter";
import Event from "../models/Event";
import EventCreation from "../models/EventCreation";

export class EventsDataSource {

    private http: HttpClient = new HttpClient();

    public async getEventByQuery(query?: String): Promise<Event[]> {
        let params:any = {page:0, size:15};
        if(query){
            params = {query: query,...params};
        }
        const response = await this.http.get(Endpoints.EVENTS_FILTER, params);
        if (response.ok) {
            const eventsResponse = await response.json();
            console.log(eventsResponse["_embedded"]);
            if(!!eventsResponse["_embedded"] && !!eventsResponse["_embedded"]["events"]){
                console.log(eventsResponse["_embedded"]["events"]);
                return eventsResponse["_embedded"]["events"] as Event[];
            }else{
                return [];
            }
        } else {
            throw Error(response.statusText);
        }
    }

    
    public async getEventById(id: number): Promise<Event> {
        console.log(id)
        const response = await this.http.getById(Endpoints.EVENTS, id);
        if (response.ok) {
            const eventResponse = await response.json();
            console.log(eventResponse);
            eventResponse["beginningAt"] = eventResponse["beginningAt"]?new Date(eventResponse["beginningAt"]):null;
            eventResponse["createdAt"] = eventResponse["createdAt"]?new Date(eventResponse["createdAt"]):null;
            console.log(eventResponse);
            return eventResponse as Event;
        } else {
            throw Error(response.statusText);
        }
    }

    public async createEvent(event: EventCreation): Promise<Event> {
        const eventObj = {
            hid: event.hid,
            hid2: event.hid2,
            hid3: event.hid3,
            hid4: event.hid4,
            hid5: event.hid5,
            description: event.description,
            photo: event.photo,
            beginningAt: event.beginningAt,
            duration: event.duration,
            categories: event.categories
        };
        console.log(event);
        console.log(eventObj);
        const response = await this.http.post(Endpoints.EVENTS, eventObj);
        console.log(response);
        if (response.ok) {
            const eventResponse = await response.json();
            return eventResponse as Event;
        } else {
            throw Error(response.statusText);
        }
    }
}