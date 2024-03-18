package com.groom.demo.code.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProjectCreateRequest {
    private String imageName;
    private String language;
    private String owner;


}