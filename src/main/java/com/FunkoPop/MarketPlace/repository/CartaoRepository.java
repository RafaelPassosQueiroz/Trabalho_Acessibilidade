package com.FunkoPop.MarketPlace.repository;

import com.FunkoPop.MarketPlace.entity.Cartao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartaoRepository extends JpaRepository<Cartao, Long> {

    Cartao findCartaoById(Long id);

}