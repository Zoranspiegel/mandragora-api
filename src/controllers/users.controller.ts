import type { AsyncController } from "../../types";

export const getAllUsers: AsyncController = async (_req, res, next) => {
  try {
    const allUsers: string[] = [];
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

export const createUser: AsyncController = async (req, res, next) => {
  try {
    const body = req.body;

    res.status(201).json({ message: "User successfully created", data: body });
  } catch (error) {
    next(error);
  }
};
