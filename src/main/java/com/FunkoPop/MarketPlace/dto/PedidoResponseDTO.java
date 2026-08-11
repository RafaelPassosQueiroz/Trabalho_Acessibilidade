package com.FunkoPop.MarketPlace.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class PedidoResponseDTO {

    private Long id;
    private Long clienteId;
    private Long enderecoEntregaId;
    private LocalDate dataPedido;
    private String status;
    private BigDecimal valorTotal;

}