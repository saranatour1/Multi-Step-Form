import { component$ } from '@builder.io/qwik';

/**
 * Title Information
 * Contains Step Heading, Step guide 
 * Type: string
 * 
 */
  interface ParentProps{
    stepHeading: string;
    stepGuide:string;
  }



export const Title = component$<ParentProps>(({stepHeading , stepGuide}) => {
  return (
    <hgroup class="">
    <h1 class="text-4xl font-c-bold pb-1 text-primary-marine-blue">
      {stepHeading}
    </h1>
    <p class="text-nuetral-cool-gray text-lg">
      {stepGuide}
    </p>
  </hgroup>
  );
});