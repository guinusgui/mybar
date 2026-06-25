package br.ufpi.mybar_spring.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.ufpi.mybar_spring.dto.dto.usuario.UsuarioRequestDto;
import br.ufpi.mybar_spring.dto.dto.usuario.UsuarioResponseDto;
import br.ufpi.mybar_spring.dto.mapper.UsuarioMapper;
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

    public UsuarioResponseDto findById(Long codigo) {
        return UsuarioMapper.toDto(
            usuarioRepo.findById(codigo)
                .orElseThrow(
                    () -> new RuntimeException("Usuario não encontrado")
                ));
        
    }

    public UsuarioResponseDto create(UsuarioRequestDto dto) {
        return UsuarioMapper.toDto(
            usuarioRepo.save(UsuarioMapper.toEntity(dto))
        );
    }

    public void update(UsuarioRequestDto dto) {
        
        Usuario u = usuarioRepo.findById(dto.codigo())
            .orElseThrow(() -> new RuntimeException(
                "Usuario inexistente"
            )
        );

        u.setNome(dto.nome());
        u.setEmail(dto.email());
        u.setSenha(dto.senha());
        u.setSenha(dto.senha());

        usuarioRepo.save(u);
    }

    public void delete(Long codigo) {
        try {
            usuarioRepo.deleteById(codigo);
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
