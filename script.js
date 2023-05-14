const jrValidate ={
    checkSubmit: (e) =>{
       e.preventDefault();

       let send = true;
       let inputs = form.querySelectorAll('input')

       jrValidate.clearError()

       for(let i=0; i<inputs.length; i++){
        let input = inputs[i];
       
        let check = jrValidate.checkInput(input);

        if(check !==true){
            send = false

            jrValidate.checkErro(input, check)
        }
        
       }
      

       if(send){
        form.submit()
       }
    },

    checkInput: (input) =>{
    let rule = input.getAttribute('data-rules');
 
    
   
    if(rule !== null){
        rule = rule.split('|')
        for(let j=0;j<rule.length;j++){
            let detailsRules = rule[j].split('=')
            
            switch(detailsRules[0]){
                case 'required':
                    if(input.value === ''){
                        return 'Favor preencher o campo'
                    }

                break;

                case 'min':
                    if(input.value.length < detailsRules[1]){
                        return 'Minimo de ' + detailsRules[1] + ' caracteres'
                    }

                break

                case 'textNumber':
                    let regexName = /(^[^0-9]*$)/
                    if(!regexName.test(input.value.toLowerCase())){
                        return 'Favor não misturar numeros com letra'
                    }
                break

                case  'email':
                    let regex = /(^[a-z]+)([\d]+[a-z]*)+\@([\w]{2,})+\.([\w]{3})(\.[a-z]{2})?/
                    if(!regex.test(input.value)){
                        return 'Favor digitar o email corretamente'
                    }
                break

               

                
            }
        }
    }
   
    return true
    },

    checkErro: (input,check) => {
     input.style.borderColor = '#ff0000'
     let elementErro = document.createElement('div');
     elementErro.classList.add('error');
     elementErro.innerHTML = check;
     input.parentElement.insertBefore(elementErro,input.nextElementSibling);
    },

    clearError: () =>{
        let inputs = form.querySelectorAll('input');

        for(let i=0; i<inputs.length; i++){
            inputs[i].style = ''
        }

        let elErro = document.querySelectorAll('.error')

        for(let i=0; i<elErro.length; i++){
            elErro[i].remove()
        }
    }
}



let form = document.querySelector('.validate')
form.addEventListener('submit', jrValidate.checkSubmit)
