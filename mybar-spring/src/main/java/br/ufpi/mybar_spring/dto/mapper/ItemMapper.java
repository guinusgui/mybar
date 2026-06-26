package br.ufpi.mybar_spring.dto.mapper;

import br.ufpi.mybar_spring.dto.objects.item.ItemDto;
import br.ufpi.mybar_spring.models.items.Item;

public class ItemMapper {
    
    public static ItemDto toDto(Item i) {
        return new ItemDto(
            i.getCodigo(),
            i.getDescricao(),
            i.getGorjeta(),
            i.getLoco()
        );
    }

    public static Item toEntity(ItemDto dto) {
        Item i = new Item();
        
        i.setCodigo(dto.codigo());
        i.setDescricao(dto.descricao());
        i.setGorjeta(dto.gorjeta());
        i.setLoco(i.getLoco());

        return i;
    }
}
