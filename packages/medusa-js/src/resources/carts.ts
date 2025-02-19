import {
  StoreCartsRes,
  StorePostCartReq,
  StorePostCartsCartPaymentSessionReq,
  StorePostCartsCartPaymentSessionUpdateReq,
  StorePostCartsCartReq,
  StorePostCartsCartShippingMethodReq,
} from "@medusajs/medusa"
import { AxiosPromise } from "axios"
import BaseResource from "./base"
import LineItemsResource from "./line-items"

class CartsResource extends BaseResource {
  public lineItems = new LineItemsResource(this.client)

  /**
   * Adds a shipping method to cart
   * @param {string} cart_id Id of cart
   * @param {StorePostCartsCartShippingMethodReq} payload Containg id of shipping option and optional data
   * @return {AxiosPromise<StoreCartsRes>}
   */
  addShippingMethod(
    cart_id: string,
    payload: StorePostCartsCartShippingMethodReq
  ): AxiosPromise<StoreCartsRes> {
    const path = `/store/carts/${cart_id}/shipping-methods`
    return this.client.request("POST", path, payload)
  }

  /**
   * Completes a cart.
   * Payment authorization is attempted and if more work is required, we simply return the cart for further updates.
   * If payment is authorized and order is not yet created, we make sure to do so.
   * The completion of a cart can be performed idempotently with a provided header Idempotency-Key.
   * If not provuided, we will generate one for the request.
   * @param {string} cart_id is required
   * @return {AxiosPromise<StoreCartsRes>}
   */
  complete(cart_id: string): AxiosPromise<StoreCartsRes> {
    const path = `/store/carts/${cart_id}/complete`
    return this.client.request("POST", path)
  }

  /**
   * Creates a cart
   * @param {StorePostCartReq} payload is optional and can contain a region_id and items.
   * The cart will contain the payload, if provided. Otherwise it will be empty
   * @return {AxiosPromise<StoreCartsRes>}
   */
  create(payload?: StorePostCartReq): AxiosPromise<StoreCartsRes> {
    const path = `/store/carts`
    return this.client.request("POST", path, payload)
  }

  /**
   * Creates payment sessions.
   * Initializes the payment sessions that can be used to pay for the items of the cart.
   * This is usually called when a customer proceeds to checkout.
   * @param {string} cart_id is required
   * @return {AxiosPromise<StoreCartsRes>}
   */
  createPaymentSessions(cart_id: string): AxiosPromise<StoreCartsRes> {
    const path = `/store/carts/${cart_id}/payment-sessions`
    return this.client.request("POST", path)
  }

  /**
   * Removes a discount from cart.
   * @param {string} cart_id is required
   * @param {string} code discount code to remove
   * @return {AxiosPromise<StoreCartsRes>}
   */
  deleteDiscount(cart_id: string, code: string): AxiosPromise<StoreCartsRes> {
    const path = `/store/carts/${cart_id}/discounts/${code}`
    return this.client.request("DELETE", path)
  }

  /**
   * Removes a payment session from a cart.
   * Can be useful in case a payment has failed
   * @param {string} cart_id is required
   * @param {string} provider_id the provider id of the session e.g. "stripe"
   * @return {AxiosPromise<StoreCartsRes>}
   */
  deletePaymentSession(
    cart_id: string,
    provider_id: string
  ): AxiosPromise<StoreCartsRes> {
    const path = `/store/carts/${cart_id}/payment-sessions/${provider_id}`
    return this.client.request("DELETE", path)
  }

  /**
   * Refreshes a payment session.
   * @param {string} cart_id is required
   * @param {string} provider_id the provider id of the session e.g. "stripe"
   * @return {AxiosPromise<StoreCartsRes>}
   */
  refreshPaymentSession(
    cart_id: string,
    provider_id: string
  ): AxiosPromise<StoreCartsRes> {
    const path = `/store/carts/${cart_id}/payment-sessions/${provider_id}/refresh`
    return this.client.request("POST", path)
  }

  /**
   * Retrieves a cart
   * @param {string} cart_id is required
   * @return {AxiosPromise<StoreCartsRes>}
   */
  retrieve(cart_id: string): AxiosPromise<StoreCartsRes> {
    const path = `/store/carts/${cart_id}`
    return this.client.request("GET", path)
  }

  /**
   * Refreshes a payment session.
   * @param {string} cart_id is required
   * @param {StorePostCartsCartPaymentSessionReq} payload the provider id of the session e.g. "stripe"
   * @return {AxiosPromise<StoreCartsRes>}
   */
  setPaymentSession(
    cart_id: string,
    payload: StorePostCartsCartPaymentSessionReq
  ): AxiosPromise<StoreCartsRes> {
    const path = `/store/carts/${cart_id}/payment-session`
    return this.client.request("POST", path, payload)
  }

  /**
   * Updates a cart
   * @param {string} cart_id is required
   * @param {StorePostCartsCartReq} payload is required and can contain region_id, email, billing and shipping address
   * @return {AxiosPromise<StoreCartsRes>}
   */
  update(
    cart_id: string,
    payload: StorePostCartsCartReq
  ): AxiosPromise<StoreCartsRes> {
    const path = `/store/carts/${cart_id}`
    return this.client.request("POST", path, payload)
  }

  /**
   * Updates the payment method
   * @param {string} cart_id is required
   * @param {StorePostCartsCartPaymentSessionUpdateReq} payload is required
   * @return {AxiosPromise<StoreCartsRes>}
   */
  updatePaymentSession(
    cart_id: string,
    payload: StorePostCartsCartPaymentSessionUpdateReq
  ): AxiosPromise<StoreCartsRes> {
    const path = `/store/carts/${cart_id}/payment-session/update`
    return this.client.request("POST", path, payload)
  }
}

export default CartsResource
