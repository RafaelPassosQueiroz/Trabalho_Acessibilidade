package com.FunkoPop.MarketPlace.service;

import com.FunkoPop.MarketPlace.entity.Cliente;
import com.FunkoPop.MarketPlace.entity.Favorito;
import com.FunkoPop.MarketPlace.repository.ClienteRepository;
import com.FunkoPop.MarketPlace.repository.FavoritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoritoService {

    @Autowired
    private FavoritoRepository favoritoRepository;

    public Favorito saveFavorito(Favorito favorito) {
        return favoritoRepository.save(favorito);
    }

    public List<Favorito> findAllFavorito(){
        return favoritoRepository.findAll();
    }

    public Optional<Favorito> findFavoritoById(int id){
        return favoritoRepository.findById(id);
    }

    public void deleteFavorito(Favorito favorito){
        favoritoRepository.delete(favorito);
    }

    public void deleteFavoritoById(int id){
        favoritoRepository.deleteById(id);
    }

    public void deleteAllFavorito(){
        favoritoRepository.deleteAll();
    }



}
