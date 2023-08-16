import type { PropFunction} from "@builder.io/qwik";
import { component$, useSignal} from "@builder.io/qwik";
import NavigateBtns from "../navigate-btns/NavigateBtns";

import { Title } from "./Title";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepFour } from "./StepFour";
import { Success } from "./Success";

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
  addStep$: PropFunction<() => void>;
}

interface PlanOption {
  name: string;
  price: {
    monthly: number;
    yearly: number;
    sale: string;
  };
}

export const StepInfo = component$<ParentProps>(
  ({ stepsDetails, active, stepLength , addStep$ }) => {
    /** Step 2 */
    const isMonthly = useSignal(true);
    const isYearly = useSignal(false);

    const isChecked = useSignal(false);

    const isConfirmed = useSignal(false);

    const gatheredInfo = useSignal({
      planType: "Arcade",
      planPricing: "Monthly",
      price: 9,
      addons: [["online Service", 1]],
      total: 10,
    });
    const planOptions: PlanOption[] = stepsDetails.planOptions ?? [];
    console.log(isChecked.value);
    return (
      <div class="flex-1  h-full">
        {isConfirmed.value ? <Success />:        <div class="p-16 flex flex-col h-full w-full gap-4 justify-normal">
          <Title
            stepHeading={stepsDetails.name}
            stepGuide={stepsDetails.stepGuide}
          />
          <div class=" w-full">
            {stepsDetails.infoToBeGathered.map((info, index) =>
              active === 0 ? (
                <div key={index} class="mb-4 h-1/3 flex flex-col">
                  <StepOne info={info} index={index} />
                </div>
              ) : active === 1 ? (
                <div key={index}>
                  <StepTwo planOptions={planOptions}/>
                </div>
              ) : active === 2 ? (
                <div class="flex flex-col justify-between w-full h-64">
                  {stepsDetails.services &&
                    stepsDetails.services.map((item, idx) => (
                      <div
                        class="w-full h-2/6 border p-4 flex justify-normal items-center my-1 rounded-lg hover:border-primary-purplish-blue hover:cursor-pointer"
                        key={idx}
                      >
                        <StepThree serviceName={item.serviceName} serviceCaption={item.serviceCaption} price={item.price} isMonthly={isMonthly.value}/>
                      </div>
                    ))}
                </div>
              ) : active === 3 ? (
                <div class="w-full h-60 ">
                  {Object.entries(gatheredInfo.value).length > 0 && (
                    <StepFour planType={gatheredInfo.value.planType} isMonthly={isMonthly.value} total={gatheredInfo.value.total} addons={gatheredInfo.value.addons} price={gatheredInfo.value.price}/>
                  )}
                </div>
              ) : (
                <p>Loading</p>
              )
            )}
          </div>

          <NavigateBtns active={active} stepLength={stepLength} addStep$={addStep$} />
        </div> }

      </div>
    );
  }
);
