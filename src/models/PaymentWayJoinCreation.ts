import PaymentWay from "./PaymentWay";
import PaymentWayJoin from "./PaymentWayJoin";

export default interface PaymentWayJoinCreation {

  id?: number;
  paymentWay?: PaymentWay;
  main?: "0" | "1";
  phoneMessage?: string;
  financialKey?: string;
}


export function PaymentWayJoinToPaymentWayJoinCreation (paymentWayJoin?:PaymentWayJoin, changes?:PaymentWayJoinCreation): PaymentWayJoinCreation{
  return {
    
    id: changes?.id || paymentWayJoin?.id ,
    paymentWay: changes?.paymentWay || paymentWayJoin?.paymentWays ,
    main: changes?.main || paymentWayJoin?.main ,
    phoneMessage: changes?.phoneMessage || paymentWayJoin?.phoneMessage ,
    financialKey: changes?.financialKey || paymentWayJoin?.financialKey ,

  }
}