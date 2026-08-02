package com.FunkoPop.MarketPlace.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter @Entity
@Table(name = "produto")
public class Produto {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private String imagem_url;
    private BigDecimal preco;
    private Integer estoque;
    private String sku;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
}