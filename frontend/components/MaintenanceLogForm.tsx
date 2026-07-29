"use client";

import { FormEvent, useState } from "react";

import type { MaintenanceLogInput } from "@/types/maintenanceLog";

type MaintenanceLogFormProps = {
  initialLog?: MaintenanceLogInput;
  submitLabel: string;
  onSubmit: (maintenanceLog: MaintenanceLogInput) => Promise<void>;
  onCancel?: () => void;
};

function createEmptyLog(): MaintenanceLogInput {
  return {
    serviceType: "OIL_CHANGE",
    mileagePerformed: 0,
    datePerformed: new Date().toISOString().slice(0, 10),
    notes: "",
  };
}

export default function MaintenanceLogForm({
  initialLog,
  submitLabel,
  onSubmit,
  onCancel,
}: MaintenanceLogFormProps) {
  const [maintenanceLog, setMaintenanceLog] =
    useState<MaintenanceLogInput>(() =>
      initialLog ? { ...initialLog } : createEmptyLog(),
    );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await onSubmit(maintenanceLog);

      if (!initialLog) {
        setMaintenanceLog(createEmptyLog());
      }
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to save maintenance record.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="data-form" onSubmit={handleSubmit}>
      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      <div className="form-grid">
        <label>
          Service type
          <select
            value={maintenanceLog.serviceType}
            onChange={(event) =>
              setMaintenanceLog((currentLog) => ({
                ...currentLog,
                serviceType: event.target.value,
              }))
            }
          >
            <option value="OIL_CHANGE">Oil Change</option>
            <option value="TIRE_ROTATION">Tire Rotation</option>
            <option value="BRAKE_INSPECTION">
              Brake Inspection
            </option>
            <option value="TRANSMISSION_FLUID">
              Transmission Fluid
            </option>
            <option value="SPARK_PLUGS">Spark Plugs</option>
            <option value="OTHER">Other</option>
          </select>
        </label>

        <label>
          Mileage performed
          <input
            type="number"
            min="0"
            required
            value={maintenanceLog.mileagePerformed}
            onChange={(event) =>
              setMaintenanceLog((currentLog) => ({
                ...currentLog,
                mileagePerformed: Number(event.target.value),
              }))
            }
          />
        </label>

        <label>
          Date performed
          <input
            type="date"
            required
            value={maintenanceLog.datePerformed}
            onChange={(event) =>
              setMaintenanceLog((currentLog) => ({
                ...currentLog,
                datePerformed: event.target.value,
              }))
            }
          />
        </label>

        <label className="full-width">
          Notes
          <textarea
            rows={4}
            placeholder="Describe the service performed."
            value={maintenanceLog.notes}
            onChange={(event) =>
              setMaintenanceLog((currentLog) => ({
                ...currentLog,
                notes: event.target.value,
              }))
            }
          />
        </label>
      </div>

      <div className="button-row">
        <button
          type="submit"
          className="primary-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>

        {onCancel && (
          <button
            type="button"
            className="secondary-button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}