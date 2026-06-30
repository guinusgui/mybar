package br.ufpi.mybar_spring.models.compras;

import br.ufpi.mybar_spring.models.conta.Conta;
import br.ufpi.mybar_spring.models.usuario.Usuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
@Entity @Table(name = "pagamentos")
public class Pagamento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private TiposDePagamento metodo;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        foreignKey = @ForeignKey(name = "fk_conta_associada_pagamento")
    )
    private Conta conta_associada;

    @ManyToOne
    @JoinColumn(
        foreignKey = @ForeignKey(name = "fk_quem_lancou_pagamento")
    )
    private Usuario quem_lancou;

    @ManyToOne
    @JoinColumn(
        foreignKey = @ForeignKey(name = "fk_quem_excluiu_pagamento")
    )
    private Usuario quem_excluiu;
}
