export type EventDataModel = {
  id?: string;
  imageUrl: string;
  image: string;
  title: string;
  description: string;
  host_id: string;
  event_date: Date;
  start_time: string;
  end_time: string;
  status: string;
  venue: string;
  host_name: string;
  event_fee: number;
  is_confirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
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
  description: string;
  imgUrl: string;
  name: string;
  bldg_no: string;
  street: string;
  city: string;
  maxCapacity: number;
  updatedAt: Date;
  createdAt: Date;
};

export type MessageModel = {
  id: string;
  message: string;
  createdAt: Date;
  uid: string;
  status: string;
};
