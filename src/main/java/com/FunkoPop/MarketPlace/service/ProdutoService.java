package com.FunkoPop.MarketPlace.service;

import com.FunkoPop.MarketPlace.entity.Produto;
import com.FunkoPop.MarketPlace.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    public Produto saveProduct(Produto produto){
        return produtoRepository.save(produto);
    }

    public List<Produto> saveAll(List<Produto> produtos){return produtoRepository.saveAll(produtos);}

    public List<Produto> findAllProduct(){
        return produtoRepository.findAll();
    }

    public Optional<Produto> findProductById(Long id){
        return produtoRepository.findById(id);
    }

    public void deleteProduct(Produto produto){
        produtoRepository.delete(produto);
    }

    public void deleteProductById(Long id){
        produtoRepository.deleteById(id);
    }

    public void deleteAllProduct(){
        produtoRepository.deleteAll();
    }
}