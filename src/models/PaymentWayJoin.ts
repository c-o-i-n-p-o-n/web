import PaymentWay from "./PaymentWay";

export default interface PaymentWayJoin {
  id: number;
  paymentWays: PaymentWay;
  main: "0" | "1";
  phoneMessage?: string;
  financialKey?: string;
}