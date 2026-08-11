package com.FunkoPop.MarketPlace.service;

import com.FunkoPop.MarketPlace.entity.Favorito;
import com.FunkoPop.MarketPlace.repository.FavoritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoritoService {

    @Autowired
    private FavoritoRepository favoritoRepository;

    public Favorito saveFavorite(Favorito favorito){
        return favoritoRepository.save(favorito);
    }

    public List<Favorito> findAllFavorite(){
        return favoritoRepository.findAll();
    }

    public Optional<Favorito> findFavoriteById(Long id){
        return favoritoRepository.findById(id);
    }

    public void deleteFavorite(Favorito favorito){
        favoritoRepository.delete(favorito);
    }

    public void deleteFavoriteById(Long id){
        favoritoRepository.deleteById(id);
    }

    public void deleteAllFavorite(){
        favoritoRepository.deleteAll();
    }
}