import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validadores customizados para os campos do formulário.
 * Todos retornam `null` quando o campo é válido, ou um objeto
 * de erro quando inválido (padrão do Angular Reactive Forms).
 */
export class CustomValidators {
  /** Exige que o celular esteja completo no formato (xx) xxxxx-xxxx */
  static celular(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value ?? '';
      if (!value) {
        return null; // deixa o Validators.required cuidar do campo vazio
      }
      const pattern = /^\(\d{2}\) \d{5}-\d{4}$/;
      return pattern.test(value) ? null : { celularInvalido: true };
    };
  }

  /** Exige que a data esteja completa no formato dd/mm/aaaa e seja uma data real */
  static dataNascimento(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value ?? '';
      if (!value) {
        return null;
      }

      const pattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const match = value.match(pattern);
      if (!match) {
        return { dataInvalida: true };
      }

      const dia = Number(match[1]);
      const mes = Number(match[2]);
      const ano = Number(match[3]);
      const data = new Date(ano, mes - 1, dia);

      const dataValida =
        data.getFullYear() === ano &&
        data.getMonth() === mes - 1 &&
        data.getDate() === dia;

      if (!dataValida) {
        return { dataInvalida: true };
      }

      // Não aceita datas futuras
      if (data.getTime() > Date.now()) {
        return { dataFutura: true };
      }

      return null;
    };
  }

  /** Valida CPF (dígitos verificadores) no formato 000.000.000-00 */
  static cpf(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value ?? '';
      if (!value) {
        return null;
      }

      const cpfLimpo = value.replace(/\D/g, '');

      if (cpfLimpo.length !== 11) {
        return { cpfInvalido: true };
      }

      // Rejeita sequências repetidas, ex: 111.111.111-11
      if (/^(\d)\1{10}$/.test(cpfLimpo)) {
        return { cpfInvalido: true };
      }

      const calcularDigito = (base: string): number => {
        let soma = 0;
        let peso = base.length + 1;
        for (const char of base) {
          soma += Number(char) * peso;
          peso--;
        }
        const resto = (soma * 10) % 11;
        return resto === 10 ? 0 : resto;
      };

      const digito1 = calcularDigito(cpfLimpo.substring(0, 9));
      const digito2 = calcularDigito(cpfLimpo.substring(0, 9) + digito1);

      const cpfCalculado = cpfLimpo.substring(0, 9) + digito1 + digito2;

      return cpfCalculado === cpfLimpo ? null : { cpfInvalido: true };
    };
  }
}

/**
 * Funções utilitárias de máscara, aplicadas nos eventos (input)
 * dos campos de texto. Cada função recebe o valor bruto digitado
 * e devolve o valor já formatado.
 */
export class InputMasks {
  static celular(valorBruto: string): string {
    const digitos = valorBruto.replace(/\D/g, '').slice(0, 11);

    if (digitos.length <= 2) {
      return digitos.replace(/^(\d{0,2})/, '($1');
    }
    if (digitos.length <= 7) {
      return digitos.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    }
    return digitos.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  }

  static cpf(valorBruto: string): string {
    const digitos = valorBruto.replace(/\D/g, '').slice(0, 11);

    if (digitos.length <= 3) {
      return digitos;
    }
    if (digitos.length <= 6) {
      return digitos.replace(/^(\d{3})(\d{0,3})/, '$1.$2');
    }
    if (digitos.length <= 9) {
      return digitos.replace(/^(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    }
    return digitos.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  }

  static dataNascimento(valorBruto: string): string {
    const digitos = valorBruto.replace(/\D/g, '').slice(0, 8);

    if (digitos.length <= 2) {
      return digitos;
    }
    if (digitos.length <= 4) {
      return digitos.replace(/^(\d{2})(\d{0,2})/, '$1/$2');
    }
    return digitos.replace(/^(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
  }
}
