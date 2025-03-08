import { Resend } from "resend"
import config from "../config/config"
import type { IOrder } from "../modules/order/order.interface"
import type { IUser } from "../modules/user/user.interface"

// Initialize Resend with API key
const resend = new Resend(config.RESEND_API_KEY)

export const emailService = {
  async sendOrderConfirmation(order: IOrder, user: IUser) {
    try {
      const { data, error } = await resend.emails.send({
        from: config.EMAIL_FROM,
        to: user.email,
        subject: `MediMart - Order #${order._id} Confirmation`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #4a5568;">MediMart</h1>
              <p style="color: #718096;">Your trusted medicine partner</p>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h2 style="color: #2d3748;">Order Confirmation</h2>
              <p>Dear ${user.name},</p>
              <p>Thank you for your order. We're processing it now and will update you soon.</p>
              <p><strong>Order ID:</strong> ${order._id}</p>
              <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total Amount:</strong> $${order.totalPrice.toFixed(2)}</p>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h3 style="color: #2d3748;">Order Summary</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #f7fafc;">
                    <th style="padding: 10px; text-align: left; border-bottom: 1px solid #e2e8f0;">Item</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 1px solid #e2e8f0;">Qty</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 1px solid #e2e8f0;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${order.items
                    .map(
                      (item) => `
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Medicine ID: ${item.medicineId}</td>
                      <td style="padding: 10px; text-align: right; border-bottom: 1px solid #e2e8f0;">${item.quantity}</td>
                      <td style="padding: 10px; text-align: right; border-bottom: 1px solid #e2e8f0;">$${item.price.toFixed(2)}</td>
                    </tr>
                  `,
                    )
                    .join("")}
                  <tr>
                    <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
                    <td style="padding: 10px; text-align: right; font-weight: bold;">$${order.totalPrice.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h3 style="color: #2d3748;">Shipping Address</h3>
              <p>${order.shippingAddress.address}</p>
              <p>${order.shippingAddress.city}, ${order.shippingAddress.postalCode}</p>
              <p>${order.shippingAddress.country}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p>If you have any questions, please contact our customer support.</p>
              <p>© ${new Date().getFullYear()} MediMart. All rights reserved.</p>
            </div>
          </div>
        `,
      })

      if (error) {
        console.error("Error sending order confirmation email:", error)
        return { success: false, error }
      }

      return { success: true, data }
    } catch (error) {
      console.error("Error sending order confirmation email:", error)
      return { success: false, error }
    }
  },

  async sendOrderStatusUpdate(order: IOrder, user: IUser) {
    try {
      const statusMessages = {
        pending: "Your order is pending and will be processed soon.",
        processing: "Your order is now being processed.",
        shipped: "Your order has been shipped and is on its way to you!",
        delivered: "Your order has been delivered. We hope you enjoy your purchase!",
        cancelled: "Your order has been cancelled. If you have any questions, please contact our support team.",
      }

      const statusMessage = statusMessages[order.status] || "Your order status has been updated."

      const { data, error } = await resend.emails.send({
        from: config.EMAIL_FROM,
        to: user.email,
        subject: `MediMart - Order #${order._id} Status Update: ${order.status.toUpperCase()}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #4a5568;">MediMart</h1>
              <p style="color: #718096;">Your trusted medicine partner</p>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h2 style="color: #2d3748;">Order Status Update</h2>
              <p>Dear ${user.name},</p>
              <p>Your order status has been updated to <strong>${order.status.toUpperCase()}</strong>.</p>
              <p>${statusMessage}</p>
              <p><strong>Order ID:</strong> ${order._id}</p>
              <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total Amount:</strong> $${order.totalPrice.toFixed(2)}</p>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h3 style="color: #2d3748;">Order Summary</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #f7fafc;">
                    <th style="padding: 10px; text-align: left; border-bottom: 1px solid #e2e8f0;">Item</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 1px solid #e2e8f0;">Qty</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 1px solid #e2e8f0;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${order.items
                    .map(
                      (item) => `
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">Medicine ID: ${item.medicineId}</td>
                      <td style="padding: 10px; text-align: right; border-bottom: 1px solid #e2e8f0;">${item.quantity}</td>
                      <td style="padding: 10px; text-align: right; border-bottom: 1px solid #e2e8f0;">$${item.price.toFixed(2)}</td>
                    </tr>
                  `,
                    )
                    .join("")}
                  <tr>
                    <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
                    <td style="padding: 10px; text-align: right; font-weight: bold;">$${order.totalPrice.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p>If you have any questions, please contact our customer support.</p>
              <p>© ${new Date().getFullYear()} MediMart. All rights reserved.</p>
            </div>
          </div>
        `,
      })

      if (error) {
        console.error("Error sending order status update email:", error)
        return { success: false, error }
      }

      return { success: true, data }
    } catch (error) {
      console.error("Error sending order status update email:", error)
      return { success: false, error }
    }
  },

  async sendPaymentConfirmation(order: IOrder, user: IUser) {
    try {
      const { data, error } = await resend.emails.send({
        from: config.EMAIL_FROM,
        to: user.email,
        subject: `MediMart - Payment Confirmation for Order #${order._id}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #4a5568;">MediMart</h1>
              <p style="color: #718096;">Your trusted medicine partner</p>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h2 style="color: #2d3748;">Payment Confirmation</h2>
              <p>Dear ${user.name},</p>
              <p>We've received your payment for order #${order._id}. Thank you!</p>
              <p><strong>Order ID:</strong> ${order._id}</p>
              <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total Amount Paid:</strong> $${order.totalPrice.toFixed(2)}</p>
              <p><strong>Payment Status:</strong> ${order.paymentStatus.toUpperCase()}</p>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h3 style="color: #2d3748;">What's Next?</h3>
              <p>Your order is now being processed. We'll send you another email when your order ships.</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p>If you have any questions, please contact our customer support.</p>
              <p>© ${new Date().getFullYear()} MediMart. All rights reserved.</p>
            </div>
          </div>
        `,
      })

      if (error) {
        console.error("Error sending payment confirmation email:", error)
        return { success: false, error }
      }

      return { success: true, data }
    } catch (error) {
      console.error("Error sending payment confirmation email:", error)
      return { success: false, error }
    }
  },

  async sendPrescriptionStatusUpdate(order: IOrder, user: IUser, status: string, notes?: string) {
    try {
      const statusMessages = {
        pending: "Your prescription is being reviewed by our pharmacists.",
        approved: "Your prescription has been approved. Your order will be processed soon.",
        rejected: "Your prescription has been rejected. Please check the notes for more information.",
      }

      const statusMessage = statusMessages[status] || "Your prescription status has been updated."

      const { data, error } = await resend.emails.send({
        from: config.EMAIL_FROM,
        to: user.email,
        subject: `MediMart - Prescription Status Update for Order #${order._id}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #4a5568;">MediMart</h1>
              <p style="color: #718096;">Your trusted medicine partner</p>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h2 style="color: #2d3748;">Prescription Status Update</h2>
              <p>Dear ${user.name},</p>
              <p>Your prescription for order #${order._id} has been <strong>${status.toUpperCase()}</strong>.</p>
              <p>${statusMessage}</p>
              ${notes ? `<p><strong>Notes from our pharmacist:</strong> ${notes}</p>` : ""}
            </div>
            
            <div style="margin-bottom: 30px;">
              <h3 style="color: #2d3748;">What's Next?</h3>
              ${
                status === "approved"
                  ? "<p>Your order will now be processed. You can proceed with payment if you haven't already.</p>"
                  : status === "rejected"
                    ? "<p>Please upload a valid prescription or contact our customer support for assistance.</p>"
                    : "<p>We'll notify you once our pharmacists have reviewed your prescription.</p>"
              }
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p>If you have any questions, please contact our customer support.</p>
              <p>© ${new Date().getFullYear()} MediMart. All rights reserved.</p>
            </div>
          </div>
        `,
      })

      if (error) {
        console.error("Error sending prescription status update email:", error)
        return { success: false, error }
      }

      return { success: true, data }
    } catch (error) {
      console.error("Error sending prescription status update email:", error)
      return { success: false, error }
    }
  },

  async sendLowStockAlert(medicineName: string, currentStock: number, adminEmails: string[]) {
    try {
      const { data, error } = await resend.emails.send({
        from: config.EMAIL_FROM,
        to: adminEmails,
        subject: `MediMart - Low Stock Alert: ${medicineName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #4a5568;">MediMart</h1>
              <p style="color: #718096;">Admin Alert</p>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h2 style="color: #e53e3e;">Low Stock Alert</h2>
              <p>This is an automated alert to inform you that the following medicine is running low on stock:</p>
              <p><strong>Medicine:</strong> ${medicineName}</p>
              <p><strong>Current Stock:</strong> ${currentStock} units</p>
            </div>
            
            <div style="margin-bottom: 30px;">
              <p>Please restock this item as soon as possible to avoid stockouts.</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p>This is an automated message from the MediMart system.</p>
              <p>© ${new Date().getFullYear()} MediMart. All rights reserved.</p>
            </div>
          </div>
        `,
      })

      if (error) {
        console.error("Error sending low stock alert email:", error)
        return { success: false, error }
      }

      return { success: true, data }
    } catch (error) {
      console.error("Error sending low stock alert email:", error)
      return { success: false, error }
    }
  },
}

