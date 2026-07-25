package com.duke.maintenance.maintenance;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.duke.maintenance.vehicle.Vehicle;
import com.duke.maintenance.vehicle.VehicleRepository;

@RestController
@RequestMapping("/api/maintenance")
@CrossOrigin(origins = "http://localhost:3000")
public class MaintenanceLogController {

    private final MaintenanceLogRepository maintenanceLogRepository;
    private final VehicleRepository vehicleRepository;

    public MaintenanceLogController(
            MaintenanceLogRepository maintenanceLogRepository,
            VehicleRepository vehicleRepository
    ) {
        this.maintenanceLogRepository = maintenanceLogRepository;
        this.vehicleRepository = vehicleRepository;
    }

    @GetMapping("/vehicle/{vehicleId}")
    public List<MaintenanceLog> getLogsByVehicle(@PathVariable Long vehicleId) {
        return maintenanceLogRepository.findByVehicleId(vehicleId);
    }

    @PostMapping("/vehicle/{vehicleId}")
    public MaintenanceLog createLog(
            @PathVariable Long vehicleId,
            @RequestBody MaintenanceLog maintenanceLog
    ) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        maintenanceLog.setVehicle(vehicle);

        return maintenanceLogRepository.save(maintenanceLog);
    }

    @PutMapping("/{id}")
    public MaintenanceLog updateLog(
            @PathVariable Long id,
            @RequestBody MaintenanceLog updatedLog
    ) {
        MaintenanceLog existingLog = maintenanceLogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Maintenance log not found"));

        existingLog.setServiceType(updatedLog.getServiceType());
        existingLog.setMileagePerformed(updatedLog.getMileagePerformed());
        existingLog.setDatePerformed(updatedLog.getDatePerformed());
        existingLog.setNotes(updatedLog.getNotes());

        return maintenanceLogRepository.save(existingLog);
    }

    @DeleteMapping("/{id}")
    public void deleteLog(@PathVariable Long id) {
        maintenanceLogRepository.deleteById(id);
    }
}