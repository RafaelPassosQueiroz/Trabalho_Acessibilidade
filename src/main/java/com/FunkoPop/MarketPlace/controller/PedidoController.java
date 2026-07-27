package com.FunkoPop.MarketPlace.controller;

import com.FunkoPop.MarketPlace.entity.Pedido;
import com.FunkoPop.MarketPlace.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class PedidoController {

    @Autowired
    private PedidoService orderService;

    @PostMapping
    public Pedido save(@RequestBody Pedido order){
        return orderService.saveOrder(order);
    }

    @GetMapping
    public List<Pedido> findAll(){
        return orderService.findAllOrder();
    }

    @GetMapping("/{id}")
    public Pedido findById(@PathVariable Long id){
        return orderService.findOrderById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        orderService.deleteOrderById(id);
    }

}