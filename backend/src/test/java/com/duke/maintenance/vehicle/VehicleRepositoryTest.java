package com.duke.maintenance.vehicle;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

@DataJpaTest
class VehicleRepositoryTest {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Test
    void save_shouldPersistVehicle() {
        Vehicle vehicle = new Vehicle(
                null,
                2019,
                "Dodge",
                "Charger Scat Pack",
                72000
        );

        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        assertNotNull(savedVehicle.getId());
        assertEquals(2019, savedVehicle.getYear());
        assertEquals("Dodge", savedVehicle.getMake());
        assertEquals("Charger Scat Pack", savedVehicle.getModel());
        assertEquals(72000, savedVehicle.getCurrentMileage());
    }

    @Test
    void findById_shouldReturnVehicle() {
        Vehicle vehicle = new Vehicle(
                null,
                2020,
                "Toyota",
                "Camry",
                45000
        );

        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        Optional<Vehicle> foundVehicle = vehicleRepository.findById(savedVehicle.getId());

        assertTrue(foundVehicle.isPresent());
        assertEquals("Toyota", foundVehicle.get().getMake());
        assertEquals("Camry", foundVehicle.get().getModel());
    }

    @Test
    void findAll_shouldReturnVehicles() {
        Vehicle vehicle1 = new Vehicle(null, 2019, "Dodge", "Charger", 72000);
        Vehicle vehicle2 = new Vehicle(null, 2021, "Honda", "Civic", 30000);

        vehicleRepository.save(vehicle1);
        vehicleRepository.save(vehicle2);

        List<Vehicle> vehicles = vehicleRepository.findAll();

        assertEquals(2, vehicles.size());
    }

    @Test
    void deleteById_shouldRemoveVehicle() {
        Vehicle vehicle = new Vehicle(
                null,
                2018,
                "Ford",
                "Mustang",
                60000
        );

        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        vehicleRepository.deleteById(savedVehicle.getId());

        Optional<Vehicle> deletedVehicle = vehicleRepository.findById(savedVehicle.getId());

        assertTrue(deletedVehicle.isEmpty());
    }
}