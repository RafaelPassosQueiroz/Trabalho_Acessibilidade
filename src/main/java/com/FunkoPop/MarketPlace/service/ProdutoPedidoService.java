package com.FunkoPop.MarketPlace.service;

import com.FunkoPop.MarketPlace.entity.Categoria;
import com.FunkoPop.MarketPlace.entity.Produto;
import com.FunkoPop.MarketPlace.entity.ProdutoPedido;
import com.FunkoPop.MarketPlace.repository.CategoriaRepository;
import com.FunkoPop.MarketPlace.repository.ProdutoPedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoPedidoService {

    @Autowired
    private ProdutoPedidoRepository produtoPedidoRepository;

    public ProdutoPedido saveProdutoPedido(ProdutoPedido produtoPedido){
        return produtoPedidoRepository.save(produtoPedido);
    }


    public List<ProdutoPedido> findAllProdutoPedido(){
        return produtoPedidoRepository.findAll();
    }

    public Optional<ProdutoPedido> findProdutoPedido(int id){
        return produtoPedidoRepository.findById(id);
    }

    public void deleteProdutoPedido(ProdutoPedido produtoPedido){
        produtoPedidoRepository.delete(produtoPedido);
    }

    public void deleteProdutoPedidoById(int id){
        produtoPedidoRepository.deleteById(id);
    }

    public void deleteAllProdutoPedido(){
        produtoPedidoRepository.deleteAll();
    }



}
