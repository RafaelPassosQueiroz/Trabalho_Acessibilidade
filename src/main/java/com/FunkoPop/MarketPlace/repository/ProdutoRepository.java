package com.FunkoPop.MarketPlace.repository;

import com.FunkoPop.MarketPlace.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    Produto findProdutoById(Long id);

}