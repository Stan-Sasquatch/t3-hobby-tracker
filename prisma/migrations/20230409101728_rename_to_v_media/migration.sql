/*
  Warnings:

  - You are about to drop the `Film` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FilmRating` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FilmRating" DROP CONSTRAINT "FilmRating_filmId_fkey";

-- DropForeignKey
ALTER TABLE "FilmRating" DROP CONSTRAINT "FilmRating_userId_fkey";

-- DropTable
DROP TABLE "Film";

-- DropTable
DROP TABLE "FilmRating";

-- CreateTable
CREATE TABLE "VMediaRating" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "vMediaId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "VMediaRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VMedia" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(255) NOT NULL,
    "visualMediaType" "VisualMediaType" NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VMediaRating_vMediaId_userId_key" ON "VMediaRating"("vMediaId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "VMedia_title_releaseDate_key" ON "VMedia"("title", "releaseDate");

-- AddForeignKey
ALTER TABLE "VMediaRating" ADD CONSTRAINT "VMediaRating_vMediaId_fkey" FOREIGN KEY ("vMediaId") REFERENCES "VMedia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VMediaRating" ADD CONSTRAINT "VMediaRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
