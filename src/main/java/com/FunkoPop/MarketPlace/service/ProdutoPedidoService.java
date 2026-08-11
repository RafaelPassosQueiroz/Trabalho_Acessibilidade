package com.FunkoPop.MarketPlace.service;

import com.FunkoPop.MarketPlace.entity.Pedido;
import com.FunkoPop.MarketPlace.entity.ProdutoPedido;
import com.FunkoPop.MarketPlace.repository.ProdutoPedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoPedidoService {

    @Autowired
    private ProdutoPedidoRepository produtoPedidoRepository;

    public ProdutoPedido saveProductOrder(ProdutoPedido produtoPedido){
        return produtoPedidoRepository.save(produtoPedido);
    }

    public List<ProdutoPedido> saveAll(List<ProdutoPedido> produtoPedidos){return produtoPedidoRepository.saveAll(produtoPedidos);}

    public List<ProdutoPedido> findAllProductOrder(){
        return produtoPedidoRepository.findAll();
    }

    public Optional<ProdutoPedido> findProductOrderById(Long id){
        return produtoPedidoRepository.findById(id);
    }

    public void deleteProductOrder(ProdutoPedido produtoPedido){
        produtoPedidoRepository.delete(produtoPedido);
    }

    public void deleteProductOrderById(Long id){
        produtoPedidoRepository.deleteById(id);
    }

    public void deleteAllProductOrder(){
        produtoPedidoRepository.deleteAll();
    }
}