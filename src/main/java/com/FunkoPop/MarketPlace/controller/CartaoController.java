package com.FunkoPop.MarketPlace.controller;

import com.FunkoPop.MarketPlace.entity.Cartao;
import com.FunkoPop.MarketPlace.service.CartaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cards")
public class CartaoController {

    @Autowired
    private CartaoService cardService;

    @PostMapping
    public Cartao save(@RequestBody Cartao card){
        return cardService.saveCard(card);
    }

    @GetMapping
    public List<Cartao> findAll(){
        return cardService.findAllCard();
    }

    @GetMapping("/{id}")
    public Cartao findById(@PathVariable Long id){
        return cardService.findCardById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        cardService.deleteCardById(id);
    }

}