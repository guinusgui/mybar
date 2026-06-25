package br.ufpi.mybar_spring.models.conta;

import java.time.LocalDate;
import java.time.LocalTime;

import br.ufpi.mybar_spring.models.cliente.Cliente;
import br.ufpi.mybar_spring.models.usuario.Usuario;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
@Entity @Table(name = "contas")
public class Conta {

    @Id
    @NotNull
    private Long numero;

    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ContaStatus status;

    @Column(nullable = false)
    private LocalDate data_da_abertura = LocalDate.now();

    @Column(nullable = false)
    private LocalTime hora_da_abertura = LocalTime.now();

    @Valid
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        foreignKey = @ForeignKey(name = "fk_dono")
    )
    private Cliente dono;

    @Valid
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        foreignKey = @ForeignKey(name = "fk_quem_abriu")
    )
    private Usuario quem_abriu;
}
