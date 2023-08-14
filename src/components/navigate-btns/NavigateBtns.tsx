import { component$, useSignal, useTask$, $ } from '@builder.io/qwik';

interface ParentProps{
  active:number;
  stepLength:number;
}


export default component$<ParentProps>(({active ,stepLength }) => {
  console.log(active)
  // Variables to define if the current active step has a back button, or Next button, or there is successfull Operations
  const isNext = useSignal(false);
  const isBack = useSignal(false);

  const endSuccess = useSignal(active===stepLength);

  useTask$(({ track }) => {
    // track changes in store.count
    track(() => endSuccess.value);

  });

  const skipToSubmit =$(()=>{})


  const previousPageBtn = $(()=>{})

  const nextPageBtn = $(()=>{})


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
            onClick$={() => nextPageBtn()}
          >
            Next Step
          </button>
        </div>
        }
      </div>
    </div>
  );
});