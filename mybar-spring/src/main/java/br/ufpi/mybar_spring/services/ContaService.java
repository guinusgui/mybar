package br.ufpi.mybar_spring.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.ufpi.mybar_spring.dto.mapper.ContaMapper;
import br.ufpi.mybar_spring.dto.objects.conta.ContaRequestDto;
import br.ufpi.mybar_spring.dto.objects.conta.ContaResponseDto;
import br.ufpi.mybar_spring.exceptions.custom.EntidadeNaoEncontrada;
import br.ufpi.mybar_spring.exceptions.custom.RequisicaoIlegal;
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
                    () -> new EntidadeNaoEncontrada(
                        "O numero fornecido não corresponde a nenhuma conta")
                ));
    }

    public ContaResponseDto create(ContaRequestDto dto) {
        Cliente c = clienteRepo.findById(dto.dono())
            .orElseThrow(() -> new EntidadeNaoEncontrada(
                "O cpf fornecido em 'dono' não corresponde a nenhum cliente"));
        
        Usuario u = usuarioRepo.findById(dto.quem_abriu())
            .orElseThrow(() -> new EntidadeNaoEncontrada(
                "O codigo de 'quem_abriu' fornecido não corresponde a nenhum usuário"));
        
        if(!contaRepo.existsById(dto.numero()))
            return ContaMapper.toDto(contaRepo.save(ContaMapper.toEntity(dto, c, u)));
            
        else
            throw new RequisicaoIlegal(
        "Tentativa de criar conta com número já registrado");
    }

    public void update(ContaRequestDto dto) {
        Cliente c = clienteRepo.findById(dto.dono())
            .orElseThrow(() -> new EntidadeNaoEncontrada(
                "O cpf fornecido em 'dono' não corresponde a nenhum cliente"
            )
        );
        
        Usuario u = usuarioRepo.findById(dto.quem_abriu())
            .orElseThrow(() -> new EntidadeNaoEncontrada(
                "O codigo de 'quem_abriu' não corresponde a nenhum usuário"
            )
        );

        if(contaRepo.existsById(dto.numero()))
            contaRepo.save(ContaMapper.toEntity(dto, c, u));
        else
            throw new EntidadeNaoEncontrada(
        "A requisição não corresponde a nenhuma conta");
    }

    public void delete(Long numero) {
        if(!contaRepo.existsById(numero))
            throw new EntidadeNaoEncontrada(
        "O 'numero' fornecido não corresponde a nenhuma conta"
        );
        try {
            contaRepo.deleteById(numero);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(
                "Requisição nula, impossível prosseguir", e
            );
        }
    }
}
