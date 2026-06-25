package br.ufpi.mybar_spring.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.ufpi.mybar_spring.dto.dto.conta.ContaRequestDto;
import br.ufpi.mybar_spring.dto.dto.conta.ContaResponseDto;
import br.ufpi.mybar_spring.dto.mapper.ContaMapper;
import br.ufpi.mybar_spring.models.cliente.Cliente;
import br.ufpi.mybar_spring.models.usuario.Usuario;
import br.ufpi.mybar_spring.repositories.ClienteRepo;
import br.ufpi.mybar_spring.repositories.ContaRepo;
import br.ufpi.mybar_spring.repositories.UsuarioRepo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContaService {
       
    private final ContaRepo contaRepo;
    private final ClienteRepo clienteRepo;
    private final UsuarioRepo usuarioRepo;


    public List<ContaResponseDto> list() {
        return contaRepo.findAll().stream()
            .map(ContaMapper::toDto)
            .toList();
    }

    public ContaResponseDto findById(Long id) {
        return ContaMapper.toDto(
            contaRepo.findById(id)
                .orElseThrow(
                    () -> new RuntimeException("Conta não encontrada")
                ));
    }

    public ContaResponseDto create(ContaRequestDto dto) {
        Cliente c = clienteRepo.findById(dto.dono())
            .orElseThrow(() -> new RuntimeException("Não há cliente com esse id"));
        
        Usuario u = usuarioRepo.findById(dto.quem_abriu())
            .orElseThrow(() -> new RuntimeException("Não há usuário com esse código"));
        
        if(!contaRepo.existsById(dto.numero()))
            return ContaMapper.toDto(contaRepo.save(ContaMapper.toEntity(dto, c, u)));
            
        else
            throw new RuntimeException("Erro ao criar conta");
    }

    public void update(ContaRequestDto dto) {
        Cliente c = clienteRepo.findById(dto.dono())
            .orElseThrow(() -> new RuntimeException("Não há cliente com esse id"));
        
        Usuario u = usuarioRepo.findById(dto.quem_abriu())
            .orElseThrow(() -> new RuntimeException("Não há usuário com esse código"));

        if(contaRepo.existsById(dto.numero()))
            contaRepo.save(ContaMapper.toEntity(dto, c, u));
        else
            throw new RuntimeException("Erro ao atualizar conta");
    }

    public void delete(Long codigo) {
        try {
            contaRepo.deleteById(codigo);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(
                "Requisição nula, impossível prosseguir", e
            );
        } catch (Exception e) {
            throw new RuntimeException(
                "O código enviado não pertence a nenhum usuário no banco", e
            );
        }
        
    }
}
