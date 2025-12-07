package com.pm.moneymanager.service;

import com.pm.moneymanager.dto.AuthDTO;
import com.pm.moneymanager.dto.ProfileDTO;
import com.pm.moneymanager.model.Profile;
import com.pm.moneymanager.repository.ProfileRepository;
import com.pm.moneymanager.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public ProfileDTO registerProfile(ProfileDTO profileDTO) {

        Profile newProfile = toEntity(profileDTO);
        newProfile.setActivationToken(UUID.randomUUID().toString());
        Profile savedProfile = profileRepository.save(newProfile);
        //send activation link
        String activationLink = "http://localhost:8080/api/v1.0/activate?token=" + savedProfile.getActivationToken();
        String subject = "Activate your money manager account ";
        String body = "Click here to activate your money manager account: " + activationLink;
        emailService.sendEmail(newProfile.getEmail(), subject, body);


        return toDTO(savedProfile);
    }

    public Profile toEntity(ProfileDTO profileDTO) {
        return Profile.builder()
                .id(profileDTO.getId())
                .fullName(profileDTO.getFullName())
                .email(profileDTO.getEmail())
                .password(passwordEncoder.encode(profileDTO.getPassword()))
                .profileImageUrl(profileDTO.getProfileImageUrl())
                .createdAt(profileDTO.getCreatedAt())
                .updatedAt(profileDTO.getUpdatedAt())
                .build();
    }

    public ProfileDTO toDTO(Profile profile) {
        return ProfileDTO.builder()
                .id(profile.getId())
                .fullName(profile.getFullName())
                .email(profile.getEmail())
                .profileImageUrl(profile.getProfileImageUrl())
                .createdAt(profile.getCreatedAt())
                .updatedAt(profile.getUpdatedAt())
                .build();

    }

    public boolean activateProfile(String activationToken) {
        return profileRepository.findByActivationToken(activationToken)
        .map(profile -> {
            profile.setIsActive(true);//clear activation token
            profileRepository.save(profile);
            return true;
        })
                .orElse(false);
    }

    public boolean isAccountActive(String email) {
        return profileRepository.findByEmail(email)
                .map(Profile::getIsActive)
                .orElse(false);
    }

    public Profile getCurrentProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return profileRepository.findByEmail(authentication.getName())
                .orElseThrow(()-> new RuntimeException("No active profile found"+ authentication.getName()));

    }

    public ProfileDTO getPublicProfile(String email) {
        Profile currentUser = null;
        if(email == null) {
            currentUser = getCurrentProfile();
        }else {
            currentUser = profileRepository.findByEmail(email)
                    .orElseThrow(()-> new RuntimeException("No active profile found"+ email));
        }

        return ProfileDTO.builder()
                .id(currentUser.getId())
                .fullName(currentUser.getFullName())
                .email(currentUser.getEmail())
                .profileImageUrl(currentUser.getProfileImageUrl())
                .createdAt(currentUser.getCreatedAt())
                .updatedAt(currentUser.getUpdatedAt())
                .build();
    }

    public Map<String, Object> authenticateAndGenerateToken(AuthDTO authDTO) {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authDTO.getEmail(), authDTO.getPassword()));
            //Generate JWT token
            String token = jwtUtil.generateToken(authDTO.getEmail());
            return Map.of("token", token,
                    "user", getPublicProfile(authDTO.getEmail())
            );

        }catch (Exception e) {
            throw new RuntimeException("Invalid email or password");

        }
    }
}
