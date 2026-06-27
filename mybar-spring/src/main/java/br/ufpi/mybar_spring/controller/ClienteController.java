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

import br.ufpi.mybar_spring.dto.objects.cliente.ClienteDto;
import br.ufpi.mybar_spring.services.ClienteService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
public class ClienteController {
    
    private final ClienteService clienteService;

    @GetMapping
    public List<ClienteDto> list() {
        return clienteService.list();
    };

    @GetMapping("/{cpf}")
    public ClienteDto findById(
        @NotNull(message = "O id do usuário deve ser não nulo")
        @Positive(message = "O id do usuário deve ser positivo")
        @PathVariable String cpf
    ) {
        return clienteService.findById(cpf);
        
    } 

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ClienteDto create(
        @Valid
        @RequestBody ClienteDto dto
    ) {
        return clienteService.create(dto);
    }

    @PutMapping
    public void update(
        @Valid
        @RequestBody ClienteDto dto
    ) {
         
        clienteService.update(dto);
            
    }

    @DeleteMapping("/{cpf}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
        @NotNull(message = "O id do usuário deve ser não nulo")
        @Positive(message = "O id do usuário deve ser positivo")
        @PathVariable String cpf
    ) {
        clienteService.delete(cpf);
    }
}
