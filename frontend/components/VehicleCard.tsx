"use client";

import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";

type VehicleCardProps = {
  vehicle: Vehicle;
  onDelete: (vehicleId: number) => void;
};

export default function VehicleCard({
  vehicle,
  onDelete,
}: VehicleCardProps) {
  return (
    <article className="vehicle-card">
      <div className="vehicle-card-header">
        <div>
          <p className="vehicle-year">{vehicle.year}</p>
          <h2>
            {vehicle.make} {vehicle.model}
          </h2>
        </div>

        <span className="mileage-badge">
          {vehicle.currentMileage.toLocaleString()} miles
        </span>
      </div>

      <div className="vehicle-card-actions">
        <Link
          href={`/vehicles/${vehicle.id}`}
          className="primary-button small-button"
        >
          View Vehicle
        </Link>

        <Link
          href={`/maintenance/vehicle/${vehicle.id}`}
          className="secondary-button small-button"
        >
          Service History
        </Link>

        <button
          type="button"
          className="danger-button small-button"
          onClick={() => onDelete(vehicle.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}