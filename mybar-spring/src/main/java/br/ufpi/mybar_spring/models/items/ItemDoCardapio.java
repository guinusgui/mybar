package br.ufpi.mybar_spring.models.items;

import java.math.BigDecimal;

import br.ufpi.mybar_spring.tools.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
@Entity @Table(name = "cardapio")
public class ItemDoCardapio {
    
    @Id
    private Long codigo;

    @Column(nullable = false)
    private String descricao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        foreignKey = @ForeignKey(name = "fk_tipo_cardapio")
    )
    private Item tipo;
    
    @Column(nullable = false)
    private BigDecimal valor;

    private Status atividade = Status.ATIVO;


}
