package com.pm.moneymanager.service;

import com.pm.moneymanager.dto.ExpenseDTO;
import com.pm.moneymanager.dto.IncomeDTO;
import com.pm.moneymanager.model.Profile;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ExpenseService expenseService;
    private final ProfileService profileService;
    private final IncomeService incomeService;

    public Map<String, Object> getDashboardData() {
        Profile profile = profileService.getCurrentProfile();
        Map<String, Object> data = new LinkedHashMap<>();
        List<IncomeDTO> latestIncome = incomeService.getLatest5IncomesForCurrentUser();
        List<ExpenseDTO> latestExpense = expenseService.getLatest5ExpensesForCurrentUser();
        concat()


    }
}
