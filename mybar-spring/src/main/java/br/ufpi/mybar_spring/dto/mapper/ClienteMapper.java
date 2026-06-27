package br.ufpi.mybar_spring.dto.mapper;

import br.ufpi.mybar_spring.dto.objects.cliente.ClienteDto;
import br.ufpi.mybar_spring.models.cliente.Cliente;

public class ClienteMapper {
    
    public static ClienteDto toDto(Cliente c) {
        return new ClienteDto(
            c.getNome(),
            c.getCpf(),
            c.getTelefone(),
            c.getSexo()
        );
    }

    public static Cliente toEntity(ClienteDto dto) {
        Cliente c = new Cliente();
        c.setNome(dto.nome());
        c.setCpf(dto.cpf());
        c.setTelefone(dto.telefone());
        c.setSexo(dto.sexo());
        return c;
    }
}
