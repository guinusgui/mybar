package br.ufpi.mybar_spring.models.compras;

import java.time.LocalDate;
import java.time.LocalTime;

import br.ufpi.mybar_spring.models.conta.Conta;
import br.ufpi.mybar_spring.models.items.ItemDoCardapio;
import br.ufpi.mybar_spring.models.items.LocalDeProducao;
import br.ufpi.mybar_spring.models.usuario.Usuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Entity @Table(name = "pedidos_pendentes")
public class Compra {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer quantidade = 1;

    @Column(nullable = false)
    private LocalDeProducao loco;
    
    private LocalDate data_solicitacao = LocalDate.now();
    private LocalTime hora_solicitacao = LocalTime.now();

    private LocalDate data_recebimento;
    private LocalTime hora_recebimento;

    private LocalDate data_entrega;
    private LocalTime hora_entrega;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        foreignKey = @ForeignKey(name = "fk_conta_associada")
    )
    private Conta conta_associada;

    @Enumerated(EnumType.STRING)
    private EstadoDeProducao status = EstadoDeProducao.SOLICITADO;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        foreignKey = @ForeignKey(name = "fk_item")
    )
    private ItemDoCardapio item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        foreignKey = @ForeignKey(name = "fk_quem_lancou")
    )
    private Usuario quem_lancou;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        foreignKey = @ForeignKey(name = "fk_quem_removeu")
    )
    private Usuario quem_removeu;

}
