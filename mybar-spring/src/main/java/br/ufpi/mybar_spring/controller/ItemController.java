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

import br.ufpi.mybar_spring.dto.objects.item.ItemDto;
import br.ufpi.mybar_spring.services.ItemService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@Validated
@RestController
@RequestMapping("/api/itens")
@RequiredArgsConstructor
public class ItemController {
    
    private final ItemService itemService;

    @GetMapping
    public List<ItemDto> list() {
        return itemService.list();
    };

    @GetMapping("/{codigo}")
    public ItemDto findById(
        @NotNull(message = "O codigo fornecido é nulo")
        @Positive(message = "O codigo fornecido deve ser positivo")
        @PathVariable 
        Long codigo
    ) {
        return itemService.findById(codigo);
    } 

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ItemDto create(
        @Valid
        @RequestBody ItemDto dto
    ) {
        return itemService.create(dto);
    }

    @PutMapping
    public void update(
        @Valid
        @RequestBody ItemDto dto
    ) {
        itemService.update(dto);
    }

    @DeleteMapping("/{codigo}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
        @NotNull(message = "O codigo não pode ser nulo")
        @Positive(message = "O codigo deve ser positivo")
        @PathVariable Long codigo
    ) {
        itemService.delete(codigo);
    }
}

