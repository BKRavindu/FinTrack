package com.pm.moneymanager.service;

import com.pm.moneymanager.dto.IncomeDTO;
import com.pm.moneymanager.model.*;
import com.pm.moneymanager.model.Income;
import com.pm.moneymanager.repository.CategoryRepository;
import com.pm.moneymanager.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IncomeService {

    private final IncomeRepository incomeRepository;
    private final CategoryRepository categoryRepository;
    private final ProfileService profileService;

    public IncomeDTO addIncome(IncomeDTO incomeDTO) {
        Profile profile = profileService.getCurrentProfile();
        Category category = categoryRepository.findById(incomeDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        Income newIncome = toEntity(incomeDTO, category, profile);
        incomeRepository.save(newIncome);
        return toDTO(newIncome);
    }

    private Income toEntity(IncomeDTO incomeDTO, Category category, Profile profile) {
        return Income.builder()
                .name(incomeDTO.getName())
                .icon(incomeDTO.getIcon())
                .amount(incomeDTO.getAmount())
                .date(incomeDTO.getDate())
                .profile(profile)
                .category(category)
                .build();
    }

    private IncomeDTO toDTO(Income income) {
        return IncomeDTO.builder()
                .name(income.getName())
                .icon(income.getIcon())
                .amount(income.getAmount())
                .date(income.getDate())
                .categoryId(income.getCategory()!=null ? income.getCategory().getId(): null)
                .categoryName(income.getCategory()!=null ? income.getCategory().getName(): null)
                .createdAt(income.getCreatedAt())
                .updatedAt(income.getUpdatedAt())
                .build();

    }
}
