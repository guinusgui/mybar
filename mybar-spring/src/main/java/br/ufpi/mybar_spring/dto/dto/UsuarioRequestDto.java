package br.ufpi.mybar_spring.dto.dto;

import br.ufpi.mybar_spring.models.TipoDeUsuario;

public record UsuarioRequestDto(
    Long codigo,
    String nome,
    String email,
    String senha,
    TipoDeUsuario tipo
) {}
