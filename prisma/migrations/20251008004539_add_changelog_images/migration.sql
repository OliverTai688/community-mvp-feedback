-- AlterTable
ALTER TABLE "Changelog" ADD COLUMN     "coverUrl" TEXT,
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
