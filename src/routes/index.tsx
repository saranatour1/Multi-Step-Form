import { component$, useSignal, useStore, $, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { StepInfo } from "~/components/steps-info/StepInfo";
import { Steps } from "~/components/steps-section/Steps";
import { steps, stepsDetails } from "~/constants/step";




export default component$(() => {
  const currentActiveStep = useSignal(0);
  const userGatheredInformation= useStore({steps:[],total:0});
  // console.log(stepsDetails[currentActiveStep.value])
  const currentStep= useSignal(stepsDetails[currentActiveStep.value]);
  const stepLength = steps.length;
  // console.log(currentStep)

  // useTask to change The Value of currrent step instantly on change 
  useTask$(({ track}) => {
    // rerun this function  when `value` property changes.
    track(() => currentActiveStep.value);
    currentStep.value =stepsDetails[currentActiveStep.value]; 
  });


  
  // function to 
  const addStep$ = $(()=>{
    if( (stepLength - currentActiveStep.value -1) !==0 ){
      currentActiveStep.value += 1;
    }
    console.log("Current Step" , currentActiveStep.value);
  });

  const backBtn$ =$(()=>{
    if(currentActiveStep.value!==0){
      currentActiveStep.value -= 1;
    }
  })




  return (
    <>
      <section class=" border p-6 shadow-sm shadow-nuetral-cool-gray rounded-lg max-sm:w-11/12 max-sm:h-full font-Ubuntu bg-nuetral-alabaster">
        <div class="flex items-center justify-around gap-6 w-full h-full max-xs:flex-col max-xs:gap-3">
          <Steps steps={steps} active={currentActiveStep.value}/>
          <StepInfo stepsDetails={currentStep.value} active={currentActiveStep.value} stepLength={stepLength} addStep$={addStep$} backBtn$={backBtn$} />
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Front End Mentor Challenge",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
