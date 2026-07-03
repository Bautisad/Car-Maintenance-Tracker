package com.duke.maintenance.maintenance;

import java.time.LocalDate;

import com.duke.maintenance.vehicle.Vehicle;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "maintenance_log")
public class MaintenanceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceType;
    private Integer mileagePerformed;
    private LocalDate datePerformed;
    private String notes;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    public MaintenanceLog() {
    }

    public MaintenanceLog(
            Long id,
            String serviceType,
            Integer mileagePerformed,
            LocalDate datePerformed,
            String notes,
            Vehicle vehicle
    ) {
        this.id = id;
        this.serviceType = serviceType;
        this.mileagePerformed = mileagePerformed;
        this.datePerformed = datePerformed;
        this.notes = notes;
        this.vehicle = vehicle;
    }

    public Long getId() {
        return id;
    }

    public String getServiceType() {
        return serviceType;
    }

    public Integer getMileagePerformed() {
        return mileagePerformed;
    }

    public LocalDate getDatePerformed() {
        return datePerformed;
    }

    public String getNotes() {
        return notes;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public void setMileagePerformed(Integer mileagePerformed) {
        this.mileagePerformed = mileagePerformed;
    }

    public void setDatePerformed(LocalDate datePerformed) {
        this.datePerformed = datePerformed;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }
}