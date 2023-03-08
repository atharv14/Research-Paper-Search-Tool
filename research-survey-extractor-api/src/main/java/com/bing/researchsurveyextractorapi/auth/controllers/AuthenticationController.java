package com.bing.researchsurveyextractorapi.auth.controllers;

import com.bing.researchsurveyextractorapi.auth.models.AuthenticationRequest;
import com.bing.researchsurveyextractorapi.auth.models.AuthenticationResponse;
import com.bing.researchsurveyextractorapi.auth.models.PasswordChangeRequest;
import com.bing.researchsurveyextractorapi.auth.models.RegisterRequest;
import com.bing.researchsurveyextractorapi.auth.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping(value = "/signin", consumes = {"application/json"})
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/changePassword")
    public void changePassword(@RequestBody PasswordChangeRequest request) {
        authenticationService.updatePassword(request);
    }

}
