// Define the interface
export interface IExperience {
  company: string;
  role: string;
  duration: string;
  shortDuration?: string; // optional field
  image: string;
  tasks: string[];
}
