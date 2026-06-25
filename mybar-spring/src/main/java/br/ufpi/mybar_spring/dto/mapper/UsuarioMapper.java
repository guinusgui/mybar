package br.ufpi.mybar_spring.dto.mapper;

import br.ufpi.mybar_spring.dto.dto.UsuarioRequestDto;
import br.ufpi.mybar_spring.dto.dto.UsuarioResponseDto;
import br.ufpi.mybar_spring.models.Usuario;

public class UsuarioMapper {

    public static UsuarioResponseDto toDto(Usuario u) {
        return new UsuarioResponseDto(
            u.getCodigo(),
            u.getNome(),
            u.getEmail(),
            u.getTipo()
        );
    }

    public static Usuario toEntity(UsuarioRequestDto dto) {
        Usuario u = new Usuario();
        u.setCodigo(dto.codigo());
        u.setNome(dto.nome());
        u.setEmail(dto.email());
        u.setSenha(dto.senha());
        u.setTipo(dto.tipo());

        return u;
    }
}
