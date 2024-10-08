package com.bytepushers.family.controllers;

import com.bytepushers.family.ApiResponse.ApiResponse;
import com.bytepushers.family.model.FamilyTree;
import com.bytepushers.family.services.FamilyTreeService;
import com.bytepushers.family.DAOs.FamilyTreeRepository;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class FamilyTreeController {
    private final FamilyTreeRepository familyTreeRepository;
    private final FamilyTreeService familyTreeService;

    public FamilyTreeController(FamilyTreeRepository familyTreeRepository, FamilyTreeService familyTreeService) {
        this.familyTreeRepository = familyTreeRepository;
        this.familyTreeService = familyTreeService;
    }

    @PostMapping("/family-tree")
    public ResponseEntity<Object> createFamilyTree(
            @Valid @RequestBody FamilyTree familyTree,
            BindingResult bindingResult
    ) {
        //check for validation errors
        if (bindingResult.hasErrors()){
            ApiResponse response = new ApiResponse<>(
                    bindingResult.getAllErrors(),
                    "validation failed",
                    400
            );
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
//        System.out.println(familyTree);

        FamilyTree familyTreeCreated = familyTreeService.createFamilyTree(familyTree);
        ApiResponse response = new ApiResponse(
                null,
                "family tree  created successfully",
                201
        );
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

}