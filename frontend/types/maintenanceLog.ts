import type { Vehicle } from "@/types/vehicle";

export type MaintenanceLog = {
  id: number;
  serviceType: string;
  mileagePerformed: number;
  datePerformed: string;
  notes: string;
  vehicle: Vehicle;
};

export type MaintenanceLogInput = {
  serviceType: string;
  mileagePerformed: number;
  datePerformed: string;
  notes: string;
};