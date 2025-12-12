import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { login, password, email } = await req.json();

    // Prüfen, ob der Benutzer schon existiert
    const existing = await prisma.account.findUnique({ where: { login } });
    if (existing) {
      return NextResponse.json({ error: "Benutzer existiert bereits" }, { status: 400 });
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Benutzer erstellen
    const user = await prisma.account.create({
      data: {
        login,
        password: hashedPassword,
        email,
      },
    });

    return NextResponse.json({ message: "Registrierung erfolgreich", userId: user.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}
