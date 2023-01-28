/*
  Warnings:

  - You are about to drop the column `friend_id` on the `FriendRequest` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `FriendRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fromUserId,toUserId]` on the table `FriendRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fromUserId` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toUserId` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FriendRequest" DROP CONSTRAINT "FriendRequest_friend_id_fkey";

-- DropForeignKey
ALTER TABLE "FriendRequest" DROP CONSTRAINT "FriendRequest_user_id_fkey";

-- DropIndex
DROP INDEX "FriendRequest_user_id_friend_id_key";

-- AlterTable
ALTER TABLE "FriendRequest" DROP COLUMN "friend_id",
DROP COLUMN "user_id",
ADD COLUMN     "fromUserId" TEXT NOT NULL,
ADD COLUMN     "toUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_fromUserId_toUserId_key" ON "FriendRequest"("fromUserId", "toUserId");

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
