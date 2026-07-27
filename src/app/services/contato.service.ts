import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContatoFormData {
  nome: string;
  celular: string;
  cpf: string;
  dataNascimento: string;
  estado: string;
  municipio: string;
  email: string;
}

/**
 * Envio de e-mail via EmailJS (https://www.emailjs.com/).
 *
 * Como configurar:
 * 1. Crie uma conta gratuita em https://www.emailjs.com/
 * 2. Crie um "Email Service" (ex: Gmail, Outlook) → gera um SERVICE_ID
 * 3. Crie um "Email Template" com variáveis, ex:
 *      {{nome}}, {{celular}}, {{cpf}}, {{dataNascimento}},
 *      {{estado}}, {{municipio}}, {{email}}
 *    → gera um TEMPLATE_ID
 * 4. Em "Account" → pegue sua PUBLIC_KEY
 * 5. Preencha os 3 valores abaixo (idealmente via environment.ts)
 *
 * OBS: se preferir usar seu próprio backend (Node, .NET, PHP etc.)
 * em vez do EmailJS, troque apenas o método `enviar()` para fazer
 * um POST para a sua API, ex:
 *   return this.http.post('https://sua-api.com/contato', dados);
 */
@Injectable({ providedIn: 'root' })
export class ContatoService {
  private readonly emailJsUrl = 'https://api.emailjs.com/api/v1.0/email/send';

  // 🔧 Substitua pelos valores da sua conta EmailJS
  private readonly serviceId = 'service_3x9as5x';
  private readonly templateId = 'template_1tsdsa6';
  private readonly publicKey = 'IEKIt16szD8mT7mnw';

  constructor(private readonly http: HttpClient) {}

  enviar(dados: ContatoFormData): Observable<unknown> {
    const payload = {
      service_id: this.serviceId,
      template_id: this.templateId,
      user_id: this.publicKey,
      template_params: {
        nome: dados.nome,
        celular: dados.celular,
        cpf: dados.cpf,
        data_nascimento: dados.dataNascimento,
        estado: dados.estado,
        municipio: dados.municipio,
        email: dados.email,
      },
    };

    return this.http.post(this.emailJsUrl, payload);
  }
}
