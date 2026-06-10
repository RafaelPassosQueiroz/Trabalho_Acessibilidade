package com.FunkoPop.MarketPlace.repository;

import com.FunkoPop.MarketPlace.entity.Cartao;
import org.springframework.stereotype.Repository;

@Repository
public interface CartaoRepository {
    Cartao findCartaoById(Long id);
}
