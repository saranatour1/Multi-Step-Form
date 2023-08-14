import { component$ } from "@builder.io/qwik";


interface ParentProps {
  steps: { name: string; info: string }[];
  active: any;
}

export const Steps = component$<ParentProps>(({ steps, active }) => {

  return (
    <div class={`w-3/12  h-full bg-desktop-image rounded-lg`}>
      <div class="flex flex-col p-4 h-2/4 justify-between items-center mt-5">
        {steps.map((item, idx) => (
          <div
            key={idx}
            class={"flex w-full justify-normal gap-4 items-center"}
          >
            <p
              class={`rounded-full w-10 h-10 ${
                idx === active
                  ? "bg-primary-light-blue"
                  : "bg-transparent border"
              } border-white flex justify-center items-center`}
            >
              <span
                class={`${
                  idx === active ? "text-opacity-0" : "text-white"
                } font-extralight`}
              >
                {idx + 1}
              </span>
            </p>

            <div class="w-full h-full">
              <p class="text-nuetral-cool-gray  uppercase pb-1">{item.name}</p>
              <p class=" text-md uppercase font-c-semi-bold text-nuetral-alabaster">
                {item.info}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
