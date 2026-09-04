import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // สร้าง Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: "CPU" },
      update: {},
      create: { name: "CPU" },
    }),
    prisma.category.upsert({
      where: { name: "GPU" },
      update: {},
      create: { name: "GPU" },
    }),
    prisma.category.upsert({
      where: { name: "RAM" },
      update: {},
      create: { name: "RAM" },
    }),
    prisma.category.upsert({
      where: { name: "Storage" },
      update: {},
      create: { name: "Storage" },
    }),
    prisma.category.upsert({
      where: { name: "Peripherals" },
      update: {},
      create: { name: "Peripherals" },
    }),
  ]);

  const [cpu, gpu, ram, storage, peripherals] = categories;

  // สร้าง Products
  await prisma.product.createMany({
    skipDuplicates: true,
    data: [
      {
        name: "Intel Core i7-13700K",
        description: "ซีพียู 16-core สำหรับ gaming และ content creation",
        price: 12900,
        stock: 20,
        categoryId: cpu.id,
        imageUrl: "https://placehold.co/400x400?text=i7-13700K",
      },
      {
        name: "AMD Ryzen 5 7600X",
        description: "ซีพียู 6-core ประสิทธิภาพสูง ราคาคุ้มค่า",
        price: 8900,
        stock: 15,
        categoryId: cpu.id,
        imageUrl: "https://placehold.co/400x400?text=Ryzen+5",
      },
      {
        name: "NVIDIA RTX 4070",
        description: "การ์ดจอระดับ high-end เล่นเกม 1440p ได้สบาย",
        price: 19900,
        stock: 10,
        categoryId: gpu.id,
        imageUrl: "https://placehold.co/400x400?text=RTX+4070",
      },
      {
        name: "AMD RX 7600",
        description: "การ์ดจอ mid-range ประสิทธิภาพดีในราคาที่จับต้องได้",
        price: 8500,
        stock: 12,
        categoryId: gpu.id,
        imageUrl: "https://placehold.co/400x400?text=RX+7600",
      },
      {
        name: "Corsair Vengeance 32GB DDR5",
        description: "แรม DDR5 3200MHz ชุด 2x16GB",
        price: 4500,
        stock: 30,
        categoryId: ram.id,
        imageUrl: "https://placehold.co/400x400?text=DDR5+32GB",
      },
      {
        name: "G.Skill Trident 16GB DDR4",
        description: "แรม DDR4 3600MHz ชุด 2x8GB",
        price: 1900,
        stock: 25,
        categoryId: ram.id,
        imageUrl: "https://placehold.co/400x400?text=DDR4+16GB",
      },
      {
        name: "Samsung 990 Pro 1TB NVMe",
        description: "SSD NVMe Gen4 ความเร็วอ่าน 7,450 MB/s",
        price: 3200,
        stock: 20,
        categoryId: storage.id,
        imageUrl: "https://placehold.co/400x400?text=990+Pro",
      },
      {
        name: "Seagate Barracuda 2TB HDD",
        description: "HDD 7200 RPM สำหรับเก็บข้อมูลในราคาประหยัด",
        price: 1800,
        stock: 18,
        categoryId: storage.id,
        imageUrl: "https://placehold.co/400x400?text=HDD+2TB",
      },
      {
        name: "Logitech G Pro X Keyboard",
        description: "คีย์บอร์ด mechanical สำหรับ gaming มืออาชีพ",
        price: 4200,
        stock: 15,
        categoryId: peripherals.id,
        imageUrl: "https://placehold.co/400x400?text=G+Pro+X",
      },
      {
        name: "Razer DeathAdder V3",
        description: "เมาส์ ergonomic น้ำหนักเบา 59g",
        price: 2800,
        stock: 22,
        categoryId: peripherals.id,
        imageUrl: "https://placehold.co/400x400?text=DeathAdder",
      },
    ],
  });

  console.log("✅ Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
