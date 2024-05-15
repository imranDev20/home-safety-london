export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin" | "staff";
  password: string;
  addresses: {
    city: string;
    postcode: string;
    house_street: string;
  };
  orders: mongoose.Types.ObjectId[];
  preferences: {
    mode: "light" | "dark";
  };
  createdAt: string;
};
