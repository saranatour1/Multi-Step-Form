import { component$ } from "@builder.io/qwik";

/**
 * Step Two info,
 * info is the 'title' of the information being gathered like name, email or phone number.
 * index is just me being lazy :D
 *
 */

interface ParentProps {
  info: string;
  index: number;
}

export const StepOne = component$<ParentProps>(({ info, index }) => {
  return (
    <>
      <label
        for={info}
        class="text-primary-marine-blue font-c-normal mb-1 capitalize"
      >
        {info}
      </label>
      <input
        type={index === 1 ? "email" : "text"}
        class="h-12 w-full px-2 placeholder:ps-2 placeholder-shown:ps-2 border border-neutral-light-gray rounded-lg"
        placeholder={
          index === 0
            ? "e.g. Stephan King"
            : index === 1
            ? "e.g. stephanking@lorem.com"
            : "e.g. +1 234 567 890"
        }
      />
    </>
  );
});
