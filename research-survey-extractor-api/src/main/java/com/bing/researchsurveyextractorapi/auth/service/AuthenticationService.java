package com.bing.researchsurveyextractorapi.auth.service;

import com.bing.researchsurveyextractorapi.auth.models.AuthenticationRequest;
import com.bing.researchsurveyextractorapi.auth.models.AuthenticationResponse;
import com.bing.researchsurveyextractorapi.auth.models.PasswordChangeRequest;
import com.bing.researchsurveyextractorapi.auth.models.RegisterRequest;
import com.bing.researchsurveyextractorapi.dto.UserPostDto;
import com.bing.researchsurveyextractorapi.mapper.UserMapper;
import com.bing.researchsurveyextractorapi.models.UserRole;
import com.bing.researchsurveyextractorapi.service.UserService;
import com.bing.researchsurveyextractorapi.util.AuthUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        UserPostDto user = UserPostDto.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .userRole(UserRole.USER)
                .build();
        userService.createUser(user);
        return generateAuthResponse(UserMapper.fromPostDto(user));
    }


    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(createUserAuthToken(request));
        UserDetails user = userService.loadUserByUsername(request.getUsername());
        return generateAuthResponse(user);

    }

    public void updatePassword(PasswordChangeRequest request) {
        String username = AuthUtils.getLoggedInUsername();
        authenticationManager.authenticate(createUserAuthToken(getAuthenticationRequest(username, request.getOldPassword())));
        userService.changePassword(username, request.getNewPassword());
    }

    private static AuthenticationRequest getAuthenticationRequest(String username, String password) {
        return new AuthenticationRequest(username, password);
    }

    private static UsernamePasswordAuthenticationToken createUserAuthToken(AuthenticationRequest request) {
        return new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
    }

    private AuthenticationResponse generateAuthResponse(UserDetails user) {
        String authToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().authToken(authToken).build();
    }

}
