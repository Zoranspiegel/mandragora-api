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
      omit: {
        user_id: true,
      },
    });

    res.status(200).json(allPlants);
  } catch (error) {
    next(error);
  }
};

export const getPlantById: AsyncController = async (req, res, next) => {
  try {
    // HARDCODED AUTH SESSION USER ID
    const HCUser = await prisma.user.findFirst({
      where: {
        name: env.HARDCODED_USER_NAME,
      },
    });

    const user_id = HCUser?.id;
    //////////////////////////////////
    const { id } = req.params;

    const plant = await prisma.plant.findFirst({
      where: {
        id,
        user_id,
      },
      omit: {
        user_id: true,
      },
    });

    if (!plant) {
      res.status(404).json({ error: "Plant not found" });
      return;
    }

    res.status(201).json(plant);
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
      omit: {
        user_id: true,
      },
    });

    res
      .status(201)
      .json({ message: "Plant successfully created", data: newPlant });
  } catch (error) {
    next(error);
  }
};

export const waterPlant: AsyncController = async (req, res, next) => {
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
    const { id } = req.params;

    const plant = await prisma.plant.findFirst({
      where: {
        id,
        user_id,
      },
    });

    if (!plant) {
      res.status(404).json({ error: "Plant not found" });
      return;
    }

    const newWaterings = [...plant.waterings, new Date()];
    const next_watering = new Date(
      plant.watering * 1000 * 60 * 60 * 24 + new Date().getTime()
    );

    const updatedPlant = await prisma.plant.update({
      where: {
        id,
        user_id,
      },
      omit: {
        user_id: true,
      },
      data: {
        waterings: newWaterings,
        next_watering,
      },
    });

    res
      .status(200)
      .json({ message: "Plant successfully watered", data: updatedPlant });
  } catch (error) {
    next(error);
  }
};

export const fertilizePlant: AsyncController = async (req, res, next) => {
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
    const { id } = req.params;

    const plant = await prisma.plant.findFirst({
      where: {
        id,
        user_id,
      },
    });

    if (!plant) {
      res.status(404).json({ error: "Plant not found" });
      return;
    }

    const newFertilizations = [...plant.fertilizations, new Date()];
    const next_fertilization = new Date(
      plant.fertilization * 1000 * 60 * 60 * 24 + new Date().getTime()
    );

    const updatedPlant = await prisma.plant.update({
      where: {
        id,
        user_id,
      },
      omit: {
        user_id: true,
      },
      data: {
        fertilizations: newFertilizations,
        next_fertilization,
      },
    });

    res
      .status(200)
      .json({ message: "Plant successfully fertilized", data: updatedPlant });
  } catch (error) {
    next(error);
  }
};

export const deletePlant: AsyncController = async (req, res, next) => {
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
    const { id } = req.body;

    const deletedPlant = await prisma.plant.delete({
      where: {
        id,
        user_id,
      },
      omit: {
        user_id: true,
      },
    });

    if (!deletePlant) {
      res.status(404).json({ error: "Plant not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Plant successfully deleted", data: deletedPlant });
  } catch (error) {
    next(error);
  }
};
