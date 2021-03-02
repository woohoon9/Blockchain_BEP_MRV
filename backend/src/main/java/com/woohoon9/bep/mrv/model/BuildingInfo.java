package com.woohoon9.bep.mrv.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonDeserialize(builder = BuildingInfo.BuildingInfoBuilder.class)
@Builder(toBuilder = true)
public class BuildingInfo {

    @JsonProperty
    String objectType;

    @JsonProperty
    String name;

    @JsonProperty("ID")
    String id;

    @JsonProperty
    String number;

    @JsonProperty
    String address;

    @JsonProperty
    String substantialCompletion;

    @JsonProperty
    String greenBuildingCertificate;

    @JsonPOJOBuilder(withPrefix = "")
    public static class BuildingInfoBuilder {}
}
