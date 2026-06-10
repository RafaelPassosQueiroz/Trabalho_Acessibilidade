package com.FunkoPop.MarketPlace.repository;

import com.FunkoPop.MarketPlace.entity.Pedido;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository {

    Pedido findPedidoById(Long id);

}
