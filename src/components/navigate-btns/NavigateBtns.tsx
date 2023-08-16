import type { PropFunction} from '@builder.io/qwik';
import { component$, useSignal, $ } from '@builder.io/qwik';

interface ParentProps{
  active:number;
  stepLength:number;
  addStep$: PropFunction<() => void>;
}


export default component$<ParentProps>(({active , stepLength , addStep$}) => {

  /**
   * The first time we are on the form, the next button will be there so this is why it is now set to true
   */
  const isNext = useSignal(true);
  const isBack = useSignal(false);

  const endSuccess = useSignal(false);


  console.log((stepLength-active)-1)



  const skipToSubmit =$(()=>{
    
  })


  const previousPageBtn = $(()=>{})

  const nextPageBtn = $(()=>{
    if( (stepLength - active)-1 !==0 ){
      addStep$
    }
    console.log('I did something!!!')
  })


  // console.log(endSuccess.value)
  return (
    <div class=" justify-end mt-auto ">
      <div class="flex items-center justify-between">
        {endSuccess.value ? 
          <button class='px-4 py-3 bg-primary-purplish-blue rounded-lg text-white'
          preventdefault:click
          onClick$={(event) => skipToSubmit()}>
            Confirm
        </button>: 
        <div class='flex w-full justify-end px-2'>
          {isBack.value && (
            <button
              type='button'
              class='text-nuetral-cool-gray'
              onClick$={() => previousPageBtn()}
            >
              Go Back
            </button>
          )}

          <button
            class={`px-4 py-3 bg-primary-marine-blue rounded-lg text-white ${
              isBack.value ? 'ml-auto' : 'self-end justify-self-end'
            }`}
            onClick$={() =>  addStep$()}
          >
            Next Step
          </button>
        </div>
        }
      </div>
    </div>
  );
});