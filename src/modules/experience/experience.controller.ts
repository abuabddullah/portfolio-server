import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "./../../utils/sendResponse";
import { ExperienceService } from "./experience.service";

const createExperience = catchAsync(async (req: Request, res: Response) => {
  if (req.body.tasks && typeof req.body.tasks === "string") {
    req.body.tasks = req.body.tasks
      .split(",")
      .map((task: string) => task.trim())
      .filter((task: string) => task.length > 0);
  }
  const result = await ExperienceService.createExperience(req.body);
  sendResponse(res, {
    success: true,
    message: "Experience created successfully",
    data: result,
  });
});

const getAllExperiences = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceService.getAllExperiences();
  sendResponse(res, {
    success: true,
    message: "Experiences retrieved successfully",
    data: result,
  });
});

const getSingleExperience = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ExperienceService.getSingleExperience(id);
  sendResponse(res, {
    success: true,
    message: "Experience retrieved successfully",
    data: result,
  });
});

const updateExperience = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (req.body.tasks && typeof req.body.tasks === "string") {
    req.body.tasks = req.body.tasks
      .split(",")
      .map((task: string) => task.trim())
      .filter((task: string) => task.length > 0);
  }
  const result = await ExperienceService.updateExperience(id, req.body);
  sendResponse(res, {
    success: true,
    message: "Experience updated successfully",
    data: result,
  });
});

const deleteExperience = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ExperienceService.deleteExperience(id);
  sendResponse(res, {
    success: true,
    message: "Experience deleted successfully",
    data: result,
  });
});

export const ExperienceController = {
  createExperience,
  getAllExperiences,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};
