package com.pm.moneymanager.service;

import com.pm.moneymanager.dto.ProfileDTO;
import com.pm.moneymanager.model.Profile;
import com.pm.moneymanager.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;

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
                .password(profileDTO.getPassword())
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
            profile.setActivationToken(null);//clear activation token
            profileRepository.save(profile);
            return true;
        })
                .orElse(false);
    }
}
