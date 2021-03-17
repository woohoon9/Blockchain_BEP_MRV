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
@JsonDeserialize(builder = CarbonCreditList.CarbonCreditListBuilder.class)
@Builder(toBuilder = true)
public class CarbonCreditList {

    @Builder.Default
    private List<CarbonCredit> ccList = new ArrayList<>();

    @JsonPOJOBuilder(withPrefix = "")
    public static class CarbonCreditListBuilder {}
}
