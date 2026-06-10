package com.FunkoPop.MarketPlace.repository;


import com.FunkoPop.MarketPlace.entity.Produto;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository {
    Produto findProdutoById(Long id);
}
