package com.pm.moneymanager.service;

import com.pm.moneymanager.dto.ExpenseDTO;
import com.pm.moneymanager.model.Category;
import com.pm.moneymanager.model.Expense;
import com.pm.moneymanager.model.Profile;
import com.pm.moneymanager.repository.CategoryRepository;
import com.pm.moneymanager.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;
    private final ProfileService profileService;

    public ExpenseDTO addExpense(ExpenseDTO expenseDTO) {
        Profile profile = profileService.getCurrentProfile();
        Category category = categoryRepository.findById(expenseDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        Expense newExpense = toEntity(expenseDTO, category, profile);
        expenseRepository.save(newExpense);
        return toDTO(newExpense);
    }

    public List<ExpenseDTO> getCurrentMonthExpensesForCurrentUser() {
        Profile profile = profileService.getCurrentProfile();
        LocalDate today = LocalDate.now();
        LocalDate startDate = today.withDayOfMonth(1);
        LocalDate endDate = today.withDayOfMonth(today.lengthOfMonth());
        List<Expense> list = expenseRepository.findByProfileIdAndDateBetween(profile.getId(), startDate, endDate);
        return list.stream().map(this::toDTO).toList();
    }

    private Expense toEntity(ExpenseDTO expenseDTO, Category category, Profile profile) {
        return Expense.builder()
                .name(expenseDTO.getName())
                .icon(expenseDTO.getIcon())
                .amount(expenseDTO.getAmount())
                .date(expenseDTO.getDate())
                .profile(profile)
                .category(category)
                .build();
    }

    private ExpenseDTO toDTO(Expense expense) {
        return ExpenseDTO.builder()
                .name(expense.getName())
                .icon(expense.getIcon())
                .amount(expense.getAmount())
                .date(expense.getDate())
                .categoryId(expense.getCategory()!=null ? expense.getCategory().getId(): null)
                .categoryName(expense.getCategory()!=null ? expense.getCategory().getName(): null)
                .createdAt(expense.getCreatedAt())
                .updatedAt(expense.getUpdatedAt())
                .build();

    }
}
