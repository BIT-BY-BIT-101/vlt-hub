export type EventDataModel = {
  id?: string;
  imgUrl: string;
  title: string;
  description: string;
  host_id: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  status: string;
  venue: string;
  host_name: string;
};

export type UserDataModel = {
  id?: string;
  user_imgUrl: string;
  user_fname: string;
  user_lname: string;
  user_email: string;
};

export type UserEventDataModel = {
  id?: string;
};

export type VenueDataModel = {
  id?: string;
  venue_imgUrl: string;
  venue_name: string;
  venue_bldg_no: string;
  venue_street: string;
  venue_city: string;
  venue_capacity: number;
  venue_isAvailable: boolean;
};
