import { component$ } from "@builder.io/qwik";

interface ParentProps{
  serviceName: string;
  serviceCaption:string;
  price: number | any;
  isMonthly: boolean;

}

export const StepThree = component$<ParentProps>(({serviceName ,serviceCaption , price , isMonthly}) => {
  return (
    <>
      <div class="mx-4">
        <input
          type="checkbox"
          class=" checked:bg-primary-purplish-blue w-4 h-4  border-nuetral-light-gray rounded-sm"
          name={serviceName}
          id={serviceName}
        />
      </div>
      <hgroup class="mx-4 p-0 flex flex-col items-start justify-center w-1/2 justify-self-start">
        <h4 class=" text-left text-md font-c-bold text-primary-marine-blue">
          {serviceName}
        </h4>
        <p class=" text-left text-nuetral-cool-gray text-sm">
          {serviceCaption}
        </p>
      </hgroup>

      <div class=" text-left ml-auto">
        {
          <p class=" text-left text-primary-purplish-blue">
            +${price} {isMonthly ? "/mo" : "/yr"}{" "}
          </p>
        }
      </div>
    </>
  );
});
