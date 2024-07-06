export interface Category {
  id: number;
  name: string;
  image_url: string;
}

export interface Job {
  id: number;
  category: {
    id: number;
    name: string;
    image_url: string | null;
  };
  sub_category: {
    id: number;
    category: number;
    name: string;
    image_url: string | null;
  }[];
  location: {
    state: {
      country: {
        id: number;
        name: string;
      };
      id: number;
      name: string;
    };
    id: number;
    name: string;
  };
  company: {
    location: {
      state: {
        country: {
          id: number;
          name: string;
        };
        id: number;
        name: string;
      };
      id: number;
      name: string;
    };
    company_type: string | null;
    id: number;
    name: string;
    website: string | null;
    instagram: string | null;
    facebook: string | null;
    google_map: string | null;
  };
  name: string;
  address: string;
  min_years_experience: number | null;
  max_years_experience: number | null;
  description: string;
  image: string | null;
  image_url: string | null;
  posted: string;
  closing_date: string | null;
  source: string | null;
}

export default Job;
  