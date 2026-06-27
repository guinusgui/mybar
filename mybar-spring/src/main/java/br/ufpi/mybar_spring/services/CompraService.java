package br.ufpi.mybar_spring.services;


import org.springframework.stereotype.Service;

import br.ufpi.mybar_spring.dto.objects.compra.CompraDto;
import br.ufpi.mybar_spring.exceptions.custom.EntidadeNaoEncontrada;
import br.ufpi.mybar_spring.exceptions.custom.RequisicaoIlegal;
import br.ufpi.mybar_spring.models.compras.Compra;
import br.ufpi.mybar_spring.models.conta.Conta;
import br.ufpi.mybar_spring.models.items.ItemDoCardapio;
import br.ufpi.mybar_spring.models.usuario.Usuario;
import br.ufpi.mybar_spring.repositories.CardapioRepo;
import br.ufpi.mybar_spring.repositories.CompraRepo;
import br.ufpi.mybar_spring.repositories.ContaRepo;
import br.ufpi.mybar_spring.repositories.UsuarioRepo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompraService {
    
    private final CompraRepo compraRepo;
    private final UsuarioRepo usuarioRepo;
    private final ContaRepo contaRepo;
    private final CardapioRepo cardapioRepo;


    public void adicionar_item(Long conta, CompraDto dto){
        Conta c = contaRepo.findById(conta)
            .orElseThrow(() -> new EntidadeNaoEncontrada(
                "O numero fornecido para a conta não corresponde a nenhuma entidade"
            ));
        
        Usuario u = usuarioRepo.findById(dto.usuario())
            .orElseThrow(() -> new EntidadeNaoEncontrada(
                "O codigo fornecido para o usuario não corresponde a nenhuma entidade"
            ));
        
        ItemDoCardapio i = cardapioRepo.findById(dto.tipo())
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

    public void remover_item(Long conta, CompraDto dto) {
        Conta c = contaRepo.findById(conta)
            .orElseThrow(() -> new EntidadeNaoEncontrada(
                "O numero fornecido para a conta não corresponde a nenhuma entidade"
            ));

        
        Compra compra = compraRepo.findById(dto.codigo())
            .orElseThrow(() -> new EntidadeNaoEncontrada(
                "O codigo fornecido para o pedido não corresponde a nenhuma entidade"
            ));
        
        if(compra.getConta_associada().getNumero() != conta)
            throw new RequisicaoIlegal(
                "O pedido informado pertence a outra conta"
        );
        
        Usuario u = usuarioRepo.findById(dto.usuario())
            .orElseThrow(() -> new EntidadeNaoEncontrada(
                "O codigo fornecido para o usuario não corresponde a nenhuma entidade"
            ));

        
    }
    

}
