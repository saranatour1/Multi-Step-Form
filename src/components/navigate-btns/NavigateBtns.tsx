import type { PropFunction} from '@builder.io/qwik';
import { component$, useSignal, $, useTask$ } from '@builder.io/qwik';

interface ParentProps{
  active:number;
  stepLength:number;
  addStep$: PropFunction<() => void>;
  backBtn$: PropFunction<() => void>;
}


export default component$<ParentProps>(({active , stepLength , addStep$ , backBtn$ }) => {

  /**
   * The first time we are on the form, the next button will be there so this is why it is now set to true
   */
  const isNext = useSignal(true);
  const isBack = useSignal(false);

  const endSuccess = useSignal(false);


  console.log((stepLength-active)-1)


  useTask$(({ track}) => {
    // rerun this function  when `value` property changes.
    track(() => active);
    if(active!==0 || active === stepLength-1){
      isBack.value =true;
    }else{
      isBack.value =false;
    }

    if(active ===stepLength-1){
      isNext.value=false;
      endSuccess.value=true;
      isBack.value=true;
    }

  });
  

  const skipToSubmit =$(()=>{
    
  })


  const previousPageBtn = $(()=>{
    if(active !==0){
      isBack.value=true;
      backBtn$();
    }else{
      isBack.value=false;
    }
  })

  const nextPageBtn = $(()=>{
    if( (stepLength - active)-1 !==0 ){
      addStep$()
    }
    console.log('I did something!!!')
  })


  // console.log(endSuccess.value)
  return (
    <div class=" justify-end mt-auto ">
      <div class="flex items-center justify-between">
        {endSuccess.value ? 
          <button class='px-4 py-3 bg-primary-purplish-blue rounded-lg text-white self-end ml-auto'
          preventdefault:click
          onClick$={(event) => skipToSubmit()}>
            Confirm
        </button>: 
        <div class='flex w-full justify-end px-2'>
          {isBack.value && (
            <button
              type='button'
              class='text-nuetral-cool-gray'
              onClick$={async() => await previousPageBtn()}
            >
              Go Back
            </button>
          )}

          <button
            class={`px-4 py-3 bg-primary-marine-blue rounded-lg text-white ${
              isBack.value ? 'ml-auto' : 'self-end justify-self-end'
            }`}
            onClick$={ async() =>  await nextPageBtn()}

            
          >
            Next Step
          </button>
        </div>
        }
      </div>
    </div>
  );
});