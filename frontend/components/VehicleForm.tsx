"use client";

import { FormEvent, useState } from "react";

import type { VehicleInput } from "@/types/vehicle";

type VehicleFormProps = {
  initialVehicle?: VehicleInput;
  submitLabel: string;
  onSubmit: (vehicle: VehicleInput) => Promise<void>;
};

function createEmptyVehicle(): VehicleInput {
  return {
    year: new Date().getFullYear(),
    make: "",
    model: "",
    currentMileage: 0,
  };
}

export default function VehicleForm({
  initialVehicle,
  submitLabel,
  onSubmit,
}: VehicleFormProps) {
  const [vehicle, setVehicle] = useState<VehicleInput>(() =>
    initialVehicle
      ? { ...initialVehicle }
      : createEmptyVehicle(),
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

      await onSubmit(vehicle);
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to save vehicle.",
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
          Year
          <input
            type="number"
            min="1900"
            max={new Date().getFullYear() + 1}
            required
            value={vehicle.year}
            onChange={(event) =>
              setVehicle((currentVehicle) => ({
                ...currentVehicle,
                year: Number(event.target.value),
              }))
            }
          />
        </label>

        <label>
          Make
          <input
            type="text"
            required
            placeholder="Toyota"
            value={vehicle.make}
            onChange={(event) =>
              setVehicle((currentVehicle) => ({
                ...currentVehicle,
                make: event.target.value,
              }))
            }
          />
        </label>

        <label>
          Model
          <input
            type="text"
            required
            placeholder="Camry"
            value={vehicle.model}
            onChange={(event) =>
              setVehicle((currentVehicle) => ({
                ...currentVehicle,
                model: event.target.value,
              }))
            }
          />
        </label>

        <label>
          Current mileage
          <input
            type="number"
            min="0"
            required
            value={vehicle.currentMileage}
            onChange={(event) =>
              setVehicle((currentVehicle) => ({
                ...currentVehicle,
                currentMileage: Number(event.target.value),
              }))
            }
          />
        </label>
      </div>

      <button
        type="submit"
        className="primary-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}