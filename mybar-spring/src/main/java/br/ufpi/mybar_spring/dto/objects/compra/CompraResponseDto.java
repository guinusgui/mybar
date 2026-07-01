package br.ufpi.mybar_spring.dto.objects.compra;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonInclude;

import br.ufpi.mybar_spring.models.compras.EstadoDeProducao;
import br.ufpi.mybar_spring.models.items.LocalDeProducao;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record CompraResponseDto(
    Long id,
    Integer quantidade,
    LocalDeProducao loco,
    EstadoDeProducao estado,
    LocalDate data_solicitacao,
    LocalTime hora_solicitacao,
    LocalDate data_rebebimento,
    LocalTime hora_rebebimento,
    LocalDate data_entrega,
    LocalTime hora_entrega,
    Long conta,
    Long quem_lancou,
    Long quem_removeru
) {
    
}
