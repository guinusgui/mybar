package br.ufpi.mybar_spring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpi.mybar_spring.models.items.ItemDoCardapio;

public interface CardapioRepo extends JpaRepository<ItemDoCardapio, Long> {}
