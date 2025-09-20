
import React from "react";
import { format } from "date-fns";
import { BodyCardContent, DescriptionLine, StyledButton } from "../CurrencyCard/FullCurrencyCard.styles";
import CenteredComponent from "../CenteredComponent";
import { Column } from "../../styles/shared-styles";
import { IconButton, Tooltip, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import VoucherBilling from "../../models/VoucherBilling";
import ItemProperty from "../ItemProperty";
import CheckIcon from "@mui/icons-material/Check";

/**
 * Minimal React + TypeScript demo showing three ways to open a WhatsApp chat:
 * 1) Simple link using wa.me (recommended)
 * 2) Link using api.whatsapp.com (fallback for some environments)
 * 3) Programmatic open via window.open
 *
 * ✅ Works for WhatsApp (mobile & desktop app) and WhatsApp Web
 * ✅ Sanitizes phone number; expects full international format (e.g., Brazil: 55DDDNÚMERO)
 */

type WhatsAppLinkProps = {
  /** Full international phone number: e.g. "5599999999999" (no +, no spaces) */
  phone: string;
  /** Prefilled message for the chat */
  text?: string;
  /**
   * If true, uses https://api.whatsapp.com/send instead of https://wa.me/
   * Both work; wa.me is the short form. Some corporate environments prefer api.whatsapp.com
   */
  useApiVariant?: boolean;
  /** Optional aria-label override for accessibility */
  ariaLabel?: string;
  /** Children rendered inside the anchor (text, button, etc.) */
  children: React.ReactNode;
  /** Open in new tab (default: true) */
  newTab?: boolean;
};

function sanitizePhone(raw: string): string {
  // Keep digits only
  const digits = (raw || "").replace(/\D+/g, "");
  return digits;
}

function buildWhatsAppUrl({ phone, text, useApiVariant }: { phone: string; text?: string; useApiVariant?: boolean }) {
  const n = sanitizePhone(phone);
  const encoded = text ? encodeURIComponent(text) : undefined;
  if (useApiVariant) {
    // https://api.whatsapp.com/send?phone=5599999999999&text=...
    const base = `https://api.whatsapp.com/send?phone=${n}`;
    return encoded ? `${base}&text=${encoded}` : base;
  }
  // https://wa.me/5599999999999?text=...
  return encoded ? `https://wa.me/${n}?text=${encoded}` : `https://wa.me/${n}`;
}

export function WhatsAppLink({ phone, text, useApiVariant, ariaLabel, children, newTab = true }: WhatsAppLinkProps) {
  const href = buildWhatsAppUrl({ phone, text, useApiVariant });
  const targetAux = newTab ? "_blank" : undefined;
  const relAux = newTab ? "noopener noreferrer" : undefined;
  return (
    <a
      href={href}
      aria-label={ariaLabel || "Abrir conversa no WhatsApp"}
      target={targetAux}
      rel={relAux}
      className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 shadow hover:shadow-md transition border border-gray-200"
    >
              <CenteredComponent>
      <ItemProperty>
      <div 
      className="font-medium"
      
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    wordBreak: "break-word",   // força a quebra de palavras longas
                    overflowWrap: "break-word" // equivalente, para compatibilidade
                  }}>
        {children}
      </div>
      </ItemProperty>
      <ItemProperty>
      {/* WhatsApp glyph (SVG) */}
      {/*<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.9 11.9 0 0 0 12.06 0C5.5 0 .12 5.38.12 12c0 2.1.55 4.09 1.6 5.87L0 24l6.28-1.64A11.84 11.84 0 0 0 12.06 24c6.56 0 11.94-5.38 11.94-12 0-3.19-1.24-6.18-3.48-8.52ZM12.06 22a9.86 9.86 0 0 1-5.03-1.37l-.36-.21-3.72.97.99-3.62-.24-.37A9.94 9.94 0 1 1 12.06 22Zm5.67-7.36c-.31-.16-1.83-.9-2.11-1-.28-.1-.49-.15-.7.16-.2.31-.8 1-.98 1.21-.18.21-.36.23-.67.08-.31-.16-1.3-.48-2.48-1.53-.92-.79-1.55-1.77-1.73-2.07-.18-.31 0-.47.14-.62.14-.14.31-.37.46-.55.15-.18.2-.31.31-.52.1-.2.05-.39-.03-.55-.08-.16-.7-1.67-.96-2.29-.25-.6-.5-.52-.7-.53l-.59-.01c-.2 0-.52.08-.8.39-.28.31-1.06 1.04-1.06 2.53 0 1.49 1.09 2.94 1.24 3.14.15.2 2.14 3.26 5.19 4.58.73.31 1.3.5 1.74.64.73.23 1.39.2 1.91.12.58-.09 1.83-.75 2.09-1.47.26-.71.26-1.32.18-1.47-.08-.15-.28-.23-.59-.39Z" />
      </svg>*/}
      
                <Tooltip title={"Copiado!"}>
                  <IconButton color="primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      style={{ verticalAlign: "middle" }}
                    >
                      <path d="M20.52 3.48A11.9 11.9 0 0 0 12.06 0C5.5 0 .12 5.38.12 12c0 2.1.55 4.09 1.6 5.87L0 24l6.28-1.64A11.84 11.84 0 0 0 12.06 24c6.56 0 11.94-5.38 11.94-12 0-3.19-1.24-6.18-3.48-8.52ZM12.06 22a9.86 9.86 0 0 1-5.03-1.37l-.36-.21-3.72.97.99-3.62-.24-.37A9.94 9.94 0 1 1 12.06 22Zm5.67-7.36c-.31-.16-1.83-.9-2.11-1-.28-.1-.49-.15-.7.16-.2.31-.8 1-.98 1.21-.18.21-.36.23-.67.08-.31-.16-1.3-.48-2.48-1.53-.92-.79-1.55-1.77-1.73-2.07-.18-.31 0-.47.14-.62.14-.14.31-.37.46-.55.15-.18.2-.31.31-.52.1-.2.05-.39-.03-.55-.08-.16-.7-1.67-.96-2.29-.25-.6-.5-.52-.7-.53l-.59-.01c-.2 0-.52.08-.8.39-.28.31-1.06 1.04-1.06 2.53 0 1.49 1.09 2.94 1.24 3.14.15.2 2.14 3.26 5.19 4.58.73.31 1.3.5 1.74.64.73.23 1.39.2 1.91.12.58-.09 1.83-.75 2.09-1.47.26-.71.26-1.32.18-1.47-.08-.15-.28-.23-.59-.39Z" />
                    </svg>
                  </IconButton>
                </Tooltip>
      </ItemProperty>
      </CenteredComponent>
    </a>
  );
}

