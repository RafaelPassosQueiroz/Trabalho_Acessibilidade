package com.FunkoPop.MarketPlace.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/produtos")
    public String produtos() {
        return "produtos";
    }

    @GetMapping("/produtos/{id}")
    public String produtoDetalhe() {
        return "produto";
    }

    @GetMapping("/carrinho")
    public String carrinho() {
        return "carrinho";
    }

    @GetMapping("/checkout")
    public String checkout() {
        return "checkout";
    }

    @GetMapping("/enderecos")
    public String enderecos() {
        return "enderecos";
    }

    @GetMapping("/cartoes")
    public String cartoes() {
        return "cartoes";
    }

    @GetMapping("/diversao")
    public String diversao() {
        return "diversao";
    }

    @GetMapping("/avatar")
    public String avatar() {
        return "lego";
    }

    @GetMapping("/jogo")
    public String jogo() {
        return "jogo";
    }
}