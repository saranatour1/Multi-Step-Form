import type { PropFunction } from "@builder.io/qwik";
import { component$, useSignal, $ } from '@builder.io/qwik';
import { CheckBox } from "./checkBox";


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

export const StepThree = component$<ParentProps>(({ services, isMonthly, key, setAddOns$ }) => {
  // Create a Set to store selected services
  const selectedServices = useSignal(new Set());

  // // Function to handle adding/removing services
  // const toggleService = $(serviceName => {

  //   if (selectedServices.value.has(serviceName)) {
  //     // If service is already selected, remove it
  //     selectedServices.value.delete(serviceName);

  //   } else {
  //     // If service is not selected, add it
  //     selectedServices.value.add(serviceName);
  //     let item = services.filter((item)=> item.serviceName===serviceName).map((item)=>item.price);
  //     setAddOns$(serviceName, item[0])
  //   }
  //   // Update the list of selected services
  //   // setAddOns$(Array.from(selectedServices.value), isMonthly);
  //   console.log(selectedServices.value)
  // });

  return (
    <div class="flex flex-col justify-between w-full h-64" key={key}>
      {services.map((item, idx) => (
        <CheckBox isMonthly={isMonthly} key={idx} serviceName={item.serviceName} serviceCaption={item.serviceCaption} price={item.price}/>
      ))}
    </div>
  );
});
