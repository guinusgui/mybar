package br.ufpi.mybar_spring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpi.mybar_spring.models.cliente.Cliente;

public interface ClienteRepo extends JpaRepository<Cliente, String>{}
