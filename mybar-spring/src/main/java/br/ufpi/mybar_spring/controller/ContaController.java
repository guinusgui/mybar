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

import br.ufpi.mybar_spring.dto.dto.conta.ContaRequestDto;
import br.ufpi.mybar_spring.dto.dto.conta.ContaResponseDto;
import br.ufpi.mybar_spring.services.ContaService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/contas")
@RequiredArgsConstructor
public class ContaController {
    
    private final ContaService contaService;

    @GetMapping
    public List<ContaResponseDto> list() {
        return contaService.list();
    }
    
    @GetMapping("/{numero}")
    public ContaResponseDto findById(@PathVariable Long numero) {
        return contaService.findById(numero);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContaResponseDto create(@RequestBody ContaRequestDto dto) {
        return contaService.create(dto);
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody ContaRequestDto dto) {
        try {
            return ResponseEntity.ok().build();
        } catch(Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{numero}")
    public ResponseEntity<Void> delete(Long numero) {
        try {
            contaService.delete(numero);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
}
