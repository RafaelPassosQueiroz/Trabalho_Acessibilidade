package com.FunkoPop.MarketPlace.repository;

import com.FunkoPop.MarketPlace.entity.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Integer> {
    Favorito findFavoritoByIdIs(Long id);
}
