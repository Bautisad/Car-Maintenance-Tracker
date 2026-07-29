import type {
  MaintenanceLog,
  MaintenanceLogInput,
} from "@/types/maintenanceLog";
import type { Vehicle, VehicleInput } from "@/types/vehicle";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const responseMessage = await response.text();

    throw new Error(
      responseMessage || `Request failed with status ${response.status}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const responseText = await response.text();

  if (!responseText) {
    return undefined as T;
  }

  return JSON.parse(responseText) as T;
}

/*
 * VehicleController.java
 */

export function getVehicles(): Promise<Vehicle[]> {
  return apiRequest<Vehicle[]>("/vehicles");
}

export function getVehicleById(id: number): Promise<Vehicle> {
  return apiRequest<Vehicle>(`/vehicles/${id}`);
}

export function createVehicle(vehicle: VehicleInput): Promise<Vehicle> {
  return apiRequest<Vehicle>("/vehicles", {
    method: "POST",
    body: JSON.stringify(vehicle),
  });
}

export function updateVehicle(
  id: number,
  vehicle: VehicleInput,
): Promise<Vehicle> {
  return apiRequest<Vehicle>(`/vehicles/${id}`, {
    method: "PUT",
    body: JSON.stringify(vehicle),
  });
}

export function deleteVehicle(id: number): Promise<void> {
  return apiRequest<void>(`/vehicles/${id}`, {
    method: "DELETE",
  });
}

/*
 * MaintenanceLogController.java
 */

export function getMaintenanceLogs(
  vehicleId: number,
): Promise<MaintenanceLog[]> {
  return apiRequest<MaintenanceLog[]>(
    `/maintenance/vehicle/${vehicleId}`,
  );
}

export function createMaintenanceLog(
  vehicleId: number,
  maintenanceLog: MaintenanceLogInput,
): Promise<MaintenanceLog> {
  return apiRequest<MaintenanceLog>(
    `/maintenance/vehicle/${vehicleId}`,
    {
      method: "POST",
      body: JSON.stringify(maintenanceLog),
    },
  );
}

export function updateMaintenanceLog(
  logId: number,
  maintenanceLog: MaintenanceLogInput,
): Promise<MaintenanceLog> {
  return apiRequest<MaintenanceLog>(`/maintenance/${logId}`, {
    method: "PUT",
    body: JSON.stringify(maintenanceLog),
  });
}

export function deleteMaintenanceLog(logId: number): Promise<void> {
  return apiRequest<void>(`/maintenance/${logId}`, {
    method: "DELETE",
  });
}