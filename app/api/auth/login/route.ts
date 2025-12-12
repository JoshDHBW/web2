import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { account } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { login, password } = await req.json();

    if (!login || !password)
      return NextResponse.json({ error: "Login und Passwort erforderlich" }, { status: 400 });

    // Benutzer suchen
    const [user] = await db.select().from(account).where(eq(account.login, login));

    if (!user) return NextResponse.json({ error: "Benutzer nicht gefunden" }, { status: 404 });

    const valid = await bcrypt.compare(password, user.password);
    console.log("Eingegebenes Passwort:", password);
    console.log("Gespeichertes Hash:", user.password);

    if (!valid) return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });

    // JWT erzeugen
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    return NextResponse.json({ message: "Login erfolgreich", token });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
