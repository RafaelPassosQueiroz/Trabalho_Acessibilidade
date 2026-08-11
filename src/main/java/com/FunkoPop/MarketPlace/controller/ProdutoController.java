package com.FunkoPop.MarketPlace.controller;

import com.FunkoPop.MarketPlace.entity.Produto;
import com.FunkoPop.MarketPlace.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProdutoController {

    @Autowired
    private ProdutoService productService;

    @PostMapping
    public Produto save(@RequestBody Produto product){
        return productService.saveProduct(product);
    }

    @GetMapping
    public List<Produto> findAll(){
        return productService.findAllProduct();
    }

    @GetMapping("/{id}")
    public Produto findById(@PathVariable Long id){
        return productService.findProductById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        productService.deleteProductById(id);
    }

}