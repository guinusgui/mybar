package br.ufpi.mybar_spring.dto.objects.compra;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CompraRequestDto(
    @NotNull @Positive Long codigo,
    @NotNull @Positive Long usuario
) {
    
}
