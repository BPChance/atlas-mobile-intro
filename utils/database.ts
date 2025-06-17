import { openDatabaseAsync, type SQLiteDatabase } from "expo-sqlite";

let db: SQLiteDatabase | null = null;

export async function setupDatabase() {
  if (!db) {
    db = await openDatabaseAsync("activities.db");
  }

  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS activities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      steps INTEGER,
      date INTEGER
    );`
  );
}

export async function addActivity(steps: number, date: number) {
  if (!db) db = await openDatabaseAsync("activities.db");

  await db.runAsync(`INSERT INTO activities (steps, date) VALUES (?, ?);`, [
    steps,
    date,
  ]);
}

export async function fetchActivities(): Promise<any[]> {
  if (!db) db = await openDatabaseAsync("activities.db");

  const result = await db.getAllAsync(
    `SELECT * FROM activities ORDER BY date DESC;`
  );

  return result;
}
