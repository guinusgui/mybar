package br.ufpi.mybar_spring.models.cliente;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
@Entity @Table(name = "clientes")
public class Cliente {
    
    @Id
    @Column(nullable = false, unique = true)
    private String cpf;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String telefone;

    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ClienteSexo sexo;

    


}
