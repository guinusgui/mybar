package br.ufpi.mybar_spring.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.ufpi.mybar_spring.dto.objects.compra.CompraRequestDto;
import br.ufpi.mybar_spring.dto.objects.compra.CompraResponseDto;
import br.ufpi.mybar_spring.services.CompraService;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
public class CompraController {
    
    private final CompraService compraService;

    @GetMapping
    public List<CompraResponseDto> list() {
        return compraService.list();
    }

    @PostMapping("/{conta}")
    @ResponseStatus(HttpStatus.CREATED)
    public void adicionar_item(
        @PathVariable Long conta, 
        @RequestBody CompraRequestDto dto
    ) {
        compraService.adicionar_item(conta, dto);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover_item(
        @RequestBody CompraRequestDto dto
    ) {
        remover_item(dto);
    }
}
