// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'


//* Hashing Password Method *//
export const hashPassword = (password: string): string => {     
  return bcrypt.hashSync(password, 10);
}


const prisma = new PrismaClient();

async function main() {
  //* Users *//
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lyntek.ao' },
    update: {},
    create: {
      email: 'admin@lyntek.ao',
      name: 'Admin',
      password: hashPassword('admin_password'),
      role: 'ADMIN',
    },
  });


  const customer = await prisma.user.upsert({
    where: { email: 'client@lyntek.ao' },
    update: {},
    create: {
      email: 'client@lyntek.ao',
      name: 'Test Client',
      password: hashPassword('client_password'),
      role: 'CUSTOMER',
    },
  });

  console.log({ admin, customer });

  //* Categories *//
  const categorySmartphone = await prisma.category.create({
    data: { name: 'Smartphones', slug: 'smartphones' },
  });

  const categoryNotebook = await prisma.category.create({
    data: { name: 'Notebooks', slug: 'notebooks' },
  });

  //* Brands *//
  const brandApple = await prisma.brand.create({
    data: { name: 'Apple', slug: 'apple' },
  });

  const brandDell = await prisma.brand.create({
    data: { name: 'Dell', slug: 'dell' },
  });

  //* Products => Variants *//
  const iphone = await prisma.product.create({
    data: {
      name: 'iPhone 14',
      description: 'Smartphone Apple',
      categoryId: categorySmartphone.id,
      brandId: brandApple.id,
      variants: {
        create: [
          {
            sku: 'IPH14-128GB',
            title: 'iPhone 14 - 128GB',
            price: 1500000,
            currency: 'AKZ',
            stock: 10,
          },
          {
            sku: 'IPH14-256GB',
            title: 'iPhone 14 - 256GB',
            price: 2000000,
            currency: 'AKZ',
            stock: 5,
          },
        ],
      },
    },
  });

  const dellXps = await prisma.product.create({
    data: {
      name: 'Dell XPS 13',
      description: 'Notebook premium',
      categoryId: categoryNotebook.id,
      brandId: brandDell.id,
      variants: {
        create: [
          {
            sku: 'XPS13-I7',
            title: 'Dell XPS 13 - i7',
            price: 1800000,
            currency: 'AKZ',
            stock: 3,
          },
        ],
      },
    },
  });

  console.log({ iphone, dellXps });

  //* PaymentProviders *//
  const paypal = await prisma.paymentProvider.create({
    data: {
      name: 'PayPal',
      code: 'paypal',
      methods: {
        create: [{ name: 'Cartão via PayPal', code: 'paypal_card' }],
      },
    },
  });

  const unitelMoney = await prisma.paymentProvider.create({
    data: {
      name: 'Unitel Money',
      code: 'unitel_money',
      methods: {
        create: [
          { name: 'Unitel Wallet', code: 'unitel_wallet' },
          { name: 'USSD', code: 'unitel_ussd' },
          { name: 'Agent Payment', code: 'unitel_agentPayment' },
        ],
      },
    },
  });

  const emis = await prisma.paymentProvider.create({
    data: {
      name: 'EMIS(Multicaixa)',
      code: 'emis',
      methods: {
        create: [
          { name: 'MCX Express', code: 'emis_express' },
          { name: 'MCX QR CODE ', code: 'emis_qrcode' },
          { name: 'MCX Card', code: 'emis_card' },
        ],
      },
    },
  });

  const bank = await prisma.paymentProvider.create({
    data: {
      name: 'Bank Transfer',
      code: 'bank_transfer',
      methods: {
        create: [
          { name: 'BAI', code: 'emis_baiTransfer' },
          { name: 'BFA', code: 'emis_bfaTransfer' }
        ],
      },
    },
  });

  const stripe = await prisma.paymentProvider.create({
    data: {
      name: 'Stripe',
      code: 'stripe',
      methods: {
        create: [
          { name: 'Cartão de Crédito', code: 'stripe_card' },
          { name: 'Apple Pay', code: 'stripe_applePay' }
        ],
      },
    },
  });

  console.log({ paypal, stripe, emis, unitelMoney, bank });

  //* Carrier *//
  const dhl = await prisma.carrier.create({
    data: {
      name: 'DHL',
      code: 'dhl',
    },
  });

  console.log({ dhl });

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seed Error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });