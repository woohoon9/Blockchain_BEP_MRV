package com.woohoon9.bep.mrv.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonDeserialize(builder = CarbonCredit.CarbonCreditBuilder.class)
@Builder(toBuilder = true)
public class CarbonCredit {

    @JsonProperty
    String item;

    @JsonProperty
    String coal;

    @JsonProperty
    String naturalGas;

    @JsonProperty
    String oil;

    @JsonProperty
    String ghgEmissionReduction;

    @JsonPOJOBuilder(withPrefix = "")
    public static class CarbonCreditBuilder {}
}
