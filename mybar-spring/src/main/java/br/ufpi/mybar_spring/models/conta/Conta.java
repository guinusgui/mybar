package br.ufpi.mybar_spring.models.conta;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import br.ufpi.mybar_spring.models.cliente.Cliente;
import br.ufpi.mybar_spring.models.compras.Compra;
import br.ufpi.mybar_spring.models.usuario.Usuario;
import br.ufpi.mybar_spring.tools.Status;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
@Entity @Table(name = "contas")
public class Conta {

    @Id
    private Long numero;


    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ContaStatus status;

    @Column(nullable = false)
    private LocalDate data_da_abertura = LocalDate.now();

    @Column(nullable = false)
    private LocalTime hora_da_abertura = LocalTime.now();

   
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        foreignKey = @ForeignKey(name = "fk_dono")
    )
    private Cliente dono;

    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        foreignKey = @ForeignKey(name = "fk_quem_abriu_conta")
    )
    private Usuario quem_abriu;

    @OneToMany(
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        mappedBy = "conta_associada"
    )
    private List<Compra> itens_pendentes;

    private Status atividade = Status.INATIVO;
    
}
