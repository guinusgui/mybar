package br.ufpi.mybar_spring.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.ufpi.mybar_spring.dto.dto.cliente.ClientePutDto;
import br.ufpi.mybar_spring.dto.dto.cliente.ClienteStandartDto;
import br.ufpi.mybar_spring.dto.mapper.ClienteMapper;
import br.ufpi.mybar_spring.exceptions.custom.EntidadeNaoEncontrada;
import br.ufpi.mybar_spring.models.cliente.Cliente;
import br.ufpi.mybar_spring.repositories.ClienteRepo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClienteService {
    private final ClienteRepo clienteRepo;

    public List<ClienteStandartDto> list() {
        return clienteRepo.findAll().stream()
            .map(ClienteMapper::toDto)
            .toList();
    }

    public ClienteStandartDto findById(Long id) {
        return ClienteMapper.toDto(
            clienteRepo.findById(id)
                .orElseThrow(
                    () -> new EntidadeNaoEncontrada(
                        "O id fornecido não corresponde a nenhum cliente")
                ));
        
    }

    public ClienteStandartDto create(ClienteStandartDto dto) {
        return ClienteMapper.toDto(
            clienteRepo.save(ClienteMapper.toEntity(dto))
        );
    }

    public void update(ClientePutDto dto) {
        
        Cliente u = clienteRepo.findById(dto.id())
            .orElseThrow(() -> new EntidadeNaoEncontrada(
                "O id fornecido não corresponde a nenhum cliente"
            )
        );

        u.setNome(dto.nome());
        u.setTelefone(dto.telefone());
        u.setSexo(dto.sexo());

        clienteRepo.save(u);
    }

    public void delete(Long id) {
        if(!clienteRepo.existsById(id))
            throw new EntidadeNaoEncontrada(
            "O id fornecido não corresponde a nenhum cliente"
        );

        try {
            clienteRepo.deleteById(id);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(
                "Requisição nula, impossível prosseguir", e
            );
        }
    }

}
