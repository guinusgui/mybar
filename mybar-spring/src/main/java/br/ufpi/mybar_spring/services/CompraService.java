package br.ufpi.mybar_spring.services;


import java.util.List;

import org.springframework.stereotype.Service;

import br.ufpi.mybar_spring.dto.mapper.CompraMapper;
import br.ufpi.mybar_spring.dto.objects.compra.CompraRequestDto;
import br.ufpi.mybar_spring.dto.objects.compra.CompraResponseDto;
import br.ufpi.mybar_spring.exceptions.custom.EntidadeNaoEncontrada;
import br.ufpi.mybar_spring.models.compras.Compra;
import br.ufpi.mybar_spring.models.conta.Conta;
import br.ufpi.mybar_spring.models.items.ItemDoCardapio;
import br.ufpi.mybar_spring.models.usuario.Usuario;
import br.ufpi.mybar_spring.repositories.CardapioRepo;
import br.ufpi.mybar_spring.repositories.CompraRepo;
import br.ufpi.mybar_spring.repositories.ContaRepo;
import br.ufpi.mybar_spring.repositories.UsuarioRepo;
import br.ufpi.mybar_spring.tools.Status;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompraService {
    
    private final CompraRepo compraRepo;
    private final UsuarioRepo usuarioRepo;
    private final ContaRepo contaRepo;
    private final CardapioRepo cardapioRepo;


    public List<CompraResponseDto> list() {
        return compraRepo.findAll().stream()
            .filter(e -> e.getAtivo() == Status.ATIVO)
            .map(CompraMapper::toDto)
            .toList();
    }

    public void adicionar_item(Long conta, CompraRequestDto dto){
        Conta c = contaRepo.findById(conta)
            .orElseThrow(() -> new EntidadeNaoEncontrada(
                "O numero fornecido para a conta não corresponde a nenhuma entidade"
            ));
        
        Usuario u = usuarioRepo.findById(dto.usuario())
            .orElseThrow(() -> new EntidadeNaoEncontrada(
                "O codigo fornecido para o usuario não corresponde a nenhuma entidade"
            ));
        
        ItemDoCardapio i = cardapioRepo.findById(dto.codigo())
            .orElseThrow(() -> new EntidadeNaoEncontrada(
                "O codigo fornecido para o item não corresponde a nenhuma entidade"
            ));
            
        
        for(Compra each : c.getItens_pendentes()) {
            if(each.getItem().getCodigo() == dto.codigo());
                each.setQuantidade(each.getQuantidade()+1);
                return;
        }

        Compra compra = new Compra();

        compra.setConta_associada(c);
        compra.setQuem_lancou(u);
        compra.setItem(i);

        c.getItens_pendentes().add(compra);

    }

    public void remover_item(CompraRequestDto dto) {//aqui, dto.codigo() é o id do pedido

        Compra c = compraRepo.findById(dto.codigo())
            .orElseThrow(
                () -> new EntidadeNaoEncontrada(
                    "O código não corresponde a nenhum pedido no sistema"
                )
            );

        Usuario u = usuarioRepo.findById(dto.usuario())
            .orElseThrow(
                () -> new EntidadeNaoEncontrada(
                    "O código fornecido não pertence a nenhum usuário"
                )
            );
        
        c.setAtivo(Status.INATIVO);
        c.setQuem_removeu(u);
        
    }


    

}
