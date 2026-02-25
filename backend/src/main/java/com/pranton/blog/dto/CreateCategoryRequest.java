package com.pranton.blog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateCategoryRequest {
    @Size(min = 2, max = 30, message = "Category size is not valid, min 2 max 30")
    @Pattern(regexp = "^[\\w\\s-]+$", message = "Category name can contain letters, numbers, spaces & hyphens")
    @NotBlank(message = "Category name is required")
    private String name;

}
