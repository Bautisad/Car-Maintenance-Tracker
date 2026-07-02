package com.duke.maintenance.vehicle;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

class VehicleTest {

    @Test
    void noArgsConstructorAndSetters_shouldCreateVehicle() {
        Vehicle vehicle = new Vehicle();

        vehicle.setId(1L);
        vehicle.setYear(2019);
        vehicle.setMake("Dodge");
        vehicle.setModel("Charger Scat Pack");
        vehicle.setCurrentMileage(72000);

        assertEquals(1L, vehicle.getId());
        assertEquals(2019, vehicle.getYear());
        assertEquals("Dodge", vehicle.getMake());
        assertEquals("Charger Scat Pack", vehicle.getModel());
        assertEquals(72000, vehicle.getCurrentMileage());
    }

    @Test
    void allArgsConstructor_shouldCreateVehicle() {
        Vehicle vehicle = new Vehicle(
                1L,
                2019,
                "Dodge",
                "Charger Scat Pack",
                72000
        );

        assertEquals(1L, vehicle.getId());
        assertEquals(2019, vehicle.getYear());
        assertEquals("Dodge", vehicle.getMake());
        assertEquals("Charger Scat Pack", vehicle.getModel());
        assertEquals(72000, vehicle.getCurrentMileage());
    }
}