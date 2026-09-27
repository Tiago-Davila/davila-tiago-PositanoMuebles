export const esObjeto = (valor) =>
    typeof valor === 'object' && valor !== null && !Array.isArray(valor);

export const esTextoValido = (valor) =>
    typeof valor === 'string' && valor.trim().length > 0;

export const esPrecioValido = (valor) =>
    typeof valor === 'number' && Number.isFinite(valor) && valor > 0;

export const esBooleano = (valor) => typeof valor === 'boolean';

export const esIdValido = (valor) => {
    const id = Number(valor);
    return Number.isInteger(id) && id > 0;
};
