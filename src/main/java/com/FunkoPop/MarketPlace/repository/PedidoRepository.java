package com.FunkoPop.MarketPlace.repository;

import com.FunkoPop.MarketPlace.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    Pedido findPedidoById(Long id);

}