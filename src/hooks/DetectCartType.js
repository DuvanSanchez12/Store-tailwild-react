export function detectCardType(number) {
  const cleaned = number.replace(/\s+/g, "");

  if (/^4[0-9]{0,}$/.test(cleaned)) return "visa";

  if (
    /^(5[1-5][0-9]{0,}|2(2[2-9][0-9]{0,}|[3-6][0-9]{0,}|7[01][0-9]{0,}|720[0-9]{0,}))$/.test(
      cleaned
    )
  )
    return "mastercard";

  if (/^3[47][0-9]{0,}$/.test(cleaned)) return "amex";

  if (/^3(0[0-5]|6|8)[0-9]{0,}$/.test(cleaned)) return "diners";

  return null;
}

export const formatCardNumber = (value) => {
  const onlyNums = value.replace(/\D/g, "");
  return onlyNums.match(/.{1,4}/g)?.join(" ") || "";
};

export const formatExpirationDate = (value) => {
  let nums = value.replace(/\D/g, "");

  if (nums.length === 0) return "";

  if (nums.length === 1) {

    if (nums === "1") return "1";

    if (nums === "0") return "0";
    return "0" + nums;
  }
  let month = parseInt(nums.slice(0, 2), 10);
  if (month > 12) month = 12;
  const monthStr = month.toString().padStart(2, "0");

  if (nums.length <= 2) return monthStr;

  const year = nums.slice(2, 4);
  return `${monthStr} / ${year}`;
};
