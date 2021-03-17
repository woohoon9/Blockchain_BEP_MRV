package com.woohoon9.bep.mrv.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonDeserialize(builder = BaselineModel.BaselineModelBuilder.class)
@Builder(toBuilder = true)
public class BaselineModel {

    @JsonProperty
    String objectType;

    @JsonProperty
    String id;

    @JsonProperty
    float electricityMMBTU;

    @JsonProperty
    float naturalGasMMBTU;

    @JsonProperty
    float chilledWaterMMBTU;

    @JsonProperty
    float steamMMBTU;

    @JsonProperty
    float electricityKWH;

    @JsonProperty
    float naturalGasSCF;

    @JsonProperty
    float chilledWaterKTON;

    @JsonProperty
    float steamKLBS;

    @JsonProperty
    float totalMMBTU;

    @JsonProperty
    float coalMMBTU;

    @JsonProperty
    float gHGNaturalGasMMBTU;

    @JsonProperty
    float oilMMBTU;

    @JsonProperty
    float coalKG;

    @JsonProperty
    float naturalGasKG;

    @JsonProperty
    float oilKG;

    @JsonProperty
    float totalCO2EKG;

    @JsonProperty
    float totalCO2ETON;

    @JsonPOJOBuilder(withPrefix = "")
    public static class BaselineModelBuilder {}
}
