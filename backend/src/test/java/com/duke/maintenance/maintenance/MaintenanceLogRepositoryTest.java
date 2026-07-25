package com.duke.maintenance.maintenance;

import com.duke.maintenance.vehicle.Vehicle;
import com.duke.maintenance.vehicle.VehicleRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
class MaintenanceLogRepositoryTest {

    @Autowired
    private MaintenanceLogRepository maintenanceLogRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Test
    void save_shouldPersistMaintenanceLog() {
        Vehicle vehicle = vehicleRepository.save(
                new Vehicle(null, 2019, "Dodge", "Charger Scat Pack", 72000)
        );

        MaintenanceLog maintenanceLog = new MaintenanceLog(
                null,
                "OIL_CHANGE",
                70000,
                LocalDate.of(2026, 7, 25),
                "Changed oil and filter.",
                vehicle
        );

        MaintenanceLog savedLog = maintenanceLogRepository.save(maintenanceLog);

        assertNotNull(savedLog.getId());
        assertEquals("OIL_CHANGE", savedLog.getServiceType());
        assertEquals(70000, savedLog.getMileagePerformed());
        assertEquals(LocalDate.of(2026, 7, 25), savedLog.getDatePerformed());
        assertEquals("Changed oil and filter.", savedLog.getNotes());
        assertEquals(vehicle.getId(), savedLog.getVehicle().getId());
    }

    @Test
    void findByVehicleId_shouldReturnLogsForOneVehicle() {
        Vehicle vehicle = vehicleRepository.save(
                new Vehicle(null, 2019, "Dodge", "Charger Scat Pack", 72000)
        );

        MaintenanceLog oilChange = new MaintenanceLog(
                null,
                "OIL_CHANGE",
                70000,
                LocalDate.of(2026, 7, 25),
                "Changed oil.",
                vehicle
        );

        MaintenanceLog tireRotation = new MaintenanceLog(
                null,
                "TIRE_ROTATION",
                71000,
                LocalDate.of(2026, 7, 25),
                "Rotated tires.",
                vehicle
        );

        maintenanceLogRepository.save(oilChange);
        maintenanceLogRepository.save(tireRotation);

        List<MaintenanceLog> logs = maintenanceLogRepository.findByVehicleId(vehicle.getId());

        assertEquals(2, logs.size());
        assertTrue(logs.stream().anyMatch(log -> log.getServiceType().equals("OIL_CHANGE")));
        assertTrue(logs.stream().anyMatch(log -> log.getServiceType().equals("TIRE_ROTATION")));
    }

    @Test
    void findByVehicleId_shouldNotReturnLogsForOtherVehicles() {
        Vehicle vehicleOne = vehicleRepository.save(
                new Vehicle(null, 2019, "Dodge", "Charger Scat Pack", 72000)
        );

        Vehicle vehicleTwo = vehicleRepository.save(
                new Vehicle(null, 2021, "Honda", "Civic", 30000)
        );

        MaintenanceLog logForVehicleOne = new MaintenanceLog(
                null,
                "OIL_CHANGE",
                70000,
                LocalDate.of(2026, 7, 25),
                "Changed oil.",
                vehicleOne
        );

        MaintenanceLog logForVehicleTwo = new MaintenanceLog(
                null,
                "BRAKE_INSPECTION",
                29000,
                LocalDate.of(2026, 7, 25),
                "Checked brakes.",
                vehicleTwo
        );

        maintenanceLogRepository.save(logForVehicleOne);
        maintenanceLogRepository.save(logForVehicleTwo);

        List<MaintenanceLog> logs = maintenanceLogRepository.findByVehicleId(vehicleOne.getId());

        assertEquals(1, logs.size());
        assertEquals("OIL_CHANGE", logs.get(0).getServiceType());
    }

    @Test
    void deleteById_shouldRemoveMaintenanceLog() {
        Vehicle vehicle = vehicleRepository.save(
                new Vehicle(null, 2019, "Dodge", "Charger Scat Pack", 72000)
        );

        MaintenanceLog maintenanceLog = new MaintenanceLog(
                null,
                "BRAKE_INSPECTION",
                69000,
                LocalDate.of(2026, 7, 25),
                "Checked brake pads.",
                vehicle
        );

        MaintenanceLog savedLog = maintenanceLogRepository.save(maintenanceLog);

        maintenanceLogRepository.deleteById(savedLog.getId());

        Optional<MaintenanceLog> deletedLog = maintenanceLogRepository.findById(savedLog.getId());

        assertTrue(deletedLog.isEmpty());
    }
}