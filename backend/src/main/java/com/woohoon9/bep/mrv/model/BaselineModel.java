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
    String electricityMMBTU;

    @JsonProperty
    String naturalGasMMBTU;

    @JsonProperty
    String chilledWaterMMBTU;

    @JsonProperty
    String steamMMBTU;

    @JsonProperty
    String electricityKWH;

    @JsonProperty
    String naturalGasSCF;

    @JsonProperty
    String chilledWaterKTON;

    @JsonProperty
    String steamKLBS;

    @JsonProperty
    String totalMMBTU;

    @JsonProperty
    String coalMMBTU;

    @JsonProperty
    String gHGNaturalGasMMBTU;

    @JsonProperty
    String oilMMBTU;

    @JsonProperty
    String coalKG;

    @JsonProperty
    String naturalGasKG;

    @JsonProperty
    String oilKG;

    @JsonProperty
    String totalCO2EKG;

    @JsonProperty
    String totalCO2ETON;

    @JsonPOJOBuilder(withPrefix = "")
    public static class BaselineModelBuilder {}
}
