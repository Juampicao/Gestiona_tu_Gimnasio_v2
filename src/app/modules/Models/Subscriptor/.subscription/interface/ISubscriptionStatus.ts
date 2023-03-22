export enum ISubscriptionStatus {
  NULL = 'null',
  PERIODOPAGO = 'periodoPago', // Plan vence el 5, pero tiempo a pagar hasta el 15.
  ACTIVO = 'activo',
  DEUDA1 = 'deuda1', // Debe 1 mes.
  DEUDA2 = 'deuda2',
  DEUDA3 = 'deuda3',
  DEUDA4 = 'deuda4',
  MOROSO1 = 'moroso1', // Si debe mas de 4 cuotras, pasar a moroso1.
  MOROSO2 = 'moroso2', // Si debe mas de 6 cuotas, pasara moroso2.
  CONGELADO = 'congelado', // Congelado
}
