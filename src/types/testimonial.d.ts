import { Pagination } from "./misc";

type Testimonial = {
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
