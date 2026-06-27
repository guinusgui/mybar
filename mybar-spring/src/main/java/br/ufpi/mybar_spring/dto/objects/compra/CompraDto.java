package br.ufpi.mybar_spring.dto.objects.compra;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CompraDto(
    @NotNull @Positive Long codigo,
    @NotNull @Positive Long tipo,
    @NotNull @Positive Long usuario
) {
    
}
