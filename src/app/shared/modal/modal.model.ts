import { ComponentType } from '@angular/cdk/overlay';

export interface Modal {
    component: ComponentType<any>;
    data: ModalData;
    config?: ModalConfig;
}

export interface ModalData {
    action: (data: any) => void
    entity?: any;
}

export interface ModalConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
}
