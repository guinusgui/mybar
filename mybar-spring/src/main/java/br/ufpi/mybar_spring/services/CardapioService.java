package br.ufpi.mybar_spring.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.ufpi.mybar_spring.dto.mapper.ItemCardapioMapper;
import br.ufpi.mybar_spring.dto.objects.item.ItemDoCardapioDto;
import br.ufpi.mybar_spring.exceptions.custom.EntidadeNaoEncontrada;
import br.ufpi.mybar_spring.exceptions.custom.RequisicaoIlegal;
import br.ufpi.mybar_spring.models.items.Item;
import br.ufpi.mybar_spring.models.items.ItemDoCardapio;
import br.ufpi.mybar_spring.repositories.CardapioRepo;
import br.ufpi.mybar_spring.repositories.ItemRepo;
import br.ufpi.mybar_spring.tools.Status;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardapioService {
    private final CardapioRepo cardapioRepo;
    private final ItemRepo itemRepo;


    public List<ItemDoCardapioDto> list() {
        return cardapioRepo.findAll().stream()
            .filter(a -> a.getAtividade().equals(Status.ATIVO))
            .map(ItemCardapioMapper::toDto)
            .toList();
    }

    public ItemDoCardapioDto findById(Long id) {
        return ItemCardapioMapper.toDto(
            cardapioRepo.findById(id)
                .orElseThrow(
                    () -> new EntidadeNaoEncontrada(
                        "O codigo fornecido não corresponde a nenhum item")
                ));
    }

    public ItemDoCardapioDto create(ItemDoCardapioDto dto) {
        Item i = itemRepo.findById(dto.tipo())
                .orElseThrow(() -> new EntidadeNaoEncontrada(
                    "O codigo fornecido não corresponde a nenhum tipo de item"
                )
            );
        
        if(!cardapioRepo.existsById(dto.codigo()))
            return ItemCardapioMapper.toDto(cardapioRepo.save(ItemCardapioMapper.toEntity(dto, i)));
            
        else
            throw new RequisicaoIlegal(
        "Já há um item com o código enviado");
    }

    public void update(ItemDoCardapioDto dto) {
        Item i = itemRepo.findById(dto.tipo())
                .orElseThrow(() -> new EntidadeNaoEncontrada(
                    "O código fornecido não corresponde a nenhum item"
                )
            );

        if(cardapioRepo.existsById(dto.codigo()))
            cardapioRepo.save(ItemCardapioMapper.toEntity(dto, i));
        else
            throw new EntidadeNaoEncontrada(
        "A requisição não corresponde a nenhuma conta");
    }

    public void delete(Long numero) {
        ItemDoCardapio i = cardapioRepo.findById(numero)
        .orElseThrow(
            () -> new EntidadeNaoEncontrada(
                "O número não pertence a nenhum item no cardápio"
            )
        );

        i.setAtividade(Status.INATIVO);
        cardapioRepo.save(i);
    }
}
