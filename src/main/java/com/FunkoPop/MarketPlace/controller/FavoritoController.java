package com.FunkoPop.MarketPlace.controller;

import com.FunkoPop.MarketPlace.entity.Favorito;
import com.FunkoPop.MarketPlace.service.FavoritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
public class FavoritoController {

    @Autowired
    private FavoritoService favoriteService;

    @PostMapping
    public Favorito save(@RequestBody Favorito favorite){
        return favoriteService.saveFavorite(favorite);
    }

    @GetMapping
    public List<Favorito> findAll(){
        return favoriteService.findAllFavorite();
    }

    @GetMapping("/{id}")
    public Favorito findById(@PathVariable Long id){
        return favoriteService.findFavoriteById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        favoriteService.deleteFavoriteById(id);
    }

}