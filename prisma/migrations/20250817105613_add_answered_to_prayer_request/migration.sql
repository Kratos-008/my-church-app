/*
  Warnings:

  - The primary key for the `PrayerRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `PrayerRequest` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `PrayerRequest` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PrayerRequest` table. All the data in the column will be lost.
  - Added the required column `request` to the `PrayerRequest` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PrayerRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "request" TEXT NOT NULL,
    "anonymous" BOOLEAN NOT NULL DEFAULT false,
    "answered" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_PrayerRequest" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "PrayerRequest";
DROP TABLE "PrayerRequest";
ALTER TABLE "new_PrayerRequest" RENAME TO "PrayerRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
