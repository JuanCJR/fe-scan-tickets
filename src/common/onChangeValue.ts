//
/**
 * Handler para cambio de valores
 * @param {Event} e Evento
 * @param {String} valueName Nombre de la variable de estado
 * @param {Function} changeState Funcion hook de cambio de estado
 */
export const onChangeDefaultValue = (
  e: any,
  valueName: any,
  changeState: any
) => {
  let value = e.target.value;
  changeState((state: any) => ({
    ...state,
    [valueName]: value,
  }));
};
