package com.FunkoPop.MarketPlace.repository;


import com.FunkoPop.MarketPlace.entity.Itens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItensRepository extends JpaRepository<Itens, Integer> {
    Itens findItensByIdIs(Long id);
}
