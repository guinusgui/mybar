package br.ufpi.mybar_spring.dto.dto.erro;

import java.time.LocalDateTime;

public record ErroDto(
    LocalDateTime timestamp,
    Integer status,
    String error,
    String message,
    String path
) {}
