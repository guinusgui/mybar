package br.ufpi.mybar_spring.dto.dto.conta;

import java.time.LocalDate;
import java.time.LocalTime;

import br.ufpi.mybar_spring.models.cliente.Cliente;
import br.ufpi.mybar_spring.models.conta.ContaStatus;
import br.ufpi.mybar_spring.models.usuario.Usuario;

public record ContaResponseDto(
    Long numero,
    ContaStatus status,
    LocalDate data,
    LocalTime hora,
    Cliente dono,
    Usuario quem_abriu
) {
    
}
