import {
  pgTable,
  text,
  varchar,
  date,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import * as z from "zod";

export const entityTypeEnum = pgEnum("entity_type", [
  "Приказы",
  "Командировки",
  "Отчеты",
  "Отпуска",
  "Договоры",
]);

export const vacationTypeEnum = pgEnum("vacation_type", [
  "Оплачиваемый",
  "Без сохранения ЗП",
]);

export const contractStatusEnum = pgEnum("contract_status", [
  "Истёк",
  "Активный",
]);

export const businessTripStatusEnum = pgEnum("business_trip_status", [
  "В процессе",
  "Запланирована",
  "Завершена",
]);

export const jobTitles = pgTable("job_titles", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  title: text("title").notNull(),
});

export const departments = pgTable("departments", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  title: text("title").notNull(),
});

export const orderType = pgTable("order_type", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name"),
});

export const employees = pgTable("employees", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  firstName: text("first_name").notNull(),
  surname: text("surname"),
  lastName: text("last_name").notNull(),
  email: text("email"),
  phoneNumber: text("phone_number"),
  admissionDate: date("admission_date").notNull(),
  jobTitleId: integer("job_title_id")
    .notNull()
    .references(() => jobTitles.id),
  departmentId: integer("department_id")
    .notNull()
    .references(() => departments.id),
});

export const employeeInsertSchema = createInsertSchema(employees, {
  surname: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
}).omit({
  id: true,
});

export const contracts = pgTable("contracts", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  employeeId: integer("employee_id").references(() => employees.id),
  contractNumber: varchar("contract_number", { length: 50 }).notNull(),
  issueDate: date("issue_date").notNull(),
  expirationDate: date("expiration_date"),
  status: contractStatusEnum("status").notNull(),
});

export const vacations = pgTable("vacations", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  employeeId: integer("employee_id").references(() => employees.id),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  vacationType: vacationTypeEnum("vacation_type").notNull(),
});

export const businessTrips = pgTable("business_trips", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  employeeId: integer("employee_id").references(() => employees.id),
  destination: varchar("destination", { length: 255 }).notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  purpose: text("purpose"),
  status: businessTripStatusEnum("status").notNull(),
});

export const orders = pgTable("orders", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  employeeId: integer("employee_id").references(() => employees.id),
  orderNumber: varchar("order_number", { length: 50 }).notNull(),
  orderDate: date("order_date").notNull(),
  orderTypeId: integer("order_type_id")
    .notNull()
    .references(() => orderType.id),
});

export const reports = pgTable("reports", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  employeeId: integer("employee_id").references(() => employees.id),
  reportName: varchar("report_name", { length: 255 }).notNull(),
  periodStart: date("period_start"),
  periodEnd: date("period_end"),
});

export const attachments = pgTable("attachments", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  entityType: entityTypeEnum("entity_type"),
  entityId: integer("entity_id"),
  filePath: varchar("file_path", { length: 512 }).notNull(),
  originalName: varchar("original_name", { length: 255 }),
  uploadDate: timestamp("upload_date").defaultNow(),
});

export const ordersRelations = relations(orders, ({ one }) => ({
  employee: one(employees, {
    fields: [orders.employeeId],
    references: [employees.id],
  }),

  orderType: one(orderType, {
    fields: [orders.orderTypeId],
    references: [orderType.id],
  }),
}));

export const employeesRelations = relations(employees, ({ one }) => ({
  jobTitle: one(jobTitles, {
    fields: [employees.jobTitleId],
    references: [jobTitles.id],
  }),

  department: one(departments, {
    fields: [employees.departmentId],
    references: [departments.id],
  }),
}));

export const constractsRelations = relations(contracts, ({ one }) => ({
  employee: one(employees, {
    fields: [contracts.employeeId],
    references: [employees.id],
  }),
}));
