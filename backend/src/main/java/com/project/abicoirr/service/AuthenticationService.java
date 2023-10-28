package com.project.abicoirr.service;

import com.project.abicoirr.config.JwtService;
import com.project.abicoirr.models.Authentication.AuthenticationRequest;
import com.project.abicoirr.models.Authentication.AuthenticationResponse;
import com.project.abicoirr.models.Authentication.RegisterRequest;
import com.project.abicoirr.repository.UserRepository;
import com.project.abicoirr.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {

        Optional<User> userByEmail = userRepository.findByEmail(request.getEmail());

        if(userByEmail.isPresent()) {
            throw new RuntimeException("User already exists!!");
        }


        var user= User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(request.getRole())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
         authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user= userRepository.findByEmail(request.getEmail()).get();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
