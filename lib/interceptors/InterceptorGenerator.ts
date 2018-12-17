import { InterceptorBundle, Values } from '../form/Form';
import { FormContext } from '../form/FormContext';
import { BaseField } from '../models/BaseField';
import { InterceptorConfig } from '../models/InterceptorConfig';
import { InterceptorHandler } from '../models/InterceptorHandler';
import { InterceptorHandlerResponse } from '../models/InterceptorHandlerResponse';

const interceptorTypeMap: Map<string, InterceptorGenerator> = new Map<string, InterceptorGenerator>();

/**
 * Saves the interceptor into the interceptorTypeMap.
 * @param interceptorType is the identifier of the interceptor.
 * @param generator function that is expected to generate the interceptor with the given config.
 */
export function registerInterceptor(interceptorType: string, generator: InterceptorGenerator) {
  interceptorTypeMap.set(interceptorType, generator);
}

/**
 * Generates an interceptor handler with the given config.
 *
 * @param config that contains all the parameters that the interceptor needs.
 */
export function generateInterceptor(config: InterceptorConfig): InterceptorHandler | undefined {

  const generator = interceptorTypeMap.get(config.id);
  if (generator) {
    return generator(config);
  }

  return undefined;
}

/**
 * Executes the given interceptors in order. Passes the response of each interceptor's result to the next
 * interceptor. Returns error of the first failed interceptor or returns the result of the last interceptor
 * if none returns an error.
 *
 * @param context of the form.
 * @param values of the fields in the form.
 * @param field that is being executed.
 * @param value that the interceptor will process.
 * @param interceptorBundle that contains interceptor list for each type.
 * @param interceptorType that is expected to be used.
 * @param boundField is the field that the interceptor is bound to. Used only for 'onFormChange' interceptor types.
 */
export function executeInterceptors(context: FormContext, values: Values, field: BaseField, value: any, interceptorBundle?: InterceptorBundle, interceptorType?: 'onBlur' | 'onChange' | 'onFormChange' | 'onSubmit', boundField?: BaseField): InterceptorHandlerResponse {

  const interceptors = interceptorBundle ? (interceptorBundle[interceptorType!] || []) : [];

  let v = boundField ? values[boundField.id] : value;
  let visible = true;

  for (const interceptor of interceptors) {
    if (!interceptor) {
      continue;
    }

    const response = interceptor.run(context, values, field, v, boundField);
    visible = typeof response.visible === 'boolean' ? response.visible : true;
    if (response.error) {
      // don't proceed to next interceptor if an error returned
      return response;
    }
    v = response.value;
  }
  return new InterceptorHandlerResponse(v, undefined, visible);
}

export type InterceptorGenerator = (config: InterceptorConfig) => InterceptorHandler | undefined;
