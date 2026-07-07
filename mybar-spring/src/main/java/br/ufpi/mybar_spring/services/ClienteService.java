package br.ufpi.mybar_spring.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.ufpi.mybar_spring.dto.mapper.ClienteMapper;
import br.ufpi.mybar_spring.dto.objects.cliente.ClienteDto;
import br.ufpi.mybar_spring.exceptions.custom.EntidadeNaoEncontrada;
import br.ufpi.mybar_spring.models.cliente.Cliente;
import br.ufpi.mybar_spring.repositories.ClienteRepo;
import br.ufpi.mybar_spring.tools.Status;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClienteService {
    private final ClienteRepo clienteRepo;

    public List<ClienteDto> list() {
        return clienteRepo.findAll().stream()
            .filter(a -> a.getAtividade().equals(Status.ATIVO))
            .map(ClienteMapper::toDto)
            .toList();
    }

    public ClienteDto findById(String cpf) {
        return ClienteMapper.toDto(
            clienteRepo.findById(cpf)
                .orElseThrow(
                    () -> new EntidadeNaoEncontrada(
                        "O cpf fornecido não corresponde a nenhum cliente"
                    )
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
                "O cpf fornecido não corresponde a nenhum cliente"
            )
        );

        u.setNome(dto.nome());
        u.setTelefone(dto.telefone());
        u.setSexo(dto.sexo());

        clienteRepo.save(u);
    }

    public void delete(String cpf) {
        Cliente c = clienteRepo.findById(cpf)
            .orElseThrow(
                () -> new EntidadeNaoEncontrada(
                    "O cpf não pertence a nenhum cliente"
                )
            );

        c.setAtividade(Status.INATIVO);
        clienteRepo.save(c);
    }

}
