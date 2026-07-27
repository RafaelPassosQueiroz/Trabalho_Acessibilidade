package com.FunkoPop.MarketPlace.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProdutoPedidoResponseDTO {

    private int id;
    private Long pedidoId;
    private Long produtoId;
    private int quantidade;
    private BigDecimal precoUnitario;

}