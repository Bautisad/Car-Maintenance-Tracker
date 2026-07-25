package com.duke.maintenance.maintenance;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

import com.duke.maintenance.vehicle.Vehicle;

class MaintenanceLogTest {

    @Test
    void noArgsConstructorAndSetters_shouldCreateMaintenanceLog() {
        Vehicle vehicle = new Vehicle(
                1L,
                2019,
                "Dodge",
                "Charger Scat Pack",
                72000
        );

        MaintenanceLog maintenanceLog = new MaintenanceLog();

        maintenanceLog.setId(1L);
        maintenanceLog.setServiceType("OIL_CHANGE");
        maintenanceLog.setMileagePerformed(70000);
        maintenanceLog.setDatePerformed(LocalDate.of(2026, 7, 25));
        maintenanceLog.setNotes("Changed oil and filter.");
        maintenanceLog.setVehicle(vehicle);

        assertEquals(1L, maintenanceLog.getId());
        assertEquals("OIL_CHANGE", maintenanceLog.getServiceType());
        assertEquals(70000, maintenanceLog.getMileagePerformed());
        assertEquals(LocalDate.of(2026, 7, 25), maintenanceLog.getDatePerformed());
        assertEquals("Changed oil and filter.", maintenanceLog.getNotes());
        assertEquals(vehicle, maintenanceLog.getVehicle());
    }

    @Test
    void allArgsConstructor_shouldCreateMaintenanceLog() {
        Vehicle vehicle = new Vehicle(
                1L,
                2019,
                "Dodge",
                "Charger Scat Pack",
                72000
        );

        MaintenanceLog maintenanceLog = new MaintenanceLog(
                1L,
                "TIRE_ROTATION",
                71000,
                LocalDate.of(2026, 7, 25),
                "Rotated tires.",
                vehicle
        );

        assertEquals(1L, maintenanceLog.getId());
        assertEquals("TIRE_ROTATION", maintenanceLog.getServiceType());
        assertEquals(71000, maintenanceLog.getMileagePerformed());
        assertEquals(LocalDate.of(2026, 7, 25), maintenanceLog.getDatePerformed());
        assertEquals("Rotated tires.", maintenanceLog.getNotes());
        assertEquals(vehicle, maintenanceLog.getVehicle());
    }
}