import env from "../../env";
import type { AsyncController } from "../../types";
import prisma from "../db";

export const getAllPlants: AsyncController = async (_req, res, next) => {
  try {
    // HARDCODED AUTH SESSION USER ID
    const HCUser = await prisma.user.findFirst({
      where: {
        name: env.HARDCODED_USER_NAME,
      },
    });

    const user_id = HCUser?.id;
    //////////////////////////////////

    const allPlants = await prisma.plant.findMany({
      where: {
        user_id,
      },
    });

    res.status(200).json(allPlants);
  } catch (error) {
    next(error);
  }
};

export const createPlant: AsyncController = async (req, res, next) => {
  try {
    // HARDCODED AUTH SESSION USER ID
    const HCUser = await prisma.user.findFirst({
      where: {
        name: env.HARDCODED_USER_NAME,
      },
    });

    const user_id = HCUser?.id;

    if (!user_id) throw new Error("Unauthenticated");
    //////////////////////////////////
    const { name, scientific, img, watering, fertilization } = req.body;

    const newPlant = await prisma.plant.create({
      data: {
        user_id,
        name,
        scientific,
        watering,
        fertilization,
        img,
      },
    });

    res
      .status(201)
      .json({ message: "Plant successfully created", data: newPlant });
  } catch (error) {
    next(error);
  }
};
