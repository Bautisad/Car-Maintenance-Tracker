package com.duke.maintenance.vehicle;

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

@WebMvcTest(VehicleController.class)
class VehicleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private VehicleRepository vehicleRepository;

    @Test
    void getAllVehicles_shouldReturnVehicleList() throws Exception {
        Vehicle vehicle = new Vehicle(
                1L,
                2019,
                "Dodge",
                "Charger Scat Pack",
                72000
        );

        given(vehicleRepository.findAll()).willReturn(List.of(vehicle));

        mockMvc.perform(get("/api/vehicles"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].year").value(2019))
                .andExpect(jsonPath("$[0].make").value("Dodge"))
                .andExpect(jsonPath("$[0].model").value("Charger Scat Pack"))
                .andExpect(jsonPath("$[0].currentMileage").value(72000));
    }

    @Test
    void getVehicleById_shouldReturnVehicle() throws Exception {
        Vehicle vehicle = new Vehicle(
                1L,
                2019,
                "Dodge",
                "Charger Scat Pack",
                72000
        );

        given(vehicleRepository.findById(1L)).willReturn(Optional.of(vehicle));

        mockMvc.perform(get("/api/vehicles/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.year").value(2019))
                .andExpect(jsonPath("$.make").value("Dodge"))
                .andExpect(jsonPath("$.model").value("Charger Scat Pack"))
                .andExpect(jsonPath("$.currentMileage").value(72000));
    }

    @Test
    void createVehicle_shouldReturnSavedVehicle() throws Exception {
        given(vehicleRepository.save(any(Vehicle.class))).willAnswer(invocation -> {
            Vehicle vehicle = invocation.getArgument(0);
            vehicle.setId(1L);
            return vehicle;
        });

        String vehicleJson = """
                {
                  "year": 2019,
                  "make": "Dodge",
                  "model": "Charger Scat Pack",
                  "currentMileage": 72000
                }
                """;

        mockMvc.perform(post("/api/vehicles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(vehicleJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.year").value(2019))
                .andExpect(jsonPath("$.make").value("Dodge"))
                .andExpect(jsonPath("$.model").value("Charger Scat Pack"))
                .andExpect(jsonPath("$.currentMileage").value(72000));
    }

    @Test
    void updateVehicle_shouldReturnUpdatedVehicle() throws Exception {
        Vehicle existingVehicle = new Vehicle(
                1L,
                2019,
                "Dodge",
                "Charger Scat Pack",
                72000
        );

        given(vehicleRepository.findById(1L)).willReturn(Optional.of(existingVehicle));
        given(vehicleRepository.save(any(Vehicle.class))).willAnswer(invocation -> invocation.getArgument(0));

        String updatedVehicleJson = """
                {
                  "year": 2019,
                  "make": "Dodge",
                  "model": "Charger Scat Pack",
                  "currentMileage": 75000
                }
                """;

        mockMvc.perform(put("/api/vehicles/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedVehicleJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.currentMileage").value(75000));
    }

    @Test
    void deleteVehicle_shouldDeleteVehicle() throws Exception {
        mockMvc.perform(delete("/api/vehicles/1"))
                .andExpect(status().isOk());

        verify(vehicleRepository).deleteById(1L);
    }
}