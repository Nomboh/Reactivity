import { Profile } from "./profile";

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: Date | null;
  category: string;
  city: string;
  venue: string;
  hostUsername?: string;
  isCancelled: boolean;
  isGoing: boolean;
  isHost: boolean;
  host?: Profile;
  attendees: Profile[];
}

export class Activity implements Activity {
  /**
   *
   */
  constructor(init?: ActivityFormValue) {
    Object.assign(this, init);
  }
}

export class ActivityFormValue {
  id?: string = undefined;
  title: string = "";
  category: string = "";
  description: string = "";
  date: Date | null = null;
  city: string = "";
  venue: string = "";

  constructor(activity?: ActivityFormValue) {
    if (activity) {
      this.id = activity.id;
      this.title = activity.title;
      this.category = activity.category;
      this.description = activity.description;
      this.date = activity.date;
      this.venue = activity.venue;
      this.city = activity.city;
    }
  }
}
