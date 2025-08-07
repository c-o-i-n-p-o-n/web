import { EventsDataSource } from "../data/events.data-source";
import Event from "../models/Event";
import EventCreation from "../models/EventCreation";

export class EventService {
    
    private eventsDataSource: EventsDataSource = new EventsDataSource();

    public async getEventById(id?: number): Promise<Event | undefined> {
        console.log(id)
        if(!!id){
            return await this.eventsDataSource.getEventById(id);
        }
        return undefined;
    }

    public async getEvents(query?:String): Promise<Event[]> {
        return this.eventsDataSource.getEventByQuery(query);
    }

    public async createEvent(event: EventCreation): Promise<Event> {
        return this.eventsDataSource.createEvent(event);
    };
}