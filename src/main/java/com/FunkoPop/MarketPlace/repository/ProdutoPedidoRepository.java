package com.FunkoPop.MarketPlace.repository;

import com.FunkoPop.MarketPlace.entity.ProdutoPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoPedidoRepository extends JpaRepository<ProdutoPedido, Integer> {
    ProdutoPedido findProdutoPedidoByIdIs(Long id);

}
