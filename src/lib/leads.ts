import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().trim().min(2, "יש להזין שם מלא").max(80),
  phone: z.string().trim().min(8, "מספר הטלפון קצר מדי").max(20),
  email: z.string().trim().email("כתובת האימייל אינה תקינה").max(120),
  organizationName: z.string().trim().min(2, "יש להזין שם עסק או ארגון").max(120),
  userType: z.enum(["employer", "accountant", "payroll", "organization", "operator", "other"]),
  employeeCount: z.coerce.number().int().min(1).max(1000000),
  message: z.string().trim().max(1000).optional().default(""),
  website: z.string().max(0).optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const userTypeLabels: Record<LeadInput["userType"], string> = {
  employer: "מעסיק",
  accountant: "מנהל/ת חשבונות",
  payroll: "חשב/ת שכר",
  organization: "ארגון / קבוצת מעסיקים",
  operator: "מתפעל/ת פנסיוני/ת",
  other: "אחר",
};
