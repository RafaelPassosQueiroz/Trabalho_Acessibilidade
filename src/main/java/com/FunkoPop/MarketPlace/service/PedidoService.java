package com.FunkoPop.MarketPlace.service;

import com.FunkoPop.MarketPlace.entity.Pedido;
import com.FunkoPop.MarketPlace.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public Pedido saveOrder(Pedido pedido){
        return pedidoRepository.save(pedido);
    }

    public List<Pedido> findAllOrder(){
        return pedidoRepository.findAll();
    }

    public Optional<Pedido> findOrderById(Long id){
        return pedidoRepository.findById(id);
    }

    public void deleteOrder(Pedido pedido){
        pedidoRepository.delete(pedido);
    }

    public void deleteOrderById(Long id){
        pedidoRepository.deleteById(id);
    }

    public void deleteAllOrder(){
        pedidoRepository.deleteAll();
    }
}