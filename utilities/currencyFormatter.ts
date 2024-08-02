const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
const currencyFormatter = (
  str: number | string,
  currency: "usd" | "idr" = "usd"
): string => {
  switch (currency) {
    case "usd":
      // return formatter.format(str)
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(+str);

    case "idr":
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(+str);

    default:
      return formatter.format(+str);
  }
};

export const currencyFormatterWorklet = (
  str: number | string,
  currency: "usd" | "idr" = "usd"
) => {
  "worklet";

  switch (currency) {
    case "usd":
      // return formatter.format(str)
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(+str);

    case "idr":
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(+str);

    default:
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(+str);
  }
};

export default currencyFormatter;
