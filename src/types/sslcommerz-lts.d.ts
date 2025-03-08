declare module "sslcommerz-lts" {
  import type { SSLCommerzPayment } from "sslcommerz-lts/types"

  const sslcommerz: {
    init: (options: any) => SSLCommerzPayment
  }

  export default sslcommerz
}

