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

import br.ufpi.mybar_spring.dto.objects.item.ItemDoCardapioDto;
import br.ufpi.mybar_spring.services.CardapioService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequestMapping("/api/cardapio")
@RequiredArgsConstructor
public class CardapioController {
     private final CardapioService cardapioService;

    @GetMapping
    public List<ItemDoCardapioDto> list() {
        return cardapioService.list();
    };

    @GetMapping("/{codigo}")
    public ItemDoCardapioDto findById(
        @NotNull(message = "O codigo do item deve ser não nulo")
        @Positive(message = "O codigo do item deve ser positivo")
        @PathVariable Long codigo
    ) {
        return cardapioService.findById(codigo);
        
    } 

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ItemDoCardapioDto create(
        @Valid
        @RequestBody ItemDoCardapioDto dto
    ) {
        return cardapioService.create(dto);
    }

    @PutMapping
    public void update(
        @Valid
        @RequestBody ItemDoCardapioDto dto
    ) {
         
        cardapioService.update(dto);
            
    }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
        @NotNull(message = "O codigo do item deve ser não nulo")
        @Positive(message = "O codigo do item deve ser positivo")
        @PathVariable Long codigo
    ) {
        cardapioService.delete(codigo);
    }
}
