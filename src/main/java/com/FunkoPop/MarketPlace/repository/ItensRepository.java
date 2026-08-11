package com.FunkoPop.MarketPlace.repository;

import com.FunkoPop.MarketPlace.entity.Itens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItensRepository extends JpaRepository<Itens, Long> {

    Itens findItensById(Long id);

}