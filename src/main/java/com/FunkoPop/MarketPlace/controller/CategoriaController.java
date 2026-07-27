package com.FunkoPop.MarketPlace.controller;

import com.FunkoPop.MarketPlace.entity.Categoria;
import com.FunkoPop.MarketPlace.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoriaController {

    @Autowired
    private CategoriaService categoryService;

    @PostMapping
    public Categoria save(@RequestBody Categoria category){
        return categoryService.saveCategory(category);
    }

    @GetMapping
    public List<Categoria> findAll(){
        return categoryService.findAllCategory();
    }

    @GetMapping("/{id}")
    public Categoria findById(@PathVariable Long id){
        return categoryService.findCategoryById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        categoryService.deleteCategoryById(id);
    }

}