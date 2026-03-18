import { db } from "./index";
import * as schema from "./schema";

async function main() {
  await db.delete(schema.attachments);
  await db.delete(schema.businessTrips);
  await db.delete(schema.contracts);
  await db.delete(schema.vacations);
  await db.delete(schema.orders);
  await db.delete(schema.reports);
  await db.delete(schema.employees);
  await db.delete(schema.departments);
  await db.delete(schema.jobTitles);

  const ordTypes = await db
    .insert(schema.orderType)
    .values([
      { name: "Приказ о приеме на работу" },
      { name: "Приказ о направлении в командировку" },
      { name: "Приказ о предоставлении отпуска" },
    ])
    .returning();

  const depts = await db
    .insert(schema.departments)
    .values([
      { title: "Бухгалтерия" },
      { title: "Отдел кадров" },
      { title: "IT отдел" },
      { title: "Отдел продаж" },
      { title: "Юридический отдел" },
      { title: "Отдел маркетинга" },
    ])
    .returning();

  const jobs = await db
    .insert(schema.jobTitles)
    .values([
      { title: "Главный бухгалтер" },
      { title: "Менеджер по персоналу" },
      { title: "Системный администратор" },
      { title: "Руководитель проекта" },
      { title: "Специалист по продажам" },
      { title: "Юрисконсульт" },
      { title: "Аналитик данных" },
      { title: "Специалист по маркетингу" },
    ])
    .returning();

  const empls = await db
    .insert(schema.employees)
    .values([
      {
        firstName: "Иван",
        lastName: "Иванов",
        surname: "Иванович",
        email: "ivanov@company.com",
        phoneNumber: "+7 (495) 123-45-67",
        admissionDate: new Date().toISOString(),
        departmentId: depts[0].id,
        jobTitleId: jobs[0].id,
      },
      {
        firstName: "Мария",
        lastName: "Петрова",
        surname: "Сергеевна",
        email: "petrova@company.com",
        admissionDate: new Date().toISOString(),
        departmentId: depts[1].id,
        jobTitleId: jobs[1].id,
        phoneNumber: "+7 (495) 234-56-78",
      },
      {
        firstName: "Петр",
        lastName: "Сидоров",
        surname: "Алексеевич",
        email: "sidorov@company.com",
        admissionDate: new Date().toISOString(),
        departmentId: depts[2].id,
        jobTitleId: jobs[2].id,
        phoneNumber: "+7 (495) 345-67-89",
      },
      {
        firstName: "Анна",
        lastName: "Козлова",
        surname: "Викторовна",
        email: "kozlova@company.ru",
        admissionDate: new Date().toISOString(),
        departmentId: depts[2].id,
        jobTitleId: jobs[3].id,
        phoneNumber: "+7 (495) 456-78-90",
      },
      {
        firstName: "Дмитрий",
        lastName: "Морозов",
        surname: "Павлович",
        email: "morozov@company.com",
        admissionDate: new Date().toISOString(),
        departmentId: depts[3].id,
        jobTitleId: jobs[4].id,
        phoneNumber: "+7 (495) 567-89-01",
      },
      {
        firstName: "Елена",
        lastName: "Васильева",
        surname: "Игоревна",
        email: "vasilyeva@company.com",
        admissionDate: new Date().toISOString(),
        departmentId: depts[4].id,
        jobTitleId: jobs[5].id,
        phoneNumber: "+7 (495) 678-90-12",
      },
      {
        firstName: "Сергей",
        lastName: "Новиков",
        surname: "Андреевич",
        email: "novikov@company.com",
        admissionDate: new Date().toISOString(),
        departmentId: depts[2].id,
        jobTitleId: jobs[6].id,
        phoneNumber: "+7 (495) 789-01-23",
      },
      {
        firstName: "Ольга",
        lastName: "Смирнова",
        surname: "Николаевна",
        email: "smirnova@company.com",
        admissionDate: new Date().toISOString(),
        departmentId: depts[5].id,
        jobTitleId: jobs[7].id,
        phoneNumber: "+7 (495) 890-12-34",
      },
    ])
    .returning();

  await db.insert(schema.orders).values([
    {
      employeeId: empls[0].id,
      orderNumber: "order-1",
      orderDate: new Date().toISOString(),
      orderTypeId: ordTypes[0].id,
    },
    {
      employeeId: empls[1].id,
      orderNumber: "order-2",
      orderDate: new Date().toISOString(),
      orderTypeId: ordTypes[1].id,
    },
    {
      employeeId: empls[2].id,
      orderNumber: "order-3",
      orderDate: new Date().toISOString(),
      orderTypeId: ordTypes[2].id,
    },
  ]);

  await db.insert(schema.contracts).values([
    {
      contractNumber: "2020/001",
      issueDate: new Date().toISOString(),
      status: "Активный",
      employeeId: empls[0].id,
    },
    {
      contractNumber: "2019/025",
      issueDate: new Date().toISOString(),
      status: "Активный",
      employeeId: empls[1].id,
    },
    {
      contractNumber: "2021/003",
      issueDate: new Date().toISOString(),
      status: "Истёк",
      employeeId: empls[2].id,
    },
    {
      contractNumber: "2024/002",
      issueDate: new Date().toISOString(),
      status: "Активный",
      employeeId: empls[3].id,
    },
    {
      contractNumber: "2018/045",
      issueDate: new Date().toISOString(),
      status: "Активный",
      employeeId: empls[4].id,
    },
    {
      contractNumber: "2022/012",
      issueDate: new Date().toISOString(),
      status: "Активный",
      employeeId: empls[5].id,
    },
    {
      contractNumber: "2026/018",
      issueDate: new Date().toISOString(),
      status: "Истёк",
      employeeId: empls[6].id,
    },
  ]);

  await db.insert(schema.vacations).values([
    {
      employeeId: empls[0].id,
      startDate: new Date("2024-12-23").toISOString(),
      endDate: new Date("2025-01-10").toISOString(),
      vacationType: "Оплачиваемый",
    },
    {
      employeeId: empls[1].id,
      startDate: new Date("2025-01-15").toISOString(),
      endDate: new Date("2025-01-29").toISOString(),
      vacationType: "Оплачиваемый",
    },
    {
      employeeId: empls[3].id,
      startDate: new Date("2024-11-01").toISOString(),
      endDate: new Date("2024-11-10").toISOString(),
      vacationType: "Без сохранения ЗП",
    },
    {
      employeeId: empls[4].id,
      startDate: new Date("2025-02-01").toISOString(),
      endDate: new Date("2025-02-14").toISOString(),
      vacationType: "Оплачиваемый",
    },
    {
      employeeId: empls[5].id,
      startDate: new Date("2025-01-20").toISOString(),
      endDate: new Date("2025-02-03").toISOString(),
      vacationType: "Оплачиваемый",
    },
  ]);

  console.log("Seed finished successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed!");
  console.error(err);
  process.exit(1);
});
