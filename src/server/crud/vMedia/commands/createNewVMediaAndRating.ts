import type { VMedia, VMediaRating } from "@prisma/client";
import { prisma } from "@db/client";
import type { ResponseModel } from "@serverCrud/common/models";
import type { CreateNewVMediaAndRatingModel } from "@clientCrud/vMedia/models";

export const CreateNewVMediaAndRating = async (
  model: CreateNewVMediaAndRatingModel
): Promise<ResponseModel<VMediaRating & { vMedia: VMedia }>> => {
  const { userEmail, vMedia, rating, vMediaType } = model;
  const title = vMedia.title;
  const releaseDate = new Date(vMedia.release_date);
  releaseDate.setUTCHours(0, 0, 0, 0);
  if (!releaseDate || !title) {
    return {
      message:
        "Can't create a rating for a vMedia that is missing an release date or title",
    };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    return {
      message: "No user Id to assign the rating to",
    };
  }

  const existingVMedia = await prisma.vMedia.findUnique({
    where: {
      title_releaseDate: {
        title,
        releaseDate,
      },
    },
  });

  const userId = user.id;
  let vMediaId;
  let vMediaModel;

  if (existingVMedia) {
    vMediaModel = existingVMedia;
    vMediaId = existingVMedia.id;
    const existingRating = await prisma.vMediaRating.findUnique({
      where: {
        vMediaId_userId: {
          vMediaId,
          userId,
        },
      },
    });

    if (existingRating) {
      return {
        message: "User already has a rating for this vMedia",
      };
    }
    console.log("Skipping creating this vMedia as it already exists");
  } else {
    const data = {
      releaseDate,
      title,
      visualMediaType: vMediaType,
    };
    vMediaModel = await prisma.vMedia.create({
      data,
    });
    vMediaId = vMediaModel.id;
  }

  const ratingResponse = await prisma.vMediaRating.create({
    data: {
      vMediaId,
      rating,
      userId,
    },
  });
  return { data: { ...ratingResponse, vMedia: vMediaModel } };
};
