package br.ufpi.mybar_spring.dto.objects.compra;

import java.time.LocalDate;
import java.time.LocalTime;

public record DataDto(
    LocalDate data,
    LocalTime hora
) {}
