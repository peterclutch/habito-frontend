import { InjectionToken } from '@angular/core';
import { ModalData } from './modal.model';

export const HABITO_MODAL_DATA = new InjectionToken<(data: ModalData) => void>('HABITO_MODAL_DATA');
