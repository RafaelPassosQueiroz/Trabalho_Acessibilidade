package com.FunkoPop.MarketPlace.controller;

import com.FunkoPop.MarketPlace.entity.Itens;
import com.FunkoPop.MarketPlace.service.ItensService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/items")
public class ItensController {

    @Autowired
    private ItensService itemService;

    @PostMapping
    public Itens save(@RequestBody Itens item){
        return itemService.saveItem(item);
    }

    @GetMapping
    public List<Itens> findAll(){
        return itemService.findAllItem();
    }

    @GetMapping("/{id}")
    public Itens findById(@PathVariable Long id){
        return itemService.findItemById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        itemService.deleteItemById(id);
    }

}