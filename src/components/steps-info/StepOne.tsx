import { component$, useStore ,$, useSignal, PropFunction, useTask$ } from "@builder.io/qwik";
import { userInfo } from "os";


/**
 * Step Two info,
 * info is the 'title' of the information being gathered like name, email or phone number.
 * index is just me being lazy :D
 *
 */

interface ParentProps {
  info: string;
  index: number;
  personalInformation$: PropFunction<(text:string,index:number) => void>
}

export const StepOne = component$<ParentProps>(({ info, index , personalInformation$ }) => {
  
  const userInformation = useSignal({name:'', email:'',number:""})



  const errors = useStore({isError:false, errorMsg:''});

  // useTask$(({ track}) => {
  //   // rerun this function  when `value` property changes.
  //   track(() => userInformation.value);

  //   personalInformation$(name.value,email.value,number.value);
  // });

  
  const validateData = $((text:string , index:number) => {
    if(!errors.isError){
      personalInformation$(text,index)
      if(index===0){
        userInformation.value.name =text;
      } 
      if(index===1){
        userInformation.value.email = text;
      }
      if(index===2){
        userInformation.value.number = text;
      }
    }
  })

  // console.log(userInformation.value.name,userInformation.value.email , userInformation.value.number)

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
