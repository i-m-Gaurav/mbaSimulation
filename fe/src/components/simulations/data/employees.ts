export interface Employee {
  id: string;
  name: string;
  image: string;
  hourlyRate: number;
  defectRate: number;
  skillRatings: {
    preparation: number; // out of 5
    assembly: number; // out of 5
    completion: number; // out of 5
    inspection: number; // out of 5
  };
}

export const employees: Employee[] = [
  {
    id: "1",
    name: "Ashley",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 17,
    defectRate: 9,
    skillRatings: { preparation: 2, assembly: 1, completion: 5, inspection: 2 },
  },
  {
    id: "2",
    name: "Vu",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 15,
    defectRate: 10,
    skillRatings: { preparation: 2, assembly: 5, completion: 1, inspection: 2 },
  },
  {
    id: "3",
    name: "Lucy",
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 48,
    defectRate: 2,
    skillRatings: { preparation: 2, assembly: 4, completion: 5, inspection: 2 },
  },
  {
    id: "4",
    name: "Mark",
    image:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 50,
    defectRate: 1,
    skillRatings: { preparation: 2, assembly: 5, completion: 4, inspection: 2 },
  },
  {
    id: "5",
    name: "Ali",
    image:
      "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 24,
    defectRate: 3.5,
    skillRatings: { preparation: 5, assembly: 2, completion: 1, inspection: 1 },
  },
  {
    id: "6",
    name: "Navid",
    image:
      "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    hourlyRate: 20,
    defectRate: 5,
    skillRatings: { preparation: 4, assembly: 1, completion: 4, inspection: 4 },
  },
];
