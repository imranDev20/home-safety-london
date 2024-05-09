export type PreOrderServicesPayload = {
  property_type: string;
  resident_type?: string;
  bedrooms?: string;
  order_items: {
    title: string;
    name: string;
    price: number;
    quantity: number | string;
    unit: string;
  }[];
};

export type PreOrderPersonalPayload = {
  customer_name: string;
  email: string;
  phone_no: string;
  address: {
    house_street: string;
    postcode: string;
    city: string;
  };
  parking_options: {
    parking_type: string;
    parking_cost: number;
  };
  congestion_zone: {
    zone_type: string;
    zone_cost: number;
  };
  is_personal_details_complete: boolean;
};
