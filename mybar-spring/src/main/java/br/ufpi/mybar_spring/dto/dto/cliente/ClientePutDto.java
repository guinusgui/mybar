package br.ufpi.mybar_spring.dto.dto.cliente;

import br.ufpi.mybar_spring.models.cliente.ClienteSexo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record ClientePutDto(
    @NotNull Long id,
    @NotBlank String nome,
    @NotBlank @Pattern(regexp = "^(\\(?\\d{2}\\)?\\s?)?[2-9]\\d{3,4}[-\\s]?\\d{4}$") String telefone,
    @NotNull ClienteSexo sexo
) {}
