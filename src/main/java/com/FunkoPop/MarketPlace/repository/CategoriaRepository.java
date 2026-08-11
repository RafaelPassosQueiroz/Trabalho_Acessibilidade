package com.FunkoPop.MarketPlace.repository;

import com.FunkoPop.MarketPlace.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    Categoria findCategoriaById(Long id);

}