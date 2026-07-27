import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Estado {
  sigla: string;
  nome: string;
}

interface IbgeMunicipioResponse {
  id: number;
  nome: string;
}

@Injectable({ providedIn: 'root' })
export class LocalidadesService {
  private readonly ibgeBaseUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(private readonly http: HttpClient) {}

  /** Lista fixa com os 26 estados + Distrito Federal (não muda, não precisa de API). */
  getEstados(): Estado[] {
    return [
      { sigla: 'AC', nome: 'Acre' },
      { sigla: 'AL', nome: 'Alagoas' },
      { sigla: 'AP', nome: 'Amapá' },
      { sigla: 'AM', nome: 'Amazonas' },
      { sigla: 'BA', nome: 'Bahia' },
      { sigla: 'CE', nome: 'Ceará' },
      { sigla: 'DF', nome: 'Distrito Federal' },
      { sigla: 'ES', nome: 'Espírito Santo' },
      { sigla: 'GO', nome: 'Goiás' },
      { sigla: 'MA', nome: 'Maranhão' },
      { sigla: 'MT', nome: 'Mato Grosso' },
      { sigla: 'MS', nome: 'Mato Grosso do Sul' },
      { sigla: 'MG', nome: 'Minas Gerais' },
      { sigla: 'PA', nome: 'Pará' },
      { sigla: 'PB', nome: 'Paraíba' },
      { sigla: 'PR', nome: 'Paraná' },
      { sigla: 'PE', nome: 'Pernambuco' },
      { sigla: 'PI', nome: 'Piauí' },
      { sigla: 'RJ', nome: 'Rio de Janeiro' },
      { sigla: 'RN', nome: 'Rio Grande do Norte' },
      { sigla: 'RS', nome: 'Rio Grande do Sul' },
      { sigla: 'RO', nome: 'Rondônia' },
      { sigla: 'RR', nome: 'Roraima' },
      { sigla: 'SC', nome: 'Santa Catarina' },
      { sigla: 'SP', nome: 'São Paulo' },
      { sigla: 'SE', nome: 'Sergipe' },
      { sigla: 'TO', nome: 'Tocantins' },
    ];
  }

  /** Busca os municípios do estado (UF) selecionado na API pública do IBGE. */
  getMunicipiosPorUf(uf: string): Observable<string[]> {
    const url = `${this.ibgeBaseUrl}/estados/${uf}/municipios`;
    return this.http
      .get<IbgeMunicipioResponse[]>(url)
      .pipe(map((municipios) => municipios.map((m) => m.nome)));
  }
}

@Injectable({
  providedIn: 'root',
})
export class Localidades {}
