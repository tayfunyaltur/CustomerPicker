"use server";

import { customers } from "@/app/generated/prisma/client";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function getTopUncalledUsers() { // İsim çoğul yapıldı
  // 1. Adım: 'called' değeri false olanların ortalamasını hesapla
  const avgResult = await prisma.$queryRaw<any[]>`
    SELECT AVG(CAST(amount AS DOUBLE PRECISION)) as average 
    FROM "customers" 
    WHERE called = false
  `;

  const average = Number(avgResult[0].average) || 0;
  const threshold = average * 1.1;

  // 2. Adım: 'called' false olan ve eşik değerinden büyük en yüksek 50 kullanıcıyı getir
  const topUsers = await prisma.$queryRaw<any[]>`
    SELECT * FROM "customers"
    WHERE called = false 
      AND CAST(amount AS DOUBLE PRECISION) >= ${threshold}
    ORDER BY CAST(amount AS DOUBLE PRECISION) ASC
    LIMIT 10
  `;

  return {
    highestUsers: topUsers as customers[], // Tek obje yerine dizi dönüyoruz
    average,
    threshold,
    count: topUsers.length // Kaç kişi bulunduğunu görmek için eklenebilir
  };
}

export async function markAsCalledWithNote(userId: number, note: string) {
  try {
    await prisma.customers.update({
      where: { id: userId },
      data: {
        called: true,
        note: note, 
      },
    });
    revalidatePath("/customers");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Kaydedilemedi" };
  }
}