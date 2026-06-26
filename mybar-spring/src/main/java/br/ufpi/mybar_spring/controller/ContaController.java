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

import br.ufpi.mybar_spring.dto.dto.conta.ContaRequestDto;
import br.ufpi.mybar_spring.dto.dto.conta.ContaResponseDto;
import br.ufpi.mybar_spring.services.ContaService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@Validated
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
    public ContaResponseDto findById(
        @NotNull(message = "O número da conta deve ser não nulo")
        @Positive(message = "O número da conta deve ser positivo")
        @PathVariable Long numero
    ) {
        return contaService.findById(numero);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContaResponseDto create(
        @Valid
        @RequestBody ContaRequestDto dto
    ) {
        return contaService.create(dto);
    }

    @PutMapping
    public void update(@RequestBody ContaRequestDto dto) {
            contaService.update(dto);
    }

    @DeleteMapping("/{numero}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
        @NotNull(message = "O número da conta deve ser não nulo")
        @Positive(message = "O número da conta deve ser positivo")
        Long numero
    ) {
        
        contaService.delete(numero);
           
    }
    
}
