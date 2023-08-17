import { component$, useSignal, $, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';



import { StepInfo } from "~/components/steps-info/StepInfo";
import { Steps } from "~/components/steps-section/Steps";
import { steps, stepsDetails } from "~/constants/step";




export default component$(() => {
  const currentActiveStep = useSignal(0);
  const userInformation = useSignal({name:'',email:'',mobileNumber:'',planType:'',planPrice:0, isMonthly:false , addOns:[] , total:0 });
  const currentStep= useSignal(stepsDetails[currentActiveStep.value]);
  const stepLength = steps.length;

  // const goToNext = useSignal(true);
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
    // console.log("Current Step" , currentActiveStep.value);
  });

  const backBtn$ =$(()=>{
    if(currentActiveStep.value!==0){
      currentActiveStep.value -= 1;
    }
  })



  /**
   * Step one Information: name, email, mobile
   * 
   */

  const personalInformation$ =$((text:string, index:number)=>{
    if(index ===0){
      userInformation.value.name = text;
    }else if(index===1){
      userInformation.value.email = text;
    }else if(index ===2){
      userInformation.value.mobileNumber = text;
    }

  })


  const planTypePrice$ =$((planType:string,planPrice:number,isMonthly:boolean)=>{
    userInformation.value.planType = planType;
    userInformation.value.isMonthly = isMonthly;
    userInformation.value.planPrice= planPrice;
    userInformation.value.total = userInformation.value.planPrice;
  })

  const setAddOns$ =$((service:string ,price:number)=>{
    // Something is wrong here
    
  })
  console.log(userInformation.value.addOns)

// Logging user information with additional properties
console.log(
  `Hello! Here's your user information:
  Name: ${userInformation.value.name}
  Email: ${userInformation.value.email}
  Mobile Number: ${userInformation.value.mobileNumber}
  Plan Type: ${userInformation.value.planType}
  Plan Price: ${userInformation.value.planPrice}
  Is Monthly: ${userInformation.value.isMonthly}
  Add ons? : ${userInformation.value.addOns}
  total:${userInformation.value.total}`
);




  return (
    <>
      <section class=" border p-6 shadow-sm shadow-nuetral-cool-gray rounded-lg max-sm:w-11/12 max-sm:h-full font-Ubuntu bg-nuetral-alabaster">
        <div class="flex items-center justify-around gap-6 w-full h-full max-xs:flex-col max-xs:gap-3">
          <Steps steps={steps} active={currentActiveStep.value}/>
          <StepInfo 
          stepsDetails={currentStep.value}
          active={currentActiveStep.value} 
          stepLength={stepLength} 
          addStep$={addStep$} 
          backBtn$={backBtn$}  
          store={userInformation.value}
          personalInformation$={personalInformation$}
          planTypePrice$={planTypePrice$}
          setAddOns$={setAddOns$}
          />
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
