import { component$, useSignal, useStore } from "@builder.io/qwik";
import { server$, type DocumentHead } from "@builder.io/qwik-city";
import { StepInfo } from "~/components/steps-info/StepInfo";
import { Steps } from "~/components/steps-section/Steps";
import { steps, stepsDetails } from "~/constants/step";




export default component$(() => {
  const currentActiveStep = useSignal(3);
  const userGatheredInformation= useStore({steps:[],total:0});
  // console.log(stepsDetails[currentActiveStep.value])
  const currentStep= useStore(stepsDetails[currentActiveStep.value]);
  const stepLength = steps.length;
  // console.log(currentStep)
  return (
    <>
      <section class=" border p-6 shadow-sm shadow-nuetral-cool-gray rounded-lg max-sm:w-11/12 max-sm:h-full font-Ubuntu bg-nuetral-alabaster">
        <div class="flex items-center justify-around gap-6 w-full h-full max-xs:flex-col max-xs:gap-3">
          <Steps steps={steps} active={currentActiveStep.value}/>
          <StepInfo stepsDetails={currentStep} active={currentActiveStep.value} stepLength={stepLength}/>
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
