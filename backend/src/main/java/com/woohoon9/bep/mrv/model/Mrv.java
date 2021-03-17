package com.woohoon9.bep.mrv.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonDeserialize(builder = Mrv.MrvBuilder.class)
@Builder(toBuilder = true)
public class Mrv {

    @JsonProperty
    String objectType;

    @JsonProperty
    String id;

    @JsonProperty
    String unit;

    @JsonProperty
    String year;

    @JsonProperty
    String energyType;

    @JsonProperty
    float jan;

    @JsonProperty
    float feb;

    @JsonProperty
    float mar;

    @JsonProperty
    float apr;

    @JsonProperty
    float may;

    @JsonProperty
    float jun;

    @JsonProperty
    float jul;

    @JsonProperty
    float aug;

    @JsonProperty
    float sep;

    @JsonProperty
    float oct;

    @JsonProperty
    float nov;

    @JsonProperty
    float dec;

    @JsonProperty
    float sum;

    @JsonProperty
    float pv;

    @JsonPOJOBuilder(withPrefix = "")
    public static class MrvBuilder {}
}
