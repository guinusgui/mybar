package br.ufpi.mybar_spring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpi.mybar_spring.models.usuario.Usuario;

public interface UsuarioRepo extends JpaRepository<Usuario, Long>{}
