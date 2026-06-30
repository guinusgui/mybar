package br.ufpi.mybar_spring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufpi.mybar_spring.models.compras.Pagamento;

public interface PagamentoRepo extends JpaRepository<Pagamento, Long>{}
