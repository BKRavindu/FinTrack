package com.pm.moneymanager.controller;

import com.pm.moneymanager.dto.CategoryDTO;
import com.pm.moneymanager.model.Category;
import com.pm.moneymanager.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO categoryDTO) {
        CategoryDTO savedCategory = categoryService.saveCategory(categoryDTO);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getCategories() {
        List<CategoryDTO> categories = categoryService.getCategoriesForCurrentUser();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/{type}")
    public ResponseEntity<List<CategoryDTO>> getCategoriesByTypeForCurrentUser(@PathVariable String type) {
        List<CategoryDTO> categoriesList = categoryService.getCategoriesByTypeForCurrentUser(type);
        return ResponseEntity.ok(categoriesList);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long categoryId, @RequestBody CategoryDTO categoryDTO) {
         CategoryDTO updatedCategory = categoryService.updateCategory(categoryId, categoryDTO);
         return ResponseEntity.ok(updatedCategory);
    }
}
