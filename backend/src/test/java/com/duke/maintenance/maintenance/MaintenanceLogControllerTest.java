package com.duke.maintenance.maintenance;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.duke.maintenance.vehicle.Vehicle;
import com.duke.maintenance.vehicle.VehicleRepository;

@WebMvcTest(MaintenanceLogController.class)
class MaintenanceLogControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private MaintenanceLogRepository maintenanceLogRepository;

    @MockitoBean
    private VehicleRepository vehicleRepository;

    @Test
    void getLogsByVehicle_shouldReturnMaintenanceLogs() throws Exception {
        Vehicle vehicle = new Vehicle(
                1L,
                2019,
                "Dodge",
                "Charger Scat Pack",
                72000
        );

        MaintenanceLog maintenanceLog = new MaintenanceLog(
                1L,
                "OIL_CHANGE",
                70000,
                LocalDate.of(2026, 7, 25),
                "Changed oil and filter.",
                vehicle
        );

        given(maintenanceLogRepository.findByVehicleId(1L))
                .willReturn(List.of(maintenanceLog));

        mockMvc.perform(get("/api/maintenance/vehicle/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].serviceType").value("OIL_CHANGE"))
                .andExpect(jsonPath("$[0].mileagePerformed").value(70000))
                .andExpect(jsonPath("$[0].datePerformed").value("2026-07-25"))
                .andExpect(jsonPath("$[0].notes").value("Changed oil and filter."))
                .andExpect(jsonPath("$[0].vehicle.id").value(1));
    }

    @Test
    void createLog_shouldReturnSavedMaintenanceLog() throws Exception {
        Vehicle vehicle = new Vehicle(
                1L,
                2019,
                "Dodge",
                "Charger Scat Pack",
                72000
        );

        given(vehicleRepository.findById(1L)).willReturn(Optional.of(vehicle));

        given(maintenanceLogRepository.save(any(MaintenanceLog.class)))
                .willAnswer(invocation -> {
                    MaintenanceLog maintenanceLog = invocation.getArgument(0);
                    maintenanceLog.setId(1L);
                    return maintenanceLog;
                });

        String requestBody = """
                {
                  "serviceType": "OIL_CHANGE",
                  "mileagePerformed": 70000,
                  "datePerformed": "2026-07-25",
                  "notes": "Changed oil and filter."
                }
                """;

        mockMvc.perform(post("/api/maintenance/vehicle/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.serviceType").value("OIL_CHANGE"))
                .andExpect(jsonPath("$.mileagePerformed").value(70000))
                .andExpect(jsonPath("$.datePerformed").value("2026-07-25"))
                .andExpect(jsonPath("$.notes").value("Changed oil and filter."))
                .andExpect(jsonPath("$.vehicle.id").value(1));
    }

    @Test
    void updateLog_shouldReturnUpdatedMaintenanceLog() throws Exception {
        Vehicle vehicle = new Vehicle(
                1L,
                2019,
                "Dodge",
                "Charger Scat Pack",
                72000
        );

        MaintenanceLog existingLog = new MaintenanceLog(
                1L,
                "OIL_CHANGE",
                70000,
                LocalDate.of(2026, 7, 25),
                "Changed oil.",
                vehicle
        );

        given(maintenanceLogRepository.findById(1L))
                .willReturn(Optional.of(existingLog));

        given(maintenanceLogRepository.save(any(MaintenanceLog.class)))
                .willAnswer(invocation -> invocation.getArgument(0));

        String requestBody = """
                {
                  "serviceType": "OIL_CHANGE",
                  "mileagePerformed": 75000,
                  "datePerformed": "2026-07-26",
                  "notes": "Updated mileage after service."
                }
                """;

        mockMvc.perform(put("/api/maintenance/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.serviceType").value("OIL_CHANGE"))
                .andExpect(jsonPath("$.mileagePerformed").value(75000))
                .andExpect(jsonPath("$.datePerformed").value("2026-07-26"))
                .andExpect(jsonPath("$.notes").value("Updated mileage after service."));
    }

    @Test
    void deleteLog_shouldDeleteMaintenanceLog() throws Exception {
        mockMvc.perform(delete("/api/maintenance/1"))
                .andExpect(status().isOk());

        verify(maintenanceLogRepository).deleteById(1L);
    }
}