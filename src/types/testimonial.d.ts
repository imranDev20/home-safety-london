import { Pagination } from "./misc";

export type Testimonial = {
  name: string;
  rating: number;
  content: string;
  subject: string;
};

type GetTestimonialsResponse = {
  data: Testimonial[];
  success: boolean;
  message: string;
  pagination: Pagination;
};
