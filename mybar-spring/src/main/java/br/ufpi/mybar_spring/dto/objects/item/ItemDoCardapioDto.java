package br.ufpi.mybar_spring.dto.objects.item;

import java.math.BigDecimal;

public record ItemDoCardapioDto(
    Long codigo,
    String desc,
    Long tipo,
    BigDecimal valor
) {
    
}
