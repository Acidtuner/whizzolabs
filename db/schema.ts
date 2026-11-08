import { mysqlTable, varchar, int, boolean, timestamp, text, mysqlEnum } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  passwordHash: varchar("password_hash", { length: 255 }),
  role: mysqlEnum("role", ["customer", "admin"]).notNull().default("customer"),
  emailVerified: timestamp("email_verified"),
  image: varchar("image", { length: 512 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const series = mysqlTable("series", {
  id: varchar("id", { length: 36 }).primaryKey(),
  code: varchar("code", { length: 32 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  isActive: boolean("is_active").notNull().default(true),
  validFrom: timestamp("valid_from"),
  validTo: timestamp("valid_to"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const products = mysqlTable("products", {
  id: varchar("id", { length: 36 }).primaryKey(),
  uid: varchar("uid", { length: 64 }).notNull().unique(),
  seriesId: varchar("series_id", { length: 36 }).notNull(),
  category: varchar("category", { length: 8 }),
  designNumber: varchar("design_number", { length: 16 }),
  style: varchar("style", { length: 16 }),
  theme: varchar("theme", { length: 128 }).notNull(),
  sizeWidth: varchar("size_width", { length: 32 }),
  sizeHeight: varchar("size_height", { length: 32 }),
  material: varchar("material", { length: 64 }).default("PINE MDF"),
  thickness: varchar("thickness", { length: 16 }).default("4mm"),
  mrp: int("mrp").notNull().default(650),
  sellingPrice: int("selling_price").notNull().default(450),
  isActive: boolean("is_active").notNull().default(true),
  isSeasonal: boolean("is_seasonal").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productVariants = mysqlTable("product_variants", {
  id: varchar("id", { length: 36 }).primaryKey(),
  productId: varchar("product_id", { length: 36 }).notNull(),
  sku: varchar("sku", { length: 64 }).notNull().unique(),
  finish: varchar("finish", { length: 64 }),
  colourName: varchar("colour_name", { length: 64 }),
  colourSuffix: varchar("colour_suffix", { length: 16 }),
  extraNotes: varchar("extra_notes", { length: 128 }),
  stockQuantity: int("stock_quantity").notNull().default(0),
  reservedQuantity: int("reserved_quantity").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  isTenPack: boolean("is_ten_pack").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = mysqlTable("orders", {
  id: varchar("id", { length: 36 }).primaryKey(),
  orderNumber: varchar("order_number", { length: 32 }).notNull().unique(),
  userId: varchar("user_id", { length: 36 }),
  guestTokenHash: varchar("guest_token_hash", { length: 128 }),
  email: varchar("email", { length: 255 }).notNull(),
  status: mysqlEnum("status", [
    "draft",
    "payment_initiated",
    "paid",
    "processing",
    "shipped",
    "delivered",
    "payment_failed",
    "abandoned",
    "cancelled",
    "refunded",
  ]).notNull().default("draft"),
  paymentMethod: mysqlEnum("payment_method", ["prepaid", "cod"]),
  subtotal: int("subtotal").notNull().default(0),
  shipping: int("shipping").notNull().default(0),
  codFee: int("cod_fee").notNull().default(0),
  gst: int("gst").notNull().default(0),
  prepaidDiscount: int("prepaid_discount").notNull().default(0),
  total: int("total").notNull().default(0),
  trackingNumber: varchar("tracking_number", { length: 128 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const orderItems = mysqlTable("order_items", {
  id: varchar("id", { length: 36 }).primaryKey(),
  orderId: varchar("order_id", { length: 36 }).notNull(),
  variantId: varchar("variant_id", { length: 36 }),
  sku: varchar("sku", { length: 64 }).notNull(),
  quantity: int("quantity").notNull(),
  unitPrice: int("unit_price").notNull(),
  engravingText: varchar("engraving_text", { length: 32 }),
  engravingFee: int("engraving_fee").notNull().default(0),
  lineTotal: int("line_total").notNull(),
});

export const addresses = mysqlTable("addresses", {
  id: varchar("id", { length: 36 }).primaryKey(),
  orderId: varchar("order_id", { length: 36 }),
  userId: varchar("user_id", { length: 36 }),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 32 }),
  line1: varchar("line1", { length: 255 }).notNull(),
  line2: varchar("line2", { length: 255 }),
  city: varchar("city", { length: 128 }).notNull(),
  state: varchar("state", { length: 128 }),
  pincode: varchar("pincode", { length: 16 }).notNull(),
  country: varchar("country", { length: 64 }).default("India"),
});

export const orderStatusHistory = mysqlTable("order_status_history", {
  id: varchar("id", { length: 36 }).primaryKey(),
  orderId: varchar("order_id", { length: 36 }).notNull(),
  fromStatus: varchar("from_status", { length: 32 }),
  toStatus: varchar("to_status", { length: 32 }).notNull(),
  changedBy: varchar("changed_by", { length: 255 }),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const priceAuditLog = mysqlTable("price_audit_log", {
  id: varchar("id", { length: 36 }).primaryKey(),
  entityType: varchar("entity_type", { length: 32 }).notNull(),
  entityId: varchar("entity_id", { length: 36 }).notNull(),
  field: varchar("field", { length: 64 }).notNull(),
  oldValue: varchar("old_value", { length: 255 }),
  newValue: varchar("new_value", { length: 255 }),
  changedBy: varchar("changed_by", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const seriesRelations = relations(series, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  series: one(series, { fields: [products.seriesId], references: [series.id] }),
  variants: many(productVariants),
}));

export const productVariantsRelations = relations(productVariants, ({ one }) => ({
  product: one(products, { fields: [productVariants.productId], references: [products.id] }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  items: many(orderItems),
  address: one(addresses, { fields: [orders.id], references: [addresses.orderId] }),
  statusHistory: many(orderStatusHistory),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  variant: one(productVariants, { fields: [orderItems.variantId], references: [productVariants.id] }),
}));
