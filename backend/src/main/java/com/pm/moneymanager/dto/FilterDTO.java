package com.pm.moneymanager.dto;

import lombok.Data;

import java.time.LocalDate;

@Data

public class FilterDTO {
    private LocalDate startDate;
    private LocalDate endDate;
    private String keyword;
    private String type;
    private String sortFields;
    private String sortOrder;
}
