package com.project.abicoirr.service;

import org.springframework.stereotype.Service;
import java.util.function.Predicate;

@Service
public class EmailService implements Predicate<String> {
    @Override
    public boolean test(String s) {


        return true;
    }

    public String signupConfirmation(String token)
    {
        return token;
    }
}
