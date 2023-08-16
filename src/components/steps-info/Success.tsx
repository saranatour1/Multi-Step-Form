import { component$ } from '@builder.io/qwik';
import successIcon from "~/media/icon-thank-you.svg";

export const Success = component$(() => {
  return (<div class="p-6 flex flex-col justify-center items-center h-full w-full">

  <div class="mb-6">
  <img src={successIcon} alt='Success Icon' width={64} height={64}/>

  </div>
<hgroup class="text-center">
  <h3 class="text-center my-3 text-3xl font-c-bold text-primary-marine-blue">
  Thank you!
  </h3>
  <p class=" text-nuetral-cool-gray w-10/12 mx-auto text-ellipsis text-center text-sm font-extralight">
      Thanks for confirming your subscription! We hope you have fun 
    using our platform. If you ever need support, please feel free 
    to email us at support@loremgaming.com.
  </p>
</hgroup>



  </div>)
});