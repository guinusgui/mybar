package br.ufpi.mybar_spring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.ufpi.mybar_spring.dto.dto.usuario.UsuarioRequestDto;
import br.ufpi.mybar_spring.dto.dto.usuario.UsuarioResponseDto;
import br.ufpi.mybar_spring.services.UsuarioService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping
    public List<UsuarioResponseDto> list() {
        return usuarioService.list();
    };

    @GetMapping("/{codigo}")
    public UsuarioResponseDto findById(
        @NotNull(message = "O id fornecido é nulo")
        @Positive(message = "O id fornecido deve ser positivo")
        @PathVariable 
        Long codigo
    ) {
        return usuarioService.findById(codigo);
    } 

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponseDto create(
        @Valid
        @RequestBody UsuarioRequestDto dto
    ) {
        return usuarioService.create(dto);
    }

    @PutMapping
    public void update(
        @Valid
        @RequestBody UsuarioRequestDto dto
    ) {
        usuarioService.update(dto);
    }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
        @NotNull(message = "O id não pode ser nulo")
        @Positive(message = "O id deve ser positivo")
        @PathVariable Long codigo
    ) {
        usuarioService.delete(codigo);
    }
}
