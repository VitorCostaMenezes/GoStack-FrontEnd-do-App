import { ValidationError } from 'yup';

// definindo uma tipagem para Erros de forma dinâmica
interface Errors {
  // definindo que qualquer propriedade que aparecer vai ser uma string
  [key: string]: string;
}

// ao importar o ValidationError do yup
// ele te da acesso a todas as propriedades de erro
export default function getValidationErrors(err: ValidationError): Errors {
  // criando um objeto to tipo Erros e atribuindo um valor vazio inicialmente
  const validationErrors: Errors = {};

  // percorrendo cada elemento da propriedade inner do err
  // pra cada elemento percorrido
  // cria uma proprieadade nela com o nome error.path
  // que vai ser igual a error.message
  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
