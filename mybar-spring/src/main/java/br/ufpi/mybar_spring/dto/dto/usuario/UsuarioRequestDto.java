package br.ufpi.mybar_spring.dto.dto.usuario;

import br.ufpi.mybar_spring.models.usuario.TipoDeUsuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record UsuarioRequestDto(
    @NotNull(message = "O código é obrigatório")
    @Positive(message = "O código deve ser positivo")
    Long codigo,

    @NotBlank(message = "O nome é obrigatório")
    String nome,

    @NotBlank(message = "O email é obrigatório")
    @Email(message = "O email fornecido não é válido")
    String email,

    @NotBlank(message = "A senha é obrigatória")
    String senha,

    @NotNull(message = "O tipo do usuário é obrigatório")
    TipoDeUsuario tipo
) {}
