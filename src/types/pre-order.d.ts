export type PreOrderType = {
  property_type: string;
  property_sub_type: string;
  bedrooms: string;
  order_items: {
    title: string;
    name: string;
    price: number;
    quantity: number | string;
    unit: string;
  }[];
};
