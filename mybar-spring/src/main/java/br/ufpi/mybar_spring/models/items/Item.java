package br.ufpi.mybar_spring.models.items;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
@Entity @Table(name = "tipos de item")
public class Item {
    
    @Id
    private Long codigo;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private BigDecimal gorjeta;

    @Enumerated(EnumType.STRING)
    private LocalDeProducao loco;
}
