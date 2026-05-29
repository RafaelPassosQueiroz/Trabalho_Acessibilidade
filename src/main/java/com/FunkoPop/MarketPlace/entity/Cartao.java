package com.FunkoPop.MarketPlace.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name="cartao")
public class Cartao {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="cliente_id")
    private Cliente cliente;

    private String bandeira;

    @Column(name="nome_titular")
    private String nomeTitular;

    @Column(name="numero_mascarado")
    private String numeroMascarado;

    private LocalDate validade;



}
