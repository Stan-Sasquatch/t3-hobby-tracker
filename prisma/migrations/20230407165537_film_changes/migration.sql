-- CreateEnum
CREATE TYPE "VisualMediaType" AS ENUM ('FILM', 'TV');

-- CreateTable
CREATE TABLE "FilmRating" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "filmId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FilmRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Film" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(255) NOT NULL,
    "visualMediaType" "VisualMediaType" NOT NULL,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FilmRating_filmId_userId_key" ON "FilmRating"("filmId", "userId");

-- AddForeignKey
ALTER TABLE "FilmRating" ADD CONSTRAINT "FilmRating_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilmRating" ADD CONSTRAINT "FilmRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
