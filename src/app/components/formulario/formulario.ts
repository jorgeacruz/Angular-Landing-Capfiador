import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CustomValidators, InputMasks } from '../../services/custom-validators';
import { Estado, LocalidadesService } from '../../services/localidades';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrls: ['./formulario.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioComponent implements OnInit {
  form!: FormGroup;

  estados: Estado[] = [];
  municipios: string[] = [];
  isLoadingMunicipios = false;

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  showSuccessModal = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly localidadesService: LocalidadesService,
    private readonly contatoService: ContatoService,
  ) {}

  ngOnInit(): void {
    this.estados = this.localidadesService.getEstados();

    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      celular: ['', [Validators.required, CustomValidators.celular()]],
      cpf: ['', [Validators.required, CustomValidators.cpf()]],
      dataNascimento: ['', [Validators.required, CustomValidators.dataNascimento()]],
      estado: ['', [Validators.required]],
      municipio: [{ value: '', disabled: true }, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /** Atalho para acessar os controles no template: form.get('nome') etc. */
  get f() {
    return this.form.controls;
  }

  /** Aplica a máscara (xx) xxxxx-xxxx enquanto o usuário digita. */
  onCelularInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const formatado = InputMasks.celular(input.value);
    this.form.get('celular')?.setValue(formatado, { emitEvent: false });
  }

  /** Aplica a máscara 000.000.000-00 enquanto o usuário digita. */
  onCpfInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const formatado = InputMasks.cpf(input.value);
    this.form.get('cpf')?.setValue(formatado, { emitEvent: false });
  }

  /** Aplica a máscara dd/mm/aaaa enquanto o usuário digita. */
  onDataNascimentoInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const formatado = InputMasks.dataNascimento(input.value);
    this.form.get('dataNascimento')?.setValue(formatado, { emitEvent: false });
  }

  /** Ao trocar o estado, busca os municípios correspondentes na API do IBGE. */
  onEstadoChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const uf = select.value;

    this.municipios = [];
    this.form.get('municipio')?.setValue('');

    if (!uf) {
      this.form.get('municipio')?.disable();
      return;
    }

    this.isLoadingMunicipios = true;
    this.form.get('municipio')?.disable();

    this.localidadesService.getMunicipiosPorUf(uf).subscribe({
      next: (municipios) => {
        this.municipios = municipios;
        this.isLoadingMunicipios = false;
        this.form.get('municipio')?.enable();
      },
      error: () => {
        this.isLoadingMunicipios = false;
        this.municipios = [];
      },
    });
  }

  onSubmit(): void {
    this.submitSuccess = false;
    this.submitError = false;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.contatoService.enviar(this.form.getRawValue()).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.showSuccessModal = true;
        this.form.reset();
        this.municipios = [];
        this.form.get('municipio')?.disable();
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = true;
      },
    });
  }

  /**
   * Fecha o modal de sucesso e recarrega a página.
   * Chamado ao clicar no botão "OK" do modal.
   */
  closeModalAndRefresh(): void {
    this.showSuccessModal = false;
    window.location.reload();
  }
}
