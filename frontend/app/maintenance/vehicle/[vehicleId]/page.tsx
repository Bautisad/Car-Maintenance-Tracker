"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import MaintenanceLogForm from "@/components/MaintenanceLogForm";
import {
  createMaintenanceLog,
  deleteMaintenanceLog,
  getMaintenanceLogs,
  getVehicleById,
  updateMaintenanceLog,
} from "@/lib/api";

import type {
  MaintenanceLog,
  MaintenanceLogInput,
} from "@/types/maintenanceLog";
import type { Vehicle } from "@/types/vehicle";

type LoadError = {
  vehicleId: number;
  message: string;
};

function formatServiceType(serviceType: string) {
  return serviceType
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function MaintenanceHistoryPage() {
  const params = useParams<{ vehicleId: string }>();

  const vehicleId = Number(params.vehicleId);

  const isValidVehicleId =
    Number.isInteger(vehicleId) && vehicleId > 0;

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  const [maintenanceLogs, setMaintenanceLogs] = useState<
    MaintenanceLog[]
  >([]);

  const [editingLog, setEditingLog] =
    useState<MaintenanceLog | null>(null);

  const [loadedVehicleId, setLoadedVehicleId] =
    useState<number | null>(null);

  const [loadError, setLoadError] =
    useState<LoadError | null>(null);

  const [actionErrorMessage, setActionErrorMessage] =
    useState("");

  useEffect(() => {
    if (!isValidVehicleId) {
      return;
    }

    let ignoreRequest = false;

    Promise.all([
      getVehicleById(vehicleId),
      getMaintenanceLogs(vehicleId),
    ])
      .then(([vehicleData, maintenanceLogData]) => {
        if (ignoreRequest) {
          return;
        }

        setVehicle(vehicleData);
        setMaintenanceLogs(maintenanceLogData);
        setLoadedVehicleId(vehicleId);
        setLoadError(null);
        setActionErrorMessage("");
        setEditingLog(null);
      })
      .catch((error: unknown) => {
        if (ignoreRequest) {
          return;
        }

        setVehicle(null);
        setMaintenanceLogs([]);
        setLoadedVehicleId(vehicleId);

        setLoadError({
          vehicleId,
          message:
            error instanceof Error
              ? error.message
              : "Unable to load maintenance records.",
        });
      });

    return () => {
      ignoreRequest = true;
    };
  }, [vehicleId, isValidVehicleId]);

  const isLoading =
    isValidVehicleId && loadedVehicleId !== vehicleId;

  const currentLoadError =
    loadError?.vehicleId === vehicleId
      ? loadError.message
      : "";

  async function handleSaveLog(
    maintenanceLog: MaintenanceLogInput,
  ) {
    setActionErrorMessage("");

    if (editingLog) {
      const updatedLog = await updateMaintenanceLog(
        editingLog.id,
        maintenanceLog,
      );

      setMaintenanceLogs((currentLogs) =>
        currentLogs.map((currentLog) =>
          currentLog.id === updatedLog.id
            ? updatedLog
            : currentLog,
        ),
      );

      setEditingLog(null);
      return;
    }

    const savedLog = await createMaintenanceLog(
      vehicleId,
      maintenanceLog,
    );

    setMaintenanceLogs((currentLogs) => [
      savedLog,
      ...currentLogs,
    ]);
  }

  async function handleDeleteLog(logId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this maintenance record?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionErrorMessage("");

      await deleteMaintenanceLog(logId);

      setMaintenanceLogs((currentLogs) =>
        currentLogs.filter(
          (maintenanceLog) => maintenanceLog.id !== logId,
        ),
      );

      if (editingLog?.id === logId) {
        setEditingLog(null);
      }
    } catch (error: unknown) {
      setActionErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to delete the maintenance record.",
      );
    }
  }

  if (!isValidVehicleId) {
    return (
      <div className="page-container page-section">
        <p className="error-message">
          Invalid vehicle ID.
        </p>

        <Link
          href="/vehicles"
          className="secondary-button"
        >
          Back to My Vehicles
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="page-container page-section">
        <p>Loading service history...</p>
      </div>
    );
  }

  if (currentLoadError || !vehicle) {
    return (
      <div className="page-container page-section">
        <p className="error-message">
          {currentLoadError || "Vehicle was not found."}
        </p>

        <Link
          href="/vehicles"
          className="secondary-button"
        >
          Back to My Vehicles
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow dark-eyebrow">
            SERVICE HISTORY
          </p>

          <h1>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>

          <p>
            {vehicle.currentMileage.toLocaleString()} current
            miles
          </p>
        </div>

        <Link
          href={`/vehicles/${vehicle.id}`}
          className="secondary-button"
        >
          Back to Vehicle
        </Link>
      </div>

      {actionErrorMessage && (
        <p className="error-message">
          {actionErrorMessage}
        </p>
      )}

      <section className="form-card">
        <h2>
          {editingLog
            ? "Edit Service Record"
            : "Add Service Record"}
        </h2>

        <MaintenanceLogForm
          key={
            editingLog
              ? `edit-${editingLog.id}`
              : "new-maintenance-log"
          }
          initialLog={
            editingLog
              ? {
                  serviceType: editingLog.serviceType,
                  mileagePerformed:
                    editingLog.mileagePerformed,
                  datePerformed: editingLog.datePerformed,
                  notes: editingLog.notes,
                }
              : undefined
          }
          submitLabel={
            editingLog
              ? "Update Record"
              : "Add Service Record"
          }
          onSubmit={handleSaveLog}
          onCancel={
            editingLog
              ? () => setEditingLog(null)
              : undefined
          }
        />
      </section>

      <section className="service-section">
        <h2>Recorded Services</h2>

        {maintenanceLogs.length === 0 ? (
          <div className="empty-state">
            <h3>No service records</h3>

            <p>
              Add the first maintenance record for this
              vehicle.
            </p>
          </div>
        ) : (
          <div className="service-list">
            {maintenanceLogs.map((maintenanceLog) => (
              <article
                className="service-card"
                key={maintenanceLog.id}
              >
                <div>
                  <p className="service-date">
                    {maintenanceLog.datePerformed}
                  </p>

                  <h3>
                    {formatServiceType(
                      maintenanceLog.serviceType,
                    )}
                  </h3>

                  <p>
                    Performed at{" "}
                    <strong>
                      {maintenanceLog.mileagePerformed.toLocaleString()}{" "}
                      miles
                    </strong>
                  </p>

                  {maintenanceLog.notes && (
                    <p>{maintenanceLog.notes}</p>
                  )}
                </div>

                <div className="service-actions">
                  <button
                    type="button"
                    className="secondary-button small-button"
                    onClick={() =>
                      setEditingLog(maintenanceLog)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="danger-button small-button"
                    onClick={() =>
                      handleDeleteLog(maintenanceLog.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}