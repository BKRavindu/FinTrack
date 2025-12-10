package com.pm.moneymanager.service;

import com.pm.moneymanager.dto.CategoryDTO;
import com.pm.moneymanager.dto.ProfileDTO;
import com.pm.moneymanager.model.Category;
import com.pm.moneymanager.model.Profile;
import com.pm.moneymanager.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ProfileService profileService;

    public CategoryDTO saveCategory(CategoryDTO categoryDTO) {
        Profile profile = profileService.getCurrentProfile();
        if(categoryRepository.existsByNameAndProfileId(categoryDTO.getName(), profile.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Category name already exists");
        }

        Category newCategory = toEntity(categoryDTO, profile);
        newCategory = categoryRepository.save(newCategory);
        return toDTO(newCategory);
    }

    public List<CategoryDTO> getCategoriesForCurrentUser() {
        Profile profile = profileService.getCurrentProfile();
        List<Category> categories = categoryRepository.findByProfileId(profile.getId());
        return categories.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<CategoryDTO> getCategoriesByTypeForCurrentUser(String type) {
        Profile profile = profileService.getCurrentProfile();
        List<Category> categories = categoryRepository.findByTypeAndProfileId(type, profile.getId());
        return categories.stream().map(this::toDTO).toList();
    }

    private Category toEntity(CategoryDTO categoryDTO, Profile profile) {
        return Category.builder()
                .name(categoryDTO.getName())
                .icon(categoryDTO.getIcon())
                .profile(profile)
                .type(categoryDTO.getType())
                .build();
    }

    private CategoryDTO toDTO(Category category) {
        return CategoryDTO.builder()
                .id(category.getId())
                .profileId(category.getProfile() != null ? category.getProfile().getId():null)
                .name(category.getName())
                .icon(category.getIcon())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .type(category.getType())
                .build();
    }
}
