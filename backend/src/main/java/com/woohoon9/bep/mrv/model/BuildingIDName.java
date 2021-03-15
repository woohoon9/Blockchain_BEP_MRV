package com.woohoon9.bep.mrv.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonDeserialize(builder = BuildingIDName.BuildingIDNameBuilder.class)
@Builder(toBuilder = true)
public class BuildingIDName {

    @JsonProperty
    String name;

    @JsonProperty()
    String id;

    @JsonPOJOBuilder(withPrefix = "")
    public static class BuildingIDNameBuilder {}
}
