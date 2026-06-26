package br.ufpi.mybar_spring.dto.objects.usuario;

import br.ufpi.mybar_spring.models.usuario.TipoDeUsuario;

public record UsuarioResponseDto(
    Long codigo,
    String nome,
    String email,
    TipoDeUsuario tipo
) {}
