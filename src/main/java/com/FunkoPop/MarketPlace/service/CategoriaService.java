package com.FunkoPop.MarketPlace.service;

import com.FunkoPop.MarketPlace.entity.Categoria;
import com.FunkoPop.MarketPlace.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public Categoria saveCategory(Categoria categoria){
        return categoriaRepository.save(categoria);
    }

    public List<Categoria> findAllCategory(){
        return categoriaRepository.findAll();
    }

    public Optional<Categoria> findCategoryById(Long id){
        return categoriaRepository.findById(id);
    }

    public void deleteCategory(Categoria categoria){
        categoriaRepository.delete(categoria);
    }

    public void deleteCategoryById(Long id){
        categoriaRepository.deleteById(id);
    }

    public void deleteAllCategory(){
        categoriaRepository.deleteAll();
    }
}