package com.FunkoPop.MarketPlace.repository;


import com.FunkoPop.MarketPlace.entity.ItemPedido;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemPedidoRepository {
    ItemPedido findItemPedidoById(Long id);
}
