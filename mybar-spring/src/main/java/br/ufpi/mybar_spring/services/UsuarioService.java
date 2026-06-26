package br.ufpi.mybar_spring.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.ufpi.mybar_spring.dto.mapper.UsuarioMapper;
import br.ufpi.mybar_spring.dto.objects.usuario.UsuarioRequestDto;
import br.ufpi.mybar_spring.dto.objects.usuario.UsuarioResponseDto;
import br.ufpi.mybar_spring.exceptions.custom.RequisicaoIlegal;
import br.ufpi.mybar_spring.exceptions.custom.EntidadeNaoEncontrada;
import br.ufpi.mybar_spring.models.usuario.Usuario;
import br.ufpi.mybar_spring.repositories.UsuarioRepo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    
    private final UsuarioRepo usuarioRepo;

    public List<UsuarioResponseDto> list() {
        return usuarioRepo.findAll().stream()
            .map(UsuarioMapper::toDto)
            .toList();
    }

    public UsuarioResponseDto findById( Long codigo) {
        return UsuarioMapper.toDto(
            usuarioRepo.findById(codigo)
                .orElseThrow(
                    () -> new EntidadeNaoEncontrada("Usuario não encontrado")
                ));
        
    }

    public UsuarioResponseDto create( UsuarioRequestDto dto) {
        return UsuarioMapper.toDto(
            usuarioRepo.save(UsuarioMapper.toEntity(dto))
        );
    }

    public void update( UsuarioRequestDto dto) {
        
        Usuario u = usuarioRepo.findById(dto.codigo())
            .orElseThrow(() -> new RequisicaoIlegal(
                "Usuario inexistente"
            )
        );

        u.setNome(dto.nome());
        u.setEmail(dto.email());
        u.setSenha(dto.senha());
        u.setSenha(dto.senha());

        usuarioRepo.save(u);
    }

    public void delete( Long codigo) {
        if(!usuarioRepo.existsById(codigo))
            throw new EntidadeNaoEncontrada(
        "O codigo fornecido não pertence a nenhum Usuario");

        try {
            usuarioRepo.deleteById(codigo);
        } catch (IllegalArgumentException e) {
            throw new RequisicaoIlegal(
                "Requisição nula, impossível prosseguir", e
            );
        
        }
    }

}
