"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import VehicleForm from "@/components/VehicleForm";
import { getVehicleById, updateVehicle } from "@/lib/api";
import type { Vehicle, VehicleInput } from "@/types/vehicle";

export default function VehicleDetailsPage() {
  const params = useParams<{ id: string }>();
  const vehicleId = Number(params.id);

  const isValidVehicleId =
    Number.isInteger(vehicleId) && vehicleId > 0;

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loadedVehicleId, setLoadedVehicleId] =
    useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let ignoreRequest = false;

    if (!isValidVehicleId) {
      return () => {
        ignoreRequest = true;
      };
    }

    getVehicleById(vehicleId)
      .then((vehicleData) => {
        if (!ignoreRequest) {
          setVehicle(vehicleData);
          setLoadedVehicleId(vehicleId);
          setErrorMessage("");
        }
      })
      .catch((error: unknown) => {
        if (!ignoreRequest) {
          setVehicle(null);
          setLoadedVehicleId(vehicleId);

          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Unable to load vehicle.",
          );
        }
      });

    return () => {
      ignoreRequest = true;
    };
  }, [vehicleId, isValidVehicleId]);

  const isLoading =
    isValidVehicleId && loadedVehicleId !== vehicleId;

  async function handleUpdateVehicle(
    updatedVehicle: VehicleInput,
  ) {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const savedVehicle = await updateVehicle(
        vehicleId,
        updatedVehicle,
      );

      setVehicle(savedVehicle);
      setSuccessMessage("Vehicle updated successfully.");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to update vehicle.";

      setErrorMessage(message);

      // VehicleForm expects the error to be thrown so it can
      // display its own submission error message.
      throw error;
    }
  }

  if (!isValidVehicleId) {
    return (
      <div className="page-container page-section">
        <p className="error-message">
          Invalid vehicle ID.
        </p>

        <Link href="/vehicles" className="secondary-button">
          Back to My Vehicles
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="page-container page-section">
        <p>Loading vehicle...</p>
      </div>
    );
  }

  if (errorMessage || !vehicle) {
    return (
      <div className="page-container page-section">
        <p className="error-message">
          {errorMessage || "Vehicle was not found."}
        </p>

        <Link href="/vehicles" className="secondary-button">
          Back to My Vehicles
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container page-section">
      <section className="vehicle-summary">
        <p className="eyebrow dark-eyebrow">
          VEHICLE OVERVIEW
        </p>

        <h1>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h1>

        <p className="large-mileage">
          {vehicle.currentMileage.toLocaleString()} miles
        </p>

        <div className="button-row">
          <Link
            href={`/maintenance/vehicle/${vehicle.id}`}
            className="primary-button"
          >
            View Service History
          </Link>

          <Link
            href="/vehicles"
            className="secondary-button"
          >
            Back to My Vehicles
          </Link>
        </div>
      </section>

      <section className="form-card">
        <h2>Update Vehicle</h2>

        {successMessage && (
          <p className="success-message">
            {successMessage}
          </p>
        )}

        <VehicleForm
          key={vehicle.id}
          initialVehicle={{
            year: vehicle.year,
            make: vehicle.make,
            model: vehicle.model,
            currentMileage: vehicle.currentMileage,
          }}
          submitLabel="Update Vehicle"
          onSubmit={handleUpdateVehicle}
        />
      </section>
    </div>
  );
}