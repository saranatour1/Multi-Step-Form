import { component$, useSignal, $ } from "@builder.io/qwik";
import NavigateBtns from "../navigate-btns/NavigateBtns";
import Arcade from "~/media/icon-arcade.svg";
import Advanced from "~/media/icon-advanced.svg";
import Pro from "~/media/icon-pro.svg";


interface ParentProps {
  stepsDetails: {
    name: string;
    stepGuide: string;
    infoToBeGathered: string[];
    planOptions?:
      | {
          name: string;
          price: {
            monthly: number;
            yearly: number;
            sale: string;
          };
        }[]
      | undefined;
    services?:
      | {
          serviceName: string;
          serviceCaption: string;
          price: [string, number][]; // Array of tuples
        }[]
      | undefined;
    html?: string;
  };
  active: number;
  stepLength: number;
}

export const StepInfo = component$<ParentProps>(
  ({ stepsDetails, active, stepLength }) => {
    /** Step 2 */
    const isMonthly = useSignal(false);
    const isYearly = useSignal(true);

    const isChecked = useSignal(false);

    const gatheredInfo = useSignal({ planType: 'Arcade', planPricing:'Monthly', price: 9, addons:[['online Service',1]],total:10 });

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

    console.log(isChecked.value);
    return (
      <div class="flex-1 border h-full">
        <div class="p-16 flex flex-col h-full w-full gap-4 justify-normal">
          <hgroup class="">
            <h1 class="text-4xl font-c-bold pb-1 text-primary-marine-blue">
              {stepsDetails.name}
            </h1>
            <p class="text-nuetral-cool-gray text-lg">
              {stepsDetails.stepGuide}
            </p>
          </hgroup>
          <div class="border w-full">
            {stepsDetails.infoToBeGathered.map((info, index) =>
              active === 0 ? (
                <div key={index} class="mb-4 h-1/3 flex flex-col">
                  <label
                    for={info}
                    class="text-primary-marine-blue font-c-normal mb-1 capitalize"
                  >
                    {info}
                  </label>
                  <input
                    type={index === 1 ? "email" : "text"}
                    class="h-12 w-full px-2 placeholder:ps-2 placeholder-shown:ps-2 border border-neutral-light-gray rounded-lg"
                    placeholder={
                      index === 0
                        ? "e.g. Stephan King"
                        : index === 1
                        ? "e.g. stephanking@lorem.com"
                        : "e.g. +1 234 567 890"
                    }
                  />
                </div>
              ) : active === 1 ? (
                <div key={index}>
                  <div class="flex w-full justify-between">
                    <div class="grid grid-cols-3 gap-4 h-52 my-3 w-full space-x-0">
                      {stepsDetails.planOptions?.map((_item, key) => (
                        <div
                          key={key}
                          class={`col-span-1 w-full border border-neutral-light-gray  p-4 h-full flex flex-col justify-between items-start rounded-lg hover:border-primary-purplish-blue hover:cursor-pointer
                    
                          ${
                            planCheck.value ===key &&
                              "border border-primary-purplish-blue"
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
                            <p class="text-nuetral-cool-gray leading-6 ">
                              {isMonthly.value
                                ? "$" + _item.price.monthly + "/mo"
                                : "$" + _item.price.yearly + "/yr"}
                            </p>
                            {isChecked.value && (
                              <p class="text-primary-marine-blue leading-6 text-sm ">
                                {_item.price.sale}
                              </p>
                            )}
                          </hgroup>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div class="flex justify-center items-center w-full h-16 border p-2 mt-3 rounded-lg bg-nuetral-magnolia">
                    <span
                      class={`mr-3 ${
                        !isChecked.value && "text-primary-marine-blue"
                      }`}
                    >
                      Monthly
                    </span>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked.value}
                        class="sr-only peer"
                        onChange$={() => toggleChange()}
                      />
                      <div class="w-11 h-6 bg-primary-marine-blue peer-focus:outline-none   dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-marine-blue"></div>
                      {/* <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span> */}
                    </label>
                    <span
                      class={`ml-3 ${
                        isChecked.value && "text-primary-marine-blue"
                      }`}
                    >
                      Yearly
                    </span>
                  </div>
                </div>
              ) : active === 2 ? (
                <div class="flex flex-col justify-between w-full h-64">
                  {stepsDetails?.services && 
                    stepsDetails.services?.map((item,idx) => (
                      <div class="w-full h-2/6 border p-4 flex justify-normal items-center my-1 rounded-lg hover:border-primary-purplish-blue hover:cursor-pointer" key={idx}>
                        <div class="mx-4">
                          <input type="checkbox" class=" checked:bg-primary-purplish-blue w-4 h-4  border-nuetral-light-gray rounded-sm" name={item.serviceName} id={item.serviceName} />
                        </div>
                        <hgroup class='mx-4 p-0 flex flex-col items-start justify-center w-1/2 justify-self-start'>
                            <h4 class=" text-left text-md font-c-bold text-primary-marine-blue">
                              {item.serviceName}
                            </h4>
                            <p class=" text-left text-nuetral-cool-gray text-sm">
                              {item.serviceCaption}
                            </p>
                        </hgroup>

                          <div class=" text-left ml-auto">
                            {<p class=" text-left text-primary-purplish-blue">+${item.price} {isMonthly.value ? '/mo':'/yr'} </p>}    
                          </div>
                      </div>
                    ))
                  }
                  </div>
              ) : active === 3 ? (
                <div class="w-full h-60  border rounded-lg">
                  {Object.entries(gatheredInfo.value).length > 0 && 
                  <div class='h-full'>
                    <div class="flex w-full justify-between  items-center p-4">
                    <hgroup>
                    <h5 class='text-lg text-primary-marine-blue font-c-semi-bold'>{gatheredInfo.value.planType} ({ (isMonthly.value ? 'Monthly': 'Yearly')})</h5>
                    <p>
                      <button class="text-nuetral-cool-gray hover:underline">
                        Change
                      </button>
                    </p>
                    </hgroup>
                    <p class="text-primary-marine-blue">
                      ${gatheredInfo.value.price} {(isMonthly.value ? '/mo': '/yr')}
                    </p>
                    </div>
                    <hr class='h-px my-1 bg-gray-200 border-0 dark:bg-gray-700 w-11/12 flex items-center justify-center text-center mx-auto' />
                        <div class='p-4 w-full'>
                          {gatheredInfo.value.addons.map(([key,value],idx) => 
                            <div key={idx} class="flex justify-content-between ">
                                  <p class="text-left mr-auto">{key}</p>
                                  <p class="text-right ml-auto">{value}</p>
                                </div>
                          )}
                        </div>
                  </div>}
                </div>
              ) : (
                <p>Loading</p>
              )
            )}
          </div>

          <NavigateBtns active={active} stepLength={stepLength} />
        </div>
      </div>
    );
  }
);
