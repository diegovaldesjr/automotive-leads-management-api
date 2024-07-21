import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

function isValidRUT(rut: string): boolean {
  // Remover los puntos y guiones
  const cleanRut = rut.replace(/[^0-9kK]/g, '');
  if (cleanRut.length < 8 || cleanRut.length > 9) return false;

  const body = cleanRut.slice(0, -1);
  const verifier = cleanRut.slice(-1).toUpperCase();

  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = sum % 11;
  const computedVerifier = 11 - remainder === 11 ? '0' : 11 - remainder === 10 ? 'K' : (11 - remainder).toString();

  return verifier === computedVerifier;
}

@ValidatorConstraint({ async: false })
class IsRUTConstraint implements ValidatorConstraintInterface {
  validate(rut: any) {
    return typeof rut === 'string' && isValidRUT(rut);
  }

  defaultMessage() {
    return 'RUT is not valid';
  }
}

export function IsRUT(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRUTConstraint,
    });
  };
}
