package com.pm.moneymanager.controller;

import com.pm.moneymanager.dto.ProfileDTO;
import com.pm.moneymanager.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    public final ProfileService profileService;

    @PostMapping("/register")
    public ResponseEntity<ProfileDTO> registerProfile(@RequestBody ProfileDTO profileDTO) {
        ProfileDTO registeredProfile = profileService.registerProfile(profileDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredProfile);
    }

    @GetMapping("/activation")
    public ResponseEntity<String> activateProfile(@RequestParam String activationToken) {
        boolean isActivated = profileService.activateProfile(activationToken);
        if (isActivated) {
            return ResponseEntity.status(HttpStatus.OK).body("Activated the profile");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Activation token not found or already used");

        }
    }
}
