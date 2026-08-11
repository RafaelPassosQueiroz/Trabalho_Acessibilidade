package com.FunkoPop.MarketPlace.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProdutoRequestDTO {

    private String nome;
    private String descricao;
    private BigDecimal preco;
    private Integer estoque;
    private String sku;
    private Long categoriaId;

}