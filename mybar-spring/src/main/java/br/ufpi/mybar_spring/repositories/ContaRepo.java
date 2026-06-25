package br.ufpi.mybar_spring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpi.mybar_spring.models.conta.Conta;

public interface ContaRepo extends JpaRepository<Conta, Long> {}
