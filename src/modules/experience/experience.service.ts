import { Experience } from "./experience.model";
import { IExperience } from "./experience.type";

const createExperience = async (payload: IExperience) => {
  const result = await Experience.create(payload);
  return result;
};

const getAllExperiences = async () => {
  const result = await Experience.find();
  return result;
};

const getSingleExperience = async (id: string) => {
  const result = await Experience.findById(id);
  return result;
};

const updateExperience = async (id: string, payload: Partial<IExperience>) => {
  const result = await Experience.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteExperience = async (id: string) => {
  const result = await Experience.findByIdAndDelete(id);
  return result;
};

export const ExperienceService = {
  createExperience,
  getAllExperiences,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};
