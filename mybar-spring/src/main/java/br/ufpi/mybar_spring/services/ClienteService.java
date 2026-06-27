package br.ufpi.mybar_spring.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.ufpi.mybar_spring.dto.mapper.ClienteMapper;
import br.ufpi.mybar_spring.dto.objects.cliente.ClienteDto;
import br.ufpi.mybar_spring.exceptions.custom.EntidadeNaoEncontrada;
import br.ufpi.mybar_spring.models.cliente.Cliente;
import br.ufpi.mybar_spring.repositories.ClienteRepo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClienteService {
    private final ClienteRepo clienteRepo;

    public List<ClienteDto> list() {
        return clienteRepo.findAll().stream()
            .map(ClienteMapper::toDto)
            .toList();
    }

    public ClienteDto findById(String cpf) {
        return ClienteMapper.toDto(
            clienteRepo.findById(cpf)
                .orElseThrow(
                    () -> new EntidadeNaoEncontrada(
                        "O id fornecido não corresponde a nenhum cliente")
                ));
        
    }

    public ClienteDto create(ClienteDto dto) {
        return ClienteMapper.toDto(
            clienteRepo.save(ClienteMapper.toEntity(dto))
        );
    }

    public void update(ClienteDto dto) {
        
        Cliente u = clienteRepo.findById(dto.cpf())
            .orElseThrow(() -> new EntidadeNaoEncontrada(
                "O id fornecido não corresponde a nenhum cliente"
            )
        );

        u.setNome(dto.nome());
        u.setTelefone(dto.telefone());
        u.setSexo(dto.sexo());

        clienteRepo.save(u);
    }

    public void delete(String cpf) {
        if(!clienteRepo.existsById(cpf))
            throw new EntidadeNaoEncontrada(
            "O id fornecido não corresponde a nenhum cliente"
        );

        try {
            clienteRepo.deleteById(cpf);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(
                "Requisição nula, impossível prosseguir", e
            );
        }
    }

}