/** Optional button that opens WhatsApp programaticamente (sem <a>) */
export function WhatsAppButton({ phone, text, useApiVariant, label = "Falar no WhatsApp" }: { phone: string; text?: string; useApiVariant?: boolean; label?: string }) {
  const onClick = () => {
    const href = buildWhatsAppUrl({ phone, text, useApiVariant });
    window.open(href, "_blank", "noopener,noreferrer");
  };
  return (
    <button onClick={onClick} className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 shadow hover:shadow-md transition border border-gray-200">
      <span>{label}</span>
    </button>
  );
}


const CheckPaymentCompoment = ({id, chekPayment, ...style}: { id:number, chekPayment:Function, style?: {} }) => {

    let count = 0;
    let end = false;

    
    const irParaProximaPagina = () => {
        chekPayment();
    };

    return (
        
    <CenteredComponent>
        <DescriptionLine {...style}>
            <Column>
            
                <Typography variant="body2">
                    Verificar
                    
                </Typography>
                <StyledButton onClick={irParaProximaPagina}>
                    <RefreshIcon style={{backgroundColor: "#6B61F5", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}>
                        Verificar
                    </RefreshIcon>
                </StyledButton> 

            </Column>

        </DescriptionLine>
    </CenteredComponent>
    );
}

interface ManualValidationProps {
    voucherBilling: VoucherBilling;
    key: number;
    chekPayment: Function;
}

export default function ManualValidationActions({voucherBilling,key,chekPayment}: ManualValidationProps) {
    const phone = voucherBilling.paymentWayJoins.phoneMessage; // TODO: troque pelo seu número WhatsApp
    const texto = `Olá! Acabo de pagar o vale cupom \"${voucherBilling.vouchers.hid}\". Segue abaixo o comprovante de pagamento.`;

  
    const convertdateAndTime = (myDate?:Date, myTime?:number) => {
        let result1 = !!myDate ? format(myDate, "'Pago em ' dd/MM/yyyy', às' H:mm; "): "";
        return result1
    };

    var paidAtVar:Date | undefined = voucherBilling.transferences?.createdAt ;

    if(typeof paidAtVar == 'string'){
        paidAtVar = new Date(paidAtVar)
    }

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="max-w-xl w-full space-y-6">

        {/* 1) Link curto com wa.me */}
        {(!!phone?
        <WhatsAppLink phone={!!phone?phone:""} text={texto}>
          Informe ao emitente que você pagou o vale e compartilhe o comprovante de pagamento para verificação.
        </WhatsAppLink>
            :
        <></>
        )}
        

        <BodyCardContent style={{background: 'white'}}>
            <CheckPaymentCompoment
                style={{
                    marginBottom: '5px'
                }}
                id={voucherBilling.id}
                chekPayment={chekPayment}/>
                        
        </BodyCardContent> 

        {/* 2) Variante api.whatsapp.com */}
        {/*<WhatsAppLink phone={phone} text={texto} useApiVariant>
          Abrir no WhatsApp (api.whatsapp.com)
        </WhatsAppLink>*/}

        {/*<div className="text-sm text-gray-500 pt-4">
          <p><strong>Dicas rápidas:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use o número completo no padrão internacional (sem "+", sem espaços e sem símbolos).</li>
            <li>Para o Brasil, inicie com <code>55</code>, depois DDD e número (ex.: <code>5511912345678</code>).</li>
            <li>Use <code>encodeURIComponent</code> para o texto ficar correto com acentos e emojis.</li>
            <li>Para rastrear cliques, envolva o componente com seu sistema de analytics.</li>
          </ul>
        </div>*/}
      </div>
    </main>
  );
}
