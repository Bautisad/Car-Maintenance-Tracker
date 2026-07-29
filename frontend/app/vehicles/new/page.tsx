"use client";

import { useRouter } from "next/navigation";
import VehicleForm from "@/components/VehicleForm";
import { createVehicle } from "@/lib/api";
import type { VehicleInput } from "@/types/vehicle";

export default function AddVehiclePage() {
  const router = useRouter();

  async function handleCreateVehicle(vehicle: VehicleInput) {
    const savedVehicle = await createVehicle(vehicle);

    router.push(`/vehicles/${savedVehicle.id}`);
  }

  return (
    <div className="page-container narrow-page page-section">
      <div className="form-card">
        <p className="eyebrow dark-eyebrow">ADD TO MY GARAGE</p>
        <h1>Add a Vehicle</h1>
        <p>Enter the basic information for the vehicle you want to track.</p>

        <VehicleForm
          submitLabel="Save Vehicle"
          onSubmit={handleCreateVehicle}
        />
      </div>
    </div>
  );
}