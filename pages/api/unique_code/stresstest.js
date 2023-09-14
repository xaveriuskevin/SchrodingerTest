"use strict";

const randomstring = require("randomstring");
const crypto = require("crypto");
const fs = require("fs");

export default async function handler(req, res) {
  let container = [];
  let duplicates = [];

  for (let i = 0; i <= 10000; i++) {
    let postfix =
      randomstring.generate({
        length: 12,
        charset: "alphanumeric",
      }) +
      "-" +
      Date.now();

    let referral_code_raw =
      "ESP-" +
      crypto
        .createHash("sha256")
        .update(postfix)
        .digest("base64")
        .substring(0, 7);

    let referral_code = referral_code_raw.toString().replace(/\//g, "A");

    container.push(referral_code);
  }

  let check_duplicates = container.filter(
    (item, index) => container.indexOf(item) !== index
  );
  duplicates.push(check_duplicates);

  fs.writeFileSync(
    "stresstest_referral_code_duplicates.json",
    JSON.stringify(duplicates)
  );

  fs.writeFileSync("stresstest_referral_code.json", JSON.stringify(container));

  return res.status(200).json({
    "Stress Test": "Completed",
  });
}
