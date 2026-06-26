package br.ufpi.mybar_spring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpi.mybar_spring.models.items.Item;

public interface ItemRepo extends JpaRepository<Item, Long>{
    
}
