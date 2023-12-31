"use strict";
import supabase from "../../config/supabaseClient";
import myConfig from "../../config/development";

export default async function handler(req, res) {
  const request = req.body;
  const apiKey = req.headers[myConfig.headerKey];

  if (apiKey != process.env.apiKey) {
    return res.status(500).json({
      message: "Wrong Crendentials",
    });
  }

  let { data } = await supabase
    .from("referral")
    .select()
    .eq("user_address", request.address);

  if (data.length == 0) {
    return res.status(200).json({
      exist: false,
      referral_code: null,
    });
  } else {
    return res.status(200).json({
      exist: true,
      referral_code: data[0].referral_code,
    });
  }
}
