package com.FunkoPop.MarketPlace.config;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class DotEnvTest {

    @PostConstruct
    public void test() {
        Dotenv dotenv = Dotenv.load();

        System.out.println("DB_URL = " + dotenv.get("DB_URL"));
        System.out.println("DB_USER = " + dotenv.get("DB_USER"));
    }
}