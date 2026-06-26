package br.ufpi.mybar_spring.dto.objects.conta;

import br.ufpi.mybar_spring.models.conta.ContaStatus;

public record ContaRequestDto(
    Long numero,
    ContaStatus status,
    Long dono,
    Long quem_abriu
) {
    
}
