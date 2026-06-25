package br.ufpi.mybar_spring.dto.dto.cliente;

import br.ufpi.mybar_spring.models.cliente.ClienteSexo;

public record ClienteStandartDto(
    Long id,
    String nome,
    String cpf,
    String telefone,
    ClienteSexo sexo
) {}
