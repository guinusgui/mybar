package br.ufpi.mybar_spring.dto.dto.cliente;

import br.ufpi.mybar_spring.models.cliente.ClienteSexo;

public record ClientePutDto(
    Long id,
    String nome,
    String telefone,
    ClienteSexo sexo
) {}
