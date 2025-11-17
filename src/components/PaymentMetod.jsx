import { useState } from "react";
import {
  detectCardType,
  formatCardNumber,
  formatExpirationDate,
} from "../hooks/DetectCartType";
import FloatingInput from "../hooks/FloatingInput";
import {
  AmericanExpressIcon,
  CvvIcon,
  DinersClubIcon,
  MasterCardIcon,
  SecurityIcon,
  SelectArrow,
  VisaIcon,
} from "./icons";
import Tooltip from "../hooks/ToolTip";

export function PaymentMetod() {
  const [cardType, setCardType] = useState(null);

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    const type = detectCardType(formatted.replace(/ /g, ""));
    setCardType(type);

    e.target.value = formatted;
  };

  const handleExpirationChange = (e) => {
    const formatted = formatExpirationDate(e.target.value);
    e.target.value = formatted;
  };


  return (
    <form className="w-full lg:w-1/2">
      <div className=" p-6 border-b-2 border-gray-600">
        <h1 className="pt-2 pb-5 font-semibold text-gray-800 text-2xl">
          Entrega
        </h1>
        <FloatingInput
          id="address"
          label="Dirección, Escribe ej. Calle 10 #23-45"
          required
        />
        <div className="flex flex-col md:flex-row gap-4 mb-5 mt-5">
          <FloatingInput
            id="city"
            label="Ciudad"
            className="w-full md:w-1/2"
            required
          />
          <FloatingInput
            id="code"
            label="Código postal (opcional)"
            className="w-full md:w-1/2"
          />
        </div>
        <FloatingInput id="identification" label="Cédula" required />
        <div className="flex flex-col md:flex-row gap-4 mb-5 mt-5">
          <FloatingInput
            id="name"
            label="Nombre"
            className="w-full md:w-1/2"
            required
          />

          <FloatingInput
            id="last-name"
            label="Apellidos"
            className="w-full md:w-1/2"
            required
          />
        </div>
        <FloatingInput id="cellphone" label="Teléfono" required />
        <div className="flex pt-5 ps-1">
          <input
            type="checkbox"
            name=""
            title=""
            id=""
            className="cursor-pointer w-4"
          />
          <h1 className="ps-2">
            Guardar mi información y consultar más rápidamente la próxima vez
          </h1>
        </div>
        <div className="pb-3">
          <h1 className="pt-8 pb-1 font-semibold text-gray-800 text-2xl">
            Pago
          </h1>
          <p className="text-gray-500 text-[14.5px]">
            Todas las transacciones son seguras.
          </p>
        </div>
        <div className="w-full border-2 p-6 rounded-lg border-gray-400">
          {/* TABS */}
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <input type="radio" defaultChecked className="accent-green-600" />
              <span className="font-semibold text-gray-800 text-lg">
                Tarjeta de crédito
              </span>
            </div>
            <div className="flex gap-2 items-center">
              {cardType === null && (
                <>
                  <VisaIcon className="h-7 w-7 opacity-50" />
                  <MasterCardIcon className="h-7 w-7 opacity-50" />
                  <AmericanExpressIcon className="h-7 w-7 opacity-50" />
                  <DinersClubIcon className="h-7 w-7 opacity-50" />
                </>
              )}

              {cardType === "visa" && <VisaIcon className="h-7 w-7" />}
              {cardType === "mastercard" && (
                <MasterCardIcon className="h-7 w-7" />
              )}
              {cardType === "amex" && (
                <AmericanExpressIcon className="h-7 w-7" />
              )}
              {cardType === "diners" && <DinersClubIcon className="h-7 w-7" />}
            </div>
          </div>
          <div className="mt-6">
            <FloatingInput
              id="card-number"
              label="Número de tarjeta"
              onChange={handleCardNumberChange}
              maxLength={19}
              required
            >
              <SecurityIcon className="w-5 h-5 text-gray-500" />
            </FloatingInput>

            <div className="flex flex-col md:flex-row gap-4 mt-5">
              <FloatingInput
                id="expiration"
                label="Fecha de vencimiento (MM / AA)"
                className="w-full md:w-1/2"
                onChange={handleExpirationChange}
                maxLength={7}
                required
              />
              <FloatingInput
                id="cvv"
                label="Código de seguridad"
                className="w-full md:w-1/2"
                maxLength={4}
                required
              >
                <Tooltip text="Código de seguridad de 3 dígitos ubicado normalmente en la parte trasera de la tarjeta. Para American Express tiene 4 dígitos en la parte frontal.">
                  <CvvIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                </Tooltip>
              </FloatingInput>
            </div>

            <FloatingInput
              id="card-name"
              label="Nombre del titular"
              className="mt-5"
              required
            />
            <div className="flex cursor-pointer flex-col md:flex-row gap-4 mt-5">
              {/* SELECT */}
              <div className="relative w-full md:w-1/3">
                <select id="document-type"
                  className="
      w-full appearance-none p-3
      border border-gray-400 rounded-lg bg-white
      text-gray-700 outline-none cursor-pointer
    "
                >
                  <option>C.C.</option>
                  <option>C.E.</option>
                  <option>NIT</option>
                </select>

                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <SelectArrow />
                </div>
              </div>

              <FloatingInput
                id="document-number"
                label="Número de documento"
                className="w-full md:w-2/3"
                required
              />
            </div>
            <div className="relative mt-5">
              <select id="installments"
                className="
          w-full p-3 border appearance-none border-gray-400 rounded-lg bg-white
          text-gray-500 outline-none cursor-pointer
        "
              >
                <option>Cuotas</option>
                <option>1 cuota</option>
                <option>2 cuotas</option>
                <option>3 cuotas</option>
                <option>6 cuotas</option>
                <option>12 cuotas</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <SelectArrow />
              </div>
            </div>

            <p className="text-gray-500 text-xs mt-3">
              Si hay intereses, los aplicará y cobrará tu banco.
            </p>
            <div className="flex items-center mt-5">
              <input
                type="checkbox"
                className="w-4 h-4 accent-green-600"
                defaultChecked
              />
              <span className="ps-2 text-gray-700">
                Usar la dirección de envío como dirección de facturación
              </span>
            </div>
          </div>
        </div>
        <button type="submit" className="container mt-5 border rounded-lg p-3 cursor-pointer text-white font-medium bg-[rgb(10,173,10)]  border-green-600 focus:ring-green-300 hover:bg-[rgb(0,140,0)] hover:border-[rgb(0,140,0)] ">
          Pagar ahora{" "}
        </button>
      </div>
    </form>
  );
}
