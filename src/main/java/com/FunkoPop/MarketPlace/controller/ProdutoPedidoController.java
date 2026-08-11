package com.FunkoPop.MarketPlace.controller;

import com.FunkoPop.MarketPlace.entity.Produto;
import com.FunkoPop.MarketPlace.entity.ProdutoPedido;
import com.FunkoPop.MarketPlace.service.ProdutoPedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product-orders")
public class ProdutoPedidoController {

    @Autowired
    private ProdutoPedidoService productOrderService;

    @PostMapping
    public ProdutoPedido save(@RequestBody ProdutoPedido productOrder){
        return productOrderService.saveProductOrder(productOrder);
    }

    @PostMapping("/batch")
    public List<ProdutoPedido> saveAll(@RequestBody List<ProdutoPedido> produtoPedidos){
        return productOrderService.saveAll(produtoPedidos);
    }

    @GetMapping
    public List<ProdutoPedido> findAll(){
        return productOrderService.findAllProductOrder();
    }

    @GetMapping("/{id}")
    public ProdutoPedido findById(@PathVariable Long id){
        return productOrderService.findProductOrderById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        productOrderService.deleteProductOrderById(id);
    }

}