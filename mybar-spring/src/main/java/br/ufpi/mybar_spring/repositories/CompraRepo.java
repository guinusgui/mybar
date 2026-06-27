package br.ufpi.mybar_spring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpi.mybar_spring.models.compras.Compra;

public interface CompraRepo extends JpaRepository<Compra, Long>{}