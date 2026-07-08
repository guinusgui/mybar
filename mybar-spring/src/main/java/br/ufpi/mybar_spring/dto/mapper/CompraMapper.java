package br.ufpi.mybar_spring.dto.mapper;

import br.ufpi.mybar_spring.dto.objects.compra.CompraResponseDto;
import br.ufpi.mybar_spring.models.compras.Compra;

public class CompraMapper {
    
    public static CompraResponseDto toDto(Compra c) {
        return new CompraResponseDto(
            c.getId(),
            c.getQuantidade(),
            // c.getLoco(),
            c.getStatus(),
            c.getData_solicitacao(),
            c.getHora_solicitacao(),
            c.getData_recebimento(),
            c.getHora_recebimento(),
            c.getData_entrega(),
            c.getHora_entrega(),
            c.getConta_associada().getNumero(),
            c.getQuem_lancou().getCodigo(),
            c.getQuem_removeu().getCodigo()
        );
    }
}
