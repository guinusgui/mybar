package br.ufpi.mybar_spring.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.ufpi.mybar_spring.dto.mapper.ItemMapper;
import br.ufpi.mybar_spring.dto.objects.item.ItemDto;
import br.ufpi.mybar_spring.exceptions.custom.EntidadeNaoEncontrada;
import br.ufpi.mybar_spring.models.items.Item;
import br.ufpi.mybar_spring.repositories.ItemRepo;
import br.ufpi.mybar_spring.tools.Status;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemService {
    
    private final ItemRepo itemRepo;

    public List<ItemDto> list() {
        return itemRepo.findAll().stream()
            .map(ItemMapper::toDto)
            .toList();
    }

    public ItemDto findById(Long codigo) {
        return ItemMapper.toDto(
            itemRepo.findById(codigo)
                .orElseThrow(
                    () -> new EntidadeNaoEncontrada(
                        "O codigo fornecido não corresponde a nenhum item")
                ));
        
    }

    public ItemDto create(ItemDto dto) {
        return ItemMapper.toDto(
            itemRepo.save(ItemMapper.toEntity(dto))
        );
    }

    public void update(ItemDto dto) {
        
        Item u = itemRepo.findById(dto.codigo())
            .orElseThrow(() -> new EntidadeNaoEncontrada(
                "O codigo fornecido não corresponde a nenhum item"
            )
        );

        u.setDescricao(dto.descricao());
        u.setGorjeta(dto.gorjeta());
        u.setLoco(dto.loco());

        itemRepo.save(u);
    }

    public void delete(Long codigo) {
        Item i = itemRepo.findById(codigo)
            .orElseThrow(
                () -> new EntidadeNaoEncontrada(
                    "O codigo não pertence a nenhum tipo de item registrado"
                )
            );

        i.setAtividade(Status.INATIVO);
        itemRepo.save(i);
    }
}
