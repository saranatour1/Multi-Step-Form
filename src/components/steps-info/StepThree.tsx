import type { PropFunction } from "@builder.io/qwik";
import { component$, $ } from "@builder.io/qwik";
import { CheckBox } from "./CheckBox";

interface ParentProps {
  services: {
    serviceName: string;
    serviceCaption: string;
    price: number | any;
  }[];
  isMonthly: boolean;
  key: number;
  setAddOns$: PropFunction<(service: string, price: number) => void>;
}

export const StepThree = component$<ParentProps>(
  ({ services, isMonthly, key, setAddOns$ }) => {
    // Create a Set to store selected services


    const addItemToSet$ = $((service:string, price:number) => {

        setAddOns$(service,price)


    });

    return (
      <div class="flex flex-col justify-between w-full h-64" key={key}>
        {services.map((item, idx) => (
          <CheckBox
            isMonthly={isMonthly}
            key={idx}
            serviceName={item.serviceName}
            serviceCaption={item.serviceCaption}
            price={item.price}
            addItemToSet$={addItemToSet$}
          />
        ))}
      </div>
    );
  }
);
