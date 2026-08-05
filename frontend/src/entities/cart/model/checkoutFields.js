export const checkoutFields = {
    delivery: [
        {
            id: 'name',
            key: 'deliveryName',
            label: 'Nome completo (*)',
            icon: 'mdi-account',
            type: 'text',
            placeholder: 'Seu nome',
            required: true
        },
        {
            id: 'phone',
            key: 'phone',
            label: 'Telefone/WhatsApp (*)',
            icon: 'mdi-phone',
            type: 'tel',
            placeholder: '(11) 99999-9999',
            required: true
        },
        {
            id: 'street',
            key: 'street',
            label: 'Rua (*)',
            icon: 'mdi-home',
            type: 'text',
            placeholder: 'Rua, número...',
            required: true
        },
        {
            id: 'number',
            key: 'number',
            label: 'Número (*)',
            icon: 'mdi-home',
            type: 'text',
            placeholder: 'Rua, número...',
            required: true
        },
        {
            id: 'neighborhood',
            key: 'neighborhood',
            label: 'Bairro (*)',
            icon: 'mdi-home',
            type: 'text',
            placeholder: 'Rua, número...',
            required: true
        },
        {
            id: 'reference',
            key: 'reference',
            label: 'Ponto de referência',
            icon: 'mdi-map-marker-outline',
            type: 'text',
            placeholder: 'Próximo ao...'
        },
        {
            id: 'observation',
            key: 'observation',
            label: 'Observação',
            icon: 'mdi-note-text-outline',
            type: 'textarea',
            placeholder: 'Alguma instrução?'
        }
    ],

    pickup: [
        {
            id: 'name',
            key: 'name',
            label: 'Nome completo (*)',
            icon: 'mdi-account',
            type: 'text',
            placeholder: 'Seu nome',
            required: true
        },
        {
            id: 'phone',
            key: 'phone',
            label: 'Telefone/WhatsApp (*)',
            icon: 'mdi-phone',
            type: 'tel',
            placeholder: '(11) 99999-9999',
            required: true
        },
        {
            id: 'observation',
            key: 'observation',
            label: 'Observação',
            icon: 'mdi-note-text-outline',
            type: 'textarea',
            placeholder: 'Alguma instrução?'
        }
    ]
};