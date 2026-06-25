package br.ufpi.mybar_spring.dto.mapper;

import br.ufpi.mybar_spring.dto.dto.cliente.ClienteStandartDto;
import br.ufpi.mybar_spring.models.cliente.Cliente;

public class ClienteMapper {
    
    public static ClienteStandartDto toDto(Cliente c) {
        return new ClienteStandartDto(
            c.getId(),
            c.getNome(),
            c.getCpf(),
            c.getTelefone(),
            c.getSexo()
        );
    }

    public static Cliente toEntity(ClienteStandartDto dto) {
        Cliente c = new Cliente();
        c.setId(dto.id());
        c.setNome(dto.nome());
        c.setCpf(dto.cpf());
        c.setTelefone(dto.telefone());
        c.setSexo(dto.sexo());
        return c;
    }
}
