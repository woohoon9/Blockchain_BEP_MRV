package com.woohoon9.bep.mrv.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonDeserialize(builder = EnergySavings.EnergySavingsBuilder.class)
@Builder(toBuilder = true)
public class EnergySavings {

    @JsonProperty
    String item;

    @JsonProperty
    String electricity;

    @JsonProperty
    String naturalGas;

    @JsonProperty
    String chilledWater;

    @JsonProperty
    String steam;

    @JsonProperty
    String energySaving;

    @JsonPOJOBuilder(withPrefix = "")
    public static class EnergySavingsBuilder {}
}
