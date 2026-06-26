package br.ufpi.mybar_spring.dto.dto.cliente;

import org.hibernate.validator.constraints.br.CPF;

import br.ufpi.mybar_spring.models.cliente.ClienteSexo;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record ClienteStandartDto(
    Long id,
    @NotBlank String nome,
    @NotBlank @CPF String cpf,
    @NotBlank @Pattern(
        regexp = "\\(?\\d{2}\\)?\\s?\\d{4,5}-?\\d{4}",
    message = "Telefone deve estar em formato: 99999999999 ou (99) 99999-9999") String telefone,
    @NotNull ClienteSexo sexo
) {}
