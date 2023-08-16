import { component$, useStore ,$, useSignal } from "@builder.io/qwik";


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
  
  const userInformation = useStore({name:'', email:'',number:""})

  const errors = useStore({isError:false, errorMsg:''});

  
  const validateData = $((text:string , index:number) => {
    const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const nameRegEx =/^[a-zA-Z\s]+$/;
    const phoneRegEx = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    if(!emailRegEx.test(text) || !nameRegEx.test(text) || !phoneRegEx.test(text)){
      errors.isError = true;
      errors.errorMsg='Invalid Input';
    }else{
      errors.isError = false; 
    }

    if(!errors.isError){
      if(index===1){
        userInformation.name = text;
      }else if(index===2){
        userInformation.email = text;
      }else{
        userInformation.number = text;
      }

    }
  })

  const errorValidate=$(( text:string )=>{
    if(text.length ===0 || !text){
      errors.isError = true;
      errors.errorMsg='This field is required';
    }else{
      errors.isError =false;    
    }
  })

  return (
    <>
      <label
        for={info}
        class="text-primary-marine-blue font-c-normal mb-1 capitalize flex"
      >
        <span class="mr-auto">{info}</span>
      {errors.isError &&  <span class="ml-auto text-primary-strawberry-red lowercase">{errors.errorMsg}</span>}
      </label>
      <input
        type={index === 1 ? "email" : "text"}
        class={`h-12 w-full px-2 placeholder:ps-2 placeholder-shown:ps-2 border border-neutral-light-gray rounded-lg ${errors.isError && 'border-primary-strawberry-red'}`}
        placeholder={
          index === 0
            ? "e.g. Stephan King"
            : index === 1
            ? "e.g. stephanking@lorem.com"
            : "e.g. +1 234 567 890"
        }
        onInput$={(e)=>validateData( (e.target as HTMLInputElement).value , index)}
        onFocusout$={(e)=> errorValidate((e.target as HTMLInputElement).value)}
        onFocusIn$={()=> errors.isError =false}
      />
    </>
  );
});
