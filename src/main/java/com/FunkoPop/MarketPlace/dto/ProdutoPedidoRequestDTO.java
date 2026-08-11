package com.FunkoPop.MarketPlace.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProdutoPedidoRequestDTO {

    private Long pedidoId;
    private Long produtoId;
    private int quantidade;
    private BigDecimal precoUnitario;

}