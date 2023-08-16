import { component$ } from '@builder.io/qwik';


interface ParentProps{
  planType: string;
  isMonthly:boolean;
  price:number | any;
  addons: (string | number)[][];
  total: number;
}
export const StepFour = component$<ParentProps>(({planType,isMonthly,total,addons,price}) => {
  return (
    <>
    <div class="h-auto bg-nuetral-magnolia rounded-xl">
      <div class="flex w-full justify-between  items-center p-4">
        <hgroup>
          <h5 class="text-lg text-primary-marine-blue font-c-semi-bold">
            {planType} (
            {isMonthly ? "Monthly" : "Yearly"})
          </h5>
          <p>
            <button class="text-nuetral-cool-gray hover:underline">
              Change
            </button>
          </p>
        </hgroup>
        <p class="text-primary-marine-blue font-c-semi-bold">
          ${price}{" "}
          {isMonthly ? "/mo" : "/yr"}
        </p>
      </div>
      <hr class="h-px my-1 bg-[#d1d5db] border-0 dark:bg-gray-700 w-11/12 flex items-center justify-center text-center mx-auto" />
      <div class="p-5 w-full pb-5">
        {addons.map(
          ([key, value], idx) => (
            <div
              key={idx}
              class="flex justify-content-between"
            >
              <p class="text-left mr-auto text-nuetral-cool-gray text-sm">
                {key}
              </p>
              <p class="text-right ml-auto text-primary-marine-blue text-sm">
                {" "}
                +${value} {isMonthly ? "/mo" : "/yr"}{" "}
              </p>
            </div>
          )
        )}
      </div>
    </div>
    <div class="mt-5 px-4 flex justify-between items-center">
      <p class=" text-nuetral-cool-gray text-sm">
        Total ({isMonthly ? "per month" : "per year"})
      </p>
      <p class="text-primary-purplish-blue font-bold text-lg">
        ${total}{" "}
        {isMonthly ? "/mo" : "/yr"}
      </p>
    </div>
  </>
  )
});