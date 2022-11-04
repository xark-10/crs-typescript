declare module 'stripe' {
    namespace Stripe {
      interface TypedEventData<T> extends Stripe.Event.Data {
        object: T;
        previous_attributes?: Partial<T>;
      }
  
      interface TypedEvent<T = any> extends Stripe.Event {
        data: TypedEventData<T>;
        type: Exclude<Stripe.WebhookEndpointCreateParams.EnabledEvent, '*'>;
      }
    }
  }
  declare module "redis";