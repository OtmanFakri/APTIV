import {FormGroup} from "@angular/forms";
import {CertificationsRequestInterface} from "../interfaces/ListCertificationInterface";

export function convertFormToRequest(form: FormGroup): CertificationsRequestInterface {
    return {
        doctor: {
            name: form.get('doctor_name')?.value,
            specialty: form.get('doctor_speciality')?.value || ''
        },
        date: form.get('date')?.value,
        date_start: form.get('date_start')?.value,
        date_end: form.get('date_end')?.value,
        validation: form.get('validation')?.value,
        date_planned: form.get('date_planned')?.value,
        nbr_days: form.get('nbr_days')?.value,
        is_visited: form.get('is_visited')?.value,
        shift: form.get('shift')?.value,
        confirmed_id: form.get('confirmed')?.value?.id || null
    };
}