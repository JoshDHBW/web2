import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { account } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { login, password, email } = await req.json();

    if (!login || !password)
      return NextResponse.json({ error: "Login und Passwort sind erforderlich" }, { status: 400 });

    const existing = await db.select().from(account).where(eq(account.login, login));
    if (existing.length > 0)
      return NextResponse.json({ error: "Benutzername existiert bereits" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert durchführen
    await db.insert(account).values({
      login,
      password: hashedPassword,
      email: email || null,
    });

    // Neue Zeile direkt abfragen
    const [user] = await db.select().from(account).where(eq(account.login, login));

    return NextResponse.json({ message: "Registrierung erfolgreich", userId: user.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
