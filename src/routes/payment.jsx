import { PaymentMetod } from "../components/PaymentMetod";
import { ResumenPage } from "../components/Resumen";
export default function PaymentPage() {


  return (
    <div className="pt-8 bg-gray-100 mx-auto px-4">
      <h1 className="text-2xl text-center font-semibold pb-5">FACTURACIÓN</h1>
      <div className="container mx-auto flex flex-col lg:flex-row pb-16">
        <PaymentMetod />
        <ResumenPage />
      </div>
    </div>
  );
}
