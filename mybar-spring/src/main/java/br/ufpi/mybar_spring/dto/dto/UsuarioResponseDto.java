package br.ufpi.mybar_spring.dto.dto;

import br.ufpi.mybar_spring.models.TipoDeUsuario;

public record UsuarioResponseDto(
    Long codigo,
    String nome,
    String email,
    TipoDeUsuario tipo
) {}
