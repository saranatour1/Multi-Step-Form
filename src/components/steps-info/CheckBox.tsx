import type { PropFunction } from '@builder.io/qwik';
import { component$, useSignal, $, useTask$ } from '@builder.io/qwik';

interface ParentProps{
   serviceName: string;
    serviceCaption: string;
    price: number | any;
    key:number;
    isMonthly:boolean;
    addItemToSet$: PropFunction<(service: string, price: number) => void>;
}

export const CheckBox = component$<ParentProps>(({key, serviceName, serviceCaption,price , isMonthly ,addItemToSet$}) => {


  const isChecked = useSignal(false);

  const testVal= useSignal([{}]);

  const toggleService$ =$((service:string,price:number)=>{
    console.log(service,price)
    testVal.value.push({service:service, price:price});
    addItemToSet$(service,price)
  })

  useTask$(({ track}) => {
    // rerun this function  when `value` property changes.
    track(() => isChecked.value);
    console.log("hi I am checked" ,testVal.value)
  });


  return (
    <div
    class={`w-full h-2/6 border p-4 flex justify-normal items-center my-1 rounded-lg hover:border-primary-purplish-blue hover:cursor-pointer ${isChecked.value && 'border-primary-purplish-blue'}`}
    key={key}
    role='button'
    onClick$={()=> isChecked.value=!isChecked.value}
  >
    <div class="mx-4">
      <input
        type="checkbox"
        class="checked:bg-primary-purplish-blue w-4 h-4 border-nuetral-light-gray rounded-sm"
        name={serviceName}
        id={serviceName}
        checked={isChecked.value} // Check if the service is selected

        onChange$={() => toggleService$(serviceName ,isMonthly ? Number(price) : Number(price) * 10)} // Toggle the service when checkbox is clicked
      />
    </div>
    <hgroup class="mx-4 p-0 flex flex-col items-start justify-center w-1/2 justify-self-start">
      <h4 class="text-left text-md font-c-bold text-primary-marine-blue">{serviceName}</h4>
      <p class="text-left text-nuetral-cool-gray text-sm">{serviceCaption}</p>
    </hgroup>
    <div class="text-left ml-auto">
      {
        <p class="text-left text-primary-purplish-blue">
          +${isMonthly ? Number(price) : Number(price) * 10} {isMonthly ? "/mo" : "/yr"}{" "}
        </p>
      }
    </div>
  </div>
  );
});