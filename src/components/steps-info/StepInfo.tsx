import type { PropFunction } from "@builder.io/qwik";
import { component$, useSignal} from "@builder.io/qwik";
import NavigateBtns from "../navigate-btns/NavigateBtns";

import { Title } from "./Title";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepFour } from "./StepFour";
import { Success } from "./Success";

interface userStore{
  name:string;
  email:string;
  mobileNumber: string;
  planType: string;
  planPrice:string;
  isMonthly:boolean;
  addOns:(string)[];
  total:number;
}

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
  backBtn$: PropFunction<() => void>;
  personalInformation$: PropFunction<(text:string,index:number) => void>;
  planTypePrice$: PropFunction<(planType:string,planPrice:number,isMonthly:boolean)=>void>;
  setAddOns$: PropFunction<(service:string, price:number)=>void>;
  store: userStore;

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
  ({ stepsDetails, active, stepLength, addStep$, backBtn$ ,store , personalInformation$, planTypePrice$, setAddOns$}) => {

    /** Step 2 */
    const isConfirmed = useSignal(false);
    const planOptions: PlanOption[] = stepsDetails.planOptions ?? [];

    console.log(store.isMonthly)
    return (
      <div class="flex-1  h-full">
        {isConfirmed.value ? (
          <Success />
        ) : (
          <div class="p-16 flex flex-col h-full w-full gap-4 justify-normal">
            <Title
              stepHeading={stepsDetails.name}
              stepGuide={stepsDetails.stepGuide}
            />
            <div class=" w-full">
              {stepsDetails.infoToBeGathered.map((info, index) =>
                active === 0 ? (
                  <div key={index} class="mb-4 h-1/3 flex flex-col">
                    <StepOne info={info} index={index} personalInformation$= {personalInformation$ }/>
                  </div>
                ) : active === 1 ? (
                  <div key={index}>
                    <StepTwo planOptions={planOptions} planTypePrice$={planTypePrice$} />
                  </div>
                ) : active === 2 ? (
                  <>
                    {stepsDetails.services && (
                      <StepThree services={stepsDetails.services} isMonthly={store.isMonthly} key={index} setAddOns$={setAddOns$}/>
                    )}
                  </>
                ) : active === 3 ? (
                  <div class="w-full h-60 " key={index}>
                    {Object.entries(store).length > 0 && (
                      <StepFour
                        planType={store.planType}
                        isMonthly={store.isMonthly}
                        total={store.total}
                        addons={store.addOns}
                        price={store.planPrice}
                      />
                    )}
                  </div>
                ) : (
                  <p>Loading</p>
                )
              )}
            </div>

            <NavigateBtns
              active={active}
              stepLength={stepLength}
              addStep$={addStep$}
              backBtn$={backBtn$}

            />
          </div>
        )}
      </div>
    );
  }
);
