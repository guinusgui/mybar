package br.ufpi.mybar_spring.dto.mapper;

import br.ufpi.mybar_spring.dto.objects.item.ItemDoCardapioDto;
import br.ufpi.mybar_spring.models.items.Item;
import br.ufpi.mybar_spring.models.items.ItemDoCardapio;

public class ItemCardapioMapper {
     
    public static ItemDoCardapioDto toDto(ItemDoCardapio c) {
        return new ItemDoCardapioDto(
            c.getCodigo(),
            c.getDescricao(),
            c.getTipo().getCodigo(),
            c.getValor()
        ); 
    }

    public static ItemDoCardapio toEntity(ItemDoCardapioDto dto, Item i) {
        ItemDoCardapio c = new ItemDoCardapio();
        c.setCodigo(dto.codigo());
        c.setDescricao(dto.desc());
        c.setTipo(i);
        c.setValor(dto.valor());
        return c;
    }
}
