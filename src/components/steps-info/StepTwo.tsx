import { component$, useSignal,$ } from "@builder.io/qwik";
import Arcade from "~/media/icon-arcade.svg";
import Advanced from "~/media/icon-advanced.svg";
import Pro from "~/media/icon-pro.svg";


/**
 * step Two info,
 * Where it has plan type, and plan pricing,
 *
 */


  interface PlanOption {
    name: string;
    price: {
      monthly: number;
      yearly: number;
      sale: string;
    };
  }

  interface ParentProps {
    planOptions: PlanOption[];
  }

export const StepTwo = component$<ParentProps>(({planOptions}) => {
  const isMonthly = useSignal(false);
  const isYearly = useSignal(true);
  const isChecked = useSignal(false);

  const planCheck = useSignal(0);

  const images = [Arcade, Advanced, Pro];

  const toggleChange = $(() => {
    isChecked.value = !isChecked.value;
    isYearly.value = !isChecked.value;
    isMonthly.value = !isChecked.value;
  });

  const handleOptionClick = $((index) => {
    planCheck.value = index === planCheck.value ? null : index;
    console.log(planCheck.value);
  });



  return (
    <>
      <div class="flex w-full justify-between">
        <div class="grid grid-cols-3 gap-4 h-52 my-3 w-full space-x-0">
          {planOptions.map((_item, key) => (
            <div
              key={key}
              class={`col-span-1 w-full border p-4 h-full flex flex-col justify-between items-start rounded-lg hover:border-primary-purplish-blue hover:cursor-pointer ${
                planCheck.value === key && "border-primary-purplish-blue"
              }`}
              onClick$={() => handleOptionClick(key)}
            >
              <img
                class="w-16"
                src={images[key]}
                alt={_item.name}
                width={40}
                height={40}
              />
              <hgroup class="py-1">
                <h3 class="font-c-bold text-md leading-6 text-primary-marine-blue">
                  {_item.name}
                </h3>
                <p class="text-nuetral-cool-gray leading-6">
                  {isMonthly.value
                    ? "$" + _item.price.monthly + "/mo"
                    : "$" + _item.price.yearly + "/yr"}
                </p>
                {isChecked.value && (
                  <p class="text-primary-marine-blue leading-6 text-sm">
                    {_item.price.sale}
                  </p>
                )}
              </hgroup>
            </div>
          ))}
        </div>
      </div>

      <div class="flex justify-center items-center w-full h-16 border p-2 mt-3 rounded-lg bg-nuetral-magnolia">
        <span class={`mr-3 ${!isChecked.value && "text-primary-marine-blue"}`}>
          Monthly
        </span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked.value}
            class="sr-only peer"
            onChange$={() => toggleChange()}
          />
          <div class="w-11 h-6 bg-primary-marine-blue peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-marine-blue"></div>
        </label>
        <span class={`ml-3 ${isChecked.value && "text-primary-marine-blue"}`}>
          Yearly
        </span>
      </div>
    </>
  );
});
