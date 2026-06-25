package br.ufpi.mybar_spring.dto.dto.usuario;

import br.ufpi.mybar_spring.models.usuario.TipoDeUsuario;

public record UsuarioRequestDto(
    Long codigo,
    String nome,
    String email,
    String senha,
    TipoDeUsuario tipo
) {}
