import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { db } from "./index";
import { users } from "./schema";

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@whizzolabs.com";
  const password = process.env.ADMIN_PASSWORD || "changeme123";
  const hash = await bcrypt.hash(password, 12);

  await db.insert(users).values({
    id: randomUUID(),
    email,
    name: "Admin",
    passwordHash: hash,
    role: "admin",
  });

  console.log(`Admin user created: ${email}`);
  process.exit(0);
}

createAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
