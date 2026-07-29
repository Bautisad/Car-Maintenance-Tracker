"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import VehicleCard from "@/components/VehicleCard";
import { deleteVehicle, getVehicles } from "@/lib/api";
import type { Vehicle } from "@/types/vehicle";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignoreRequest = false;

    getVehicles()
      .then((vehicleData) => {
        if (!ignoreRequest) {
          setVehicles(vehicleData);
        }
      })
      .catch((error: unknown) => {
        if (!ignoreRequest) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Unable to load vehicles.",
          );
        }
      })
      .finally(() => {
        if (!ignoreRequest) {
          setIsLoading(false);
        }
      });

    return () => {
      ignoreRequest = true;
    };
  }, []);

  async function handleDelete(vehicleId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vehicle?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setErrorMessage("");

      await deleteVehicle(vehicleId);

      setVehicles((currentVehicles) =>
        currentVehicles.filter((vehicle) => vehicle.id !== vehicleId),
      );
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to delete the vehicle.",
      );
    }
  }

  return (
    <div className="page-container page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow dark-eyebrow">MY GARAGE</p>
          <h1>My Vehicles</h1>
          <p>
            Manage your vehicles and view their maintenance history.
          </p>
        </div>

        <Link href="/vehicles/new" className="primary-button">
          Add Vehicle
        </Link>
      </div>

      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      {isLoading && <p>Loading vehicles...</p>}

      {!isLoading && vehicles.length === 0 && (
        <div className="empty-state">
          <h2>No vehicles added</h2>

          <p>
            Add your first vehicle to begin tracking its mileage and
            maintenance history.
          </p>

          <Link href="/vehicles/new" className="primary-button">
            Add Your First Vehicle
          </Link>
        </div>
      )}

      {!isLoading && vehicles.length > 0 && (
        <div className="vehicle-list">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}