import type { AsyncController } from "../../types";
import prisma from "../db";
import bcrypt from "bcrypt";

export const getAllUsers: AsyncController = async (_req, res, next) => {
  try {
    const allUsers = await prisma.user.findMany({
      omit: {
        password: true,
      },
    });

    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

export const createUser: AsyncController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
      omit: {
        password: true,
      },
    });

    res
      .status(201)
      .json({ message: "User successfully created", data: newUser });
  } catch (error) {
    next(error);
  }
};
