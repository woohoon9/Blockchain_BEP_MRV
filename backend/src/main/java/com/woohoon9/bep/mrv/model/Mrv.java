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

    @JsonProperty("ID")
    String id;

    @JsonPOJOBuilder(withPrefix = "")
    public static class MrvBuilder {}
}
