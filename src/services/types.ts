export type AuditLog = {
  logId: number;
  applicationId: number | null;
  applicationType: string | null;
  companyId: number | null;
  actionType: string | null;
  ip: string;
  userAgent: string;
  userId: number | null;
  source: string;
  ownerId: number | null;
  logInfo: string | null;
  actionDetails: string | null;
  creationTimestamp: string;
};
