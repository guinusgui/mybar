package br.ufpi.mybar_spring.dto.objects.item;

import java.math.BigDecimal;

import br.ufpi.mybar_spring.models.items.LocalDeProducao;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ItemDto(
    @NotNull Long codigo,
    @NotBlank String descricao,
    @NotNull @Positive BigDecimal gorjeta,
    @NotNull LocalDeProducao loco
) {
    
}
