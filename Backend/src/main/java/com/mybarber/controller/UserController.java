package com.mybarber.controller;

import com.mybarber.auth.AuthenticationRequest;
import com.mybarber.auth.AuthenticationResponse;
import com.mybarber.auth.AuthenticationService;
import com.mybarber.auth.RegisterRequest;
import com.mybarber.model.User;
import com.mybarber.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final AuthenticationService service;

    public UserController(UserService userService, AuthenticationService service) {
        this.userService = userService;
        this.service = service;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public User getUserById(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }



}
