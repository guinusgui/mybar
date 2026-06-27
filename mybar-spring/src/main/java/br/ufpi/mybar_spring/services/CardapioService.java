package br.ufpi.mybar_spring.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.ufpi.mybar_spring.dto.mapper.ItemCardapioMapper;
import br.ufpi.mybar_spring.dto.objects.item.ItemDoCardapioDto;
import br.ufpi.mybar_spring.exceptions.custom.EntidadeNaoEncontrada;
import br.ufpi.mybar_spring.exceptions.custom.RequisicaoIlegal;
import br.ufpi.mybar_spring.models.items.Item;
import br.ufpi.mybar_spring.repositories.CardapioRepo;
import br.ufpi.mybar_spring.repositories.ItemRepo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardapioService {
    private final CardapioRepo cardapioRepo;
    private final ItemRepo itemRepo;


    public List<ItemDoCardapioDto> list() {
        return cardapioRepo.findAll().stream()
            .map(ItemCardapioMapper::toDto)
            .toList();
    }

    public ItemDoCardapioDto findById(Long id) {
        return ItemCardapioMapper.toDto(
            cardapioRepo.findById(id)
                .orElseThrow(
                    () -> new EntidadeNaoEncontrada(
                        "O numero fornecido não corresponde a nenhuma conta")
                ));
    }

    public ItemDoCardapioDto create(ItemDoCardapioDto dto) {
        Item i = itemRepo.findById(dto.tipo())
                .orElseThrow(() -> new EntidadeNaoEncontrada(
                    "O id fornecido não corresponde a nenhum cliente"
                )
            );
        
        if(!cardapioRepo.existsById(dto.codigo()))
            return ItemCardapioMapper.toDto(cardapioRepo.save(ItemCardapioMapper.toEntity(dto, i)));
            
        else
            throw new RequisicaoIlegal(
        "Tentativa de criar conta com número já registrado");
    }

    public void update(ItemDoCardapioDto dto) {
        Item i = itemRepo.findById(dto.tipo())
                .orElseThrow(() -> new EntidadeNaoEncontrada(
                    "O id fornecido não corresponde a nenhum cliente"
                )
            );

        if(cardapioRepo.existsById(dto.codigo()))
            cardapioRepo.save(ItemCardapioMapper.toEntity(dto, i));
        else
            throw new EntidadeNaoEncontrada(
        "A requisição não corresponde a nenhuma conta");
    }

    public void delete(Long numero) {
        if(!cardapioRepo.existsById(numero))
            throw new EntidadeNaoEncontrada(
        "O numero fornecido não corresponde a nenhuma conta"
        );
        try {
            cardapioRepo.deleteById(numero);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(
                "Requisição nula, impossível prosseguir", e
            );
        }
    }
}
