package com.FunkoPop.MarketPlace.repository;

import com.FunkoPop.MarketPlace.entity.Categoria;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository {
    Categoria findCategoriaById(Long id);
}
