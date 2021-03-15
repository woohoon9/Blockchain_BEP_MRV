package com.woohoon9.bep.mrv.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonDeserialize(builder = BuildingIDNames.BuildingIDNamesBuilder.class)
@Builder(toBuilder = true)
public class BuildingIDNames {

    @Builder.Default
    private List<BuildingIDName> buildingList = new ArrayList<>();

    @JsonPOJOBuilder(withPrefix = "")
    public static class BuildingIDNamesBuilder {}
}
