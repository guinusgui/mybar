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

import br.ufpi.mybar_spring.dto.dto.cliente.ClientePutDto;
import br.ufpi.mybar_spring.dto.dto.cliente.ClienteStandartDto;
import br.ufpi.mybar_spring.services.ClienteService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
public class ClienteController {
    
    private final ClienteService clienteService;

    @GetMapping
    public List<ClienteStandartDto> list() {
        return clienteService.list();
    };

    @GetMapping("/{id}")
    public ResponseEntity<ClienteStandartDto> findById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(clienteService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    } 

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ClienteStandartDto create(@RequestBody ClienteStandartDto dto) {
        return clienteService.create(dto);
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody ClientePutDto dto) {
        
        try {  
            clienteService.update(dto);
            return ResponseEntity.ok().build();
        } catch(Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }
}
