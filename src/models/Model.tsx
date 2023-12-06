export type EventDataModel = {
  id?: string;
  event_imgUrl: string;
  event_name: string;
  event_description: string;
  host_id: string;
  event_date: string;
  event_start_time: string;
  event_end_time: string;
  event_status: string;
};

export type UserDataModel = {
  id?: string;
  imgUrl: string;
  fname: string;
  lname: string;
  email: string;
  birthdate: string;
  role: string;
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
