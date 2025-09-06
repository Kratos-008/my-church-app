-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PrayerRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "request" TEXT NOT NULL,
    "anonymous" BOOLEAN NOT NULL DEFAULT false,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "answered" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_PrayerRequest" ("anonymous", "answered", "createdAt", "id", "name", "request") SELECT "anonymous", "answered", "createdAt", "id", "name", "request" FROM "PrayerRequest";
DROP TABLE "PrayerRequest";
ALTER TABLE "new_PrayerRequest" RENAME TO "PrayerRequest";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
