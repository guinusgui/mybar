package br.ufpi.mybar_spring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.ufpi.mybar_spring.dto.dto.UsuarioRequestDto;
import br.ufpi.mybar_spring.dto.dto.UsuarioResponseDto;
import br.ufpi.mybar_spring.services.UsuarioService;
import lombok.RequiredArgsConstructor;

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
    public ResponseEntity<UsuarioResponseDto> findById(@PathVariable Long codigo) {
        try {
            return ResponseEntity.ok(usuarioService.findById(codigo));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    } 

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponseDto create(@RequestBody UsuarioRequestDto dto) {
        return usuarioService.create(dto);
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody UsuarioRequestDto dto) {
        
        try {  
            usuarioService.update(dto);
            return ResponseEntity.ok().build();
        } catch(Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<Void> delete(@PathVariable Long codigo) {
        try {
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }
}
